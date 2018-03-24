import React from 'react';
import AttendanceTeacher from './AttendanceTeacher';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';

class AttendanceShift extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let classData = this.props.classData;
        return (
            <div className="row">
                {
                    classData.attendance_teachers && classData.attendance_teachers.map((attendance_teacher) => {
                            return (
                                <div className="col-md-6">
                                    <div className="flex-row-center">
                                        <button className="btn btn-sm min-width-130-px"
                                                style={{backgroundColor: attendance_teacher.staff ? "#" + attendance_teacher.staff.color : ''}}>
                                            {attendance_teacher.staff ? helper.getShortName(attendance_teacher.staff.name) : 'None'}
                                        </button>
                                        <strong
                                            className="padding-horizontal-10px">Buổi {attendance_teacher.order} </strong>
                                        Giảng viên
                                    </div>
                                    <AttendanceTeacher attendance={attendance_teacher}/>
                                </div>
                            );
                        }
                    )

                }
                {
                    classData.attendance_teacher_assistants && classData.attendance_teacher_assistants.map((attendance_teacher_assistant) => {
                        return (
                            <div className="col-md-6">
                                <div className="flex-row-center">
                                    <button className="btn btn-sm min-width-130-px"
                                            style={{backgroundColor: attendance_teacher_assistant.staff ? "#" + attendance_teacher_assistant.staff.color : ''}}>
                                        {attendance_teacher_assistant.staff ? helper.getShortName(attendance_teacher_assistant.staff.name) : ''}
                                    </button>
                                    <strong
                                        className="padding-horizontal-10px">Buổi {attendance_teacher_assistant.order} </strong>
                                    Trợ giảng
                                </div>
                                <AttendanceTeacher attendance={attendance_teacher_assistant}/>
                            </div>
                        )
                    })

                }
            </div>
        );
    }
}

AttendanceShift.propTypes = {
    classData: PropTypes.object.isRequired
};
export default AttendanceShift;
