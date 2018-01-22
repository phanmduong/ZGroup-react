<?php

namespace Modules\Base\Http\Controllers;

use App\Base;
use App\Http\Controllers\NoAuthApiController;
use App\Product;
use Illuminate\Http\Request;

class PublicApiController extends NoAuthApiController
{
    public function baseRooms($baseId, Request $request)
    {
        $base = Base::find($baseId);
        $rooms = $base->rooms;
        return $this->respondSuccessWithStatus([
            'rooms' => $rooms->map(function ($room){
                $data = $room->getData();
                $data['available_seats'] = $room->seats;
                return $data;
            })
        ]);
    }

    public function getAllBlogs(Request $request)
    {
        $limit = $request->limit ? $request->limit : 6;
        $blogs = Product::where('type', 2)->orderBy('created_at', 'desc');
        $blogs = $blogs->where('title', 'like', '%' . trim($request->search) . '%');
        $blogs = $blogs->paginate(6);
        return $this->respondWithPagination($blogs, ["blogs" => $blogs->map(function ($blog) {
            return $blog->blogTransform();
        })]);
    }

    public function getDetailBlog($id)
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