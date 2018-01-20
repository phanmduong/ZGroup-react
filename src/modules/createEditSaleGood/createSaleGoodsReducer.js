import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let goodsList, goodsShowInTable;
export default function createSaleGoodsReducer(state = initialState.createSaleGoods, action) {
    switch (action.type) {
        case types.UPDATE_CUSTOMER_IN_SALE_GOODS:
            return {
                ...state,
                customer: action.customer,
            };
        case types.UPDATE_INFO_ORDER_IN_SALE_GOODS:
            return {
                ...state,
                infoOrder: action.infoOrder,
            };

        case types.UPDATE_TMP_QUANTITY_IN_SALE_GOODS:
            return {
                ...state,
                goodsShowInTable: action.goodsShowInTable,
            };


        case types.CHANGE_WAREHOUSE_IN_SALE_GOOD:
            return{
                ...state,
                warehouse : action.id,
                goodsShowInTable : [],
            };


        case types.BEGIN_LOAD_GOOD_IN_MODAL_IN_CREATE_SALE_GOOD :
            return {
                ...state,
                ...{
                    isLoadingGoodModal: true,
                }
            };
        case types.LOADED_GOOD_SUCCESS_IN_MODAL_IN_CREATE_SALE_GOOD:
            goodsList = action.goodsList;
            goodsList = goodsList.map((good) => {
                return addQuantity(0, good);
            });
            state.goodsShowInTable && state.goodsShowInTable.map((good) => {
                goodsList = assignGood(good.id, goodsList);
            });
            return {
                ...state,
                ...{
                    goodsList: goodsList,
                    totalGoodPages: action.total_pages,
                    isLoadingGoodModal: false,
                }
            };
        case types.LOADED_GOOD_ERROR_IN_MODAL_IN_CREATE_SALE_GOOD:
            return {
                ...state,
                isLoadingGoodModal: false,

            };
        case types.ASSIGN_GOOD_FORM_DATA_IN_CREATE_SALE_GOOD:
            goodsList = assignGood(action.good.id, state.goodsList);
            return {
                ...state,
                goodsList: goodsList,
                goodsShowInTable: [...state.goodsShowInTable, action.good],
            };
        case types.REMOVE_GOOD_FORM_DATA_IN_CREATE_SALE_GOOD:
            goodsShowInTable = assignGood(action.good.id, state.goodsShowInTable);
            return {
                ...state,
                goodsShowInTable: goodsShowInTable,
                goodsList: [...state.goodsList, action.good],
            };
        case types.BEGIN_CREATE_SALE_GOOD:
            return{
                ...state,
                isSaving : true,
            };

        case types.CREATE_SALE_GOOD_SUCCESS:
            return {
                ...state,
                isSaving: false,
            };
        case types.CREATE_SALE_GOOD_ERROR:
            return{
                ...state,
                isSaving :  false,
            };
        default:
            return state;
    }
}

function assignGood(id, goodsList) {
    if (goodsList) {
        goodsList = goodsList.filter((good) => good.id !== id);
    }
    return goodsList;
}

function addQuantity(tmpQuantity, good) {
    good = {...good};
    good['tmpQuantity'] = tmpQuantity;
    return good;
}