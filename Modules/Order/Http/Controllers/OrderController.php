<?php

namespace Modules\Order\Http\Controllers;

use App\GoodOrder;
use App\Good_category;
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
        $limit = 20;
        $start = $request->start;
        $end = $request->end;
        $type = $request->type;
        $total_records = Order::get()->count();
        if ($start) {
            if ($type)
                $orders = Order::where('type', $type)->whereBetween('created_at', array($start, $end))->orderBy("created_at", "desc")->paginate($limit);
            else
                $orders = Order::whereBetween('created_at', array($start, $end))->orderBy("created_at", "desc")->paginate($limit);
        } else {
            if ($type)
                $orders = Order::where('type', $type)->orderBy("created_at", "desc")->paginate($limit);
            else
                $orders = Order::orderBy("created_at", "desc")->paginate($limit);
        }
        return $this->respondWithPagination(
            $orders,
            [
                'total_records' => $total_records,
                'orders' => $orders->map(function ($order) {
                    return $order->transform();
                })
            ]
        );
    }
    public function all_Category(){
        $good_categories= Good_category::orderBy("created_at","desc")->get();
        return $this->respondSuccessWithStatus([
            [
                'good_categories' => $good_categories->map(function ($good_category) {
                    return $good_category->Category_transform();
                })
            ]

        ]);
    }
    public function add_Category(Request $request){
        if($request->name== null) return $this->respondErrorWithStatus("Chưa có tên");
        $good_category= new Good_category;
        $good_category->name= $request->name;
        $good_category->parent_id=$request->parent_id;
        $good_category->save();
        return $this->respondSuccessWithStatus([
          "good_category"=>  $good_category->Category_transform()
        ]);
    }
    public function edit_Category(Request $request){
        if($request->id==null || $request->name ==null)
            return $this->respondErrorWithStatus("Chưa có id hoặc tên");
        $good_category=Good_category::find($request->id);
        $good_category->name=$request->name;
        if($request->parent_id != null) $good_category->parent_id=$request->parent_id;
        $good_category->save();
        return $this->respondSuccessWithStatus([
            "good_category"=>  $good_category->Category_transform()
        ]);
    }
    public function delete_Category($category_id,Request $request){
        $good_category=Good_category::find($category_id);
        if($good_category==null) return $this->respondErrorWithData([
            "message"=> "Danh mục không tồn tại"
        ]);
        $good_category->delete();
        return $this->respondErrorWithData([
            "message"=> "Xóa thành công"
        ]) ;
    }
}
