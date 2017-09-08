export default {
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
        currentPage: 1,
        totalPages: 1,
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
                start_company: new Date().toISOString().slice(0, 10),
                avatar_url: ''
            },
            isChangingAvatar: false,
            isLoading: false,
            error: false,
            isLoadingStaff: false,
            errorStaff: false,
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
        roles: {
            roleListData: [],
            isLoading: false,
            error: false,
        }, bases: {
            basesData: [],
            isLoading: false,
            error: false,
        }
    },
    roles: {
        roleListData: [],
        tabs: {
            tabListData: [],
            isLoading: true,
            error: false,
            allTabs: [],
            isLoadingAllTabs: false,
            errorAllTabs: false,
        },
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
        projectDetail: {
            showModal: false,
            project: {},
            isSaving: false
        },
        manageLabel: {
            label: {},
            isSavingLabel: false
        },
        uploadAttachment: {
            files: []
        },
        addMember: {
            isLoading: false,
            members: [],
            search: ""
        },
        createTask: {
            isSavingTask: false,
            task: {}
        },
        createTaskList: {
            taskList: {},
            isSavingTaskList: false
        },
        cardDetail: {
            isSavingDeadline: false,
            isLoading: false,
            card: {},
            showModal: false,
            isSavingCard: false
        },
        createCard: {
            card: {},
            isSaving: false,
            showModal: false,
            board: {}
        },

        boardList: {
            projectId: 0,
            boards: [],
            isLoadingBoards: false
        },

        createBoard: {
            showModal: false,
            board: {},
            isSaving: false
        },

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
    },

    register: {
        registerList: {
            registers: [],
            isLoadingRegisters: false
        }
    },

    emailTemplates: {
        templates: [],
        isLoading: false,
        error: false,
        isUpdatingThumbnail: false,
        updateThumbnailError: false,
        isSaving: false,
        savingError: false,
        currentPage: 1,
        totalPages: 1,
        emailTemplate: {
            id: 0,
            name: '',
            content: '',
            thumbnailUrl: '',
            owner: {},
            isLoading: false,
            error: false
        }
    },

    emailForms: {
        forms: [],
        isLoading: false,
        error: false,
        currentPage: 1,
        totalPages: 1,
        isUpdatingLogo: false,
        updateLogoError: false,
        isUpdatingAvatar: false,
        updateAvatarError: false,
        isSaving: false,
        isPreSaving: false,
        emailForm: {
            id: 0,
            name: '',
            logoUrl: '',
            title: '',
            subtitle: '',
            template: {},
            content: '',
            footer: '',
            avatarUrl: '',
            linkButton: '',
            titleButton: '',
            isLoading: false,
            error: false
        },
        emailTemplates: {
            templates: [],
            isLoading: false,
            error: false,
            currentPage: 1,
            totalPages: 1
        }
    },

    blog: {
        post: {
            isUpdatingImage: false,
            updateImageError: false,
            imageUrl: '',
            title: '',
            description: '',
            tags: '',
            category: 0,
            content: '',
            isSaving: false,
            saveError: false,
            isPreSaving: false,
            preSaveError: false
        },
        categories: {
            categories: [],
            isLoading: false,
            error: false
        },
        category: {
            name: '',
            isCreating: false,
            error: false
        }
    },
    registerStudents: {
        registers: [],
        isLoading: false,
        error: false,
        currentPage: 1,
        totalPages: 1,
        gens: [],
        isLoadingGens: false,
        errorGens: false,
        historyCall: [],
        isLoadingHistoryCall: false,
        errorHistoryCall: false,
        isChangingStatus: false,
        errorChangeStatus: false,
        telecallId: 0,
        isChangingClass: false,
        errorChangeClass: false,
        isLoadingClasses: false,
        errorClasses: false,
        classes: []
    },

    profile: {
        isLoading: false,
        profile: {
            current_role: {},
            start_company: new Date().toISOString().slice(0, 10),
        },
        error: false,
        isChangingAvatar: false,
        isSaving: false,
        savingError: false
    },

    studySession: {
        isLoading: false,
        error: false,
        studySessions: [],
        studySession: {
            start_time: '',
            end_time: ''
        },
        isSaving: false,
        errorSave: false,
        isEditing: false,
        errorEdit: false
    },

    scheduleClass: {
        isLoading: false,
        error: false,
        scheduleClasses: [],
        scheduleClass: {
            studySessionIds: []
        },
        isSaving: false,
        errorSave: false,
        isEditing: false,
        errorEdit: false,
        isLoadingStudySession: false,
        errorStudySession: false,
        studySessions: []
    },

    gens: {
        gens: [],
        isLoading: false,
        error: false,
        gen: {},
        isSaving: false,
        errorSave: false,
        isEditing: false,
        errorEdit: false,
        currentPage: 1,
        totalPages: 1
    },

    personalCalendar: {
        calendarEvents: [],
        isLoading: false
    },

    notification: {
        notificationList: {
            notifications: [],
            isLoading: false,
            isEmpty: false,
            unread: 0
        }
    },
    infoStudent: {
        student: {},
        isLoadingStudent: false,
        errorStudent: false,
        registers: [],
        isLoadingRegisters: false,
        errorRegisters: false,
        historyCalls: [],
        isLoadingHistoryCalls: false,
        errorHistoryCalls: false,
        progress: [],
        isLoadingProgress: false,
        errorProgress: false,
        isEditingStudent: false,
        errorEditing: false,
    },

    dashboard: {
        gens: [],
        isLoadingGens: false,
        errorGens: false,
        currentGen: {},
        bases: [],
        isLoadingBases: false,
        errorBases: false,
        dashboard: {},
        isLoading: true,
        error: false,
    },

    collectMoney: {
        currentPage: 1,
        totalPages: 1,
        nextCode: '',
        nextWaitingCode: '',
        users: [],
        isLoading: false,
        error: false
    },
    historyCollectMoney: {
        currentPage: 1,
        totalPages: 1,
        registers: [],
        isLoading: false,
        error: false
    },
    historyCalls: {
        currentPage: 1,
        totalPages: 1,
        teleCalls: [],
        isLoading: false,
        error: false
    },
    classes: {
        currentPage: 1,
        totalPages: 1,
        classes: [],
        isLoading: false,
        error: false
    }
};
