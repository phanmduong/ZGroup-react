import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import createProductReducer from "../modules/createProduct/createProductReducer";
import addDiscountReducer from "../modules/addDiscount/addDiscountReducer";
import discountReducer from "../modules/discount/discountReducer";
import groupCustomerReducer from "../modules/groupCustomer/groupCustomerReducer";
import customerReducer from "../modules/customer/customerReducer";
import wareHouseReducer from "../modules/wareHouse/wareHouseReducer";
import importGoodsReducer from "../modules/importGoods/importGoodsReducer";
import inventoryGoodReducer from "../modules/inventoryGood/inventoryGoodReducer";
import productListReducer from "../modules/productList/productListReducer";
import goodOrdersReducer from "../modules/goodOrders.v2.nq/goodOrdersReducer";
import categoriesReducer from "../modules/categories/categoriesReducer";
import supplierReducer from "../modules/supplier/supplierReducer";
import createSaleGoodsReducer from "../modules/createEditSaleGood/createSaleGoodsReducer";

const appReducer = combineReducers({
    ...commonReducer,
    createProduct: createProductReducer,
    addDiscount: addDiscountReducer,
    discounts: discountReducer,
    groupCustomers: groupCustomerReducer,
    customers: customerReducer,
    wareHouses: wareHouseReducer,
    importGoods: importGoodsReducer,
    inventoryGood: inventoryGoodReducer,
    productList: productListReducer,
    goodOrders: goodOrdersReducer,
    categories: categoriesReducer,
    suppliers: supplierReducer,
    createSaleGoods: createSaleGoodsReducer,
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
