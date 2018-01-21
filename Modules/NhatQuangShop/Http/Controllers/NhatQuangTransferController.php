<?php

namespace Modules\NhatQuangShop\Http\Controllers;

use App\BankAccount;
use App\Good;
use App\Order;
use App\Product;
use App\TransferMoney;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Modules\Good\Entities\GoodProperty;
use Modules\Graphics\Repositories\BookRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class NhatQuangTransferController extends Controller
{
    //
    public function __construct(BookRepository $bookRepository)
    {
        $this->middleware('auth');
        $this->bookRepository = $bookRepository;
        $this->data = array();

        if (!empty(Auth::user())) {
            $this->user = Auth::user();
            $this->data['user'] = $this->user;
        }
    }

    public function transferMoneys()
    {
        $bankaccounts = BankAccount::all();
        $this->data['bankaccounts'] = $bankaccounts;
        $transfers = TransferMoney::where('user_id', '=', $this->user->id)->orderBy('created_at', 'desc')->paginate(10);
        $this->data['transfers'] = $transfers;
        return view('nhatquangshop::transfer_money', $this->data);
    }

    public function createTransfer(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'money' => 'required|numeric|min:0',
            'bank_account_id' => 'required',
            'transfer_day' => 'required'
        ], [
                'money.required' => 'Bạn chưa nhập số tiền cần chuyển',
                'transfer_day.required' => 'Bạn chưa nhập ngày chuyển tiền',
                'money.min' => "Bạn không thể báo chuyển khoản số tiền âm ",
                'bank_account_id.required' => 'Bạn chưa chọn phương thức chuyển khoản',
            ]
        );

        if ($validator->fails()) {
            return redirect('/manage/transfermoney')
                ->withInput()
                ->withErrors($validator);
        }
        $transfer = new TransferMoney;
        $transfer->user_id = $this->user->id;
        $transfer->money = $request->money;
        $transfer->note = $request->note;
        $transfer->transfer_day = $request->transfer_day;
        $transfer->bank_account_id = $request->bank_account_id;
        $transfer->status = "pending";
        $transfer->save();

        return redirect("manage/transfermoney")->with('message', 'Thêm lượt chuyển khoản thành công');;
    }
}
