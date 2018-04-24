import React, { Component } from "react";
import { store } from "../dashboardStaffStore";
import FormInputDate from "../../../components/common/FormInputDate";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { isEmptyInput, groupBy } from "../../../helpers/helper";
import Loading from "../../../components/common/Loading";
import _ from "lodash";

@observer
export default class Shifts extends Component {
    @observable startTime = "";
    @observable endTime = "";
    constructor(props) {
        super(props);
        this.updateFormFilter = this.updateFormFilter.bind(this);
    }

    updateFormFilter(event) {
        this[event.target.name] = event.target.value;

        if (!isEmptyInput(this.startTime) && !isEmptyInput(this.endTime)) {
            store.loadShifts(this.startTime, this.endTime);
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
        const shifts = _.sortBy(groupBy(store.user.shifts, shift => shift.date, ["date", "shifts"]), [
            "date"
        ]);
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-content">
                                <h4 className="card-title">
                                    <strong>Lịch trực của bạn</strong>
                                </h4>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <FormInputDate
                                            label="Từ ngày"
                                            name="startTime"
                                            updateFormData={this.updateFormFilter}
                                            id="form-shift-start-time"
                                            value={this.startTime}
                                            maxDate={this.endTime}
                                        />
                                    </div>
                                    <div className="col-sm-3">
                                        <FormInputDate
                                            label="Đến ngày"
                                            name="endTime"
                                            updateFormData={this.updateFormFilter}
                                            id="form-shift-end-time"
                                            value={this.endTime}
                                            minDate={this.startTime}
                                        />
                                    </div>
                                </div>
                                {store.isLoadingShifts ? (
                                    <Loading />
                                ) : (
                                    <div>
                                        <div className="row">
                                            {shifts.map(item => {
                                                return (
                                                    <div className="col-sm-6">
                                                        <div className="card">
                                                            <div className="card-content">
                                                                <h4 className="card-title">
                                                                    <strong>{item.shifts[0].date_vi}</strong>
                                                                </h4>
                                                                <div>
                                                                    <div className="table-responsive">
                                                                        <table className="table">
                                                                            <tbody>
                                                                                {item.shifts.map(
                                                                                    (shift, index) => {
                                                                                        return (
                                                                                            <tr key={index}>
                                                                                                <td>
                                                                                                    <strong>
                                                                                                        {
                                                                                                            shift.name
                                                                                                        }
                                                                                                    </strong>
                                                                                                </td>
                                                                                                <td>
                                                                                                    {`${
                                                                                                        shift.start_shift_time
                                                                                                    } - ${
                                                                                                        shift.end_shift_time
                                                                                                    }`}
                                                                                                </td>
                                                                                                <td>
                                                                                                    <div>
                                                                                                        {shift &&
                                                                                                            this.statusAttendance(
                                                                                                                {
                                                                                                                    status:
                                                                                                                        shift.checkin_status,
                                                                                                                    time:
                                                                                                                        shift.check_in_time
                                                                                                                }
                                                                                                            )}
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td>
                                                                                                    {shift &&
                                                                                                        this.statusAttendance(
                                                                                                            {
                                                                                                                status:
                                                                                                                    shift.checkout_status,
                                                                                                                time:
                                                                                                                    shift.check_out_time
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
