<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 9/2/17
 * Time: 3:03 PM
 */

namespace Modules\Notification\Repositories;


use App\User;
use Modules\Notification\Transformer\NotificationTransformer;

class NotificationRepository
{

    protected $notificationTransformer;

    public function __construct(NotificationTransformer $notificationTransformer)
    {
        $this->notificationTransformer = $notificationTransformer;
    }

    public function getUserReceivedNotifications($userId, $skip = 0, $limit = 10)
    {
        $user = User::find($userId);
        $notifications = $this->notificationTransformer
            ->transformCollection($user->received_notifications()
                ->orderBy("created_at", "desc")
                ->take($limit)->skip($skip * $limit)->get());
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
        $user->received_notifications()->where("seen", 0)->update(['seen' => 1]);;
        return true;
    }
}