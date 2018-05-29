import RequestMoneyContainer from "../modules/Zgroup/request/requestMoney/RequestMoneyContainer";
import RequestVacationContainer from "../modules/Zgroup/request/requestVacation/RequestVacationContainer";
import CreateRequestVacationContainer from "../modules/Zgroup/request/requestVacation/CreateRequestVacationContainer";
import CreateRequestMoneyContainer from "../modules/Zgroup/request/requestMoney/CreateRequestMoneyContainer";
import WeekendReportContainer from "../modules/Zgroup/weekendReport/WeekendReportContainer";
import AddReportContainer from "../modules/Zgroup/weekendReport/AddReportContainer";
import ProposePaymentContainer from "../modules/Zgroup/proposePaymentAdministration/ProposePaymentContainer";
import CreateProposePaymentContainer from "../modules/Zgroup/proposePaymentAdministration/CreateProposePaymentContainer";
import BillContainer from "../modules/Zgroup/bill/BillContainer";
import CreateBillContainer from "../modules/Zgroup/bill/CreateBillContainer";
import ContractContainer from "../modules/Zgroup/contract/ContractContainer";
import CreateContractContainer from "../modules/Zgroup/contract/CreateContractContainer";
import FundContainer from "../modules/Zgroup/fund/FundContainer";
import TransferHistoryContainer from "../modules/Zgroup/fund/TransferHistoryContainer";


/**
 * Tab Hanh Chinh
 */
export default [
    {
        path: "/administration/request/money/create",
        component: CreateRequestMoneyContainer,
    },
    {
        path: "/administration/request/money/edit/:requestId",
        component: CreateRequestMoneyContainer,
    },
    {
        path: "/administration/request/vacation/create",
        component: CreateRequestVacationContainer,
    },
    {
        path: "/administration/request/vacation/edit/:requestId",
        component: CreateRequestVacationContainer,
    },
    {
        path: "/administration/request/money",
        component: RequestMoneyContainer,
    },
    {
        path: "/administration/request/vacation",
        component: RequestVacationContainer,
    },
    {
        path: "/administration/weekend-report",
        component: WeekendReportContainer,
    },
    {
        path: "/administration/weekend-report/create",
        component: AddReportContainer,
    },
    {
        path: "/administration/weekend-report/edit/:reportId",
        component: AddReportContainer,
    },
    {
        path: "/administration/propose-payment",
        component: ProposePaymentContainer,
    },
    {
        path: "/administration/propose-payment/create",
        component: CreateProposePaymentContainer,
    },
    {
        path: "/administration/propose-payment/edit/:paymentId",
        component: CreateProposePaymentContainer,
        type: "edit",
    },
    {
        path: "/administration/bill",
        component:BillContainer,
    },
    {
        path: "/administration/bill/create",
        component: CreateBillContainer,
    },
    {
        path: "/administration/bill/edit/:paymentId",
        component: CreateBillContainer,
        type: "edit",
    },
    {
        path: "/administration/contract",
        component: ContractContainer,
    },
    {
        path: "/administration/contract/create",
        component: CreateContractContainer,
    },
    {
        path: "/administration/contract/edit/:contract_id",
        component: CreateContractContainer,
    },
    {
        path: "/administration/fund",
        component: FundContainer,
    },
    {
        path: "/administration/history-fund",
        component: TransferHistoryContainer,
    },
];
