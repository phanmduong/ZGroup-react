export default {

    summaryMarketingCampaignUp: {
        errorGens: false,
        bases: [],
        isLoadingBases: false,
        errorBases: false,
        isLoading: false,
        error: false,
        summary: [],
    },

    marketingCampaignUp: {
        isLoading: false,
        error: false,
        currentPage: 1,
        totalPages: 1,
        marketingCampaigns: [],
        // courses: [],
        // isLoadingCourses: false,
        // errorCourses: false,
        isStoringCampaign: false,
        errorStoreCampaign: false,
    },

    registerManage: {
        registers: [],
        staffs: [],
        isLoading: false,
        totalPages: 1,
        currentPage: 1,
        totalCount: 1,
        limit: 20,
        isChangingStatus : false,
    },

    bankAccount: {
        accounts: [],
        isLoading: false
    },

    inventoryOrder: {
        isLoading: false,
        totalPages: 1,
        currentPage: 1,
        totalCount: 1,
        limit: 20,
        inventories: [],
        totalMoney: 0,
        totalQuantity: 0,
        staffs: []
    },

    orderedDetail: {
        currencies: [],
        isLoading: false,
        order: {
            size: '',
            link: '',
            color: '',
            description: '',
            sale_off: 0,
            weight: 0,
            tax: "true",
            unit: '',
            ratio: 1,
            money: 0,
            fee: 0,
            code: '',
            endTime: '',
            quantity: 0,
            price: 0
        },
        customer: {
            name: '',
            phone: '',
            email: '',
            note: '',
        }
    },


    finance: {
        bankTransfers: [],
        isLoading: false,
        cancelReasonModal: false,
        transferCancelReason: {},
        bankTransferEditModal: false,
        transferEdit: {}
    },

    currency: {
        currencies: [],
        isLoading: false,
        addEditCurrencyModal: false,
        currencyEditModal: {
            name: '',
            notation: '',
            ratio: ''
        },
        isUpdatingEditModal: false,
    },

    orderedProduct: {
        currencies: [],
        isSendingPrice: false,
        addNoteModal: false,
        addCancelNoteModal: false,
        sendPriceModal: false,
        orderSendPriceModal: [],
        orderNote: {},
        cancelNote: {},
        isSendingNote: false,
        totalPaidMoney: 0,
        totalMoney: 0,
        totalDeliveryOrders: 0,
        notLocked: 0,
        deliveryOrders: [],
        currentPage: 0,
        totalPages: 0,
        totalCount: 0,
        isLoading: false,
        staffs: []
    },

    createProduct: {
        categories: [],
        manufactures: [],
        manufacturesRender: [],
        manufacturesFilter: [],
        properties_list_filter: [],
        isUploadingAvatar: false,
        totalPagesManufactures: 1,
        currentPageManufactures: 1,
        totalCountManufactures: 1,
        totalPagesProperties: 1,
        currentPageProperties: 1,
        totalCountProperties: 1,
        childImagesModal: false,
        warehousesList: [],
        propertiesManageModal: false,
        manufacturesManageModal: false,
        isLoadingManufacture: false,
        child_index: 0,
        percent: 0,
        productWorking: {
            name: '',
            code: '',
            description: '',
            price: 0,
            avatar_url: '',
            sale_status: 0,
            highlight_status: 0,
            display_status: 0,
            goods_count: 0,
            manufacture_id: '',
            good_category_id: '',
            images_url: [],
            property_list: [
                {
                    name: 'coool',
                    property_item_id: 3,
                    value: []
                }
            ],
            children: []
        },
        goods_count_check: true,
        isUploadingImage: false,
        isLoading: false,
        avatar_url: '',
        properties_list: [],
        properties_list_render: [],
        images: []
    },

    globalLoading: {
        isLoading: false
    },

    inventoryGood: {
        isLoading: false,
        isLoadingMore: false,
        isLoadingHistoryModal: false,
        isLoadingHistoryList: false,
        inventories: [],
        categories: [],
        manufactures: [],
        warehousesList: [],
        totalPages: 1,
        currentPage: 1,
        limit: 20,
        totalCount: 1,
        inventoryChecking: {
            histories: [],
            warehouses: [],
            inventoryInfo: {},
            totalPages: 0,
            currentPage: 0
        },
        historyModal: false,
        count: 0,
        totalImportMoney: 0,
        totalMoney: 0
    },

    productList: {
        products: [],
        productsTotal: 0,
        productsQuantity: 0,
        totalPages: 1,
        currentPage: 1,
        limit: 20,
        totalCount: 1,
        isLoading: false,
        showWareHouse: true,
        modalInProduct: {
            priceModal: false,
            wareHouseModal: false,
            avatarModal: false,
            sameProductModal: false,
            isModalUpdating: false,
            modalUpdated: false
        },
        productEditing: {
            index: -1,
            productAvatar: {},
            productPrice: {},
            productPresent: {},
            productWarehouse: {},
            good_category_id: -1,
            manufacture_id: -1,
            status: null,
            isUploadingAvatar: false,
            percent: 0
        },
        categories: [],
        manufactures: []
    },

    good: {
        barcode: {
            barcodeList: {
                barcodes: [],
                isLoading: false,
                currentPage: 1,
                totalPages: 0,
            },
            createBarcode: {
                showModal: false,
                barcode: {},
                isSaving: false
            }
        },
        attachPropertyItem: {
            showModal: false,
            isLoading: false,
            goodPropertyItems: [],
            task: {},
            isSaving: false,
            boards: [],
            selectedBoards: []
        },
        createProperty: {
            property: {},
            isLoading: false,
            isSaving: false
        },
        propertyItem: {
            propertyItems: [],
            isLoading: false
        },
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
            isResettingPassword: false,
            errorResetPassword: false,
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
        },
        users: {
            userListData: [],
            isLoading: false,
            error: false,
            currentPage: 1,
            totalPages: 1
        },
        departments: [],
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
        showEditBaseModal: false,
        isUploadingAvatar: false,
        bases: [],
        isUploadingImage: false,
        isLoadingBases: false,
        currentPage: 1,
        totalPages: 1,
        provinces: [],
        isLoadingProvinces: false,
        createBase: {
            percent: 0,
            percentImage: 0,
            isUploadingAvatar: false,
            isUploadingImage: false,
            isSavingBase: false,
            isLoadingBase:
                false,
            base:
                {
                    name: "",
                    address:
                        "",
                    images: []
                }
        },
        base: {},
        percent: 0,
        isSavingBase: false,
        districts: []
    },

    book: {
        taskListTemplateModal: {
            showModal: false,
            boards:
                [],
            isLoading:
                false
        }
        ,
        taskSpan: {
            showModal: false,
            hours:
                0,
            task:
                {
                    span: 0
                }
            ,
            isSaving: false
        }
        ,
        taskListDetail: {
            showModal: false,
            taskList:
                {}
            ,
            isSaving: false,
            isSavingTask: false,
            showEditTaskModal: false,
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
        addChildGood: {
            good: {},
            taskId: 0,
            isSaving: false,
            showModal: false
        },
        archiveBoard: {
            showModal: false,
            boards: [],
            isLoading: false
        },
        personalSetting: {
            showModal: false,
            setting: {},
            isSaving: false,
            isLoading: false
        },
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
            selectedMembers: []
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
        askGoodProperties: {
            showModal: false,
            isSaving: false,
            goodPropertiesOutput: {},
            goodProperties: [],
            task: {},
            isLoading: false
        },
        createCard: {
            card: {},
            isSaving: false,
            showModal: false,
            board: {},
            isLoading: false,
            isLoadingTaskListTemplate: false,
            taskListTemplates: [],
            goodPropertyItems: []
        },

        boardList: {
            projectId: 0,
            members: [],
            boards: [],
            setting: {},
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
            preSaveError: false,
            id: ''
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
        },
        isLoading: false,
        error: false,
        totalPages: 1,
        currentPage: 1,
        posts: [],
        categoriesList: [],
        isLoadingCategories: true,
        isLoadingPost: false,
        errorPost: false,
    },
    registerStudents: {
        registers: [],
        isLoading: false,
        error: false,
        currentPage: 1,
        totalPages: 1,
        gens: [],
        currentGen: {},
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
        isLoadingRegisters: false,
        isLoadingRegistersByStudent: false,
        errorRegistersByStudent: false,
        registersByStudent: [],
        classFilter: [],
        salerFilter: [],
        campaignFilter: [],
        isLoadingClassFilter: false,
        isLoadingSalerFilter: false,
        isLoadingCampaignFilter: false,
        excel: {},
        isLoadingExcel: false,
        isCommittingInfoStudent: false,
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
        savingError: false,
        isChangingPassword: false,
        errorChangePassword: false
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
        isChangingPassword: false,
        errorChangePassword: false
    },

    dashboard: {
        it: {
            dateArray: [],
            pointByDate: [],
            cardsByDate: [],
            cards: [],
            staffs: [],
            isLoading: false,
            showCardsModal: false,
            isLoadingCardsModal: false,
        },
        gens: [],
        isLoadingGens: true,
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
        excel: [],
        isLoadingExcel: false,
        currentPage: 1,
        totalPages: 1,
        classes: [],
        gens: [],
        isLoading: false,
        isLoadingGens: false,
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

    historyShiftRegisters: {
        currentPage: 1,
        totalPages: 1,
        shiftPicks: [],
        isLoading: false,
        error: false
    },
    shiftSessions: {
        isStoring: false,
        errorStore: false,
        shiftSessions: [],
        isLoading: false,
        error: false
    },


    categories: {
        addCategoriesModal: {
            isShowModal: false,
            isSaving: false,
            id: '',
            parent_id: '',
            name: '',
            isEdit: false,
        },
        isLoading: true,
        error: false,
        categoriesList: [],
    },

    goodOrders: {
        warehousesList: [],
        selectWarehouseModal: false,
        isLoadingWarehouse: false,
        totalCountWarehouse: 1,
        totalPagesWarehouse: 1,
        currentPageWarehouse: 1,
        isUpdate: false,
        nextStatus: '',
        orderIdWarehouseModal: 0,
        orderId: 0,
        labelId: -1,
        shipGoodModal: false,
        addNoteModal: false,
        orderNote: {},
        isSendingShipOrder: false,
        isSendingNote: false,
        shippedGoodResponse: {},
        shippingGood: {
            products: [],
            order: {
                id: "",
                pick_name: "Graphics",
                pick_address: "175 Chùa Láng",
                pick_province: "Hà Nội",
                pick_district: "Quận Đống Đa",
                pick_tel: "0903400807",
                tel: "",
                name: "",
                address: "",
                province: "",
                district: "",
                is_freeship: "1",
                pick_date: "",
                pick_money: "",
                note: "",
                value: ""
            }
        },
        isLoading: false,
        error: false,
        currentPage: 1,
        totalPages: 1,
        orders: [],
        totalOrder: 0,
        totalMoney: 0,
        totalPaidMoney: 0,
        limit: 1,
        totalCount: 1,
        order: {
            provinces: [],
            isOpenReturnOrder: false,
            isSaving: false,
            isSavingReturnOrders: false,
            isSavingQuantity: {
                id: 0,
                status: false,
            },
            isSavingQuantityInReturnOrders: {
                id: 0,
                status: false,
            },
            isLoading: false,
            error: false,
            total: 1130000,
            paid: 0,
            debt: 1130000,
            order: {
                code: "ORDER20171203164031",
                created_at: "16:40 03-12-2017",
                note: "",
                payment: "Chuyển khoản",
                status: "place_order",
                good_orders: [],
                customer: {
                    name: "test",
                    address: "HN",
                    phone: "test",
                    email: "po01636863831@gmail.com"
                },


                return_orders: [],
                warehouse: 0,

                isLoadingGoodOverlay: false,
                goodsList: [],
                totalGoodPages: 0,
            },
        },
        staffs: [],
        allStaffs: [],
        isLoadingStaffs: false,
        errorStaffs: false,
    },

    importGoods: {
        isLoading: false,
        error: false,
        importOrders: [],
        currentPage: 1,
        totalPages: 1,
        importGood: {
            infoOrder: {},
            infoPaid: {},
            importOrder: {
                imported_goods: []
            },
            isLoading: false,
            error: false,
            isLoadingHistoryPaid: false,
            errorHistoryPaid: false,
            historyPaidMoney: []
        },
        formImportGood: {
            imported_goods: [],
            scot: 0,
            paid_money: 0,
            isStoring: false,
            error: false,
            payment: '',
            isLoadingHistoryPaid: false,
            errorHistoryPaid: false,
        },
        addGoodFile: {
            isCheckingGoods: false,
            errorCheckGoods: false,
            existsGoods: [],
            notExistsGoods: [],
        },
        isLoadingWarehouses: false,
        errorWarehouses: false,
        warehouses: [],
        isStoringSupplier: false,
        errorStoreSupplier: false,
        isSavingPaidMoney: false,
        errorPaidMoney: false,
    },
    wareHouses: {
        isLoading: true,
        wareHousesList: [],
        bases: [],
        totalPages: 1,
        modal: {
            wareHouse: {
                id: '',
                name: '',
                location: '',
                base: {
                    id: '',
                    name: '',
                    address: '',

                }
            },
            isShowModal: false,
            isEdit: false,
            isSaving: false,
        }
    },

    customers: {
        groupsInOverlay: [],
        customersList: [],
        ordersList: [],
        isLoading: true,
        isLoadingInOverlay: false,
        totalOrderPages: 10,
        totalGroupCustomerPages: 10,

        totalPages: 10,
        totalMoneys: 10,
        totalDebtMoneys: 10,
        totalCount: 10,
        modal: {
            isSaving: false,
            customer: {
                name: '',
                phone: '',
                email: '',
                address: '',
                gender: '',
                dob: '',

                stringId: '',
                groups: [],
            }
        },
    },
    suppliers: {
        suppliersList: [],
        isLoading: false,
        totalCount: 10,
        totalPages: 10,
        modal: {
            isSaving: false,
            supplier: {
                name: '',
                phone: '',
                email: '',
                address: '',
            }
        }
    },

    addDiscount: {
        isLoadingOut: false,
        isSaving: false,
        isLoading: false,
        customers: [],
        goods: [],
        categories: [],
        groupCustomers: [],
        totalCustomerPages: 0,
        totalGoodPages: 0,
        totalGroupCustomerPages: 0,
        discount: {
            name: '',
            description: '',
            discount_type: '',
            discount_value: '',
            type: '',
            used_for: '',
            start_time: '',
            end_time: '',
            order_value: '',
            good: {},
            category: {},
            customer: {},
            customer_group: {},
            quantity: '',
            shared: '',
        },

    },
    coursesCreateEdit: {
        isLoading: false,
        isEditing: false,
        isUpdatingAvatar: false,
        updateAvatarError: false,
        isUpdatingLogo: false,
        updateLogoError: false,
        isUpdatingCover: false,
        updateCoverError: false,
        isCommitting: false,
        commitSuccess: false,
        data: {
            id: null,
            name: "",
            duration: "",
            price: "",
            description: "",
            linkmac: "",
            linkwindow: "",
            num_classes: "",
            mac_how_install: "",
            window_how_install: "",
            cover_url: "",
            color: "",
            image_url: "",
            icon_url: "",
            created_at: "",
            detail: "",
            lessons: [],
            links: [],
            pixels: [],
            type_id: null,
            categories: [],
        }
    },
    courses: {
        isLoading: false,
        isDuplicating: false,
        isUploadingLinkIcon: false,
        isUploadingLink: false,
        isUploadingPixel: false,
        isUploadingTermIcon: false,
        isUploadingTerm: false,
        error: false,
        coursesList: [],
        isDeleting: false,
        paginator: {
            total_count: 1,
            total_pages: 1,
            current_page: 1,
            limit: 1
        },
        isEditing: false,
        isUpdatingAvatar: false,
        updateAvatarError: false,
        isUpdatingLogo: false,
        updateLogoError: false,
        isUpdatingCover: false,
        updateCoverError: false,
        isCommitting: false,
        commitSuccess: false,
        data: {
            id: null,
            name: "",
            duration: "",
            price: "",
            description: "",
            linkmac: "",
            linkwindow: "",
            num_classes: "",
            mac_how_install: "",
            window_how_install: "",
            cover_url: "",
            color: "",
            image_url: "",
            icon_url: "",
            created_at: "",
            detail: "",
            lessons: [],
            links: [],
            pixels: [],
            terms: [],
            categories: [],
            type_id: "",
            type: "",

        },
        link: {
            id: null,
            course_id: "",
            link_name: "",
            link_url: "",
            link_description: "",
            link_icon: "",
        },
        pixel: {
            name: "",
            code: "",
        },
        term: {
            id: null,
            name: "",
            description: "",
            short_description: "",
            course_id: "",
            image_url: "",
            audio_url: "",
        },
        categories: [],
        types: [],


    },
    lessons: {
        isLoading: false,
        isCommitting: false,
        commitSuccess: false,
        isUploadingLessonIcon: false,
        terms: [],
        data: {
            id: null,
            course_id: 1,
            name: "",
            description: "",
            detail: "",
            order: "",
            detail_content: "",
            detail_teacher: "",
            created_at: "",
            term_id: "",
            audio_url: "",
            video_url: "",
            image_url: "",
        }
    },
    marketingCampaigns: {
        isLoading: false,
        error: false,
        currentPage: 1,
        totalPages: 1,
        marketingCampaigns: [],
        courses: [],
        isLoadingCourses: false,
        errorCourses: false,
        isStoringCampaign: false,
        errorStoreCampaign: false,
    },
    summaryMarketingCampaign: {
        gens: [],
        isLoadingGens: false,
        errorGens: false,
        currentGen: {},
        bases: [],
        isLoadingBases: false,
        errorBases: false,
        isLoading: false,
        error: false,
        summary: [],
    },
    summarySales: {
        gens: [],
        isLoadingGens: false,
        errorGens: false,
        currentGen: {},
        bases: [],
        isLoadingBases: false,
        errorBases: false,
        isLoading: false,
        error: false,
        summary: [],
    },
    discounts: {
        discountsList: [],
        isLoading: false,
        totalPages: 10,
        totalCount: 10,
    },
    attendance: {
        isLoading: false,
        isLoadingGens: false,
        isLoadingBases: false,
        isTakingAttendance: false,
        isLoadingLessonClassModal: false,
        isLoadingLessonDetailModal: false,
        status: 1,
        currentGen: {
            id: "",
        },
        data: {
            classes: [],

        },
        class: [],
        lesson: [],
        bases: [],
        gens: [],
        selectedClass: {
            name: '',
            teacher: {},
            teacher_assistant: {},
        },
    },
    attendanceStaffs: {
        gens: [],
        isLoadingGens: true,
        errorGens: false,
        currentGen: {},
        bases: [],
        isLoadingBases: false,
        errorBases: false,
        isLoading: false,
        error: false,
        teachers: [],
        salesMarketings: [],
    },
    rooms: {
        isLoading: false,
        error: false,
        currentPage: 1,
        totalPages: 1,
        rooms: [],
        isLoadingBases: false,
        errorBases: false,
        errorStoreRoom: false,
        room: {},
        showEditRoomModal: false,
        indexEditModal: -1,
        isStoringRoom: false,
        isEditRoom: false,
        bases: [],
        isUploadingAvatar: false,
        percent: 0,
        isUploadingImage: false,
        types: []
    },
    excel: {
        isLoading: false,
        data: [],
    },
    department: {
        isLoading: false,
        data: {
            paginator: {
                page: 1,
                total_pages: 1,
            },
        },
    },
    jobAssignment: {
        isLoading: false,
        isLoadingStaffs: false,
        isSaving: false,
        isLoadingArchivedWork: false,
        data: {
            name: "",
            type: "personal",
            cost: 0,
            deadline: "",
            bonus_value: 0,
            bonus_type: "coin",
            staffs: [],
            payer: {
                id: null,
                name: "",
                avatar_url: "",
            },
            currency: {
                id: null,
                value: "",
                label: "",
            },
        },
        currencies: [],
        staffs: [
            {
                value: "value1",
                label: "Chưa có nhân viên",
                avatar_url: ""
            },
        ],
        works: [
            {
                "id": 11,
                "name": "3",
                "type": "personal",
                "cost": 2,
                "deadline": "0000-00-00 00:00:00",
                "bonus_value": 3,
                "bonus_type": null
            },
        ],
        archivedWorks: [],
        rateData:{
            staffs:[],
        },
    },

    groupCustomers: {
        isSaving: false,
        isSavingCustomer: false,
        isSavingCoupon: false,
        isLoading: false,
        isLoadingCoupon: false,
        isLoadingCustomer: false,
        isLoadingOverlay: false,     // load trong overlay
        customersList: [],         // (chứa trong overlay)    +  customersShowInTable  = full = customers
        totalCustomerInOverlayPages: 1,
        totalCustomerPages: 1,
        totalCustomerCount: 1,
        totalGroupCustomerPages: 1,
        groupCustomerForm: {
            id: 1,
            name: '',
            description: '',
            stringId: [],
            customers: [],                         // tat ca cac customer trong mot group
            customersShowInTable: [],              // cac customer show ra bang trong mot group
            color: '',
            coupons: [],
            order_value: '',
            delivery_value: '',
            customersShowInAddModal: [],            // cac customer them vao vung tam

        },
        coupon: {
            name: '',
            description: '',
            discount_type: '',
            discount_value: '',
            type: '',
            used_for: '',
            start_time: '',
            end_time: '',
            customer_group_id: '',
            quantity: '',
            shared: '',
        },
        groupCustomersList: [],

    },

    firstLogin: {
        isLoading: false,
        profile: {
            current_role: {},
            start_company: new Date().toISOString().slice(0, 10),
        },
        error: false,
        isChangingAvatar: false,
        isSaving: false,
        savingError: false,
        isChangingPassword: false,
        errorChangePassword: false,
        updateSuccess: false,
    },

    workShiftSessions: {
        isStoring: false,
        errorStore: false,
        workShiftSessions: [],
        isLoading: false,
        error: false
    },
    workShiftRegisters: {
        isLoadingGensBases: false,
        errorGensBases: false,
        bases: [],
        gens: [],
        currentGen: {},
        isLoading: false,
        error: false,
        shiftRegisters: [],
        detailShifts: [],
        isLoadingDetailShifts: false,
        errorDetailShifts: false,
    },
    historyWorkShiftRegisters: {
        currentPage: 1,
        totalPages: 1,
        shiftPicks: [],
        isLoading: false,
        error: false
    },
    landingPages: {
        landingPages: [],
        currentPage: 1,
        totalPages: 1,
        isLoading: false,
        error: false,
        isDeleting: false,
        errorDelete: false,
    },

    createSaleGoods: {
        customer: {
            name: '',
            email: '',
            phone: '',
            address: '',
        },
        infoOrder: {
            payment: "",
            note: "",
            status: "completed_order",
        },
        goods: [],
        goodsList: [],
        goodsShowInTable: [],
        isLoadingGoodModal: false,
        totalGoodPages: 0,
        warehouse: 0,
        isSaving: false,
    },

    historyExtension: {
        isLoading: false,
        paginator: {
            total_count: 0,
            total_pages: 0,
            current_page: 1,
            limit: 20,
        },
        data: [{
            id: null,
            penalty: 0,
            new_deadline: "0000-00-00 00:00:00",
            deadline: "",
            reason: "",
            status: "Waiting",
            staff: {
                id: 0,
                name: "error",
            },
            work: {
                id: 0,
                name: "error",
            },
            manager: {
                id: 0,
                name: "",
            },
        }],
    },
    summaryStaff: {
        isLoadingWork: true,
        isLoadingDepartment: true,
        staff_work: [{
            count: 1,
            month: 1,
        }],
        staff_department: [{
            count: 1,
            department_name: "",
        }],
    },
    survey: {
        surveys: [],
        isLoading: false,
        survey: {},
        showSummaryModal: false,
        showEditQuestionModal: false,
        showEditSurveyModal: false,
        question: {},
        paginator: {},
        showDisplaySettingModal: false,
        isSavingQuestion: false
    },
    dashboardXHH: {
        dashboard: {
            user: {}
        },
        isLoading: true,
        error: false,

    },
    companies: {
        isLoadingCompanies: false,
        isLoadingCompany: false,
        isLoadingFields: false,
        isSavingCompany: false,
        isSavingField: false,
        isLoading: false,
        company: {
            name: "",
            registered_business_address: "",
            office_address: "",
            phone_company: "",
            tax_code: "",
            account_name: "",
            account_number: "",
            bank_name: "",
            bank_branch: "",
            field: {
                id: 0,
                name: "",
            },
            user_contact: "",
            user_contact_phone: "",
            type: "",
        },
        summay_money: 0,
        fields: [],
        paginator: {
            total_count: 0,
            total_pages: 0,
            current_page: 1,
            limit: 20,
        },

    },
    payment: {
        isLoadingPayments: false,
        isLoadingPayment: false,
        isSavingPayment: false,
        isUploading: false,
        isLoadingCompanies: false,
        link: "",
        percent: 0,
        summary_money: 0,
        payment: [{
            id: 0,
            money_value: 0,
            bill_image_url: "",
            payer: {
                id: 0,
                account_number: "",
            },
            receiver: {
                id: 0,
                account_number: "",
            },
            description: "",
        }],
        company: [],
        paginator: {
            total_count: 0,
            total_pages: 0,
            current_page: 1,
            limit: 20,
        },
    },
    seat: {
        showCreateSeatModal: false,
        point: {},
        seat: {
            r: 1,
            color: "rgb(244, 67, 54)"
        },
        seats: [],
        currentAction: "",
        domain: {x: [0, 600], y: [0, 400]}
    },
    printOrder: {
        isLoading: false,
        isCommitting: false,
        isLoadingInfoPrintOrder: false,
        isLoadingGoods: false,
        isLoadingCompanies: false,
        isLoadingPropers: false,
        listPrintOrder: [],
        paginator: {
            current_page: 1,
            limit: 20,
            total_count: 1,
            total_pages: 1,
        },
        companies: [{id: 1, name: ""},],
        goods: [{id: 1, name: ""},],
        codes: [{value: '', label: ''}],
        properties: [],
        data: {
            company: {id: 0, name: ""},
            staff: {id: 0, name: ""},
            good: {id: 0, name: ""},
            quantity: 1,
            command_code: "",
            core1: {
                number: 1,
                material: "",
                color: "",
                size: 1,
                price: 1,
            },
            core2: {
                number: 1,
                material: "",
                color: "",
                size: 1,
                price: 1,
            },
            cover1: {
                number: 1,
                material: "",
                color: "",
                size: 1,
                price: 1,
            },
            cover2: {
                number: 1,
                material: "",
                color: "",
                size: 1,
                price: 1,
            },
            spare_part1: {
                name: "",
                number: 1,
                material: "",
                size: 1,
                price: 1,
                made_by: "",
            },
            spare_part2: {
                name: "",
                number: 1,
                material: "",
                size: 1,
                price: 1,
                made_by: "",
            },
            packing1: {
                name: "",
                price: 1,
            },
            packing2: {
                name: "",
                price: 1,
            },
            other: {
                name: "",
                price: 1,
            },
            price: 1,
            note: "",
            order_date: "",
            receive_date: "",
        },
    },
    exportOrder: {
        isLoading: false,
        isCommitting: false,
        isLoadingGoods: false,
        isLoadingCompanies: false,
        isLoadingWarehouses: false,
        paginator: {
            current_page: 1,
            limit: 20,
            total_count: 1,
            total_pages: 1,
        },
        listExportOrder: [
            {
                good: {id: 0, name: "noname"},
                warehouse: {id: 0, name: "noname"},
                company: {id: "", name: "noname"},
                price: 0,
                quantity: 0,
            }
        ],
        data: {
            good: {id: 0, name: "noname"},
            warehouse: {id: 0, name: "noname"},
            company: {id: "", name: "noname"},
            price: 0,
            quantity: 0,
        },
        companies: [{id: 1, name: ""},],
        goods: [{id: 1, name: ""},],
        warehouses: [{id: 1, name: ""},],
    },
    notificationTypes: {
        isLoading: false,
        error: false,
        notificationTypes: [],
        totalPages: 1,
        currentPage: 1,
        isStoring: false,
        errorStore: false,
    },
    userpacks: {
        ListUserpacks: [],
        isLoadingUserpacks: false,
        isLoadingUserpack: false,
        isLoadingSubInUserpack: false,
        isLoadingSubKind: false,
        isSavingAdd: false,
        isSavingUserpack: false,
        isSavingSubKind: false,
        userpack: {
            id: 0,
            avatar_url: "",
            name: "",
            detail: "",
            isUpdatingImage: false,
            subscriptions: [],
        },
        subscription: {
            price: 0,
            id: 0,
            description: "",
            subscriptionKind: "",  // id
        },
        subscriptionKind: {
            name: "",
            hours: 0,
        },
        subscriptionKinds: [],
        isSavingSubscription: false,
        isSavingSubscriptionKind: false,
        isSavingAddUserpack: false,
    },
    sendNotification: {
        isSending: false,
        errorSend: false,
        historyNotifications: [],
        totalPages: 1,
        currentPage: 1,
    },
    dashboardUp: {
        isLoadingBases: true,
        isLoadingRooms: false,
        isLoadingSeats: false,
        bases: [],
        rooms: [],
        rooms_count: 0,
        seats_count: 0,
        seats: [],
        available_seats: 0,

    },
    orderedGood:{
      isLoading: false,
    },
};
