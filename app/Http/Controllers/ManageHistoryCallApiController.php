<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/8/17
 * Time: 13:29
 */

namespace App\Http\Controllers;


use App\TeleCall;
use Illuminate\Http\Request;

class ManageHistoryCallApiController extends ManageApiController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function history_calls(Request $request)
    {
        $limit = 40;
        $search = $request->search;
        $teleCalls = TeleCall::query();

        if ($request->caller_id) {
            $teleCalls = $teleCalls->where('tele_calls.caller_id', $request->caller_id);
        };

        if ($request->search)
            $teleCalls = $teleCalls->join('users', 'users.id', '=', 'tele_calls.student_id')
                ->where(function ($query) use ($search) {
                    $query->where('users.name', 'like', "%$search%")->orWhere('users.phone', 'like', "%$search%")
                        ->orWhere('users.email', 'like', "%$search%")->orWhere('tele_calls.note', 'like', "%$search%");
                })->select('tele_calls.*');
        $teleCalls = $teleCalls->orderBy("tele_calls.created_at", "desc")->paginate($limit);

        $data = [
            "tele_calls" => $teleCalls->map(function ($teleCall) {
                return [
                    'id' => $teleCall->id,
                    'student' => [
                        'id' => $teleCall->student->id,
                        'name' => $teleCall->student->name,
                        'email' => $teleCall->student->email,
                        'phone' => $teleCall->student->phone,
                    ],
                    'call_status' => call_status_text($teleCall->call_status),
                    'caller' => [
                        'id' => $teleCall->caller->id,
                        'name' => $teleCall->caller->name,
                        'color' => $teleCall->caller->color,
                    ],
                    'note' => $teleCall->note,
                    'call_time' => format_date_full_option($teleCall->created_at),
                    'appointment_payment' => $teleCall->appointment_payment ? date_shift(strtotime($teleCall->appointment_payment)) : '',
                ];
            })
        ];
        return $this->respondWithPagination($teleCalls, $data);

    }
}