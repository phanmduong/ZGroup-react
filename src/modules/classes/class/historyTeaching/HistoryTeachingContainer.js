/**
 * Created by phanmduong on 9/21/17.
 */
import React from 'react';
import * as classActions from "../../classActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {avatarEmpty, getShortName} from "../../../../helpers/helper";
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
        console.log(lessonEvent);
        let lessonEventStudent = this.props.classData.registers.map((r) => {
            let {student} = r;
            let student_class_lesson_event = r.events.filter(e => e.event_type == lessonEventType && e.lesson_id == lessonEvent.lesson_id)[0] || {};
            console.log(r.events, student_class_lesson_event);

            return {
                student_class_lesson_event_id: student_class_lesson_event ? student_class_lesson_event.id : null,
                student_id: student.id,
                class_lesson_event_id: student_class_lesson_event.class_lesson_event_id,
                lesson_event_id: classLessonEvent.lesson_event_id,
                class_lesson_id: lessonEvent.id,
                comment: student_class_lesson_event ? student_class_lesson_event.data : ''
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
        console.log(lessonEventStudent);
        classActions.saveStudentLessonEvent(lessonEventStudent, () => {
            classActions.loadClass(params.classId);
        });
    };

    updateFormInputEvent = (e, index) => {
        let {name, value} = e.target;
        let lessonEventStudent = {...this.state.lessonEventStudent};
        lessonEventStudent[index][name] = value;
        this.setState({lessonEventStudent});
    };

    saveDelayLessons = () => {
        let {classData, params, classActions} = this.props;
        let {delayLessonIndex, delayData} = this.state;
        let delayLesson = classData && classData.lessons && classData.lessons[delayLessonIndex] ? classData.lessons[delayLessonIndex] : {};
        console.log(delayLessonIndex, delayLesson);
        let lessons = [];
        if (classData && classData.lessons) classData.lessons.slice(delayLessonIndex, classData.lessons.length).map((lesson) => {
            let delayDate = moment(delayData.newDate, DATE_VN_FORMAT).diff(moment(delayLesson.time, DATE_VN_FORMAT), 'days');
            let newDate = moment(lesson.time, DATE_VN_FORMAT).add(delayDate, 'days').format(DATE_FORMAT_SQL);
            lessons.push({
                time: newDate,
                class_lesson_id: lesson.class_lesson_id,
                note: delayData.note || ''
            });
        });
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

    render() {
        let {classData, isLoading, user, isLoadingSavingClassLessonEvents} = this.props;
        let {show, showModalDelayLessons, showModalLessonEvent, delayLessonIndex, delayData, lessonEventStudent, lessonEventType} = this.state;
        let delayLesson = classData && classData.lessons && classData.lessons[delayLessonIndex] ? classData.lessons[delayLessonIndex] : {};
        let modalEvent = LESSON_EVENT_TYPES_OBJECT[lessonEventType] || {};
        console.log(classData);
        return (
            <div className="table-responsive table-split table-hover">
                <table className="table" cellSpacing="0" id="list_register">
                    {/*<thead className="text-rose">*/}
                    {/*<tr>*/}
                    {/*    <th/>*/}
                    {/*    <th>Tên</th>*/}
                    {/*    <th>Đổi</th>*/}
                    {/*</tr>*/}
                    {/*</thead>*/}
                    <tbody>
                    {
                        !isLoading && classData.lessons && classData.lessons.length > 0 ? classData.lessons.map((lesson, key) => {
                                let color = lesson.studied ? 'success' : '';
                                let minWidth = 120, margin = '5px 3px';
                                return (
                                    <tr key={key} className={color}>

                                        <td>
                                            <div className="flex flex-align-items-center">
                                                {Object.entries(LESSON_EVENT_TYPES_OBJECT).map(entry => {
                                                    let de = LESSON_EVENT_TYPES_OBJECT[entry[0]];
                                                    let lesson_event = lesson.events.filter(e => e.event_type == de.type)[0];
                                                    if(lesson_event) return (<TooltipButton text={de.name} placement="top">
                                                        <div className="icon8 icon8-wrap cursor-pointer margin-right-5"
                                                             mask="on"
                                                             icon={de.type}
                                                             onClick={() => this.openModalLessonEvent(lesson,de.type, lesson_event)}
                                                        >
                                                            <div className="icon"/>
                                                        </div>
                                                    </TooltipButton>);
                                                })}

                                            </div>
                                        </td>
                                        <td style={{minWidth: '100px'}}>
                                            <a target="_blank"
                                               href={"/teaching/courses/lessons/edit/" + classData.course.id + "/" + lesson.lesson_id}><strong>Buổi {lesson.order}</strong></a>

                                        </td>
                                        <td><a
                                            style={{fontWeight: 400}}
                                            target="_blank"
                                            href={"/teaching/courses/lessons/edit/" + classData.course.id + "/" + lesson.lesson_id}>{lesson.name}</a>
                                        </td>
                                        <td>{lesson.term && <a
                                            style={{fontWeight: 400}}
                                            target="_blank"
                                            href={"/teaching/courses/lessons/edit/" + classData.course.id + "/" + lesson.lesson_id}>{lesson.term.name}</a>}
                                        </td>
                                        <td>
                                            <div>
                                                <div>{lesson.start_time}-{lesson.end_time}</div>
                                                <div>{lesson.time}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex flex-wrap">

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
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{position: "relative"}} className="">
                                                <button className="btn btn-actions" mask="extra-table"
                                                        ref={"target" + key} onClick={() => this.toggle(key)}>

                                                    <i className="material-icons">arrow_drop_down</i>
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
                            :
                            <EmptyData/>
                    }
                    </tbody>
                </table>

                <Modal show={showModalLessonEvent} onHide={this.closeModalLessonEvent} bsSize="large">
                    <Modal.Header closeButton>
                        <h4 className="modal-title text-center">{modalEvent.modalText}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="table-responsive table-no-border">
                            <table className="table" cellSpacing="0" id="list_score">
                                <tbody>
                                {classData && classData.registers && classData.registers.map((register, key) => {
                                    let {student} = register;
                                    let currentObj = lessonEventStudent[key] || {};
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
                                                <FormInputText name="comment"
                                                               value={currentObj.comment}
                                                               disabled={isLoadingSavingClassLessonEvents}
                                                               placeholder={modalEvent.placeholder}
                                                               className="form-grey"
                                                               updateFormData={(e) => this.updateFormInputEvent(e, key)}
                                                />
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
                                           minDate={moment(delayLesson.time, DATE_VN_FORMAT).add(1, 'days')}
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
                                    {classData && classData.lessons && classData.lessons.slice(delayLessonIndex, classData.lessons.length).map((lesson, key) => {
                                        let delayDate = moment(delayData.newDate, DATE_VN_FORMAT).diff(moment(delayLesson.time, DATE_VN_FORMAT), 'days');
                                        let newDate = moment(lesson.time, DATE_VN_FORMAT).add(delayDate, 'days').format(DATE_VN_FORMAT);
                                        return (
                                            <tr key={key}>
                                                <td style={{width: 80}}><b>Buổi {lesson.order}</b></td>
                                                <td style={{width: 80}}>{lesson.time}</td>
                                                <td style={{width: 25}}><b>→</b></td>
                                                <td style={{width: 80}}>{newDate}</td>
                                            </tr>);
                                    })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex-end margin-top-10">
                                <div className="btn btn-white">Hủy</div>
                                <div className="btn button-green"
                                     onClick={this.saveDelayLessons}
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
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTeachingContainer);
