import React from 'react';
import * as classActions from "../../classActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as attendanceActions from "../../../attendance/attendanceActions";
import AttendanceTeacher from "../AttendanceTeacher";
import TimePicker from "../../../../components/common/TimePicker";
import FormInputText from "../../../../components/common/FormInputText";
import {Modal} from 'react-bootstrap';

class ClassCheckinCheckoutContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.classId = this.props.params.classId;
        this.initState = {
            show: [],
            attendance: {},
            teacherSelected: {},
            changeTeacher: {},
            isLoading: false,
            showModalAddCheckinCheckout: false,
            showModalChangeTeacher: false,
        };
        this.state = this.initState;
    }

    addCheckinCheckout = (type, typeUser, attendanceData) => {
        if (this.props.user.role != 2) {
            return;
        }
        let attendance = {...this.state.attendance};
        attendance.type = type;
        attendance.typeUser = typeUser;
        attendance.userId = attendanceData.staff.id;
        attendance.classLessonId = attendanceData.class_lesson_id;
        this.setState({
            attendance: attendance,
            showModalAddCheckinCheckout: true
        });
    };

    updateModalAddCheckinCheckout = (event) => {
        const field = event.target.name;
        let attendance = {...this.state.attendance};
        attendance[field] = event.target.value;
        this.setState({
            attendance: attendance
        });
    };


    saveCheckinCheckout = () => {
        if ($('#add-checkin-checkout').valid()) {
            this.props.classActions.addCheckinCheckout(
                this.state.attendance.type,
                this.state.attendance.typeUser,
                this.state.attendance.userId,
                this.state.attendance.classLessonId,
                this.state.attendance.time,
                this.state.attendance.comment,
                this.addCheckinCheckoutSuccess);
        }
    };

    addCheckinCheckoutSuccess = () => {
        this.setState({showModalAddCheckinCheckout: false});
        this.props.classActions.loadClass(this.classId);
    };

    render() {
        let {classData, isLoading} = this.props;
        // let {} = this.state;
        return (
            <div>

                <div className="table-responsive table-split margin-bottom-20">
                    <div className="margin-top-10 margin-bottom-10"><b>Giảng viên</b></div>
                    <table className="table" cellSpacing="0" id="list_register">
                        <tbody>
                        {!isLoading && classData.teacher &&
                        classData.teacher.attendances.map((attendance, key) => {
                            let className = attendance.attendance && attendance.attendance.check_in_time && attendance.attendance.check_out_time ? "success" : "";
                            return (

                                <tr key={key} className={className}>
                                    <td>
                                        <b>Buổi {attendance.order}</b>
                                    </td>
                                    <td style={{minWidth: 100}}>{attendance.staff && attendance.staff.name}</td>
                                    <td>
                                        <div>
                                            {attendance.start_teaching_time} - {attendance.end_teaching_time}

                                        </div>
                                    </td>
                                    <td>
                                        <AttendanceTeacher
                                            attendance={attendance}
                                            addCheckinCheckout={this.addCheckinCheckout}
                                            type={"teacher"}
                                        />
                                    </td>
                                </tr>

                            );
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive table-split">
                    <div className="margin-top-10 margin-bottom-10"><b>Trợ giảng</b></div>
                    <table className="table" cellSpacing="0" id="list_register">
                        <tbody>
                        {!isLoading && classData.teacher_assistant &&
                        classData.teacher_assistant.attendances.map((attendance, key) => {
                            let className = attendance.attendance && attendance.attendance.check_in_time && attendance.attendance.check_out_time ? "success" : "";
                            return (

                                <tr key={key} className={className}>
                                    <td>
                                        <b>Buổi {attendance.order}</b>
                                    </td>
                                    <td style={{minWidth: 100}}>{attendance.staff && attendance.staff.name}</td>
                                    <td>
                                        <div>
                                            {attendance.start_teaching_time} - {attendance.end_teaching_time}

                                        </div>
                                    </td>
                                    <td>
                                        <AttendanceTeacher
                                            attendance={attendance}
                                            addCheckinCheckout={this.addCheckinCheckout}
                                            type={"teaching_assistant"}
                                        />
                                    </td>
                                </tr>

                            );
                        })}
                        </tbody>
                    </table>
                </div>
                <Modal
                    show={this.state.showModalAddCheckinCheckout}
                    onHide={() => {
                        this.setState({showModalAddCheckinCheckout: false});
                    }}
                >
                    <Modal.Header>
                        <h4 className="modal-title">Thêm checkin - checkout</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form
                            id="add-checkin-checkout"
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}>
                            <TimePicker
                                label="Chọn thời gian"
                                value={this.state.attendance.start_time}
                                onChange={this.updateModalAddCheckinCheckout}
                                name="time"
                                id="start_time1"
                            />
                            <FormInputText
                                label="Lý do"
                                name="comment"
                                value={this.state.attendance.comment}
                                updateFormData={this.updateModalAddCheckinCheckout}
                                required
                            />
                            <button type="button"
                                    className={"btn btn-primary " + (this.props.isAddingCheckinCheckout ? " disabled" : "")}
                                    onClick={this.saveCheckinCheckout}
                            >
                                {this.props.isAddingCheckinCheckout ? "Đang lưu" : "Lưu"}
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        classData: state.classes.class,
        isLoading: state.classes.isLoading,
        isAddingCheckinCheckout: state.classes.isAddingCheckinCheckout,
        isLoadingLessonDetailModal: state.attendance.isLoadingLessonDetailModal,
        isTakingAttendance: state.attendance.isTakingAttendance,
        user: state.login.user,
        lesson: state.attendance.lesson,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceActions: bindActionCreators(attendanceActions, dispatch),
        classActions: bindActionCreators(classActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassCheckinCheckoutContainer);
