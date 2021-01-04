/**
 * Created by Kiyoshitaro on 04/05/18.
 */

import {observable, action, computed} from "mobx";
import {isEmptyInput, showErrorNotification, showWarningNotification} from "../../helpers/helper";
import * as scheduleTeachingApis from "./scheduleTeachingApis";
import {findClass} from "../registerStudentsV2/registerListApi";
import {TYPE_CLASSES} from "../../constants/constants";
import {findUser} from "../registerStudentsV3/registerListApi";
import {NO_AVATAR} from "../../constants/env";
import moment from "moment";
import * as roomApi from "../roomRegisterListTrongDong/roomApi";

const defaultSelectObject = {id: '', avatar_url: NO_AVATAR, name: 'Tất cả', label: 'Tất cả', value: 'Tất cả'};
// const defaultEmptySelectObject = {id :'-1', avatar_url: NO_AVATAR, name:'Không có', label:'Không có', value:''};
export default new class ScheduleTeachingStore {
    @observable isLoadingClasses = false;
    // @observable isLoadingGens = false;
    // @observable isLoadingBases = false;
    @observable isShowClassModal = false;
    @observable isLoadingClass = false;
    @observable classInModal = {};

    // @observable currentGen = 0;
    // @observable gens = [];
    // @observable bases = [];
    @observable courses = [];
    @observable rooms = [];

    @observable filter = {
        room_id: '',
        course_id: '',
        // gen_id: '',
        base_id: '',
        teacher_id: '',
        province_id: '',
        type: '',
        start_time: moment().subtract(30, 'days'),
        end_time: moment(),
    };

    @action
    loadClasses() {
        if (this.isLoadingClasses) return;
        let filter = {
            ...this.filter,
            // lesson_start_time: this.filter.start_time.format(DATE_FORMAT_SQL),
            // lesson_end_time: this.filter.end_time.format(DATE_FORMAT_SQL),
        };
        this.isLoadingClasses = true;
        scheduleTeachingApis.loadClassesApi(filter)
            .then((res) => {
                this.classes = res.data.data.classes;
                if(this.classes.length == 0) showWarningNotification("Không có lớp học phù hợp.");
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

    // @action
    // loadGens() {
    //     this.isLoadingGens = true;
    //     scheduleTeachingApis.loadGens()
    //         .then((res) => {
    //             this.isLoadingGens = false;
    //             this.gens = res.data.data.gens;
    //             // this.gen_id = res.data.data.current_gen.id;
    //             // console.log(this.gen_id ,"xxxxxxxx",res.data.data.current_gen);
    //             // this.loadClasses();
    //         })
    //         .catch(() => {
    //             this.isLoadingGens = false;
    //         });
    // }

    // @action
    // loadBases() {
    //     this.isLoadingBases = true;
    //     scheduleTeachingApis.loadBases()
    //         .then((res) => {
    //             this.isLoadingBases = false;
    //             this.bases = res.data.data.bases;
    //         })
    //         .catch(() => {
    //             this.isLoadingBases = false;
    //         });
    // }

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
                    // defaultEmptySelectObject,
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
        return [{
            id: '',
            avatar_url: NO_AVATAR,
            name: 'Tất cả trạng thái',
            label: 'Tất cả trạng thái',
            value: 'Tất cả trạng thái'
        },...TYPE_CLASSES.map(function (obj) {
                return {
                    id: obj.value,
                    key: obj.value,
                    value: obj.label,
                };
            })];
    }
    @action
    loadRooms() {
        roomApi.loadRooms()
            .then((res) => {
                this.rooms =  res.data.data.rooms;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
            });
    }

    @computed
    get roomsData() {
        let roomsData = this.rooms.map(function (rooms) {
            return {
                ...rooms,
                key: rooms.id,
                value: rooms.name,
            };
        });
        return [
            {
                id: '',
                key: 0,
                value: 0,
                name: "T.cả phòng",
            },
            ...roomsData,
        ];
    }
    // @computed
    // get gensData() {
    //     return [
    //         {
    //             id: null, avatar_url: NO_AVATAR,
    //             name: '30 ngày qua',
    //             value: '30 ngày qua',
    //             label: 'Tất cả',
    //             start_time: moment().subtract(30, 'days'),
    //             end_time: moment(),
    //         },
    //         ...this.gens.map(function (gen) {
    //             return {
    //                 ...gen,
    //                 key: gen.id,
    //                 value: "Khóa " + gen.name,
    //                 start_time: moment(gen.start_time, DATETIME_FORMAT_SQL),
    //                 end_time: moment(gen.end_time, DATETIME_FORMAT_SQL),
    //             };
    //         })
    //     ];
    // }

    // @computed
    // get basesData() {
    //     let basesData = this.bases.map(function (base) {
    //         return {
    //             ...base,
    //             key: base.id,
    //             value: base.name,
    //         };
    //     });
    //     return [
    //         {
    //             key: 0,
    //             value: "Tất cả cơ sở"
    //         },
    //         ...basesData,
    //     ];
    // }


}();