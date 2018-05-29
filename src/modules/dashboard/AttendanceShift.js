import React from 'react';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';

class AttendanceShift extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let shift = this.props.shift;
        let dataAttendance;
        let isAttendance = shift.check_in_time && shift.check_out_time;
        if (isAttendance) {
            dataAttendance = helper.calculatorAttendanceShift(shift.check_in_time, shift.check_out_time, shift.start_shift_time,
                shift.end_shift_time, this.props.most_early_time, this.props.most_late_time
            );
        }
        return (
            <div>
                <h6>
                    <button className="btn btn-sm min-width-130-px"
                            style={{backgroundColor: shift.staff ? '#' + shift.staff.color : ''}}>
                        {shift.staff ? helper.getShortName(shift.staff.name) : 'None'}
                    </button>
                    <strong> {shift.name} </strong>{shift.start_shift_time + " - " + shift.end_shift_time}
                    <div>{
                        shift.check_in_time ?
                            (
                                <div
                                    className="btn btn-simple btn-xs btn-success min-width-120-px">{shift.check_in_time}</div>
                            )
                            :
                            (
                                <div className="btn btn-simple btn-xs btn-danger min-width-120-px">Not checkin</div>
                            )

                    }{
                        shift && shift.check_out_time ?
                            (
                                <div
                                    className="btn btn-simple btn-xs btn-success min-width-120-px">{shift.check_out_time}</div>
                            )
                            :
                            (
                                <div className="btn btn-simple btn-xs btn-danger min-width-120-px">Not checkout</div>
                            )
                    }
                    </div>
                    {
                        isAttendance ?
                            (
                                <div className="progress">
                                    <div className="progress-bar"
                                         style={{
                                             width: dataAttendance.early_span + '%',
                                             backgroundColor: 'transparent'
                                         }} />
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: dataAttendance.empty_arrive_span + '%',
                                            backgroundColor: '#ffdda1'
                                        }}
                                     />
                                    <div
                                        className="progress-bar progress-bar-warning"
                                        style={{
                                            width: dataAttendance.early_arrive_span + '%',
                                        }}
                                     />
                                    <div
                                        className="progress-bar progress-bar-danger"
                                        style={{
                                            width: dataAttendance.late_arrive_span + '%',
                                        }}
                                     />
                                    <div
                                        className="progress-bar progress-bar-success"
                                        style={{
                                            width: dataAttendance.shift_span + '%',
                                        }}
                                     />
                                    <div
                                        className="progress-bar progress-bar-danger"
                                        style={{
                                            width: dataAttendance.early_leave_span + '%',
                                        }}
                                    />
                                    <div
                                        className="progress-bar progress-bar-warning"
                                        style={{
                                            width: dataAttendance.late_leave_span + '%',
                                        }}
                                    />
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: dataAttendance.empty_leave_span + '%',
                                            backgroundColor: '#ffdda1'
                                        }}
                                    />
                                    <div className="progress-bar"
                                         style={{
                                             width: dataAttendance.late_span + '%',
                                             backgroundColor: 'transparent'
                                         }} />
                                </div>
                            )
                            :
                            (
                                <div className="progress" />
                            )
                    }

                </h6>
            </div>

        );
    }
}

AttendanceShift.propTypes = {
    shift: PropTypes.object.isRequired,
    most_early_time: PropTypes.string.isRequired,
    most_late_time: PropTypes.string.isRequired,

};
export default AttendanceShift;
