import React from 'react';
import {connect} from 'react-redux';
import * as attendanceActions from "../../attendance/attendanceActions";
import * as classActions from "../classActions";
import {bindActionCreators} from 'redux';
import * as ReactDOM from "react-dom";
import {Modal, Overlay} from 'react-bootstrap';
import ItemReactSelect from "../../../components/common/ItemReactSelect";
import ReactSelect from "react-select";
import {getShortName, showErrorNotification, showNotification, showWarningNotification} from "../../../helpers/helper";
import * as lessonsActions from "../../lessons/lessonsActions";
import TooltipButton from "../../../components/common/TooltipButton";
import CheckBoxMaterial from "../../../components/common/CheckBoxMaterial";
import moment from "moment";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import Loading from "../../../components/common/Loading";
import {changeTeachMultiLesson} from "../classApi";

const modalStates = {
    teacher: {
        modalTitle: 'Đổi giảng viên',
        type: 'teacher',
        selectStaffPlaceholder: 'Chọn giảng viên',

    },
    assistant: {
        modalTitle: 'Đổi trợ giảng',
        type: 'assistant',
        selectStaffPlaceholder: 'Chọn trợ giảng',

    },
};

const changeTypes = [
    {label: 'Theo thứ trong tuần', value: 'weekDays'},
    {label: 'Đổi nhân viên khác', value: 'changeStaff'},
    {label: 'Theo học phần', value: 'term'},
];

class ChangeTeachMultiLessonOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            showModal: false,
            isLoading: false,
            isPreparing: false,
            chooseAll: false,
            modalType: 'teacher',
            changeType: changeTypes[0].value,
            staff: {},
            oldStaff: {},
            currentTerm: {},
            lessons: [],
            weekDays: [
                {name: 'Thứ 2', day: 1, status: false},
                {name: 'Thứ 3', day: 2, status: false},
                {name: 'Thứ 4', day: 3, status: false},
                {name: 'Thứ 5', day: 4, status: false},
                {name: 'Thứ 6', day: 5, status: false},
                {name: 'Thứ 7', day: 6, status: false},
                {name: 'Chủ Nhật', day: 0, status: false},
            ],
        };
        this.state = this.initState;
    }

    componentDidMount() {
        if (this.props.classData && this.props.classData.course) this.props.lessonsActions.loadTerms(this.props.classData.course.id);

    }

    toggle = () => {
        this.setState({show: !this.state.show});
    };

    close = () => {
        this.setState({
            show: false,
        });
    };

    openModal = (modalType) => {
        let lessons = [...this.props.classData.lessons];
        this.setState({lessons, modalType, isPreparing: true, showModal: true});
        setTimeout(() => this.setState({isPreparing: false})
            , 1000);

    };


    onChangeStaff = (staff) => {
        this.setState({staff});
    };

    // loadStaffs = (input, callback, field) => {
    //     if (isEmptyInput(this.timeOut)) this.timeOut = {};
    //     if (this.timeOut[field] !== null) {
    //         clearTimeout(this.timeOut[field]);
    //     }
    //     this.timeOut[field] = setTimeout(function () {
    //         findUser(input, true).then(res => {
    //
    //             let data = [
    //                 ...res.data.map((staff) => {
    //                     return {
    //                         ...staff,
    //                         ...{
    //                             value: staff.id,
    //                             label: staff.name
    //                         }
    //                     };
    //                 })
    //             ];
    //             // this.data[field] = data;
    //             callback(null, {options: data, complete: true});
    //         });
    //     }.bind(this), 500);
    // };

    onWeekDayClick = (weekDay) => {
        let weekDays = this.state.weekDays.map(wd => {
            return {
                ...wd,
                status: wd.day == weekDay.day ? !wd.status : wd.status
            };
        });
        let weekDayStatus = weekDays.filter(wd => wd.day == weekDay.day)[0].status;
        let lessons = this.state.lessons.map(l => {
            let isSameWeekDay = moment(l.class_lesson_time, DATE_FORMAT_SQL).day() == weekDay.day;
            if (isSameWeekDay) {
                l.is_checked = weekDayStatus;
            }
            return l;
        });
        this.setState({weekDays, lessons, chooseAll: false});
    };

    getTeachers = () => {
        if (!this.state.showModal) return [];
        let {classData} = this.props;
        let res = [
            {
                id: null,
                value: null,
                label: 'Các buổi chưa có giảng viên',
                name: 'Các buổi chưa có giảng viên',
                avatar_url: "http://d255zuevr6tr8p.cloudfront.net/no_photo.png",
            }
        ];
        if (classData.teacher) {
            res.push(classData.teacher);
        }
        res = [...res, ...classData.teachers_detail].map(itm => {
            return {
                ...itm,
                value: itm.id,
                label: itm.name
            };
        });
        return res;
    };

    getAssistants = () => {
        if (!this.state.showModal) return [];
        let {classData} = this.props;
        let res = [
            {
                id: null,
                value: null,
                label: 'Các buổi chưa có trợ giảng',
                name: 'Các buổi chưa có trợ giảng',
                avatar_url: "http://d255zuevr6tr8p.cloudfront.net/no_photo.png",
            }
        ];
        if (classData.teacher_assistant) {
            res.push(classData.teacher_assistant);
        }
        res = [...res, ...classData.teaching_assistants_detail].map(itm => {
            return {
                ...itm,
                value: itm.id,
                label: itm.name
            };
        });
        return res;
    };

    getTerms = () => {
        if (!this.state.showModal) return [];
        return [
            {
                id: null,
                value: null,
                label: 'Các buổi không có học phần',
                name: 'Các buổi không có học phần',
            },
            ...this.props.terms.map(t => {
                return {
                    ...t,
                    value: t.id,
                    label: t.name,
                };
            })
        ];
    };

    onChangeOldStaff = (staff) => {
        this.setState({
            oldStaff: staff,
            chooseAll: false,
            lessons: this.state.lessons.map(l => {
                l.is_checked = false;
                if (this.state.modalType == modalStates.teacher.type &&
                    ((l.teacher && staff.id == l.teacher.id) || (!l.teacher && staff.id == null))) {
                    l.is_checked = true;
                }
                if (this.state.modalType == modalStates.assistant.type &&
                    ((l.teacher_assistant && staff.id == l.teacher_assistant.id) || (!l.assistant && staff.id == null))) {
                    l.is_checked = true;
                }
                return l;
            }),
        });
    };

    onChangeTerm = (term) => {
        this.setState({
            currentTerm: term,
            chooseAll: false,
            lessons: this.state.lessons.map(l => {

                return {...l, is_checked: l.term_id == term.id};
            }),
        });
    };

    onChangeType = (changeType) => {
        console.log(changeType);
        this.setState({
            changeType: changeType.value,
            lessons: this.state.lessons.map(l => {
                return {...l, is_checked: false};
            }),
            oldStaff: {},
            currentTerm: {},
            chooseAll: false,
            weekDays: this.state.weekDays.map(wd => {
                return {...wd, status: false};
            }),
        });
    };

    onCheckLesson = (lesson) => {
        console.log(lesson);
        return this.state.lessons.map(l => {
            let is_checked = l.is_checked;
            if (l.id == lesson.id) is_checked = l.is_checked ? false : true;
            return {
                ...l,
                is_checked,
            };
        });

    };

    getAvailableWeekDays = () => {
        let wds = [];
        this.state.lessons.forEach(l => {
            let day = moment(l.class_lesson_time, DATE_FORMAT_SQL).day();
            if (wds.indexOf(day) < 0) wds.push(day);
        });
        return wds;
    };

    onChooseAll = () => {
        let chooseAll = !this.state.chooseAll;
        this.setState({
            lessons: this.state.lessons.map(l => {
                return {...l, is_checked: chooseAll};
            }),
            chooseAll,
            oldStaff: {},
            currentTerm: {},
            weekDays: this.state.weekDays.map(wd => {
                return {...wd, status: chooseAll};
            }),
        });
    };

    submitModal = () => {
        let {staff, oldStaff, lessons, modalType} = this.state;
        if (staff && oldStaff && staff.id == oldStaff.id) {
            showErrorNotification('Giảng viên mới phải khác giảng viên cũ!');
            return;
        }
        let class_lesson_ids = lessons
            .filter(l => l.is_checked)
            .map(l => l.class_lesson_id);
        let data = {
            staff_id: staff.id,
            teaching_type: modalType,
            class_lesson_ids
        };
        if (class_lesson_ids.length == 0) {
            showErrorNotification('Bạn chưa chọn buổi học nào!');
            return;

        }

        showWarningNotification("Đang lưu...");
        this.setState({isSaving: true});
        changeTeachMultiLesson(data).then(res => {
            console.log(res);
            if (res.data.status == 1) {
                showNotification("Đổi nhân viên thành công!");
                if (this.props.refresh) this.props.refresh();
                this.setState({showModal: false});
            } else {
                showErrorNotification("Có lỗi xảy ra!");
            }
        }).catch(e => {
            console.log(e);
            showErrorNotification("Có lỗi xảy ra!");
        }).finally(() => {
            this.setState({isSaving: false});

        });
    };

    render() {
        console.log(this.props);
        let {isLoading} = this.props;
        let {showModal, isSaving, isPreparing, staff, show, changeType, weekDays, oldStaff, currentTerm, lessons, chooseAll} = this.state;
        let modalType = modalStates[this.state.modalType];
        let teachers = this.getTeachers();
        let assistants = this.getAssistants();
        let terms = this.getTerms();
        let availableWeekDays = this.getAvailableWeekDays();
        return (
            <div style={{position: "relative"}} className="">
                <button className="btn btn-actions"
                        ref="target" onClick={this.toggle}
                        disabled={isLoading}>
                    Đổi giáo viên
                </button>
                <Overlay
                    rootClose={true}
                    show={show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay overlay-container" mask="extra" style={{
                        width: 175,
                        marginTop: 10,
                        left: 0,
                    }}>

                        <button type="button"
                                className="btn btn-white width-100"
                                onClick={() => this.openModal(modalStates.teacher.type)}>
                            Đổi giảng viên
                        </button>
                        <button type="button"
                                className="btn btn-white width-100"
                                onClick={() => this.openModal(modalStates.assistant.type)}>
                            Đổi trợ giảng
                        </button>


                    </div>
                </Overlay>
                <Modal show={showModal} onHide={() => this.setState(this.initState)} bsSize="large">
                    <Modal.Header closeButton>
                        <h4 className="modal-title text-center">{modalType.modalTitle}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        {(isPreparing || isSaving) && <Loading/>}
                        {!isPreparing && !isSaving && <div className="form-grey">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>{modalType.selectStaffPlaceholder} mới</label>
                                    <ReactSelect
                                        options={this.props.staffs.map(s => {
                                            return {...s, value: s.id, label: s.name};
                                        })}
                                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                                        value={staff}
                                        onChange={(e) => this.onChangeStaff(e)}
                                        clearable={false}
                                        optionRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label}
                                                                 url={option.avatar_url}/>
                                            );
                                        }}
                                        valueRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label}
                                                                 url={option.avatar_url}/>
                                            );
                                        }}
                                    />
                                    {/*<ReactSelect.Async*/}
                                    {/*    loadOptions={(p1, p2) => this.loadStaffs(p1, p2, 'staff')}*/}
                                    {/*    loadingPlaceholder="Đang tải..."*/}
                                    {/*    className="react-select-white-light-round cursor-pointer margin-bottom-20"*/}
                                    {/*    placeholder={modalType.selectStaffPlaceholder}*/}
                                    {/*    searchPromptText="Không có dữ liệu nhân viên"*/}
                                    {/*    onChange={e => this.onChangeStaff(e)}*/}
                                    {/*    clearable={false}*/}
                                    {/*    value={staff}*/}
                                    {/*    optionRenderer={(option) => {*/}
                                    {/*        return (*/}
                                    {/*            <ItemReactSelect label={option.label}*/}
                                    {/*                             url={option.avatar_url}/>*/}
                                    {/*        );*/}
                                    {/*    }}*/}
                                    {/*    valueRenderer={(option) => {*/}
                                    {/*        return (*/}
                                    {/*            <ItemReactSelect label={option.label}*/}
                                    {/*                             url={option.avatar_url}/>*/}
                                    {/*        );*/}
                                    {/*    }}*/}
                                    {/*/>*/}
                                </div>
                                <div className="col-md-6">
                                    <label>Chọn hình thức đổi</label>
                                    <ReactSelect
                                        options={changeTypes}
                                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                                        value={changeType}
                                        onChange={(e) => this.onChangeType(e)}
                                        clearable={false}
                                        searchable={false}
                                    />
                                </div>
                            </div>
                            {changeType == changeTypes[0].value &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="flex flex-justify-content-center">
                                        {weekDays.map((day, key_day) => {
                                            let className = day.status ? "btn-success " : "";
                                            if (availableWeekDays.indexOf(day.day) >= 0) return (
                                                <div key={key_day}
                                                     className={`btn btn-actions bold ${className}`}
                                                     onClick={() => this.onWeekDayClick(day)}
                                                     style={{minWidth: "12%"}}
                                                >{day.name}</div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>}

                            {changeType == changeTypes[1].value &&
                            <div className="row">
                                <div className="col-md-12">
                                    <label>{modalType.selectStaffPlaceholder}</label>
                                    <ReactSelect
                                        options={modalType.type == 'teacher' ? teachers : assistants}
                                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                                        value={oldStaff}
                                        onChange={(e) => this.onChangeOldStaff(e)}
                                        clearable={false}
                                        optionRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label}
                                                                 url={option.avatar_url}/>
                                            );
                                        }}
                                        valueRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label}
                                                                 url={option.avatar_url}/>
                                            );
                                        }}
                                    />
                                </div>
                            </div>}

                            {(changeType == changeTypes[2].value) &&

                            <div className="row">
                                <div className="col-md-12">
                                    <label>Chọn học phần</label>
                                    <ReactSelect
                                        options={terms}
                                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                                        value={currentTerm}
                                        onChange={(e) => this.onChangeTerm(e)}
                                        searchable={false}
                                        clearable={false}
                                    />
                                </div>
                            </div>}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="flex flex-end flex-align-items-center">
                                        <label>{chooseAll ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}</label>
                                        <div style={{padding: '0px 21px'}}>
                                            <CheckBoxMaterial
                                                name="chooseAll"
                                                checked={chooseAll}
                                                onChange={() => this.onChooseAll()}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="table-responsive table-split table-hover">
                                        <table className="table" cellSpacing="0" id="list_register">
                                            <tbody>
                                            {lessons.map((lesson, key_cl) => {
                                                let minWidth = 100;
                                                return (<tr key={key_cl}>
                                                    <td>
                                                        <div><strong>Buổi {lesson.order}</strong></div>

                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div>{lesson.name}</div>
                                                        </div>
                                                    </td>
                                                    <td>{lesson.term && <div>{lesson.term.name}</div>}
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div>{lesson.start_time}-{lesson.end_time}</div>
                                                            <div>{lesson.time}</div>
                                                        </div>
                                                    </td>
                                                    <td style={{width: minWidth * 2.5}}>
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
                                                                                style={{minWidth,}}>
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
                                                                                    minWidth,
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
                                                                                style={{minWidth,}}>
                                                                            NONE
                                                                            <div className="ripple-container"/>
                                                                        </button>
                                                                    </TooltipButton>
                                                            }
                                                        </div>
                                                    </td>
                                                    <td style={{width: 50}}>

                                                        <CheckBoxMaterial
                                                            name="status"
                                                            checked={lesson.is_checked}
                                                            onChange={() => this.onCheckLesson(lesson)}/>
                                                        {/*    <div><b>Đã hoàn thành</b></div>*/}

                                                    </td>
                                                </tr>);
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="flex flex-align-items-center flex-end">
                                        <div className="btn btn-white"
                                             onClick={() => this.setState(this.initState)}>Hủy
                                        </div>
                                        {isSaving ?
                                            <div className="btn button-green disabled">
                                                <i className="fa fa-spinner fa-spin"/> Đang lưu</div>
                                            :
                                            <div className="btn button-green" onClick={this.submitModal}>
                                                Xác nhận đổi</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>}
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
        isLoadingLessonDetailModal: state.attendance.isLoadingLessonDetailModal,
        isTakingAttendance: state.attendance.isTakingAttendance,
        lesson: state.attendance.lesson,
        isLoadingTerms: state.lessons.isLoading,
        terms: state.lessons.terms,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceActions: bindActionCreators(attendanceActions, dispatch),
        classActions: bindActionCreators(classActions, dispatch),
        lessonsActions: bindActionCreators(lessonsActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeTeachMultiLessonOverlay);
