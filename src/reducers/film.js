import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import filmReducer from "../modules/ZgroupFilm/filmReducer";
import bookingHistoryReducer from "../modules/ZgroupFilm/bookingHistory/bookingHistoryReducer";
import seatTypeReducer from "../modules/ZgroupFilm/seatType/seatTypeReducer";
import roomsReducer from "../modules/rooms/roomsReducer";
import loginReducer from '../modules/login/loginReducer';


const appReducer = combineReducers({
    ...commonReducer,
    film: filmReducer,
    rooms: roomsReducer,
    bookingHistory: bookingHistoryReducer,
    seatType: seatTypeReducer,
    login: loginReducer

});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
