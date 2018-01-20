// import BasesContainer from "../modules/bases/BasesContainer";
// import RoomsContainer from "../modules/rooms/RoomsContainer";
// import CreateBaseContainer from "../modules/bases/CreateBaseContainer";
import OrderedContainer from "../modules/orderedProduct/OrderedContainer";
import OrderedDetailContainer from "../modules/orderedDetail/OrderedDetailContainer";

/**
 * Tab Hàng đặt
 */
export default [
    {
        path: "/order/orders",
        component: OrderedContainer
    },
    {
        path: "/order/detail",
        component: OrderedDetailContainer,
        type: "create"
    },
    {
        path: "/order/:orderId/edit",
        component: OrderedDetailContainer,
        type: "edit"
    }
];
