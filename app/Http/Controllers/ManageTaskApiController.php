<?php

namespace App\Http\Controllers;

use App\Board;
use App\Card;
use App\Colorme\Transformers\BoardTransformer;
use App\Colorme\Transformers\CardTransformer;
use App\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ManageTaskApiController extends ManageApiController
{
    protected $boardTransformer;
    protected $cardTransformer;

    public function __construct(BoardTransformer $boardTransformer, CardTransformer $cardTransformer)
    {
        parent::__construct();
        $this->boardTransformer = $boardTransformer;
        $this->cardTransformer = $cardTransformer;
    }


    public function createProject(Request $request)
    {
        if ($request->title == null || $request->description == null) {
            return $this->responseBadRequest("Thiếu params");
        }
        if ($request->id) {
            $project = Project::find($request->id);
            $message = "Sửa dự án thành công";
        } else {
            $project = new Project();
            $message = "Tạo dự án thành công";
        }

        $project->title = trim($request->title);
        $project->description = trim($request->description);
        $project->creator_id = $this->user->id;
        $project->editor_id = $this->user->id;
        $project->status = Project::$OPEN;
        $project->save();

        return $this->respondSuccessWithStatus(["message" => $message]);
    }

    public function deleteProject($projectId)
    {
        $project = Project::find($projectId);
        if ($project == null) {
            return $this->responseNotFound("dự án không tồn tại");
        }
        $project->delete();
        return $this->respondSuccessWithStatus(['message' => "Xoá cơ sở thành công"]);
    }

    public function project($projectId)
    {
        $project = Project::find($projectId);
        if ($project == null) {
            return $this->responseNotFound("Cơ sở không tồn tại");
        }
        $data = [
            "id" => $projectId,
            "title" => $project->title,
            "description" => $project->description
        ];
        return $this->respondSuccessWithStatus($data);
    }


    public function projects(Request $request)
    {
        $query = trim($request->q);

        $limit = 20;

        if ($query) {
            $projects = Project::where("title", "like", "%$query%")
                ->orWhere("description", "like", "%$query%")
                ->orderBy('created_at')->paginate($limit);
        } else {
            $projects = Project::orderBy('created_at')->paginate($limit);
        }


        $data = [
            "projects" => $projects->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'description' => $project->description,
                    'status' => $project->status,
                    'creator' => [
                        "id" => $project->creator->id,
                        "name" => $project->creator->name
                    ],
                    'editor' => [
                        "id" => $project->editor->id,
                        "name" => $project->editor->name
                    ],
                    'created_at' => format_time_main($project->created_at),
                    'updated_at' => format_time_main($project->updated_at)
                ];
            }),

        ];
        return $this->respondWithPagination($projects, $data);
    }

    public function changeProjectStatus($projectId, Request $request)
    {
        $project = Project::find($projectId);
        $project->status = $request->status;
        $project->save();

        return $this->respondSuccessWithStatus(["message" => "Thay đổi trạng thái dự án thành công"]);
    }

    public function getBoards($projectId, Request $request)
    {

        $boards = Board::where('project_id', '=', $projectId)->orderBy('order')->get();
        $data = [
            "boards" => $this->boardTransformer->transformCollection($boards)
        ];
        return $this->respond($data);
    }

    public function createCard(Request $request)
    {
        if (is_null($request->title) ||
            is_null($request->board_id)) {
            return $this->responseBadRequest("Thiếu params");
        }
        if ($request->id) {
            $card = Card::find($request->id);
        } else {
            $card = new Card();
        }
        DB::statement("UPDATE cards SET `order` = `order` + 1 where cards.board_id = " . $request->board_id);


        $card->title = trim($request->title);
        $card->description = trim($request->description);
        $card->order = 0;
        $card->board_id = $request->board_id;
        $card->editor_id = $this->user->id;
        $card->creator_id = $this->user->id;
        $card->save();

        return $this->respond(["card" => $this->cardTransformer->transform($card)]);
    }

    public function createBoard(Request $request)
    {
        if (is_null($request->title) || is_null($request->project_id)) {
            return $this->responseBadRequest("Thiếu params");
        }
        if ($request->id) {
            $board = Board::find($request->id);
            $message = "Sửa bảng thành công";
        } else {
            $board = new Board();
            $message = "Tạo bảng thành công";
            $temp = Board::where('project_id', '=', $request->project_id)
                ->orderBy('order', 'desc')->first();

            if ($temp) {
                $order = $temp->order;
            } else {
                $order = 0;
            }
            $board->order = $order + 1;
        }

        $board->title = trim($request->title);
        $board->project_id = trim($request->project_id);
        $board->editor_id = $this->user->id;
        $board->creator_id = $this->user->id;
        $board->save();

        return $this->respond([
            "message" => $message,
            "board" => $this->boardTransformer->transform($board)
        ]);
    }

    public function updateCards(Request $request)
    {
        if (is_null($request->cards) || is_null($request->board_id)) {
            return $this->responseBadRequest("Thiếu params");
        }

        $cards = json_decode($request->cards);
        $board_id = $request->board_id;
        foreach ($cards as $c) {
            $card = Card::find($c->id);
            $card->board_id = $board_id;
            $card->order = $c->order;
            $card->save();
        }
        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function updateBoards(Request $request)
    {
        if (is_null($request->boards)) {
            return $this->responseBadRequest("Thiếu params");
        }

        $boards = json_decode($request->boards);
        foreach ($boards as $b) {
            $board = Board::find($b->id);
            $board->order = $b->order;
            $board->save();
        }
        return $this->respondSuccessWithStatus(["message" => "success"]);
    }
}
