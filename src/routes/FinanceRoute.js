import CollectMoneyContainer from "../modules/collectMoney/CollectMoneyContainer";
import HistoryCollectMoneyContainer from "../modules/historyCollectMoney/HistoryCollectMoneyContainer";
import CurrencyContainer from "../modules/currency/CurrencyContainer";

/**
 * Tab Quản lý tài chính
 */
export default [
    {
        path: "/finance/moneycollect",
        component: CollectMoneyContainer
    },
    {
        path: "/finance/paidlist",
        component: HistoryCollectMoneyContainer
    },
    {
        path: "/finance/currencies",
        component: CurrencyContainer
    },
    {
        path: "/finance/bank-account",
        component: CurrencyContainer
    }
];
