<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 7/20/17
 * Time: 17:25
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Tab;

class ManageTabApiController extends ManageApiController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function get_tabs()
    {
        if ($this->user) {
            $tabs_ids = $this->user->current_role->tabs->pluck('id');
            $parent_tabs_id = $this->user->current_role->tabs->pluck('parent_id');

            $allow_tabs = array_merge($tabs_ids->toArray(), $parent_tabs_id->toArray());
            if ($this->user->role == 2) {
                $allow_tabs[] = 2;
            }
            $tabs = Tab::orderBy('order')->whereIn('id', $allow_tabs)->get();

        }
        return $this->respondSuccessWithStatus([
            "tabs" => $tabs
        ]);
    }

    public function get_all()
    {
        $tabs = Tab::orderBy('order')->get();
        return $this->respondSuccessWithStatus([
            "tabs" => $tabs
        ]);
    }


}