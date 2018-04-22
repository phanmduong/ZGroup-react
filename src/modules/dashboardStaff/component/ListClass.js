/**
 * Created by phanmduong on 9/3/17.
 */
import React from "react";
import { store } from "../dashboardStaffStore";
import { getShortName } from "../../../helpers/helper";

class ListClass extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-content">
                                <h4 className="card-title">
                                    <strong>Danh sách lớp của bạn</strong>
                                </h4>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="text-rose">
                                            <tr>
                                                <th />
                                                <th>Lớp</th>
                                                <th>Khai giảng</th>
                                                <th>Lịch học</th>
                                                <th>Cơ sở</th>
                                                <th>Phòng</th>
                                                <th>Giảng viên</th>
                                                <th>Trợ giảng</th>
                                                <th>Trạng thái</th>
                                                <th>Số buổi đã dạy</th>

                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {store.user.classes.map((classItem, index) => {
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
                                                        <td>{classItem.datestart_vi}</td>
                                                        <td>{classItem.study_time}</td>
                                                        <td>{classItem.room.base}</td>
                                                        <td>{classItem.room.name}</td>
                                                        <td>
                                                            {classItem.teacher ? (
                                                                <a
                                                                    className="btn btn-xs btn-main"
                                                                    style={{
                                                                        backgroundColor:
                                                                            "#" + classItem.teacher.color
                                                                    }}
                                                                    href={
                                                                        "/teaching/classes/" +
                                                                        classItem.teacher.id
                                                                    }>
                                                                    {getShortName(classItem.teacher.name)}
                                                                    <div className="ripple-container" />
                                                                </a>
                                                            ) : (
                                                                <div className="no-data">Không có</div>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {classItem.teacher_assistant ? (
                                                                <a
                                                                    className="btn btn-xs btn-main"
                                                                    style={{
                                                                        backgroundColor:
                                                                            "#" +
                                                                            classItem.teacher_assistant.color
                                                                    }}
                                                                    href={
                                                                        "/teaching/classes/" +
                                                                        classItem.teacher_assistant.id
                                                                    }>
                                                                    {getShortName(
                                                                        classItem.teacher_assistant.name
                                                                    )}
                                                                    <div className="ripple-container" />
                                                                </a>
                                                            ) : (
                                                                <div className="no-data">Không có</div>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <h6>
                                                                {classItem.total_paid +
                                                                    "/" +
                                                                    classItem.target}
                                                            </h6>
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
                                                            <h6>
                                                                {classItem.number_learned +
                                                                    "/" +
                                                                    classItem.course.duration}
                                                            </h6>
                                                            <div className="progress progress-line-danger progress-bar-table">
                                                                <div
                                                                    className="progress-bar"
                                                                    role="progressbar"
                                                                    aria-valuenow="60"
                                                                    aria-valuemin="0"
                                                                    aria-valuemax="100"
                                                                    style={{
                                                                        width:
                                                                            classItem.number_learned *
                                                                            100 /
                                                                            classItem.course.duration
                                                                    }}>
                                                                    <span className="sr-only">
                                                                        {classItem.number_learned *
                                                                            100 /
                                                                            classItem.course.duration}%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListClass;
