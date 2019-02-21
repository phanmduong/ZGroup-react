import CollectMoneyContainer from "../modules/collectMoney/CollectMoneyContainer";
import HistoryCollectMoneyContainer from "../modules/historyCollectMoney/HistoryCollectMoneyContainer";
import CurrencyContainer from "../modules/currency/CurrencyContainer";
import BankAccountContainer from "../modules/bankAccount/BankAccountContainer";
import BankTransfersContainer from "../modules/finance/BankTransfersContainer";
import MoneyTransfersContainer from "../modules/moneyTransfer/MoneyTransferContainer";
import StaffsKeepMoneyContainer from "../modules/staffsKeepMoney/StaffsKeepMoneyContainer";
import HistoryTransactionsContainer from "../modules/historyTransactions/HistoryTransactionsContainer";
import SpendMoneyContainer from "../modules/spendMoney/SpendMoneyContainer";
import SummaryFinanceContainer from "../modules/summaryFinance/SummaryFinanceContainer";
import PasswordContainer from "../modules/password/PasswordContainer";
import SalaryTeachingContainer from "../modules/salaryTeaching/SalaryTeachingContainer";
import SalarySalesContainer from "../modules/salarySales/SalarySalesContainer";

/**
 * Tab Quản lý tài chính
 */
export default [
    {
        path: "/finance/moneycollect",
        component: CollectMoneyContainer,
    },
    {
        path: "/finance/salary-teaching(/:genId)",
        component: SalaryTeachingContainer,
    },
    {
        path: "/finance/salary-sale(/:genId)(/:baseId)",
        component: SalarySalesContainer,
    },
    {
        path: "/finance/sendmoney",
        component: MoneyTransfersContainer,
    },
    {
        path: "/finance/keepmoney",
        component: StaffsKeepMoneyContainer,
    },
    {
        path: "/finance/spendlist",
        component: HistoryTransactionsContainer,
    },
    {
        path: "/finance/spendmoney",
        component: SpendMoneyContainer,
    },
    {
        path: "/finance/summary",
        component: SummaryFinanceContainer,
    },
    {
        path: "/finance/paidlist",
        component: HistoryCollectMoneyContainer,
    },
    {
        path: "/finance/currencies",
        component: CurrencyContainer,
    },
    {
        path: "/finance/bank-account",
        component: BankAccountContainer,
    },
    {
        path: "/finance/bank-transfers",
        component: BankTransfersContainer,
    },
    {
        path: "/finance/password",
        component: PasswordContainer,
    },
];
