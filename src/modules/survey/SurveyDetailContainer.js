import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as surveyActions from "./surveyActions";
import Loading from "../../components/common/Loading";
import EditQuestionModalContainer from "./EditQuestionModalContainer";
import Dragula from "react-dragula";
import {QUESTION_TYPE} from "../../constants/constants";
import {confirm} from "../../helpers/helper";
import SurveyDisplayModalContainer from "./SurveyDisplayModalContainer";

class SurveyDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.showEditQuestionModal = this.showEditQuestionModal.bind(this);
        this.initDragula = this.initDragula.bind(this);
        this.drake = null;
        this.showQuestionType = this.showQuestionType.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.duplicateQuestion = this.duplicateQuestion.bind(this);
        this.showDisplayModal = this.showDisplayModal.bind(this);
    }

    componentWillMount() {
        const {surveyId} = this.props.params;
        this.props.surveyActions.loadSurveyDetail(surveyId);
    }

    componentDidUpdate() {
        this.initDragula();
    }

    showDisplayModal() {
        this.props.surveyActions.showSurveyDisplaySettingModal(true);
    }

    showEditQuestionModal(question) {
        this.props.surveyActions.toggleEditQuestion(true, question);
    }

    showQuestionType(type) {
        let data = {};
        QUESTION_TYPE.forEach((item) => {
            data[item.value] = item.label;
        });
        return <span>{data[type]}</span>;
    }

    duplicateQuestion(question) {
        this.props.surveyActions.duplicateQuestion(question);
    }

    deleteQuestion(question) {
        confirm("error", "Xoá", "Bạn có chắc chắn muốn xoá", () => {
            this.props.surveyActions.deleteQuestion(question);
        });

    }

    initDragula() {
        if (this.drake) {
            this.drake.destroy();
        }
        const containers = Array.prototype.slice.call(document.querySelectorAll(".drake"));
        this.drake = Dragula(containers, {
            moves: function (el) {
                if (el.className.indexOf("undraggable") !== -1) {
                    return false;
                }

                return true; // elements are always draggable by default
            },
            accepts: function () {
                return true; // elements can be dropped in any of the `containers` by default
            },
            revertOnSpill: true
        });
        this.drake.on('drop', function (el, target, source, sibling) {

            this.drake.cancel();

            let siblingOrder = -1;
            if (sibling) {
                siblingOrder = Number(sibling.dataset.order);
            }

            const questions = this.props.survey.questions;

            this.props.surveyActions.changeQuestionsOrder(Number(el.id), siblingOrder, questions);

            return true;
        }.bind(this));
    }

    render() {
        const {survey, isLoading} = this.props;
        return (
            <div className="container-fluid">
                <EditQuestionModalContainer/>
                <SurveyDisplayModalContainer/>
                <div className="row">
                    {
                        isLoading ? <Loading/> : (
                            <div className="col-md-12">
                                <h3 className="title">{survey.name}</h3>
                                <button className="btn btn-rose" onClick={() => this.showEditQuestionModal({})}>
                                    Thêm câu hỏi
                                </button>
                                <button className="btn btn-info" onClick={this.showDisplayModal}>
                                    Cài đặt hiển thị
                                </button>
                                <div className="drake">
                                    {
                                        survey.questions && survey.questions.sort((a, b) => a.order - b.order).map((question) => {
                                            return (
                                                <ul className="timeline timeline-simple"
                                                    key={question.id} data-order={question.order} id={question.id}
                                                    style={{marginTop: 0, marginBottom: -20}}>
                                                    <li className="timeline-inverted">
                                                        <div style={{cursor: "pointer", backgroundColor: "#737373"}}
                                                             className={`timeline-badge`}>
                                                            <span>{question.order + 1}</span>
                                                        </div>
                                                        <div className="timeline-panel" style={{position: "relative"}}>
                                                            <div className="timeline-heading">
                                                                <span
                                                                    className="label label-rose">
                                                                    {
                                                                        this.showQuestionType(question.type)
                                                                    }
                                                                </span>
                                                                <div style={{
                                                                    minWidth: 180,
                                                                    position: "absolute",
                                                                    right: 15,
                                                                    top: 10
                                                                }}>
                                                                    <a className="btn btn-rose btn-sm"
                                                                       onClick={() => this.showEditQuestionModal(question)}>
                                                                        <i className="material-icons">build</i>
                                                                    </a>
                                                                    <a onClick={() => this.duplicateQuestion(question)}
                                                                       className="btn btn-info btn-sm">
                                                                        <i className="material-icons">content_copy</i>
                                                                    </a>
                                                                    <a onClick={() => this.deleteQuestion(question)}
                                                                       className="btn btn-default btn-sm">
                                                                        <i className="material-icons">delete</i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="timeline-body">
                                                                <p>
                                                                    <div style={{
                                                                        fontSize: 18
                                                                    }}>
                                                                        {question.content}
                                                                    </div>
                                                                    <h6>{question.answers.length} câu trả lời</h6>
                                                                </p>

                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }


                </div>
            </div>
        );
    }
}

SurveyDetailContainer.propTypes = {
    survey: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    surveyActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        survey: state.survey.survey,
        isLoading: state.survey.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        surveyActions: bindActionCreators(surveyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyDetailContainer);