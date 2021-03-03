import {action, computed, observable} from "mobx";
import {loadGens} from "../dashboardApi";
import {showErrorNotification} from "../../../helpers/helper";
import moment from 'moment';
import {searchStaffs} from "../../lead/leadApi";
import {NO_AVATAR, URL} from "../../../constants/env";
import {parallel} from "async";
import {getCourseActiveApi, getMarketingCampaignsApi, getSourcesApi} from "./dashboardSaleApi";

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
        base_id: 0,
        staff_id: 0,
        course_id: 0,
        province_id: 0,
        source_id: 0,
        campaign_id: 0,
        staff: {value: 0, label: "Tất cả nhân viên", avatar_url: NO_AVATAR},
    };

    @computed
    get gensData() {
        return this.gens.map(gen => {
            return {...gen, value: gen.id, label: 'Khóa ' + gen.name,};
        });
    }

    @computed
    get coursesData() {
        return [{value: 0, label: "Tất cả môn học"}, ...this.courses.map(course => {
            return {...course, value: course.id, label: course.name};
        })];
    }

    @computed
    get sourcesData() {
        return [{value: 0, label: "Tất cả nguồn"}, ...this.sources.map(source => {
            return {...source, value: source.id, label: source.name};
        })];
    }

    @computed
    get marketingCampaignData() {
        return [{value: 0, label: "Tất cả chiến dịch"}, ...this.marketing_campaigns.map(campaign => {
            return {...campaign, value: campaign.id, label: campaign.name};
        })];
    }

    @computed
    get staffsData() {
        const allStaff = {value: 0, label: "Tất cả nhân viên", avatar_url: NO_AVATAR};
        return [allStaff, ...this.staffs.map(staff => {
            return {value: staff.id, label: staff.name};
        })];
    }

    @action
    openLinkRegister = (filter) => {
        let link = `https://${URL}/register/list?`;
        const filter2 = {...this.filter, ...filter};
        const data = {
            startDate: filter2.start_time.format('X'),
            endDate: filter2.end_time.format('X'),
            employees: JSON.stringify([filter2.staff_id]),
            courses: JSON.stringify([filter2.course_id]),
            provinces: JSON.stringify([filter2.province_id]),
            bases: JSON.stringify([filter2.base_id]),
            sources: JSON.stringify([filter2.source_id]),
            campaigns: JSON.stringify([filter2.campaign_id]),
        };
        Object.keys(data).forEach((key) => {
            const value = data[key] ? data[key] : "";
            link += `&${key}=${value}`;
        });
        console.log(link);
        window.open(link, "_blank");

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
    loadData = () => {
        this.isLoading = true;
        parallel({
            gens: (callback) => {
                loadGens().then((res) => {
                    this.gens = res.data.data.gens;
                    if (window.location.hostname.includes("ieg")) {
                        this.filter.start_time = moment().startOf('year');
                        this.filter.end_time = moment().endOf('year');
                    } else {
                        const currentGen = this.gens.filter((gen) => gen.id == res.data.data.current_gen.id)[0];

                        this.filter.start_time = moment(currentGen.start_time);
                        this.filter.end_time = moment(currentGen.end_time);

                        this.filter.gen_id = res.data.data.current_gen.id;
                    }

                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            },
            courses: (callback) => {
                getCourseActiveApi().then((res) => {
                    this.courses = res.data.courses;
                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            },
            sources: (callback) => {
                getSourcesApi().then((res) => {
                    this.sources = res.data.sources;
                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            },
            marketingCampaigns: (callback) => {
                getMarketingCampaignsApi().then((res) => {
                    this.marketing_campaigns = res.data.marketing_campaigns;
                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            }
        }).then(() => {
        }).finally(() => {
            this.isLoading = false;
        });


    };
}

export default new FilterStore();
