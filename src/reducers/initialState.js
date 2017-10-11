export default {
    good: {
        goodList: {
            goods: [],
            currentPage: 1,
            totalPages: 1,
            isLoading: false
        },
        createGood: {
            isLoading: false,
            good: {
                properties: [],
                files: []
            },
            percent: 0,
            percentCover: 0,
            isUploadingAvatar: false,
            isSaving: false,
            isUploadingCover: false,
            files: []
        }
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

    book: {
        taskSpan: {
            showModal: false,
            hours: 0,
            task: {
                span: 0
            },
            isSaving: false
        },
        taskListDetail: {
            showModal: false,
            taskList: {},
            isSaving: false,
            isLoading: false
        },
        taskLists: {
            taskLists: [],
            isLoading: false,
            currentPage: 0,
            totalPages: 0
        },
        addTaskList: {
            showModal: false,
            isSaving: false,
            taskList: {}
        }
    },

    task: {
        taskDeadline: {
            showModal: false,
            isSaving: false,
            task: {}
        },
        addMemberToTask: {
            showModal: false,
            isLoading: false,
            members: [],
            task: {},
            isSaving: false,
            selectedMember: null
        },
        commentCard: {
            value: "",
            attachments: []
        },
        archiveCard: {
            cards: [],
            isLoading: false,
            isEmpty: false,
            showModal: false
        },
        comment: {
            comments: []
        },
        projectDetail: {
            showModal: false,
            project: {},
            projectId: 0,
            isSaving: false,
            isLoading: false
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
            isLoading: false,
            taskLists: [],
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
            members: [],
            boards: [],
            isLoadingBoards: false,
            canDragCard: false,
            canDragBoard: false
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
        isSendingMail: false,
        errorSendMail: false,
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
        },
        subscribersList: [],
        isStoring: false,
        errorStore: false,
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
        classes: [],
        isLoadingRegistersByStudent: false,
        errorRegistersByStudent: false,
        registersByStudent: []
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
        class: {},
        isLoadingClass: false,
        errorClass: false,
        timeShifts: 0,
        dateShifts: '',
        timeClasses: 0,
        dateClasses: '',
        isLoadingAttendanceShifts: false,
        errorAttendanceShifts: false,
        isLoadingAttendanceClasses: false,
        errorAttendanceClasses: false,
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
        error: false,
        isLoadingInfoCreateClass: true,
        errorInfoCreateClass: false,
        infoCreateClass: {},
        isStoringClass: false,
        errorStoreClass: false,
        class: {},
        isLoadingClass: false,
        errorClass: false,
        isChangingClassLesson: false,
        errorChangeClassLesson: false,
        isLoadingStaffs: false,
        errorStaff: false,
        staffs: [],
        isChangingTeachingAssis: false,
        errorChangeTeachingAssis: false,
        isChangingTeacher: false,
        errorChangeTeacher: false,
    },

    rule: {
        ruleView: '',
        isLoading: false,
        error: false
    },

    cardFilter: {
        cardLabels: [],
        members: [],
        selectedCardLabels: [],
        selectedMembers: []
    },

    emailSubscribersList: {
        subscribersList: [],
        isLoading: false,
        error: false,
        currentPage: 1,
        totalPages: 1,
        isStoring: false,
        errorStore: false,
        subscribers: {
            subscribers: [],
            isLoading: false,
            error: false,
            currentPage: 1,
            totalPages: 1,
        },
        isLoadingAddEmails: false,
        errorAddEmails: false,
        isLoadingSubscribersListItem: false,
        errorSubscribersListItem: false,
        subscribersListItem: {},
    },

    emailCampaigns: {
        campaigns: [],
        isLoading: false,
        error: false,
        currentPage: 1,
        totalPages: 1,
        subscribersList: [],
        isStoring: false,
        errorStore: false,
        isLoadingForms: false,
        errorForms: false,
        forms: []
    },
    shiftRegisters: {
        isLoadingGensBases: false,
        errorGensBases: false,
        bases: [],
        gens: [],
        currentGen: {},
        isLoading: false,
        error: false,
        shiftRegisters: []
    },
    courses: {
        isLoading: true,
        error: false,
        courses: []
    }
};
