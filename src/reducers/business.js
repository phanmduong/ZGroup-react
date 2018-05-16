import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import historyDebtReducer from "../modules/historyDebt/historyDebtReducer";
import importOrderReducer from "../modules/importOrder/importOrderReducer";
import orderGoodReducer from '../modules/Zgroup/orderGood/orderGoodReducer';
import orderedGoodReducer from '../modules/Zgroup/orderedGood/orderedGoodReducer';
import exportOrderReducer from "../modules/Zgroup/exportGood/exportOrderReducer";
import printOrderReducer from "../modules/printOrder/printOrderReducer";
import PaymentReducer from '../modules/payment/PaymentReducer';
import CompanyReducer from '../modules/companies/CompanyReducer';
import warehouseReducer from "../modules/Zgroup/warehouse/warehouseReducer";

const appReducer = combineReducers({
    ...commonReducer,
    historyDebt: historyDebtReducer,
    importOrder: importOrderReducer,
    orderGood : orderGoodReducer,
    orderedGood: orderedGoodReducer,
    printOrder: printOrderReducer,
    exportOrder: exportOrderReducer,
    companies: CompanyReducer,
    payment: PaymentReducer,
    zWarehouse: warehouseReducer,
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
