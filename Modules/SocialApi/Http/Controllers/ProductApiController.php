<?php
/**
 * Created by PhpStorm.
 * User: tt
 * Date: 01/10/2017
 * Time: 10:20
 */

namespace Modules\SocialApi\Http\Controllers;


use App\Colorme\Transformers\ProductTransformer;
use App\Http\Controllers\ApiController;
use App\Product;

class ProductApiController extends ApiController
{
    protected $productTransformer;
    public function __construct(ProductTransformer $productTransformer)
    {
        $this->productTransformer = $productTransformer;

    }
    public function products(){
        $products = Product::orderBy('created_at','desc')->paginate(10);
        $data= ['data'=>$this->productTransformer->transformCollection($products)];
        return $this->respondWithPagination($products,$data);
    }

}