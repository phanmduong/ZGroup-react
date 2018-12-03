import React from 'react';
import PropTypes from 'prop-types';

const Attendances = ({attendances}) => {
    if (attendances === undefined || attendances === null) return <div/>;

    const sumAttendance = attendances.filter(item => item.status.status == 1).length;

    return (
        <div className="content-progress-student">
            <div className="progress progress-line-success progress-student">
                <div className="progress-bar progress-bar-success"
                     style={{width: sumAttendance * 100 / attendances.length + "%"}}>
                    <span className="sr-only">{sumAttendance}</span>
                </div>
            </div>
            <div className="text-progress-student">{sumAttendance + "/" + attendances.length}</div>
        </div>

    );
};


Attendances.propTypes = {
    attendances: PropTypes.array.isRequired,
};

export default Attendances;
