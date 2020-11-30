import {action, computed, observable} from "mobx";
import {
    analyticsLead,
    analyticsSourceCampaign,
    expenseCampaignMarketingApi,
    expenseSourceMarketingApi
} from "./DashboardMarketingApi";
import {loadGens} from "../dashboardApi";
import {isEmptyInput, showErrorNotification} from "../../../helpers/helper";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import moment from 'moment';
import {searchStaffs} from "../../lead/leadApi";
import {NO_AVATAR} from "../../../constants/env";
import {getMarketingCampaignsApi, getSourcesApi} from "../dashboardSale/dashboardSaleApi";
import {parallel} from "async";

export const store = new class Store {
    @observable isLoading = false;
    @observable isLoadingExpenseCampaign = false;
    @observable isLoadingExpenseSource = false;
    @observable expenseCampaigns = [];
    @observable expenseSources = [];
    @observable routePrefix = `/dashboard/marketing`;
    @observable pathname = false;
    @observable data = {
        bases: [],
        staffs: [],
        importers: [],
        gens: [],
        sources: [],
        marketing_campaigns: [],
        analytics: {
            dates: [],
            leadsCountByDates: [],
            leadsReachedCountByDates: [],
            leadsComebackCountByDates: [],
            leadsComebackTwiceCountByDates: [],
            leadStatuses: [],
            leadsByStatuses: [],
            leadSources: [],
            leadsBySources: [],
            leadCampaigns: [],
            leadsByCampaigns: [],
            leadPics: [],
            leadsByPics: [],
            leadKpiByDates: []
        }
    };
    @observable routes = [
        // {
        //     path: `${this.routePrefix}`, text: 'Lead',
        // },
        // {
        //     path: `${this.routePrefix}/sources-campaigns`, text: 'Nguồn và chiến dịch',
        // },
        // {
        //     path: `${this.routePrefix}/pic`, text: 'PIC',
        // },

    ];
    @observable filter = {
        start_time: moment().subtract(30, 'days'),
        end_time: moment().subtract(0, 'days'),
        base_id: 0,
        carer_id: '',
        carer: {value: 0, label: "Person In Charge", avatar_url: ''},
        importer: {value: 0, label: "Người nhập", avatar_url: ''},
        imported_by: '',
        // carer: null,
        gen_id: 0,
        campaign_id: 0,
        source_id: 0,
        choice_province_id: 0,
    };

    @computed
    get getFilterOptions() {
        let bases = this.data.bases.map(base => {
            return {value: base.id, label: base.name,};
        });
        let gens = this.data.gens.map(gen => {
            return {...gen, value: gen.id, label: 'Khóa ' + gen.name,};
        });
        let staffs = this.data.staffs.map(staff => {
            return {value: staff.id, label: staff.name};
        });
        let sources = [{value: 0, label: "Tất cả nguồn"}, ...this.data.sources.map(source => {
            return {...source, value: source.id, label: source.name};
        })];
        let campaigns = [{value: 0, label: "Tất cả chiến dịch"}, ...this.data.marketing_campaigns.map(campaign => {
            return {...campaign, value: campaign.id, label: campaign.name};
        })];
        bases.unshift({value: 0, label: "Tất cả cơ sở",});
        staffs.unshift({value: 0, label: "Tất cả nhân viên", avatar_url: NO_AVATAR});
        return {bases, gens, staffs, sources, campaigns};
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
            case 'imported_by': {
                res = value ? value.id : 0;
                this.filter.importer = value;
                break;
            }
            case 'gen_id': {
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
    loadStaffs = (input, callback, field) => {
        if (isEmptyInput(this.timeOut)) this.timeOut = {};
        if (this.timeOut[field] !== null) {
            clearTimeout(this.timeOut[field]);
        }
        this.timeOut[field] = setTimeout(function () {
            searchStaffs(input).then(res => {
                let data = [{
                    avatar_url: NO_AVATAR,
                    value: 0,
                    label: "Tất cả nhân viên"
                }];
                res.data.staffs.map((staff) => {
                    data.push({
                        ...staff,
                        ...{
                            value: staff.id,
                            label: staff.name
                        }
                    });
                });
                this.data[field] = data;
                console.log(field, data);
                callback(null, {options: data, complete: true});
            });
        }.bind(this), 500);
    };


    @action
    initLoad = () => {
        // loadBases().then((res) => {
        //     this.data.bases = res.data.data.bases;
        // }).catch(() => showErrorNotification('Có lỗi xảy ra!'));
        // loadGens().then((res) => {
        //     this.data.gens = res.data.data.gens;
        //     this.filter.gen_id = res.data.data.current_gen.id;
        //
        // }).catch((e) => {
        //     showErrorNotification('Có lỗi xảy ra!');
        //     console.log(e);
        // });
        this.isLoading = true;
        parallel({
            gens: (callback) => {
                loadGens().then((res) => {
                    this.data.gens = res.data.data.gens;

                    // const currentGen = this.data.gens.filter((gen) => gen.id == res.data.data.current_gen.id)[0];
                    if (window.location.hostname.includes("ieg")) {
                        this.filter.start_time = moment().startOf('year');
                        this.filter.end_time = moment().endOf('year');
                    } else {
                        const currentGen = this.data.gens.filter((gen) => gen.id == res.data.data.current_gen.id)[0];

                        this.filter.start_time = moment(currentGen.start_time);
                        this.filter.end_time = moment(currentGen.end_time);

                        this.filter.gen_id = res.data.data.current_gen.id;
                    }
                    // this.filter.start_time = moment(currentGen.start_time);
                    // this.filter.end_time = moment(currentGen.end_time);

                    // this.filter.gen_id = res.data.data.current_gen.id;
                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            },
            sources: (callback) => {
                getSourcesApi().then((res) => {
                    this.data.sources = res.data.sources;
                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            },
            marketingCampaigns: (callback) => {
                getMarketingCampaignsApi().then((res) => {
                    this.data.marketing_campaigns = res.data.marketing_campaigns;
                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            }
        }).then(() => {
            this.load();
        }).finally(() => {
            this.isLoading = false;
        });
    };
    @action
    load = () => {
        this.expenseCampaignMarketing();
        this.expenseSourceMarketing();
        switch (this.pathname) {
            case `${this.routePrefix}/sources-campaigns`: {
                this.loadAnalyticsLead();
                break;
            }
            case `${this.routePrefix}/pic`: {
                this.loadAnalyticsLead();
                break;
            }
            default: {
                this.loadAnalyticsLead();

            }
        }
    };

    @action
    loadAnalyticsLead = () => {
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
    expenseCampaignMarketing = () => {
        this.isLoadingExpenseCampaign = true;
        let filter = {...this.filter};
        filter.start_time = filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filter.end_time.format(DATE_FORMAT_SQL);
        expenseCampaignMarketingApi(filter).then((res) => {
            this.expenseCampaigns = res.data.expense_campaigns;
        }).catch(e => {
            console.log(e);
            showErrorNotification('Có lỗi xảy ra!');
        }).finally(() => {
            this.isLoadingExpenseCampaign = false;
        });
    }

    @action
    expenseSourceMarketing = () => {
        this.isLoadingExpenseSource = true;
        let filter = {...this.filter};
        filter.start_time = filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filter.end_time.format(DATE_FORMAT_SQL);
        expenseSourceMarketingApi(filter).then((res) => {
            this.expenseSources = res.data.expense_sources;
        }).catch(e => {
            console.log(e);
            showErrorNotification('Có lỗi xảy ra!');
        }).finally(() => {
            this.isLoadingExpenseSource = false;
        });
    }

    @action
    loadAnalyticsSourceCampaign = () => {
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
    loadAnalyticsPic = () => {
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
