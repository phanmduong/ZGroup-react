import BasesContainer from "../modules/bases/BasesContainer";
import RoomsContainer from "../modules/rooms/RoomsContainer";
import CreateBaseContainer from "../modules/bases/CreateBaseContainer";

/**
 * Tab Cơ sở
 */
export default [
    {
        path: "/manage/bases",
        component: BasesContainer
    },
    {
        path: "/manage/rooms",
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
    }
];
