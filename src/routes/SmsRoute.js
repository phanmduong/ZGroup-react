
/**
 * Tab Quản lý tin nhắn Sms
 */
export default [
    {
        path: "/sms/campaign-list",
        //component: CollectMoneyContainer
    },
    {
        path: "/sms/campaign",
        // component: ,
        // type: "create",
        children: [
            {
                path: "/",
                //component:
            },
            {
                path: "receivers",
                // component:
            },
            {
                path: "history",
                // component:
            }
        ]
    },
];
