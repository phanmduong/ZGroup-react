import CompanyContainer from "../modules/companies/CompanyContainer";
import CreateCompanyContainer from "../modules/companies/CreateCompanyContainer";
import PrintOrderContainer from "../modules/printOrder/PrintOrderContainer";
import CreatePrintOrderContainer from "../modules/printOrder/CreatePrintOrderContainer";
import ExportOrderContainer from "../modules/Zgroup/exportGood/ExportOrderContainer";
import CreateExportOrderContainer from "../modules/Zgroup/exportGood/CreateExportOrderContainer";
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
    {
        path: "/business/export-order",
        component: ExportOrderContainer,
    },
    {
        path: "/business/export-order/create",
        component: CreateExportOrderContainer,
    },
];
