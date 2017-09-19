import React from 'react';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';

class AttendanceTeacher extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let attendance = this.props.attendance;
        let dataAttendance;
        if (attendance.attendance && attendance.attendance.check_in_time && attendance.attendance.check_out_time) {
            dataAttendance = helper.calculatorAttendanceStaff(attendance.attendance.check_in_time,
                attendance.attendance.check_out_time, attendance.start_teaching_time, attendance.end_teaching_time);
        }

        return (
            <div>
                <div>{
                    attendance.attendance && attendance.attendance.check_in_time ?
                        (
                            <div
                                className="btn btn-simple btn-xs btn-success min-width-120-px">{attendance.attendance.check_in_time}</div>
                        )
                        :
                        (
                            <div className="btn btn-simple btn-xs btn-danger min-width-120-px">Not checkin</div>
                        )

                }{
                    attendance.attendance && attendance.attendance.check_out_time ?
                        (
                            <div
                                className="btn btn-simple btn-xs btn-success min-width-120-px">{attendance.attendance.check_out_time}</div>
                        )
                        :
                        (
                            <div className="btn btn-simple btn-xs btn-danger min-width-120-px">Not checkout</div>
                        )
                }
                </div>
                {dataAttendance ?
                    (<div className="progress progress-line-warning">
                            <div className="progress-bar"
                                 style={{
                                     width: dataAttendance.empty_arrive_span + '%',
                                     backgroundColor: 'transparent'
                                 }} />
                            <div className="progress-bar progress-bar-warning"
                                 style={{width: dataAttendance.early_arrive_span + '%'}} />
                            <div className="progress-bar progress-bar-danger"
                                 style={{width: dataAttendance.late_arrive_span + '%'}} />
                            <div className="progress-bar progress-bar-success"
                                 style={{width: dataAttendance.teaching_span + '%'}} />
                            <div className="progress-bar progress-bar-danger"
                                 style={{width: dataAttendance.early_leave_span + '%'}} />
                            <div className="progress-bar progress-bar-warning"
                                 style={{width: dataAttendance.late_leave_span + '%'}} />
                        </div>
                    )
                    :
                    (
                        <div className="progress" />
                    )

                }

            </div>
        );
    }
}

AttendanceTeacher.propTypes = {
    attendance: PropTypes.object.isRequired
};

export default AttendanceTeacher;
