import NotificationTypeContainer from "../modules/notificationTypes/NotificationTypeContainer";
import SendNotificationContainer from "../modules/sendNotification/HistoryNotificationContainer";


export default [
    {
        path: "/notification/notification-types",
        component: NotificationTypeContainer
    },
    {
        path: "/notification/send-notification",
        component: SendNotificationContainer
    },
];
