import React from 'react';
import AttendanceTeacher from './AttendanceTeacher';
import * as helper from '../../helpers/helper';

class AttendanceShift extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let classData = this.props.classData;
        return (
            <div className="row">
                {
                    classData.attendance_teacher &&
                    <div className="col-md-6">
                        <div className="flex-row-center">
                            <button className="btn btn-sm min-width-130-px"
                                    style={{backgroundColor: classData.attendance_teacher.staff ?  "#" + classData.attendance_teacher.staff.color : ''}}>
                                { classData.attendance_teacher.staff ? helper.getShortName(classData.attendance_teacher.staff.name) : ''}
                            </button>
                            <strong
                                className="padding-horizontal-10px">Buổi {classData.attendance_teacher.order} </strong>
                            Giảng viên
                        </div>
                        <AttendanceTeacher attendance={classData.attendance_teacher}/>
                    </div>
                }
                {
                    classData.attendance_teacher_assistant &&
                    <div className="col-md-6">
                        <div className="flex-row-center">
                            <button className="btn btn-sm min-width-130-px"
                                    style={{backgroundColor: classData.attendance_teacher_assistant.staff ?  "#" + classData.attendance_teacher_assistant.staff.color : ''}}>
                                { classData.attendance_teacher_assistant.staff ? helper.getShortName(classData.attendance_teacher_assistant.staff.name) : ''}
                            </button>
                            <strong
                                className="padding-horizontal-10px">Buổi {classData.attendance_teacher_assistant.order} </strong>
                            Trợ giảng
                        </div>
                        <AttendanceTeacher attendance={classData.attendance_teacher_assistant}/>
                    </div>
                }
            </div>
        );
    }
}


export default AttendanceShift;
