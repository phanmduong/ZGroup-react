import BasesContainer from "../modules/bases/BasesContainer";
import RoomsContainer from "../modules/rooms/RoomsContainer";
import CreateBaseContainer from "../modules/bases/CreateBaseContainer";
import UserpackContainer from "../modules/userpack/UserpackContainer";
import RoomDetailContainer from "../modules/bases/room/RoomDetailContainer";
import RegisterManageContainer from "../modules/registerManage/RegisterManageContainer";

/**
 * Tab Cơ sở
 */
export default [
    {
        // path: "/manage/bases",
        path: "/base/bases",
        component: BasesContainer
    },
    {
        // path: "/manage/rooms",
        path: "/base/rooms",
        component: RoomsContainer
    },
    {
        path: "base/create",
        component: CreateBaseContainer,
        type: "create"
    },
    {
        path: "/base/:baseId/edit",
        component: CreateBaseContainer,
        type: "edit"
    },
    {
        path: "/base/member-package",
        component: UserpackContainer,
    },
    {
        path: "/base/room/:roomId",
        component: RoomDetailContainer
    },
    {
        path: "base/registers",
        component: RegisterManageContainer
    }

];
