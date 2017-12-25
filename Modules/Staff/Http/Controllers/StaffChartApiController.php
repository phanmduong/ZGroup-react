<?php

namespace Modules\Staff\Http\Controllers;

use App\Card;
use App\Http\Controllers\ManageApiController;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class StaffChartApiController extends ManageApiController
{
    /**
     * GET /staff
     * @return Response
     */
    public function countStaffCards($staffId, Request $request)
    {
        if ($request->to === null || $request->from === null) {
            return $this->respondErrorWithStatus("Bạn cần truyền lên người bắt đầu và ngày kết thúc ");
        }

        $to = date_create_from_format("d/m/Y H:i:s", $request->to);
        $from = date_create_from_format("d/m/Y H:i:s", $request->from);

        if ($to < $from) {
            return $this->respondErrorWithStatus("Thời gian bắt đầu không được lớn hơn thời gian kết thúc");
        }

        $staff = User::find($staffId);
        $cards = $staff->cards()->where("status", "close")->whereBetween("updated_at", [$from, $to])->groupBy(DB::raw("date(updated_at)"))
            ->select(DB::raw('count(1) as num_cards, date(updated_at) as day'))
            ->orderBy("day")->get();

        $dateArray = createDateRangeArray($from->getTimestamp(), $to->getTimestamp());

        $cardsMap = [];
        foreach ($cards as $card) {
            $cardsMap[$card->day] = $card->num_cards;
        }

        $returnCards = [];
        foreach ($dateArray as $date) {
            if (array_key_exists($date, $cardsMap)) {
                $returnCards[$date] = $cardsMap[$date];
            } else {
                $returnCards[$date] = 0;
            }
        }

        return $this->respondSuccessWithStatus([
            "days" => $dateArray,
            "num_cards" => array_values($returnCards)
        ]);
    }

}
