<?php

namespace Modules\Good\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Task;

class GoodPropertyItemTask extends Model
{
    use SoftDeletes;
    protected $table = 'good_property_item_task';

    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id');
    }
}
