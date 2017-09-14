<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 9/14/17
 * Time: 10:18 AM
 */

namespace Modules\CheckInCheckOut\Repositories;


use App\Base;
use Modules\CheckInCheckOut\Entities\AppSession;
use Modules\CheckInCheckOut\Entities\CheckInCheckOut;
use Modules\CheckInCheckOut\Entities\Device;
use Modules\CheckInCheckOut\Entities\Wifi;

class CheckInCheckOutRepository
{
    public function __construct()
    {
//        $this->taskTransformer = $taskTransformer;
    }

    /**
     * @param $device_id
     * @param $user_id
     * @return AppSession
     */
    public function addAppSession($device_id, $user_id)
    {
        $appSession = new AppSession();
        $appSession->device_id = $device_id;
        $appSession->user_id = $user_id;
        $appSession->save();
        return $appSession;
    }

    /**
     * Check xem DeviceID của máy đang dùng xem đã có trên hệ thống chưa,
     * nếu chưa có thì tự động
     * thêm vào máy này là của người đang truy cập này (truy cập lần đầu).
     * Nếu như DeviceID này đã tồn tại trong bảng Device,
     * check xem UserID này có khớp với UserID của Device không,
     * nếu không thì trả về user_id của người đang sở hữu máy này.
     * @param $name
     * @param $os
     * @param $device_id
     * @param $user_id
     * @return int
     */
    public function checkDevice($name, $os, $device_id, $user_id)
    {
        $device = Device::where("device_id", $device_id)->first();
        if (is_null($device)) {
            $device = new Device();
            $device->name = $name;
            $device->os = $os;
            $device->device_id = $device_id;
            $device->user_id = $user_id;
            $device->save();
            return 0;
        } else {
            if ($device->user_id === $user_id) {
                return 0;
            } else {
                return $device->user_id;
            }
        }
    }

    /**
     * @param $mac
     * @return mixed
     */
    public function getWifi($mac, $base_id)
    {
        $wifi = Wifi::where("mac", $mac)->where("base_id", $base_id)->first();
        return $wifi;
    }

    public function setWifi($wifiName, $mac, $base_id)
    {
        $wifi = $this->getWifi($mac, $base_id);
        if (is_null($wifi)) {
            $wifi = new Wifi();
            $wifi->name = $wifiName;
            $wifi->mac = $mac;
            $wifi->save();
        }
    }

    /**
     * @param $kind (check in: 1 | checkout: 2)
     * @param $status
     *      1 if everything is correct
     *      2 if wifi is invalid
     *      3 if the location is too far from base
     * @param $long
     * @param $lat
     * @param $user_id
     * @param $device_id
     * @param $mac
     * @return CheckInCheckOut
     */
    public function addCheckInCheckOut($kind, $long, $lat, $user_id, $device_id, $mac, $wifiName)
    {
        $checkInCheckOut = new CheckInCheckOut();
        $checkInCheckOut->kind = $kind;
        $checkInCheckOut->longtitude = $long;
        $checkInCheckOut->latitude = $lat;
        $bases = Base::all();
        $minDistance = -1;
        $minBase = null;

        foreach ($bases as $base) {
            $distance = haversineGreatCircleDistance($lat, $long, $base->latitude, $base->longtitude);
            if ($minDistance === -1) {
                $minDistance = $distance;
                $minBase = $base;
            } else {
                if ($distance < $minDistance) {
                    $minDistance = $distance;
                    $minBase = $base;
                }
            }
        }


        if ($minDistance > $minBase->distance_allow) {
            $checkInCheckOut->status = 3;
        } else {
            $this->setWifi($wifiName, $mac, $minBase->id);
            $checkInCheckOut->status = 1;
//            $wifi = $this->getWifi($mac, $minBase->id);
//            if (is_null($wifi)) {
//                $checkInCheckOut->status = 2;
//            } else {
//                $checkInCheckOut->status = 1;
//            }
        }
        $checkInCheckOut->distance = $minDistance;
        $checkInCheckOut->base_id = $minBase->id;
        $checkInCheckOut->user_id = $user_id;
        $checkInCheckOut->device_id = $device_id;
        $checkInCheckOut->save();
        return $checkInCheckOut;
    }

}