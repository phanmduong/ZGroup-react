<?php

namespace Modules\Currency\Http\Controllers;

use App\Currency;
use App\Http\Controllers\ManageApiController;
use App\User;
use App\UserCurrency;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class CurrencyController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllCurrencies(Request $request)
    {
        $currencies = Currency::all();
        return $this->respondSuccessWithStatus([
            "currencies" => $currencies->map(function ($currency) {
                return $currency->transform();
            })
        ]);
    }

    public function createCurrency(Request $request)
    {
        if ($request->name === null || trim($request->name) == "" ||
            $request->notation === null || trim($request->notation) == "" ||
            $request->ratio === null || trim($request->ratio) == ""

        ) return $this->respondErrorWithStatus("Thiếu trường");
        $currency = new Currency;
        $currency->name = $request->name;
        $currency->notation = $request->notation;
        $currency->ratio = $request->ratio;
        $currency->save();
        $users = User::all();
        foreach ($users as $user) {
            $user_currency = new UserCurrency;
            $user_currency->user_id = $user->id;
            $user_currency->currency_id = $currency->id;
            $user_currency->save();
        }
        return $this->respondSuccessWithStatus([
            "message" => "Tạo thành công",
            "currency" => $currency->transform(),
        ]);
    }

    public function editCurrency($currencyId, Request $request)
    {
        $currency = Currency::find($currencyId);
        if (!$currency) return $this->respondErrorWithStatus("Không tồn tại");
        $currency->name = $request->name;
        $currency->notation = $request->notation;
        $currency->ratio = $request->ratio;
        $currency->save();
        return $this->respondSuccessWithStatus([
            "message" => "Sửa thành công"
        ]);
    }
}
