<?php

namespace Modules\Good\Http\Controllers;

use App\Http\Controllers\ManageApiController;


class GoodController extends ManageApiController
{
    public function getAll()
    {
        
        return view('good::index');
    }
}
