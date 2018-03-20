<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 9/2/17
 * Time: 3:03 PM
 */

namespace Modules\Notification\Repositories;


use App\NotificationType;
use App\User;
use Modules\Notification\Transformer\NotificationTransformer;

class NotificationRepository
{

    public function getUserReceivedNotifications($userId, $skip = 0, $limit = 10)
    {
        $user = User::find($userId);
        $notificationTypeIds = NotificationType::where("type", "manage")->pluck("id");
        $notifications = $user->received_notifications()
            ->whereIn("type", $notificationTypeIds)
            ->orderBy("created_at", "desc")
            ->take($limit)->skip($skip * $limit)->get()->map(function ($notification) {
                return $notification->transform();
            });
        return $notifications;
    }

    public function countUnreadNotification($userId)
    {
        $user = User::find($userId);
        $count = $user->received_notifications()->where("seen", 0)->count();
        return $count;
    }

    public function readAllNotification($userId)
    {
        $user = User::find($userId);
        $user->received_notifications()->where("seen", 0)->update(['seen' => 1]);
        return true;
    }
}