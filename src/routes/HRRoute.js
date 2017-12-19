import ManageStaffsContainer from "../modules/manageStaff/ManageStaffsContainer";
import AddStaffContainer from "../modules/manageStaff/AddStaffContainer";
import ManageRoleContainer from "../modules/role/ManageRoleContainer";
import CreateRoleContainer from "../modules/role/CreateRoleContainer";
import EditRoleContainer from "../modules/role/EditRoleContainer";
import ManageDepartmentContainer from "../modules/manageDepartment/ManageDepartmentContainer";
import AttendanceStaffsContainer from "../modules/attendanceStaffs/AttendanceStaffsContainer";

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
    }
];
