import ShiftRegistersContainer from "../modules/shiftRegisters/ShiftRegistersContainer";
import HistoryShiftRegistersContainer from "../modules/historyShiftRegisters/HistoryShiftRegistersContainer";
import ShiftSessionsContainer from "../modules/shiftSessions/ShiftSessionsContainer";

/**
 * Tab Nhân sự
 */
export default [
    {
        path: "/shift/manage/regis-shifts",
        component: ShiftRegistersContainer
    },
    {
        path: "/shift/register-shifts/history",
        component: HistoryShiftRegistersContainer
    },
    {
        path: "/shift/manage/shift",
        component: ShiftSessionsContainer
    }
];
