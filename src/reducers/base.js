import { combineReducers } from "redux";
import baseListReducer from "../modules/bases/baseListReducer";
import { LOG_OUT } from "../constants/actionTypes";
import roomsReducer from "../modules/rooms/roomsReducer";
import userpackReducer from "../modules/userpack/userpackReducer";
import seatReducer from "../modules/bases/seat/seatReducer";
import commonReducer from "./commonReducer";
import registerManageRoomReducer from "../modules/registerManageRoom/registerManageRoomReducer";
import registerManageReducer from "../modules/registerManage/registerManageReducer";
import chooseSeatReducer from "../modules/registerManage/chooseSeat/chooseSeatReducer";
import registerListManageReducer from "../modules/roomRegisterList_TrongDong/reducers/registerManageMeetingRoomReducer";
import registerManageMeetingRoomReducer from "../modules/registerManageMeetingRoom/reducers/registerManageMeetingRoomReducer";

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
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
