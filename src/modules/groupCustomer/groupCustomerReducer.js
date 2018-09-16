import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let customersList, groupCustomersList, customersShowInTable,customersShowInAddModal, stringId = [] , coupons ;
export default function customerReducer(state = initialState.groupCustomers, action) {
    switch (action.type){



        //             LOAD CUSTOMERS IN OVERLAY

        case types.BEGIN_LOAD_CUSTOMER_IN_GROUP_CUSTOMER :
            return {
                ...state,
                ...{
                    isLoadingOverlay: true,
                }
            };
        case types.LOADED_CUSTOMER_SUCCESS_IN_GROUP_CUSTOMER:
            return {
                ...state,
                ...{
                    customersList: action.customersList,
                    totalCustomerInOverlayPages: action.total_pages,
                    totalCustomerCount: action.total_count,
                    isLoadingOverlay: false,
                }
            };
        case types.LOADED_CUSTOMER_ERROR_IN_GROUP_CUSTOMER:
            return {
                ...state,
                isLoadingOverlay: false,

            };


        //             LOAD CUSTOMERS IN MODAL

        case types.BEGIN_LOAD_CUSTOMER_IN_MODAL_IN_GROUP_CUSTOMER :
            return {
                ...state,
                ...{
                    isLoadingCustomer: true,
                }
            };
        case types.LOADED_CUSTOMER_IN_MODAL_SUCCESS_IN_GROUP_CUSTOMER:
            stringId = addStringIdInModal(action.groupCustomerForm.customers);
            return {
                ...state,
                totalCustomerPages: action.total_pages,
                isLoadingCustomer: false,
                groupCustomerForm: {
                    ...state.groupCustomerForm,
                    customersShowInTable: action.groupCustomerForm.customers,
                    name: action.groupCustomerForm.name,
                    description: action.groupCustomerForm.description,
                    color: action.groupCustomerForm.color,
                    id: action.groupCustomerForm.id,
                    stringId: stringId,
                    customersShowInAddModal: [],
                    delivery_value: action.groupCustomerForm.delivery_value,
                    order_value: action.groupCustomerForm.order_value,
                    currency_value : action.groupCustomerForm.currency_value,
                },
            };
        case types.LOADED_CUSTOMER_IN_MODAL_ERROR_IN_GROUP_CUSTOMER:
            return {
                ...state,
                isLoadingCustomer: false,

            };

        //             LOAD COUPONS IN MODAL

        case types.BEGIN_LOAD_COUPON_IN_MODAL_IN_GROUP_CUSTOMER :
            return {
                ...state,
                ...{
                    isLoadingCoupon: true,
                }
            };
        case types.LOADED_COUPON_IN_MODAL_SUCCESS_IN_GROUP_CUSTOMER:
            return {
                ...state,
                isLoadingCoupon: false,
                groupCustomerForm: {
                    ...state.groupCustomerForm,
                    coupons: action.coupons,
                },
            };
        case types.LOADED_COUPON_IN_MODAL_ERROR_IN_GROUP_CUSTOMER:
            return {
                ...state,
                isLoadingCoupon: false,
            };


        //           ADD
        case types.ADD_GROUP_CUSTOMER_SUCCESS :
            return {
                ...state,
                isSaving: false,
            };
        case types.ADD_GROUP_CUSTOMER_ERROR :
            return {
                ...state,
                isSaving: false,
            };


        case types.BEGIN_ADD_GROUP_CUSTOMER :
            return {
                ...state,
                isSaving: true,
            };

        //           ADD COUPON
        case types.ADD_COUPON_SUCCESS :
            return {
                ...state,
                isSavingCoupon: false,
            };
        case types.ADD_COUPON_ERROR :
            return {
                ...state,
                isSavingCoupon: false,
            };
        case types.BEGIN_ADD_COUPON :
            return {
                ...state,
                isSavingCoupon: true,
            };




        //     EDIT
        case types.BEGIN_EDIT_GROUP_CUSTOMER:
            return {
                ...state,
                isSaving: true,
            };
        case types.EDIT_GROUP_CUSTOMER_ERROR:
            return {
                ...state,
                isSaving: false,
            };
        case types.EDIT_GROUP_CUSTOMER_SUCCESS:
            return {
                ...state,
                isSaving: false,
            };
        case types.DELETE_DISCOUNT_SUCCESS_IN_GROUP_CUSTOMER:
            coupons = deleteCoupon(action.id, state.groupCustomerForm.coupons);
            return{
                ...state,
                groupCustomerForm:{
                    ...state.groupCustomerForm,
                    coupons : coupons,
                }
            };




        //     ADD_CUSTOMER
        case types.BEGIN_ADD_CUSTOMER_IN_GROUP_CUSTOMER:
            return {
                ...state,
                isSavingCustomer: true,
            };
        case types.ADD_CUSTOMER_SUCCESS_IN_GROUP_CUSTOMER:
            return {
                ...state,
                isSavingCustomer: false,
            };
        case types.ADD_CUSTOMER_ERROR_IN_GROUP_CUSTOMER:
            return {
                ...state,
                isSavingCustomer: false,
            };

        //          DELETE
        case types.DELETE_GROUP_CUSTOMER_SUCCESS:

            groupCustomersList = deleteGroup(action.id, state.groupCustomersList);
            return {
                ...state,
                groupCustomersList: groupCustomersList,
            };





        //      LOAD GROUP CUSTOMER

        case types.BEGIN_LOAD_GROUP_CUSTOMER :
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_GROUP_CUSTOMER_SUCCESS:
            groupCustomersList = addStringId(action.groupCustomersList);
            return {
                ...state,
                ...{
                    groupCustomersList: groupCustomersList,
                    totalGroupCustomerPages: action.total_pages,
                    isLoading: false,
                }
            };
        case types.LOADED_GROUP_CUSTOMER_ERROR:
            return {
                ...state,
                isLoading: false,

            };

        //          update form

        case types.UPDATE_GROUP_CUSTOMER_FORM_DATA:
            return {
                ...state,
                groupCustomerForm: action.groupCustomerForm,

            };


        //          đánh dấu đã thêm vào để loại bỏ trong overlay

        case types.ASSIGN_GROUP_CUSTOMER_FORM_DATA:
            customersList = changeCustomer(action.id, state.customersList);
            return {
                ...state,
                customersList: customersList,
            };
        //           đánh dấu đã xóa để thêm vào overlay

        case types.REMOVE_GROUP_CUSTOMER_FORM_DATA:  // xóa customer trong customers đồng thời thêm vào customersList
            customersShowInTable = changeCustomer(action.customer.id, state.groupCustomerForm.customersShowInTable);
            customersShowInAddModal = changeCustomer(action.customer.id, state.groupCustomerForm.customersShowInAddModal);
            return {
                ...state,
                customersList: [action.customer, ...state.customersList],// Phải có state. ở trước
                groupCustomerForm: {
                    ...state.groupCustomerForm,
                    customersShowInAddModal: customersShowInAddModal,
                    customersShowInTable: customersShowInTable,
                    stringId: state.groupCustomerForm.stringId.filter((id) => id !== action.customer.id),
                },
            };
        case types.UPDATE_DISCOUNT_FORM_DATA_IN_GROUP_CUSTOMER :
            return {
                ...state,
                coupon: action.coupon,
            };

        case types.GENERATE_RANDOM_CODE_IN_GROUP_CUSTOMER :
            return {
                ...state,
                coupon: {
                    ...state.coupon,
                    name: action.randomCode,
                },
            };

        default :
            return state;
    }
}


// SUPPORT


function changeCustomer(id, customersList) {
    if (customersList) {
        customersList = customersList.filter((customer) => customer.id !== id);
    }
    return customersList;
}

function addStringId(groupCustomersList) {
    groupCustomersList = groupCustomersList.map(function (groupCustomer) {
        stringId = [];
        stringId = groupCustomer.customers.map((customer) => {
            return customer.id;
        });
        return {...groupCustomer, stringId: stringId};
    });
    return groupCustomersList;
}

function addStringIdInModal(customers) {
    stringId = [];
    stringId = customers.map((customer) => {
        return customer.id;
    });
    return stringId;
}


function deleteGroup(id, groupCustomersList) {
    if (groupCustomersList) {
        groupCustomersList = groupCustomersList.filter((groupCustomer) => groupCustomer.id !== id);
    }
    return groupCustomersList;
}
function deleteCoupon(id, coupons) {
    if (coupons) {
        coupons = coupons.map((coupon) => {
            if (coupon.id === id) {
                return  {...coupon,activate : 0};
            } else return coupon;
        });
    }
    return coupons;
}