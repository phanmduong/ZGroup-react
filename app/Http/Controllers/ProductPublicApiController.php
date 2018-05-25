<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

use App\Http\Requests;

class ProductPublicApiController extends ApiController
{
    public function __construct()
    {
        $this->s3_url = config('app.s3_url');
    }

    public function likes( $productId)
    {
        $product = Product::find($productId);
        $likes = $product->likes;

        return $this->respond(['likers' => $likes->map(function ($like) {
            return [
                'name' => $like->liker->name,
                'username' => $like->liker->username,
                'avatar_url' => $like->liker->avatar_url ? $like->liker->avatar_url : "http://d1j8r0kxyu9tj8.cloudfront.net/webs/user.png"
            ];
        })]);
    }
}
