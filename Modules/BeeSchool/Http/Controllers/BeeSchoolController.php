<?php

namespace Modules\BeeSchool\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Product;

class BeeSchoolController extends Controller
{
    public function index()
    {
        return view('beeschool::index');
    }

    public function blogs(Request $request)
    {
        $blogs = Product::all();
        $this->data['blogs'] = $blogs;
        return view('beeschool::blogs',$this->data);
    }

    public function post($post_id)
    {
        $post = Product::find($post_id);
        if ($post == null) {
            return 'Bài viết không tồn tại';
        }
        $this->data['post'] = $post;
        // $this->data['blogs'];
        return view('beeschool::post',$this->data);
    }
}
