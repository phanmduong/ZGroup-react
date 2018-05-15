import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let wareHousesList;
export default function wareHouseReducer(state = initialState.wareHouses, action) {
    switch (action.type) {



        //             LOAD

        case types.BEGIN_LOAD_WAREHOUSE :
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_WAREHOUSE_SUCCESS:
            return {
                ...state,
                ...{
                    wareHousesList: action.wareHousesList,
                    totalPages: action.total_pages,
                    isLoading: false,
                }
            };
        case types.LOADED_WAREHOUSE_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };

        case types.BEGIN_LOAD_BASES_IN_WAREHOUSE:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_BASES_IN_WAREHOUSE_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    bases: action.bases,
                }
            };
        case types.LOADED_BASE_IN_WAREHOUSE_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };

        //             MODAL

        case types.OPEN_ADD_WAREHOUSE_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isShowModal: true,
                        wareHouse: action.wareHouse,
                        isEdit: action.isEdit,
                    }
                }
            };
        case types.CLOSE_ADD_WAREHOUSE_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isShowModal: false,
                    }
                },
            };


        //                 HANDLE
        case types.HANDLE_WAREHOUSE_NAME_LOCATION_BASE:
            return {
                ...state,
                modal : {
                    ...state.modal,
                    wareHouse: action.wareHouse
                }
            };

        //             ADD
        case types.ADD_WAREHOUSE_SUCCESS :
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: false,
                    },
                },
                wareHousesList: [action.wareHouse, ...state.wareHousesList],
            };
        case types.ADD_WAREHOUSE_ERROR :
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: false,
                    },
                }
            };
        case types.BEGIN_ADD_WAREHOUSE :
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: true,
                    },
                }
            };
        //          EDIT

        case types.BEGIN_EDIT_WAREHOUSE:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: true,
                    }
                }
            };
        case types.EDIT_WARE_HOUSE_ERROR:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: false,
                    }
                }
            };
        case types.EDIT_WARE_HOUSE_SUCCESS:
            wareHousesList = changeWareHouse(action.wareHouse, state.wareHousesList);
            return {
                ...state,
                wareHousesList: wareHousesList,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: false,
                    }
                }
            };

            //          DELETE

        case types.BEGIN_DELETE_WAREHOUSE :
            return{
                ...state,
                isLoading : true,
                modal : {
                    ...state.modal,
                    ...{isSaving : true,}
                },
            };
        case types.DELETE_WARE_HOUSE_SUCCESS:
            wareHousesList = deleteWareHouse(action.id, state.wareHousesList);
            return{
                ...state,
                isLoading : false,
                wareHousesList : wareHousesList,
                modal :{
                    ...state.modal,
                    ...{isSaving : false,}
                }
            };
        case types.DELETE_CATEGORY_ERROR:
            return{
                ...state,
                isLoading : false,
                modal : {
                    ...state.modal,
                    ...{isSaving : false,}
                }
            };

        default :
            return state;
    }
}

            //          SUPPORT
function changeWareHouse(actionWareHouse, wareHousesList) {
    if (wareHousesList) {
        wareHousesList = wareHousesList.map(function (wareHouse) {
            if (wareHouse.id === actionWareHouse.id) {
                return {
                    ...actionWareHouse
                };
            }
            else return wareHouse;
        });
    }
    return wareHousesList;
}

function deleteWareHouse(id, wareHouseList) {
    if (wareHouseList) {
        wareHouseList = wareHouseList.filter((wareHouse) => wareHouse.id !== id);
    }
    return wareHouseList;
}

