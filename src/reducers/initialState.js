export default {
    dashboard: {
        registers_count: 0,
        total_money: "0",
        registers_number: 0,
        paid_number: 0,
        uncalled_number: 0,
        zero_paid_num: 0,
        total_classes: 0,
        isLoading: false,
        remain_days: 0,
        date_array: [],
        money_by_date: [],
        classes: [],
        registers_by_date: [],
        paid_by_date: [],
        registers_by_hour: [],
        orders_by_hour: [],
        month_ago: []

    },
    login: {
        email: "",
        password: "",
        token: null,
        isLoading: false,
        error: false,
        user: {
            role: -1
        }
    },
    user: {},
    registerList: {
        registers: [],
        isLoading: false
    },
    genList: {
        gens: [],
        isLoading: true
    },

    searchRegisters: {
        isLoading: false,
        data: {
            next_code: "",
            next_waiting_code: "",
            users: []
        },
        status: 0
    },
    tabs: {
        tabListData: [],
        isLoading: true,
        error: false,
        allTabs: [],
        isLoadingAllTabs: false,
        errorAllTabs: false,
    },
    staffs: {
        staffListData: [],
        isLoading: false,
        error: false,
        addStaff: {
            staffForm: {
                name: '',
                username: '',
                email: '',
                phone: '',
                age: 0,
                address: '',
                homeland: '',
                marital: 0,
                literacy: 0,
                role: 0,
                start_company: new Date().toISOString().slice(0, 10)
            },
            isLoading: false,
            error: false
        },
        editStaff: {
            isLoadingStaff: false,
            errorStaff: false,
            isLoadingUpdateStaff: false,
            errorUpdateStaff: false,
            isLoadingDeleteStaff: false,
            errorDeleteStaff: false,
            staff: {}
        },
        messageChangeRoleStaff: null,
        isLoadingChangeRoleStaff: false,
        errorChangeRoleStaff: false,
        messageChangeBaseStaff: null,
        isLoadingChangeBaseStaff: false,
        errorChangeBaseStaff: false,
    },
    roles: {
        roleListData: [],
        isLoading: false,
        error: false,
        createRole: {
            isLoading: false,
            error: false,
        },
        editRole: {
            isLoadingRole: false,
            errorRole: false,
            isLoadingUpdateRole: false,
            errorUpdateRole: false,
        },
        roleForm: {
            role_title: ''
        },
        isLoadingDeleteRole: false,
        errorDeleteRole: false
    },
    base: {
        baseData: [],
        isLoading: false,
        error: false,
        selectedBaseId: -1
    },

    baseList: {
        bases: [],
        isLoadingBases: false,
        currentPage: 1,
        totalPages: 1,
        createBase: {
            isSavingBase: false,
            isLoadingBase: false,
            base: {
                name: "",
                address: ""
            }
        }
    },

    task: {
        createProject: {
            project: {},
            isLoadingProject: false,
            isSavingProject: false
        },
        project: {
            projects: [],
            currentPage: 1,
            totalPages: 1,
            isLoadingProjects: false,
            isSaving: false
        }
    }


};
