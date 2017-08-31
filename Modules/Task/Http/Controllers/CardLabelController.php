<?php

namespace Modules\Task\Http\Controllers;

use App\Board;
use App\Card;
use App\Http\Controllers\ManageApiController;
use App\Project;
use App\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Task\Entities\CardLabel;
use Modules\Task\Entities\TaskList;

class CardLabelController extends ManageApiController
{


    public function __construct()
    {
        parent::__construct();

    }

    public function createLabel($projectId, Request $request)
    {
        $project = Project::find($projectId);
        if (is_null($project)) {
            return $this->responseBadRequest("Dự án không tồn tại");
        }
        if (is_null($request->id)) {
            $cardLabel = new CardLabel();
        } else {
            $cardLabel = CardLabel::find($request->id);
        }
        $cardLabel->name = trim($request->name);
        $cardLabel->project_id = $projectId;
        $cardLabel->color = trim($request->color);
        $cardLabel->editor_id = $this->user->id;
        $cardLabel->creator_id = $this->user->id;
        $cardLabel->save();

        return $this->respondSuccessWithStatus([
            "message" => "Tạo nhãn thành công",
            "label" => $cardLabel
        ]);
    }

    public function loadLabels($projectId)
    {

        $project = Project::find($projectId);
        if (is_null($project)) {
            return $this->responseBadRequest("Dự án không tồn tại");
        }
        $labels = $project->labels;
        return $this->respondSuccessWithStatus(["labels" => $labels]);
    }

    public function deleteCardLabel($cardLabelId)
    {
        $cardLabel = CardLabel::find($cardLabelId);
        if (is_null($cardLabel)) {
            return $this->responseBadRequest("nhãn không tồn tại");
        }

        $cardLabel->delete();
        return $this->respondSuccessWithStatus([
            "message" => "Xoá nhãn thành công"
        ]);
    }

    public function assignCardLabel($cardLabelId, $cardId)
    {
        $card = Card::find($cardId);
        if (is_null($card)) {
            return $this->responseBadRequest("Thẻ không tồn tại");
        }

        $temp = $card->cardLabels()->where("card_labels.id", $cardLabelId)->first();

        if (is_null($temp)) {
            $card->cardLabels()->attach($cardLabelId, [
                "labeler_id" => $this->user->id,
            ]);
        } else {
            $card->cardLabels()->detach($cardLabelId);
        }

        return $this->respondSuccessWithStatus([
            "message" => "gắn nhãn thành công"
        ]);
    }

}
