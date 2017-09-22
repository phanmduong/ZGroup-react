/**
 * Created by phanmduong on 9/21/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, IndexLink} from 'react-router';
import * as classActions from '../classActions';
import Loading from "../../../components/common/Loading";
import AttendanceTeacher from './AttendanceTeacher';
import {Modal} from 'react-bootstrap';
import TooltipButton from '../../../components/common/TooltipButton';
import FormInputText from '../../../components/common/FormInputText';
import FormInputDate from '../../../components/common/FormInputDate';

class ClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.classId = this.props.params.classId;
        this.path = '';
        this.state = {
            showModalClassLesson: false,
            showModalChangeTeacher: false,
            showModalChangeTeachAssis: false,
            classLessonSelected: {},
            teacherSelected: {},
            teachAssisSelected: {},
            changeDate: {
                date: '',
                note: '',
            }
        };
        this.closeModalClassLesson = this.closeModalClassLesson.bind(this);
        this.openModalClassLesson = this.openModalClassLesson.bind(this);
        this.closeModalChangeTeacher = this.closeModalChangeTeacher.bind(this);
        this.openModalChangeTeacher = this.openModalChangeTeacher.bind(this);
        this.closeModalTeachAssis = this.closeModalTeachAssis.bind(this);
        this.openModalTeachAssis = this.openModalTeachAssis.bind(this);
        this.changeClassLesson = this.changeClassLesson.bind(this);
    }

    componentWillMount() {
        this.props.classActions.loadClass(this.classId);
    }

    closeModalClassLesson() {
        this.setState({showModalClassLesson: false});
    }

    openModalClassLesson(classLesson) {
        this.setState(
            {
                showModalClassLesson: true,
                classLessonSelected: classLesson,
                changeDate: {
                    date: classLesson.class_lesson_time,
                    note: ''
                }
            }
        );
    }

    closeModalChangeTeacher() {
        this.setState({showModalChangeTeacher: false});
    }

    openModalChangeTeacher(teacher) {
        this.setState(
            {
                showModalChangeTeacher: true,
                teacherSelected: teacher
            }
        );
    }

    closeModalTeachAssis() {
        this.setState({showModalChangeTeachAssis: false});
    }

    openModalTeachAssis(teacher) {
        this.setState(
            {
                showModalChangeTeachAssis: true,
                teachAssisSelected: teacher
            }
        );
    }

    changeClassLesson() {
        this.props.classActions.changeClassLesson({
            note: this.state.changeDate.note,
            time: this.state.changeDate.date,
            id: this.state.classLessonSelected.class_lesson_id,
        }, this.closeModalClassLesson);
    }

    render() {
        this.path = this.props.location.pathname;
        let classData = this.props.class;
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header card-header-tabs" data-background-color="rose">
                                <div className="nav-tabs-navigation">
                                    <div className="nav-tabs-wrapper">
                                        <ul className="nav nav-tabs" data-tabs="tabs">
                                            <li className={this.path === `/class/${this.classId}` ? 'active' : ''}>
                                                <IndexLink to={`/class/${this.classId}`}>
                                                    <i className="material-icons">account_circle</i> Tổng quan

                                                    <div className="ripple-container"/>
                                                </IndexLink>
                                            </li>
                                            <li className={this.path === `/class/${this.classId}/history-teaching` ? 'active' : ''}>
                                                <Link to={`/class/${this.classId}/history-teaching`}>
                                                    <i className="material-icons">smartphone</i> Lịch sử giảng dạy
                                                    <div className="ripple-container"/>
                                                </Link>
                                            </li>
                                            <li className={this.path === `/class/${this.classId}/registers` ? 'active' : ''}>
                                                <Link to={`/class/${this.classId}/registers`}>
                                                    <i className="material-icons">create</i> Đăng kí
                                                    <div className="ripple-container"/>
                                                </Link>
                                            </li>
                                            <li className={this.path === `/class/${this.classId}/progress` ? 'active' : ''}>
                                                <Link to={`/class/${this.classId}/progress`}>
                                                    <i className="material-icons">create</i> Học tập
                                                    <div className="ripple-container"/>
                                                </Link>
                                            </li>
                                            <li className={this.path === `/class/${this.classId}/care` ? 'active' : ''}>
                                                <Link to={`/class/${this.classId}/care`}>
                                                    <i className="material-icons">flag</i> Quan tâm
                                                    <div className="ripple-container"/>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-content">
                                <div className="tab-content">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose"><i
                                        className="material-icons">announcement</i></div>
                                    <div className="card-content"><h4 className="card-title">Thông tin về điểm danh</h4>
                                        <div className="col-md-12">
                                            <div>
                                                <button className="btn btn-default width-100">
                                                    <i className="material-icons">timer</i>
                                                    Xem group lớp
                                                </button>
                                                <button className="btn btn-default width-100">
                                                    <i className="material-icons">timer</i>
                                                    Xếp bằng
                                                </button>
                                                <button className="btn btn-default width-100">
                                                    <i className="material-icons">timer</i>
                                                    In bằng
                                                </button>
                                            </div>
                                            {this.props.isLoadingClass ? <Loading/> :
                                                <div>
                                                    {classData.attendances &&
                                                    <div><h4><strong>Tình trạng điểm danh</strong></h4>
                                                        {classData.attendances.map(attendance => {
                                                            return (
                                                                <div key={attendance.order}>
                                                                    <div
                                                                        className="flex flex-row-center flex-space-between">
                                                                        <h6>
                                                                            <strong>Buổi {attendance.order} </strong>{attendance.total_attendance}/{classData.registers.length}
                                                                        </h6>
                                                                        {
                                                                            attendance.is_change &&
                                                                            <TooltipButton placement="top"
                                                                                           text="Đổi buổi"
                                                                            >
                                                                                <button className="btn btn-xs btn-round"
                                                                                        onClick={() => this.openModalClassLesson(attendance)}
                                                                                >
                                                                                    <i className="material-icons">compare_arrows</i>
                                                                                    <div className="ripple-container"/>
                                                                                </button>
                                                                            </TooltipButton>
                                                                        }
                                                                    </div>

                                                                    <div
                                                                        className="progress progress-line-success progress-bar-table width-100">
                                                                        <div
                                                                            className="progress-bar progress-bar-success"
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
                                                    }
                                                    {classData.teacher &&
                                                    <div><h4><strong>Điểm danh giảng viên</strong></h4>
                                                        {classData.teacher.attendances.map((attendance, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <div
                                                                            className="flex flex-row-center flex-space-between">
                                                                            <div>
                                                                                <strong>Buổi {attendance.order} </strong>
                                                                                {
                                                                                    attendance.staff &&
                                                                                    attendance.staff.name

                                                                                }
                                                                            </div>
                                                                            {
                                                                                attendance.is_change &&
                                                                                <TooltipButton placement="top"
                                                                                               text="Đổi giảng viên"
                                                                                >
                                                                                    <button
                                                                                        className="btn btn-xs btn-round"
                                                                                        onClick={this.openModalChangeTeacher}
                                                                                    >
                                                                                        <i className="material-icons">compare_arrows</i>
                                                                                        <div
                                                                                            className="ripple-container"/>
                                                                                    </button>
                                                                                </TooltipButton>
                                                                            }
                                                                        </div>
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
                                                                        <div
                                                                            className="flex flex-row-center flex-space-between">
                                                                            <div>
                                                                                <strong>Buổi {attendance.order} </strong>
                                                                                {
                                                                                    attendance.staff &&
                                                                                    attendance.staff.name

                                                                                }
                                                                            </div>
                                                                            {
                                                                                attendance.is_change &&
                                                                                <TooltipButton placement="top"
                                                                                               text="Đổi trợ giảng"
                                                                                >
                                                                                    <button className="btn btn-xs btn-round"
                                                                                            onClick={this.openModalTeachAssis}
                                                                                    >
                                                                                        <i className="material-icons">compare_arrows</i>
                                                                                        <div className="ripple-container"/>
                                                                                    </button>
                                                                                </TooltipButton>
                                                                            }

                                                                        </div>
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
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.state.showModalClassLesson}
                    onHide={this.props.isChangingClassLesson ? null : this.closeModalClassLesson}
                >
                    <Modal.Header closeButton={!this.props.isChangingClassLesson}>
                        <h4 className="modal-title">Đổi ngày học</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <FormInputDate
                                label="Chọn ngày"
                                value={this.state.changeDate.date}
                                updateFormData={(event) => this.setState({
                                    changeDate:
                                        {
                                            ...this.state.changeDate,
                                            date: event.target.value
                                        }
                                })}
                                id="form-change-date"
                                name="change-date"
                            />
                            <FormInputText
                                label="Ghi chú"
                                value={this.state.changeDate.note}
                                updateFormData={(event) => this.setState({
                                    changeDate:
                                        {
                                            ...this.state.changeDate,
                                            note: event.target.value
                                        }
                                })}
                                name="note-change-date"
                            />
                            {this.props.isChangingClassLesson ?
                                (
                                    <button type="button" className="btn btn-success btn-round disabled"
                                            onClick={this.changeClassLesson}
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang đổi
                                    </button>

                                )
                                :
                                (
                                    <button type="button" className="btn btn-success btn-round"
                                            onClick={this.changeClassLesson}
                                    ><i
                                        className="material-icons">check</i> Xác nhận đổi
                                    </button>
                                )

                            }

                            <button type="button"
                                    className={"btn btn-danger btn-round" + (this.props.isChangingClassLesson ? " disabled" : "")}
                                    onClick={this.props.isChangingClassLesson ? null : this.closeModalClassLesson}
                            ><i
                                className="material-icons">close</i> Huỷ
                            </button>


                        </form>
                    </Modal.Body>
                </Modal>
                <Modal
                    show={this.state.showModalChangeTeacher}
                    onHide={this.closeModalChangeTeacher}
                >
                    <Modal.Header>
                        <h4 className="modal-title">Đổi giảng viên</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <FormInputText label="Chọn giảng viên"/>
                            <FormInputText label="Ghi chú"/>
                            <button type="button" className="btn btn-success btn-round">
                                <i
                                    className="material-icons">check</i> Xác nhận đổi
                            </button>
                            <button type="button" className="btn btn-danger btn-round"
                                    onClick={this.closeModalChangeTeacher}
                            >
                                <i
                                    className="material-icons">close</i> Huỷ
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal
                    show={this.state.showModalChangeTeachAssis}
                    onHide={this.closeModalTeachAssis}
                >
                    <Modal.Header>
                        <h4 className="modal-title">Đổi trợ giảng</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <FormInputText label="Chọn trợ giảng"/>
                            <FormInputText label="Ghi chú"/>
                            <button type="button" className="btn btn-success btn-round"><i
                                className="material-icons">check</i> Xác nhận đổi
                            </button>
                            <button type="button" className="btn btn-danger btn-round"
                                    onClick={this.closeModalTeachAssis}
                            ><i
                                className="material-icons">close</i> Huỷ
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
        class: state.classes.class,
        isLoadingClass: state.classes.isLoadingClass,
        isChangingClassLesson: state.classes.isChangingClassLesson,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassContainer);
