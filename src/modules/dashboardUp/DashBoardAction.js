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

export function loadRooms(baseId){
    return function (dispatch){
        dispatch({
           type: types.BEGIN_LOAD_ROOMS_BASE_DASHBOARDUP,
        });
        DashBoardUpApi.loadRoomBase(baseId)
            .then((res) => {
                //console.log(res.data.data.rooms);
                dispatch({
                    type: types.LOAD_ROOMS_BASE_DASHBOARDUP_SUCCESS,
                    data: res.data.data.rooms,
                    count: res.data.data.rooms_count,
                });
            }).catch(() => {
              dispatch({
                 type: types.LOAD_ROOMS_BASE_DASHBOARDUP_ERROR,
              });
        });
    };
}
export function loadSeats(from,to,roomId){
    return function (dispatch){
      dispatch({
            type: types.BEGIN_LOAD_SEATS_BASE_DASHBOARDUP,
      });
      DashBoardUpApi.loadSeats(from,to,roomId)
          .then((res) => {
                dispatch({
                    type: types.LOAD_SEATS_BASE_DASHBOARDUP_SUCCESS,
                    seats: [
                      ...res.data.data.seats,
                      ...res.data.data.booked_seats.map((seat) => {
                        return {
                          ...seat,
                          booked: true
                        };
                      })
                    ],
                    seats_count: res.data.data.seats_count,
                    available_seats: res.data.data.available_seats,
                });
          }).catch(() => {
               dispatch({
                   type: types.LOAD_SEATS_BASE_DASHBOARDUP_ERROR,
               });
      });
    };
}

