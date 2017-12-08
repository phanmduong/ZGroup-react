import React                        from 'react';
import Loading                      from '../../components/common/Loading';
import PropTypes                    from 'prop-types';
import {connect}                    from 'react-redux';
import {bindActionCreators}         from 'redux';
import * as    attendanceActions    from '../attendance/attendanceActions';
import * as helper                  from '../../helpers/helper';
import {Link} from 'react-router';
import TooltipButton from '../../components/common/TooltipButton';

class ListLessonContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedClass: '',
        };
    }

    componentWillMount(){
        this.props.attendanceActions.loadClassLessonModal(this.props.params.classId);
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

                            {
                                this.props.isLoadingLessonClassModal ?
                                    <Loading/>
                                    :
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="text-rose">
                                            <tr>
                                                <th >Thứ tự</th>
                                                <th style={{textAlign:"center"}}>Tình trạng điểm danh</th>
                                                <th/>
                                            </tr>
                                            </thead><tbody>
                                        {this.props.class.map((item, index)=>{
                                            return (
                                                <tr key={item.order}>
                                                    <td><h6>
                                                        <strong>Buổi {item.order} </strong>
                                                    </h6></td>
                                                    <td width="65%" style={{textAlign:"center"}}>
                                                        <h6>{item.attended_students + "/" + item.total_students}</h6>
                                                        <div className="progress progress-line-success progress-bar-table" style={{width: "100%"}}>
                                                            <div className="progress-bar progress-bar-success" role="progressbar"
                                                                 aria-valuenow="60"
                                                                 aria-valuemin="0"
                                                                 aria-valuemax="100"
                                                                 style={{width: item.attended_students * 100 / item.total_students+'%'}}>
                                                                <span className="sr-only">{item.attended_students * 100 / item.total_students}%</span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td style={{textAlign:"center"}}>
                                                        <Link className="btn btn-fill btn-rose"
                                                              type="button"
                                                              to={'/manage/attendance/' +
                                                                  this.props.params.classId + '/' +
                                                                  (index + 1)
                                                              }
                                                        >Điểm danh</Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody></table>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ListLessonContainer.propTypes = {
    isLoading: PropTypes.bool,
    isLoadingGens: PropTypes.bool,
    isLoadingBases: PropTypes.bool,
    isTakingAttendance: PropTypes.bool,
    isLoadingLessonClassModal: PropTypes.bool,
    isLoadingLessonDetailModal: PropTypes.bool,
    data: PropTypes.object,
    attendanceActions: PropTypes.object,
    currentGen: PropTypes.object,
    class: PropTypes.array,
    lesson: PropTypes.array,
    gens: PropTypes.array,
    bases: PropTypes.array,
    selectedClass: PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(ListLessonContainer);
