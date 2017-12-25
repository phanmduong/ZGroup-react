/**
 * Tab Công việc
 */


import WorkShiftSessionsContainer from "../modules/workShiftSessions/WorkShiftSessionsContainer";
import WorkShiftRegistersContainer from "../modules/workShiftRegisters/WorkShiftRegistersContainer";

export default [
    {
        path: "/work-shift/shift-registers",
        component: WorkShiftRegistersContainer
    },
    {
        path: "/work-shift/work-shift-session",
        component: WorkShiftSessionsContainer
    },
];
