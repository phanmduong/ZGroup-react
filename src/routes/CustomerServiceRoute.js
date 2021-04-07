import LeadContainer from "../modules/lead/LeadContainer";
import TicketContainer from "../modules/tickets/TicketContainer";

/**
 * Tab Chăm sóc khách hàng
 */

export default [
    {
        path: "/customer-services/my-leads-old",
        type: "my-leads",
        component: LeadContainer
    },
    {
        path: "/customer-services/leads-old",
        component: LeadContainer
    },
    {
        path: "/customer-services/distribution-leads-old",
        component: LeadContainer,
        type: "distribution"
    },
    {
        path: "/customer-services/tickets",
        component: TicketContainer,
        type: "distribution"
    },
];
