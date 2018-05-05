<?php

namespace Modules\Notification\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Notification;
use App\NotificationType;
use App\Repositories\NotificationRepository;
use App\SendNotification;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class NotificationManageApiController extends ManageApiController
{
    protected $notificationRepository;

    public function __construct(NotificationRepository $notificationRepository)
    {
        parent::__construct();
        $this->notificationRepository = $notificationRepository;
    }

    public function allNotificationTypes(Request $request)
    {

        $limit = 20;

        $notificationTypes = NotificationType::where('status', 1);
        if ($request->search) {
            $notificationTypes = $notificationTypes->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('template', 'like', '%' . $request->search . '%')
                    ->orWhere('content_template', 'like', '%' . $request->search . '%');
            });
        }
        $notificationTypes = $notificationTypes->orderBy('created_at', 'desc')->paginate($limit);

        $data = [
            'notification_types' => $notificationTypes->map(function ($notificationType) {
                return $notificationType->transform();
            })
        ];

        return $this->respondWithPagination($notificationTypes, $data);
    }

    public function createNotificationType(Request $request)
    {

        if ($request->name == null) {
            return $this->respondErrorWithStatus("Thiếu name");
        }
        if ($request->description == null) {
            return $this->respondErrorWithStatus("Thiếu description");
        }
        if ($request->type == null) {
            return $this->respondErrorWithStatus("Thiếu type");
        }
        $notificationType = new NotificationType();
        $notificationType->color = $request->color;
        $notificationType->name = $request->name;
        $notificationType->template = $request->description;
        $notificationType->icon = '<i class="material-icons">notifications</i>';
        $notificationType->type = $request->type;
        $notificationType->content_template = $request->content_template;
        $notificationType->status = 1;
        $notificationType->mobile_notification_type_id = $request->mobile_notification_type_id;
        $notificationType->save();

        return $this->respondSuccessWithStatus([
            'notification_type' => $notificationType->transform()
        ]);
    }

    public function editNotificationType($notificationTypeId, Request $request)
    {

        if ($request->name == null) {
            return $this->respondErrorWithStatus("Thiếu name");
        }
        if ($request->description == null) {
            return $this->respondErrorWithStatus("Thiếu description");
        }
        if ($request->type == null) {
            return $this->respondErrorWithStatus("Thiếu type");
        }
        $notificationType = NotificationType::where('id', $notificationTypeId)->where('status', 1)->first();
        if ($notificationType == null) {
            return $this->respondErrorWithStatus("Không tồn tại");
        }
        $notificationType->color = $request->color;
        $notificationType->name = $request->name;
        $notificationType->template = $request->description;
        $notificationType->icon = '<i class="material-icons">notifications</i>';
        $notificationType->type = $request->type;
        $notificationType->content_template = $request->content_template;
        $notificationType->status = 1;
        $notificationType->mobile_notification_type_id = $request->mobile_notification_type_id;
        $notificationType->save();

        return $this->respondSuccessWithStatus([
            'notification_type' => $notificationType->transform()
        ]);
    }

    public function deleteNotificationType($notificationTypeId)
    {
        $notificationType = NotificationType::where('id', $notificationTypeId)->where('status', 1)->first();
        if ($notificationType == null) {
            return $this->respondErrorWithStatus("Không tồn tại");
        }
        $notificationType->delete();
        return $this->respondSuccessWithStatus([
            'message' => "Xóa thành công"
        ]);
    }

    public function sendNotification(Request $request)
    {
        $notificationType = NotificationType::find($request->notification_type_id);
        if ($notificationType == null) {
            return $this->respondErrorWithStatus("Không tồn tại");
        }

        switch ($notificationType->type) {
            case 'social':
                $devices = getDevicesNotification(config('app.noti_app_id'), config('app.noti_app_key'));
                break;
            case 'mobile_social':
                $devices = getDevicesNotification(config('app.noti_app_id'), config('app.noti_app_key'));
                break;
            case 'manage':
                $devices = getDevicesNotification(config('app.noti_app_manage_id'), config('app.noti_app_manage_key'));
                break;
            case 'mobile_manage':
                $devices = getDevicesNotification(config('app.noti_app_manage_id'), config('app.noti_app_manage_key'));
                break;
            default:
                $devices = [];

        }

        $users = [];
        foreach ($devices as $device) {
            if ($device->tags && isset($device->tags->user_id) && isset($device->tags->device_type)
                && $device->tags->device_type == $notificationType->type && !in_array($device->tags->user_id, $users)) {
                $users[] = $device->tags->user_id;
            }
        }

        $users = User::whereIn('id', $users)->pluck('id');

        $sendNotification = new SendNotification();

        $sendNotification->name = $request->name;
        $sendNotification->notification_type_id = $request->notification_type_id;
        $sendNotification->creator_id = $this->user->id;
        $sendNotification->save();

        $users->map(function ($user) use ($sendNotification, $notificationType) {
            $notification = new Notification();
            $notification->actor_id = 0;
            $notification->receiver_id = $user;
            $notification->product_id = "send-notification";
            $notification->type = $notificationType->id;
            $notification->message = $notificationType->template;
            $notification->content = $notificationType->content_template;
            $notification->image_url = defaultAvatarUrl();
            $notification->url = "/";
            $notification->send_notification_id = $sendNotification->id;
            $notification->save();

            $this->notificationRepository->sendNotification($notification);
        });

        return $this->respondSuccess("Gửi thành công");
    }

    public function historySendNotifications(Request $request)
    {
        $sendNotifications = SendNotification::query();

        $limit = 20;
        if ($request->search) {
            $sendNotifications = $sendNotifications->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            });
        }

        $sendNotifications = $sendNotifications->orderBy('created_at', 'desc')->paginate($limit);

        $data = [
            'history_notifications' => $sendNotifications->map(function ($sendNotification) {
                return $sendNotification->transform();
            })
        ];

        return $this->respondWithPagination($sendNotifications, $data);
    }
}
