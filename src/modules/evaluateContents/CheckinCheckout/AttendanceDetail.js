import React from 'react';
import * as helper from '../../../helpers/helper';
import PropTypes from 'prop-types';

class AttendanceDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let attendance = this.props.data;
        let dataAttendance;
        if (attendance.checkin_id && attendance.checkout_id) {
            dataAttendance = helper.calculatorAttendanceStaff(
                attendance.checkin_time.substr(0,4),
                attendance.checkout_time.substr(0,4),
                attendance.start_time ,
                attendance.end_time
            );
        }
        return (
            <div>
                <div className="bold">{attendance.name}</div>
                <div>{
                    attendance.checkin_id && attendance.checkin_time ?
                        (
                            <div
                                className="btn btn-simple btn-xs btn-success min-width-120-px">{attendance.checkin_time}</div>
                        )
                        :
                        (
                            <div className="btn btn-simple btn-xs btn-danger min-width-120-px">Not checkin</div>
                        )

                }{
                    attendance.checkout_id && attendance.checkout_time ?
                        (
                            <div
                                className="btn btn-simple btn-xs btn-success min-width-120-px">{attendance.checkout_time}</div>
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

AttendanceDetail.propTypes = {
    data: PropTypes.object.isRequired
};

export default AttendanceDetail;
