import CollectMoneyContainer from "../modules/collectMoney/CollectMoneyContainer";
import HistoryCollectMoneyContainer from "../modules/historyCollectMoney/HistoryCollectMoneyContainer";
import CurrencyContainer from "../modules/currency/CurrencyContainer";

import BankAccountContainer from "../modules/bankAccount/BankAccountContainer";

import BankTransfersContainer from "../modules/finance/BankTransfersContainer";

import PasswordContainer from "../modules/password/PasswordContainer";

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
        component: BankAccountContainer
    },
    {
        path: "/finance/bank-transfers",
        component: BankTransfersContainer

    },
    {
        path: "/finance/password",
        component: PasswordContainer

    }
];
