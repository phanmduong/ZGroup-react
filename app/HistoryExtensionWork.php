<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HistoryExtensionWork extends Model
{
    //
    use SoftDeletes;
    protected $table = 'history_extension_works';
}
