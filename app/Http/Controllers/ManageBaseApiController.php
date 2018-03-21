<?php

namespace App\Http\Controllers;

use App\Base;
use App\Room;
use App\RoomType;
use Illuminate\Http\Request;

class ManageBaseApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function deleteBase($baseId)
    {
        $base = Base::find($baseId);
        if ($base == null) {
            return $this->responseNotFound('Cơ sở không tồn tại');
        }
        $base->delete();
        return $this->respondSuccessWithStatus(['message' => 'Xoá cơ sở thành công']);
    }

    public function base($baseId)
    {
        $base = Base::find($baseId);
        if ($base == null) {
            return $this->responseNotFound('Cơ sở không tồn tại');
        }
        $data = [
            'id' => $baseId,
            'name' => $base->name,
            'address' => $base->address
        ];
        return $this->respondSuccessWithStatus($data);
    }

    public function bases(Request $request)
    {
        $query = trim($request->q);

        $limit = 20;

        if ($query) {
            $bases = Base::where('name', 'like', "%$query%")
                ->orWhere('address', 'like', "%$query%")
                ->orderBy('created_at')->paginate($limit);
        } else {
            $bases = Base::orderBy('created_at')->paginate($limit);
        }

        $data = [
            'bases' => $bases->map(function ($base) {
                return [
                    'id' => $base->id,
                    'name' => $base->name,
                    'address' => $base->address,
                    'created_at' => format_time_main($base->created_at),
                    'updated_at' => format_time_main($base->updated_at),
                    'center' => $base->center
                ];
            }),
        ];
        return $this->respondWithPagination($bases, $data);
    }

    public function get_base_all()
    {
        $bases = Base::orderBy('created_at')->get();
        $data = [
            'bases' => $bases->map(function ($base) {
                return [
                    'id' => $base->id,
                    'name' => $base->name,
                    'address' => $base->address,
                ];
            }),
        ];

        return $this->respondSuccessWithStatus($data);
    }

    public function get_base_center_all()
    {
        $bases = Base::where('center', 1)->orderBy('created_at')->get();
        $data = [
            'bases' => $bases->map(function ($base) {
                return [
                    'id' => $base->id,
                    'name' => $base->name,
                ];
            }),
        ];

        return $this->respondSuccessWithStatus($data);
    }

    public function setDefaultBase($baseId)
    {
        $bases = Base::where('center', 1)->get();
        foreach ($bases as $base) {
            $base->center = 0;
            $base->save();
        }

        $base = Base::find($baseId);
        $base->center = 1;
        $base->save();

        return $this->respondSuccessWithStatus(['message' => 'Thay đổi trụ sở thành công']);
    }

    public function createBase(Request $request)
    {
        if ($request->name == null || $request->address == null) {
            return $this->responseBadRequest('Thiếu params');
        }
        if ($request->id) {
            $base = Base::find($request->id);
            $message = 'Sửa cơ sở thành công';
        } else {
            $base = new Base();
            $message = 'Tạo cơ sở thành công';
        }

        $base->name = trim($request->name);
        $base->address = trim($request->address);
        $base->save();

        return $this->respondSuccessWithStatus(['message' => $message]);
    }

    public function getRooms(Request $request)
    {
        $query = trim($request->search);

        $limit = $request->limit ? $request->limit : 6;

        if ($request->base_id && $request->base_id != 0) {
            $rooms = Room::where('rooms.base_id', '=', $request->base_id);
        } else {
            $rooms = Room::query();
        }

        if ($query) {
            $rooms = $rooms->join('bases', 'bases.id', '=', 'rooms.base_id')->where(function ($q) use ($query) {
                $q->where('rooms.name', 'like', "%$query%")
                    ->orWhere('bases.name', 'like', "%$query%")
                    ->orWhere('bases.address', 'like', "%$query%");
            })->select('bases.*', 'rooms.*', 'bases.name as base_name', 'rooms.name as room_name', 'rooms.id as room_id', 'rooms.avatar_url as avatar_url', 'rooms.images_url as images_url')
                ->orderBy('rooms.created_at', 'desc');
        } else {
            $rooms = $rooms->join('bases', 'bases.id', '=', 'rooms.base_id')
                ->select('rooms.*', 'bases.*', 'bases.name as base_name', 'rooms.name as room_name', 'rooms.id as room_id', 'rooms.avatar_url as avatar_url', 'rooms.images_url as images_url')
                ->orderBy('rooms.created_at', 'desc');
        }
        if ($limit == -1) {
            $rooms = $rooms->get();
        } else {
            $rooms = $rooms->paginate($limit);
        }

        $data = [
            'rooms' => $rooms->map(function ($room) {
                $data = [
                    'id' => $room->room_id,
                    'name' => $room->room_name,
                    'base_id' => $room->base_id,
                    'base_name' => $room->base_name,
                    'address' => $room->address,
                    'avatar_url' => $room->avatar_url,
                    'cover_url' => $room->cover_url,
                    'images_url' => $room->images_url,
                    'cover_type' => $room->cover_type,
                    'description' => $room->description,
                    'detail' => $room->detail,                    
                    'seats_count' => $room->seats_count
                ];
                if ($room->room_type_id) {
                    $data['room_type'] = RoomType::find($room->room_type_id)->getData();
                }
                return $data;
            })
        ];
        if ($limit == -1) {
            $data['rooms_count'] = $rooms->count();
        }
        if ($limit == -1) {
            return $this->respondSuccessWithStatus($data);
        } else {
            return $this->respondWithPagination($rooms, $data);
        }
    }

    public function storeRoom(Request $request)
    {
        if ($request->name == null) {
            return $this->responseBadRequest('Thiếu tên phòng');
        }

        if ($request->base_id == null) {
            return $this->responseBadRequest('Thiếu cơ sở');
        }

        if ($request->id) {
            $room = Room::find($request->id);
        } else {
            $room = new Room();
        }

        $room->name = $request->name;
        $room->base_id = $request->base_id;
        $room->save();

        $data = [
            'id' => $room->id,
            'name' => $room->name,
            'base_name' => $room->base->name,
            'address' => $room->base->address,
        ];

        return $this->respondSuccessWithStatus([
            'room' => $data
        ]);
    }
}
