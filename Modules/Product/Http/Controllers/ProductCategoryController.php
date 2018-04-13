<?php

namespace Modules\Product\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\ManageApiController;
use App\CategoryProduct;
 
class ProductCategoryController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function allProductCategories(Request $request)
    {
        $productCategories = CategoryProduct::where('name', 'like', "%$request->search%")
            ->orderBy('created_at', 'desc')
            ->paginate($request->limit ? $request->limit : 20);
        return $this->respondWithPagination($productCategories, [
            'product_categories' => $productCategories->map(function ($productCategory) {
                return [
                    'id' => $productCategory->id,
                    'name' => $productCategory->name,
                ];
            })
        ]);
    }

    public function createProductCategory(Request $request)
    {
        $productCategory = new CategoryProduct();
        if ($request->name == null)
            return $this->respondErrorWithStatus('Thiếu tên');
        $productCategory->name = $request->name;
        $productCategory->save();
        return $this->respondSuccess('Tạo thành công');
    }

    public function editProductCategory($productCategoryId, Request $request)
    {
        $productCategory = CategoryProduct::find($productCategoryId);
        if ($productCategory == null)
            return $this->respondErrorWithStatus('Không tồn tại nhãn');
        if ($request->name == null)
            return $this->respondErrorWithStatus('Thiếu tên');
        $productCategory->name = $request->name;
        $productCategory->save();
        return $this->respondSuccess('Sửa thành công');
    }

    public function deleteProductCategory($productCategoryId, Request $request)
    {
        $productCategory = CategoryProduct::find($productCategoryId);
        if($productCategory == null)
            return $this->respondErrorWithStatus('Không tồn tại nhãn');
        if($productCategory->mulCatProducts()->count() > 0)
            return $this->respondErrorWithStatus('Không xoá nhãn đang được gắn vào bài viết');
        $productCategory->delete();
        return $this->respondSuccessWithStatus('Tạo thành công');
    }
}
