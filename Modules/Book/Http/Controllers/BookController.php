<?php

namespace Modules\Book\Http\Controllers;

use App\Board;
use App\Http\Controllers\ManageApiController;
use App\Project;
use Illuminate\Http\Request;
use Modules\Task\Entities\TaskList;

class BookController extends ManageApiController
{
    public function taskListTemplates(Request $request)
    {
        $type = $request->type;
        $taskListTemplates = TaskList::where("card_id", 0);
        if ($type) {
            $taskListTemplates = $taskListTemplates->where("type", $type);
        }
        $taskListTemplates = $taskListTemplates->where("title", "like", "%$request->q%")->orderBy("title")->paginate(20);
        return $this->respondWithPagination($taskListTemplates, [
            "templates" => $taskListTemplates->map(function ($item) {
                return $item->transform();
            })]);
    }

    public function getAllTaskListTemplates()
    {
        $taskListTemplates = TaskList::where("card_id", 0)->orderBy("title")->get();
        return $this->respondSuccessWithStatus(
            [
                "templates" => $taskListTemplates->map(function ($item) {
                    return [
                        "id" => $item->id,
                        "title" => $item->title,
                        "tasks" => $item->tasks->map(function ($task) {
                            return $task->transform();
                        })
                    ];
                })
            ]
        );
    }

    public function storeTaskList(Request $request)
    {
        if (is_null($request->title)) {
            return $this->respondErrorWithStatus("cần truyền lên title");
        }
        if ($request->id) {
            $taskList = TaskList::find($request->id);
        } else {
            $taskList = new TaskList();
        }
        $taskList->title = $request->title;
        $taskList->save();
        return $this->respondSuccessWithStatus(["taskList" => $taskList->transform()]);
    }

    public function getFashionProject()
    {
        $project = Project::where("status", "fashion")->first();
        if (is_null($project)) {
            return $this->respondErrorWithStatus("Dự án sản xuấu chưa được tạo");
        }

        $boards = Board::where('project_id', '=', $project->id)->orderBy('order')->get();
        $data = [
            "id" => $project->id,
            "title" => $project->title,
            "status" => $project->status,
            "description" => $project->description,
            "boards" => $boards->map(function ($board) {
                $cards = $board->cards()->where("status", "open")->orderBy('order')->get();
                return [
                    'id' => $board->id,
                    'title' => $board->title,
                    'order' => $board->order,
                    'cards' => $cards->map(function ($card) {
                        return $card->transform();
                    })
                ];
            })
        ];
        $members = $project->members->map(function ($member) {
            return [
                "id" => $member->id,
                "name" => $member->name,
                "email" => $member->email,
                "is_admin" => $member->pivot->role === 1,
                "added" => true,
                "avatar_url" => generate_protocol_url($member->avatar_url)
            ];
        });
        $cardLables = $project->labels()->get(['id', 'name', "color"]);
        $data['members'] = $members;
        $data['cardLabels'] = $cardLables;
        $data['canDragBoard'] = $project->can_drag_board;
        $data['canDragCard'] = $project->can_drag_card;
        return $this->respond($data);
    }

    public function bookProject()
    {
        $project = Project::where("status", "book")->first();
        if (is_null($project)) {
            return $this->respondErrorWithStatus("Dự án sản xuấu chưa được tạo");
        }

        $boards = Board::where('project_id', '=', $project->id)->orderBy('order')->get();
        $data = [
            "id" => $project->id,
            "title" => $project->title,
            "status" => $project->status,
            "description" => $project->description,
            "boards" => $boards->map(function ($board) {
                $cards = $board->cards()->where("status", "open")->orderBy('order')->get();
                return [
                    'id' => $board->id,
                    'title' => $board->title,
                    'order' => $board->order,
                    'cards' => $cards->map(function ($card) {
                        return $card->transform();
                    })
                ];
            })
        ];
        $members = $project->members->map(function ($member) {
            return [
                "id" => $member->id,
                "name" => $member->name,
                "email" => $member->email,
                "is_admin" => $member->pivot->role === 1,
                "added" => true,
                "avatar_url" => generate_protocol_url($member->avatar_url)
            ];
        });
        $cardLables = $project->labels()->get(['id', 'name', "color"]);
        $data['members'] = $members;
        $data['cardLabels'] = $cardLables;
        $data['canDragBoard'] = $project->can_drag_board;
        $data['canDragCard'] = $project->can_drag_card;
        return $this->respond($data);
    }
}
