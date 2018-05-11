<?php

namespace Modules\Blog\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\ManageApiController;
use App\Product;

class BlogController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function createPost(Request $request) {
        $title = $request->title;
        $kind = $request->kind;
        $language_id = $request->language_id;
        $slug = $request->slug;
        $category_id = $request->category_id;
        $tags = $request->tags;
        $description = $request->description;
        $meta_title = $request->meta_title;
        $meta_description = $request->meta_description;
        $keyword = $request->keyword;
        $content = $request->product_content;
        $url = $request->url;
        if ($request->id) {
            $product = Product::find();
        }

        $product = new Product();
        $product->slug = $slug;
        $product->meta_title = $meta_title;
        $product->keyword = $keyword;
        $product->meta_description = $meta_description;

        $product->title = $title;
        $product->description = $description;
        $product->content = $content;
        $product->author_id = $this->user->id;
        $product->tags = $tags;
        $product->category_id = $category_id;
        $product->language_id = $language_id;

        $product->type = 2;
        $product->url = trim_url($url);
        if ($request->status) {
            $product->status = $request->status;
        } else {
            $product->status = 0;
        }
        $product->save();
        $product->slug .= '-' . $product->id;
        $product->save();

    }
}
