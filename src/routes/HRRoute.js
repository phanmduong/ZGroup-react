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
        path: "/manage/quan-li-nhan-su",
        component: ManageStaffsContainer
    },
    {
        path: "/add-staff",
        component: AddStaffContainer,
        type: "create"
    },
    {
        path: "/staff/:staffId/edit",
        component: AddStaffContainer,
        type: "edit"
    },
    {
        path: "/manage-role",
        component: ManageRoleContainer
    },
    {
        path: "/staff/attendances",
        component: AttendanceStaffsContainer
    },
    {
        path: "create-role",
        component: CreateRoleContainer
    },
    {
        path: "role/:roleId/edit",
        component: EditRoleContainer
    },
    {
        path: "manage-department",
        component: ManageDepartmentContainer
    }
];
