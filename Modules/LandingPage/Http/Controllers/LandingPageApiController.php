<?php

namespace Modules\LandingPage\Http\Controllers;

use App\Colorme\Transformers\LandingPageTransformer;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\ManageApiController;
use App\LandingPage;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use ZipArchive;
use DOMDocument;
use DOMXPath;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;

class LandingPageApiController extends ManageApiController
{
    protected $landingPageTransformer;

    public function __construct(LandingPageTransformer $landingPageTransformer)
    {
        parent::__construct();
        $this->landingPageTransformer = $landingPageTransformer;
    }

    public function getAll(Request $request)
    {
        $limit = 20;

        $search = $request->search;
        if ($search) {
            $landingPages = LandingPage::where(function ($query) use ($search) {
                $query->where("name", $search)->orWhere("path", $search);
            });
        } else {
            $landingPages = LandingPage::orderBy('created_at')->paginate($limit);
        }


        $data = [
            "landing_pages" => $this->landingPageTransformer->transformCollection($landingPages)
        ];

        return $this->respondWithPagination($landingPages, $data);
    }

    public function export(Request $request)
    {
        $urlLib = public_path() . "/landingpage-libs";
        $pathToAssets = array($urlLib . "/elements/assets", $urlLib . "/elements/stylesheets", $urlLib . "/elements/fonts", $urlLib . "/elements/pix_mail", $urlLib . "/elements/js-files");
        $filename = public_path() . "/landing-page/" . $request->link_landing_page . ".zip"; //use the /tmp folder to circumvent any permission issues on the root folder
        /* END CONFIG */

        $landingpage = LandingPage::find($request->landing_page_id);

        if (($landingpage == null) || ($landingpage && $landingpage->path != $request->link_landing_page)) {
            if (is_dir(public_path() . "/landing-page/" . $request->link_landing_page)) {
                return $this->respondErrorWithStatus("Đường dẫn đã tồn tại");
            }
        }


        $external_css_files = true;

//$form_type_export = $_POST['form_type_export'];
        $imgs = json_decode($request->pix_export_imgs_Field);

        $zip = new ZipArchive();
        $zip->open($filename, ZipArchive::CREATE);

        $dirs = array();
        $doc = new DOMDocument();
        $doc->recover = true;
        $doc->strictErrorChecking = false;
        libxml_use_internal_errors(true);

        foreach ($request->pages as $page => $content2) {
            $doc->recover = true;
            $doc->strictErrorChecking = false;
            $doc->loadHTML(stripslashes($content2));
            $selector = new DOMXPath($doc);

            $result = $selector->query('//div[@class="section_pointer"]');
            // loop through all found items
            if ($result->length > 0) {
                foreach ($result as $node) {
                    //array_push($dirs, $node->getAttribute('pix-name'));
                    if (!in_array($urlLib . '/elements/images/' . $node->getAttribute('pix-name'), $dirs, true)) {
                        array_push($dirs, $urlLib . '/elements/images/' . $node->getAttribute('pix-name'));
                    }
                }
                $pathToAssets = array_merge($pathToAssets, $dirs);
            }
        }
//add folder structure
        foreach ($pathToAssets as $thePath) {
            // Create recursive directory iterator
            $files = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($thePath),
                RecursiveIteratorIterator::LEAVES_ONLY
            );
            foreach ($files as $name => $file) {
                if ($file->getFilename() != '.' && $file->getFilename() != '..') {
                    // Get real path for current file
                    $filePath = $file->getRealPath();
                    $temp = explode("/elements", $name);
                    array_shift($temp);
                    $newName = implode("/", $temp);
                    // Add current file to archive
                    $zip->addFile($filePath, $newName);
                }
            }
        }
        foreach ($imgs as $img) {
            $zip->addFile($urlLib . "/elements/" . $img, $img);
        }

        $skeleton1 = file_get_contents($urlLib . '/elements/sk1.html');
        $skeleton2 = file_get_contents($urlLib . '/elements/sk2.html');
        $skeleton3 = file_get_contents($urlLib . '/elements/sk3.html');

        foreach ($request->pages as $page => $content) {
            $t_seo = json_decode($request->seo[$page]);
            $t_css = json_decode($request->css[$page]);
            $t_source = json_decode($request->source[$page]);
            $seo_tags = '<title>' . $t_seo[0] . '</title>' . "\n" . '<meta name="description" content="' . $t_seo[1] . '">' . "\n" . '<meta name="keywords" content="' . $t_seo[2] . '">' . "\n" . $t_seo[3];
            $customStyle = "\n</head>\n<body>";
            if (!empty($t_css)) {
                if ($external_css_files) {
                    $customStyle = "    <link rel=\"stylesheet\" href=\"stylesheets/custom/" . $page . ".css\">\n</head>\n<body>";
                    $zip->deleteName('stylesheets\custom\\' . $page . '.css');
                    $zip->addFromString("stylesheets/custom/" . $page . ".css", $t_css);
                } else {
                    if (!empty($t_css)) {
                        $customStyle = "    <style type=\"text/css\" id=\"pix_style\">\n" . $t_css . "\n</style>\n</head>\n<body>";
                    }
                }
            }
            $new_content = $skeleton1 . $seo_tags . $skeleton2 . $customStyle . $t_source[0] . stripslashes($content) . $t_source[1] . $skeleton3;
            $zip->addFromString($page . ".html", stripslashes($new_content));
        }

        // tạo thư mục
        $folder = $request->link_landing_page;
        $zip->extractTo(public_path() . '/landing-page/' . $folder . '/');
        $zip->close();

        $zip = new ZipArchive;
        $zip->open($filename);
        $zip->extractTo(public_path() . '/landing-page/' . $folder . '/');
        $zip->close();

        unlink($filename);

        $data = [
            'url' => $request->link_landing_page
        ];

        return $this->respondSuccessWithStatus($data);
    }

    public function save(Request $request)
    {
        $landingpage = LandingPage::find($request->id);
        if ($landingpage == null) {
            $landingpage = new LandingPage();
        }
        $landingpage->path = $request->path ? $request->path : '';
        $landingpage->name = $request->name;
        $landingpage->user_id = $this->user->id;
        $landingpage->content = $request->content_landing_page;
        $landingpage->save();

        return $this->respondSuccessWithStatus([
            "message" => "Tạo landing page thành công",
            "id" => $landingpage->id,
        ]);
    }

    public function deleteLandingPage($landingPageId)
    {
        $landingpage = LandingPage::find($landingPageId);

        if ($landingpage == null) {
            return $this->respondErrorWithStatus("Landing page không tồn tại");
        }

        $filename = public_path() . "/landing-page/" . $landingpage->path;

        if ($landingpage->path && is_dir($filename)) {
            rename($filename, $filename . "_deleted");
        }
        $landingpage->delete();

        return $this->respondSuccess("Xóa landing page thành công");
    }
}
