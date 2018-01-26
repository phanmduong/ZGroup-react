<?php

namespace Modules\Notification\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\NotificationType;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\Notification\Repositories\NotificationRepository;

class NotificationController extends ManageApiController
{
    protected $notificationRepository;

    public function __construct(NotificationRepository $notificationRepository)
    {
        parent::__construct();
        $this->notificationRepository = $notificationRepository;
    }

    public function notifications(Request $request)
    {
        $page = $request->page;
        if (is_null($page)) {
            $page = 1;
        }
        $notifications = $this->notificationRepository->getUserReceivedNotifications($this->user->id, $page - 1);
        $unreadCount = $this->notificationRepository->countUnreadNotification($this->user->id);
        return $this->respondSuccessWithStatus([
            "notifications" => $notifications,
            "unread" => $unreadCount
        ]);
    }

    public function readNotifications()
    {
        $this->notificationRepository->readAllNotification($this->user->id);
        return $this->respondSuccessWithStatus([
            "message" => "success"
        ]);
    }

    public function allNotificationTypes(Request $request)
    {

        $limit = 1;

        $notificationTypes = NotificationType::where('status', 1);
        if ($request->search) {
            $notificationTypes = $notificationTypes->where(function ($q) use ($request) {
                $q->orWhere('name', 'like', '%' . $request->search . '%')
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
        $notificationType = NotificationType::find($notificationTypeId);
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
        $notificationType = NotificationType::find($notificationTypeId);
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

    }
}
