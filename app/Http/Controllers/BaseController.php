<?php

namespace App\Http\Controllers;

use App\Base;
use App\Room;
use Illuminate\Http\Request;

use App\Http\Requests;

class BaseController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
        $this->data['current_tab'] = 22;
    }

    public function index($base_id = null)
    {

        if ($base_id == null) {
            $bases = Base::all()->sortByDesc('updated_at');
            $this->data['bases'] = $bases;

            return view('manage.base.index', $this->data);
        } else {
            if ($base_id != null) {
                $base = Base::find($base_id);
            }

            $this->data['base'] = $base;
            return view('manage.base.new_base', $this->data);
        }
    }

    public function new_base($base_id = null)
    {
        $this->data['base'] = null;
        return view('manage.base.new_base', $this->data);
    }

    public function delete_base($base_id)
    {
        Base::find($base_id)->delete();
        return redirect('manage/bases');
    }

    public function store_base(Request $request)
    {
        $name = $request->name;
        $address = $request->address;
        $id = $request->base_id;

        if ($id == null) {
            $base = new Base;
        } else {
            $base = Base::find($id);
        }

        $base->name = $name;
        $base->address = $address;
        $base->center = $request->center;
        $base->save();

        return redirect('manage/bases');
    }

    public function delete_room($room_id)
    {
        $room = Room::find($room_id);
        $url = "manage/bases/" . $room->base->id;
        $room->delete();
        return redirect($url);
    }


    public function store_room(Request $request)
    {
        $base_id = $request->base_id;
        $name = $request->name;

        $url = "manage/bases/" . $base_id;

        $room = new Room;
        $room->name = $name;
        $room->base_id = $base_id;

        $room->save();
        return redirect($url);

    }
}
