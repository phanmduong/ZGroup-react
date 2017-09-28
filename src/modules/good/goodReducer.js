/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function baseListReducer(state = initialState.good, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_GOODS:
            return {
                ...state,
                goodList: {
                    ...state.goodList,
                    isLoading: true
                }
            };
        case types.LOAD_GOODS_SUCCESS:
            return {
                ...state,
                goodList: {
                    ...state.goodList,
                    isLoading: false,
                    goods: action.goods,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        default:
            return state;
    }

}