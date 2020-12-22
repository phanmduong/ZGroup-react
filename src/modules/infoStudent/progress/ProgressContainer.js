/**
 * Created by phanmduong on 9/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as studentActions from '../studentActions';
import Loading from '../../../components/common/Loading';
import Attendances from './Attendances';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import CreateRegisterOverlay from "../overlays/CreateRegisterOverlay";
import {isEmptyInput} from "../../../helpers/helper";
import EmptyData from "../../../components/common/EmptyData";
import moment from "moment";
import {DATE_FORMAT_SQL, DATE_VN_FORMAT, LESSON_EVENT_TYPES_OBJECT} from "../../../constants/constants";
import TooltipButton from "../../../components/common/TooltipButton";

class ProgressContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.studentId = this.props.params ? this.props.params.studentId : this.props.studentId;
        this.state = {
            selectedTabs: {}
        };
        this.tabs = [
            {label: 'Điểm danh',},
            {label: 'Bài kiểm tra',},
            // {label: 'Sự kiện',},
            ...Object.keys(LESSON_EVENT_TYPES_OBJECT).map((event_type) => {
                return {
                    label: LESSON_EVENT_TYPES_OBJECT[event_type].name
                };
            }),
        ];
    }


    componentWillMount() {
        this.props.studentActions.loadProgress(this.studentId);
    }

    computeCertificate(items) {
        if (items[0] === null) {
            return 0;
        }
        let lessonsAttended = _.filter(items, {status: 1}).length;

        const percent = lessonsAttended * 100 / items.length;
        if (percent > 70) {
            return 1;
        } else {
            if (lessonsAttended <= 0) {
                return 0;
            } else {
                return -1;
            }
        }
    }

    tooltip(text) {
        const toolTip = (
            <Tooltip id="tooltip">{text}</Tooltip>
        );
        return (
            <OverlayTrigger placement="right" overlay={toolTip}>
                <div style={{fontSize: '1px'}}>.</div>
            </OverlayTrigger>
        );
    }

    renderCup(type) {
        switch (type) {
            case 1:
                return (
                    <div className="dot-bottom-right"
                         style={{backgroundColor: '#ffc300'}}
                    >
                        {this.tooltip('Bằng giỏi')}
                    </div>
                );
            case -1:
                return (
                    <div className="dot-bottom-right"
                         style={{backgroundColor: '#959595'}}
                    >
                        {this.tooltip('Không có bằng')}
                    </div>
                );
            default:
                return (<div/>);
        }
    }

    renderEventTab = (event_type,classLessonEvents) => {
        // let event_obj = LESSON_EVENT_TYPES_OBJECT[event_type];
        let event_arr = classLessonEvents ? classLessonEvents.filter(e => e.event_type == event_type) : [];

        if (event_arr.length > 0) return(
            <div className="col-md-12">
                <div className="max-height-400 smooth-scroll-y">
                    {/*{Object.keys(LESSON_EVENT_TYPES_OBJECT).map((event_type) => {*/}
                                <div className="margin-bottom-10">
                                    {/*<div><b>{event_obj.name}</b></div>*/}
                                    <div className="">
                                        <table id="datatables"
                                               className="table table-hover table-split"
                                               cellSpacing="0" width="100%"
                                               style={{width: "100%"}}>
                                            <tbody>
                                            {event_arr.map((event, key_event) => {
                                                let event_time = moment(event.time, DATE_FORMAT_SQL).format(DATE_VN_FORMAT);

                                                return (<tr key={key_event}>
                                                    <td>{`Buổi ${event.order}`}</td>
                                                    <td>{event_time}</td>
                                                    <td>{event.status == 'done' ? 'Hoàn thành' : 'Chưa hoàn thành'}</td>
                                                    <td><TooltipButton
                                                        text={`Nhập bởi ${event.creator_name}`}
                                                        placement="top">
                                                        <div>{event.data}</div>
                                                    </TooltipButton>
                                                    </td>

                                                </tr>);
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                    {/*})}*/}
                </div>
            </div>
        );
        return (<b>Không có dữ liệu</b>);
    }

    render() {
        console.log(this.props);
        return (
            <div className="tab-pane active">

                {this.props.isLoadingProgress ? <Loading/>
                    :
                    <ul className="timeline timeline-simple">
                        <li className="timeline-inverted">
                            <div className="timeline-badge" style={{backgroundColor: '#4855d1'}}>
                                <i className="material-icons">add</i>
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <div className="flex flex-align-items-center margin-top-5">
                                        <CreateRegisterOverlay
                                            className="btn btn-actions"
                                        />
                                    </div>
                                </div>
                                <div className="timeline-body margin-vertical-30"/>

                            </div>
                        </li>

                        {
                            this.props.progress && this.props.progress.length > 0 ? this.props.progress.map((progressClass, index) => {
                                let noneGroup = progressClass.exams.filter(e => isEmptyInput(e.group_exam_id));
                                let currentTab = this.state.selectedTabs[index] || 0;
                                let sum_hw = progressClass.attendances.reduce((hw_sum, atd) => hw_sum + (atd.status.hw_status ? 1 : 0), 0);
                                let firstAttendanceSuccess = progressClass.attendances.filter(atd => atd.status && atd.status.status)[0];
                                let firstAttendanceSuccessTime = firstAttendanceSuccess ?
                                    moment(firstAttendanceSuccess.status.class_lesson.time, DATE_FORMAT_SQL).format(DATE_VN_FORMAT)
                                    : 'Không có'
                                ;

                                return (
                                    <li className="timeline-inverted" key={index}>
                                        <div className="timeline-badge">
                                            {/*<div className="container-dot-bottom-right">*/}
                                            <div>
                                                <img className="circle" src={progressClass.icon_url} alt=""/>
                                                {this.renderCup(this.computeCertificate(progressClass.attendances))}
                                            </div>

                                        </div>
                                        <div className="timeline-panel">
                                            <h4>
                                                <b>{progressClass.name}</b>
                                            </h4>
                                            <div className="timeline-body">
                                                <div className="row">
                                                    <div className="col-md-8 col-sm-9">
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">access_time</i>
                                                            <b>&nbsp; &nbsp; {progressClass.study_time} </b>
                                                        </div>
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">access_time</i>
                                                            &nbsp; &nbsp;Ngày bắt đầu học:&nbsp;
                                                            <b>{firstAttendanceSuccessTime} </b>
                                                        </div>
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">home</i>&nbsp; &nbsp;
                                                            {progressClass.room + ' - ' + progressClass.base}
                                                        </div>
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">date_range</i>&nbsp; &nbsp; {progressClass.description}
                                                        </div>
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">loop</i>&nbsp; &nbsp;
                                                            Học lần thứ {progressClass.time}
                                                        </div>
                                                        {
                                                            progressClass.teach &&
                                                            <div className="flex-row-center">
                                                                <i className="material-icons">account_box
                                                                </i>&nbsp; &nbsp; Giảng
                                                                viên: {progressClass.teach.name}
                                                            </div>
                                                        }
                                                        {
                                                            progressClass.assist &&
                                                            <div className="flex-row-center">
                                                                <i className="material-icons">account_box
                                                                </i>&nbsp; &nbsp; Trợ
                                                                giảng: {progressClass.assist.name}
                                                            </div>
                                                        }
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">assignment_turned_in</i>&nbsp; &nbsp;
                                                            Điểm danh
                                                        </div>
                                                        <Attendances
                                                            attendances={progressClass.attendances}
                                                        />
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">assignment_turned_in</i>&nbsp; &nbsp;
                                                            Bài tập
                                                        </div>
                                                        <div className="content-progress-student">
                                                            <div
                                                                className="progress progress-line-success progress-student">
                                                                <div className="progress-bar progress-bar-success"
                                                                     style={{width: sum_hw * 100 / progressClass.attendances.length + "%"}}>
                                                                    <span className="sr-only">{sum_hw}</span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="text-progress-student">{sum_hw + "/" + progressClass.attendances.length}</div>
                                                        </div>

                                                        {/*<Topics*/}
                                                        {/*    topics={progressClass.topics}*/}
                                                        {/*/>*/}

                                                        {Object.keys(LESSON_EVENT_TYPES_OBJECT).map((event_type) => {
                                                            let event_obj = LESSON_EVENT_TYPES_OBJECT[event_type];
                                                            let lesson_events_count = progressClass.lesson_events.filter(e => e.event_type == event_type).length;
                                                            let student_lesson_events_count = progressClass.classLessonEvents.filter(e => e.event_type == event_type && e.status == 'done').length;
                                                            let event_percentage = lesson_events_count ? (student_lesson_events_count / lesson_events_count * 100) : 0;
                                                            return ([<div className="flex-row-center">
                                                                <i className="material-icons">{event_obj.progress_icon}</i>&nbsp; &nbsp;
                                                                {event_obj.name}
                                                            </div>, <div className="content-progress-student">
                                                                <div
                                                                    className="progress progress-line-success progress-student">
                                                                    <div className="progress-bar progress-bar-success"
                                                                         style={{width: event_percentage + "%"}}>
                                                                        <span
                                                                            className="sr-only">{student_lesson_events_count}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="text-progress-student">
                                                                    {student_lesson_events_count + "/" + lesson_events_count}
                                                                </div>
                                                            </div>]);
                                                        })}

                                                    </div>
                                                    <div className="col-md-4 col-sm-3">
                                                        {progressClass.code &&
                                                        <div className="content-qr-code">
                                                            <img
                                                                className="square-100"
                                                                src={"http://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + progressClass.code + "&bgcolor=FFFFFF&color=000000&qzone=2&format=svg"}/>
                                                            <div>{progressClass.code}</div>
                                                        </div>
                                                        }

                                                    </div>
                                                </div>
                                                <div className="row margin-top-20">
                                                    <div className="col-md-12">
                                                        <div className="flex flex-wrap">
                                                            {this.tabs.map((tab, key) => {
                                                                let classNameTab = currentTab == key ? "btn btn-actions btn-github" : "btn btn-actions background-transparent";
                                                                return (
                                                                    <div className={classNameTab}
                                                                         onClick={() => {
                                                                             let {selectedTabs} = this.state;
                                                                             selectedTabs[index] = key;
                                                                             this.setState({selectedTabs});
                                                                         }}
                                                                    >{tab.label}</div>
                                                                );
                                                            })}


                                                        </div>
                                                    </div>
                                                    {currentTab == 0 && <div className="col-md-12">
                                                        {!progressClass.attendances || progressClass.attendances.length == 0 &&
                                                        <div><b>Không có dữ liệu</b></div>}
                                                        {progressClass.attendances && progressClass.attendances.length > 0 &&
                                                        <div className="max-height-400 smooth-scroll-y">
                                                            <table id="datatables"
                                                                   className="table table-hover table-split"
                                                                   cellSpacing="0" width="100%"
                                                                   style={{width: "100%"}}>
                                                                <tbody>
                                                                {progressClass.attendances.map((atd, key_atd) => {
                                                                    let atd_data = atd.status && atd.status.class_lesson && atd.status.class_lesson.lesson ? atd.status.class_lesson.lesson : {};
                                                                    let atded = atd.status && atd.status.status == 1;
                                                                    let atd_time = moment(atd.status.class_lesson.time, DATE_FORMAT_SQL).format(DATE_VN_FORMAT);
                                                                    let atd_note = atd.status ? atd.status.note : '';
                                                                    return (<tr key={key_atd}>
                                                                        <td>{`Buổi ${atd_data.order}`}</td>
                                                                        <td>
                                                                            <div
                                                                                style={{color: atded ? '#32CA41' : '#DE0D02'}}>{atded ? 'Có mặt' : 'Vắng mặt'}</div>
                                                                        </td>
                                                                        <td>{atd_time}</td>
                                                                        <td>{atd_note}</td>

                                                                    </tr>);
                                                                })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        }
                                                    </div>}
                                                    {currentTab == 1 && <div className="col-md-12">

                                                        {progressClass.exams.length == 0 && noneGroup.length == 0 &&                                                        <div><b>Không có dữ liệu</b></div>}

                                                        {progressClass.exams.length > 0 &&                                                        <div className="max-height-400 smooth-scroll-y">
                                                            {progressClass.group_exams.map(group => {
                                                                return (
                                                                    <div className="margin-bottom-10">
                                                                        <div><b>{group.name}</b></div>
                                                                        <div className="">
                                                                            <table id="datatables"
                                                                                   className="table table-hover table-split"
                                                                                   cellSpacing="0" width="100%"
                                                                                   style={{width: "100%"}}>
                                                                                <tbody>
                                                                                {progressClass.exams.filter(e => e.group_exam_id == group.id).map(exam => {
                                                                                    return (<tr>
                                                                                        <td>{exam.title}</td>
                                                                                        <td>{exam.score}</td>
                                                                                        <td>{exam.comment}</td>
                                                                                        {exam.inputTeacher ? <td>Nhập
                                                                                            bởi <b>{exam.inputTeacher.name}</b>
                                                                                        </td> : <td/>}
                                                                                        <td>{exam.created_at}</td>
                                                                                    </tr>);
                                                                                })}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                            {noneGroup && noneGroup.length > 0 &&
                                                            <div className="margin-bottom-10">
                                                                <div><b>Không có nhóm</b></div>
                                                                <div className="">
                                                                    <table id="datatables"
                                                                           className="table table-hover table-split"
                                                                           cellSpacing="0" width="100%"
                                                                           style={{width: "100%"}}>
                                                                        <tbody>
                                                                        {noneGroup.map(exam => {
                                                                            return (<tr>
                                                                                <td>{exam.title}</td>
                                                                                <td>{exam.score}</td>
                                                                                <td>{exam.comment}</td>
                                                                                {exam.inputTeacher ? <td>Nhập
                                                                                    bởi <b>{exam.inputTeacher.name}</b>
                                                                                </td> : <td/>}
                                                                                <td>{exam.created_at}</td>
                                                                            </tr>);
                                                                        })}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>}

                                                        </div>}
                                                    </div>}

                                                    {currentTab == 2 && this.renderEventTab(LESSON_EVENT_TYPES_OBJECT.book.type,progressClass.classLessonEvents)}
                                                    {currentTab == 3 && this.renderEventTab(LESSON_EVENT_TYPES_OBJECT.comment.type,progressClass.classLessonEvents)}
                                                    {currentTab == 4 && this.renderEventTab(LESSON_EVENT_TYPES_OBJECT.writing.type,progressClass.classLessonEvents)}
                                                    {/*{currentTab == 2 && <div className="col-md-12">*/}
                                                    {/*    {!progressClass.classLessonEvents || progressClass.classLessonEvents.length == 0 &&*/}
                                                    {/*    <b>Không có dữ liệu</b>}*/}
                                                    {/*    {progressClass.classLessonEvents && progressClass.classLessonEvents.length > 0 &&*/}
                                                    {/*    <div className="max-height-400 smooth-scroll-y">*/}
                                                    {/*        {Object.keys(LESSON_EVENT_TYPES_OBJECT).map((event_type) => {*/}
                                                    {/*            // let event_obj = LESSON_EVENT_TYPES_OBJECT[event_type];*/}
                                                    {/*            let event_arr = progressClass.classLessonEvents.filter(e => e.event_type == event_type) || [];*/}
                                                    {/*            if (event_arr.length > 0)*/}
                                                    {/*                return (*/}
                                                    {/*                    <div className="margin-bottom-10">*/}
                                                    {/*                        /!*<div><b>{event_obj.name}</b></div>*!/*/}
                                                    {/*                        <div className="">*/}
                                                    {/*                            <table id="datatables"*/}
                                                    {/*                                   className="table table-hover table-split"*/}
                                                    {/*                                   cellSpacing="0" width="100%"*/}
                                                    {/*                                   style={{width: "100%"}}>*/}
                                                    {/*                                <tbody>*/}
                                                    {/*                                {event_arr.map((event, key_event) => {*/}
                                                    {/*                                    let event_time = moment(event.time, DATE_FORMAT_SQL).format(DATE_VN_FORMAT);*/}

                                                    {/*                                    return (<tr key={key_event}>*/}
                                                    {/*                                        <td>{`Buổi ${event.order}`}</td>*/}
                                                    {/*                                        <td>{event_time}</td>*/}
                                                    {/*                                        <td>{event.status == 'done' ? 'Hoàn thành' : 'Chưa hoàn thành'}</td>*/}
                                                    {/*                                        <td><TooltipButton*/}
                                                    {/*                                            text={`Nhập bởi ${event.creator_name}`}*/}
                                                    {/*                                            placement="top">*/}
                                                    {/*                                            <div>{event.data}</div>*/}
                                                    {/*                                        </TooltipButton>*/}
                                                    {/*                                        </td>*/}

                                                    {/*                                    </tr>);*/}
                                                    {/*                                })}*/}
                                                    {/*                                </tbody>*/}
                                                    {/*                            </table>*/}
                                                    {/*                        </div>*/}
                                                    {/*                    </div>*/}
                                                    {/*                );*/}
                                                    {/*        })}*/}
                                                    {/*    </div>}*/}
                                                    {/*</div>}*/}


                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            }) : <EmptyData title={"<b>Không có dữ liệu</b> học tập"}/>
                        }
                    </ul>
                }

            </div>
        );
    }
}

ProgressContainer.propTypes = {
    progress: PropTypes.array.isRequired,
    studentActions: PropTypes.object.isRequired,
    isLoadingProgress: PropTypes.bool.isRequired,
    location: PropTypes.object,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        student: state.infoStudent.student,
        progress: state.infoStudent.progress,
        isLoadingProgress: state.infoStudent.isLoadingProgress
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressContainer);
