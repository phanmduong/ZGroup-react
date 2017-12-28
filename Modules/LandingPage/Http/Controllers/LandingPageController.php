<?php

namespace Modules\LandingPage\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class LandingPageController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return view('landingpage::index');
    }

    public function export(Request $request)
    {
        $urlLib = public_path() . "/render-landingpage2";
        $pathToAssets = array($urlLib . "/elements/assets", $urlLib . "/elements/stylesheets", $urlLib . "/elements/fonts", $urlLib . "/elements/pix_mail", $urlLib . "/elements/js-files");
        $filename = public_path() . "/landing-page/website.zip"; //use the /tmp folder to circumvent any permission issues on the root folder
        /* END CONFIG */
        $tmpfilename = 'tmp/website.zip';
        if (file_exists($tmpfilename)) {
            unlink($tmpfilename);
        }

        $external_css_files = true;

//$form_type_export = $_POST['form_type_export'];
        $imgs = json_decode($request->pix_export_imgs_Field);
        $imgs[] = "images/favicon.ico";

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
                    if (!in_array('elements/images/' . $node->getAttribute('pix-name'), $dirs, true)) {
                        array_push($dirs, 'elements/images/' . $node->getAttribute('pix-name'));
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
                    $temp = explode("/", $name);
                    array_shift($temp);
                    $newName = implode("/", $temp);
                    // Add current file to archive
                    $zip->addFile($filePath, $newName);
                }
            }
        }
        foreach ($imgs as $img) {
            $zip->addFile("elements/" . $img, $img);
        }

        $skeleton1 = file_get_contents($urlLib . 'elements/sk1.html');
        $skeleton2 = file_get_contents($urlLib . 'elements/sk2.html');
        $skeleton3 = file_get_contents($urlLib . 'elements/sk3.html');

        foreach ($request->pages as $page => $content) {
            $t_seo = json_decode($request->seo[$page]);
            $t_css = json_decode($request->css[$page]);
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
            $new_content = $skeleton1 . $seo_tags . $skeleton2 . $customStyle . stripslashes($content) . $skeleton3;
            $zip->addFromString($page . ".html", stripslashes($new_content));
        }

        $zip->close();

        $zip = new ZipArchive;
        $folder = $request->link_landing_page;
        if ($zip->open($filename) === TRUE) {
            $zip->extractTo(public_path() . '/landing-page/' . $folder . '/');
            $zip->close();
        }
        return "SUCCESS";
    }
}
