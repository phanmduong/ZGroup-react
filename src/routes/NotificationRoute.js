import NotificationTypeContainer from "../modules/notificationTypes/NotificationTypeContainer";
import SendNotificationContainer from "../modules/sendNotification/HistoryNotificationContainer";
import NotificationListContainer from "../modules/notification/NotificationListContainer";

export default [
    {
        path: "/notification/notification-types",
        component: NotificationTypeContainer
    },
    {
        path: "/notification/send-notification",
        component: SendNotificationContainer
    },
    {
        path:"/notification/notification-list",
        component: NotificationListContainer
    }
];
