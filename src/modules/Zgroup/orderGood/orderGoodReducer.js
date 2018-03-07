/**
 * Created by nangbandem
 */
import * as types from '../../../constants/actionTypes';
import initialState from '../../../reducers/initialState';

export default function orderGoodReducer(state = initialState.orderGood, action) {
    // console.log(action.type, state.data);
    switch (action.type) {
        case types.BEGIN_LOAD_ALL_GOODS_ORDER_GOOD:
            return {
                ...state,

            };
        case types.LOAD_ALL_GOODS_ORDER_GOOD_SUCCESS: {
            return {
                ...state,

                goods: getSelectArray(action.goods),
            };
        }

        case types.LOAD_ALL_GOODS_ORDER_GOOD_ERROR:
            return {
                ...state,

            };

        case types.BEGIN_LOAD_ALL_COMPANIES_ORDER_GOOD:
            return {
                ...state,
            };
        case types.LOAD_ALL_COMPANIES_ORDER_GOOD_SUCCESS: {
            return {
                ...state,
                companies: getSelectArray(action.companies),
            };
        }
        case types.LOAD_ALL_COMPANIES_ORDER_GOOD_ERROR:
            return {
                ...state,

            };
        case types.BEGIN_LOAD_ALL_ORDER_GOOD:
            return {
                ...state,
            };
        case types.LOAD_ALL_ORDER_GOOD_SUCCESS: {
            return {
                ...state,
                orderList: action.orderList,
                paginator: action.paginator,
            };
        }

        case types.LOAD_ALL_ORDER_GOOD_ERROR:
            return {
                ...state,

            };
        case types.BEGIN_CREATE_ORDER_GOOD:
            return {
                ...state,
                isCommitting: true,
            };
        case types.CREATE_ORDER_GOOD_SUCCESS: {
            return {
                ...state,
                isCommitting: false,
            };
        }
        case types.CREATE_ORDER_GOOD_ERROR:
            return {
                ...state,
                isCommitting: false,
            };
            
        case types.BEGIN_EDIT_ORDER_GOOD:
            return {
                ...state,
                isCommitting: true,
            };
        case types.EDIT_ORDER_GOOD_SUCCESS: {
            return {
                ...state,
                isCommitting: false,
            };
        }
        case types.EDIT_ORDER_GOOD_ERROR:
            return {
                ...state,
                isCommitting: false,
            };

        default:
            return state;
    }
}


function getSelectArray(arr) {
    let res = arr.map(obj => {
        return {
            ...obj,
            value: obj.id,
            label: obj.name,
        };
    });
    return res;
}