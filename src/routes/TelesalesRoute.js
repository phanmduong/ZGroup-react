import HistoryCallsContainer from "../modules/historyCalls/HistoryCallsContainer";
/**
 * Tab Quản lý telesales
 */
export default [
    {
        path: "/telesales/telesalehistory(/:callerId)",
        component: HistoryCallsContainer
    }
];
