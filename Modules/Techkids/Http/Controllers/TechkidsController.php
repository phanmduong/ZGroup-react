<?php

namespace Modules\Techkids\Http\Controllers;

use App\GoodCategory;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class TechkidsController extends Controller
{
    public function index()
    {
        return view('techkids::index');
    }
    public function blogs()
    {
        $blogs = Product::where('type', 2)->where('status', 1)->get();
        $blogs = $blogs->take(6);
        $this->data['blogs'] = $blogs;


        $goodCategories = GoodCategory::orderBy("created_at", "desc")->take(10)->get();
        $this->data["goodCategories"] = $goodCategories;


        return view('techkids::blogs',$this->data);
    }

}
