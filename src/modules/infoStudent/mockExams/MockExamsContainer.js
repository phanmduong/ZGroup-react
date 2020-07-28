import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as studentActions from '../studentActions';
import Loading from '../../../components/common/Loading';
import CreateMockExamButtonModal from "../overlays/CreateMockExamModal";
import EmptyData from "../../../components/common/EmptyData";
import {isEmptyInput} from "../../../helpers/helper";
import moment from "moment";
import {DATE_FORMAT_SQL, DATE_VN_FORMAT, FULLTIME_FORMAT, TIME_FORMAT_H_M} from "../../../constants/constants";
class MockExamsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            mockExam:{id:-1}
        };
        this.studentId = this.props.params ? this.props.params.studentId : this.props.studentId;

    }

    componentWillMount() {
        this.loadMockExams();
    }

    loadMockExams = () => {
        this.props.studentActions.loadStudentMockExams(this.studentId);

    };

    openModalEdit = (mockExam)=>{
        this.setState({mockExam});
    }

    render() {
        return (
            <div className="tab-pane active">
                {this.props.isLoading ? <Loading/> :
                    <ul className="timeline timeline-simple">
                        <li className="timeline-inverted">
                            <div className="timeline-badge" style={{backgroundColor: '#4855d1'}}>
                                <i className="material-icons">add</i>
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <div className="flex flex-align-items-center margin-top-5">
                                        <CreateMockExamButtonModal
                                            mockExam={this.state.mockExam}
                                            studentId={this.studentId}
                                            className="btn btn-actions"
                                        />
                                    </div>
                                </div>
                                <div className="timeline-body margin-vertical-30"/>
                            </div>
                        </li>

                        {this.props.mockExams && this.props.mockExams.length > 0 ? this.props.mockExams.map((mock_exam, index) => {
                            return (
                                <li className="timeline-inverted" key={index}>
                                    <div className={"timeline-badge "} style={{backgroundColor: '#4855d1'}}>
                                        <i className="material-icons">subject</i>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="">

                                            <h4 className="cursor-pointer"
                                                onClick={()=>this.openModalEdit({...mock_exam})}>
                                                <b>{mock_exam.type}</b>
                                            </h4>
                                            <div className="timeline-body">
                                                {!isEmptyInput(mock_exam.time) &&<div className="flex-row-center">
                                                    <i className="material-icons">access_time</i>
                                                    &nbsp; &nbsp;{moment(mock_exam.time, FULLTIME_FORMAT).format(TIME_FORMAT_H_M)}
                                                </div>}
                                                {!isEmptyInput(mock_exam.date) &&<div className="flex-row-center">
                                                    <i className="material-icons">access_time</i>
                                                    &nbsp; &nbsp;{moment(mock_exam.date, DATE_FORMAT_SQL).format(DATE_VN_FORMAT)}

                                                </div>}
                                                {!isEmptyInput(mock_exam.score) && <div className="">
                                                    <i className="material-icons font-size-14px">info</i>
                                                    &nbsp; &nbsp;Điểm:&nbsp;{mock_exam.score}
                                                </div>}
                                                {!isEmptyInput(mock_exam.course_id) && mock_exam.course && <div className="">
                                                    <i className="material-icons font-size-14px">info</i>
                                                    &nbsp; &nbsp;Môn học:&nbsp;{mock_exam.course.name}
                                                </div>}
                                                {!isEmptyInput(mock_exam.note) && <div className="">
                                                    <i className="material-icons font-size-14px">description</i>
                                                    &nbsp; &nbsp;Ghi chú:&nbsp;
                                                    {//eslint-disable-next-line
                                                    }<span dangerouslySetInnerHTML={{__html: mock_exam.note}}/>

                                                </div>}

                                            </div>

                                        </div>
                                    </div>
                                </li>
                            );
                        }) : <EmptyData/>

                        }

                    </ul>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        mockExams: state.infoStudent.mockExam.mockExams,
        isLoading: state.infoStudent.mockExam.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MockExamsContainer);
