<?php

namespace Modules\Graphics\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Http\Controllers\NoAuthApiController;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class BlogApiController extends NoAuthApiController
{
    public function getAllBlogs($subfix, Request $request)
    {
        $blogs = Product::where('type', 2)->orderBy('created_at', 'desc')->paginate(30);
        return $this->respondWithPagination($blogs, ["blogs" => $blogs->map(function ($blog) {
            return $blog->blogTransform();
        })]);
    }

    public function getDetailBlog($subfix, $id)
    {
        $product = Product::find($id);
        if ($product == null) {
            return $this->respondErrorWithStatus("Bài viết không tồn tại");
        }
        return $this->respondSuccessWithStatus([
            "product" => $product->blogDetailTransform()
        ]);
    }
}
