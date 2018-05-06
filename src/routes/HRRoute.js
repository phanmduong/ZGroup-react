import ManageStaffsContainer from "../modules/manageStaff/ManageStaffsContainer";
import AddStaffContainer from "../modules/manageStaff/AddStaffContainer";
import ManageRoleContainer from "../modules/role/ManageRoleContainer";
import CreateRoleContainer from "../modules/role/CreateRoleContainer";
import EditRoleContainer from "../modules/role/EditRoleContainer";
import ManageDepartmentContainer from "../modules/manageDepartment/ManageDepartmentContainer";
import AttendanceStaffsContainer from "../modules/attendanceStaffs/AttendanceStaffsContainer";
import JobAssignmentContainer from "../modules/jobAssignment/JobAssignmentContainer";
import CreateJobAssignmentContainer from "../modules/jobAssignment/CreateJobAssignmentContainer";
import InfoStaffContainer from "../modules/manageStaff/InfoStaffContainer";
import ProfileContainer from "../modules/profile/ProfileContainer";
import HistoryExtensionWorkContainer from "../modules/historyExtensionWork/HistoryExtensionWorkContainer";
import summaryStaffContainer from "../modules/summaryStaff/SummaryStaffContainer";
/**
 * Tab Nhân sự
 */
export default [
    {
        path: "/hr/manage/quan-li-nhan-su",
        // path: "/manage/quan-li-nhan-su",
        component: ManageStaffsContainer
    },
    {
        // path: "/add-staff",
        path: "/hr/add-staff",
        component: AddStaffContainer,
        type: "create"
    },
    {
        // path: "/staff/:staffId/edit",
        path: "/hr/staff/:staffId/edit",
        component: AddStaffContainer,
        type: "edit"
    },
    {
        // path: "/manage-role",
        path: "/hr/manage-role",
        component: ManageRoleContainer
    },
    {
        // path: "/staff/attendances",
        path: "/hr/staff/attendances",
        component: AttendanceStaffsContainer
    },
    {
        // path: "create-role",
        path: "/hr/create-role",
        component: CreateRoleContainer
    },
    {
        // path: "role/:roleId/edit",
        path: "/hr/role/:roleId/edit",
        component: EditRoleContainer
    },
    {
        // path: "manage-department",
        path: "/hr/manage-department",
        component: ManageDepartmentContainer
    },
    {
        // path: "manage-department",
        path: "/hr/job-assignment",
        component: JobAssignmentContainer
    },
    {
        // path: "manage-department",
        path: "/hr/job-assignment/create",
        component: CreateJobAssignmentContainer
    },
    {
        // path: "/staff/:staffId/edit",
        path: "/hr/staff/:staffId/info",
        component: InfoStaffContainer,
    },
    {
        // path: "/staff/:staffId/edit",
        path: "/hr/manage-profile",
        component: ProfileContainer,
    },
    {
        // path: "manage-department edit",
        path: "/hr/job-assignment/edit/:workId",
        component: CreateJobAssignmentContainer
    },
    {
        path: "/hr/job-assignment/history-extension",
        component: HistoryExtensionWorkContainer,
    },
    {
        path: "/hr/job-assignment/summary-staff",
        component: summaryStaffContainer,
    },
];
