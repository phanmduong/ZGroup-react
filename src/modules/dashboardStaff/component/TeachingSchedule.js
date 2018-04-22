import React, { Component } from "react";
import { store } from "../dashboardStaffStore";
import FormInputDate from "../../../components/common/FormInputDate";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { isEmptyInput } from "../../../helpers/helper";
import Loading from "../../../components/common/Loading";

@observer
export default class TeachingSchedule extends Component {
    @observable startTime = "";
    @observable endTime = "";
    constructor(props) {
        super(props);
        this.updateFormFilter = this.updateFormFilter.bind(this);
    }

    updateFormFilter(event) {
        this[event.target.name] = event.target.value;

        if (!isEmptyInput(this.startTime) && !isEmptyInput(this.endTime)) {
            store.loadTeachingSchedule(this.startTime, this.endTime);
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
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-content">
                                <h4 className="card-title">
                                    <strong>Lịch giảng dạy</strong>
                                </h4>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <FormInputDate
                                            label="Từ ngày"
                                            name="startTime"
                                            updateFormData={this.updateFormFilter}
                                            id="form-teaching-schedule-start-time"
                                            value={this.startTime}
                                            maxDate={this.endTime}
                                        />
                                    </div>
                                    <div className="col-sm-3">
                                        <FormInputDate
                                            label="Đến ngày"
                                            name="endTime"
                                            updateFormData={this.updateFormFilter}
                                            id="form-teaching-schedule-end-time"
                                            value={this.endTime}
                                            minDate={this.startTime}
                                        />
                                    </div>
                                </div>
                                {store.isLoadingTeachingSchedule ? (
                                    <Loading />
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="text-rose">
                                                <tr>
                                                    <th />
                                                    <th>Lớp</th>
                                                    <th>Buổi</th>
                                                    <th>Ngày</th>
                                                    <th>Thời gian</th>
                                                    <th>Cơ sở</th>
                                                    <th>Phòng</th>
                                                    <th>Trạng thái</th>
                                                    <th>Checkin</th>
                                                    <th>Checkout</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {store.user.now_classes.map((classItem, index) => {
                                                    let attendance;
                                                    if (classItem.attendance_teachers) {
                                                        attendance = classItem.attendance_teachers.filter(
                                                            attendance =>
                                                                attendance.staff &&
                                                                attendance.staff.id == store.user.id
                                                        );
                                                        attendance =
                                                            attendance.length > 0 ? attendance[0] : undefined;
                                                    }

                                                    if (
                                                        attendance == undefined &&
                                                        classItem.attendance_teacher_assistants
                                                    ) {
                                                        const attendance_teacher_assistant = classItem.attendance_teachers.filter(
                                                            attendance =>
                                                                attendance.staff &&
                                                                attendance.staff.id == store.user.id
                                                        );
                                                        attendance =
                                                            attendance_teacher_assistant.length > 0
                                                                ? attendance_teacher_assistant[0]
                                                                : undefined;
                                                    }

                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <div
                                                                    className="avatar-list-staff"
                                                                    style={{
                                                                        background:
                                                                            "url(" +
                                                                            classItem.course.icon_url +
                                                                            ") center center / cover",
                                                                        display: "inline-block"
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>{classItem.name}</td>
                                                            <td>{classItem.order}</td>
                                                            <td>{classItem.time}</td>
                                                            <td>
                                                                {classItem.start_time} - {classItem.end_time}
                                                            </td>
                                                            <td>{classItem.room.base}</td>
                                                            <td>{classItem.room.name}</td>
                                                            <td>
                                                                <div>
                                                                    {classItem.total_paid +
                                                                        "/" +
                                                                        classItem.target}
                                                                </div>
                                                                <div className="progress progress-line-danger progress-bar-table">
                                                                    <div
                                                                        className="progress-bar"
                                                                        role="progressbar"
                                                                        aria-valuenow="60"
                                                                        aria-valuemin="0"
                                                                        aria-valuemax="100"
                                                                        style={{
                                                                            width:
                                                                                classItem.total_paid *
                                                                                100 /
                                                                                classItem.target
                                                                        }}>
                                                                        <span className="sr-only">
                                                                            {classItem.total_paid *
                                                                                100 /
                                                                                classItem.target}%
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    {attendance &&
                                                                        attendance.attendance &&
                                                                        this.statusAttendance({
                                                                            status:
                                                                                attendance.attendance
                                                                                    .checkin_status,
                                                                            time:
                                                                                attendance.attendance
                                                                                    .check_in_time
                                                                        })}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {attendance &&
                                                                    attendance.attendance &&
                                                                    this.statusAttendance({
                                                                        status:
                                                                            attendance.attendance
                                                                                .checkout_status,
                                                                        time:
                                                                            attendance.attendance
                                                                                .check_out_time
                                                                    })}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
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
