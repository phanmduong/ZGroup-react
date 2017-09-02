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
            ->transformCollection($user->received_notifications()->take($limit)->skip($skip));
        return $notifications;
    }
}