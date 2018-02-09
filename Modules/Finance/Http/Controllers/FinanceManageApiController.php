<?php

namespace Modules\Finance\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\TransferMoney;
use App\BankAccount;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FinanceManageApiController extends ManageApiController
{
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

    public function createBankAccount(Request $request)
    {
        if (
            ($request->bank_name == null || trim($request->bank_name) == '')
            || ($request->bank_account_name == null || trim($request->bank_account_name) == '')
            || ($request->account_number == null || trim($request->account_number) == '')
            || ($request->owner_name == null || trim($request->owner_name) == '')
            || ($request->branch == null || trim($request->branch) == '')
        ) return [
            'message' => 'Thiếu trường',
            'status' => 0,
        ];
        $bank_account = new BankAccount;
        $bank_account->bank_name = $request->bank_name;
        $bank_account->bank_account_name = $request->bank_account_name;
        $bank_account->account_number = $request->account_number;
        $bank_account->owner_name = $request->owner_name;
        $bank_account->branch = $request->branch;
        $bank_account->display = $request->display;
        $bank_account->save();
        return [
            'message' => 'SUCCESS',
            'status' => 1
        ];
    }

    public function getBankAccounts()
    {
        $bank_accounts = BankAccount::all();
        return $this->respondSuccessWithStatus([
            "bank_accounts" => $bank_accounts
        ]);
    }

    public function editBankAccount($bank_account_id, Request $request)
    {
        if (
            ($request->bank_name == null || trim($request->bank_name) == '')
            || ($request->bank_account_name == null || trim($request->bank_account_name) == '')
            || ($request->account_number == null || trim($request->account_number) == '')
            || ($request->owner_name == null || trim($request->owner_name) == '')
            || ($request->branch == null || trim($request->branch) == '')
        ) return [
            'message' => 'Thieu truong',
            'status' => 0,
        ];
        $bank_account = BankAccount::find($bank_account_id);
        $bank_account->bank_name = $request->bank_name;
        $bank_account->bank_account_name = $request->bank_account_name;
        $bank_account->account_number = $request->account_number;
        $bank_account->owner_name = $request->owner_name;
        $bank_account->branch = $request->branch;
        $bank_account->display = $request->display;
        $bank_account->save();
        return [
            'message' => 'Sửa tài khoản ngân hàng thành công',
            'status' => 1
        ];
    }

    public function hideBankAccount($bank_account_id){
        $bank_account = BankAccount::find($bank_account_id);
        $bank_account->display = 0;
        $bank_account->save();
        return [
            'message' => 'Đã ẩn tài khoản ngân hàng này',
            'status' => 1
        ];
    }
}
