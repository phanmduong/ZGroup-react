<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HistoryExtensionWork extends Model
{
    //
    use SoftDeletes;
    protected $table = 'history_extension_works';

    public function transform()
    {
        $staff = User::find($this->staff_id);
        $work = Work::find($this->work_id);
        return [
            "id" => $this->id,
            "reason" => $this->reason,
            "penalty" => $this->penalty,
            "deadline" => $work->deadline,
            "new_deadline" => $this->new_deadline,
            "staff" => [
                "id" => $staff->id,
                "name" => $staff->name,
            ],
            "work" => [
                "id" => $work->id,
                "name" => $work->name
            ]
        ];
    }
}
