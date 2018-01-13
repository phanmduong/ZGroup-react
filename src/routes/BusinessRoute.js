import CompanyContainer from "../modules/companies/CompanyContainer";
import CreateCompanyContainer from "../modules/companies/CreateCompanyContainer";
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
];
