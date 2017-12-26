/**
 * Tab Công việc
 */


import WorkShiftSessionsContainer from "../modules/workShiftSessions/WorkShiftSessionsContainer";
import WorkShiftRegistersContainer from "../modules/workShiftRegisters/WorkShiftRegistersContainer";
import HistoryWorkShiftRegistersContainer from "../modules/historyWorkShiftRegisters/HistoryWorkShiftRegistersContainer";

export default [
    {
        path: "/work-shift/shift-registers",
        component: WorkShiftRegistersContainer
    },
    {
        path: "/work-shift/work-shift-session",
        component: WorkShiftSessionsContainer
    },
    {
        path: "/work-shift/shift-registers/history",
        component: HistoryWorkShiftRegistersContainer
    },
];
