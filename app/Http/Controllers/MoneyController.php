<?php

namespace App\Http\Controllers;

use App\Gen;
use App\Transaction;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class MoneyController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
        $this->data['current_tab'] = 30;
    }

    public function spend_money()
    {
        $this->data['money'] = $this->user->money;
        $this->data['spends'] = $this->user->send_transactions()->where('type', '!=', 0)->orderBy('created_at', 'desc')->take(20)->get();
        return view('manage.money.spend_money', $this->data);
    }

    public function store_transaction(Request $request)
    {
        $money = $request->money;
        $note = $request->note;
        $type = $request->type;
        if ($money == null || $type == null) {
            Session::flash('message', '<strong class="red-text">Bạn cần nhập số tiền và chọn loại giao dịch</strong>');
            return redirect('manage/spendmoney');
        }

        $current_money = $this->user->money;
        if ($type == 2) {
            if ($current_money < $money) {
                Session::flash('message', '<strong class="red-text">Bạn không thể chi nhiều hơn số tiền mình có</strong>');
            } else {
                Session::flash('message', '<strong class="blue-text">Bạn đã chi ' . currency_vnd_format($money) . '</strong>');
                $this->user->money = $current_money - $money;
                $this->user->save();
                $transaction = new Transaction();
                $transaction->money = $money;
                $transaction->note = $note;
                $transaction->type = $type;
                $transaction->status = 1;
                $transaction->sender_id = $this->user->id;
                $transaction->sender_money = $current_money;
                $transaction->save();
            }
        } else {
            Session::flash('message', '<strong class="green-text">Bạn đã thêm ' . currency_vnd_format($money) . '</strong>');
            $this->user->money = $current_money + $money;
            $this->user->save();
            $transaction = new Transaction();
            $transaction->money = $money;
            $transaction->note = $note;
            $transaction->type = $type;
            $transaction->status = 1;
            $transaction->sender_id = $this->user->id;
            $transaction->sender_money = $current_money;
            $transaction->save();
        }


        return redirect('manage/spendmoney');
    }

    public function spend_list(Request $request)
    {
        $limit = 10;
        $id = $request->id;
        $this->data['id'] = $id;
        $transactions = Transaction::where('status', 1);
        if ($id) {
            $this->data['current_tab'] = 17;
            $transactions = $transactions->where(function ($query) use ($id) {
                $query->where('sender_id', $id)
                    ->orWhere(function ($query) use ($id) {
                        $query->where("receiver_id", $id)->where('type', "!=", 1);
                    });
            });
        } else {
            $this->data['current_tab'] = 31;
        }
        $transactions = $transactions->orderBy('created_at', 'desc')->take($limit)->get();


        $this->data['transactions'] = $transactions;

        return view('manage.money.spend_list', $this->data);
    }

    public function ajax_spend_list_load_more(Request $request)
    {
        $limit = 10;
        $page = $request->page;
        $skip = $limit * $page;
        $id = $request->id;
        $transactions = Transaction::where('status', 1);
        if ($id) {
            $transactions = $transactions->where(function ($query) use ($id) {
                $query->where('sender_id', $id)
                    ->orWhere("receiver_id", $id);
            });
        }
        $transactions = $transactions->orderBy('created_at', 'desc')->skip($skip)->take($limit)->get();

        return view('manage.money.ajax_spend_list_load_more', ['transactions' => $transactions]);
    }

    public function expense_income($year = null)
    {
        // choose the current gen
        if (!$year) {
            $year = date("Y");
        }
        $this->data['year'] = $year;
        $this->data['years'] = collect(DB::select('select distinct year(created_at) as year from transactions'))->pluck('year');
//        dd($this->data['years']);

//        $start_time = $current_gen->start_time;
//        $end_time = $current_gen->end_time;

//        $expense_by_month = DB::select('select MONTH(created_at) as month , sum(money) as sum
//                                        from `transactions`
//                                        where type = 2 and
//                                        (created_at BETWEEN "' . $start_time . '" AND "' . $end_time . '")
//                                        group by MONTH(created_at)');
//
//        $income_by_month = DB::select('select MONTH(created_at) as month , sum(money) as sum
//                                        from `transactions`
//                                        where type = 1 and
//                                        (created_at BETWEEN "' . $start_time . '" AND "' . $end_time . '")
//                                        group by MONTH(created_at)');

        $expense_by_month = DB::select('select MONTH(created_at) as month , sum(money) as sum 
                                        from `transactions` 
                                        where type = 2 and 
                                        year(created_at) = ' . $year . '
                                        group by MONTH(created_at)');

        $income_by_month = DB::select('select MONTH(created_at) as month , sum(money) as sum 
                                        from `transactions` 
                                        where type = 1 and 
                                        year(created_at) = ' . $year . '
                                        group by MONTH(created_at)');

        $months = array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);

        $income_data = array(1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0, 6 => 0, 7 => 0, 8 => 0, 9 => 0, 10 => 0, 11 => 0, 12 => 0, );
        $expense_data = array(1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0, 6 => 0, 7 => 0, 8 => 0, 9 => 0, 10 => 0, 11 => 0, 12 => 0, );

        foreach ($expense_by_month as $e) {
//            if (!in_array($e->month, $months)) {
//                $months[] = $e->month;
//            }
            $expense_data[$e->month] = $e->sum;
        }
        foreach ($income_by_month as $e) {
//            if (!in_array($e->month, $months)) {
//                $months[] = $e->month;
//            }
            $income_data[$e->month] = $e->sum;
        }

        $expense_array = array();
        $income_array = array();

        sort($months);

        foreach ($months as $month) {
            if (array_key_exists($month, $expense_data)) {
                $expense_array[] = $expense_data[$month];
            } else {
                $expense_array[] = 0;
            }

            if (array_key_exists($month, $income_data)) {
                $income_array[] = $income_data[$month];
            } else {
                $income_array[] = 0;
            }
        }

//        dd($expense_array);
        $this->data['months_str'] = json_encode(collect($months)->map(function ($value) {
            return "tháng " . $value;
        }));
        $this->data['expense_str'] = json_encode($expense_array);
        $this->data['income_str'] = json_encode($income_array);
        return view('manage.money.expense_income', $this->data);
    }
}
