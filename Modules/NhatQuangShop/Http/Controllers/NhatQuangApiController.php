<?php

namespace Modules\NhatQuangShop\Http\Controllers;


use App\District;
use App\Good;
use App\Http\Controllers\PublicApiController;
use App\Province;
use Illuminate\Http\Request;
use Modules\Good\Entities\GoodProperty;
use Modules\NhatQuangShop\Repositories\BookRepository;

class NhatQuangApiController extends PublicApiController
{
    private $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function flush(Request $request)
    {
        $request->session()->flush();
    }

    public function getGoodsFromSession(Request $request)
    {
        $goods_str = $request->session()->get('goods');
        $goods_arr = json_decode($goods_str);
        $goods = [];
        if ($goods_arr) {
            foreach ($goods_arr as $item) {
                $good = Good::find($item->id);
                $good->number = $item->number;
                $properties = GoodProperty::where('good_id', $good->id)->get();
                foreach ($properties as $property) {
                    $good[$property->name] = $property->value;
                }
                $goods[] = $good;
            }
        }

        $totalPrice = 0;

        foreach ($goods as $good) {
            $totalPrice += $good->price * (1 - $good["coupon_value"]) * $good->number;
        }
        $data = [
            "goods" => $goods,
            "total_price" => $totalPrice
        ];
        return $data;
    }

    public function addGoodToCart($goodId, Request $request)
    {
        $goods_str = $request->session()->get('goods');

        if ($goods_str) {
            $goods = json_decode($goods_str);
        } else {
            $goods = [];
        }
        $added = false;
        foreach ($goods as &$good) {
            if ($good->id == $goodId) {
                $good->number += 1;
                $added = true;
            }
        }
        if (!$added) {
            $temp = new \stdClass();
            $temp->id = $goodId;
            $temp->number = 1;
            $goods[] = $temp;
        }
        $goods_str = json_encode($goods);
        $request->session()->put('goods', $goods_str);
        return ["status" => 1];
    }

    public function removeBookFromCart($goodId, Request $request)
    {
        $goods_str = $request->session()->get('goods');

        $goods = json_decode($goods_str);

        $new_goods = [];

        foreach ($goods as &$good) {
            if ($good->id == $goodId) {
                $good->number -= 1;
            }
            if ($good->number > 0) {
                $temp = new \stdClass();
                $temp->id = $good->id;
                $temp->number = $good->number;
                $new_goods[] = $temp;
            }
        }

        $goods_str = json_encode($new_goods);
        $request->session()->put('goods', $goods_str);
        return ["status" => 1];
    }

    public function saveOrder(Request $request)
    {
        //code phan api dat sach o day hihi
        $email = $request->email;
        $name = $request->name;
        $phone = $request->phone;
        $province = Province::find($request->provinceid)->name;
        $district = District::find($request->districtid)->name;
        $address = $request->address;
        $payment = $request->payment;
        $goods_str = $request->session()->get('goods');
        $goods_arr = json_decode($goods_str);
        if (count($goods_arr) > 0) {
            $this->bookRepository->saveOrder($email, $phone, $name, $province, $district, $address, $payment, $goods_arr);
            $request->session()->flush();
            return [
                "status" => 1
            ];
        } else {
            return [
                "status" => 0,
                "message" => "Bạn chưa đặt cuốn sách nào"
            ];
        }
    }

    public function provinces()
    {
        $provinces = Province::get();
        return [
            'provinces' => $provinces,
        ];
    }

    public function districts($provinceId)
    {
        $province = Province::find($provinceId);
        return [
            'districts' => $province->districts,
        ];
    }

    public function wards($districtId)
    {
        $district = District::find($districtId);
        return [
            'wards' => $district->wards,
        ];
    }
}
