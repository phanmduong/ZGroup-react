<?php

namespace Modules\Task\Http\Controllers;

use App\CalendarEvent;
use App\Card;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Modules\Task\Repositories\UserCardRepository;

class CardController extends ManageApiController
{
    protected $userCardRepository;

    public function __construct(UserCardRepository $userCardRepository)
    {
        parent::__construct();
        $this->userCardRepository = $userCardRepository;
    }

    public function assignMember($cardId, $userId)
    {
        $this->userCardRepository->assign($cardId, $userId, $this->user);
        return $this->respond(["status" => 1]);
    }

    public function updateCardDeadline($cardId, Request $request)
    {
        $card = Card::find($cardId);
        if (is_null($card)) {
            return $this->responseBadRequest("Thẻ không tồn tại");
        }
        if (is_null($request->deadline) || $request->deadline == "") {
            return $this->responseBadRequest("Thiếu hạn chót");
        }

        $card->deadline = format_time_to_mysql(strtotime($request->deadline));
        $card->save();

        $this->userCardRepository->updateCalendarEvent($cardId);

        return $this->respondSuccessWithStatus([
            "deadline_elapse" => time_remain_string(strtotime($card->deadline)),
            "deadline" => format_vn_short_datetime(strtotime($card->deadline)),
            "message" => "Sửa hạn chót thành công"
        ]);
    }

    public function card($cardId)
    {
        $data = $this->userCardRepository->loadCardDetail($cardId);
        return $this->respond($data);
    }

    public function updateCardTitle($cardId, Request $request)
    {
        if (is_null($request->title)) {
            return $this->responseBadRequest("Thiếu params");
        }

        $card = Card::find($cardId);
        $card->title = trim($request->title);
        $card->save();

        $this->userCardRepository->updateCalendarEvent($card->id);
        return $this->respondSuccessWithStatus(["message" => "success"]);
    }


}
