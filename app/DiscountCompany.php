<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Modules\Task\Entities\TaskList;

class DiscountCompany extends Model
{
    //
    protected $table="discount_company";

    public function taskList(){
        return $this->belongsTo(TaskList::class,'task_list_id');
    }

    public function transform(){
        return[
          "id" => $this->id,
          "taskList" => [
              "id" => $this->taskList->id,
              "title" => $this->taskList->title,
          ],
          "discount_value" => $this->discount_value,
        ];
    }
}
