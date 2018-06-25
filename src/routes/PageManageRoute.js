import PageManageContainer from "../modules/pageManage/PageManageContainer";
import PromotionManageContainer from "../modules/promotionManage/PromotionManageContainer";

/**
 * Tab PageManagement
 */
export default [
    {
        path: "/page-manage/page",
        component: PageManageContainer,
    },

    {
        path: "/page-manage/promotion",
        component: PromotionManageContainer,
    },
];
