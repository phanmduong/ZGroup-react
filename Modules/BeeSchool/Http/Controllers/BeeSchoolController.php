<?php

namespace Modules\BeeSchool\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Product;
use DB;

class BeeSchoolController extends Controller
{
    public function index()
    {
        return view('beeschool::index');
    }

    public function blogs(Request $request)
    {
        // $blogs = Product::all();
        $blogs = DB::table('products');

        $blogs = $blogs->orderBy('created_at', 'desc')->paginate(12);
        $display = '';
        if ($request->page == null) {
            $page_id = 2;
        } else {
            $page_id = $request->page + 1;
        }
        if ($blogs->lastPage() == $page_id - 1) {
            $display = 'display:none';
        }

        $this->data['blogs'] = $blogs;
        $this->data['page_id'] = $page_id;
        $this->data['display'] = $blogs;

        $this->data['total_pages'] = ceil($blogs->total() / $blogs->perPage());
        $this->data['current_page'] = $blogs->currentPage();
        // dd($this->data);
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
