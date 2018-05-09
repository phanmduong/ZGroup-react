<?php
namespace Modules\Finance\Http\Controllers;
use App\CategoryTransaction;
//use App\Course;
use App\Gen;
use App\Http\Controllers\ManageApiController;
use App\Transaction;
use App\TransferMoney;
use App\BankAccount;
use App\User;
use Illuminate\Http\Request;
//use Illuminate\Http\Response;
//use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
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
    public function getStaffsKeepMoney(Request $request)
    {
        $limit = 20;
        $q = $request->search;
        $staffs = User::query();
        if ($q != null) {
            $staffs = $staffs->where(function ($query) use ($q) {
                $query->where('email', 'like', '%' . $q . '%')
                    ->orWhere('name', 'like', '%' . $q . '%')
                    ->orWhere('phone', 'like', '%' . $q . '%');
            });
        }
        $staffs = $staffs->whereBetween('role', [1, 2])->orderBy('money', 'desc')->paginate($limit);
        $total_money = User::whereBetween('role', [1, 2])->where('money', '>', 0)->sum('money');
        $total_staffs = User::whereBetween('role', [1, 2])->where('money', '>', 0)->count();
        $data = [
            'total_money' => $total_money,
            'total_staffs' => $total_staffs,
            'staffs' => $staffs->map(function ($staff) {
                $data = $staff->getData();
                $data['money'] = $staff->money;
                return $data;
            })
        ];
        return $this->respondWithPagination($staffs, $data);
    }
    public function historyTransactionStaff($staff_id, Request $request)
    {
        $limit = 20;
        $transactions = Transaction::where(function ($q) use ($staff_id) {
            $q->where('sender_id', $staff_id)->orWhere('receiver_id', $staff_id);
        });
        if ($request->type != null) {
            $transactions = $transactions->where('type', $request->type);
        }
        $transactions = $transactions->where('status', 1)->orderBy('updated_at', 'desc')->paginate($limit);
        $data = [
            'transactions' => $transactions->map(function ($transaction) use ($staff_id) {
                $data = [
                    'updated_at' => format_vn_short_datetime(strtotime($transaction->updated_at)),
                    'money' => $transaction->money,
                    'type' => $transaction->type,
                    'status' => $transaction->status,
                    'sender_id' => $transaction->sender_id,
                    'receiver_id' => $transaction->receiver_id,
                ];
                if ($transaction->sender_id == $staff_id) {
                    $data['before_money'] = $transaction->sender_money;
                } else {
                    $data['before_money'] = $transaction->receiver_money;
                }
                if ($transaction->type == 0) {
                    if ($transaction->sender_id == $staff_id) {
                        $data['note'] = "Gửi tiền đến " . $transaction->receiver->name;
                    } else {
                        $data['note'] = "Nhận tiền từ " . $transaction->sender->name;
                    }
                } else {
                    $data['note'] = $transaction->note;
                }
                return $data;
            })
        ];
        return $this->respondWithPagination($transactions, $data);
    }
    public function historyTransactions(Request $request)
    {
        $limit = 20;
        $transactions = Transaction::query();
        if ($request->type != null) {
            $transactions = $transactions->where('type', $request->type);
        }
        $transactions = $transactions->where('status', 1)->orderBy('created_at', 'desc')->paginate($limit);
        $data = [
            'transactions' => $transactions->map(function ($transaction) {
                $dataTransaction = [
                    'updated_at' => format_vn_short_datetime(strtotime($transaction->updated_at)),
                    'money' => $transaction->money,
                    'type' => $transaction->type,
                    'status' => $transaction->status,
                    'sender_id' => $transaction->sender_id,
                    'receiver_id' => $transaction->receiver_id,
                    'before_money' => $transaction->sender_money
                ];
                if ($transaction->type == 0) {
                    $dataTransaction['note'] = "Gửi tiền đến " . $transaction->receiver->name;
                } else {
                    $dataTransaction['note'] = $transaction->note;
                }
                if ($transaction->sender) {
                    $dataTransaction['sender'] = $transaction->sender->getData();
                }
                return $dataTransaction;
            })
        ];
        return $this->respondWithPagination($transactions, $data);
    }
    public function historySpendMoneyStaff(Request $request)
    {
        $limit = 20;
        $staff_id = $this->user->id;
        $transactions = Transaction::where(function ($q) use ($staff_id) {
            $q->where('sender_id', $staff_id)->orWhere('receiver_id', $staff_id);
        });
        if ($request->type != null) {
            $transactions = $transactions->where('type', $request->type);
        }
        $transactions = $transactions->where('status', 1)->orderBy('created_at', 'desc')->paginate($limit);
        $data = [
            'transactions' => $transactions->map(function ($transaction) use ($staff_id) {
                $data = [
                    'updated_at' => format_vn_short_datetime(strtotime($transaction->updated_at)),
                    'money' => $transaction->money,
                    'type' => $transaction->type,
                    'status' => $transaction->status,
                    'sender_id' => $transaction->sender_id,
                    'receiver_id' => $transaction->receiver_id,
                ];
                if ($transaction->sender_id == $staff_id) {
                    $data['before_money'] = $transaction->sender_money;
                } else {
                    $data['before_money'] = $transaction->receiver_money;
                }
                if ($transaction->type == 0) {
                    if ($transaction->sender_id == $staff_id) {
                        $data['note'] = "Gửi tiền đến " . $transaction->receiver->name;
                    } else {
                        $data['note'] = "Nhận tiền từ " . $transaction->sender->name;
                    }
                } else {
                    $data['note'] = $transaction->note;
                }
                if ($transaction->category) {
                    $data['category'] = $transaction->category->transform();
                }
                return $data;
            })
        ];
        return $this->respondWithPagination($transactions, $data);
    }
    public function getCategoryTransactions()
    {
        $category_transactions = CategoryTransaction::all();
        $category_transactions = $category_transactions->map(function ($category) {
            return $category->transform();
        });
        return $this->respondSuccessWithStatus([
            'categories' => $category_transactions
        ]);
    }
    public function createSpendMoney(Request $request)
    {
        $type = $request->type;
        if ($type == null) {
            return $this->respondErrorWithStatus("Thiếu loại giao dịch");
        }
        if ($request->note == null) {
            return $this->respondErrorWithStatus("Vui lòng nhập ghi chú");
        }
        if ($request->money == null) {
            return $this->respondErrorWithStatus('Vui lòng nhập số tiền gửi');
        }
        if ($request->money < 0) {
            return $this->respondErrorWithStatus('Số tiền không được nhỏ hơn 0');
        }
        if ($type != 1 && $type != 2) {
            return $this->respondErrorWithStatus("Sai loại giao dịch");
        }
        if ($type == 2 && $request->money > $this->user->money) {
            return $this->respondErrorWithStatus("Bạn đã chi quá số tiền bạn có");
        }
        $transaction = new Transaction();
        $transaction->sender_id = $this->user->id;
        $transaction->money = $request->money;
        $transaction->note = $request->note;
        $transaction->type = $request->type;
        $transaction->category_id = $request->category_id;
        $transaction->status = 1;
        $transaction->sender_money = $this->user->money;
        $transaction->save();
        if ($transaction->type == 2) {
            $this->user->money -= $transaction->money;
        } else {
            $this->user->money += $transaction->money;
        }
        $this->user->save();
        return $this->respondSuccessWithStatus([
            'money_staff' => $this->user->money,
            'transaction' => [
                'updated_at' => format_vn_short_datetime(strtotime($transaction->updated_at)),
                'money' => $transaction->money,
                'type' => $transaction->type,
                'status' => $transaction->status,
                'sender_id' => $transaction->sender_id,
                'receiver_id' => $transaction->receiver_id,
                'before_money' => $transaction->sender_money,
                'note' => $transaction->note,
                "category_id" => $transaction->category ? $transaction->category->transform() : null
            ]
        ]);
    }
    public function summaryFinance(Request $request)
    {
        $gen = Gen::find($request->gen_id);
        if ($gen == null) {
            $gen = Gen::getCurrentGen();
        }
        $start_time = $request->start_time ? $request->start_time : $gen->start_time;
        $end_time = $request->end_time ? $request->end_time : $gen->end_time;
        $end_time = date("Y-m-d", strtotime("+1 day", strtotime($end_time)));
        $date_array = createDateRangeArray(strtotime($start_time), strtotime($end_time));
        $collectMoneyTemp = Transaction::select(DB::raw('DATE(created_at) as date, sum(money) as money'))
            ->whereBetween('created_at', array($start_time, $end_time))
            ->where('type', 1)
            ->where('status', 1)
            ->groupBy(DB::raw('DATE(created_at)'))->pluck('money', ' date');
        $spendMoneyTemp = Transaction::select(DB::raw('DATE(created_at) as date, sum(money) as money'))
            ->whereBetween('created_at', array($start_time, $end_time))
            ->where('type', 2)
            ->where('status', 1)
            ->groupBy(DB::raw('DATE(created_at)'))->pluck('money', ' date');
        $collectMoney = array();
        $spendMoney = array();
        $totalCollectMoney = 0;
        $totalSpendMoney = 0;
        $di = 0;
        foreach ($date_array as $date) {
            if (isset($collectMoneyTemp[$date])) {
                $collectMoney[$di] = $collectMoneyTemp[$date];
                $totalCollectMoney += $collectMoney[$di];
            } else {
                $collectMoney[$di] = 0;
            }
            if (isset($spendMoneyTemp[$date])) {
                $spendMoney[$di] = $spendMoneyTemp[$date];
                $totalSpendMoney += $spendMoney[$di];
            } else {
                $spendMoney[$di] = 0;
            }
            $di += 1;
        }
        return $this->respondSuccessWithStatus([
            'total_collect_money' => $totalCollectMoney,
            'total_spend_money' => $totalSpendMoney,
            'spend_money_date' => $spendMoney,
            'collect_money_date' => $collectMoney,
            'date_array' => $date_array,
        ]);
    }
    public function historySpendMoney(Request $request)
    {
        $gen = Gen::find($request->gen_id);
        if ($gen == null) {
            $gen = Gen::getCurrentGen();
        }
        $start_time = $request->start_time ? $request->start_time : $gen->start_time;
        $end_time = $request->end_time ? $request->end_time : $gen->end_time;
        $end_time = date("Y-m-d", strtotime("+1 day", strtotime($end_time)));
        $limit = 20;
        $transactions = Transaction::whereBetween('created_at', array($start_time, $end_time));
        if ($request->type == null) {
            $transactions = $transactions->whereBetween('type', [1, 2]);
        } else {
            $transactions = $transactions->where('type', $request->type);
        }
        $transactions = $transactions->where('status', 1)->orderBy('created_at', 'desc')->paginate($limit);
        $data = [
            'transactions' => $transactions->map(function ($transaction) {
                $dataTransaction = [
                    'updated_at' => format_vn_short_datetime(strtotime($transaction->updated_at)),
                    'money' => $transaction->money,
                    'type' => $transaction->type,
                    'status' => $transaction->status,
                    'sender_id' => $transaction->sender_id,
                    'receiver_id' => $transaction->receiver_id,
                    'before_money' => $transaction->sender_money
                ];
                if ($transaction->category) {
                    $dataTransaction['category'] = $transaction->category->transform();
                }
                if ($transaction->sender) {
                    $dataTransaction['sender'] = $transaction->sender->getData();
                }
                $dataTransaction['note'] = $transaction->note;
                return $dataTransaction;
            })
        ];
        return $this->respondWithPagination($transactions, $data);
    }
}