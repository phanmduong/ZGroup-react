<?php

namespace Modules\Finance\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\TransferMoney;
use Illuminate\Http\Request;
use App\BankAccount;
//use Illuminate\Http\Response;

class FinanceManageApiController extends ManageApiController
{
    public function updatebankTransfer($bankTransferId, Request $request)
    {
        $bankTransfer = TransferMoney::find($bankTransferId);
        if ($bankTransfer === null) {
            return $this->respondErrorWithStatus("Không tồn tại tài khoản nào");
        }
        $bankTransfer->status = $request->status;
        $bankTransfer->save();
        return $this->respondSuccessWithStatus([
            "bank_transfer" => $bankTransfer->transform()
        ]);
    }

    public function bankTransfers(Request $request)
    {
        $limit = 20;
        $search = $request->search;

        if ($request->limit)
            $limit = $request->limit;

        $transferQuery = TransferMoney::orderBy("created_at", "desc");

        if ($limit === -1) {
            $transfers = $transferQuery->get();
            return $this->respondSuccessWithStatus([
                "bank_transfers" => $transfers->map(function ($transfer) {
                    return $transfer->transform();
                })
            ]);
        } else {
            $transfers = $transferQuery->paginate($limit);
            return $this->respondWithPagination($transfers, [
                "bank_transfers" => $transfers->map(function ($transfer) {
                    return $transfer->transform();
                })
            ]);
        }

    }

    public function getBankAccounts()
    {
        $bankAccounts = BankAccount::query();
        $bankAccounts = $bankAccounts->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($bankAccounts, [
            'bank_accounts' => $bankAccounts->map(function ($roomType) {
                return $roomType->getData();
            })
        ]);
    }
}
