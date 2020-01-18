import React from 'react';
import * as helper from '../../../helpers/helper';
import PropTypes from 'prop-types';
import TooltipButton from "../../../components/common/TooltipButton";
import {isEmptyInput} from "../../../helpers/helper";

class AttendanceTeacher extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let progressStyle = {
            "marginBottom": "0",
            "height": "7px",
            "borderRadius": "5px",
            "marginRight": "10px",
        };
        let attendance = this.props.attendance;
        let dataAttendance;
        if (attendance.attendance && attendance.attendance.check_in_time && attendance.attendance.check_out_time) {
            dataAttendance = helper.calculatorAttendanceStaff(attendance.attendance.check_in_time,
                attendance.attendance.check_out_time, attendance.start_teaching_time, attendance.end_teaching_time);
        }

        return (
            <div className="flex flex-align-items-center">
                <div className="margin-right-10">
                    {
                    attendance.attendance && attendance.attendance.check_in_time ?
                        (
                            !isEmptyInput(attendance.attendance.comment_check_in) ?
                                <TooltipButton text={attendance.attendance.comment_check_in} placement={"top"}>
                                    <div
                                        className="btn btn-success btn-xs btn-success min-width-80-px btn-round"
                                        onClick={() => {
                                            this.props.addCheckinCheckout("checkin", this.props.type, this.props.attendance);
                                        }}
                                    >{attendance.attendance.check_in_time}</div>
                                </TooltipButton>
                                :
                                <div
                                    className="btn btn-simple btn-xs btn-success min-width-80-px"
                                    onClick={() => {
                                        this.props.addCheckinCheckout("checkin", this.props.type, this.props.attendance);
                                    }}
                                >{attendance.attendance.check_in_time}</div>
                        )
                        :
                        (

                            <div className="btn btn-simple btn-xs btn-danger min-width-80-px" onClick={() => {
                                this.props.addCheckinCheckout("checkin", this.props.type, this.props.attendance);
                            }}>Not checkin</div>
                        )

                }

                </div>
                <div className="margin-right-10" style={{minWidth:120}}>
                    {dataAttendance ?
                        (<div className="progress progress-line-warning" style={progressStyle}>
                                <div className="progress-bar"
                                     style={{
                                         width: dataAttendance.empty_arrive_span + '%',
                                         backgroundColor: 'transparent'
                                     }}/>
                                <div className="progress-bar progress-bar-warning"
                                     style={{width: dataAttendance.early_arrive_span + '%'}}/>
                                <div className="progress-bar progress-bar-danger"
                                     style={{width: dataAttendance.late_arrive_span + '%'}}/>
                                <div className="progress-bar progress-bar-success"
                                     style={{width: dataAttendance.teaching_span + '%'}}/>
                                <div className="progress-bar progress-bar-danger"
                                     style={{width: dataAttendance.early_leave_span + '%'}}/>
                                <div className="progress-bar progress-bar-warning"
                                     style={{width: dataAttendance.late_leave_span + '%'}}/>
                            </div>
                        )
                        :
                        (
                            <div className="progress" style={progressStyle}/>
                        )

                    }
                </div>
                <div className="margin-right-10"> {
                    attendance.attendance && attendance.attendance.check_out_time ?
                        (
                            !isEmptyInput(attendance.attendance.comment_check_out) ?
                                <TooltipButton text={attendance.attendance.comment_check_out} placement={"top"}>
                                    <div
                                        className="btn btn-success btn-xs btn-success min-width-80-px btn-round"
                                        onClick={() => {
                                            this.props.addCheckinCheckout("checkout", this.props.type, this.props.attendance);
                                        }}
                                    >{attendance.attendance.check_out_time}</div>
                                </TooltipButton>

                                :

                                <div
                                    className="btn btn-simple btn-xs btn-success min-width-80-px btn-round"
                                    onClick={() => {
                                        this.props.addCheckinCheckout("checkout", this.props.type, this.props.attendance);
                                    }}
                                >{attendance.attendance.check_out_time}</div>
                        )
                        :
                        (
                            <div className="btn btn-simple btn-xs btn-danger min-width-80-px" onClick={() => {
                                this.props.addCheckinCheckout("checkout", this.props.type, this.props.attendance);
                            }}>Not checkout</div>
                        )
                }</div>

            </div>
        );
    }
}

AttendanceTeacher.propTypes = {
    attendance: PropTypes.object.isRequired
};

export default AttendanceTeacher;
