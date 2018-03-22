<?php

namespace Modules\Notification\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Notification;
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
}
