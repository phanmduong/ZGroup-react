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
import DetailGroupCustomerContainer from "../modules/groupCustomer/detailGroupCustomer/DetailGroupCustomerContainer";
import SaleGoodContainer from "../modules/createEditSaleGood/SaleGoodContainer";

/**
 * Tab Hang hoa
 */
export default [
    {
        path: "/good/create-product",
        component: CreateProductContainer,
        type: "create",
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
    {
        path: "/good/product/:productId/edit",
        component: CreateProductContainer,
        type: "edit",
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
    {
        path: "/good/discount/add",
        component: AddDiscountContainer
    },
    {
        path: "/good/discount",
        component: DiscountContainer
    },
    {
        path: "/good/discount/edit/:discountId",
        component: AddDiscountContainer
    },
    {
        path: "/good/goods/customer",
        component: CustomerContainer
    },
    {
        path: "/good/goods/customer/info-customer/:customerId",
        component: InfoCustomerContainer
    },
    {
        path: "/good/goods/group-customer",
        component: GroupCustomerContainer
    },

    {
        path: "/good/goods/group-customer/:groupId",
        component: DetailGroupCustomerContainer
    },
    {
        path: "/good/goods/warehouses",
        component: WareHouseContainer
    },
    {
        path: "/good/import-goods",
        component: ImportGoodsContainer
    },
    {
        path: "/good/import-good/create",
        component: StoreImportContainer,
        type: "create"
    },
    {
        path: "/good/import-good/:importGoodId/edit",
        component: StoreImportContainer,
        type: "edit"
    },
    {
        path: "/good/import-good/:importGoodId",
        component: ImportContainer
    },
    {
        path: "/good/goods/inventories",
        component: InventoryGoodContainer
    },
    {
        path: "/good/goods/products",
        component: ProductListContainer
    },
    {
        path: "/good/goods/orders",
        component: OrdersContainer
    },
    {
        path: "/good/goods/order/:orderId",
        component: OrderContainer
    },
    {
        path: "/good/goods/categories",
        component: CategoriesContainer
    },
    {
        path: "/good/goods/categories",
        component: CategoriesContainer
    },
    {
        path: "/good/goods/supplier",
        component: SupplierContainer
    },
    {
        path : "/good/goods/add-sale-good",
        component : SaleGoodContainer,
    }
];
