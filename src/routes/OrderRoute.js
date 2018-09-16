// import BasesContainer from "../modules/bases/BasesContainer";
// import RoomsContainer from "../modules/rooms/RoomsContainer";
// import CreateBaseContainer from "../modules/bases/CreateBaseContainer";
import OrderedContainer from "../modules/orderedProduct/OrderedContainer";
import OrderedDetailContainer from "../modules/orderedDetail/OrderedDetailContainer";
import InventoryOrderContainer from "../modules/inventoryOrder/InventoryOrderContainer";
import CreateProductContainer from "../modules/createProduct/CreateProductContainer";
import ProductSystemContainer from "../modules/createProduct/ProductSystemContainer";
import ProductWebsiteContainer from "../modules/createProduct/ProductWebsiteContainer";

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
    },
    {
        path: "/order/inventories",
        component: InventoryOrderContainer
    },
    {
        path: "/order/:orderId/warehouse-import",
        component: CreateProductContainer,
        type: "import",
        children: [
            {
                path: "/",
                component: ProductSystemContainer
            },
            {
                path: "website-display",
                component: ProductWebsiteContainer
            }
        ]
    },
];
