/**
 * Created by phanmduong on 9/21/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {IndexLink, Link} from 'react-router';
import * as classActions from '../classActions';
import Loading from "../../../components/common/Loading";
import {Modal} from 'react-bootstrap';
import FormInputText from '../../../components/common/FormInputText';
import FormInputDate from '../../../components/common/FormInputDate';
import Select from 'react-select';
import PropTypes from 'prop-types';
import ItemReactSelect from '../../../components/common/ItemReactSelect';
import * as helper from '../../../helpers/helper';
import moment from "moment";
import {DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT, DATETIME_FORMAT_SQL} from '../../../constants/constants';
import {NO_AVATAR} from "../../../constants/env";
import TimePicker from "../../../components/common/TimePicker";
import AddClassContainer from "../AddClassContainer";
import ExportClassOverlay from "../overlays/ExportClassOverlay";
import CreateRegisterOverlay from "../../infoStudent/overlays/CreateRegisterOverlay";
import Checkbox from "../../../components/common/Checkbox";
import ChangeTeachMultiLessonOverlay from "../overlays/ChangeTeachMultiLessonOverlay";
import {isEmpty} from "../../../helpers/entity/mobx";

class ClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.classId = this.props.params.classId;
        this.path = '';
        this.routePrefix = `/teaching/class/${this.classId}`;
        this.routes = [
            {
                path: `${this.routePrefix}`, text: 'Danh sách học viên',
            },
            {
                path: `${this.routePrefix}/history-teaching`, text: 'Syllabus',
            },
            // {
            //     path: `${this.routePrefix}/progress`, text: 'Điểm danh',
            // },
            {
                path: `${this.routePrefix}/score`, text: 'Điểm học viên',
            },
            {
                path: `${this.routePrefix}/checkin-checkout`, text: 'Chấm công',
            },
        ];
        this.state = {
            showModalClassLesson: false,
            showModalChangeTeacher: false,
            showModalChangeTeachAssis: false,
            showModalTeachingLesson: false,
            showModalChangeTeachingLesson: false,
            showModalClass: false,
            classSelected: {...this.props.class},
            classLessonSelected: {},
            teacherSelected: {},
            teachAssisSelected: {},
            changeDate: {
                date: '',
                note: '',
            },
            changeTeachAssis: {
                id: '',
                note: ''
            },
            changeTeacher: {
                id: '',
                note: ''
            },
            changeTeachingLesson: {
                id: '',
                note: ''
            },
            staffs: [],
            linkDriver: "",
            typeTeachingLesson: 1,
            attendanceSelected: {},
            oldTeachingId: '',
            attendance: {},
            showModalAddCheckinCheckout: false
        };
        this.closeModalClassLesson = this.closeModalClassLesson.bind(this);
        this.openModalClassLesson = this.openModalClassLesson.bind(this);
        this.closeModalTeachingLesson = this.closeModalTeachingLesson.bind(this);
        this.openModalTeachingLesson = this.openModalTeachingLesson.bind(this);
        this.closeModalChangeTeacher = this.closeModalChangeTeacher.bind(this);
        this.openModalChangeTeacher = this.openModalChangeTeacher.bind(this);
        this.closeModalChangeTeachingLesson = this.closeModalChangeTeachingLesson.bind(this);
        this.openModalChangeTeachingLesson = this.openModalChangeTeachingLesson.bind(this);
        this.closeModalTeachAssis = this.closeModalTeachAssis.bind(this);
        this.openModalTeachAssis = this.openModalTeachAssis.bind(this);
        this.changeClassLesson = this.changeClassLesson.bind(this);
        this.changeTeachingAssis = this.changeTeachingAssis.bind(this);
        this.changeTeacher = this.changeTeacher.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.exportAttendanceExcel = this.exportAttendanceExcel.bind(this);
        this.changeLinkDriver = this.changeLinkDriver.bind(this);
        this.submitLinkDriver = this.submitLinkDriver.bind(this);
        this.changeTeachingLesson = this.changeTeachingLesson.bind(this);
    }

    componentWillMount() {
        this.props.classActions.loadClass(this.classId);
        this.props.classActions.loadStaffs();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingStaffs !== this.props.isLoadingStaffs && !nextProps.isLoadingStaffs) {
            let dataStaffs = [];
            nextProps.staffs.forEach(staff => {
                dataStaffs.push({
                    ...staff, ...{
                        value: staff.id,
                        label: staff.name
                    }
                });
            });
            this.setState({staffs: dataStaffs});
        }
    }

    openModalEditClass = () => {
        let classData = {...this.props.class};
        let data = {
            id: classData.id,
            name: classData.name,
            description: classData.description,
            target: classData.target,
            regis_target: classData.regis_target,
            study_time: classData.study_time,
            gen_id: classData.gen ? classData.gen.id : '',
            course_id: classData.course ? classData.course.id : '',
            teacher_assis_id: classData.teacher_assistant ? classData.teacher_assistant.id : '',
            teacher_id: classData.teacher ? classData.teacher.id : '',
            schedule_id: classData.schedule_id,
            link_drive: classData.link_drive,
            type: classData.type,
            status: classData.status,
            datestart: classData.datestart_en,
            date_end: classData.date_end,
            enroll_end_date: classData.enroll_end_date,
            enroll_start_date: classData.enroll_start_date,
            room_id: classData.room ? classData.room.id : '',
            teachers: classData.teachers,
            teaching_assistants: classData.teaching_assistants,
        };
        this.setState({
            classSelected: data,
            showModalClass: true
        });
    };
    closeModalEditClass = () => {
        this.props.classActions.loadClass(this.classId);
        this.setState({
            classSelected: {...this.props.class},
            showModalClass: false
        });
    };

    exportExcel() {

        let data = this.props.class.registers;
        let cols = [{"wch": 5}, {"wch": 22}, {"wch": 10}, {"wch": 10}, {"wch": 20}, {"wch": 12}, {"wch": 30}, {"wch": 16}, {"wch": 30}, {"wch": 25},];
        data = data.map((item, index) => {
            let dob = item.student.dob;
            let isValidDate = moment(dob, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).isValid();
            if (isValidDate)
                dob = moment(item.student.dob, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
            else dob = '';
            let res = {
                'STT': index + 1,

                'Họ và tên': item.student.name,
                'Mã học viên': item.code,
                'Ngày sinh': dob,
                'Tình trạng học phí': item.paid_status ? 'Đã nộp' : 'Chưa nộp',
                // 'Thẻ học viên': item.received_id_card ? 'Đã nhận' : 'Chưa nhận',
                'Email': item.student.email,
                'Phone': item.student.phone,
                'Facebook': item.student.facebook,
                'Trường học': item.student.university,
                'Công việc': item.student.work,
            };
            return res;
        });

        let wb = helper.newWorkBook();
        helper.appendJsonToWorkBook(data, wb, 'Danh sách học viên', cols);
        helper.saveWorkBookToExcel(wb, 'Danh sách học viên lớp ' + this.props.class.name);
    }

    exportAttendanceExcel() {
        let wb = helper.newWorkBook();
        let data;
        let cols = [{"wch": 5}, {"wch": 22}, {"wch": 10}, {"wch": 10}, {"wch": 20}, {"wch": 12}, {"wch": 30}, {"wch": 16}, {"wch": 30}, {"wch": 25},];//độ rộng cột
        let colname = ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];//danh sách cột cmt
        let cmts = [];// danh sách cmts
        //begin điểm danh
        data = this.props.class.registers.filter(item => (item.paid_status)).map((item, index) => {
            let dob = item.student.dob;
            let isValidDate = moment(dob, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).isValid();
            if (isValidDate)
                dob = moment(item.student.dob, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
            else dob = '';
            let res = {
                'STT': index + 1,
                'Họ và tên': item.student.name,
                'Mã học viên': item.code,
                'Ngày sinh': dob,
                'Tình trạng học phí': item.paid_status ? 'Đã nộp' : 'Chưa nộp',
                // 'Thẻ học viên': item.received_id_card ? 'Đã nhận' : 'Chưa nhận',
                'Email': item.student.email,
                'Phone': item.student.phone,
                'Facebook': item.student.facebook,
                'Trường ĐH': item.student.university,
            };
            item.attendances.forEach((obj, index2) => {
                res = {...res, [`Buổi ${index2 + 1}`]: ((obj.status == 1) ? 'X' : '')};
                if (!helper.isEmptyInput(obj.note))
                    cmts = [...cmts, {cell: colname[index2] + (index + 2), note: obj.note}];
            });
            return res;
        });
        helper.appendJsonToWorkBook(data, wb, 'Điểm danh', cols, cmts);
        //end điểm danh

        //begin bài tập
        data = this.props.class.registers.filter(item => (item.paid_status)).map((item, index) => {
            let dob = item.student.dob;
            let isValidDate = moment(dob, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).isValid();
            if (isValidDate)
                dob = moment(item.student.dob, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
            else dob = '';
            let res = {
                'STT': index + 1,
                'Họ và tên': item.student.name,
                'Mã học viên': item.code,
                'Ngày sinh': dob,
                'Tình trạng học phí': item.paid_status ? 'Đã nộp' : 'Chưa nộp',
                'Thẻ học viên': item.received_id_card ? 'Đã nhận' : 'Chưa nhận',
                'Email': item.student.email,
                'Phone': item.student.phone,
                'Facebook': item.student.facebook,
                'Trường ĐH': item.student.university,
            };
            item.attendances.forEach((obj, index2) => {
                res = {...res, [`Buổi ${index2 + 1}`]: ((obj.homework_status == 1) ? 'X' : '')};
            });
            return res;
        });
        helper.appendJsonToWorkBook(data, wb, 'Bài tập', cols, cmts);
        //end bài tập

        //xuất file
        helper.saveWorkBookToExcel(wb, 'Danh sách điểm danh lớp ' + this.props.class.name);
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

    closeModalTeachingLesson() {
        this.setState({showModalTeachingLesson: false});
    }

    openModalTeachingLesson(attendance, type) {
        this.setState(
            {
                showModalTeachingLesson: true,
                typeTeachingLesson: 1,
                attendanceSelected: attendance
            }
        );
        this.props.classActions.loadTeachingLessons(attendance.class_lesson_id, type);
    }

    closeModalChangeTeachingLesson() {
        this.setState({showModalChangeTeachingLesson: false});
    }

    openModalChangeTeachingLesson(teachingLesson) {
        this.setState(
            {
                showModalChangeTeachingLesson: true,
                changeTeachingLesson: {
                    id: teachingLesson.id
                },
                oldTeachingId: teachingLesson.id
            }
        );
    }

    closeModalChangeTeacher() {
        this.setState({showModalChangeTeacher: false});
    }

    openModalChangeTeacher(data) {
        this.setState(
            {
                showModalChangeTeacher: true,
                teacherSelected: data,
                changeTeacher: {
                    id: data.staff ? data.staff.id : null
                }
            }
        );
    }

    closeModalTeachAssis() {
        this.setState({showModalChangeTeachAssis: false});
    }

    openModalTeachAssis(data) {
        this.setState(
            {
                showModalChangeTeachAssis: true,
                teachAssisSelected: data,
                changeTeachAssis: {
                    id: data.staff ? data.staff.id : null
                }
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

    changeTeacher() {
        this.props.classActions.changeTeacher({
            staffId: this.state.changeTeacher.id,
            note: this.state.changeTeacher.note,
            is_teacher_replace: this.state.changeTeacher.is_teacher_replace,
            id: this.state.teacherSelected.class_lesson_id,
        }, this.closeModalChangeTeacher);
    }

    changeTeachingAssis() {
        this.props.classActions.changeTeachingAssistant({
            staffId: this.state.changeTeachAssis.id,
            note: this.state.changeTeachAssis.note,
            is_teaching_assistant_replace: this.state.changeTeachAssis.is_teaching_assistant_replace,
            id: this.state.teachAssisSelected.class_lesson_id,
        }, this.closeModalTeachAssis);
    }

    changeLinkDriver(e) {
        const value = e.target.value;
        this.setState({linkDriver: value});
    }

    submitLinkDriver() {
        helper.showNotification("Đang lưu...");
        if (!this.props.isLoading)
            this.props.classActions.changeLinkDriver(this.classId, this.state.linkDriver);
    }

    changeTeachingLesson() {
        this.props.classActions.changeTeachingLesson(this.state.attendanceSelected.class_lesson_id, this.state.oldTeachingId,
            this.state.changeTeachingLesson.id, this.state.typeTeachingLesson,
            this.state.changeTeachingLesson.note, this.closeModalChangeTeachingLesson
        )
        ;
    }

    genCerti = () => {
        this.props.classActions.genCerti(this.classId);
    };

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

    componentDidMount() {
        helper.setFormValidation('#add-checkin-checkout');
    }

    updateClassLesson = () => {
        this.props.classActions.updateClassLesson(this.classId);
    };


    render() {
        this.path = this.props.location.pathname;
        let classData = {...this.props.class};
        let {isLoadingClass} = this.props;

        return (
            <div className="margin-top-10">
                {/*<div className="card">*/}
                {/*    <div className="card-content">*/}
                {isLoadingClass && <Loading/>}
                {!isLoadingClass && classData &&
                <div className="row" data-space="10">
                    <div className="col-md-4">
                        <div className="card margin-bottom-10 none-margin-top" mask="blue">
                            <div className="card-content flex flex-col">
                                <div className="flex flex-justify-content-center">

                                    {classData.course &&
                                    <div className="img"
                                         style={{
                                             backgroundImage: `url(${helper.validateLinkImage(classData.course.icon_url)})`
                                         }}/>}

                                </div>
                                <div
                                    className="text-white flex flex-col flex-justify-content-center text-center margin-top-10">
                                    {classData.course &&
                                    <Link
                                        className="text-white"
                                        style={{fontSize: 18}}
                                        to={"/teaching/courses/edit/" + classData.course.id}>{classData.course.name}</Link>}
                                </div>
                                <div
                                    className=" flex flex-row-center flex-justify-content-center margin-top-10"/>

                                <h4 className="card-title">{classData.name}</h4>

                                <div
                                    className="text-white flex flex-col flex-justify-content-center text-center">
                                    <div>{classData.room && classData.room.address}</div>
                                    <div>{classData.room && classData.room.name}</div>
                                </div>
                                <h6 className="category text-gray text-email">
                                    <span/>

                                </h6>
                            </div>

                        </div>
                        <div className="card detail-wrap none-margin-top" style={{background:'#f7f7f7'}}>
                            <div className="card-content">
                                <div className="detail-wrap">
                                    <p>Giảng
                                        viên<strong>{classData.teacher ? classData.teacher.name : "Chưa có"}
                                            {classData.teachers_detail && classData.teachers_detail.map((teacher) => {
                                                return (<div>
                                                    {teacher.name}
                                                </div>);
                                            })}
                                        </strong></p>
                                    <p>Trợ
                                        giảng<strong>{classData.teacher_assistant ? classData.teacher_assistant.name : "Chưa có"}
                                            {classData.teaching_assistants_detail && classData.teaching_assistants_detail.map((teacher) => {
                                                return (<div>
                                                    {teacher.name}
                                                </div>);
                                            })}
                                        </strong>
                                    </p>
                                    {!isEmpty(classData.schedule) && <p>Lịch
                                        học<strong>{(classData.schedule && classData.schedule.name) ? classData.schedule.name : "Chưa có"}</strong>
                                    </p>}
                                    {!isEmpty(classData.description) && <p>Mô tả<strong>
                                        {classData.description || "Chưa có"}</strong>
                                    </p>}
                                    {classData.regis_target &&
                                    <p>Chỉ tiêu đăng kí<strong>{classData.regis_target || "Chưa có"}</strong>
                                    </p>}
                                    {!isEmpty(classData.target) &&
                                    <p>Chỉ tiêu nộp tiền<strong>{classData.target || "Chưa có"}</strong></p>}
                                    {!isEmpty(classData.datestart_vi) &&
                                    <p>Ngày khai giảng<strong>{classData.datestart_vi || "Chưa có"}</strong></p>}
                                    {classData.date_end_vi &&
                                    <p>Ngày bế giảng<strong>{classData.date_end_vi || "Chưa có"}</strong></p>}
                                    {classData.enroll_start_date_vi && <p>Ngày bắt đầu tuyển
                                        sinh<strong>{classData.enroll_start_date_vi || "Chưa có"}</strong></p>}
                                    {classData.enroll_end_date_vi && <p>Ngày kết thúc tuyển
                                        sinh<strong>{classData.enroll_end_date_vi || "Chưa có"}</strong></p>}
                                    {!isEmpty(classData.type) && <p>Trạng thái<strong>{{
                                        '': 'Chưa có',
                                        null: 'Chưa có',
                                        'waiting': 'Lớp chờ',
                                        'active': 'Đang hoạt động'
                                    }[classData.type]}</strong></p>}
                                    {classData.course &&
                                    <p>Môn học<strong>{classData.course.name || "Chưa có"}</strong></p>}
                                    {classData.gen &&
                                    <p>Khóa<strong>{classData.gen.name || "Chưa có"}</strong></p>}
                                    {classData.link_drive && <p>Link Driver
                                        <strong

                                        ><a data-toggle="tooltip" title="Nhấp để mở link"
                                            href={classData.link_drive} target="_blank">
                                            {classData.link_drive || "Chưa có"}
                                        </a></strong>

                                    </p>}

                                </div>
                                {this.props.isStoringClass ?
                                    (
                                        <button
                                            className="btn  button-green width-100 disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/> Đang sửa
                                        </button>
                                    )
                                    :
                                    <button className="btn button-green width-100"
                                            onClick={this.openModalEditClass}
                                    >Sửa thông tin
                                    </button>
                                }
                            </div>
                        </div>

                        {/*<div className="padding-horizontal-30px">*/}

                        {/*    {classData.attendances &&*/}
                        {/*    <div><h4><strong>Tình trạng điểm danh</strong></h4>*/}
                        {/*        <div*/}
                        {/*            className="smooth-scroll-y max-height-400">  {classData.attendances.map((attendance, key) => {*/}
                        {/*            return (*/}
                        {/*                <div key={'attendance-' + key}>*/}
                        {/*                    <div*/}
                        {/*                        className="flex flex-row-center flex-space-between">*/}
                        {/*                        <h6>*/}
                        {/*                            <strong>Buổi {attendance.order} </strong>{attendance.total_attendance}/{classData.total_paid}*/}
                        {/*                        </h6>*/}
                        {/*                        {*/}
                        {/*                            (attendance.is_change || this.props.user.role == 2) &&*/}
                        {/*                            <TooltipButton placement="top"*/}
                        {/*                                           text="Đổi buổi"*/}
                        {/*                            >*/}
                        {/*                                <button*/}
                        {/*                                    className="btn btn-xs btn-round"*/}
                        {/*                                    onClick={() => this.openModalClassLesson(attendance)}*/}
                        {/*                                >*/}
                        {/*                                    <i className="material-icons">compare_arrows</i>*/}
                        {/*                                    <div*/}
                        {/*                                        className="ripple-container"/>*/}
                        {/*                                </button>*/}
                        {/*                            </TooltipButton>*/}
                        {/*                        }*/}
                        {/*                    </div>*/}

                        {/*                    <div*/}
                        {/*                        className="progress progress-line-success progress-bar-table width-100">*/}
                        {/*                        <div*/}
                        {/*                            className="progress-bar progress-bar-success"*/}
                        {/*                            role="progressbar"*/}
                        {/*                            aria-valuemin="0"*/}
                        {/*                            aria-valuemax="100"*/}
                        {/*                            style={{width: (100 * attendance.total_attendance / classData.total_paid) + '%'}}*/}
                        {/*                        >*/}
                        {/*                                <span*/}
                        {/*                                    className="sr-only">{100 * attendance.total_attendance / classData.total_paid}%</span>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            );*/}
                        {/*        })}*/}

                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    }*/}
                        {/*    {classData.teacher &&*/}
                        {/*    <div><h4><strong>Điểm danh giảng viên</strong></h4>*/}
                        {/*        <div className="smooth-scroll-y max-height-400">*/}
                        {/*            {classData.teacher.attendances.map((attendance, index) => {*/}
                        {/*                    return (*/}
                        {/*                        <div key={'teacher-attendances' + index}>*/}
                        {/*                            <div*/}
                        {/*                                className="flex flex-row-center flex-space-between">*/}
                        {/*                                <div>*/}
                        {/*                                    <strong>Buổi {attendance.order} </strong>*/}
                        {/*                                    {*/}
                        {/*                                        attendance.staff &&*/}
                        {/*                                        attendance.staff.name*/}

                        {/*                                    }*/}
                        {/*                                </div>*/}
                        {/*                                {*/}
                        {/*                                    (attendance.is_change || this.props.user.role == 2) &&*/}
                        {/*                                    <div>*/}
                        {/*                                        <TooltipButton placement="top"*/}
                        {/*                                                       text="Đổi giảng viên"*/}
                        {/*                                        >*/}
                        {/*                                            <button*/}
                        {/*                                                className="btn btn-xs btn-round"*/}
                        {/*                                                onClick={() => this.openModalChangeTeacher(attendance)}*/}
                        {/*                                            >*/}
                        {/*                                                <i className="material-icons">compare_arrows</i>*/}
                        {/*                                                <div*/}
                        {/*                                                    className="ripple-container"/>*/}
                        {/*                                            </button>*/}
                        {/*                                        </TooltipButton>*/}
                        {/*                                        /!*<TooltipButton placement="top"*!/*/}
                        {/*                                        /!*               text="Xem thêm"*!/*/}
                        {/*                                        /!*>*!/*/}
                        {/*                                        /!*    <button*!/*/}
                        {/*                                        /!*        className="btn btn-xs btn-round btn-rose"*!/*/}
                        {/*                                        /!*        onClick={() => this.openModalTeachingLesson(attendance, 1)}*!/*/}
                        {/*                                        /!*    >*!/*/}
                        {/*                                        /!*        <i className="material-icons">more_horiz</i>*!/*/}
                        {/*                                        /!*        <div*!/*/}
                        {/*                                        /!*            className="ripple-container"/>*!/*/}
                        {/*                                        /!*    </button>*!/*/}
                        {/*                                        /!*</TooltipButton>*!/*/}
                        {/*                                    </div>*/}

                        {/*                                }*/}
                        {/*                            </div>*/}
                        {/*                            <AttendanceTeacher*/}
                        {/*                                attendance={attendance}*/}
                        {/*                                addCheckinCheckout={this.addCheckinCheckout}*/}
                        {/*                                type={"teacher"}*/}
                        {/*                            />*/}
                        {/*                        </div>*/}
                        {/*                    )*/}
                        {/*                        ;*/}
                        {/*                }*/}
                        {/*            )}*/}

                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    }*/}
                        {/*    {classData.teacher_assistant &&*/}
                        {/*    <div><h4><strong>Điểm danh trợ giảng</strong></h4>*/}
                        {/*        <div className="smooth-scroll-y max-height-400">*/}
                        {/*            {classData.teacher_assistant.attendances.map((attendance, index) => {*/}
                        {/*                    return (*/}
                        {/*                        <div key={'teacher_assistant' + index}>*/}
                        {/*                            <div*/}
                        {/*                                className="flex flex-row-center flex-space-between">*/}
                        {/*                                <div>*/}
                        {/*                                    <strong>Buổi {attendance.order} </strong>*/}
                        {/*                                    {*/}
                        {/*                                        attendance.staff &&*/}
                        {/*                                        attendance.staff.name*/}

                        {/*                                    }*/}
                        {/*                                </div>*/}
                        {/*                                {*/}
                        {/*                                    (attendance.is_change || this.props.user.role == 2) &&*/}
                        {/*                                    <div>*/}
                        {/*                                        <TooltipButton placement="top"*/}
                        {/*                                                       text="Đổi trợ giảng"*/}
                        {/*                                        >*/}
                        {/*                                            <button*/}
                        {/*                                                className="btn btn-xs btn-round"*/}
                        {/*                                                onClick={() => this.openModalTeachAssis(attendance)}*/}
                        {/*                                            >*/}
                        {/*                                                <i className="material-icons">compare_arrows</i>*/}
                        {/*                                                <div*/}
                        {/*                                                    className="ripple-container"/>*/}
                        {/*                                            </button>*/}
                        {/*                                        </TooltipButton>*/}
                        {/*                                        /!*<TooltipButton placement="top"*!/*/}
                        {/*                                        /!*               text="Xem thêm"*!/*/}
                        {/*                                        /!*>*!/*/}
                        {/*                                        /!*    <button*!/*/}
                        {/*                                        /!*        className="btn btn-xs btn-round btn-rose"*!/*/}
                        {/*                                        /!*        onClick={() => this.openModalTeachingLesson(attendance, 2)}*!/*/}
                        {/*                                        /!*    >*!/*/}
                        {/*                                        /!*        <i className="material-icons">more_horiz</i>*!/*/}
                        {/*                                        /!*        <div*!/*/}
                        {/*                                        /!*            className="ripple-container"/>*!/*/}
                        {/*                                        /!*    </button>*!/*/}
                        {/*                                        /!*</TooltipButton>*!/*/}
                        {/*                                    </div>*/}

                        {/*                                }*/}

                        {/*                            </div>*/}
                        {/*                            <AttendanceTeacher*/}
                        {/*                                attendance={attendance}*/}
                        {/*                                addCheckinCheckout={this.addCheckinCheckout}*/}
                        {/*                                type={"teaching_assistant"}*/}
                        {/*                            />*/}
                        {/*                        </div>*/}
                        {/*                    );*/}
                        {/*                }*/}
                        {/*            )}*/}

                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    }*/}


                        {/*</div>*/}

                    </div>
                    <div className="col-md-8">
                        <ul className="nav nav-pills nav-pills-dark" data-tabs="tabs">
                            {this.routes.map((route, index) => {
                                return (
                                    index ?
                                        <li className={this.path === route.path ? 'active' : ''}>
                                            <Link to={route.path} style={{
                                                borderRadius: 5,
                                                textTransform: 'none',
                                                margin: 0,
                                                padding: '10px 20px'
                                            }}>
                                                {route.text}
                                            </Link>
                                        </li>
                                        :
                                        <li className={this.path === route.path ? 'active' : ''}>
                                            <IndexLink to={route.path} style={{
                                                borderRadius: 5,
                                                textTransform: 'none',
                                                margin: 0,
                                                padding: '10px 20px'
                                            }}>
                                                {route.text}
                                            </IndexLink>
                                        </li>
                                );
                            })}
                        </ul>
                        <div className="flex flex-wrap margin-top-10">

                            {classData && classData.course && this.path == `${this.routePrefix}` &&
                            <CreateRegisterOverlay
                                onSuccess={() => this.props.classActions.loadClass(this.classId)}
                                studentData={{class_id: classData.id, course_id: classData.course.id}}
                            >
                                <div className="btn btn-actions button-green radius-5">
                                    <i className="material-icons">add_circle</i>&nbsp;&nbsp;&nbsp;&nbsp;Thêm học
                                    viên mới
                                </div>

                            </CreateRegisterOverlay>}
                            {(this.path == `${this.routePrefix}/history-teaching` || this.path == `${this.routePrefix}/score`) &&
                            <div onClick={this.updateClassLesson} className="btn btn-actions button-green radius-5">
                                <i className="material-icons">cached</i>&nbsp;&nbsp;&nbsp;&nbsp;Cập nhật chương trình
                            </div>}
                            {(this.path == `${this.routePrefix}/history-teaching` || this.path == `${this.routePrefix}/score`)
                            && classData.course &&
                            <a className="btn btn-actions radius-5"
                               href={`/teaching/courses/edit/${classData.course.id}`} target='_blank'>
                                <span className="material-icons">create</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;Sửa môn học
                            </a>}
                            {this.path == `${this.routePrefix}/history-teaching` &&
                            <ChangeTeachMultiLessonOverlay
                                refresh={() => this.props.classActions.loadClass(this.classId)}/>}
                            {/*<div onClick={this.genCerti} className="btn btn-actions">*/}
                            {/*    Xếp bằng*/}
                            {/*</div>*/}
                            {this.path == `${this.routePrefix}` && <ExportClassOverlay
                                isLoading={isLoadingClass}
                                exportExcel={this.exportExcel}
                                exportAttendanceExcel={this.exportAttendanceExcel}
                            />}
                            {this.path != `${this.routePrefix}/checkin-checkout` && <div className="dropdown">
                                <button className="btn btn-icon btn-actions radius-5 margin-right-10" mask="extra"
                                        type="button" data-toggle="dropdown">
                                    <i className="material-icons">arrow_drop_down</i>
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a onClick={this.genCerti}>Xếp bằng</a>
                                    </li>
                                </ul>
                            </div>}
                        </div>
                        {!isLoadingClass && classData &&


                        this.props.children


                        }
                    </div>
                </div>}

                {/*    </div>*/}
                {/*</div>*/}
                {/*{false && <div className="row">*/}
                {/*    <div className="col-md-8">*/}
                {/*        <ul className="nav nav-pills nav-pills-rose" data-tabs="tabs">*/}
                {/*            <li className={this.path === `/teaching/class/${this.classId}` ? 'active' : ''}>*/}
                {/*                <IndexLink to={`/teaching/class/${this.classId}`}>*/}
                {/*                    <i className="material-icons">account_circle</i> Tổng quan  &#160;*/}

                {/*                    <div className="ripple-container"/>*/}
                {/*                </IndexLink>*/}
                {/*            </li>*/}
                {/*            <li className={this.path === `/teaching/class/${this.classId}/history-teaching` ? 'active' : ''}>*/}
                {/*                <Link to={`/teaching/class/${this.classId}/history-teaching`}>*/}
                {/*                    <i className="material-icons">smartphone</i> Lịch sử giảng dạy &#160;*/}
                {/*                    <div className="ripple-container"/>*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*            <li className={this.path === `/teaching/class/${this.classId}/registers` ? 'active' : ''}>*/}
                {/*                <Link to={`/teaching/class/${this.classId}/registers`}>*/}
                {/*                    <i className="material-icons">create</i> Đăng kí &#160;*/}
                {/*                    <div className="ripple-container"/>*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*            <li className={this.path === `/teaching/class/${this.classId}/progress` ? 'active' : ''}>*/}
                {/*                <Link to={`/teaching/class/${this.classId}/progress`}>*/}
                {/*                    <i className="material-icons">create</i> Học tập &#160;*/}
                {/*                    <div className="ripple-container"/>*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*            <li className={this.path === `/teaching/class/${this.classId}/care` ? 'active' : ''}>*/}
                {/*                <Link to={`/teaching/class/${this.classId}/care`}>*/}
                {/*                    <i className="material-icons">flag</i> Quan tâm &#160;*/}
                {/*                    <div className="ripple-container"/>*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*        </ul>*/}
                {/*        <div className="card">*/}
                {/*            <div className="card-content">*/}
                {/*                <div className="tab-content">*/}
                {/*                    {this.props.children}*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="col-md-4">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-md-12">*/}
                {/*                <div className="card">*/}
                {/*                    <div className="card-content">*/}
                {/*                        <div className="tab-content">*/}
                {/*                            <h4 className="card-title">*/}
                {/*                                <strong>Thông tin về điểm danh</strong>*/}
                {/*                            </h4>*/}
                {/*                            <br/>*/}
                {/*                            <div className="col-md-12">*/}
                {/*                                <div>*/}
                {/*                                    /!*<button className="btn btn-default width-100" disabled>*/}
                {/*                                        <i className="material-icons">timer</i>*/}
                {/*                                        Xem group lớp*/}
                {/*                                    </button>*/}
                {/*                                    <button className="btn btn-default width-100" disabled>*/}
                {/*                                        <i className="material-icons">timer</i>*/}
                {/*                                        Xếp bằng*/}
                {/*                                    </button>*/}
                {/*                                    <button className="btn btn-default width-100" disabled>*/}
                {/*                                        <i className="material-icons">timer</i>*/}
                {/*                                        In bằng*/}
                {/*                                    </button>*!/*/}
                {/*                                    <button className="btn btn-default width-100"*/}
                {/*                                            onClick={this.exportExcel}*/}
                {/*                                            disabled={this.props.isLoadingClass}*/}
                {/*                                    >*/}
                {/*                                        <i className="material-icons">file_download</i>*/}
                {/*                                        Xuất danh sách*/}
                {/*                                    </button>*/}
                {/*                                    <button className="btn btn-default width-100"*/}
                {/*                                            onClick={this.exportAttendanceExcel}*/}
                {/*                                            disabled={this.props.isLoadingClass}*/}
                {/*                                    >*/}
                {/*                                        <i className="material-icons">file_download</i>*/}
                {/*                                        Xuất danh sách điểm danh*/}
                {/*                                    </button>*/}
                {/*                                    <button*/}
                {/*                                        onClick={this.genCerti}*/}
                {/*                                        className="btn btn-default width-100"><i*/}
                {/*                                        className="material-icons">timer</i> Xếp bằng*/}
                {/*                                    </button>*/}
                {/*                                    <FormInputText*/}
                {/*                                        name="link-driver"*/}
                {/*                                        label="Link Driver"*/}
                {/*                                        updateFormData={this.changeLinkDriver}*/}
                {/*                                        value={this.state.linkDriver}*/}
                {/*                                        type="text"*/}
                {/*                                        disabled={this.props.isLoadingClass || this.props.isLoading}*/}
                {/*                                    />*/}
                {/*                                    <a className="btn btn-rose btn-sm"*/}
                {/*                                       href={this.state.linkDriver}*/}
                {/*                                       target="_blank"*/}
                {/*                                    >*/}
                {/*                                        Mở link*/}
                {/*                                    </a>*/}
                {/*                                    <button className="btn btn-rose btn-sm"*/}
                {/*                                            onClick={this.submitLinkDriver}*/}
                {/*                                            disabled={this.props.isLoadingClass || this.props.isLoading}*/}
                {/*                                    >*/}
                {/*                                        Lưu*/}
                {/*                                    </button>*/}
                {/*                                </div>*/}
                {/*                                {this.props.isLoadingClass ? <Loading/> :*/}
                {/*                                    <div>*/}
                {/*                                        {classData.attendances &&*/}
                {/*                                        <div><h4><strong>Tình trạng điểm danh</strong></h4>*/}
                {/*                                            {classData.attendances.map(attendance => {*/}
                {/*                                                return (*/}
                {/*                                                    <div key={attendance.order}>*/}
                {/*                                                        <div*/}
                {/*                                                            className="flex flex-row-center flex-space-between">*/}
                {/*                                                            <h6>*/}
                {/*                                                                <strong>Buổi {attendance.order} </strong>{attendance.total_attendance}/{classData.total_paid}*/}
                {/*                                                            </h6>*/}
                {/*                                                            {*/}
                {/*                                                                (attendance.is_change || this.props.user.role == 2) &&*/}
                {/*                                                                <TooltipButton placement="top"*/}
                {/*                                                                               text="Đổi buổi"*/}
                {/*                                                                >*/}
                {/*                                                                    <button*/}
                {/*                                                                        className="btn btn-xs btn-round"*/}
                {/*                                                                        onClick={() => this.openModalClassLesson(attendance)}*/}
                {/*                                                                    >*/}
                {/*                                                                        <i className="material-icons">compare_arrows</i>*/}
                {/*                                                                        <div*/}
                {/*                                                                            className="ripple-container"/>*/}
                {/*                                                                    </button>*/}
                {/*                                                                </TooltipButton>*/}
                {/*                                                            }*/}
                {/*                                                        </div>*/}

                {/*                                                        <div*/}
                {/*                                                            className="progress progress-line-success progress-bar-table width-100">*/}
                {/*                                                            <div*/}
                {/*                                                                className="progress-bar progress-bar-success"*/}
                {/*                                                                role="progressbar"*/}
                {/*                                                                aria-valuemin="0"*/}
                {/*                                                                aria-valuemax="100"*/}
                {/*                                                                style={{width: (100 * attendance.total_attendance / classData.total_paid) + '%'}}*/}
                {/*                                                            >*/}
                {/*                                        <span*/}
                {/*                                            className="sr-only">{100 * attendance.total_attendance / classData.total_paid}%</span>*/}
                {/*                                                            </div>*/}
                {/*                                                        </div>*/}
                {/*                                                    </div>*/}
                {/*                                                );*/}
                {/*                                            })}*/}

                {/*                                        </div>*/}
                {/*                                        }*/}
                {/*                                        {classData.teacher &&*/}
                {/*                                        <div><h4><strong>Điểm danh giảng viên</strong></h4>*/}
                {/*                                            {classData.teacher.attendances.map((attendance, index) => {*/}
                {/*                                                    return (*/}
                {/*                                                        <div key={index}>*/}
                {/*                                                            <div*/}
                {/*                                                                className="flex flex-row-center flex-space-between">*/}
                {/*                                                                <div>*/}
                {/*                                                                    <strong>Buổi {attendance.order} </strong>*/}
                {/*                                                                    {*/}
                {/*                                                                        attendance.staff &&*/}
                {/*                                                                        attendance.staff.name*/}

                {/*                                                                    }*/}
                {/*                                                                </div>*/}
                {/*                                                                {*/}
                {/*                                                                    (attendance.is_change || this.props.user.role == 2) &&*/}
                {/*                                                                    <div>*/}
                {/*                                                                        <TooltipButton placement="top"*/}
                {/*                                                                                       text="Đổi giảng viên"*/}
                {/*                                                                        >*/}
                {/*                                                                            <button*/}
                {/*                                                                                className="btn btn-xs btn-round"*/}
                {/*                                                                                onClick={() => this.openModalChangeTeacher(attendance)}*/}
                {/*                                                                            >*/}
                {/*                                                                                <i className="material-icons">compare_arrows</i>*/}
                {/*                                                                                <div*/}
                {/*                                                                                    className="ripple-container"/>*/}
                {/*                                                                            </button>*/}
                {/*                                                                        </TooltipButton>*/}
                {/*                                                                        <TooltipButton placement="top"*/}
                {/*                                                                                       text="Xem thêm"*/}
                {/*                                                                        >*/}
                {/*                                                                            <button*/}
                {/*                                                                                className="btn btn-xs btn-round btn-rose"*/}
                {/*                                                                                onClick={() => this.openModalTeachingLesson(attendance, 1)}*/}
                {/*                                                                            >*/}
                {/*                                                                                <i className="material-icons">more_horiz</i>*/}
                {/*                                                                                <div*/}
                {/*                                                                                    className="ripple-container"/>*/}
                {/*                                                                            </button>*/}
                {/*                                                                        </TooltipButton>*/}
                {/*                                                                    </div>*/}

                {/*                                                                }*/}
                {/*                                                            </div>*/}
                {/*                                                            <AttendanceTeacher*/}
                {/*                                                                attendance={attendance}*/}
                {/*                                                                addCheckinCheckout={this.addCheckinCheckout}*/}
                {/*                                                                type={"teacher"}*/}
                {/*                                                            />*/}
                {/*                                                        </div>*/}
                {/*                                                    )*/}
                {/*                                                        ;*/}
                {/*                                                }*/}
                {/*                                            )}*/}

                {/*                                        </div>*/}
                {/*                                        }*/}
                {/*                                        {classData.teacher_assistant &&*/}
                {/*                                        <div><h4><strong>Điểm danh trợ giảng</strong></h4>*/}
                {/*                                            {classData.teacher_assistant.attendances.map((attendance, index) => {*/}
                {/*                                                    return (*/}
                {/*                                                        <div key={index}>*/}
                {/*                                                            <div*/}
                {/*                                                                className="flex flex-row-center flex-space-between">*/}
                {/*                                                                <div>*/}
                {/*                                                                    <strong>Buổi {attendance.order} </strong>*/}
                {/*                                                                    {*/}
                {/*                                                                        attendance.staff &&*/}
                {/*                                                                        attendance.staff.name*/}

                {/*                                                                    }*/}
                {/*                                                                </div>*/}
                {/*                                                                {*/}
                {/*                                                                    (attendance.is_change || this.props.user.role == 2) &&*/}
                {/*                                                                    <div>*/}
                {/*                                                                        <TooltipButton placement="top"*/}
                {/*                                                                                       text="Đổi trợ giảng"*/}
                {/*                                                                        >*/}
                {/*                                                                            <button*/}
                {/*                                                                                className="btn btn-xs btn-round"*/}
                {/*                                                                                onClick={() => this.openModalTeachAssis(attendance)}*/}
                {/*                                                                            >*/}
                {/*                                                                                <i className="material-icons">compare_arrows</i>*/}
                {/*                                                                                <div*/}
                {/*                                                                                    className="ripple-container"/>*/}
                {/*                                                                            </button>*/}
                {/*                                                                        </TooltipButton>*/}
                {/*                                                                        <TooltipButton placement="top"*/}
                {/*                                                                                       text="Xem thêm"*/}
                {/*                                                                        >*/}
                {/*                                                                            <button*/}
                {/*                                                                                className="btn btn-xs btn-round btn-rose"*/}
                {/*                                                                                onClick={() => this.openModalTeachingLesson(attendance, 2)}*/}
                {/*                                                                            >*/}
                {/*                                                                                <i className="material-icons">more_horiz</i>*/}
                {/*                                                                                <div*/}
                {/*                                                                                    className="ripple-container"/>*/}
                {/*                                                                            </button>*/}
                {/*                                                                        </TooltipButton>*/}
                {/*                                                                    </div>*/}

                {/*                                                                }*/}

                {/*                                                            </div>*/}
                {/*                                                            <AttendanceTeacher*/}
                {/*                                                                attendance={attendance}*/}
                {/*                                                                addCheckinCheckout={this.addCheckinCheckout}*/}
                {/*                                                                type={"teaching_assistant"}*/}
                {/*                                                            />*/}
                {/*                                                        </div>*/}
                {/*                                                    );*/}
                {/*                                                }*/}
                {/*                                            )}*/}

                {/*                                        </div>*/}
                {/*                                        }*/}

                {/*                                    </div>*/}
                {/*                                }*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>}*/}
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
                            <div className="form-group">
                                <Select
                                    name="form-field-name"
                                    value={this.state.changeTeacher.id}
                                    options={this.state.staffs}
                                    optionRenderer={(option) => {
                                        return (
                                            <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                        );
                                    }}
                                    valueRenderer={(option) => {
                                        return (
                                            <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                        );
                                    }}
                                    onChange={(value) => this.setState({
                                        changeTeacher: {
                                            ...this.state.changeTeacher,
                                            id: value ? value.id : ""
                                        }
                                    })}
                                    placeholder="Chọn giảng viên"
                                />
                            </div>
                            <FormInputText
                                label="Ghi chú"
                                value={this.state.changeTeacher.note}
                                updateFormData={(event) => this.setState({
                                    changeTeacher:
                                        {
                                            ...this.state.changeTeacher,
                                            note: event.target.value
                                        }
                                })}
                                name="note-change-teaching-assis"
                            />
                            <div>
                                <Checkbox checked={this.state.changeTeacher.is_teacher_replace}
                                          label="  Đây là một buổi dạy thay"
                                          checkBoxLeft
                                          name="is_teacher_replace"
                                          onChange={() => this.setState({
                                              changeTeacher:
                                                  {
                                                      ...this.state.changeTeacher,
                                                      is_teacher_replace: !this.state.changeTeacher.is_teacher_replace
                                                  }
                                          })}
                                />
                            </div>
                            {this.props.isChangingTeacher ?
                                (
                                    <button type="button" className="btn btn-success btn-round disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang đổi
                                    </button>

                                )
                                :
                                (
                                    <button type="button" className="btn btn-success btn-round"
                                            onClick={this.changeTeacher}
                                    ><i
                                        className="material-icons">check</i> Xác nhận đổi
                                    </button>
                                )

                            }

                            <button type="button"
                                    className={"btn btn-danger btn-round" + (this.props.isChangingTeacher ? " disabled" : "")}
                                    onClick={this.props.isChangingTeacher ? null : this.closeModalChangeTeacher}
                            ><i
                                className="material-icons">close</i> Huỷ
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal
                    show={this.state.showModalChangeTeachAssis}
                    onHide={this.props.isChangingTeachingAssis ? null : this.closeModalTeachAssis}
                >
                    <Modal.Header closeButton={!this.props.isChangingTeachingAssis}>
                        <h4 className="modal-title">Đổi trợ giảng</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div className="form-group">
                                <Select
                                    name="form-field-name"
                                    value={this.state.changeTeachAssis.id}
                                    options={this.state.staffs}
                                    optionRenderer={(option) => {
                                        return (
                                            <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                        );
                                    }}
                                    valueRenderer={(option) => {
                                        return (
                                            <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                        );
                                    }}
                                    onChange={(value) => this.setState({
                                        changeTeachAssis: {
                                            ...this.state.changeTeachAssis,
                                            id: value ? value.id : ""
                                        }
                                    })}
                                    placeholder="Chọn trợ giảng"
                                />
                            </div>
                            <FormInputText
                                label="Ghi chú"
                                value={this.state.changeTeachAssis.note}
                                updateFormData={(event) => this.setState({
                                    changeTeachAssis:
                                        {
                                            ...this.state.changeTeachAssis,
                                            note: event.target.value
                                        }
                                })}
                                name="note-change-teaching-assis"
                            />
                            <div>
                                <Checkbox checked={this.state.changeTeachAssis.is_teaching_assistant_replace}
                                          label="  Đây là một buổi dạy thay"
                                          checkBoxLeft
                                          name="is_teaching_assistant_replace"
                                          onChange={() => this.setState({
                                              changeTeachAssis:
                                                  {
                                                      ...this.state.changeTeachAssis,
                                                      is_teaching_assistant_replace: !this.state.changeTeachAssis.is_teaching_assistant_replace
                                                  }
                                          })}
                                />
                            </div>
                            {this.props.isChangingTeachingAssis ?
                                (
                                    <button type="button" className="btn btn-success btn-round disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang đổi
                                    </button>

                                )
                                :
                                (
                                    <button type="button" className="btn btn-success btn-round"
                                            onClick={this.changeTeachingAssis}
                                    ><i
                                        className="material-icons">check</i> Xác nhận đổi
                                    </button>
                                )

                            }

                            <button type="button"
                                    className={"btn btn-danger btn-round" + (this.props.isChangingTeachingAssis ? " disabled" : "")}
                                    onClick={this.props.isChangingTeachingAssis ? null : this.closeModalTeachAssis}
                            ><i
                                className="material-icons">close</i> Huỷ
                            </button>
                        </form>
                    </Modal.Body>
                </Modal><Modal
                show={this.state.showModalTeachingLesson}
                onHide={this.closeModalTeachingLesson}
            >
                <Modal.Header closeButton={!this.props.isChangingTeachingAssis}>
                    <h4 className="modal-title">Danh sách
                        {this.state.typeTeachingLesson === 1 ? "giảng viên" : "trợ giảng"} buổi {this.state.attendanceSelected.order}</h4>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isLoadingTeachingLesson ? <Loading/> :
                            <div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="text-rose">
                                        <tr>
                                            <th/>
                                            <th>Tên</th>
                                            <th>Đổi</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.props.teachingLessons.map((teacher, index) => {
                                                let avatar = helper.avatarEmpty(teacher.avatar_url) ?
                                                    NO_AVATAR : teacher.avatar_url;
                                                return (
                                                    <tr key={'teachingLessons-' + index}>
                                                        <td>
                                                            <div className="avatar-list-staff"
                                                                 style={{
                                                                     background: 'url(' + avatar + ') center center / cover',
                                                                     display: 'inline-block'
                                                                 }}
                                                            />
                                                        </td>
                                                        <td>{teacher.name}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-rose"
                                                                onClick={() => this.openModalChangeTeachingLesson(teacher)}
                                                            >
                                                                Thay đổi
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    }
                </Modal.Body>
            </Modal>
                <Modal
                    show={this.state.showModalChangeTeachingLesson}
                    onHide={this.closeModalChangeTeachingLesson}
                >
                    <Modal.Header>
                        <h4 className="modal-title">Đổi {this.state.typeTeachingLesson === 1 ? "giảng viên" : "trợ giảng"}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div className="form-group">
                                <Select
                                    name="form-field-name"
                                    value={this.state.changeTeachingLesson.id}
                                    options={this.state.staffs}
                                    optionRenderer={(option) => {
                                        return (
                                            <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                        );
                                    }}
                                    valueRenderer={(option) => {
                                        return (
                                            <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                        );
                                    }}
                                    onChange={(value) => this.setState({
                                        changeTeachingLesson: {
                                            ...this.state.changeTeachingLesson,
                                            id: value ? value.id : ""
                                        }
                                    })}
                                    placeholder={this.state.typeTeachingLesson === 1 ? "Chọn giảng viên" : "Chọn trợ giảng"}
                                />
                            </div>
                            <FormInputText
                                label="Ghi chú"
                                value={this.state.changeTeachingLesson.note}
                                updateFormData={(event) => this.setState({
                                    changeTeachingLesson:
                                        {
                                            ...this.state.changeTeachingLesson,
                                            note: event.target.value
                                        }
                                })}
                            />
                            {this.props.isChangingTeachingLesson ?
                                (
                                    <button type="button" className="btn btn-success btn-round disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang đổi
                                    </button>

                                )
                                :
                                (
                                    <button type="button" className="btn btn-success btn-round"
                                            onClick={this.changeTeachingLesson}
                                    ><i
                                        className="material-icons">check</i> Xác nhận đổi
                                    </button>
                                )

                            }

                            <button type="button"
                                    className={"btn btn-danger btn-round" + (this.props.isChangingTeachingLesson ? " disabled" : "")}
                                    onClick={this.props.isChangingTeachingLesson ? null : this.closeModalChangeTeachingLesson}
                            ><i
                                className="material-icons">close</i> Huỷ
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
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
                <Modal
                    show={this.state.showModalClass}
                    onHide={() => this.setState({showModalClass: false})}
                    bsSize="lg"
                >
                    <Modal.Header closeButton>
                        Chỉnh sửa lớp
                    </Modal.Header>
                    <Modal.Body>
                        {(isLoadingClass || !this.state.showModalClass) && <Loading/>}
                        {!isLoadingClass && this.state.showModalClass &&
                        <AddClassContainer
                            edit
                            classData={this.state.classSelected}
                            closeModal={this.closeModalEditClass}
                        />}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    saveCheckinCheckout = () => {
        if ($('#add-checkin-checkout').valid()) {
            this.props.classActions.addCheckinCheckout(this.state.attendance.type, this.state.attendance.typeUser,
                this.state.attendance.userId, this.state.attendance.classLessonId, this.state.attendance.time,
                this.state.attendance.comment, this.addCheckinCheckoutSuccess);
        }
    };

    addCheckinCheckoutSuccess = () => {
        this.setState({showModalAddCheckinCheckout: false});
        this.props.classActions.loadClass(this.classId);
    };
}

ClassContainer.propTypes = {
    class: PropTypes.object.isRequired,
    classActions: PropTypes.object.isRequired,
    isLoadingClass: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isChangingClassLesson: PropTypes.bool.isRequired,
    isChangingTeachingAssis: PropTypes.bool.isRequired,
    isChangingTeacher: PropTypes.bool.isRequired,
    isLoadingStaffs: PropTypes.bool.isRequired,
    isChangingTeachingLesson: PropTypes.bool.isRequired,
    isLoadingTeachingLesson: PropTypes.bool.isRequired,
    staffs: PropTypes.array.isRequired,
    teachingLessons: PropTypes.array.isRequired,
    children: PropTypes.element,
    pathname: PropTypes.string,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        class: state.classes.class,
        isLoading: state.classes.isLoading,
        isLoadingClass: state.classes.isLoadingClass,
        isChangingClassLesson: state.classes.isChangingClassLesson,
        isChangingTeachingAssis: state.classes.isChangingTeachingAssis,
        isChangingTeacher: state.classes.isChangingTeacher,
        isLoadingStaffs: state.classes.isLoadingStaffs,
        isLoadingTeachingLesson: state.classes.isLoadingTeachingLesson,
        isStoringClass: state.classes.isStoringClass,
        teachingLessons: state.classes.teachingLessons,
        staffs: state.classes.staffs,
        user: state.login.user,
        isChangingTeachingLesson: state.classes.isChangingTeachingLesson,
        isAddingCheckinCheckout: state.classes.isAddingCheckinCheckout,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassContainer);
