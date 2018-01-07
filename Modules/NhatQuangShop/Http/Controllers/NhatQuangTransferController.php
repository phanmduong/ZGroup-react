<?php

namespace App\Http\Controllers;

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
        public function createTransfer(Request $request){
            $validator = Validator::make($request->all(), [
                'note' => 'required|max:255',
                'money_transfer' => 'required',
                'account_transfer' => 'required',
            ]);

            if ($validator->fails()) {
                return redirect('/manage/transfer')
                    ->withInput()
                    ->withErrors($validator);
            }
           $user = Auth::user();
           $transfer = new TransferMoney;
           $transfer->user_id = $user->id;
           $transfer->money_transfer = $request->money_transfer;
           $transfer->note = $request->note;
           $transfer->account_transfer = $request->account_transfer;
           $transfer->save();
           $tranfers = TransferMoney::where('user_id', '=', $user->id );
           $this->data['transfers'] = $tranfers;
           return view('"nhatquangshop::transfer_money',$this->data);
        }
}
