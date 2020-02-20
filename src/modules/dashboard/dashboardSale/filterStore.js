import {action, computed, observable} from "mobx";
import {loadGens} from "../dashboardApi";
import {showErrorNotification} from "../../../helpers/helper";
import moment from 'moment';
import {searchStaffs} from "../../lead/leadApi";
import {NO_AVATAR} from "../../../constants/env";

class FilterStore {
    @observable isLoading = false;
    @observable gens = [];
    @observable staffs = [];

    @observable filter = {
        start_time: moment().subtract(30, 'days'),
        end_time: moment().subtract(0, 'days'),
        base_id: 0,
        staff_id: 0,
        gen_id: 0,
        staff: {value: 0, label: "Tất cả nhân viên", avatar_url: NO_AVATAR}
    };

    @computed
    get gensData() {
        return this.gens.map(gen => {
            return {...gen, value: gen.id, label: 'Khóa ' + gen.name,};
        });
    }

    @computed
    get staffsData() {
        const allStaff = {value: 0, label: "Tất cả nhân viên", avatar_url: NO_AVATAR};
        return [allStaff, ...this.staffs.map(staff => {
            return {value: staff.id, label: staff.name};
        })];
    }

    @action
    loadStaffs = (input, callback) => {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(() => {
            searchStaffs(input).then(res => {
                let staffs = [{
                    avatar_url: NO_AVATAR,
                    value: 0,
                    label: "Tất cả nhân viên"
                }];
                res.data.staffs.map((staff) => {
                    staffs.push({
                        ...staff,
                        ...{
                            value: staff.id,
                            label: staff.name
                        }
                    });
                });
                this.staffs = staffs;
                callback(null, {options: staffs, complete: true});
            });
        }, 500)
        ;
    };

    @action
    loadGensData = () => {
        this.isLoading = true;
        loadGens().then((res) => {
            this.gens = res.data.data.gens;
            this.filter.gen_id = res.data.data.current_gen.id;

            const currentGen = this.gens.filter((gen) => gen.id == this.filter.gen_id)[0];

            this.filter.start_time = moment(currentGen.start_time);
            this.filter.end_time = moment(currentGen.end_time);

        }).catch((e) => {
            showErrorNotification('Có lỗi xảy ra!');
            console.log(e);
        }).finally(() => {
            this.isLoading = false;
        });


    };
}

export default new FilterStore();
