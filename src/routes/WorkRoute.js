import CalendarContainer from "../modules/tasks/calendar/CalendarContainer";
import ProjectListContainer from "../modules/tasks/project/ProjectListContainer";
import ArchiveProjectListContainer from "../modules/tasks/project/ArchiveProjectListContainer";
import CreateProjectContainer from "../modules/tasks/project/CreateProjectContainer";
import BoardListContainer from "../modules/tasks/board/BoardListContainer";

/**
 * Tab Công việc
 */
export default [
    {
        path: "/project/archive",
        component: ArchiveProjectListContainer
    },
    {
        path: "/project/create",
        component: CreateProjectContainer,
        type: "create"
    },
    {
        path: "/project/:projectId/edit",
        component: CreateProjectContainer,
        type: "edit"
    },
    {
        path: "/project/:projectId/boards",
        component: BoardListContainer
    },
    {
        path: "/project/calendar",
        component: CalendarContainer
    }, {
        path: "/project/list",
        component: ProjectListContainer
    }
];
