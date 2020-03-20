import {action, computed, observable} from "mobx";
import {
    archiveTicket,
    createTicket, findClass,
    findUser,
    loadTicketPriorities,
    loadTickets,
    loadTicketTypes,
    loadUserRegisters, starTicket
} from "./ticketApi";
import {
    confirm,
    isEmptyInput,
    showErrorNotification,
    showNotification,
    showWarningNotification
} from "../../helpers/helper";

const defaultModal = {
    showModalCreateTicket: false,
    isCreating: false,
    ticket: {
        id: null,
        name: null,
        description: null,
        deadline: null,
        user_id: null,
        pic_id: null,
        class_id: null,
        status_id: null,
        register_id: null,
        ticket_type_id: null,
        priority_id: null,
        assigner_id: null,
        archived_by: null,
        archived_at: null,
        user: {},
        assigner: {},
        pic: {},
        status: {},
        priority: {},
        register: {},
        class: {},
    }
};

export const store = new class Store {
    @observable isLoading = false;
    @observable isStaring = false;
    @observable isLoadingTicketTypes = false;
    @observable isLoadedTicketTypes = false;
    @observable isLoadedTicketPriorities = false;
    @observable isLoadingTicketPriorities = false;
    @observable isLoadingUserRegisters = false;
    @observable openFilterPanel = false;

    @observable modal = {...defaultModal};
    @observable filter = {
        search: '',
        creator:{},
        creator_id:null,
        stared_by:null,
        ...defaultModal.ticket
    };


    @observable tabFilter = {
        currentTab: 0,
        tabs: [
            {text: 'Đang giải quyết', operator: (o => isEmptyInput(o.archivist))},
            {text: 'Đã lưu trữ', operator: (o => !isEmptyInput(o.archivist))},
        ]
    };
    @observable data = {
        tickets: [],
        ticketTypes: [],
        ticketPriorities: [],
        userRegisters: [],

    };


    @computed
    get getTickets() {
        let tab = this.tabFilter.tabs[this.tabFilter.currentTab];
        return this.data.tickets.filter(t => tab.operator(t));
    }

    @computed
    get convertUserRegister() {
        let arr = this.data.userRegisters;
        let data = arr.map(function (obj) {
            return {
                ...obj,
                value: obj.id,
                label: obj.studyClass ? obj.studyClass.name : 'Không có lớp',
                avatar_url: obj.studyClass && obj.studyClass.course ? obj.studyClass.course.icon_url : '',
            };
        });
        return data;
    }

    @action
    changeArchiveFilter = (index) => {
        this.isLoading = true;
        this.tabFilter.currentTab = index;
        this.isLoading = false;
    };

    @action
    openModalCreate = () => {
        this.modal.showModalCreateTicket = true;
        this.modal.ticket = defaultModal.ticket;
    }
    @action
    openModalEdit = (data) => {
        let res = {
            ...data,
            user_id: data.user ? data.user.id : null,
            pic_id: data.pic ? data.pic.id : null,
            class_id: data.class ? data.class.id : null,
            status_id: data.status ? data.status.id : null,
            register_id: data.register ? data.register.id : null,
            ticket_type_id: data.type ? data.type.id : null,
            priority_id: data.priority ? data.priority.id : null,
            assigner_id: data.assigner ? data.assigner.id : null,
            archived_by: data.archivist ? data.archivist.id : null,
            archived_at: data.archived_at ? data.archived_at : null,
        };
        ['user', 'assigner', 'pic', 'register'].forEach(field => {
            let obj = data[field];
            console.log(field, obj);
            if (!isEmptyInput(obj)) {
                let avatar_url = '';
                if (!isEmptyInput(obj.avatar_url)) {
                    avatar_url = obj.avatar_url;
                }
                if (!isEmptyInput(obj.studyClass)) {
                    obj.name = obj.studyClass.name;
                    if (!isEmptyInput(obj.studyClass.course) && !isEmptyInput(obj.studyClass.course.icon_url))
                        avatar_url = obj.studyClass.course.icon_url;

                }
                res = {
                    ...res,
                    [field]: {
                        ...obj,
                        label: obj.name,
                        value: obj.id,
                        avatar_url,
                    },

                };

            }else res = {...res,[field]:{}};
        });
        this.modal.ticket = res;
        console.log(res);
        this.modal.showModalCreateTicket = true;
        store.loadUserRegisters();
    };
    @action
    loadTickets = () => {
        this.isLoading = true;
        let includes = 'user,creator,status,priority,staredBy,assigner,pic,archivist,type,register.studyClass.course';
        loadTickets(this.filter, includes).then(res => {
            if (res.data.status == 1) {
                this.data.tickets = res.data.tickets;
            }
        }).finally(() => {
            this.isLoading = false;
        });
    };
    @action
    loadTicketTypes = () => {
        this.isLoadingTicketTypes = true;
        this.isLoadedTicketTypes = true;
        loadTicketTypes().then(res => {
            if (res.data.status == 1) {
                this.data.ticketTypes = res.data.ticket_types;
            }
        }).finally(() => {
            this.isLoadingTicketTypes = false;
        });
    };
    @action
    loadTicketPriorities = () => {
        this.isLoadingTicketPriorities = true;
        this.isLoadedTicketPriorities = true;
        loadTicketPriorities().then(res => {

            if (res.data.status == 1) {
                this.data.ticketPriorities = res.data.ticket_priorities;
            }
        }).finally(() => {
            this.isLoadingTicketPriorities = false;
        });
    };
    @action
    loadUserRegisters = () => {
        this.isLoadingUserRegisters = true;
        loadUserRegisters(this.modal.ticket.user_id).then(res => {

            this.data.userRegisters = res.data;


        }).finally(() => {
            this.isLoadingUserRegisters = false;
        });
    };

    @action
    archiveTicket = (ticket) => {
        let title = isEmptyInput(ticket.archivist) ? 'Lưu trữ vấn đề' :'Bỏ lưu trữ vấn đề';
        let des = isEmptyInput(ticket.archivist) ? 'Bạn có chắc muốn lưu trữ vấn đề này?' :'Bạn có chắc muốn bỏ lưu trữ vấn đề này?';
        confirm('warning', title, des,
            () => {
                this.isLoading = true;
                showWarningNotification('Đang thực hiện...');
                archiveTicket(ticket.id).then(res => {

                    if(res.data.status == 1){
                        showNotification('Lưu thành công!');
                        // this.loadTickets();

                    }else showErrorNotification('Có lỗi xảy ra!');
                }).catch(e => {
                    console.log(e);
                    showErrorNotification('Có lỗi xảy ra!');
                }).finally(() => {
                    this.isLoading = false;
                });
            }
        );

    };
    @action
    starTicket = (ticket_id) => {
        this.isLoading = true;
        showWarningNotification('Đang thực hiện...');
        starTicket(ticket_id).then(res => {
            if(res.data.status == 1){
                showNotification('Lưu thành công!');
                this.loadTickets();
            }else showErrorNotification('Có lỗi xảy ra!');
        }).catch(e => {
            console.log(e);
            showErrorNotification('Có lỗi xảy ra!');
        }).finally(() => {
            this.isLoading = false;
        });
    };
    @action
    createTicket = () => {
        let data = {...store.modal.ticket};
        let errs = [];
        if (isEmptyInput(data.name)) errs.push('Bạn cần nhập tên vấn đề');
        if (isEmptyInput(data.user_id)) errs.push('Bạn chưa chọn người gặp vấn đề');
        errs.forEach((e) => showErrorNotification(e));
        if (errs.length) return;
        store.modal.isCreating = true;
        createTicket(data).then(res => {
            if (res.data.status == 1) {
                showNotification('Lưu thành công!');
                this.loadTickets();
                store.modal = defaultModal;
            } else {
                showErrorNotification('Có lỗi xảy ra!');
            }
            store.modal.isCreating = false;

        }).catch(() => showErrorNotification('Có lỗi xảy ra!'));
    };

    @action
    searchUsers = (input, callback, field, is_staff) => {
        if (isEmptyInput(this.timeOut)) this.timeOut = {};
        if (this.timeOut[field] !== null) {
            clearTimeout(this.timeOut[field]);
        }
        this.timeOut[field] = setTimeout(function () {
            findUser(input, is_staff).then(res => {
                let data = res.data.map((obj) => {
                    return {
                        ...obj,
                        ...{
                            value: obj.id,
                            label: obj.name
                        }
                    };
                });
                // this.data[field] = data;
                callback(null, {options: data, complete: true});
            });
        }.bind(this), 500);
    };
    @action
    searchClasses = (input, callback) => {
        if (isEmptyInput(this.timeOut)) this.timeOut = {};
        if (this.timeOut.classes !== null) {
            clearTimeout(this.timeOut.classes);
        }
        this.timeOut.classes = setTimeout(function () {
            findClass(input).then(res => {
                let data = res.data.map((obj) => {
                    return {
                        ...obj,
                        ...{
                            value: obj.id,
                            label: obj.name,
                            avatar_url: obj.course ? obj.course.icon_url : '',
                        }
                    };
                });
                callback(null, {options: data, complete: true});
            });
        }.bind(this), 500);
    };
}
();
