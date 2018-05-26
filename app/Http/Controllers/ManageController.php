<?php

namespace App\Http\Controllers;

use App\Tab;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class ManageController extends Controller
{
    protected $user;
    protected $data;

    protected $s3_url;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth');
        $this->s3_url = config('app.s3_url');
        $this->middleware('is_staff');

        $this->user = Auth::user();

        if ($this->user) {
            $tabs_ids = $this->user->current_role->tabs->pluck('id');
            $parent_tabs_id = $this->user->current_role->tabs->pluck('parent_id');

            $allow_tabs = array_merge($tabs_ids->toArray(), $parent_tabs_id->toArray());
            $allow_tabs[] = 1;
            if ($this->user->role == 2) {
                $allow_tabs[] = 2;
            }
            $tabs = Tab::orderBy('order')->whereIn('id', $allow_tabs)->get();

            $this->data['tabs'] = $tabs;
        }

    }
}
