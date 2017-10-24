import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function categoriesReducer(state = initialState.categories, action) {

    switch (action.type){
        case types.LOADED_ADD_CATEGORY_SUCCESS :
            return{
                ...state,
                ...{
                    categoriesList: [...state.categoriesList, ...action.category],
                    addCategoriesModal: {
                        isSaving: false,
                    },
                    isLoading: false,
                }
            };
        case types.LOADED_ADD_CATEGORY_ERROR :
            return {
                ...state,
                ...{addCategoriesModal:{
                    isSaving : false,
                }}
            };
        case types.BEGIN_ADD_CATEGORY :
            return{
                ...state,
                addCategoriesModal : {
                    isSaving : true,
                },
                isLoading : true,
            };

        case types.OPEN_ADD_CATEGORY_MODAL_CONTAINER:
            return{
                ...state,
                ...{addCategoriesModal :
                    {
                    isShowModal: true,
                }}
            };
        case types.CLOSE_ADD_CATEGORY_MODAL_CONTAINER:
            return{
                ...state,
                ...{addCategoriesModal :
                    {
                    isShowModal:false,
                }}
            };
        case types.BEGIN_LOAD_CATEGORIES_DATA:
            return{
                ...state,
                ...{
                    isLoading : true,
                    error : false,
                }
            };
        case types.LOADED_CATEGORIES_DATA_SUCCESS:
            return{
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    categoriesList : action.categoriesList,
                }
            };
        case types.LOADED_CATEGORIES_DATA_ERROR:
            return{
                ...state,
                ...{
                    isLoading : false,
                    error : true,
                }
            };
        default :
            return state;
    }

}


