<?php

namespace Modules\Order\Http\Controllers;

use App\GoodCategory;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use App\Order;


class OrderController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function allOrders(Request $request)
    {
        $start = $request->start;
        $end = $request->end;
        $type = $request->type;
        if ($start) {
            if ($type)
                $orders = Order::where('type', $type)->whereBetween('created_at', array($start, $end))->orderBy("created_at", "desc")->paginate(20);
            else
                $orders = Order::whereBetween('created_at', array($start, $end))->orderBy("created_at", "desc")->paginate(20);
        } else {
            if ($type)
                $orders = Order::where('type', $type)->orderBy("created_at", "desc")->paginate(20);
            else
                $orders = Order::orderBy("created_at", "desc")->paginate(20);
        }
        return $this->respondWithPagination(
            $orders,
            [
                'orders' => $orders->map(function ($order) {
                    return $order->transform();
                })
            ]
        );
    }
    public function allCategory(){
        $goodCategories= GoodCategory::orderBy("created_at","desc")->get();
        return $this->respondSuccessWithStatus([
            [
                'good_categories' => $goodCategories->map(function ($goodCategory) {
                    return $goodCategory->CategoryTransform();
                })
            ]

        ]);
    }
    public function addCategory(Request $request){
        if($request->name== null) return $this->respondErrorWithStatus("Chưa có tên");
        $goodCategory= new GoodCategory;
        $goodCategory->name= $request->name;
        $goodCategory->parent_id=$request->parent_id;
        $goodCategory->save();
        return $this->respondSuccessWithStatus([
          "goodCategory"=>  $goodCategory->CategoryTransform()
        ]);
    }
    public function editCategory(Request $request){
        if($request->id==null || $request->name ==null)
            return $this->respondErrorWithStatus("Chưa có id hoặc tên");
        $goodCategory=GoodCategory::find($request->id);
        if($goodCategory==null) return $this->respondErrorWithStatus("Không tồn tại thể lại này");
        $goodCategory->name=$request->name;
        if($request->parent_id != null) $goodCategory->parent_id=$request->parent_id;
        $goodCategory->save();
        return $this->respondSuccessWithStatus([
            "goodCategory"=>  $goodCategory->CategoryTransform()
        ]);
    }
    public function deleteCategory($category_id,Request $request){
        $goodCategory=GoodCategory::find($category_id);
        if($goodCategory==null) return $this->respondErrorWithData([
            "message"=> "Danh mục không tồn tại"
        ]);
        $goodCategory->delete();
        return $this->respondErrorWithData([
            "message"=> "Xóa thành công"
        ]) ;
    }
}
