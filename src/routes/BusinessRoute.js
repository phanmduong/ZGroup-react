import CompanyContainer from "../modules/companies/CompanyContainer";
import CreateCompanyContainer from "../modules/companies/CreateCompanyContainer";
import PrintOrderContainer from "../modules/printOrder/PrintOrderContainer";
import CreatePrintOrderContainer from "../modules/printOrder/CreatePrintOrderContainer";
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
];
