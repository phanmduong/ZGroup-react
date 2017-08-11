<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;


class ManageTaskApiController extends ManageApiController
{


    public function __construct()
    {
        parent::__construct();
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

        $project->title = $request->title;
        $project->description = $request->description;
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
        $query = $request->q;

        $limit = 20;

        if ($query) {
            $projects = Project::where("name", "like", "%$query%")
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


}
