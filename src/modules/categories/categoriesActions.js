import * as types from '../../constants/actionTypes';
import * as categoriesAPI from './categoriesAPI';


export function loadCategories() {
    return function (dispatch) {
      dispatch({type : types.BEGIN_LOAD_CATEGORIES_DATA});
        categoriesAPI.loadCategoriesDataAPI()
            .then( (res) => {
                dispatch({
                    type : types.LOADED_CATEGORIES_DATA_SUCCESS,
                    categoriesList : res.data.data[0].good_categories,
                }
            );
                console.log('ACTIONS',res.data);

            }

    )
            .catch(()=>{
          dispatch({type : types.LOADED_CATEGORIES_DATA_ERROR});
            });
    };
}


export function openAddCategoryModalContainer() {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_ADD_CATEGORY_MODAL_CONTAINER
        });
    };
}

export function closeAddCategoryModalContainer(){
    return function (dispatch){
      dispatch({
          type : types.CLOSE_ADD_CATEGORY_MODAL_CONTAINER
      });
    };
}