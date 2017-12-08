import React                        from 'react';
import Loading                      from '../../components/common/Loading';
import PropTypes                    from 'prop-types';
import {connect}                    from 'react-redux';
import {bindActionCreators}         from 'redux';
import * as    attendanceActions    from '../attendance/attendanceActions';
import * as helper                  from '../../helpers/helper';
import TooltipButton from '../../components/common/TooltipButton';
import CheckBoxMaterial             from '../../components/common/CheckBoxMaterial';
class LessonDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedClass: '',
        };
    }

    componentWillMount(){
        this.props.attendanceActions.loadLessonDetailModal(this.props.params.classId,this.props.params.lessonId);
        this.props.attendanceActions.loadClassInfo(this.props.params.classId);
    }

    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">{ "Danh sách buổi học lớp " +  this.props.selectedClass.name}</h4>
                            <div className="row"><br/></div>
                            <div className="row">
                                <div className="col-md-3">{
                                    this.props.selectedClass.teacher ?
                                        (
                                            <TooltipButton text="Giảng viên"
                                                           placement="top"
                                            >
                                                <button className="btn btn-sm"
                                                        style={{backgroundColor: '#' + this.props.selectedClass.teacher.color , inlineSize: "-webkit-fill-available"}}>
                                                    {helper.getShortName(this.props.selectedClass.teacher.name)}
                                                    <div className="ripple-container"/>
                                                </button>
                                            </TooltipButton>
                                        )
                                        :
                                        (
                                            <div className="no-data">
                                                Không có thông tin giảng viên
                                            </div>
                                        )

                                }</div>
                                <div className="col-md-3">{
                                    this.props.selectedClass.teacher_assistant ?
                                        (
                                            <TooltipButton text="Trợ giảng"
                                                           placement="top">
                                                <button className="btn btn-sm"
                                                        style={{backgroundColor: '#' + this.props.selectedClass.teacher_assistant.color, inlineSize: "-webkit-fill-available"}}>
                                                    {helper.getShortName(this.props.selectedClass.teacher_assistant.name)}
                                                    <div className="ripple-container"/>
                                                </button>
                                            </TooltipButton>
                                        )
                                        :
                                        (
                                            <div className="no-data">
                                                Không có thông tin trợ giảng
                                            </div>
                                        )

                                }</div>
                            </div>
                            <div className="table-responsive">
                                <table className="table" >
                                    <thead className="text-rose">
                                    <tr>
                                        <th >Tên học viên</th>
                                        <th >Email</th>
                                        <th style={{textAlign:"center"}}>Có mặt</th>
                                        <th style={{textAlign:"center"}}>Bài tập</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.isLoadingLessonDetailModal ?
                                        <tr><td colSpan={3}><Loading/></td></tr>
                                        :
                                        this.props.lesson.length !=0 ?

                                            this.props.lesson.map((item, index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td style={{textAlign:"center"}}>
                                                            <CheckBoxMaterial
                                                                label=""
                                                                name="active"
                                                                checked={Boolean(item.attendance_lesson_status)}
                                                                onChange={() => {return this.props.attendanceActions.takeAttendance(item.attendance_id, index);}}
                                                            />
                                                        </td>
                                                        <td style={{textAlign:"center"}}>
                                                            <CheckBoxMaterial
                                                                label=""
                                                                name="active"
                                                                checked={Boolean(item.attendance_homework_status)}
                                                                onChange={() => {return this.props.attendanceActions.takeAttendanceHomework(item.attendance_id, index);}}
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })

                                            :
                                            <tr> <h5>Chưa thể điểm danh</h5></tr>
                                    }

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LessonDetailContainer.propTypes = {
    isLoading: PropTypes.bool,
    isLoadingGens: PropTypes.bool,
    isLoadingBases: PropTypes.bool,
    isTakingAttendance: PropTypes.bool,
    isLoadingLessonClassModal: PropTypes.bool,
    isLoadingLessonDetailModal: PropTypes.bool,
    data: PropTypes.object,
    selectedClass: PropTypes.object,
    attendanceActions: PropTypes.object,
    currentGen: PropTypes.object,
    class: PropTypes.array,
    lesson: PropTypes.array,
    gens: PropTypes.array,
    bases: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        isLoading:                      state.attendance.isLoading,
        isLoadingGens:                  state.attendance.isLoadingGens,
        isLoadingBases:                 state.attendance.isLoadingBases,
        isTakingAttendance:             state.attendance.isTakingAttendance,
        isLoadingLessonClassModal:      state.attendance.isLoadingLessonClassModal,
        isLoadingLessonDetailModal:     state.attendance.isLoadingLessonDetailModal,
        data:                           state.attendance.data,
        currentGen:                     state.attendance.currentGen,
        class:                          state.attendance.class,
        lesson:                         state.attendance.lesson,
        gens:                           state.attendance.gens,
        bases:                          state.attendance.bases,
        selectedClass:                  state.attendance.selectedClass,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceActions: bindActionCreators(attendanceActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonDetailContainer);

