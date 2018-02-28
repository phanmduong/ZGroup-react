/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let return_orders, goodsList, good;

function changeStatusOrder(orders, order_id, status) {
    if (orders) {
        orders = orders.map((order) => {
            if (order.id === order_id) {
                return {
                    ...order,
                    status: status,
                };
            }
            return order;
        });
    }
    return orders;
}

export default function goodOrdersReducer(state = initialState.goodOrders, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_GOOD_ORDERS:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_GOOD_ORDERS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                    orders: action.orders,
                    totalOrder: action.totalOrder,
                    totalMoney: action.totalMoney,
                    totalPaidMoney: action.totalPaidMoney,
                    limit: action.limit,
                    totalCount: action.totalCount,
                }
            };
        case types.LOAD_GOOD_ORDERS_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        case types.BEGIN_LOAD_DETAIL_ORDER:
            return {
                ...state,
                order: {
                    ...state.order,
                    isLoading: true,
                    error: false
                }
            };
        case types.TOGGLE_SELECT_WAREHOUSE_MODAL:
            return {
                ...state,
                selectWarehouseModal: !state.selectWarehouseModal,
                nextStatus: action.nextStatus,
                orderIdWarehouseModal: action.orderIdWarehouseModal
            };
        case types.BEGIN_LOAD_WAREHOUSES_GOOD_ORDER:
            return {
                ...state,
                isLoadingWarehouse: true
            };
        case types.GET_WAREHOUSES_GOOD_ORDER:
            return {
                ...state,
                warehousesList: action.warehousesList,
                isLoadingWarehouse: false,
                totalCountWarehouse: action.totalCountWarehouse,
                totalPagesWarehouse: action.totalPagesWarehouse,
                currentPageWarehouse: action.currentPageWarehouse
            };
        case types.LOAD_DETAIL_ORDER_SUCCESS:
            return {
                ...state,
                order: {
                    ...state.order,
                    isLoading: false,
                    error: false,
                    total: action.total,
                    paid: action.paid,
                    debt: action.debt,
                    order: action.order,
                }
            };
        case types.LOAD_DETAIL_ORDER_ERROR:
            return {
                ...state,
                order: {
                    ...state.order,
                    isLoading: false,
                    error: true
                }
            };
        case types.BEGIN_LOAD_STAFFS_ORDERS:
            return {
                ...state,
                ...{
                    isLoadingStaffs: true,
                    errorStaffs: false,
                }
            };
        case types.LOAD_STAFFS_ORDERS_SUCCESS:
            return {
                ...state,
                staffs: action.staffs,
                isLoadingStaffs: false,
                errorStaffs: false,
            };
        case types.LOAD_STAFFS_ORDERS_ERROR:
            return {
                ...state,
                isLoadingStaffs: false,
                errorStaffs: true,
            };

        case types.GET_ALL_STAFFS_COMPLETE_GOOD_ORDER:
            return {
                ...state,
                allStaffs: action.allStaffs
            };
        case types.CHANGE_STATUS_ORDER_SUCCESS:
            return {
                ...state,
                orders: changeStatusOrder(state.orders, action.order_id, action.status),
                order: {
                    ...state.order,
                    order: {
                        ...state.order.order,
                        status: action.status
                    }
                },
                selectWarehouseModal: false
            };
        // case types.TOGGLE_SHIP_GOOD_MODAL:
        //     return {
        //         ...state,
        //         isUpdate: action.isUpdate || false,
        //         shipGoodModal: !state.shipGoodModal
        //     };
        case types.TOGGLE_ADD_NOTE_MODAL:
            return {
                ...state,
                addNoteModal: !state.addNoteModal
            };
        case types.HANDLE_ADD_NOTE_MODAL:
            return {
                ...state,
                orderNote: action.order
            };
        case types.BEGIN_EDIT_NOTE_GOOD_ORDER:
            return {
                ...state,
                isSendingNote: true
            };
        case types.EDIT_NOTE_SUCCESS_GOOD_ORDER: {
            let orders = state.orders.map(order => {
                if (order.id === action.order.id) {
                    return {
                        ...order,
                        note: action.order.note
                    };
                }
                return order;
            });
            return {
                ...state,
                isSendingNote: false,
                addNoteModal: false,
                orders: orders
            };
        }
        case types.HANDLE_SHIP_ORDER_BEGIN: {
            let products = {...state.shippingGood.products};
            action.order.good_orders.forEach(product => {
                products = [...product, {
                    name: product.name,
                    weight: 0.3 * product.quantity
                }];
            });
            return {
                ...state,
                orderId: action.order.id,
                labelId: action.order.label_id ? action.order.label_id : -1,
                shippingGood: {
                    ...state.shipGoodModal,
                    products,
                    order: {
                        ...state.shippingGood.order,
                        id: action.order.code,
                        tel: action.order.customer ? action.order.customer.phone : '',
                        name: action.order.customer ? action.order.customer.name : '',
                        address: action.order.customer ? action.order.customer.address : '',
                        value: action.order.total
                    }
                }
            };
        }
        case types.HANDLE_SHIP_ORDER:
            return {
                ...state,
                shippingGood: {
                    ...state.shippingGood,
                    order: action.order
                }
            };
        // case types.BEGIN_SEND_SHIP_ORDER:
        //     return {
        //         ...state,
        //         isSendingShipOrder: true
        //     };
        // case types.SEND_SHIP_ORDER_COMPLETE: {
        //     let orders = state.orders.map(order => {
        //         if (action.orderId === order.id) {
        //             return {
        //                 ...order,
        //                 label_id: action.labelId
        //             };
        //         }
        //         return order;
        //     });
        //     return {
        //         ...state,
        //         orders: orders,
        //         isSendingShipOrder: false,
        //         shipGoodModal: false,
        //         shippedGoodResponse: action.shippedGoodResponse
        //     };
        // }
        case types.SEND_SHIP_ORDER_FAILED:
            return {
                ...state,
                isSendingShipOrder: false,
                shipGoodModal: false
            };
        case types.UPDATE_ORDER_FORM_DATA:
            return {
                ...state,
                order: {
                    ...state.order,
                    order: action.order,
                }
            };


        case types.BEGIN_EDIT_ORDER:

            if (action.isQuantity) {

                return {
                    ...state,
                    order: {
                        ...state.order,
                        isSavingQuantity: {
                            ...state.order.isSavingQuantity,
                            id: action.index,
                            status: true,
                        },
                    }
                };
            }
            else{
                return {
                    ...state,
                    order : {
                        ...state.order,
                        isSaving : true,
                    }
                };
            }

        case types.EDIT_ORDER_ERROR:
            if(action.isQuantity) {
                return {
                    ...state,
                    order: {
                        ...state.order,
                        isSavingQuantity: {
                            ...state.order.isSavingQuantity,
                            id: action.index,
                            status: false,
                        },
                    }
                };
            }
            else{
                return {
                    ...state,
                    order : {
                        ...state.order,
                        isSaving : false,
                    }
                };
            }

        case types.EDIT_ORDER_SUCCESS:

            if (action.isQuantity) {

                return {
                    ...state,
                    order: {
                        ...state.order,
                        isSavingQuantity: {
                            ...state.order.isSavingQuantity,
                            id: action.index,
                            status: false,
                        },
                    }
                };
            }
            else{
                return {
                    ...state,
                    order : {
                        ...state.order,
                        isSaving : false,
                    }
                };
            }



        case  types.OPEN_RETURN_ORDER_IN_ORDER:


            if (state.order.order.return_orders.length === 0) {
                return_orders = state.order.order.good_orders;
            }
            else {
                return_orders = state.order.order.return_orders;
            }
            return {
                ...state,
                order: {
                    ...state.order,
                    isOpenReturnOrder: !action.isOpenReturnOrder,
                    order: {
                        ...state.order.order,
                        return_orders: return_orders,
                    }
                },
            };

        case types.CHANGE_WAREHOUSE_RETURN_ORDERS :
            return {
                ...state,
                order: {
                    ...state.order,
                    order: {
                        ...state.order.order,
                        warehouse: action.id,
                    }
                }
            };
        case types.RESET_RETURN_ORDERS:
            return_orders = state.order.order.good_orders;
            return {
                ...state,
                order: {
                    ...state.order,
                    order: {
                        ...state.order.order,
                        return_orders: return_orders,
                    }
                },
            };


        case types.BEGIN_LOAD_GOODS_IN_OVERLAY_IN_ORDER:
            return {
                ...state,
                order: {
                    ...state.order,
                    order: {
                        ...state.order.order,
                        isLoadingGoodOverlay: true,
                    }
                },
            };
        case  types.LOADED_GOODS_SUCCESS_IN_OVERLAY_IN_ORDER:
            goodsList = action.goods;
            state.order.order.good_orders && state.order.order.good_orders.map((good)=>{goodsList = assignGood(good.good_id,goodsList);});
            return {
                ...state,
                order: {
                    ...state.order,
                    order: {
                        ...state.order.order,
                        isLoadingGoodOverlay: false,
                        goodsList: goodsList,
                        totalGoodPages: action.total_pages,
                    }
                },

            };
        case types.LOADED_GOODS_ERROR_IN_OVERLAY_IN_ORDER:
            return {
                ...state,
                order: {
                    ...state.order,
                    order: {
                        ...state.order.order,
                        isLoadingGoodOverlay: false,
                    }
                },
            };

        case types.ASSIGN_GOOD_FORM_DATA_IN_ORDER:
            goodsList = assignGood(action.good.id, state.order.order.goodsList);
            good = addGoodInGoodsOrder(action.good);
            return {
                ...state,
                order: {
                    ...state.order,
                    order: {
                        ...state.order.order,
                        good_orders: [...state.order.order.good_orders, good],
                        goodsList: goodsList,
                    }
                }
            };




        case types.BEGIN_EDIT_RETURN_ORDER:
            if (action.isQuantity)
                return {
                    ...state,
                    order: {
                        ...state.order,
                        isSavingQuantityInReturnOrders: {
                            ...state.order.isSavingQuantityInReturnOrders,
                            id: action.index,
                            status: true,
                        },
                    }
                };
            else {
                return {
                    ...state,
                    order: {
                        ...state.order,
                            isSavingReturnOrders: true,
                    }
                };
            }

            case types.EDIT_RETURN_ORDER_SUCCESS:
                if (action.isQuantity)
                    return {
                        ...state,
                        order: {
                            ...state.order,
                            isSavingQuantityInReturnOrders: {
                                ...state.order.isSavingQuantityInReturnOrders,
                                id: action.index,
                                status: false,
                            },
                        }
                    };
                else {
                    return {
                        ...state,
                        order: {
                            ...state.order,
                            isSavingReturnOrders: false,
                        }
                    };
                }

        case types.EDIT_RETURN_ORDER_ERROR:
            if (action.isQuantity)
                return {
                    ...state,
                    order: {
                        ...state.order,
                        isSavingQuantityInReturnOrders: {
                            ...state.order.isSavingQuantityInReturnOrders,
                            id: action.index,
                            status: false,
                        },
                    }
                };
            else {
                return {
                    ...state,
                    order: {
                        ...state.order,
                        isSavingReturnOrders: false,
                    }
                };
            }


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

function addGoodInGoodsOrder(good) {
    return {"good_id": good.id, "price": good.price[1], "name": good.name, "code": good.code, "quantity": 1};
}