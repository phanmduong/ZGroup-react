import {action, computed, observable} from "mobx";
import {loadGens} from "../dashboardApi";
import {showErrorNotification} from "../../../helpers/helper";
import moment from 'moment';
import {searchStaffs} from "../../lead/leadApi";
import {NO_AVATAR} from "../../../constants/env";
import {parallel} from "async";
import {getAllStatusesClass, getCourseActiveApi} from "./dashboardAcademyApi";

class FilterStore {
    @observable isLoading = true;
    @observable gens = [];
    @observable staffs = [];
    @observable teachers = [];
    @observable teaching_assistants = [];
    @observable courses = [];
    @observable class_statuses = [];
    @observable marketing_campaigns = [];

    @observable filter = {
        start_time: moment().subtract(30, 'days'),
        end_time: moment().subtract(0, 'days'),
        base_id: 0,
        teacher_id: 0,
        teaching_assistant_id: 0,
        course_id: 0,
        status_id: 0,
        campaign_id: 0,
        teacher: {value: 0, label: "Tất cả giảng viên", avatar_url: NO_AVATAR},
        teaching_assistant: {value: 0, label: "Tất cả trợ giảng", avatar_url: NO_AVATAR},
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
    get classStatusesData() {
        return [{value: 0, label: "Tất cả trạng thái"}, ...this.class_statuses.map(stt => {
            return {...stt, value: stt.id, label: stt.name};
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
    loadStaffs = (input, callback, field) => {
        if(this.timeOut == null){
            this.timeOut = {};
        }
        if (this.timeOut[field] !== null) {
            clearTimeout(this.timeOut[field]);
        }
        this.timeOut[field] = setTimeout(() => {
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
                // this[field] = staffs;
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
            class_statuses: (callback) => {
                getAllStatusesClass().then((res) => {
                    this.class_statuses = res.data.statuses;
                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            },

        }).then(() => {
        }).finally(() => {
            this.isLoading = false;
        });


    };
}

export default new FilterStore();
