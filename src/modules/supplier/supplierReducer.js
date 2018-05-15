import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let suppliersList;
export default function supplierReducer(state = initialState.suppliers, action) {
    switch (action.type) {



        //             LOAD

        case types.BEGIN_LOAD_SUPPLIER :
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_SUPPLIER_SUCCESS:
            return {
                ...state,
                ...{
                    suppliersList: action.suppliersList,
                    totalPages: action.total_pages,
                    totalCount: action.total_count,
                    isLoading: false,
                }
            };

        case types.LOADED_SUPPLIER_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };


        //          ADD
        case types.UPDATE_ADD_SUPPLIER_FORM_DATA:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    supplier: action.supplier,
                }
            };
        case types.ADD_SUPPLIER_SUCCESS :
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: false,
                    },
                },
                suppliersList: [action.supplier, ...state.suppliersList],
            };
        case types.ADD_SUPPLIER_ERROR :
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: false,
                    },
                }
            };
        case types.BEGIN_ADD_SUPPLIER :
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: true,
                    },
                }
            };
        case types.DELETE_SUPPLIER_SUCCESS:

            suppliersList = deleteSupplierReducer(action.id , state.suppliersList);
            return {
                ...state,
                suppliersList : suppliersList,
            };

        case types.BEGIN_EDIT_SUPPLIER:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: true,
                    }
                }
            };
        case types.EDIT_SUPPLIER_ERROR:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: false,
                    }
                }
            };
        case types.EDIT_SUPPLIER_SUCCESS:
            suppliersList = changeSupplier(action.supplier, state.suppliersList);
            return {
                ...state,
                suppliersList: suppliersList,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: false,
                    }
                }
            };

        default :
            return state;
    }
}

function deleteSupplierReducer(id, suppliersList) {
    if (suppliersList){
        suppliersList = suppliersList.filter((supplier) => supplier.id !== id);
    }
    return suppliersList;
}

function changeSupplier(actionSupplier, suppliersList) {
    if (suppliersList) {
        suppliersList = suppliersList.map(function (supplier) {
            if (supplier.id === actionSupplier.id) {
                return {
                    ...actionSupplier
                };
            }
            else return supplier;
        });
    }
    return suppliersList;
}