import {combineReducers} from "redux";
import baseListReducer from "../modules/bases/baseListReducer";
import {LOG_OUT} from "../constants/actionTypes";
import roomsReducer from "../modules/rooms/roomsReducer";
import userpackReducer from "../modules/userpack/userpackReducer";
import seatReducer from "../modules/bases/seat/seatReducer";
import commonReducer from "./commonReducer";
import registerManageRoomReducer from "../modules/registerManageRoom/registerManageRoomReducer";
import registerManageReducer from "../modules/registerManage/registerManageReducer";
import chooseSeatReducer from "../modules/registerManage/chooseSeat/chooseSeatReducer";
import registerListManageReducer from "../modules/roomRegisterList_TrongDong/reducers/registerListManageReducer";
import registerManageMeetingRoomReducer from "../modules/registerManageMeetingRoom/reducers/registerManageMeetingRoomReducer";
import seatTypeReducer from "../modules/ZgroupFilm/seatType/seatTypeReducer";
import codeReducer from "../modules/ZgroupFilm/code/codeReducer";


const appReducer = combineReducers({
    ...commonReducer,
    baseList: baseListReducer,
    rooms: roomsReducer,
    userpacks: userpackReducer,
    seat: seatReducer,
    registerManage: registerManageReducer,
    registerManageRoom: registerManageRoomReducer,
    registerManageMeetingRoom: registerManageMeetingRoomReducer,
    registerListManage: registerListManageReducer,
    chooseSeat: chooseSeatReducer,
    seatType: seatTypeReducer,
    code: codeReducer,
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
