import React, {Component} from "react";
import {store} from "../dashboardStaffStore";
import FormInputDate from "../../../components/common/FormInputDate";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {isEmptyInput} from "../../../helpers/helper";
import Loading from "../../../components/common/Loading";
// import _ from "lodash";
import Calendar from "../../../components/common/Calendar";
import moment from "moment";

function convertTime(time){
    return time.slice(3,5) + "/" + time.slice(0,2) + "/" + time.slice(6,10);
}

@observer
export default class WorkShifts extends Component {
    constructor(props) {
        super(props);
        this.updateFormFilter = this.updateFormFilter.bind(this);
    }

    @observable startTime = moment().startOf('week').add(1,'days').subtract(2,"months").format("YYYY-MM-DD");
    @observable endTime = moment().endOf('week').add(1,'days').format("YYYY-MM-DD");

    updateFormFilter(event) {
        this[event.target.name] = event.target.value;
        if (!isEmptyInput(this.startTime) && !isEmptyInput(this.endTime)) {
            store.loadWorkShifts(this.startTime, this.endTime);
        }
    }

    render() {
        // const workShifts = _.sortBy(
        //     groupBy(store.user.work_shifts, workShift => workShift.date, ["date", "work_shifts"]),
        //     ["date"]
        // );

        const workShifts = store.user.work_shifts.map((workShift) => {
            return {
                title: (workShift.checkout_status === "accept" || workShift.checkout_status === "no-accept") ?
                   workShift.check_out_time : "-- : --",
                start: convertTime(workShift.date) + " " + workShift.start_shift_time,
                end: convertTime(workShift.date) + " " + workShift.start_shift_time,
                color: (workShift.checkout_status === "absent" ?
                    "#F10039" : (workShift.checkout_status === "accept" ?
                        "#00B34E" : (workShift.checkout_status === "no-accept") ?
                            "#E9A700" : "#596268"))
            };
        });

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-content">
                                <h4 className="card-title">
                                    <strong>Lịch làm việc của bạn</strong>
                                </h4>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <FormInputDate
                                            label="Từ ngày"
                                            name="startTime"
                                            updateFormData={this.updateFormFilter}
                                            id="form-word-shift-start-time"
                                            value={this.startTime}
                                            maxDate={this.endTime}
                                        />
                                    </div>
                                    <div className="col-sm-3">
                                        <FormInputDate
                                            label="Đến ngày"
                                            name="endTime"
                                            updateFormData={this.updateFormFilter}
                                            id="form-word-shift-end-time"
                                            value={this.endTime}
                                            minDate={this.startTime}
                                        />
                                    </div>
                                </div>
                                {store.isLoadingWorkShifts ? (
                                    <Loading/>
                                ) : (
                                    <div>
                                        <div className="card">
                                            <div className="card-content">
                                                <Calendar
                                                    id={"room-calender"}
                                                    calendarEvents={workShifts}
                                                     onClick={(e) => {
                                                         e.preventDefault();
                                                    }}
                                                    // onClickDay={day => {
                                                    //     self.openModalBooking(day, room);
                                                    // }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
