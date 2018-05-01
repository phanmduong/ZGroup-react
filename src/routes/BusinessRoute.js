import CompanyContainer from "../modules/companies/CompanyContainer";
import CreateCompanyContainer from "../modules/companies/CreateCompanyContainer";
import PaymentContainer from "../modules/payment/PaymentContainer";
import CreatePaymentContainer from "../modules/payment/CreatePaymentContainer";
import PrintOrderContainer from "../modules/printOrder/PrintOrderContainer";
import CreatePrintOrderContainer from "../modules/printOrder/CreatePrintOrderContainer";
import ExportOrderContainer from "../modules/Zgroup/exportGood/ExportOrderContainer";
import CreateExportOrderContainer from "../modules/Zgroup/exportGood/CreateExportOrderContainer";
import CreateOrderedGood from "../modules/Zgroup/orderedGood/CreateOrderedGood";
import HistoryDebtContainer from "../modules/historyDebt/HistoryDebtContainer";
//import ImportOrderContainer from "../modules/importOrder/ImportOrderContainer";
import CreateItemImportOrderContainer from "../modules/importOrder/CreateItemImportOrderContainer";
import ItemOrderContainer from "../modules/importOrder/ItemOrderContainer";
import OrderedGoodContainer from "../modules/Zgroup/orderedGood/OrderedGoodContainer";
import CreateOrderGoodContainer from "../modules/Zgroup/orderGood/CreateOrderGoodContainer";
import OrderGoodContainer from "../modules/Zgroup/orderGood/OrderGoodContainer";

/**
 * Tab Kinh Doanh
 */
export default [
    {
        path: "/business/companies",
        component: CompanyContainer,
    },
    {
        path: "/business/company/create",
        component: CreateCompanyContainer,
    },
    {
        path: "/business/company/edit/:companyId",
        component: CreateCompanyContainer,
        type: "edit"
    },
    {

        path: "/business/company/payment/edit/:paymentId",
        component: CreatePaymentContainer,
        type: "edit"
    },
    {
        path: "/business/company/payment/create",
        component: CreatePaymentContainer,
    },
    {
        path: "/business/company/payments",
        component: PaymentContainer,
    },
    {
        path: "/business/print-order",
        component: PrintOrderContainer,
    },
    {
        path: "/business/print-order/create",
        component: CreatePrintOrderContainer,
    },
    {
        path: "/business/print-order/edit/:printOrderId",
        component: CreatePrintOrderContainer,
    },
    {
        path: "/business/export-order",
        component: ExportOrderContainer,
    },
    {
        path: "/business/export-order/create",
        component: CreateExportOrderContainer,
    },
    {
        path: "/business/export-order/edit/:exportOrderId",
        component: CreateExportOrderContainer,
    },
    {
        path: "/business/ordered-good",
        component: OrderedGoodContainer,
    },
    {
        path: "/business/ordered-good/create",
        component: CreateOrderedGood,
    },
    {

        path: "/business/ordered-good/edit/:orderedGoodId",
        component: CreateOrderedGood,
    },
    {
        path: "/business/history-debt",
        component: HistoryDebtContainer,
    },
    {
        path: "/business/import-order",
        component: ItemOrderContainer,

    },
    {
        path: "/business/import-order/item/create",
        component: CreateItemImportOrderContainer,

    },
    {
        path: "/business/order-good",
        component: OrderGoodContainer,
    },
    {
        path: "/business/order-good/create",
        component: CreateOrderGoodContainer,

    },
    {
        path: "/business/order-good/edit/:orderGoodId",
        component: CreateOrderGoodContainer,
    },
];
