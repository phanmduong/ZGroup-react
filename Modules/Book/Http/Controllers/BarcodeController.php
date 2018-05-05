<?php

namespace Modules\Book\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Modules\Book\Entities\Barcode;
use Picqer\Barcode\BarcodeGeneratorPNG;
use Picqer\Barcode\Exceptions\BarcodeException;

class BarcodeController extends ManageApiController
{
    public function deleteBarcode($barcodeId)
    {
        $barcode = Barcode::find($barcodeId);
        if ($barcode == null) {
            return $this->respondErrorWithStatus('Barcode không tồn tại');
        }
        if ($barcode->good != null) {
            return $this->respondErrorWithStatus('Barcode này đã được gắn cho sản phẩm');
        }
        $barcode->delete();
        return $this->respondSuccessWithStatus(['message' => 'success']);
    }

    public function saveBarcode(Request $request)
    {
        if ($request->id == null) {
            $barcode = new Barcode();
        } else {
            $barcode = Barcode::find($request->id);
        }
        if ($request->good_id) {
            $barcode->good_id = $request->good_id;
        } else {
            $barcode->good_id = 0;
        }
        $barcode->value = $request->value;
        $barcode->type = $request->type;
        $generator = new BarcodeGeneratorPNG();
        if ($request->value) {
            try {
                $barcode->image_url = 'data:image/png;base64,' . base64_encode($generator->getBarcode($request->value, $generator::TYPE_CODE_128));
            } catch (BarcodeException $e) {
            }
        }

        $barcode->save();
        return $this->respondSuccessWithStatus(['barcode' => $barcode]);
    }

    public function barcode($barcodeId)
    {
        $barcode = Barcode::find($barcodeId);
        if ($barcode == null) {
            return $this->respondErrorWithStatus('Barcode không tồn tại');
        }
        return $this->respondSuccessWithStatus(['barcode' => $barcode]);
    }

    public function barcodeExist(Request $request)
    {
        if ($request->type) {
            $type = $request->type;
        } else {
            $type = 'book';
        }
        $countEmpty = Barcode::where('type', $type)->orderBy('created_at')->where('good_id', 0)->count();
        return $this->respondSuccessWithStatus([
            'count' => $countEmpty
        ]);
    }

    public function barcodes(Request $request)
    {
        $limit = 20;
        $search = trim($request->search);
        if ($request->limit) {
            $limit = intval($request->limit);
        }

        if ($request->type) {
            $type = $request->type;
        } else {
            $type = 'book';
        }

        $barcodes = Barcode::where('barcode.type', $type);

        if ($request->search)
            $barcodes = $barcodes->join('goods', 'goods.id', '=', 'barcode.good_id')
                ->where(function ($query) use ($search) {
                    $query->where('barcode.value', 'like', "%$search%")->orWhere('goods.name', 'like', "%$search%");
                })->select("barcode.*");
        $barcodes = $barcodes->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($barcodes, [
            'barcodes' => $barcodes->map(function ($barcode) {
                return $barcode->transform();
            })
        ]);
    }
}
