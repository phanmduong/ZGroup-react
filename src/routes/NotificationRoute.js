import ListNotificationTypeContainer from "../modules/notificationTypes/NotificationTypeContainer";
import SendNotificationContainer from "../modules/sendNotification/HistoryNotificationContainer";


export default [
    {
        path: "/notification/notification-types",
        component: ListNotificationTypeContainer
    },
    {
        path: "/notification/send-notification",
        component: SendNotificationContainer
    },
];
