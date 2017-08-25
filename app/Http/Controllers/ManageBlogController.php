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
        if ($request->status)
            $product->status = $request->status;

        $product->save();
        return $this->respondSuccessWithStatus([
            'product' => $product
        ]);
    }
}