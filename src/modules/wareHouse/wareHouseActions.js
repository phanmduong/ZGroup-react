import * as types from '../../constants/actionTypes';
import * as wareHouseApis from './wareHouseApis';
import * as helper from '../../helpers/helper';

            //          LOAD
export function loadWareHouses( page , limit, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_WAREHOUSE
    });
        wareHouseApis.loadWareHouseApi(limit, page ,query)
            .then( (res) =>  {
                dispatch({
                   type : types.LOADED_WAREHOUSE_SUCCESS,
                    wareHousesList : res.data.warehouses,
                    total_pages : res.data.paginator.total_pages,
                });
            })
            .catch(() => {
            dispatch ({
                type : types.LOADED_WAREHOUSE_ERROR,
            });
            });
    };
}
export function loadBases() {
    return function (dispatch) {
        dispatch({
            type : types.BEGIN_LOAD_BASES_IN_WAREHOUSE,
        });
        wareHouseApis.loadBasesApi()
            .then((res) => {
                dispatch({
                    type : types.LOADED_BASES_IN_WAREHOUSE_SUCCESS,
                    bases : res.data.data.bases,
                });
            })
            .catch(()=>{
                dispatch({
                    type : types.LOADED_BASE_IN_WAREHOUSE_ERROR,
                });
            });
    };
}

                //          MODAL
export function openModal(wareHouse, isEdit) {
    return function (dispatch) {
      dispatch({
          type : types.OPEN_ADD_WAREHOUSE_MODAL,
          wareHouse : wareHouse,
          isEdit : isEdit,
      });
    };
}

export function closeModal() {
    return{
      type : types.CLOSE_ADD_WAREHOUSE_MODAL,
    };
}


export function handleNameLocationBase(wareHouse){
    return function (dispatch) {
        dispatch({
            type : types.HANDLE_WAREHOUSE_NAME_LOCATION_BASE,
            wareHouse : wareHouse,
        });
    };
}

export function addWareHouse(wareHouse ,currentPage ,limit, closeModal ,loadWareHouses ) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_ADD_WAREHOUSE});
        wareHouseApis.addWareHouseApi(wareHouse.name, wareHouse.location,wareHouse.base.id)
            .then((res) => {
                if (res.data.status) {
                    closeModal();
                    helper.showTypeNotification('Đã thêm ' + wareHouse.name, 'success');
                    dispatch({
                        type: types.ADD_WAREHOUSE_SUCCESS,
                        wareHouse: res.data.data.warehouse,
                    });
                    loadWareHouses(currentPage,limit);
                }
                else {
                    helper.sweetAlertError("Thiếu thông tin");
                    dispatch({
                        type: types.ADD_WAREHOUSE_ERROR
                    });
                }
            })
            .catch(() => {
                    helper.sweetAlertError('Thêm thất bại ');
                    dispatch({
                        type: types.ADD_WAREHOUSE_ERROR
                    });
                }
            );
    };
}


export function editWareHouse(wareHouse, closeModal ) {
    return function (dispatch) {
      dispatch({
          type : types.BEGIN_EDIT_WAREHOUSE
      });
      wareHouseApis.editWareHouseApi(wareHouse)
          .then((res) => {
              if (res.data.status) {
              closeModal();
              helper.showTypeNotification('Đã chỉnh sửa ' + wareHouse.name, 'success');
              dispatch({
                  type: types.EDIT_WARE_HOUSE_SUCCESS,
                  wareHouse: res.data.data.warehouse,
              });
          }
              else {
                  helper.sweetAlertError("Thiếu thông tin");
                  dispatch({
                      type: types.EDIT_WARE_HOUSE_ERROR
                  });
              }
          })
          .catch(()=>{
          dispatch({
              type : types.EDIT_WARE_HOUSE_ERROR,
          });
          });
    };
}

            //          LISTCHILD

export function deleteWareHouse(id,currentPage, limit,loadWareHouses) {
    return function (dispatch) {
        helper.showTypeNotification("Đang xóa ", "info");
        dispatch({
          type : types.BEGIN_DELETE_WAREHOUSE
      });
      wareHouseApis.deleteWareHouseApi(id)
          .then((res) => {
              if (res.data.status) {
                  helper.showTypeNotification(" Đã xóa ", "success");
              dispatch({
                  type: types.DELETE_WARE_HOUSE_SUCCESS,
                  id: id,
              });
                  loadWareHouses (currentPage , limit);
          }
              else {
                  helper.sweetAlertError(res.data.message);
                  dispatch({
                      type: types.DELETE_WARE_HOUSE_ERROR
                  });
              }
          })
          .catch(()=>{
          dispatch({
              type : types.DELETE_WARE_HOUSE_ERROR,
          });
          });
    };
}
