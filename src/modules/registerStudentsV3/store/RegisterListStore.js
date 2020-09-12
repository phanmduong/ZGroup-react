import {action, observable} from "mobx";
import {
    findClass,
    findUser,
    getCourseActiveApi,
    getMarketingCampaignsApi,
    loadRegisters,
    loadSources,
    loadStatuses
} from "../registerListApi";
import {isEmptyInput, showErrorNotification, showNotification, showWarningNotification} from "../../../helpers/helper";
import {changeMarkRegister} from "../../registerStudents/registerStudentsApi";
import moment from "moment";
import {DATE_FORMAT_SQL, DISCOUNTYPE, STATUS_REFS} from "../../../constants/constants";
import {isEmpty} from "../../../helpers/entity/mobx";
import {NO_AVATAR} from "../../../constants/env";
import {loadGens} from "../../dashboard/dashboardApi";
import {parallel} from "async";
import {loadDiscountsApi} from "../../discount/dicountApis";

const defaultSelectObject = {id :'', avatar_url: NO_AVATAR,name:'Tất cả', label:'Tất cả', value:''};
const defaultEmptySelectObject = {id :'-1', avatar_url: NO_AVATAR, name:'Không có', label:'Không có', value:''};

const  const_filter = {
    page: 1,
    search: '',
    start_time: moment().subtract(30, 'days'),
    end_time: moment(),
    saler_id: '',
    saler: defaultSelectObject,
    class: defaultSelectObject,
    campaign_id: '',
    class_id: '',
    gen_id: 0,
    course_id: '',
    pay_status: '',
    class_status: '',
    base_id: '',
    appointment_payment: '',
    search_coupon: '',
    coupon_id: '',
    search_note: '',
    tele_call_status: '',
    bookmark: '',
    register_status_id: '',
    source_id: '',
    date_test: '',
    call_back_time: '',
};

