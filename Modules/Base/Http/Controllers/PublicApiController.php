<?php

namespace Modules\Base\Http\Controllers;

use App\Base;
use App\Http\Controllers\NoAuthApiController;
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

    public function getAllBlogs()
    {
        $blogs = Product::where('type', 2)->orderBy('created_at', 'desc')->paginate(10);
        return $this->respondWithPagination($blogs, ["blogs" => $blogs->map(function ($blog) {
            return $blog->blogTransform();
        })]);
    }

    public function getDetailBlog()
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