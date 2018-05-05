<?php

namespace Modules\Product\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\ManageApiController;
use App\CategoryProduct;

class ProductManageApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function timeCal($time)
    {
        $diff = abs(strtotime($time) - strtotime(Carbon::now()->toDateTimeString()));
        $diff /= 60;
        if ($diff < 60) {
            return floor($diff) . ' phút trước';
        }
        $diff /= 60;
        if ($diff < 24) {
            return floor($diff) . ' giờ trước';
        }
        $diff /= 24;
        if ($diff <= 30) {
            return floor($diff) . ' ngày trước';
        }
        return date('d-m-Y', strtotime($time));
    }

    public function allBlogs($kind, $request)
    {
        $limit = $request->limit ? $request->limit : 6;

        $blogs = Product::where('kind', 'blog')->where('status', 1)
            ->where('title', 'like', "%$request->search%")->orderBy('created_at', 'desc');

        if ($request->tag)
            $blogs = $blogs->where('tags', 'like', "%$request->tag%");
        if ($request->author_id)
            $blogs = $blogs->where('author_id', $request->author_id);
        if ($request->category_id)
            $blogs = $blog->where('category_id', $request->category_id);
        $blog = $blogs->paginate($limit);

        return $this->respondSuccessWithStatus([
            'blogs' => $blogs->map(function ($blog) {
                $data = $blog->blogTransform();
                $data['time'] = $this->timeCal(date($blog->created_at));
                return $data;
            })
        ]);
    }
}
