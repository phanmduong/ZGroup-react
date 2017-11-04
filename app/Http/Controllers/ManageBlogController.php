<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 8/23/17
 * Time: 11:05
 */

namespace App\Http\Controllers;

use App\Product;
use App\Category;
use App\CategoryProduct;
use Illuminate\Http\Request;

class ManageBlogController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function create_category(Request $request)
    {
        $name = $request->name;

        $category = new CategoryProduct;

        $category->name = $name;

        $category->save();

        return $this->respondSuccessWithStatus([
            'message' => 'Tạo category thành công'
        ]);
    }

    public function save_post(Request $request)
    {
        if ($request->id) {
            $product = Product::find($request->id);
        } else {
            $product = new Product();
        }

        $product->description = $request->description;
        $product->title = $request->title;
        $product->content = $request->product_content;
        $product->author_id = $this->user->id;
        $product->tags = $request->tags_string;
        $product->category_id = $request->category_id;
        $product->type = 2;
        $product->url = trim_url($request->image_url);
        if ($request->status) {
            $product->status = $request->status;
        } else {
            $product->status = 0;
        }

        $product->save();
        return $this->respondSuccessWithStatus([
            'product' => $product
        ]);
    }

    public function get_post($postId)
    {
        $post = Product::find($postId);

        if ($post) {
            $post->url = generate_protocol_url($post->url);
            return $this->respondSuccessWithStatus([
                'post' => $post
            ]);
        } else {
            return $this->respondErrorWithStatus('Bài viết không tồn tại');
        }

    }

    public function get_posts(Request $request)
    {
        $q = trim($request->search);

        $limit = 20;

        if ($q) {
            $posts = Product::where('title', 'like', '%' . $q . '%')
                ->orderBy('created_at')->paginate($limit);
        } else {
            $posts = Product::where('title', 'like', '%' . $q . '%')->orderBy('created_at')->paginate($limit);
        }

        $data = [
            "posts" => $posts->map(function ($post) {
                $post = [
                    'id' => $post->id,
                    'title' => $post->title,
                    'status' => $post->status,
                    'created_at' => format_vn_short_datetime(strtotime($post->created_at)),
                ];
                if (isset($post->category)) {
                    $post['category'] = [
                        'id' => $post->category->id,
                        'name' => $post->category->name,
                    ];
                }

                return $post;
            })
        ];
        return $this->respondWithPagination($posts, $data);
    }

    public function delete_post($postId)
    {
        $post = Product::find($postId);

        if ($post) {
            $post->delete();
            return $this->respondSuccessWithStatus([
                'message' => 'Xóa bài viết thành công',
            ]);
        } else {
            return $this->respondErrorWithStatus('Bài viết không tồn tại');
        }
    }
}