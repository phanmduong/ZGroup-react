import React from 'react';
import {Modal} from "react-bootstrap";
import * as coursesActions from "../coursesActions";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as helper from "../../../helpers/helper";
import {NO_AVATAR} from "../../../constants/env";
import Barchart from "./Barchart";

const labels = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10'];

class AnalyticExamModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    toggle = () => {
        this.props.coursesActions.toggleModalAnalyticExam();
    }

    getScore = (analytic, template) => {
        const analyticTemplate = analytic.filter((item) => template.id == item.exam_template_id);

        let scores = [];


        analyticTemplate.forEach((item) => {
            item.user_exams.forEach((user_exam) => {
                scores = [...scores, {...user_exam, 'class': item.class}];
            });
        });

        return scores.sort((a, b) => b.score - a.score);

    }

    getAnalytics = (scores) => {
        return labels.map((item, index) => {
            return scores.filter(score => {
                if (index == 0) {
                    return score.score >= index && score.score <= index + 1;
                } else {
                    return score.score > index && score.score <= index + 1;
                }
            }).length;
        })
            ;
    };

    render() {
        const {modalAnalyticExam, groupExam, course, analyticExam} = this.props;
        const analytic = analyticExam.filter((item) => {
            if (groupExam) {
                return item.group_exam_id == groupExam.id;
            } else {
                return item.group_exam_id == null;
            }
        });
        return (
            <Modal show={modalAnalyticExam} bsSize="large" onHide={this.toggle}>
                <Modal.Header>
                    <div className="title">Phân tích kết quả</div>
                    <div
                        style={{textAlign: 'center'}}>{groupExam ? groupExam.name : "Không có nhóm"}</div>
                </Modal.Header>
                <Modal.Body>
                    {course.exam_templates.filter((template) => {
                        if (groupExam) {
                            return template.group_exam_id == groupExam.id;
                        } else {
                            return template.group_exam_id == null;
                        }
                    })
                        .map((template, index) => {
                            const scores = this.getScore(analytic, template);
                            return (
                                <div>
                                    <div><h4><strong>{template.title}</strong></h4></div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div>Phân tích phổ điểm</div>
                                            <Barchart
                                                label={labels}
                                                data={[this.getAnalytics(scores)]}
                                                id={"barchart-analytics-exam" + index}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <div>Danh sách học viên({scores.length})</div>
                                            <table id="datatables"
                                                   className="table white-table table-striped table-no-bordered table-hover"
                                                   cellSpacing="0" width="100%" style={{width: "100%"}}>
                                                <tbody>
                                                {scores.slice(0, 5).map((item, index) => {
                                                    let avatar = helper.avatarEmpty(item.user.avatar_url) ?
                                                        NO_AVATAR : item.user.avatar_url;
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>
                                                                <div style={{
                                                                    background: "url('" + avatar + "') center center / cover",
                                                                    display: 'inline-block',
                                                                    width: '30px',
                                                                    height: '30px',
                                                                    borderRadius: '50%',
                                                                    verticalAlign: 'middle'
                                                                }}
                                                                />
                                                            </td>
                                                            <td><strong>{item.user.name}</strong></td>
                                                            <td>{item.class.name}</td>
                                                            <td>{item.score}</td>
                                                            <td>#{index + 1}</td>
                                                        </tr>
                                                    );
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </Modal.Body>
            </Modal>
        );
    }
}


function mapStateToProps(state) {
    return {
        isLoadingAnalyticExam: state.courses.isLoadingAnalyticExam,
        analyticExam: state.courses.analyticExam,
        modalAnalyticExam: state.courses.modalAnalyticExam,
        course: state.courses.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticExamModal);

