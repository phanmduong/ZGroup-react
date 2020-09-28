/**
 * Created by Kiyoshitaro on 04/05/18.
 */

import {observable, action, computed} from "mobx";
import {isEmptyInput, showErrorNotification} from "../../helpers/helper";
import * as scheduleTeachingApis from "./scheduleTeachingApis";
import {findClass} from "../registerStudentsV2/registerListApi";
import {TYPE_CLASSES} from "../../constants/constants";
import {findUser} from "../registerStudentsV3/registerListApi";
import {NO_AVATAR} from "../../constants/env";
const defaultSelectObject = {id :'', avatar_url: NO_AVATAR,name:'Tất cả', label:'Tất cả', value:''};
const defaultEmptySelectObject = {id :'-1', avatar_url: NO_AVATAR, name:'Không có', label:'Không có', value:''};
export default new class ScheduleTeachingStore {
    @observable isLoadingClasses = false;
    @observable isLoadingGens = false;
    @observable isLoadingBases = false;
    @observable isShowClassModal = false;
    @observable isLoadingClass = false;
    @observable classInModal = {};

    @observable currentGen = 0;
    @observable gens = [];
    @observable bases = [];
    @observable courses = [];

    @observable filter = {
        course_id: 0,
        gen_id: 0,
        base_id: 0,
        teacher_id: 0,
        province_id: 0,
        class_type: 0,
        start_time: 0,
        end_time: 0,
    };

    @action
    loadClasses() {
        this.isLoadingClasses = true;
        scheduleTeachingApis.loadClassesApi(this.filter)
            .then((res) => {
                this.classes = res.data.data.classes;
                this.isLoadingClasses = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingClasses = false;
            });

    }

    @action
    loadClass(classId) {
        this.isLoadingClass = true;
        scheduleTeachingApis.loadClass(classId)
            .then((res) => {
                this.classInModal = res.data.data.class;
                this.isLoadingClass = false;
            })
            .catch(() => {
                this.isLoadingClass = false;
            });
    }

    @action
    loadGens() {
        this.isLoadingGens = true;
        scheduleTeachingApis.loadGens()
            .then((res) => {
                this.isLoadingGens = false;
                this.gens = res.data.data.gens;
                this.gen_id = res.data.data.current_gen.id;
                // console.log(this.gen_id ,"xxxxxxxx",res.data.data.current_gen);
                this.loadClasses();
            })
            .catch(() => {
                this.isLoadingGens = false;
            });
    }

    @action
    loadBases() {
        this.isLoadingBases = true;
        scheduleTeachingApis.loadBases()
            .then((res) => {
                this.isLoadingBases = false;
                this.bases = res.data.data.bases;
            })
            .catch(() => {
                this.isLoadingBases = false;
            });
    }
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
    searchCourses = (input, callback) => {
        if (isEmptyInput(this.timeOut)) this.timeOut = {};
        if (this.timeOut.courses !== null) {
            clearTimeout(this.timeOut.courses);
        }
        this.timeOut.courses = setTimeout(function () {
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
    
    @computed
    get classStatuses() {
        return  TYPE_CLASSES.map(function (obj) {
            return {
                id: obj.value,
                key: obj.value,
                value: obj.label,
            };
        });
    }
    @computed
    get gensData() {
        return  this.gens.map(function (gen) {
            return {
                ...gen,
                key: gen.id,
                value: "Khóa " + gen.name,
            };
        });
    }

    @computed
    get basesData() {
        let basesData = this.bases.map(function (base) {
            return {
                ...base,
                key: base.id,
                value:  base.name,
            };
        });
        return [
            {
                key: 0,
                value: "Tất cả cơ sở"
            },
            ...basesData,
        ];
    }


}();