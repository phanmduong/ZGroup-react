<?php

namespace App\Http\Controllers;

use App\CategoryProduct;
use App\Colorme\Transformers\CommentTransformer;
use App\Colorme\Transformers\ProductTransformer;
use App\Colorme\Transformers\StudentTransformer;
use App\Gen;
use App\Product;
use App\Register;
use App\User;
use Aws\ElasticTranscoder\ElasticTranscoderClient;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Tymon\JWTAuth\Facades\JWTAuth;

class PublicApiController extends ApiController
{
    protected $productTransformer, $commentTransformer, $s3_url, $studentTransformer;

    public function __construct(ProductTransformer $productTransformer,
                                CommentTransformer $commentTransformer,
                                StudentTransformer $studentTransformer)
    {
        $this->productTransformer = $productTransformer;
        $this->commentTransformer = $commentTransformer;
        $this->studentTransformer = $studentTransformer;
        $this->s3_url = config('app.s3_url');
    }

    public function create_transcoder_job(Request $request)
    {
        $file = $request->file;
        $tmp_path = '/tmp';

        $preset_id = '1478526165297-y05g0m';

        $input_key_prefix = 'cmstorage/tmp/';

        $output_key_prefix = 'videos/';

        $pipeline_id = "1478280152129-eo6jb5";

        $transcoder_client = ElasticTranscoderClient::factory(array(
            "credentials" => [
                'key' => config('app.s3_key'),
                'secret' => config('app.s3_secret')
            ],
            'region' => config('app.s3_region'),
            'version' => 'latest',
            'default_caching_config' => '/tmp'
        ));

        $job = create_elastic_transcoder_job($transcoder_client, $pipeline_id, $file, $preset_id, $output_key_prefix);
        return $this->respond(['id' => $job['Id']]);
    }

    public function upload_image_froala(Request $request)
    {
        $image_name = uploadFileToS3($request, 'image', 800, null);
        if ($image_name != null) {
            $data["image_url"] = config('app.protocol') . trim_url($this->s3_url . $image_name);
            $data["image_name"] = $image_name;
        }
        return $this->respond(['link' => $data['image_url']]);
    }

    public function upload_file_froala(Request $request)
    {
        $file_name = uploadLargeFileToS3($request, 'file', null);
        if ($file_name != null) {
            $data["file_url"] = $this->s3_url . $file_name;
            $data["file_name"] = $file_name;
        }
        return $this->respond(['link' => $data['file_url']]);
    }

    public function upload_image_public(Request $request)
    {
        
        $file = $request->file('image');
        if ($file != null) {
            $fileExtension = $file->getClientOriginalExtension();

            $fileName = time() . "_" . rand(0, 9999999) . "_" . md5(rand(0, 9999999)) . "." . $fileExtension;

            $uploadPath = public_path('upload');

            $request->file('image')->move($uploadPath, $fileName);

            return $this->respond(['link' => config('app.protocol') . config('app.domain') . '/upload/' . $fileName]);
        }
        return $this->responseBadRequest("error");
    }

    public function delete_image_froala(Request $request)
    {
//        $file_name = explode(".net", $request->src)[1];
//        deleteFileFromS3($file_name);
        return $this->respond(['message' => "Xoá file thành công"]);
    }

    public function products(Request $request)
    {
        if ($request->token) {
            $user = JWTAuth::parseToken()->authenticate();
            $this->productTransformer->setUser($user);
        }

        if ($request->limit) {
            $limit = $request->limit;
        } else {
            $limit = 20;
        }
        switch ($request->filter) {
            case 1:
                $products = Product::where(DB::raw("DATE(created_at)"), ">=", DB::raw("DATE(NOW()) - INTERVAL 1 DAY"))
                    ->orderBy('rating', 'desc')->paginate($limit);
                break;
            case 30:
                $products = Product::where(DB::raw("DATE(created_at)"), ">=", DB::raw("DATE(NOW()) - INTERVAL 30 DAY"))
                    ->orderBy('rating', 'desc')->paginate($limit);
                break;
            case 7:
                $products = Product::where(DB::raw("DATE(created_at)"), ">=", DB::raw("DATE(NOW()) - INTERVAL 7 DAY"))
                    ->orderBy('rating', 'desc')->paginate($limit);
                break;
            default:
                $products = Product::orderBy('created_at', 'desc')->paginate($limit);
                break;
        }

        $data = ['products' => $this->productTransformer->transformCollection($products)];
        return $this->respondWithPagination($products, $data);
    }

