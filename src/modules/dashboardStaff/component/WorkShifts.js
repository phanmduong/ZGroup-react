import React, { Component } from "react";
import { store } from "../dashboardStaffStore";
import FormInputDate from "../../../components/common/FormInputDate";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { isEmptyInput, groupBy } from "../../../helpers/helper";
import Loading from "../../../components/common/Loading";
import _ from "lodash";

@observer
export default class WorkShifts extends Component {
    @observable startTime = "";
    @observable endTime = "";
    constructor(props) {
        super(props);
        this.updateFormFilter = this.updateFormFilter.bind(this);
    }

    updateFormFilter(event) {
        this[event.target.name] = event.target.value;

        if (!isEmptyInput(this.startTime) && !isEmptyInput(this.endTime)) {
            store.loadWorkShifts(this.startTime, this.endTime);
        }
    }

    statusAttendance(attendance) {
        switch (attendance.status) {
            case "absent":
                return (
                    <div className="btn btn-xs btn-danger min-width-80-px width-100">
                        <strong>-- : --</strong>
                    </div>
                );
            case "accept":
                return (
                    <div className="btn btn-xs btn-success min-width-80-px width-100">{attendance.time}</div>
                );
            case "no-accept":
                return (
                    <div className="btn btn-xs btn-warning min-width-80-px width-100">{attendance.time}</div>
                );
            case "none":
                return (
                    <div className="btn btn-xs btn-default min-width-80-px width-100">
                        <strong>-- : --</strong>
                    </div>
                );
            default:
                return (
                    <div className="btn btn-xs btn-default min-width-80-px width-100">
                        <strong>-- : --</strong>
                    </div>
                );
        }
    }

    render() {
        const workShifts = _.sortBy(
            groupBy(store.user.work_shifts, workShift => workShift.date, ["date", "work_shifts"]),
            ["date"]
        );
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
                                    <Loading />
                                ) : (
                                    <div>
                                        <div className="row">
                                            {workShifts.map(item => {
                                                return (
                                                    <div className="col-sm-6">
                                                        <div className="card">
                                                            <div className="card-content">
                                                                <h4 className="card-title">
                                                                    <strong>
                                                                        {item.work_shifts[0].date_vi}
                                                                    </strong>
                                                                </h4>
                                                                <div>
                                                                    <div className="table-responsive">
                                                                        <table className="table">
                                                                            <tbody>
                                                                                {item.work_shifts.map(
                                                                                    (workShift, index) => {
                                                                                        return (
                                                                                            <tr key={index}>
                                                                                                <td>
                                                                                                    <strong>
                                                                                                        {
                                                                                                            workShift.name
                                                                                                        }
                                                                                                    </strong>
                                                                                                </td>
                                                                                                <td>
                                                                                                    {`${
                                                                                                        workShift.start_shift_time
                                                                                                    } - ${
                                                                                                        workShift.end_shift_time
                                                                                                    }`}
                                                                                                </td>
                                                                                                <td>
                                                                                                    <div>
                                                                                                        {workShift &&
                                                                                                            this.statusAttendance(
                                                                                                                {
                                                                                                                    status:
                                                                                                                        workShift.checkin_status,
                                                                                                                    time:
                                                                                                                        workShift.check_in_time
                                                                                                                }
                                                                                                            )}
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td>
                                                                                                    {workShift &&
                                                                                                        this.statusAttendance(
                                                                                                            {
                                                                                                                status:
                                                                                                                    workShift.checkout_status,
                                                                                                                time:
                                                                                                                    workShift.check_out_time
                                                                                                            }
                                                                                                        )}
                                                                                                </td>
                                                                                            </tr>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
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
