<?php

namespace Modules\Task\Http\Controllers;

use App\Board;
use App\Http\Controllers\ManageApiController;
use App\Project;
use Illuminate\Http\Request;
use Modules\Task\Repositories\ProjectRepository;

class BoardController extends ManageApiController
{


    private $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        parent::__construct();
        $this->projectRepository = $projectRepository;
    }

    public function getArchiveBoards($projectId)
    {
        $boards = Board::where("project_id",$projectId)->where("status", "close")->orderBy("updated_at", "desc")->get();
        return $this->respondSuccessWithStatus([
            "boards" => $boards->map(function ($board) {
                return $board->transformBoardWithCard();
            })
        ]);
    }

    public function archiveBoard($boardId)
    {
        $board = Board::find($boardId);
        if ($board == null) {
            return $this->respondErrorWithStatus("Bảng không tồn tại");
        }

        $board->status = "close";
        $board->save();
        return $this->respondSuccessWithStatus(["message" => "ok"]);
    }

    public function unarchiveBoard($boardId)
    {
        $board = Board::find($boardId);
        if ($board == null) {
            return $this->respondErrorWithStatus("Bảng không tồn tại");
        }

        $board->status = "open";
        $board->save();
        return $this->respondSuccessWithStatus(["message" => "ok"]);
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

    public function getBoards($projectId, Request $request)
    {
        $project = Project::find($projectId);
        $data = $this->projectRepository->loadProjectBoards($project, $this->user);
        return $this->respond($data);
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
            "board" => $board->transformBoardWithCard()
        ]);
    }

}
