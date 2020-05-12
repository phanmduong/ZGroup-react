import {observable, action} from "mobx";
import {loadRegisters} from "./registerListApi";
import {showErrorNotification, showNotification, showWarningNotification} from "../../helpers/helper";
import {changeMarkRegister} from "../registerStudents/registerStudentsApi";



export const store = new class TargetPersonStore {
    @observable isLoading = false;
    @observable isChangingBookmark = false;
    @observable registers = [];
    @observable paginator = {};

    @action loadRegisters() {
        this.isLoading = true;
        loadRegisters({}).then(res=>{
            console.log(res.data);
            this.registers = res.data.data;
            this.paginator = res.data.paginator;
        }).catch(e=>{
            console.log(e);
            showErrorNotification('Có lỗi xảy ra!');
        }).finally(()=>{
            this.isLoading = false;
        });

    }

    @action changeMarkRegister(index, bookmark){
        this.isChangingBookmark = true;
        let register = this.registers[index];
        showWarningNotification('Đang thực hiện...');
        changeMarkRegister(register.id, bookmark).then(() => {
            showNotification("Đã lưu!");
            // let registers = [...this.registers];

            this.registers[index].bookmark = bookmark;
            // this.registers =registers;
            console.log(bookmark,this.registers[index].bookmark);
        }).catch(() => {
                showErrorNotification("Có lỗi xảy ra");
            }).finally(()=>{
            this.isChangingBookmark = false;
        });
    }
};