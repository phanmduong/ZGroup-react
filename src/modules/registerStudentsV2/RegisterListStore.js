import {action, observable} from "mobx";
import {loadRegisters} from "./registerListApi";
import {showErrorNotification, showNotification, showWarningNotification} from "../../helpers/helper";
import {changeMarkRegister} from "../registerStudents/registerStudentsApi";
import moment from "moment";
import {DATE_FORMAT_SQL} from "../../constants/constants";


export const store = new class TargetPersonStore {
    @observable isLoading = false;
    @observable isChangingBookmark = false;
    @observable registers = [];
    @observable paginator = {
        total_count: 0,
        total_pages: 1,
        current_page: 1,
        limit: 15
    };
    @observable filter = {
        page: 1,
        query: '',
        limit: 16,
        saler_id: '',
        campaignId: '',
        selectedClassId: '',
        selectedMoneyFilter: '',
        selectedClassStatus: '',
        start_time: moment().subtract(30, 'days').format(DATE_FORMAT_SQL),
        end_time: moment().format(DATE_FORMAT_SQL),
        selectedBaseId: '',
        appointmentPayment: '',
        query_coupon: '',
        query_note: '',
        selectedTeleCallStatus: '',
        selectedBookmarkStatus: '',
        registerStatusId: '',
        registerSourceId: '',
        date_test: '',
    };

    @action loadRegisters() {
        this.isLoading = true;
        let filter = {...this.filter};

        loadRegisters(filter).then(res => {
            console.log(res.data);
            this.registers = res.data.data;
            this.paginator = res.data.paginator;
        }).catch(e => {
            console.log(e);
            showErrorNotification('Có lỗi xảy ra!');
        }).finally(() => {
            this.isLoading = false;
        });

    }

    @action changeMarkRegister(index, bookmark) {
        this.isChangingBookmark = true;
        let register = this.registers[index];
        showWarningNotification('Đang thực hiện...');
        changeMarkRegister(register.id, bookmark).then(() => {
            showNotification("Đã lưu!");
            // let registers = [...this.registers];

            this.registers[index].bookmark = bookmark;
            // this.registers =registers;
            console.log(bookmark, this.registers[index].bookmark);
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isChangingBookmark = false;
        });
    }
};