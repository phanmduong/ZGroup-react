<?php

namespace Modules\Order\Http\Controllers;

use App\Register;
use App\TransferMoney;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\ManageApiController;
use Illuminate\Support\Facades\DB;

class TransferMoneyApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getTransfers(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;

        $transfers = TransferMoney::query();
        if ($request->user_id)
            $transfers = $transfers->where('user_id', $request->user_id);
        if ($request->status)
            $transfers = $transfers->where('status', $request->status);
        if ($request->bank_account_id)
            $transfers = $transfers->where('bank_account_id', $request->bank_account_id);
//        $request = $request->join('users', '')

        if ($limit == -1) {
            $transfers = $transfers->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'transfers' => $transfers->map(function ($transfer) {
                    return $transfer->transform();
                })
            ]);
        }

        $transfers = $transfers->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($transfers,
            [
                'transfers' => $transfers->map(function ($transfer) {
                    return $transfer->transform();
                })
            ]);
    }
}