export const store = new class TargetPersonStore {
    @observable isLoading = false;
    @observable isChangingBookmark = false;
    @observable registers = [];
    @observable defaultSelectObject = defaultSelectObject;
    @observable defaultEmptySelectObject = defaultEmptySelectObject;
    @observable paginator = {
        total_count: 0,
        total_pages: 1,
        current_page: 1,
        limit: 15
    };
    @observable filter = const_filter;

    @observable filter_data = {
        marketing_campaigns: [],
        gens: [],
        courses: [],
        coupons: [],
        sources: [],
        register_statuses: [],
        pay_statuses: [
            {value: '', label: 'Tất cả',},
            {value: '1', label: 'Đã nộp',},
            {value: '0', label: 'Chưa nộp',},
        ],
        class_statuses: [
            {value: '', label: 'Tất cả',},
            {value: 'active', label: 'Hoạt động',},
            {value: 'waiting', label: 'Chờ',},
            {value: 'solo', label: 'Lớp 1-1',},
            {value: 'business', label: 'Lớp doanh nghiệp',},
        ],
        tele_call_statuses: [
            {value: '', label: 'Tất cả',},
            {value: '0', label: 'Chưa gọi',},
            {value: '1', label: 'Thành công',},
            {value: '2', label: 'Thất bại',},
        ],
        bookmarks: [
            {value: '', label: 'Tất cả',},
            {value: '1', label: 'Đã đánh dấu',},
            {value: '0', label: 'Chưa đánh dấu',},
        ],
    };


    @action
    resetFilters = ()=>{
        this.filter = const_filter;
    }

    @action
    changeDateRangePicker = (start_time, end_time) => {
        this.filter = {...this.filter, start_time, end_time};
        this.loadRegisters();
    };

    @action
    onChangeFilter = (name, value) => {
        console.log(name, value);
        let res = '';
        switch (name) {
            case 'appointment_payment':
            case 'call_back_time': case 'date_test': {
                res = value.target.value;
                break;
            }
            case 'saler_id':{
                res = value ? value.id : value;
                this.filter.saler = value ? value : defaultSelectObject;
                break;
            }
            case 'class_id':{
                res = value ? value.id : value;
                this.filter.class = value ? value : defaultSelectObject;
                break;
            }
            // case 'campaign_id':{
            //     res = value ? value.id : value;
            //     this.filter.campaign = value ? value : defaultSelectObject;
            //     break;
            // }
            case 'search_coupon':
            case 'search_note': {
                res = value;
                break;
            }
            case 'gen_id': {
                res = value;
                let gen = this.filter_data.gens.filter(g => g.id == value)[0] || {};

                this.filter.start_time = moment(gen.start_time);
                this.filter.end_time = moment(gen.end_time);
                break;
            }
            default: {
                res = value ? value.value : 0;
            }
        }
        this.filter[name] = res;
    };

    @action solveFilter(filter){
        if (isEmpty(filter)) filter = this.filter;
        // console.log(filter.campaign_id,this.filter.campaign_id);
        filter = {
            ...filter,
            start_time: filter.start_time.format(DATE_FORMAT_SQL),
            end_time: filter.end_time.format(DATE_FORMAT_SQL),
        };

        return filter
    }

    @action loadRegisters(filter) {
        this.isLoading = true;
        filter = this.solveFilter(filter);

        loadRegisters(filter).then(res => {
            console.log(res.data);
            this.registers = res.data.items;
            this.paginator = res.data.meta;
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

    @action changeCampaignRegister = (register) =>{
        this.registers = this.registers.map(r=>{
           return {...r,
               campaign_id: r.id == register.id ? register.campaign_id : r.campaign_id
           };
        });
    }

    @action
    loadFilterData = () => {
        this.isLoading = true;
        parallel({
            gens: (callback) => {
                loadGens().then((res) => {
                    this.filter_data.gens =[
                        {id: '', name: 'Tất cả', start_time: moment().subtract(10,'years'), end_time: moment(),},
                        {
                            id: 0, name: '30 ngày qua',
                            start_time: moment().subtract(30, 'days'),
                            end_time: moment(),
                        },
                        ...res.data.data.gens.map(gen => {
                        return {...gen, value: gen.id, label: 'Khóa ' + gen.name,};
                    })];
                    // const currentGen = this.filter_data.gens.filter((gen) => gen.id == res.data.data.current_gen.id)[0];

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
            courses: (callback) => {
                getCourseActiveApi().then((res) => {
                    this.filter_data.courses = [{value: 0, label: "Tất cả"},
                        ...res.data.courses.map(o => {
                            return {...o, value: o.id, label: o.name,};
                        })];

                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            },
            marketingCampaigns: (callback) => {
                getMarketingCampaignsApi().then((res) => {
                    this.filter_data.marketing_campaigns = [
                        defaultSelectObject,
                        defaultEmptySelectObject,
                        ...res.data.marketing_campaigns.map(o => {
                            return {...o, value: o.id, label: o.name,};
                        })];
                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            },
            statuses: (callback) => {
                loadStatuses(STATUS_REFS.registers).then((res) => {
                    this.filter_data.register_statuses = [{value: 0, label: "Tất cả"},
                        ...res.data.statuses.map(o => {
                            return {...o, value: o.id, label: o.name,};
                        })];
                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            },
            sources: (callback) => {
                loadSources().then((res) => {
                    this.filter_data.sources = [{value: 0, label: "Tất cả"},
                        ...res.data.sources.map(o => {
                            return {...o, value: o.id, label: o.name,};
                        })];
                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            },
            coupons: ()=>{
                loadDiscountsApi({limit:-1}).then((res)=>{
                    this.filter_data.coupons = res.data.coupons.map(c=>{
                        let type = DISCOUNTYPE.filter(t => t.id == c.discount_type)[0] || {};
                        let label = `${c.name} (-${c.discount_value}${type.suffix})`;
                        return {
                          ...c,
                            value: c.id, label,
                        };
                    });
                });
            }
        }).then(() => {
        }).finally(() => {
            this.isLoading = false;
        });


    };

    @action
    loadStaffs = (input, callback, field) => {
        if (isEmptyInput(this.timeOut)) this.timeOut = {};
        if (this.timeOut[field] !== null) {
            clearTimeout(this.timeOut[field]);
        }
        this.timeOut[field] = setTimeout(function () {
            findUser(input, true).then(res => {

                let data = [
                    defaultSelectObject,
                    defaultEmptySelectObject,
                    ...res.data.map((staff) => {
                        return {
                            ...staff,
                            ...{
                                value: staff.id,
                                label: staff.name
                            }
                        };
                    })
                ];


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
};