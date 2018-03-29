import ManageRequestContainer from "../modules/Zgroup/request/ManageRequestContainer";
import CreateRequestVacationContainer from "../modules/Zgroup/request/requestVacation/CreateRequestVacationContainer";

/**
 * Tab Hanh Chinh
 */
export default [
    { 
        path: "/administration/manage",
        component: ManageRequestContainer
    },
    { 
        path: "/administration/request/vacation",
        component: CreateRequestVacationContainer
    },
];
