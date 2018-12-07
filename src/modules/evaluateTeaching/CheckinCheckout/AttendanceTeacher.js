import React from 'react';
import * as helper from '../../../helpers/helper';
import PropTypes from 'prop-types';

class AttendanceTeacher extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let attendance = this.props.lesson;
        let dataAttendance;
        if (attendance.check_in && attendance.check_out) {
            dataAttendance = helper.calculatorAttendanceStaff(attendance.check_in.time,
                attendance.check_out.time, attendance.start_time + ":00", attendance.end_time + ":00");
        }

        return (
            <div>
                <div className="bold">Buổi {attendance.order}</div>
                <div>{
                    attendance.check_in && attendance.check_in.time ?
                        (
                            <div
                                className="btn btn-simple btn-xs btn-success min-width-120-px">{attendance.check_in.time}</div>
                        )
                        :
                        (
                            <div className="btn btn-simple btn-xs btn-danger min-width-120-px">Not checkin</div>
                        )

                }{
                    attendance.check_out && attendance.check_out.time ?
                        (
                            <div
                                className="btn btn-simple btn-xs btn-success min-width-120-px">{attendance.check_out.time}</div>
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
                        <div className="progress"/>
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
