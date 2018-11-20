/**
 * Created by kiyoshitaro .
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as dashboardActions from './dashboardActions';
import Loading from '../../components/common/Loading';
import TooltipButton from '../../components/common/TooltipButton';
import {NO_AVATAR} from '../../constants/env';
import * as helper from '../../helpers/helper';
import _ from 'lodash';
import AttendanceTeacher from './AttendanceTeacher';

class ClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    genCerti = () => {
        const classId = this.props.class.id;
        this.props.dashboardActions.genCerti(classId);
    };

    render() {
        // console.log(this.props.class,"class");
        if (this.props.isLoadingClass) {
            return (
                <Loading/>
            );
        } else {
            let classData = this.props.class;
            return (
                <div className="row">
                    <div className="col-sm-7 col-md-8">

                        <h4><strong>Danh sách học viên </strong></h4>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className={"flex"}>
                                    <div
                                        style={{
                                            background: '#ffffff',
                                            border: 'solid 1px',
                                            height: '15px',
                                            width: '30px',
                                            margin: '3px 10px'
                                        }}/>
                                    < p> Chưa đóng tiền</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className={"flex"}>
                                    <div style={{
                                        background: '#dff0d8',
                                        height: '15px',
                                        width: '30px',
                                        margin: '3px 10px'
                                    }}/>
                                    <p>Đã nộp tiền</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className={"flex"}>
                                    <div
                                        style={{
                                            background: '#fcf8e3',
                                            height: '15px',
                                            width: '30px',
                                            margin: '3px 10px'
                                        }}/>
                                    <p>Danh sách chờ</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className={"flex"}>
                                    <div style={{
                                        background: '#f2dede',
                                        height: '15px',
                                        width: '30px',
                                        margin: '3px 10px'
                                    }}/>
                                    <p> Đang bảo lưu</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className={"flex"}>
                                    <div style={{
                                        background: '#daedf7',
                                        height: '15px',
                                        width: '30px',
                                        margin: '3px 10px'
                                    }}/>
                                    <p>Đang học lại</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className={"flex"}>
                                    <div style={{
                                        background: '#8c8c8c',
                                        height: '15px',
                                        width: '30px',
                                        margin: '3px 10px'
                                    }}/>
                                    <p>Đã học xong</p>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="text-rose">
                                <tr>
                                    <th>ID</th>
                                    <th>Họ tên</th>
                                    <th>Tình trạng học</th>
                                    <th>Mã học viên</th>
                                    <th>Học phí</th>
                                    <th>Bằng</th>
                                    <th>Thiết bị</th>
                                </tr>
                                </thead>
                                <tbody>
                                {_.reverse(_.sortBy(classData.registers, 'total_attendances')).map((register) => {
                                    let avatar = helper.avatarEmpty(register.student.avatar_url) ?
                                        NO_AVATAR : register.student.avatar_url;
                                    let color = "";
                                    switch (register.status) {
                                        case 1:
                                            color = "success";
                                            break;
                                        case 2:
                                            color = "warning";
                                            break;
                                        case 3:
                                            color = "danger";
                                            break;
                                        case 4:
                                            color = "info";
                                            break;
                                        case 5:
                                            color = "gray";
                                            break;
                                    }
                                    return (
                                        <tr key={register.id} className={color}>
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
                                            <td><h6>{register.total_attendances}/{register.attendances.length}</h6>
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
                                            <td>
                                                {
                                                    register.certificate || "Chưa xét"
                                                }
                                            </td>
                                            <td>
                                                <div  style={{display: "flex"}}>
                                                    {
                                                        register.student.devices && register.student.devices.map((dv, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <TooltipButton
                                                                        text={"Name: " + dv.name + " Os: " + dv.os + " Device_id: " + dv.device_id}
                                                                        placement="top"
                                                                    >
                                                                        {
                                                                            (dv.os.toLowerCase().search("pple") !== -1) || (dv.os.toLowerCase().search("ios") !== -1) ?

                                                                                <img
                                                                                    style={{height: 24, width: 24,cursor:"pointer"}}
                                                                                    src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1528267590z7F1mpbo0YspRmU.png"
                                                                                    alt=""/>

                                                                                :
                                                                                <i className="material-icons" style={{cursor:"pointer"}}>
                                                                                    android
                                                                                </i>

                                                                        }
                                                                    </TooltipButton>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>

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
                                <button
                                    onClick={this.genCerti}
                                    className="btn btn-default card-detail-btn-action"><i
                                    className="material-icons">timer</i> Xếp bằng
                                </button>
                            </div>

                        </div>
                        <div>
                            <div><h4><strong>Tình trạng điểm danh</strong></h4>
                                {classData.attendances.map(attendance => {
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
                                {classData.teacher.attendances.map((attendance, index) => {
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
                                {classData.teacher_assistant.attendances.map((attendance, index) => {
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
            );
        }
    }
}

ClassContainer.propTypes = {
    class: PropTypes.object.isRequired,
    isLoadingClass: PropTypes.bool.isRequired,
    dashboardActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        class: state.dashboard.class,
        isLoadingClass: state.dashboard.isLoadingClass,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(dashboardActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassContainer);
