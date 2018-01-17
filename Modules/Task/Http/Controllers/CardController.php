<?php

namespace Modules\Task\Http\Controllers;

use App\CalendarEvent;
use App\Card;
use App\Http\Controllers\ManageApiController;
use App\Notification;
use App\Project;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Modules\Task\Repositories\CardRepository;
use Modules\Task\Repositories\ProjectRepository;
use Modules\Task\Repositories\UserCardRepository;

class CardController extends ManageApiController
{
    protected $userCardRepository;
    protected $projectRepository;
    protected $cardRepository;

    public function __construct(
        CardRepository $cardRepository,
        UserCardRepository $userCardRepository,
        ProjectRepository $projectRepository)
    {
        parent::__construct();
        $this->userCardRepository = $userCardRepository;
        $this->projectRepository = $projectRepository;
        $this->cardRepository = $cardRepository;
    }

    public function changeRoleProjectMember($projectId, $memberId, $role)
    {
        $this->projectRepository->assignRoleMember($projectId, $memberId, $role, $this->user);
        return $this->respond(["status" => 1]);
    }

    public function assignMember($cardId, $userId)
    {
        $this->userCardRepository->assign($cardId, $userId, $this->user);
        return $this->respond(["status" => 1]);
    }

    public function assignProjectMember($projectId, $userId)
    {
        $this->projectRepository->assign($projectId, $userId, $this->user);
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

        $currentUser = $this->user;
        $project = $card->board->project;

        foreach ($card->assignees as $user) {

            if ($currentUser && $currentUser->id != $user->id) {

                $notification = new Notification;
                $notification->actor_id = $currentUser->id;
                $notification->card_id = $cardId;
                $notification->receiver_id = $user->id;
                $notification->type = 8;
                $message = $notification->notificationType->template;

                $message = str_replace('[[ACTOR]]', "<strong>" . $currentUser->name . "</strong>", $message);
                $message = str_replace('[[CARD]]', "<strong>" . $card->title . "</strong>", $message);
                $message = str_replace('[[PROJECT]]', "<strong>" . $project->title . "</strong>", $message);
                $notification->message = $message;

                $notification->color = $notification->notificationType->color;
                $notification->icon = $notification->notificationType->icon;
                $notification->url = '/project/' . $project->id . '/boards' . "?card_id=" . $cardId;

                $notification->save();

                $data = array(
                    "message" => $message,
                    "link" => $notification->url,
                    'created_at' => format_time_to_mysql(strtotime($notification->created_at)),
                    "receiver_id" => $notification->receiver_id,
                    "actor_id" => $notification->actor_id,
                    "icon" => $notification->icon,
                    "color" => $notification->color
                );

                $publish_data = array(
                    "event" => "notification",
                    "data" => $data
                );

                Redis::publish(config("app.channel"), json_encode($publish_data));
            }
        }


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
        $oldName = $card->title;
        $card->title = trim($request->title);
        $card->save();

        $currentUser = $this->user;
        $project = $card->board->project;

        foreach ($card->assignees as $user) {

            if ($currentUser && $currentUser->id != $user->id) {

                $notification = new Notification;
                $notification->actor_id = $currentUser->id;
                $notification->card_id = $cardId;
                $notification->receiver_id = $user->id;
                $notification->type = 12;
                $message = $notification->notificationType->template;

                $message = str_replace('[[ACTOR]]', "<strong>" . $currentUser->name . "</strong>", $message);
                $message = str_replace('[[CARD]]', "<strong>" . $oldName . "</strong>", $message);
                $message = str_replace('[[NAME]]', "<strong>" . $card->title . "</strong>", $message);
                $notification->message = $message;

                $notification->color = $notification->notificationType->color;
                $notification->icon = $notification->notificationType->icon;
                $notification->url = '/project/' . $project->id . '/boards' . "?card_id=" . $cardId;

                $notification->save();

                $data = array(
                    "message" => $message,
                    "link" => $notification->url,
                    'created_at' => format_time_to_mysql(strtotime($notification->created_at)),
                    "receiver_id" => $notification->receiver_id,
                    "actor_id" => $notification->actor_id,
                    "icon" => $notification->icon,
                    "color" => $notification->color
                );

                $publish_data = array(
                    "event" => "notification",
                    "data" => $data
                );

                Redis::publish(config("app.channel"), json_encode($publish_data));
            }
        }

        $this->userCardRepository->updateCalendarEvent($card->id);
        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function commentCard(Request $request, $cardId)
    {
        $content = $request->comment_content;
        $commenter_id = $this->user->id;

        if (is_null($content)) {
            return $this->respondErrorWithStatus("Params cần: comment_content, card_id");
        }
        $comment = $this->cardRepository->saveCardComment($content, $commenter_id, $cardId, $this->user);
        return $this->respondSuccessWithStatus(["comment" => $comment->transform()]);
    }

    public function archiveCards($projectId)
    {
        $project = Project::find($projectId);
        $board_ids = $project->boards()->pluck('id');
        $cards = Card::whereIn("board_id", $board_ids)->where("status", "close")->orderBy("updated_at", "desc")->paginate(10);
        return $this->respondWithPagination($cards, ["cards" => $cards->map(function ($card) {
            return $card->transform();
        })]);
    }

    public function getGoodPropertiesFilled($cardId, Request $request)
    {
        $card = Card::find($cardId);
        $goodProperties = collect(json_decode($request->good_properties));

        $properties = [];

        foreach ($card->good->properties as $property) {
            $properties[$property->name] = $property->value;
        }

        foreach ($goodProperties as &$goodProperty) {
            if (array_key_exists($goodProperty->name, $properties)) {
                $goodProperty->value = $properties[$goodProperty->name];
            }
        }

        return $this->respondSuccessWithStatus([
            "good_properties" => $goodProperties
        ]);
    }

    public function getCardsFiltered(Request $request)
    {
        if ($request->to === null || $request->from === null) {
            return $this->respondErrorWithStatus("Bạn cần truyền lên người bắt đầu và ngày kết thúc ");
        }

        $to = date_create_from_format("d/m/Y H:i:s", $request->to);
        $from = date_create_from_format("d/m/Y H:i:s", $request->from);

        if ($to < $from) {
            return $this->respondErrorWithStatus("Thời gian bắt đầu không được lớn hơn thời gian kết thúc");
        }
        $cards = Card::query();

        if ($request->staff_id) {
            $cards = $cards
                ->join('card_user', 'cards.id', '=', 'card_user.card_id')
                ->where("card_user.user_id", (int)$request->staff_id);
        }

        if ($request->project_id) {
            $cards = $cards
                ->join('boards', 'boards.id', '=', 'cards.board_id')
                ->where("boards.project_id", (int)$request->project_id);
        }

        $cards = $cards->where("cards.status", "close")
            ->whereBetween("cards.updated_at", [$from, $to])
            ->select(DB::raw('cards.*'))
            ->orderBy("cards.created_at", 'desc')->get();

        return $this->respondSuccessWithStatus([
            "cards" => $cards->map(function ($card) {
                return $card->transform();
            })
        ]);
    }

    /**
     * @param Request $request
     * staff_id
     * project_id
     * to
     * from
     * @return \Illuminate\Http\JsonResponse
     */
    public function countStaffCards(Request $request)
    {
        if ($request->to === null || $request->from === null) {
            return $this->respondErrorWithStatus("Bạn cần truyền lên người bắt đầu và ngày kết thúc ");
        }

        $to = date_create_from_format("d/m/Y H:i:s", $request->to);
        $from = date_create_from_format("d/m/Y H:i:s", $request->from);

        if ($to < $from) {
            return $this->respondErrorWithStatus("Thời gian bắt đầu không được lớn hơn thời gian kết thúc");
        }
        $cardsQuery = Card::query();

        if ($request->staff_id) {
            $cardsQuery = $cardsQuery
                ->join('card_user', 'cards.id', '=', 'card_user.card_id')
                ->where("card_user.user_id", (int)$request->staff_id);
        }

        if ($request->project_id) {
            $cardsQuery = $cardsQuery
                ->join('boards', 'boards.id', '=', 'cards.board_id')
                ->where("boards.project_id", (int)$request->project_id);
        }

        $cards = $cardsQuery->where("cards.status", "close")
            ->whereBetween("cards.updated_at", [$from, $to])->groupBy(DB::raw("date(cards.updated_at)"))
            ->select(DB::raw('count(1) as num_cards, sum(point) as total_points, date(cards.updated_at) as day'))
            ->orderBy("day")->get();

        $dateArray = createDateRangeArray($from->getTimestamp(), $to->getTimestamp());

        $cardsMap = [];
        $pointsMap = [];
        foreach ($cards as $card) {
            $cardsMap[$card->day] = $card->num_cards;
            $pointsMap[$card->day] = $card->total_points;
        }

        $returnCards = [];
        $returnPoints = [];
        foreach ($dateArray as $date) {
            if (array_key_exists($date, $cardsMap)) {
                $returnCards[$date] = $cardsMap[$date];
                $returnPoints[$date] = $pointsMap[$date];
            } else {
                $returnCards[$date] = 0;
                $returnPoints[$date] = 0;
            }
        }

        $staffs = Card::join("card_user", "card_user.card_id", "=", "cards.id")
            ->where("cards.status", "close")
            ->whereBetween("cards.updated_at", [$from, $to])
            ->groupBy(DB::raw("card_user.user_id"))
            ->select(DB::raw('count(1) as num_cards, sum(point) as total_points, card_user.user_id as user_id'))
            ->orderBy("total_points", "desc")
            ->get();


        return $this->respondSuccessWithStatus([
            "days" => $dateArray,
            "num_cards" => array_values($returnCards),
            "total_points" => array_values($returnPoints),
            "staffs" => $staffs->map(function ($staff) {
                $user = User::find($staff->user_id);
                $data = $user->transformAuth();
                $data["num_cards"] = $staff->num_cards;
                $data["total_points"] = $staff->total_points;
                return $data;
            })
        ]);
    }

    public function setPointCard($cardId, $point)
    {
        $card = Card::find($cardId);
        $card->point = $point;
        $card->save();

        return $this->respondSuccessWithStatus([
            "message" => "success"
        ]);
    }
}
