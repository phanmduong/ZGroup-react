import {action, computed, observable} from "mobx";
import {analyticsLead,analyticsSourceCampaign} from "./DashboardMarketingApi";
import {loadBases, loadGens} from "../dashboardApi";
import {showErrorNotification} from "../../../helpers/helper";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import moment from 'moment';
import {searchStaffs} from "../../lead/leadApi";
import {NO_AVATAR} from "../../../constants/env";

export const store = new class Store {
    @observable isLoading = false;
    @observable routePrefix = `/dashboard/marketing`;
    @observable pathname = false;
    @observable data = {
        bases: [],
        staffs: [],
        gens: [],
        analytics: {
            dates: [],
            leadsCountByDates: [],
            leadsReachedCountByDates: [],
            leadsComebackCountByDates: [],
            leadsComebackTwiceCountByDates: [],
        }
    };
    @observable routes = [
        {
            path: `${this.routePrefix}`, text: 'Lead',
        },
        {
            path: `${this.routePrefix}/sources-campaigns`, text: 'Nguồn và chiến dịch',
        },
        {
            path: `${this.routePrefix}/pic`, text: 'PIC',
        },

    ];
    @observable filter = {
        start_time: moment().subtract(30, 'days'),
        end_time: moment().subtract(0, 'days'),
        base_id: 0,
        carer_id: '',
        // carer: {value: 0, label: "Tất cả nhân viên",avatar_url: NO_AVATAR},
        carer: null,
        gen_id: 0,
    };

    @computed
    get getFilterOptions() {
        let bases = this.data.bases.map(base => {
            return {value: base.id, label: base.name,};
        });

        let gens = this.data.gens.map(gen => {
            return {...gen,value: gen.id, label: 'Khóa ' + gen.name, };
        });
        let staffs = this.data.staffs.map(staff => {
            return {value: staff.id, label: staff.name};
        });
        bases.unshift({value: 0, label: "Tất cả cơ sở",});
        staffs.unshift({value: 0, label: "Tất cả nhân viên", avatar_url: NO_AVATAR});
        return {bases, gens, staffs};
    }

    @action
    changeDateRangePicker = (start_time, end_time) => {
        this.filter = {...this.filter, start_time, end_time};
        this.load();
    };
    @action
    onChangeFilter = (name, value) => {
        console.log(name, value);
        let res = 0;
        switch (name) {
            case 'carer_id': {
                res = value ? value.id : 0;
                this.filter.carer = value;
                break;
            }
            case 'gen_id':{
                res = value ? value.value : 0;
                this.filter.start_time = moment(value.start_time);
                this.filter.end_time = moment(value.end_time);
                break;
            }
            default: {
                res = value ? value.value : 0;
            }
        }
        this.filter[name] = res;
        this.load();
    };

    @action
    getSumArray = (field) => {
        let count = 0;
        let arr = this.data.analytics[field];
        if (arr) arr.forEach(c => count += c);
        return count;
    };

    @action
    loadStaffs = (input, callback) => {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
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
                this.data.staffs = staffs;
                callback(null, {options: staffs, complete: true});
            });
        }.bind(this), 500);
    };

    @action
    initLoad = () => {
        this.isLoading = true;
        loadBases().then((res) => {
            this.data.bases = res.data.data.bases;
        }).catch(() => showErrorNotification('Có lỗi xảy ra!'));
        loadGens().then((res) => {
            this.data.gens = res.data.data.gens;
            this.filter.gen_id = res.data.data.current_gen.id;
            this.load();
        }).catch((e) => {
            showErrorNotification('Có lỗi xảy ra!');
            console.log(e);
        });


    };
    @action
    load = () => {

        switch (this.pathname) {
            case `${this.routePrefix}/sources-campaigns`:{
                this.loadAnalyticsSourceCampaign();
                break;
            }
            case `${this.routePrefix}/pic`:{
                this.loadAnalyticsSourceCampaign();
                break;
            }
            default:{
                this.loadAnalyticsLead();
            }
        }
    };

    @action
    loadAnalyticsLead = ()=>{
        this.isLoading = true;
        let filter = {...this.filter};
        filter.start_time = filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filter.end_time.format(DATE_FORMAT_SQL);
        analyticsLead(filter).then((res) => {
            this.data.analytics = res.data.analytics;
        }).catch(e => {
            console.log(e);
            showErrorNotification('Có lỗi xảy ra!');
        }).finally(() => {
            this.isLoading = false;
        });
    }
    @action
    loadAnalyticsSourceCampaign = ()=>{
        this.isLoading = true;
        let filter = {...this.filter};
        filter.start_time = filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filter.end_time.format(DATE_FORMAT_SQL);
        analyticsSourceCampaign(filter).then((res) => {
            this.data.analytics = res.data.analytics;
        }).catch(e => {
            console.log(e);
            showErrorNotification('Có lỗi xảy ra!');
        }).finally(() => {
            this.isLoading = false;
        });
    }
    @action
    loadAnalyticsPic = ()=>{
        this.isLoading = true;
        // let filter = {...this.filter};
        // filter.start_time = filter.start_time.format(DATE_FORMAT_SQL);
        // filter.end_time = filter.end_time.format(DATE_FORMAT_SQL);
        // analyticsSourceCampaign(filter).then((res) => {
        //     this.data.analytics = res.data.analytics;
        // }).catch(e => {
        //     console.log(e);
        //     showErrorNotification('Có lỗi xảy ra!');
        // }).finally(() => {
        //     this.isLoading = false;
        // });
        this.isLoading = false;
    }

}();