    public function popular_products(Request $request)
    {
        if ($request->token) {
            $user = JWTAuth::parseToken()->authenticate();
            $this->productTransformer->setUser($user);
        }

        if ($request->limit) {
            $limit = $request->limit;
        } else {
            $limit = 20;
        }
        $today_products = Product::where(DB::raw("DATE(created_at)"), "=", DB::raw("CURDATE()"))
            ->orderBy('rating', 'desc')->take(8)->get();
        return $this->respondSuccessWithStatus([
            'today_products' =>
                $this->productTransformer->transformCollection($today_products)
        ]);
    }

    public function search_products(Request $request)
    {
        $term = trim($request->term);
        if ($term == null) {
            return $this->responseBadRequest("Bạn chưa nhập nội dung tìm kiếm");
        }
        if ($request->limit) {
            $limit = $request->limit;
        } else {
            $limit = 5;
        }
        $products = Product::where('description', 'like', "%" . $term . "%")
            ->orWhere('tags', 'like', "%" . $term . "%")
            ->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($products, ['products' => $this->productTransformer->transformCollection($products)]);
    }

    public function search_users(Request $request)
    {
        $term = trim($request->term);
        if ($term == null) {
            return $this->responseBadRequest("Bạn chưa nhập nội dung tìm kiếm");
        }
        if ($request->limit) {
            $limit = $request->limit;
        } else {
            $limit = 5;
        }
        $users = User::where('name', 'like', "%" . $term . "%")
            ->orWhere('email', 'like', "%" . $term . "%")
            ->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination(
            $users, [
            'users' => $users->map(function ($user) {
                return $user->tranform();
            })
        ]);
    }

    public function product_comments($productId)
    {
        $product = Product::find($productId);
        return $this->respond(['comments' => $this->commentTransformer->transformCollection($product->comments)]);
    }

    public function about_us_data()
    {
        $gen = Gen::getCurrentGen();
        $classes = $gen->studyclasses()->where('name', 'like', '%.%')->count();
        $student = Register::where('code', '!=', null)->count() + 2000;
        $posts = Product::count() + 4000;

        return $this->respond([
            'gen' => [
                'name' => $gen->name,
                'detail' => $gen->detail
            ],
            'studentsNumber' => $student,
            'classesNumber' => $classes,
            'postsNumber' => $posts
        ]);
    }

    public function product_categories(Request $request)
    {
        $categories = CategoryProduct::where('name', 'like', "%$request->search%")->get()->map(function ($c) {
            return [
                'value' => $c->id,
                'text' => $c->name
            ];
        });
        return $this->respond(['categories' => $categories]);
    }

    public function product_content($productId, Request $request)
    {
        if ($request->token) {
            $user = JWTAuth::parseToken()->authenticate();
            $this->productTransformer->setUser($user);
        }
        $product = Product::find($productId);
        $product->views += 1;
        $product->save();
        $data = $this->productTransformer->transform($product);
        $data['content'] = "";
        $data['colors'] = $product->colors->map(function ($color) {
            return $color->value;
        });
        $data['more_products'] = $this->productTransformer
            ->transformCollection($product->author->products()->where('id', '!=', $productId)
                ->orderBy(DB::raw('RAND()'))->take(4)->orderBy('created_at')->get());

        switch ($product->type) {
            case 2:
                $data['content'] = $product->content;
                return $this->respond($data);
            case 3:
                $index = 0;
                $content = '';
                foreach ($product->images as $image) {
                    if ($index == 0) {
                        $index += 1;
                        continue;
                    }
                    if ($image->type == 0) {
                        $content .= "<img src='$image->url'style='width: 100%' />";
                    } else {
                        $content .= "
                    <video full=\"$image->url\" class=\"responsive-video\"
                           controls preload='metadata'>
                        <source src=\"$product->url\" type=\"video/mp4\">
                    </video>
                    ";
                    }
                }
                $data['content'] = $content;
                return $this->respond($data);
            default:

                return $this->respond($data);
        }
    }

    public function create_cv($user_id)
    {
        $token = md5(config('app.topcv_key') . $user_id);
        return redirect("https://www.topcv.vn/partner/colorme/confirm?clmtoken=" . $token . "&uid=" . $user_id);
    }

    public function storeAdvisory(Request $request)
    {
        //send mail here
        $user = User::where('email', '=', $request->email)->first();
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        if ($user == null) {
            $user = new User;
            $user->password = bcrypt($phone);
            $user->username = $request->email;
            $user->email = $request->email;
        }
        $user->type = "advisory";
        $user->name = $request->name;
        $user->phone = $phone;
        $user->save();

        return redirect("/");
    }
}
