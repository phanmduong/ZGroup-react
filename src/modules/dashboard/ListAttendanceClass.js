import React from 'react';
import _ from 'lodash';
import AttendanceClass from "./AttendanceClass";
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';

class ListAttendanceClass extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let classes = _.sortBy(this.props.now_classes, [function (classData) {
            return classData.room.base_id;
        }]);

        if (helper.isEmptyInput(this.props.baseId) || this.props.baseId == 0) {
            let classesGroup = helper.groupBy(classes, classData => classData.room.base, ["base", "classes"]);
            return (
                <div>
                    {
                        classesGroup.map((classGroup, key) => {
                            return (
                                <div key={key}>
                                    <h5><strong>{classGroup.base}</strong></h5>
                                    {
                                        classGroup.classes.map((classData, index) => {
                                            let course = classData.course || {};
                                            return (
                                                <div key={index}>
                                                    <div className="flex-row-center">
                                                        <img
                                                            className="image-class-attendance-class-dashboard"
                                                            src={course.icon_url}/>
                                                        <div className="text-h5">
                                                            <strong>{classData.name}
                                                            </strong> - {classData.room.name} - {classData.start_time}-
                                                            {classData.end_time}</div>
                                                    </div>
                                                    <AttendanceClass
                                                        classData={classData}

                                                    />
                                                </div>

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
                        classes.map((classData, index) => {
                            let course = classData.course || {};
                            return (
                                <div key={index}>
                                    <div className="flex-row-center">
                                        <img
                                            className="image-class-attendance-class-dashboard"
                                            src={course.icon_url}/>
                                        <div className="text-h5">
                                            <strong>{classData.name}
                                            </strong> - {classData.room.name} - {classData.start_time}-
                                            {classData.end_time}</div>
                                    </div>
                                    <AttendanceClass
                                        classData={classData}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            );
    }
}

ListAttendanceClass.propTypes = {
    baseId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    now_classes: PropTypes.array.isRequired,

};

export default ListAttendanceClass;
