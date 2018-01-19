import * as types from '../../constants/actionTypes';
import * as orderedDetailApi from './orderedDetailApi';
import * as helper from "../../helpers/helper";
import {browserHistory} from 'react-router';

export function saveOrder(order, customer) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        orderedDetailApi.saveOrderApi(order, customer)
            .then(function () {
                browserHistory.push("/order/orders");
                helper.showNotification("Thêm đơn hàng thành công");
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}

export function handleOrder(order) {
    return ({
        type: types.HANDLE_ORDER_ORDERED_DETAIL,
        order
    });
}


export function saveCategoriesCreateProduct(categories) {
    return ({
        type: types.GET_CATEGORIES_CREATE_PRODUCT,
        categories
    });
}



export function selectGoodCountCheck() {
    return ({
        type: types.SELECT_GOOD_COUNT_CHECK
    });
}


export function saveProductEdit(product) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        createProductApi.editProductApi(product)
            .then(function () {
                browserHistory.push("/good/goods/products");
                helper.showNotification("Thêm sản phẩm thành công");
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}


export function loadProduct(productId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_PRODUCT_DETAIL
        });
        createProductApi.loadProductApi(productId)
            .then((res) => {
                let product = {...res.data.data.good};
                if (res.data.data.good.property_list && res.data.data.good.children) {
                    let property_list = res.data.data.good.property_list.map(property => {
                        return {
                            ...property,
                            value: property.value.map(e => {
                                return {
                                    old: true,
                                    value: e,
                                    label: e
                                };
                            })
                        };
                    });
                    let goods_count = res.data.data.good.property_list.reduce((result, property) => property.value.length * result, 1);
                    product = {
                        ...product,
                        property_list: property_list,
                        goods_count: goods_count,
                        children: helper.childrenLoadedEditSuccess(property_list, res.data.data.good.children)
                    };
                    dispatch({
                        type: types.LOAD_PRODUCT_DETAIL_SUCCESS,
                        product: product
                    });
                } else {
                    product = {
                        ...product,
                        property_list: [{
                            name: 'coool',
                            property_item_id: 3,
                            value: []
                        }],
                        goods_count: 0,
                        children: []
                    };
                    dispatch({
                        type: types.LOAD_PRODUCT_DETAIL_SUCCESS,
                        product: product
                    });
                }
            });
    };
}


