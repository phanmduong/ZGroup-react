<?php

namespace Modules\Notification\Http\Controllers;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ManageApiController;
use App\Notification;
use App\NotificationType;
use App\Repositories\NotificationRepository;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class NotificationApiController extends ApiController
{
    protected $notificationRepository;

    public function __construct(NotificationRepository $notificationRepository)
    {
        parent::__construct();
        $this->notificationRepository = $notificationRepository;
    }

    public function getNotification($notificationId)
    {
        $notification = Notification::find($notificationId);

        if ($notification == null) {
            return $this->respondErrorWithStatus("Không tồn tại");
        }

        return $this->respondSuccessWithStatus([
            'notification' => $notification->transform()
        ]);

    }
}
