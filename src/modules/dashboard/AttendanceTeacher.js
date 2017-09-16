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
            dataAttendance = helper.calculatorAttandanceStaff(attendance.attendance.check_in_time,
                attendance.attendance.check_out_time, attendance.start_teaching_time, attendance.end_teaching_time);
        }


        let title = '';
        if (attendance.attendance) {
            if (helper.isEmptyInput(attendance.attendance.check_in_time)) title += 'Chưa check in';
            if (helper.isEmptyInput(attendance.attendance.check_out_time)) title += 'Chưa check out';
        } else {
            title = 'Chưa check in và check out';
        }
        return (
            <div key={attendance.order}>
                <h6>
                    <strong>Buổi {attendance.order} </strong>{title}
                </h6>
                {dataAttendance &&
                <div className="progress progress-line-warning">
                    <div className="progress-bar"
                         style={{
                             width: dataAttendance.empty_arrive_span + '%',
                             backgroundColor: 'transparent'
                         }}>
                    </div>
                    <div className="progress-bar progress-bar-warning"
                         style={{width: dataAttendance.early_arrive_span + '%'}}>
                    </div>
                    <div className="progress-bar progress-bar-danger"
                         style={{width: dataAttendance.late_arrive_span + '%'}}>
                    </div>
                    <div className="progress-bar progress-bar-success"
                         style={{width: dataAttendance.teaching_span + '%'}}>
                    </div>
                    <div className="progress-bar progress-bar-danger"
                         style={{width: dataAttendance.early_leave_span + '%'}}>
                    </div>
                    <div className="progress-bar progress-bar-warning"
                         style={{width: dataAttendance.late_leave_span + '%'}}>
                    </div>
                </div>
                }

            </div>
        )
    }
}

AttendanceTeacher.propTypes = {
    attendance: PropTypes.object.isRequired
}

export default AttendanceTeacher;
