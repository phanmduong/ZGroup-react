import {action, computed, observable} from "mobx";
import {loadGens} from "../dashboard/dashboardApi";
import {showErrorNotification} from "../../helpers/helper";
import moment from 'moment';
import {parallel} from "async";

class FilterStore {
    @observable isLoading = true;
    @observable gens = [];
    @observable staffs = [];
    @observable courses = [];
    @observable sources = [];
    @observable marketing_campaigns = [];

    @observable filter = {
        start_time: moment().subtract(30, 'days'),
        end_time: moment().subtract(0, 'days'),
    };

    @computed
    get gensData() {
        return this.gens.map(gen => {
            return {...gen, value: gen.id, label: 'Khóa ' + gen.name,};
        });
    }

    @action
    loadData = (callback) => {
        this.isLoading = true;
        parallel({
            gens: (callback) => {
                loadGens().then((res) => {
                    this.gens = res.data.data.gens;

                    const currentGen = this.gens.filter((gen) => gen.id == res.data.data.current_gen.id)[0];

                    this.filter.start_time = moment(currentGen.start_time);
                    this.filter.end_time = moment(currentGen.end_time);

                    this.filter.gen_id = res.data.data.current_gen.id;
                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            },
        }).then(() => {
            if (callback) {
                callback();
            }
        }).finally(() => {
            this.isLoading = false;
        })


    };
}

export default new FilterStore();
