import {action, observable} from "mobx";
import {isEmptyInput} from "../../../helpers/helper";
import {createScheduleApi} from "./scheduleApi";

class Store {
    @observable days = DAY_OF_WEEK;
    @observable name = "";
    @observable isLoading = false;

    constructor() {
    }

    @action
    createSchedule(callback) {
        this.isLoading = true;
        let studySessions = this.days.sort((a,b)=>a.order > b.order)
            .filter((day) => !isEmptyInput(day.start_time) && !isEmptyInput(day.end_time))
            .map((day) => {
                return {
                    weekday: day.value,
                    start_time: day.start_time,
                    end_time: day.end_time,
                };
            });
        createScheduleApi(this.name, studySessions).then((res) => {
            callback(res.data.schedule);
        }).finally(() => {
            this.isLoading = false;
        });
    }
}

export default Store;


const DAY_OF_WEEK = [
    {
        order: 1,
        key: 'T2',
        value: "Thứ hai",
        start_time: "",
        end_time: "",
        selected: false
    }, {
        order: 2,
        key: 'T3',
        value: "Thứ ba",
        start_time: "",
        end_time: "",
        selected: false
    }, {
        order: 3,
        key: 'T4',
        value: "Thứ tư",
        start_time: "",
        end_time: "",
        selected: false
    }, {
        order: 4,
        key: 'T5',
        value: "Thứ năm",
        start_time: "",
        end_time: "",
        selected: false
    }, {
        order: 5,
        key: 'T6',
        value: "Thứ sáu",
        start_time: "",
        end_time: "",
        selected: false
    }, {
        order: 6,
        key: 'T7',
        value: "Thứ bảy",
        start_time: "",
        end_time: "",
        selected: false
    }, {
        order: 7,
        key: 'CN',
        value: "Chủ nhật",
        start_time: "",
        end_time: "",
        selected: false
    },
];