/**
 * Created by phanmduong on 9/21/17.
 */
import React from 'react';
import * as classActions from "../../classActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LessonDetailModal from "../../../attendance/LessonDetailModal";
import * as attendanceActions from "../../../attendance/attendanceActions";

class ProgressClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: [],
            isLoading: false,
            showModalDetailLesson: false,
            selectedLessonId: 0,
        };
        this.state = this.initState;
    }

    openModalDetailLesson = (id) => {
        this.setState({
            showModalDetailLesson: true,
            selectedLessonId: id
        });
        this.props.attendanceActions.loadLessonDetailModal(this.props.classData.id, id);
    };

    closeModalDetailLesson = () => {
        this.setState({showModalDetailLesson: false});
    };

    render() {
        let {classData, isLoading} = this.props;
        // let {} = this.state;
        return (
            <div className="table-responsive table-split">
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
                        !isLoading && classData.lessons && classData.lessons.map((lesson, key) => {
                            let color = lesson.studied ? 'success' : '';
                            let minWidth = 120;
                            return (
                                <tr key={key} className={color}>
                                    <td>
                                        <strong>Buổi {lesson.order}</strong>
                                    </td>
                                    <td>{lesson.name}</td>
                                    <td>
                                        <div>
                                            <div>{lesson.start_time}-{lesson.end_time}</div>
                                            <div>{lesson.time}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="flex flex-align-items-center flex-space-between flex-row"
                                                 style={{width: "calc(100%)", minWidth}}>
                                                <div className="progress progress-bar-table width-100" style={{
                                                    "marginBottom": "0",
                                                    "height": "7px",
                                                    "borderRadius": "5px",
                                                    "marginRight": "10px",
                                                    "backgroundColor": "#f7f5f7"
                                                }}>
                                                    <div
                                                        className="progress-bar progress-bar-success"
                                                        role="progressbar"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                        style={{width: (100 * lesson.total_attendance / classData.total_paid) + '%',}}
                                                    >
                                                        <span className="sr-only">
                                                            {100 * lesson.total_attendance / classData.total_paid}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{fontSize: 12}}>{lesson.total_attendance}/{classData.total_paid}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="btn btn-white float-right"
                                                onClick={() => this.openModalDetailLesson(lesson.id)}>

                                            Điểm danh
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                <LessonDetailModal
                    show={this.state.showModalDetailLesson}
                    onHide={this.closeModalDetailLesson}
                    class={this.props.classData}
                    list={this.props.lesson}
                    isLoadingLessonDetailModal={this.props.isLoadingLessonDetailModal}
                    updateData={this.updateModalData}
                    commitData={this.commitModalData}
                    isCommitting={this.props.isTakingAttendance}
                    index={this.state.selectedLessonId}
                    commitSuccess={this.commitSuccess}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        classData: state.classes.class,
        isLoading: state.classes.isLoading,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProgressClassContainer);
