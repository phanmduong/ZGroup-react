<?php

namespace App\Http\Controllers;

use App\Board;
use App\Project;
use Illuminate\Http\Request;


class ManageTaskApiController extends ManageApiController
{


    public function __construct()
    {
        parent::__construct();
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
        }
        $temp = Board::orderBy('order', 'desc')->first();

        if ($temp) {
            $order = $temp->order;
        } else {
            $order = 0;
        }

        $board->title = $request->title;
        $board->order = $order + 1;
        $board->project_id = $request->project_id;
        $board->editor_id = $this->user->id;
        $board->creator_id = $this->user->id;
        $board->save();

        return $this->respondSuccessWithStatus(["message" => $message]);
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


}
