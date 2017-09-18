import React from 'react';
import _ from 'lodash';
import AttendanceShift from "./AttendanceShift";
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';

class ListAttendanceShift extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let shifts = _.sortBy(this.props.shifts, [function (shift) {
            return shift.base.id;
        }]);

        if (helper.isEmptyInput(this.props.baseId) || this.props.baseId == 0) {
            let shiftsGroup = helper.groupBy(shifts, shift => shift.base.name, ["base", "shifts"]);
            return (
                <div className="row">
                    {
                        shiftsGroup.map((shiftGroup, key) => {
                            return (
                                <div className="col-md-6" key={key}>
                                    <h5><strong>{shiftGroup.base}</strong></h5>
                                    {
                                        shiftGroup.shifts.map((shift, index) => {
                                            return (
                                                <AttendanceShift
                                                    most_early_time={shiftGroup.shifts[0].start_shift_time}
                                                    most_late_time={shiftGroup.shifts[shiftGroup.shifts.length - 1].end_shift_time}
                                                    shift={shift}
                                                    key={index}
                                                />
                                            );
                                        })
                                    }
                                </div>
                            );

                        })

                    }
                </div>
            );
        } else
            return (
                <div>
                    {
                        shifts.map((shift,index) => {
                            return (
                                <AttendanceShift
                                    most_early_time={shifts[0].start_shift_time}
                                    most_late_time={shifts[shifts.length - 1].end_shift_time}
                                    shift={shift}
                                    key={index}
                                />
                            );
                        })
                    }
                </div>
            );
    }
}


ListAttendanceShift.propTypes = {
    baseId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    shifts: PropTypes.array.isRequired,

};

export default ListAttendanceShift;
