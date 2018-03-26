<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 9/14/17
 * Time: 10:18 AM
 */

namespace Modules\Book\Repositories;


use App\Base;
use App\ClassLesson;
use App\Shift;
use App\ShiftSession;
use App\Task;
use App\TeachingLesson;
use DateTime;
use Modules\CheckInCheckOut\Entities\AppSession;
use Modules\CheckInCheckOut\Entities\CheckInCheckOut;
use Modules\CheckInCheckOut\Entities\Device;
use Modules\CheckInCheckOut\Entities\Wifi;
use Modules\Task\Entities\TaskList;

class TaskListTemplateRepository
{
    public function __construct()
    {
    }

    public function generateTasksFromBoards($boards, $taskListTemplateId, $user)
    {
        $boardIds = $boards->sortBy(function ($board, $key) {
            return $board->order;
        })->map(function ($board) {
            return $board->id;
        })->toArray();

        $taskListTemplate = TaskList::find($taskListTemplateId);

        $taskListTemplate->tasks()->whereNotIn('current_board_id', $boardIds)->delete();

        $tasks = $taskListTemplate->tasks()->orderBy("order")->get();

        $currentBoardIds = $tasks->pluck("current_board_id")->toArray();

        foreach ($boards as $board) {
            if (!in_array($board->id, $currentBoardIds) && in_array($board->id, $boardIds)) {
                $task = new Task();
                $task->title = $board->title;
                $task->task_list_id = $taskListTemplateId;
                $task->status = 0;
                $task->current_board_id = $board->id;
                $task->order = $board->order;
                $task->creator_id = $user->id;
                $task->editor_id = $user->id;
                $task->task_template_id = 0;
                $task->save();
            }
        }
        return $taskListTemplate;
    }
}