<?php

namespace Modules\Book\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Modules\Book\Entities\Barcode;

class BarcodeController extends ManageApiController
{
    public function saveBarcode(Request $request)
    {
        if ($request->id == null) {
            $barcode = new Barcode();
        } else {
            $barcode = Barcode::find($request->id);
        }
        if ($request->used) {
            $barcode->used = $request->used;
        } else {
            $barcode->used = false;
        }
        $barcode->value = $request->value;
        $barcode->save();
        return $this->respondSuccessWithStatus(["barcode" => $barcode]);
    }

    public function barcode($barcodeId)
    {
        $barcode = Barcode::find($barcodeId);
        if ($barcode == null) {
            return $this->respondErrorWithStatus("Barcode không tồn tại");
        }
        return $this->respondSuccessWithStatus(["barcode" => $barcode]);
    }

    public function barcodes()
    {
        $barcodes = Barcode::orderBy("created_at", "desc")->paginate();
        return $this->respondWithPagination($barcodes, [
            "barcodes" => $barcodes
        ]);
    }
}
