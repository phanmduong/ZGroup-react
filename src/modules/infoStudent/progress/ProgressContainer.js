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
import Topics from "./Topics";
import CreateRegisterOverlay from "../overlays/CreateRegisterOverlay";
import {isEmptyInput} from "../../../helpers/helper";
import EmptyData from "../../../components/common/EmptyData";

class ProgressContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.studentId = this.props.params ? this.props.params.studentId : this.props.studentId;

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

    render() {

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
                                return (
                                    <li className="timeline-inverted" key={index}>
                                        <div className="timeline-badge">
                                            <div className="container-dot-bottom-right">
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
                                                            <i className="material-icons">home</i>&nbsp; &nbsp;
                                                            {progressClass.room + ' - ' + progressClass.base}
                                                        </div>
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">date_range</i>&nbsp; &nbsp; {progressClass.description}
                                                        </div>
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">loop</i>&nbsp; &nbsp; Học lần
                                                            thứ {progressClass.time}
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
                                                        <Topics
                                                            topics={progressClass.topics}
                                                        />


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
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="margin-top-10">
                                                            {progressClass.group_exams.map(group => {
                                                                return (
                                                                    <div className="margin-bottom-10">
                                                                        <div><b>{group.name}</b></div>
                                                                        <div className="padding-left-15">
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
                                                                <div className="padding-left-15">
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            }) : <EmptyData title={"Không có dữ liệu học tập"}/>
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
