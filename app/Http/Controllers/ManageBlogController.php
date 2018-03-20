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

        $product->slug = $request->slug;
        $product->meta_title = $request->meta_title;
        $product->keyword = $request->keyword;
        $product->meta_description = $request->meta_description;

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
        $category_id = $request->category_id;
        $limit = 20;
        $posts = Product::query();
        if ($category_id) {
            $posts = $posts->where('category_id', $category_id);
        }
        if ($q) {
            $posts = $posts->where('title', 'like', '%' . $q . '%');
        }
        $posts = $posts->orderBy('created_at', 'desc')->paginate($limit);
        $data = [
            'posts' => $posts->map(function ($post) {
                $data = [
                    'id' => $post->id,
                    'title' => $post->title,
                    'status' => $post->status,
                    'image_url' => $post->url,
                    'thumb_url' => $post->thumb_url,
                    'description' => $post->description,
                    'author' => [
                       'id' => $post->author->id,
                       'name' => $post->author->name,
                       'avatar_url' => $post->author->avatar_url ? $post->author->avatar_url : 'http://colorme.vn/img/user.png',
                    ],
                    'created_at' => format_vn_short_datetime(strtotime($post->created_at)),
                ];
                if ($post->category) {
                    $data['category'] = [
                        'id' => $post->category->id,
                        'name' => $post->category->name,
                    ];
                }

                return $data;
            })
        ];
        return $this->respondWithPagination($posts, $data);
    }

    public function getAllCategory(Request $request)
    {
        $categories = CategoryProduct::all();
        return $this->respondSuccessWithStatus([
            'categories' => $categories->map(function ($category) {
                return [
                   'id' => $category->id,
                   'name' => $category->name,
                ];
            })
        ]);
    }

    public function changeStatusPost($postId, Request $request)
    {
        $post = Product::find($postId);
        if (!$post) {
            return $this->respondErrorWithStatus('Không tồn tại post');
        }
        $post->status = 1 - $post->status;
        $post->save();
        return $this->respondSuccessWithStatus([
           'message' => 'Thành công'
        ]);
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
