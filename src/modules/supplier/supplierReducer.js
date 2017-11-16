import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

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

        default :
            return state;
    }
}
