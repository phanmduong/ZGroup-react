import React from 'react';
import {connect} from 'react-redux';
import * as attendanceActions from "../../attendance/attendanceActions";
import * as classActions from "../classActions";
import {bindActionCreators} from 'redux';
import * as ReactDOM from "react-dom";
import {Overlay,Modal} from 'react-bootstrap';

class ChangeTeachMultiLessonOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            showModal: false,
            isLoading: false,
        };
        this.state = this.initState;
    }

    toggle = () => {
        this.setState({show: !this.state.show});
    }

    close = () => {
        this.setState(this.initState);
    }

    openModalChangeTeach = ()=>{
        this.setState({showModal: true});
    }

    render() {
        let {isLoading} = this.props;
        let {showModal,show} = this.state;
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
                                                onClick={()=>this.openModalChangeTeach()}>
                            Đổi giảng viên
                        </button>
                         <button type="button"
                                                className="btn btn-white width-100"
                                                onClick={()=>{}}>
                            Đổi trợ giảng
                        </button>



                    </div>
                </Overlay>
                <Modal show={showModal} onHide={this.closeModalLessonEvent} bsSize="large">
                    <Modal.Header closeButton>
                        <h4 className="modal-title text-center">Đổi</h4>
                    </Modal.Header>
                    <Modal.Body>
                        12
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
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceActions: bindActionCreators(attendanceActions, dispatch),
        classActions: bindActionCreators(classActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeTeachMultiLessonOverlay);
