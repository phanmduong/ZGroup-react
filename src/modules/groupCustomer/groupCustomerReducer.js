import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let customersList, customers, groupCustomersList, stringId = [];
export default function customerReducer(state = initialState.groupCustomers, action) {
    switch (action.type) {



        //             LOAD CUSTOMERS

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
                    totalCustomerPages: action.total_pages,
                    totalCustomerCount: action.total_count,
                    isLoadingOverlay: false,
                }
            };
        case types.LOADED_CUSTOMER_ERROR_IN_GROUP_CUSTOMER:
            return {
                ...state,
                isLoadingOverlay: false,

            };


        //           ADD
        case types.ADD_GROUP_CUSTOMER_SUCCESS :
            return {
                ...state,
                isSaving: false,
                groupCustomersList: [action.groupCustomer, ...state.groupCustomersList]
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


                        //     EDIT
        case types.BEGIN_EDIT_SUPPLIER:
            return {
                ...state,
                isSaving: true,
            };
        case types.EDIT_SUPPLIER_ERROR:
            return {
                ...state,
                isSaving: false,
            };
        case types.EDIT_SUPPLIER_SUCCESS:
            groupCustomersList = changeGroupCustomer(action.groupCustomer, state.groupCustomersList);
            return {
                ...state,
                isSaving: false,
                groupCustomersList : groupCustomersList,
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
            customers = changeCustomer(action.customer.id, state.groupCustomerForm.customers);
            return {
                ...state,
                customersList: [action.customer, ...state.customersList],// Phải có state. ở trước
                groupCustomerForm: {
                    ...state.groupCustomerForm,
                    customers: customers,
                    stringId: state.groupCustomerForm.stringId.filter((id) => id !== action.customer.id),
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
        // stringId = groupCustomer.customers.reduce(function(stringId , customer){return [customer.id,...stringId];});
        // groupCustomer.stringId = [5552,5553];
        // stringId = [];
        // for (let i =0; i < groupCustomer.customers.length; i++){
        //     stringId = [customers[i].id, ...stringId] ;
        // }
        stringId = [];
        stringId =  groupCustomer.customers.map((customer) => {
            // return [...stringId , customer.id]; // tai sao khong dung duoc
            return customer.id;
        });
        return {...groupCustomer, stringId: stringId};
    });
    return groupCustomersList;
}

function changeGroupCustomer(newItem, list) {
    if (list) {
        list = list.map(function (oldItem) {
            if (oldItem.id === newItem.id) {
                return {
                    ...newItem
                };
            }
            else return oldItem;
        });
    }
    return list;
}