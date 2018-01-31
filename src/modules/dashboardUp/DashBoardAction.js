import * as types from '../../constants/actionTypes';
import * as DashBoardUpApi from './DashBoardUpApi';

export function loadBases(){
    return function (dispatch){
        dispatch({
            type: types.BEGIN_LOAD_BASES_DASHBOARDUP,
        });
        DashBoardUpApi.loadBases()
            .then((res) => {
                dispatch({
                    type: types.LOAD_BASES_DASHBOARDUP_SUCCESS,
                    bases: res.data.data.bases,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_BASES_DASHBOARDUP_ERROR,
            });
        });
    };
}

export function loadDashBoard(genId, baseId, startTime, endTime){
    return function (dispatch){
      dispatch({
           type: types.BEGIN_LOAD_DASHBOARDUP,
      });
      DashBoardUpApi.loadDashBoard(genId, baseId, startTime, endTime)
          .then((res) => {
               dispatch({
                    type: types.LOAD_DASHBOARDUP_SUCCESS,
                    dashboard: res.data.data,
               }) ;
          }).catch(() => {
            dispatch({
               type: types.LOAD_DASHBOARDUP_ERROR,
            });
      });
    };
}