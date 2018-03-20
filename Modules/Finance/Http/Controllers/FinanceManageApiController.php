<?php

namespace Modules\Finance\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\TransferMoney;
use App\BankAccount;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
        $bankAccounts = $bankAccounts->orderBy('created_at', 'desc')->get();
        return $this->respondSuccessWithStatus([
            'bank_accounts' => $bankAccounts->map(function ($bankAccount) {
                return $bankAccount->getData();
            })
        ]);
    }

    public function createBankAccount(Request $request)
    {
        if ($request->bank_name == null || trim($request->bank_name) == '') {
            return $this->respondErrorWithStatus('Thiếu tên ngân hàng');
        }
        if ($request->bank_account_name == null || trim($request->bank_account_name) == '') {
            return $this->respondErrorWithStatus('Thiếu tên tài khoản ngân hàng');
        }
        if ($request->account_number == null || trim($request->account_number) == '') {
            return $this->respondErrorWithStatus('Thiếu số tài khoản');
        }
        if ($request->owner_name == null || trim($request->owner_name) == '') {
            return $this->respondErrorWithStatus('Thiếu tên chủ tài khoản');
        }
        if ($request->branch == null || trim($request->branch) == '') {
            return $this->respondErrorWithStatus('Thiếu tên chi nhánh ngân hàng');
        }
        if ($request->display == null || trim($request->display) == '') {
            return $this->respondErrorWithStatus('Thiếu trạng thái hiển thị');
        }
        $bankAccounts = new BankAccount;
        $bankAccounts->bank_name = $request->bank_name;
        $bankAccounts->bank_account_name = $request->bank_account_name;
        $bankAccounts->account_number = $request->account_number;
        $bankAccounts->owner_name = $request->owner_name;
        $bankAccounts->branch = $request->branch;
        $bankAccounts->display = $request->display;
        $bankAccounts->save();

        return $this->respondSuccess('Tạo thành công');
    }

    public function editBankAccount($bankAccountId, Request $request)
    {
        if ($request->bank_name == null || trim($request->bank_name) == '') {
            return $this->respondErrorWithStatus('Thiếu tên ngân hàng');
        }
        if ($request->bank_account_name == null || trim($request->bank_account_name) == '') {
            return $this->respondErrorWithStatus('Thiếu tên tài khoản ngân hàng');
        }
        if ($request->account_number == null || trim($request->account_number) == '') {
            return $this->respondErrorWithStatus('Thiếu số tài khoản');
        }
        if ($request->owner_name == null || trim($request->owner_name) == '') {
            return $this->respondErrorWithStatus('Thiếu tên chủ tài khoản');
        }
        if ($request->branch == null || trim($request->branch) == '') {
            return $this->respondErrorWithStatus('Thiếu tên chi nhánh ngân hàng');
        }
        if ($request->display == null || trim($request->display) == '') {
            return $this->respondErrorWithStatus('Thiếu trạng thái hiển thị');
        }
        $bankAccount = BankAccount::find($bankAccountId);
        if ($bankAccount == null) {
            return $this->respondErrorWithStatus('Không tồn tại tài khoản này');
        }
        $bankAccount->bank_name = $request->bank_name;
        $bankAccount->bank_account_name = $request->bank_account_name;
        $bankAccount->account_number = $request->account_number;
        $bankAccount->owner_name = $request->owner_name;
        $bankAccount->branch = $request->branch;
        $bankAccount->display = $request->display;
        $bankAccount->save();

        return $this->respondSuccess('Sửa thành công');
    }
}
