/**
 * Created by Kiyoshitaro on 04/05/18.
 */
import React from 'react';
import Loading from '../../components/common/Loading';
import TooltipButton from '../../components/common/TooltipButton';
import {NO_AVATAR} from '../../constants/env';
import * as helper from '../../helpers/helper';
import store from "./ScheduleTeachingStore";
import _ from 'lodash';
import AttendanceTeacher from "./AttendanceTeacher";
import {Modal} from "react-bootstrap";
import {observer} from "mobx-react";


@observer
class ClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        let classData = store.classInModal ? store.classInModal : {};
        return (
            <Modal
                show={store.isShowClassModal}
                onHide={() => store.isShowClassModal = false}
                bsSize="large"
            >
                {store.isLoadingClass ? <Loading/> :
                    <div>
                        <Modal.Header closeButton>
                            <h3>
                                <strong>Thông tin lớp học
                                    &nbsp;{classData && classData.name}
                                </strong>
                            </h3>
                            <p>Lớp được tạo lúc <strong>
                                <small>
                                    {" " + classData && classData.created_at}
                                </small>
                            </strong></p>
                            <div className="flex flex-wrap">
                                {
                                    classData.teacher &&
                                    <TooltipButton text="Giảng viên"
                                                   placement="top"
                                    >
                                        <button className="btn btn-sm"
                                                style={{background: '#' + classData.teacher.color}}>
                                            {classData.teacher.name}
                                            <div className="ripple-container"/>
                                        </button>
                                    </TooltipButton>
                                }
                                {
                                    classData.teacher_assistant &&
                                    <TooltipButton text="Trơ giảng"
                                                   placement="top"
                                    >
                                        <button className="btn btn-sm"
                                                style={{background: '#' + classData.teacher_assistant.color}}>
                                            {classData.teacher_assistant.name}
                                            <div className="ripple-container"/>
                                        </button>
                                    </TooltipButton>
                                }
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-sm-7 col-md-8">

                                    <h4><strong>Danh sách học viên </strong></h4>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="text-rose">
                                            <tr>
                                                <th>ID</th>
                                                <th>Họ tên</th>
                                                <th>Tình trạng học</th>
                                                <th>Mã học viên</th>
                                                <th>Học phí</th>
                                                <th/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {_.reverse(_.sortBy(classData.registers, 'total_attendances')).map((register) => {
                                                let avatar = helper.avatarEmpty(register.student.avatar_url) ?
                                                    NO_AVATAR : register.student.avatar_url;
                                                return (
                                                    <tr key={register.id}>
                                                        <td>
                                                            <div style={{
                                                                background: "url('" + avatar + "') center center / cover",
                                                                display: 'inline-block',
                                                                width: '30px',
                                                                height: '30px',
                                                                borderRadius: '50%',
                                                                verticalAlign: 'middle'
                                                            }}
                                                            />
                                                        </td>
                                                        <td><a href={`/sales/info-student/${register.student.id}`}
                                                               className="text-name-student-register">
                                                            {register.student.name}
                                                        </a></td>
                                                        <td>
                                                            <h6>{register.total_attendances}/{register.attendances.length}</h6>
                                                            <div
                                                                className="progress progress-line-success progress-bar-table width-100">
                                                                <div className="progress-bar progress-bar-success"
                                                                     role="progressbar"
                                                                     aria-valuemin="0"
                                                                     aria-valuemax="100"
                                                                     style={{width: (100 * register.total_attendances / register.attendances.length) + '%'}}
                                                                >
                                                        <span
                                                            className="sr-only">{(100 * register.total_attendances / register.attendances.length)}%</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {
                                                                register.code &&
                                                                <TooltipButton
                                                                    text={register.received_id_card ? "Đã nhận thẻ" : "Chưa nhận thẻ"}
                                                                    placement="top"
                                                                >

                                                                    <button
                                                                        className={register.received_id_card ? "btn btn-xs btn-rose" : "btn btn-xs"}>
                                                                        {register.code}
                                                                        <div className="ripple-container"/>
                                                                    </button>
                                                                </TooltipButton>
                                                            }


                                                        </td>
                                                        <td className="text-center">
                                                            {
                                                                register.paid_status ?
                                                                    <TooltipButton
                                                                        text={register.note}
                                                                        placement="top"
                                                                    >
                                                                        <button
                                                                            className="btn btn-xs btn-main main-background-color"
                                                                        >
                                                                            {helper.dotNumber(register.money)} vnd
                                                                            <div className="ripple-container"/>
                                                                        </button>
                                                                    </TooltipButton>
                                                                    : 'Chưa nộp'
                                                            }
                                                        </td>

                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-sm-5 col-md-4">
                                    <div className="card-detail-btn-group">

                                        <div className="position-relative">
                                            <button className="btn btn-default card-detail-btn-action"><i
                                                className="material-icons">timer</i> Xem group lớp
                                            </button>
                                            <button className="btn btn-default card-detail-btn-action"><i
                                                className="material-icons">timer</i> Xếp bằng
                                            </button>
                                        </div>

                                    </div>
                                    <div>
                                        <div><h4><strong>Tình trạng điểm danh</strong></h4>
                                            {classData.attendances && classData.attendances.map(attendance => {
                                                return (
                                                    <div key={attendance.order}>
                                                        <h6>
                                                            <strong>Buổi {attendance.order} </strong>{attendance.total_attendance}/{classData.registers.length}
                                                        </h6>
                                                        <div
                                                            className="progress progress-line-success progress-bar-table width-100">
                                                            <div className="progress-bar progress-bar-success"
                                                                 role="progressbar"
                                                                 aria-valuemin="0"
                                                                 aria-valuemax="100"
                                                                 style={{width: (100 * attendance.total_attendance / classData.registers.length) + '%'}}
                                                            >
                                                    <span
                                                        className="sr-only">{100 * attendance.total_attendance / classData.registers.length}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                        {classData.teacher &&
                                        <div><h4><strong>Điểm danh giảng viên</strong></h4>
                                            {classData.teacher.attendances && classData.teacher.attendances.map((attendance, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <strong>Buổi {attendance.order} </strong>
                                                            {
                                                                attendance.staff &&
                                                                attendance.staff.name
                                                            }
                                                            <AttendanceTeacher
                                                                attendance={attendance}
                                                            />
                                                        </div>
                                                    )
                                                        ;
                                                }
                                            )}

                                        </div>
                                        }
                                        {classData.teacher_assistant &&
                                        <div><h4><strong>Điểm danh trợ giảng</strong></h4>
                                            {classData.teacher_assistant.attendances && classData.teacher_assistant.attendances.map((attendance, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <strong>Buổi {attendance.order} </strong>
                                                            {
                                                                attendance.staff &&
                                                                attendance.staff.name

                                                            }
                                                            <AttendanceTeacher
                                                                attendance={attendance}

                                                            />
                                                        </div>
                                                    );
                                                }
                                            )}

                                        </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </div>
                }
            </Modal>

        );
    }
}

export default ClassContainer;
