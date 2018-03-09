<?php

namespace Modules\Base\Http\Controllers;

use App\Base;
use App\District;
use App\Http\Controllers\ManageApiController;
use App\Province;
use App\Room;
use App\RoomType;
use App\Seat;
use App\Seats;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;
use App\RoomServiceRegisterSeat;

class ManageBaseApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function bookSeat($seatId, Request $request)
    {
        $registerId = $request->register_id;
        $startTime = $request->start_time;
        $endTime = $request->end_time;

        if (!isset($registerId) || !isset($startTime) || !isset($endTime)) {
            return $this->respondErrorWithStatus('Bạn truyền lên thiếu dữ liệu');
        }

        $registerSeat = new RoomServiceRegisterSeat();
        $registerSeat->room_service_register_id = $registerId;
        $registerSeat->seat_id = $seatId;
        $registerSeat->start_time = format_time_to_mysql((int)$startTime);
        $registerSeat->end_time = format_time_to_mysql((int)$endTime);
        $registerSeat->save();

        return $this->respondSuccessV2([
            'register_seat' => $registerSeat
        ]);
    }

    public function getRoom($baseId)
    {
        $base = Base::find($baseId);
        if ($base == null) {
            return $this->respondErrorWithStatus('Cơ sở không tồn tại');
        }
        $rooms = $base->rooms;
        return $this->respondSuccessV2([
            'rooms' => $rooms->map(function ($room) {
                return $room->getData();
            })
        ]);
    }

    public function getSeats($roomId)
    {
        $room = Room::find($roomId);
        if ($room === null) {
            return $this->respondErrorWithStatus('Phòng không tồn tại');
        }
        $seats = $room->seats()->where('archived', 0)->get();
        return $this->respondSuccessWithStatus([
            'seats' => $seats,
            'width' => $room->width,
            'height' => $room->height,
            'room_layout_url' => $room->room_layout_url
        ]);
    }

    public function roomLayout($roomId, Request $request)
    {
        $room = Room::find($roomId);
        if ($room === null) {
            return $this->respondErrorWithStatus('Phòng không tồn tại');
        }

        $image = $request->file('image');
        if ($image === null) {
            return $this->respondErrorWithStatus('Bạn cần thêm ảnh');
        }

        $maxWidth = 1200;

        $mimeType = $image->guessClientExtension();
        $s3 = \Illuminate\Support\Facades\Storage::disk('s3');
        $imageFileName = time() . random(15, true) . '.jpg';
        $img = Image::make($image->getRealPath())->encode('jpg', 100)->interlace();
        if ($img->width() > $maxWidth) {
            $img->resize($maxWidth, null, function ($constraint) {
                $constraint->aspectRatio();
            });
        }
        $img->save($image->getRealPath());
        $filePath = '/images/' . $imageFileName;
        $s3->getDriver()->put($filePath, fopen($image, 'r+'), ['ContentType' => $mimeType, 'visibility' => 'public']);

        $room->room_layout_name = $filePath;
        $room->width = $img->width();
        $room->height = $img->height();
        $room->room_layout_url = generate_protocol_url($this->s3_url . $filePath);
        $room->save();

        return [
            'room' => $room->getRoomDetail()
        ];
    }

    public function assignBaseInfo(&$base, $request)
    {
        $base->name = $request->name;
        $base->center = $request->center ? $request->center : 0;
        $base->longtitude = $request->longtitude;
        $base->latitude = $request->latitude;
        $base->avatar_url = $request->avatar_url;
        $base->district_id = $request->district_id;
        $base->display_status = $request->display_status;
        $base->images_url = $request->images_url;
        $base->description = $request->description;
        $base->address = $request->address;
        $base->save();
    }

    public function assignRoomInfo(&$room, $baseId, $request)
    {
        $room->name = $request->name;
        $room->base_id = $baseId;
        $room->room_type_id = $request->room_type_id; 

        $room->seats_count = $request->seats_count;
        $room->images_url = $request->images_url;
        $room->avatar_url = $request->avatar_url;

        $room->cover_url = $request->cover_url;
        $room->cover_type = $request->cover_type;

        $room->save();

        return $room;
    }

    public function getAllProvinces()
    {
        $provinces = Province::all();
        $provinces = $provinces->map(function ($province) {
            $data = $province->transform();
            $data['districts'] = $province->districts->map(function ($district) {
                return $district->transform();
            });
            return $data;
        });

        return $this->respondSuccessWithStatus([
            'provinces' => $provinces
        ]);
    }

    public function getBases(Request $request)
    {
        $query = trim($request->q);

        $limit = $request->limit ? $request->limit : 6;

        $bases = Base::query();
        if ($query) {
            $bases = $bases->where('name', 'like', "%$query%")
            ->orWhere('address', 'like', "%$query%");
        }
        $bases = $bases->orderBy('created_at', 'desc')->paginate($limit);

        if ($limit == -1) {
            $bases = $bases->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'bases' => $bases->map(function ($base) {
                    return $base->getData();
                })
            ]);
        }

        $bases = $bases->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($bases, [
            'bases' => $bases->map(function ($base) {
                return $base->getData();
            })
        ]);
    }

    public function createSeats($roomId, Request $request)
    {
        $room = Room::find($roomId);
        if ($room == null) {
            return $this->respondErrorWithStatus('Phòng không tồn tại');
        }
        $seats = json_decode($request->seats);

        foreach ($seats as $s) {
            if (isset($s->id)) {
                $seat = Seat::find($s->id);
            } else {
                $seat = new Seat();
            }

            if (isset($s->archived)) {
                $seat->archived = $s->archived;
            }

            $seat->name = $s->name;
//            $seat->type = $s->type;
            $seat->room_id = $roomId;

            $seat->color = $s->color;
            $seat->x = $s->x;
            $seat->y = $s->y;
            $seat->r = $s->r;

            $seat->save();
        }

        return $this->respondSuccessWithStatus([
            'message' => 'Lưu chỗ ngồi thành công',
            'seats' => $room->seats()->where('archived', 0)->get()
        ]);
    }

    public function getBase($baseId)
    {
        $base = Base::find($baseId);
        if ($base == null) {
            return $this->respondErrorWithStatus('Không tồn tại');
        }

        $data = [
            'id' => $base->id,
            'name' => $base->name,
            'address' => $base->address,
            'display_status' => $base->display_status,
            'longitude' => $base->longtitude,
            'latitude' => $base->latitude,
            'created_at' => format_time_main($base->created_at),
            'updated_at' => format_time_main($base->updated_at),
            'center' => $base->center,
            'images_url' => $base->images_url,
            'avatar_url' => config('app.protocol') . trim_url($base->avatar_url),
        ];

        if ($base->district) {
            $data['district'] = $base->district->transform();
            $data['province'] = $base->district->province->transform();
            $data['province_id'] = $base->district->province->provinceid;
            $data['district_id'] = $base->district->districtid;
        }

        return $this->respondSuccessWithStatus([
            'base' => $data
        ]);
    }

    public function createBase(Request $request)
    {
        if ($request->name == null || trim($request->name) == '') {
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu tên cơ sở'
            ]);
        }
        $base = new Base;
        $this->assignBaseInfo($base, $request);

        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function editBase($baseId, Request $request)
    {
        if ($request->name == null || trim($request->name) == '') {
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu tên cơ sở'
            ]);
        }
        $base = Base::find($baseId);
        if ($base == null) {
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại cơ sở'
            ]);
        }
        $this->assignBaseInfo($base, $request);

        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function createRoom($baseId, Request $request)
    {
        if ($request->name == null || trim($request->name) == '') {
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu tên phòng'
            ]);
        }
        $room = new Room;
        $room = $this->assignRoomInfo($room, $baseId, $request);
        return $this->respondSuccessWithStatus([
            'room' => $room->getData()
        ]);
    }

    public function editRoom($baseId, $roomId, Request $request)
    {
        if ($request->name == null || trim($request->name) == '') {
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu tên phòng'
            ]);
        }
        $room = Room::find($roomId);
        if ($room == null) {
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại phòng'
            ]);
        }
        $this->assignRoomInfo($room, $baseId, $request);
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function createSeat($roomId, Request $request)
    {
        $room = Room::find($roomId);
        if ($room == null) {
            return $this->respondErrorWithStatus('Phòng không tồn tại');
        }

        $seat = new Seat();

        $seat->name = $request->name;
//        $seat->type = $request->type;
        $seat->room_id = $roomId;

        $seat->color = $request->color;
        $seat->x = $request->x;
        $seat->y = $request->y;
        $seat->r = $request->r;

        $seat->save();

        return $this->respondSuccessWithStatus([
            'seat' => $seat
        ]);
    }

    public function updateSeat($seatId, Request $request)
    {
        $seat = Seat::find($seatId);
        if ($seat == null) {
            return $this->respondErrorWithStatus('Chỗ ngồi không tồn tại');
        }

        $seat->name = $request->name;
        $seat->type = $request->type;
        $seat->room_id = $request->room_id;

        $seat->color = $request->color;
        $seat->x = $request->x;
        $seat->y = $request->y;
        $seat->r = $request->r;

        $seat->save();

        return $this->respondSuccessWithStatus([
            'seat' => $seat
        ]);
    }

    public function editSeat($roomId, $seatId, Request $request)
    {
        if ($request->name == null || trim($request->name) == '') {
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu tên'
            ]);
        }
        $seat = Seat::find($seatId);
        if ($seat == null) {
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại chỗ ngồi'
            ]);
        }
        $seat->name = $request->name;
        $seat->type = $request->type;
        $seat->room_id = $roomId;
        $seat->save();
        $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function chooseSeatHistory($registerId)
    {
        $registerSeats = RoomServiceRegisterSeat::where('room_service_register_id', $registerId)->orderBy('created_at', 'desc')->get();
        return $this->respondSuccessV2([
            'register_seats' => $registerSeats->map(function ($registerSeat) {
                return $registerSeat->transform();
            })
        ]);
    }

    public function getRoomTypes(Request $request)
    {
        $search = $request->search;
        $limit = $request->limit ? $request->limit : 20;
        $roomTypes = RoomType::query();
        $roomTypes = $roomTypes->where('name', 'like', '%' . $search . '%');
        if ($limit == -1) {
            $roomTypes = $roomTypes->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'room_types' => $roomTypes->map(function ($roomType) {
                    return $roomType->getData();
                })
            ]);
        }
        $roomTypes = $roomTypes->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($roomTypes, [
            'room_types' => $roomTypes->map(function ($roomType) {
                return $roomType->getData();
            })
        ]);
    }

    public function createRoomType(Request $request)
    {
        if ($request->name == null || trim($request->name) == '') {
            return $this->respondErrorWithStatus('Thiếu tên');
        }
        $roomType = new RoomType;
        $roomType->name = $request->name;
        $roomType->description = $request->description;
        $roomType->save();

        return $this->respondSuccess('Tạo thành công');
    }

    public function editRoomType($roomTypeId, Request $request)
    {
        if ($request->name == null || trim($request->name) == '') {
            return $this->respondErrorWithStatus('Thiếu tên');
        }
        $roomType = RoomType::find($roomTypeId);
        if ($roomType == null) {
            return $this->respondErrorWithStatus('Không tồn tại loại phòng');
        }
        $roomType->name = $request->name;
        $roomType->description = $request->description;
        $roomType->save();

        return $this->respondSuccess('Sửa thành công');
    }

    public function availableSeats(Request $request)
    {
//        dd($request->from . '   ' . $request->to);
        $to = (int)$request->to;
        $from = (int)$request->from;

        $seats = Seat::query();
        $booked_seats = Seat::query();
        $seats_count = Seat::query();

        if ($request->room_id) {
            $seats = $seats->where('room_id', $request->room_id);
            $booked_seats = $booked_seats->where('room_id', $request->room_id);
            $seats_count = $seats_count->where('room_id', $request->room_id)
                ->orderBy('created_at', 'desc')->count();
        }
        $seats = $seats->leftJoin('room_service_register_seat', 'seats.id', '=', 'room_service_register_seat.seat_id');
        $seats = $seats->where(function ($query) use ($to, $from) {
            $query->where('room_service_register_seat.start_time', '=', null)
                ->orWhere('room_service_register_seat.start_time', '>', date('Y-m-d H:i:s', $to))
                ->orWhere('room_service_register_seat.end_time', '<', date('Y-m-d H:i:s', $from));
        })->groupBy('seats.id')->select('seats.*')->get();

        $booked_seats = $booked_seats->join('room_service_register_seat', 'seats.id', '=', 'room_service_register_seat.seat_id');
        $booked_seats = $booked_seats->where(function ($query) use ($to, $from) {
            $query->where(function ($query) use ($to) {
                $query->where('room_service_register_seat.start_time', '<', date('Y-m-d H:i:s', $to))
                    ->where('room_service_register_seat.end_time', '>', date('Y-m-d H:i:s', $to));
            })
                ->orWhere(function ($query) use ($from) {
                    $query->where('room_service_register_seat.start_time', '<', date('Y-m-d H:i:s', $from))
                        ->where('room_service_register_seat.end_time', '>', date('Y-m-d H:i:s', $from));
                })
                ->orWhere(function ($query) use ($from, $to) {
                    $query->where('room_service_register_seat.start_time', '>=', date('Y-m-d H:i:s', $from))
                        ->where('room_service_register_seat.end_time', '<=', date('Y-m-d H:i:s', $to));
                });
        })->groupBy('seats.id')->select('seats.*')->get();
        return $this->respondSuccessWithStatus([
            'seats' => $seats->map(function ($seat) {
                return $seat->getData();
            }),
            'booked_seats' => $booked_seats->map(function ($booked_seat) {
                return $booked_seat->getData();
            }),
            'seats_count' => $seats_count,
            'available_seats' => $seats->count(),
        ]);
    }

    public function baseDisplay($baseId, Request $request)
    {
        if ($request->display_status == null || trim($request->display_status) == '') {
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu display_status'
            ]);
        }
        $base = Base::find($baseId);
        if ($base == null) {
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại cơ sở'
            ]);
        }
        $base->display_status = $request->display_status;
        $base->save();

        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }
}
