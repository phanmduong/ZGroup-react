<?php

namespace Modules\Staff\Http\Controllers;

use App\Card;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class StaffChartApiController extends ManageApiController
{
    /**
     * GET /staff
     * @return Response
     */
    public function countStaffCards(Request $request)
    {
        if ($request->to === null || $request->from === null) {
            return $this->respondErrorWithStatus("Bạn cần truyền lên người bắt đầu và ngày kết thúc ");
        }

        $to = date_create_from_format("d/m/Y H:i:s", $request->to . " 00:00:00");
        $from = date_create_from_format("d/m/Y H:i:s", $request->from . " 00:00:00");

        if ($to < $from) {
            return $this->respondErrorWithStatus("Thời gian bắt đầu không được lớn hơn thời gian kết thúc");
        }

        $cards = Card::whereBetween("updated_at", [$from, $to])->groupBy(DB::raw("date(updated_at)"))
            ->select(DB::raw('count(1) as num_cards, date(updated_at) as day'))
            ->orderBy("day")->get();


        return $this->respondSuccessWithStatus([
            "days" => $cards->map(function ($card) {
                return $card->day;
            }),
            "num_cards" => $cards->map(function ($card) {
                return $card->num_cards;
            })
        ]);
    }

}
