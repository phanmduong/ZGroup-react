<?php

namespace Modules\GHTK\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Order;
use Illuminate\Http\Request;

class GHTKController extends ManageApiController
{
    public function addOrder(Request $request)
    {
        $data = $request->data;
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://services.giaohangtietkiem.vn/services/shipment/order",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array(
                "Content-Type: application/json",
                "Token: " . config("app.ghtk_api"),
                "Content-Length: " . strlen($data),
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }

    public function shipmentFee(Request $request)
    {
        $data = $request->data;
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://services.giaohangtietkiem.vn/services/shipment/fee?" . http_build_query($data),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPHEADER => array(
                "Token: " . config("app.ghtk_api"),
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }

    public function orderInfo($id)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://services.giaohangtietkiem.vn/services/shipment/v2/partner_id:" . $id,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPHEADER => array(
                "Token: " . config("app.ghtk_api"),
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);

        return $response;
    }

    public function cancelOrder($id)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://services.giaohangtietkiem.vn/services/shipment/cancel/partner_id:" . $id,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPHEADER => array(
                "Token: " . config("app.ghtk_api"),
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);

        return $response;
    }
}
