import ProductWebsiteContainer from "../modules/createProduct/ProductWebsiteContainer";
import ProductSystemContainer from "../modules/createProduct/ProductSystemContainer";
import CreateProductContainer from "../modules/createProduct/CreateProductContainer";
import AddDiscountContainer from "../modules/addDiscount/AddDiscountContainer";
import DiscountContainer from "../modules/discount/DiscountContainer";
import CustomerContainer from "../modules/customer/CustomerContainer";
import InfoCustomerContainer from "../modules/customer/InfoCustomerContainer";
import GroupCustomerContainer from "../modules/groupCustomer/GroupCustomerContainer";
import WareHouseContainer from "../modules/wareHouse/WareHouseContainer";
import ImportGoodsContainer from "../modules/importGoods/ImportGoodsContainer";
import StoreImportContainer from "../modules/importGoods/importGood/StoreImportContainer";
import ImportContainer from "../modules/importGoods/importGood/ImportContainer";
import InventoryGoodContainer from "../modules/inventoryGood/InventoryGoodContainer";
import ProductListContainer from "../modules/productList/ProductListContainer";
import OrdersContainer from "../modules/goodOrders/OrdersContainer";
import OrderContainer from "../modules/goodOrders/order/OrderContainer";
import CategoriesContainer from "../modules/categories/CategoriesContainer";
import SupplierContainer from "../modules/supplier/SupplierContainer";
import ShiftRegistersContainer from "../modules/shiftRegisters/ShiftRegistersContainer";
import HistoryShiftRegistersContainer from "../modules/historyShiftRegisters/HistoryShiftRegistersContainer";
import ShiftSessionsContainer from "../modules/shiftSessions/ShiftSessionsContainer";

/**
 * Tab Nhân sự
 */
export default [
    {
        path: "/shift/manage/regis-shifts",
        component: ShiftRegistersContainer
    },
    {
        path: "/shift/register-shifts/history",
        component: HistoryShiftRegistersContainer
    },
    {
        path: "/shift/manage/shift",
        component: ShiftSessionsContainer
    }
];
