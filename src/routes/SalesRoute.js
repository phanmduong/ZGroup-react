import SummarySalesContainer from "../modules/summarySales/SummarySalesContainer";
import OverviewSales from "../modules/summarySales/OverviewSales";
import StatisticSales from "../modules/summarySales/StatisticSales";
import SummarySalesUpContainer from "../modules/summarySalesUp/SummarySalesUpContainer";
import OverviewSalesUp from "../modules/summarySalesUp/OverviewSalesUp";
import StatisticSalesUp from "../modules/summarySalesUp/StatisticSalesUp";
import SummarySalesRoomContainer from "../modules/summarySalesRoom/SummarySalesRoomContainer";
import OverviewSalesRoom from "../modules/summarySalesRoom/OverviewSalesRoom";
import StatisticSalesRoom from "../modules/summarySalesRoom/StatisticSalesRoom";
import RegisterListContainer from "../modules/registerStudents/RegisterListContainer";
import InfoStudentContainer from "../modules/infoStudent/InfoStudentContainer";
import HistoryCollectMoneyContainer from "../modules/infoStudent/historyCollectMoney/HistoryCollectMoneyContainer";
import RegistersContainer from "../modules/infoStudent/registers/RegistersContainer";
import HistoryCallContainer from "../modules/infoStudent/historyCalls/HistoryCallContainer";
import ProgressContainer from "../modules/infoStudent/progress/ProgressContainer";
import TargetListContainer from '../modules/sales/TargetListContainer';
import EvaluateSalerContainer from "../modules/evaluateSalers/EvaluateSalerContainer";
import LogsContainer from "../modules/infoStudent/logsStudent/HistoryCareContainer";
import RegisterListContainerV3 from "../modules/registerStudentsV3/RegisterListContainer";
import MockExamsContainer from "../modules/infoStudent/mockExams/MockExamsContainer";


/**
 * Tab Quản lý sales
 */
export default [
    {
        path: "sales/personal-kpi",
        // component: TargetPersonContainer
        component: EvaluateSalerContainer
    },
    {
        path: "sales/target/:salerId",
        // path: "sales/target/:userId",
        // component: TargetPersonContainer
        component: EvaluateSalerContainer
    },
    {
        path: "sales/targets",
        component: TargetListContainer
    },
    {
        path: "/sales/registerlist-old(/:salerId)",
        component: RegisterListContainer
    },
    {
        path: "/sales/register-list-old",
        component: RegisterListContainerV3
    },
    {
        path: "/sales/waitlist",
        // path: "/manage/waitlist",
        component: RegisterListContainer
    },
    {
        path: "/sales/registerlist/:campaignId/:genId",
        // path: "/registerlist/:campaignId/:genId",
        component: RegisterListContainer
    },
    {
        path: "/sales/sales",
        component: SummarySalesContainer,
        children: [
            {
                path: "/",
                component: OverviewSales
            },
            {
                path: "statistic",
                component: StatisticSales
            }
        ]
    },


    {
        path: "/sales/sales-up",
        component: SummarySalesUpContainer,
        children: [
            {
                path: "/",
                component: OverviewSalesUp
            },
            {
                path: "statistic",
                component: StatisticSalesUp
            }
        ]
    },

    {
        path: "/sales/sales-room",
        component: SummarySalesRoomContainer,
        children: [
            {
                path: "/",
                component: OverviewSalesRoom,
            },
            {
                path: "statistic",
                component: StatisticSalesRoom,
            }
        ]
    },
    {
        path: "/sales/info-student/:studentId",
        // path: "/manage/courses/create",
        component: InfoStudentContainer,
        // path children ko có / phía trước nhé ( "/documents" thế này là sai) đúng là "documents"
        children: [
            {
                path: "/",
                component: RegistersContainer
            },
            {
                path: "history-calls",
                component: HistoryCallContainer
            },
            {
                path: "progress",
                component: ProgressContainer
            },
            {
                path: "history-collect-money",
                component: HistoryCollectMoneyContainer
            },
            {
                path: "logs",
                component: LogsContainer
            },
            {
                path: "mock-exams",
                component: MockExamsContainer
            },
        ]
    },
    {
        path: "/sales/evaluate",
        component: EvaluateSalerContainer,
    },
    {
        path: "/sales/evaluate/:salerId",
        component: EvaluateSalerContainer,
    },
];
