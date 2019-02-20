/* eslint-disable */
import React from "react";
import Loading from "../../../components/common/Loading";
import store from "./EvaluateTeachingStudentAttendanceStore";
import Select from '../../../components/common/Select';
import {observer} from "mobx-react";
import {validateLinkImage} from "../../../helpers/helper";
import {RATIO_TOTAL_STUDENT_TEACHING_PASS} from "../../../constants/constants";
import _ from 'lodash';

@observer
class StudentAttendanceContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 1
        }
    }

    componentWillMount() {
        this.store = new store(this.props.gens, this.props.selectedTeaching,
            this.props.selectedBaseId, this.props.selectedGenId, this.props.user);
        this.store.loadData();
    }


    onChangeGen = (value) => {
        this.store.selectedGenId = value;
        this.store.loadData();
    }

    render() {
        return (
            <div>
                {
                    this.store.gens && this.store.gens.length > 0 &&
                    <div className="flex flex-justify-content-center">
                        <div style={{width: 200}}>
                            <Select
                                defaultMessage={'Chọn khóa học'}
                                options={this.store.gensData}
                                value={this.store.selectedGenId}
                                onChange={this.onChangeGen}
                            />
                        </div>
                    </div>
                }
                <div>
                    <div className="flex flex-justify-content-center flex-col flex-align-items-center"
                         style={{marginBottom: 20}}>
                        <div className="img"
                             style={{
                                 background: 'url(' + validateLinkImage(this.store.user.avatar_url) + ') center center / cover',
                                 width: '130px',
                                 height: '130px',
                                 borderRadius: '50%',
                                 margin: '20px 0'
                             }}
                        />
                        <div className="bold uppercase" style={{fontSize: '20px'}}>
                            {this.store.user.name}
                        </div>
                        <div>Tỉ lệ học viên tham gia các buổi</div>
                        <br/>
                    </div>
                    {this.store.isLoading ? <Loading/> :
                        <div>
                            {this.renderAttendance()}
                        </div>
                    }

                </div>
            </div>

        );
    }

    renderAttendance() {
        const ratio = _.sumBy(this.store.getData, 'ratio_attendance') / this.store.getData.length;
        return (
            <div>
                <div className="flex flex flex-space-between" style={{marginTop: 10}}>
                    <div className="bold" style={{color: 'black'}}>Tỉ lệ tham gia</div>
                    <div className="bold" style={{color: 'black'}}>
                        {`${Math.round(ratio)}%/${RATIO_TOTAL_STUDENT_TEACHING_PASS}%`}
                    </div>
                </div>
                <div className="progress">
                    <div className="progress-bar"
                         style={{
                             width: ratio + '%',
                             backgroundColor: ratio >= RATIO_TOTAL_STUDENT_TEACHING_PASS ? '#2EBE21' : '#C50000'
                         }}/>
                </div>
                {
                    this.store.getData.map((classData, index) => {
                        return (
                            <div className="panel-group" id="accordion" key={index}
                                 role="tablist" aria-multiselectable="true">
                                <div className="panel panel-default">
                                    <div className="panel-heading" role="tab"
                                         id={"heading_" + index}>

                                        <a role="button" data-toggle="collapse"
                                           data-parent="#accordion"
                                           href={"#collapse_" + index}
                                           aria-expanded="false"
                                           aria-controls={"collapse_" + index}
                                           className="collapsed">
                                            <div className="panel-title flex flex-space-between">
                                                <div className="flex-row-center" style={{width: '80%'}}>
                                                    <img
                                                        className="image-class-attendance-class-dashboard"
                                                        src={classData.lessons[0] ? classData.lessons[0].course_avatar_url : ''}/>
                                                    <div className="text-h5">
                                                        <strong>{classData.lessons[0] ? classData.lessons[0].class_name : ''}</strong>
                                                    </div>
                                                </div>
                                                <i className="material-icons">keyboard_arrow_down</i>
                                            </div>
                                            <div className="flex flex flex-space-between" style={{marginTop: 10}}>
                                                <div className="bold" style={{color: 'black'}}>Tỉ lệ tham gia</div>
                                                <div className="bold" style={{color: 'black'}}>
                                                    {`${Math.round(classData.ratio_attendance)}%/${RATIO_TOTAL_STUDENT_TEACHING_PASS}%`}
                                                </div>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar"
                                                     style={{
                                                         width: classData.ratio_attendance + '%',
                                                         backgroundColor: classData.ratio_attendance >= RATIO_TOTAL_STUDENT_TEACHING_PASS ? '#2EBE21' : '#C50000'
                                                     }}/>
                                            </div>

                                        </a>
                                    </div>
                                    <div id={"collapse_" + index}
                                         className="panel-collapse collapse"
                                         role="tabpanel"
                                         aria-labelledby={"heading_" + index}
                                         aria-expanded="false"
                                         style={{height: '0px'}}>
                                        <div className="panel-body" style={{paddingLeft: 30}}>
                                            {
                                                classData.lessons.map((lesson) => {
                                                    const ratio = lesson.total_student_attendance * 100 / lesson.max_total_student
                                                    return (
                                                        <div>
                                                            <div className="flex flex flex-space-between"
                                                                 style={{marginTop: 10}}>
                                                                <div
                                                                    className="bold">Buổi {lesson.order} - {lesson.total_student_attendance}/{lesson.max_total_student}</div>
                                                                <div className="bold">
                                                                    {`${Math.round(ratio)}%/${RATIO_TOTAL_STUDENT_TEACHING_PASS}%`}
                                                                </div>
                                                            </div>
                                                            <div className="progress">
                                                                <div className="progress-bar"
                                                                     style={{
                                                                         width: ratio + '%',
                                                                         backgroundColor: ratio >= RATIO_TOTAL_STUDENT_TEACHING_PASS ? '#2EBE21' : '#C50000'
                                                                     }}/>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        );
    }
}

StudentAttendanceContainer.propTypes = {};

export default StudentAttendanceContainer;

