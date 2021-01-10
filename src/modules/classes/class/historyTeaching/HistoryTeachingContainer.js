import React from 'react';
import * as classActions from "../../classActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    avatarEmpty, checkStringIsUrl,
    findNextInstanceInDaysArray,
    getShortName,
    isEmptyInput,
    showNotification
} from "../../../../helpers/helper";
import TooltipButton from "../../../../components/common/TooltipButton";
import {Modal, Overlay} from 'react-bootstrap';
import * as ReactDOM from "react-dom";
import FormInputDate from "../../../../components/common/FormInputDate";
import FormInputText from "../../../../components/common/FormInputText";
import ItemReactSelect from "../../../../components/common/ItemReactSelect";
import Loading from "../../../../components/common/Loading";
import {NO_AVATAR} from "../../../../constants/env";
import TimePicker from "../../../../components/common/TimePicker";
import Select from 'react-select';
import moment from 'moment';
import {DATE_FORMAT_SQL, DATE_VN_FORMAT, LESSON_EVENT_TYPES_OBJECT} from "../../../../constants/constants";
import EmptyData from "../../../../components/common/EmptyData";
import Checkbox from "../../../../components/common/Checkbox";
import LessonDetailModal from "../../../attendance/LessonDetailModal";
import * as attendanceActions from "../../../attendance/attendanceActions";
import CheckBoxMaterial from "../../../../components/common/CheckBoxMaterial";
import {Link} from "react-router";

class HistoryTeachingContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: [],
            isLoading: false,
            showModalClassLesson: false,
            showModalChangeTeacher: false,
            showModalChangeTeachAssis: false,
            showModalTeachingLesson: false,
            showModalChangeTeachingLesson: false,
            showModalLessonEvent: false,
            showModalClass: false,
            classSelected: {...this.props.class},
            classLessonSelected: {},
            teacherSelected: {},
            teachAssisSelected: {},
            lessonEvent: {},
            lessonEventStudent: [],
            lessonEventType: '',
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
            showModalAddCheckinCheckout: false,
            showModalDelayLessons: false,
            delayLessonIndex: 0,
            delayData: {note: ''},
        };
        this.state = this.initState;
    }

    componentWillMount() {
        this.props.classActions.loadStaffs();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLoadingStaffs && !nextProps.isLoadingStaffs) {
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

    closeModalClassLesson = () => {
        this.setState({showModalClassLesson: false});
    };

    openModalClassLesson = (classLesson) => {
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
    };

    closeModalTeachingLesson = () => {
        this.setState({showModalTeachingLesson: false});
    };

    openModalTeachingLesson = (attendance, type) => {
        this.setState(
            {
                showModalTeachingLesson: true,
                typeTeachingLesson: 1,
                attendanceSelected: attendance
            }
        );
        this.props.classActions.loadTeachingLessons(attendance.class_lesson_id, type);
    };

    closeModalChangeTeachingLesson = () => {
        this.setState({showModalChangeTeachingLesson: false});
    };

    openModalDelayLessons = (lessonIndex) => {
        this.setState(
            {
                showModalDelayLessons: true,
                delayLessonIndex: lessonIndex,
                delayData: {
                    newDate: this.props.classData.lessons[lessonIndex].time
                }
            }
        );
    };
    closeModalDelayLessons = () => {
        this.setState({showModalDelayLessons: false});
    };
    openModalLessonEvent = (lessonEvent, lessonEventType, classLessonEvent) => {
        // console.log(lessonEvent);
        let lessonEventStudent = this.props.classData.registers.map((r) => {
            let {student} = r;
            let student_class_lesson_event = r.events.filter(e => e &&  e.event_type == lessonEventType && e.lesson_id == lessonEvent.lesson_id)[0] || {};
            // console.log(r.events, student_class_lesson_event);

            return {
                student_class_lesson_event_id: student_class_lesson_event ? student_class_lesson_event.id : null,
                student_id: student.id,
                class_lesson_event_id: student_class_lesson_event.class_lesson_event_id,
                lesson_event_id: classLessonEvent.lesson_event_id,
                class_lesson_id: lessonEvent.id,
                comment: student_class_lesson_event ? student_class_lesson_event.data : '',
                status: student_class_lesson_event ? student_class_lesson_event.status : null,
            };
        });
        this.setState(
            {
                showModalLessonEvent: true,
                lessonEvent,
                lessonEventStudent,
                lessonEventType,

            }
        );
    };
    closeModalLessonEvent = () => {
        this.setState({showModalLessonEvent: false});
    };

    submitModalLessonEvent = () => {
        let lessonEventStudent = {...this.state.lessonEventStudent};
        let {params, classActions} = this.props;
        // console.log(lessonEventStudent);
        classActions.saveStudentLessonEvent(lessonEventStudent, () => {
            classActions.loadClass(params.classId);
        });
    };

    updateFormModalEvent = (e, index) => {
        let {name, value} = e.target;
        let lessonEventStudent = {...this.state.lessonEventStudent};
        switch (name) {
            case 'status': {
                lessonEventStudent[index][name] = lessonEventStudent[index][name] != 'done' ? 'done' : null;
                break;
            }
            default: {
                lessonEventStudent[index][name] = value;
                break;
            }
        }
        this.setState({lessonEventStudent});
    };

    saveDelayLessons = (moveLessons) => {
        let {params, classActions} = this.props;
        let lessons = moveLessons.map((lesson) => {
            return {
                time: moment(lesson.time, DATE_VN_FORMAT).format(DATE_FORMAT_SQL),
                class_lesson_id: lesson.class_lesson_id,
                note: ""
            }
        })
        classActions.changeClassLessons(lessons, () => {
            classActions.loadClass(params.classId);
        });
    };

    openModalChangeTeachingLesson = (teachingLesson) => {
        this.setState(
            {
                showModalChangeTeachingLesson: true,
                changeTeachingLesson: {
                    id: teachingLesson.id
                },
                oldTeachingId: teachingLesson.id
            }
        );
    };

    closeModalChangeTeacher = () => {
        this.setState({showModalChangeTeacher: false});
    };

    openModalChangeTeacher = (data) => {
        this.setState(
            {
                showModalChangeTeacher: true,
                teacherSelected: data,
                changeTeacher: {
                    id: data.teacher ? data.teacher.id : ''
                }
            }
        );
    };

    closeModalTeachAssis = () => {
        this.setState({showModalChangeTeachAssis: false});
    };

    openModalTeachAssis = (data) => {
        this.setState(
            {
                showModalChangeTeachAssis: true,
                teachAssisSelected: data,
                changeTeachAssis: {
                    id: data.teacher_assistant ? data.teacher_assistant.id : ''
                }
            }
        );
    };

    changeClassLesson = () => {
        this.props.classActions.changeClassLesson({
            note: this.state.changeDate.note,
            time: this.state.changeDate.date,
            id: this.state.classLessonSelected.class_lesson_id,
        }, this.closeModalClassLesson);
    };

    changeTeacher = () => {
        this.props.classActions.changeTeacher({
            staffId: this.state.changeTeacher.id,
            note: this.state.changeTeacher.note,
            is_teacher_replace: this.state.changeTeacher.is_teacher_replace,
            id: this.state.teacherSelected.class_lesson_id,
        }, this.closeModalChangeTeacher);
    };

    changeTeachingAssis = () => {
        this.props.classActions.changeTeachingAssistant({
            staffId: this.state.changeTeachAssis.id,
            note: this.state.changeTeachAssis.note,
            is_teaching_assistant_replace: this.state.changeTeachAssis.is_teaching_assistant_replace,
            id: this.state.teachAssisSelected.class_lesson_id,
        }, this.closeModalTeachAssis);
    };

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

    toggle = (key) => {
        let show = [...this.props.classData.lessons, {}].map(() => false);
        show[key] = true;

        this.setState({show});
    };


    close = (key) => {
        let show = this.state.show;
        show[key] = false;
        this.setState({show});
    };

    updateModalAttendanceData = (index, value, name) => {
        this.props.attendanceActions.updateModalData(index, value, name);
    }
    commitModalAttendanceData = (data) => {
        this.props.attendanceActions.takeAttendance(data, this.commitAttendanceSuccess);
    }
    commitAttendanceSuccess = () => {
        showNotification("Lưu thành công!");
        this.setState({showModalDetailLesson: false});
        // this.props.attendanceActions.loadClassLessonModal(this.props.params.classId);
    }
    closeModalDetailLesson = () => {
        this.setState({showModalDetailLesson: false});
    };
    openModalDetailLessonAttendance = (id) => {
        this.setState({
            showModalDetailLesson: true,
            selectedLessonId: id
        });
        this.props.attendanceActions.loadLessonDetailModal(this.props.classData.id, id);
    };

    render() {
        let {classData, isLoading, user, isLoadingSavingClassLessonEvents} = this.props;
        let {show, showModalDelayLessons, showModalLessonEvent, delayLessonIndex, delayData, lessonEventStudent, lessonEventType} = this.state;
        let delayLesson = classData && classData.lessons && classData.lessons[delayLessonIndex] ? classData.lessons[delayLessonIndex] : {};
        let modalEvent = LESSON_EVENT_TYPES_OBJECT[lessonEventType] || {};
        // console.log(classData);
        // console.log(moment().add(1, 'days').format(DATE_VN_FORMAT));
        let moveLessons = [];
        if (classData && classData.lessons && classData.study_session && classData.study_session.length > 0) {
            let daysArray = classData.study_session.map((item) => item.order).sort();
            let lessons = classData.lessons.slice(delayLessonIndex, classData.lessons.length);
            for (let i = 0; i < lessons.length; i++) {
                let date = i == 0 ? "" : moment(moveLessons[i - 1].time, DATE_VN_FORMAT).add(1, "days");
                let newDate = i == 0 ? delayData.newDate : findNextInstanceInDaysArray(date, daysArray).format(DATE_VN_FORMAT);
                let newDateNoFormat = moment(newDate, DATE_VN_FORMAT);
                moveLessons = [...moveLessons, {
                    ...lessons[i],
                    time: newDate,
                    oldTime: lessons[i].time,
                    timeNoFormat: newDateNoFormat
                }];
            }
        }

        // {classData && classData.lessons && classData.lessons.slice(delayLessonIndex, classData.lessons.length).map((lesson, key) => {
        //     let currentDate = moment(lesson.time, DATE_VN_FORMAT)
        //     let newDate = key == 0 ? delayLesson.time : findNextInstanceInDaysArray(moment(lesson.time, DATE_VN_FORMAT) lesson[key - 1], )
        //     let delayDate = moment(delayData.newDate, DATE_VN_FORMAT).diff(moment(delayLesson.time, DATE_VN_FORMAT), 'days');
        //     let newDate = moment(lesson.time, DATE_VN_FORMAT).add(delayDate, 'days');
        //     newDate = findNextInstanceInDaysArray(newDate, [2, 4]).format(DATE_VN_FORMAT);
        //     return (
        //         <tr key={key}>
        //             <td style={{width: 80}}><b>Buổi {lesson.order}</b></td>
        //             <td style={{width: 80}}>{lesson.time}</td>
        //             <td style={{width: 25}}><b>→</b></td>
        //             <td style={{width: 80}}>{newDate}</td>
        //         </tr>);
        // })}

        // moveLesson =

        return (
            <div className="table-sticky-head table-split table-hover" radius="five" style={{marginTop:-5}}>
                <table className="table" >
                    <thead className="text-rose">
                    <tr>
                        <th/>
                        <th>Tên buổi học</th>
                        <th>Điểm danh</th>
                        <th>Thời gian</th>
                        <th>Giảng viên</th>
                        <th>Trợ giảng</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        !isLoading && classData.lessons && classData.lessons.length > 0 && classData.lessons.map((lesson, key) => {
                                // let color = lesson.studied ? 'success' : '';
                                let minWidth = 120, margin = '5px 3px';
                                let lesson_exams = classData.exams.filter(ex=>ex.lesson && ex.lesson.id == lesson.lesson_id);
                                let lesson_exam_names = lesson_exams.map(ex=>ex.title).join(', \n');
                            let  total_attendance = 0;
                            classData.registers.forEach(r=>{
                                let find_atd = r.attendances ? r.attendances.filter(a=>a.class_lesson_id == lesson.class_lesson_id && a.status)[0] : 0;
                                if(find_atd) total_attendance++;
                            });
                                return (
                                    <tr key={key}>
                                        <td>
                                            <div className="flex flex-align-items-center">

                                                {lesson_exams.length > 0 &&
                                                <TooltipButton text={lesson_exam_names} placement="top">
                                                    <Link to={`/teaching/class/${this.props.params.classId}/score`} style={{
                                                        // borderRadius: 5,
                                                        // textTransform: 'none',
                                                        // margin: 0,
                                                        // padding: '10px 20px'
                                                    }}>
                                                        <div className="icon8 icon8-wrap margin-right-5" icon="exam"mask="off"

                                                        >
                                                            <div className="icon"/>
                                                        </div>
                                                    </Link>
                                                    </TooltipButton>}
                                                {Object.entries(LESSON_EVENT_TYPES_OBJECT).map(entry => {
                                                    let de = LESSON_EVENT_TYPES_OBJECT[entry[0]];
                                                    let lesson_event = lesson.events.filter(e => e.event_type == de.type)[0];
                                                    if (lesson_event) return (<TooltipButton text={de.name} placement="top">
                                                        <div className="icon8 icon8-wrap cursor-pointer margin-right-5"
                                                             mask="on"
                                                             icon={de.type}
                                                             onClick={() => this.openModalLessonEvent(lesson, de.type, lesson_event)}
                                                        >
                                                            <div className="icon"/>
                                                        </div>
                                                    </TooltipButton>);
                                                })}

                                            </div>
                                        </td>

                                        {/*<td>*/}
                                        {/*    <button className="btn btn-white float-right"*/}
                                        {/*            onClick={() => this.openModalDetailLessonAttendance(lesson.id)}>*/}
                                        {/*        Điểm danh*/}
                                        {/*    </button>*/}
                                        {/*</td>*/}

                                        <td style={{minWidth: '100px'}}>
                                            <a target="_blank"
                                               href={"/teaching/courses/lessons/edit/" + classData.course.id + "/" + lesson.lesson_id}><strong>{lesson.name}</strong></a>
                                            <div>


                                                {
                                                    checkStringIsUrl(lesson.description) ?
                                                        <div
                                                    //eslint-disable-next-line
                                                    dangerouslySetInnerHTML={{__html: checkStringIsUrl(lesson.description)}}/>
                                                    :<a style={{fontWeight: 400, color: 'black'}}
                                                        target="_blank"
                                                        href="#">{lesson.description}</a>}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {/*<div className="flex flex-align-items-center flex-space-between flex-row"*/}
                                                {/*     style={{width: "calc(100%)", minWidth}}>*/}
                                                {/*    <div className="progress progress-bar-table width-100" style={{*/}
                                                {/*        "marginBottom": "0",*/}
                                                {/*        "height": "7px",*/}
                                                {/*        "borderRadius": "5px",*/}
                                                {/*        "marginRight": "10px",*/}
                                                {/*        "backgroundColor": "#f7f5f7"*/}
                                                {/*    }}>*/}
                                                {/*        <div*/}
                                                {/*            className="progress-bar progress-bar-success"*/}
                                                {/*            role="progressbar"*/}
                                                {/*            aria-valuemin="0"*/}
                                                {/*            aria-valuemax="100"*/}
                                                {/*            style={{width: (100 * lesson.total_attendance / classData.total_paid) + '%',}}*/}
                                                {/*        >*/}
                                                {/*        <span className="sr-only">*/}
                                                {/*            {100 * lesson.total_attendance / classData.total_paid}%*/}
                                                {/*        </span>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*    <div*/}
                                                {/*        style={{fontSize: 12}}>{lesson.total_attendance}/{classData.total_paid}</div>*/}
                                                {/*</div>*/}
                                                <h6>{total_attendance || 0}/{classData.total_paid}</h6>
                                                <div
                                                    className="progress progress-line-success progress-bar-table width-100">
                                                    <div className="progress-bar progress-bar-success"
                                                         role="progressbar"
                                                         aria-valuemin="0"
                                                         aria-valuemax="100"
                                                         style={{width: (100 *  total_attendance / classData.total_paid) + '%'}}
                                                    >
                                                        <span
                                                            className="sr-only">{(100 *  total_attendance / classData.total_paid)}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div>
                                                <div>{lesson.start_time}-{lesson.end_time}</div>
                                                <div>{lesson.time}</div>
                                            </div>
                                        </td>

                                        <td>

                                            {
                                                lesson.teacher ?
                                                    <TooltipButton text="Giảng viên"
                                                                   placement="top"
                                                    >
                                                        <button className="btn btn-xs"
                                                                style={{
                                                                    background: '#' + lesson.teacher.color,
                                                                    minWidth,
                                                                    margin
                                                                }}>
                                                            {getShortName(lesson.teacher.name)}
                                                            <div className="ripple-container"/>
                                                        </button>
                                                    </TooltipButton>
                                                    :
                                                    <TooltipButton text="Giảng viên"
                                                                   placement="top"
                                                    >
                                                        <button className="btn btn-xs"
                                                                style={{minWidth, margin}}>
                                                            NONE
                                                            <div className="ripple-container"/>
                                                        </button>
                                                    </TooltipButton>

                                            }
                                        </td>
                                        <td>
                                            {
                                                lesson.teacher_assistant ?
                                                    <TooltipButton text="Trơ giảng"
                                                                   placement="top"
                                                    >
                                                        <button className="btn btn-xs"
                                                                style={{
                                                                    background: '#' + lesson.teacher_assistant.color,
                                                                    minWidth, margin
                                                                }}>
                                                            {getShortName(lesson.teacher_assistant.name)}
                                                            <div className="ripple-container"/>
                                                        </button>
                                                    </TooltipButton>
                                                    :
                                                    <TooltipButton text="Trợ giảng"
                                                                   placement="top"
                                                    >
                                                        <button className="btn btn-xs"
                                                                style={{minWidth, margin}}>
                                                            NONE
                                                            <div className="ripple-container"/>
                                                        </button>
                                                    </TooltipButton>
                                            }

                                        </td>
                                        {/*<td>*/}


                                        {/*    <div>*/}
                                        {/*        <a*/}
                                        {/*            style={{fontWeight: 400, color: 'black'}}*/}
                                        {/*            target="_blank"*/}
                                        {/*            href={"/teaching/courses/lessons/edit/" + classData.course.id + "/" + lesson.lesson_id}>{shortenStr(lesson.description, 40)}</a>*/}
                                        {/*    </div>*/}

                                        {/*</td>*/}
                                        {/*<td/>*/}
                                        {/*<td>{lesson.term && <a*/}
                                        {/*    style={{fontWeight: 400, color: 'black'}}*/}
                                        {/*    target="_blank"*/}
                                        {/*    href={"/teaching/courses/lessons/edit/" + classData.course.id + "/" + lesson.lesson_id}>{lesson.term.name}</a>}*/}
                                        {/*</td>*/}
                                        <td>
                                            <div style={{position: "relative"}} className="">
                                                <button className="btn btn-actions" mask="extra-table"
                                                        ref={"target" + key} onClick={() => this.toggle(key)}>

                                                    <i className="material-icons">more_horiz</i>
                                                </button>
                                                <Overlay
                                                    rootClose={true}
                                                    show={show[key]}
                                                    onHide={() => this.close(key)}
                                                    placement="bottom"
                                                    container={() => ReactDOM.findDOMNode(this.refs['target' + key]).parentElement}
                                                    target={() => ReactDOM.findDOMNode(this.refs['target' + key])}>
                                                    <div className="kt-overlay overlay-container" mask="extra-table"
                                                         style={{
                                                             width: 150,
                                                         }}>
                                                        {(lesson.is_change || user.role == 2) &&
                                                        <button className="btn btn-white width-100"
                                                                onClick={() => this.openModalDelayLessons(key + '')}>
                                                            Dời lịch học
                                                        </button>}
                                                        {(lesson.is_change || user.role == 2) &&
                                                        <button className="btn btn-white width-100"
                                                                onClick={() => this.openModalClassLesson(lesson)}>
                                                            Đổi lịch dạy
                                                        </button>}
                                                        {(lesson.is_change || user.role == 2) &&
                                                        <button className="btn btn-white width-100"
                                                                onClick={() => this.openModalChangeTeacher(lesson)}>
                                                            Đổi giảng viên
                                                        </button>}
                                                        {(lesson.is_change || user.role == 2) &&
                                                        <button className="btn btn-white width-100"
                                                                onClick={() => this.openModalTeachAssis(lesson)}>
                                                            Đổi trợ giảng
                                                        </button>}
                                                        <button className="btn btn-white width-100"
                                                                onClick={() => this.openModalDetailLessonAttendance(lesson.id)}>
                                                            Điểm danh
                                                        </button>
                                                        {/*{(lesson.is_change || user.role == 2) &&*/}
                                                        {/*<button className="btn btn-white width-100"*/}
                                                        {/*        onClick={() => this.openModalTeachingLesson(lesson, 1)}>*/}
                                                        {/*    Danh sách giảng viên*/}
                                                        {/*</button>}*/}
                                                        {/*{(lesson.is_change || user.role == 2) &&*/}
                                                        {/*<button className="btn btn-white width-100"*/}
                                                        {/*        onClick={() => this.openModalTeachingLesson(lesson, 2)}>*/}
                                                        {/*    Danh sách trợ giảng*/}
                                                        {/*</button>}*/}

                                                    </div>
                                                </Overlay>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                    }
                    </tbody>
                </table>
                {!(!isLoading && classData.lessons && classData.lessons.length > 0) &&
                <EmptyData/>}

                <Modal show={showModalLessonEvent} onHide={this.closeModalLessonEvent} bsSize="large">
                    <Modal.Header closeButton>
                        <h4 className="modal-title text-center">{modalEvent.modalText}</h4>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="table-responsive table-no-border  table-split">
                            <table className="table">
                                <thead className="text-rose">
                                <tr>
                                    <th>Học viên</th>
                                    <th className="text-center">Đã hoàn thành</th>
                                    <th className="text-center">Nhận xét</th>
                                </tr>
                                </thead>
                                <tbody>
                                {classData && classData.registers && classData.registers.map((register, key) => {
                                    let {student} = register;
                                    let currentObj = lessonEventStudent[key] || {
                                        comment: ''
                                    };

                                    if (isEmptyInput(currentObj.comment) && lessonEventType == LESSON_EVENT_TYPES_OBJECT["comment"].type)
                                        currentObj.comment = 'Learning attitude:\nParticipation\tBehaviors:\nLanguage skills:\nImprovement points:';

                                    return (
                                        <tr key={key}>
                                            <td style={{maxWidth: 130}}>
                                                <div className="flex flex-align-items-center">
                                                    <div className="avatar-list-staff"
                                                         style={{
                                                             background: 'url(' + student.avatar_url + ') center center / cover',
                                                             display: 'inline-block', marginRight: 10
                                                         }}
                                                    />
                                                    <div><b>{student.name}</b></div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex flex-justify-content-center">
                                                    <div style={{width: 50}}>
                                                        <CheckBoxMaterial
                                                            name="status"
                                                            checked={currentObj.status == 'done'}
                                                            onChange={(e) => this.updateFormModalEvent(e, key)}/>
                                                        {/*    <div><b>Đã hoàn thành</b></div>*/}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {/*<FormInputText name="comment"*/}
                                                {/*               value={currentObj.comment}*/}
                                                {/*               disabled={isLoadingSavingClassLessonEvents}*/}
                                                {/*               placeholder={modalEvent.placeholder}*/}
                                                {/*               className="form-grey"*/}
                                                {/*               updateFormData={(e) => this.updateFormModalEvent(e, key)}*/}
                                                {/*/>*/}

                                                <div className="form-grey">

                                                    <div className="form-group text-area-grey">
                                                         <textarea className="form-control"
                                                                   rows={5}
                                                                   disabled={isLoadingSavingClassLessonEvents}
                                                                   name="comment"
                                                                   placeholder={modalEvent.placeholder}
                                                                   value={currentObj.comment}
                                                                   onChange={(e) => this.updateFormModalEvent(e, key)}/>

                                                    </div>
                                                </div>

                                            </td>
                                        </tr>);
                                })}
                                </tbody>
                            </table>
                            <div className="flex flex-align-items-center flex-end">
                                <div className="btn btn-white" onClick={this.closeModalLessonEvent}>Hủy</div>
                                {isLoadingSavingClassLessonEvents ?
                                    <div className="btn button-green disabled">
                                        <i className="fa fa-spinner fa-spin"/> Đang lưu</div>
                                    :
                                    <div className="btn button-green" onClick={this.submitModalLessonEvent}>Hoàn
                                        tất</div>
                                }
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>
                <Modal show={showModalDelayLessons} onHide={this.closeModalDelayLessons} bsSize="small">
                    <Modal.Header closeButton>
                        <h4 className="modal-title text-center">Dời lịch học</h4>
                        {showModalDelayLessons &&
                        <p className="text-center">Tất cả các buổi sau Buổi {delayLesson.order}</p>}
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-grey">
                            <label>Lịch học hiện tại</label>
                            <FormInputText
                                value={classData.study_time}
                                disabled
                            />
                            <label>Ngày hiện tại</label>
                            <FormInputText
                                value={delayLesson.time}
                                disabled
                            />
                            <label>Ngày mới</label>
                            <FormInputDate name="newDate" id="form-delay-new-date"
                                           value={delayData.newDate}
                                           format={DATE_VN_FORMAT}
                                // minDate={moment(delayLesson.time, DATE_VN_FORMAT).add(1, 'days')}
                                //            minDate={moment.}
                                           updateFormData={(e) => this.setState({
                                               delayData: {...delayData, newDate: e.target.value}
                                           })}/>
                            <label>Ghi chú</label>
                            <FormInputText name="note"
                                           value={delayData.note}
                                           updateFormData={(e) => this.setState({
                                               delayData: {...delayData, note: e.target.value}
                                           })}
                            />
                            <div className="table-responsive">
                                <table className="margin-top-20">
                                    <thead>
                                    <tr>
                                        <th/>
                                        <th>Ngày cũ</th>
                                        <th/>
                                        <th>Ngày mới</th>
                                    </tr>
                                    </thead>
                                    <br/>
                                    <tbody>
                                    {moveLessons.map((lesson, key) => {
                                        return (
                                            <tr key={key}>
                                                <td style={{width: 80}}><b>Buổi {lesson.order}</b></td>
                                                <td style={{width: 80}}>{lesson.oldTime}</td>
                                                <td style={{width: 25}}><b>→</b></td>
                                                <td style={{width: 80}}>{lesson.time}</td>
                                            </tr>);
                                    })}
                                    {/*{classData && classData.lessons && classData.lessons.slice(delayLessonIndex, classData.lessons.length).map((lesson, key) => {*/}
                                    {/*    let currentDate = moment(lesson.time, DATE_VN_FORMAT)*/}
                                    {/*    let newDate = key == 0 ? delayLesson.time : findNextInstanceInDaysArray(moment(lesson.time, DATE_VN_FORMAT)*/}
                                    {/*    lesson[key - 1],*/}
                                    {/*)*/}
                                    {/*    let delayDate = moment(delayData.newDate, DATE_VN_FORMAT).diff(moment(delayLesson.time, DATE_VN_FORMAT), 'days');*/}
                                    {/*    let newDate = moment(lesson.time, DATE_VN_FORMAT).add(delayDate, 'days');*/}
                                    {/*    newDate = findNextInstanceInDaysArray(newDate, [2, 4]).format(DATE_VN_FORMAT);*/}
                                    {/*    return (*/}
                                    {/*        <tr key={key}>*/}
                                    {/*            <td style={{width: 80}}><b>Buổi {lesson.order}</b></td>*/}
                                    {/*            <td style={{width: 80}}>{lesson.time}</td>*/}
                                    {/*            <td style={{width: 25}}><b>→</b></td>*/}
                                    {/*            <td style={{width: 80}}>{newDate}</td>*/}
                                    {/*        </tr>);*/}
                                    {/*})}*/}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex-end margin-top-10">
                                <div className="btn btn-white">Hủy</div>
                                <div className="btn button-green"
                                     onClick={() => this.saveDelayLessons(moveLessons)}
                                >Xác nhận
                                </div>
                            </div>

                        </div>
                    </Modal.Body>
                </Modal>

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
                        {this.state.typeTeachingLesson === 1 ? " giảng viên" : " trợ giảng"} buổi {this.state.attendanceSelected.order}</h4>
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
                                                let avatar = avatarEmpty(teacher.avatar_url) ?
                                                    NO_AVATAR : teacher.avatar_url;
                                                return (
                                                    <tr key={index}>
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
                <LessonDetailModal
                    show={this.state.showModalDetailLesson}
                    onHide={this.closeModalDetailLesson}
                    class={this.props.classData}
                    list={this.props.lesson}
                    isLoadingLessonDetailModal={this.props.isLoadingLessonDetailModal}
                    updateData={this.updateModalAttendanceData}
                    commitData={this.commitModalAttendanceData}
                    isCommitting={this.props.isTakingAttendance}
                    index={this.state.selectedLessonId}
                    commitSuccess={this.commitAttendanceSuccess}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        classData: state.classes.class,
        isLoading: state.classes.isLoading,
        user: state.login.user,
        isLoadingClass: state.classes.isLoadingClass,
        isChangingClassLesson: state.classes.isChangingClassLesson,
        isChangingTeachingAssis: state.classes.isChangingTeachingAssis,
        isChangingTeacher: state.classes.isChangingTeacher,
        isLoadingStaffs: state.classes.isLoadingStaffs,
        isLoadingTeachingLesson: state.classes.isLoadingTeachingLesson,
        isStoringClass: state.classes.isStoringClass,
        teachingLessons: state.classes.teachingLessons,
        staffs: state.classes.staffs,
        isChangingTeachingLesson: state.classes.isChangingTeachingLesson,
        isAddingCheckinCheckout: state.classes.isAddingCheckinCheckout,
        isLoadingSavingClassLessonEvents: state.classes.isLoadingSavingClassLessonEvents,
        isLoadingLessonDetailModal: state.attendance.isLoadingLessonDetailModal,
        isTakingAttendance: state.attendance.isTakingAttendance,
        lesson: state.attendance.lesson,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceActions: bindActionCreators(attendanceActions, dispatch),
        classActions: bindActionCreators(classActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTeachingContainer);

