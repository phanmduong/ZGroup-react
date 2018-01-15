import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as surveyActions from "./surveyActions";
import Loading from "../../components/common/Loading";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import EditQuestionModalContainer from "./EditQuestionModalContainer";
import AnswerItem from "./AnswerItem";
import Dragula from "react-dragula";

class SurveyDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.showEditQuestionModal = this.showEditQuestionModal.bind(this);
        this.initDragula = this.initDragula.bind(this);
        this.drake = null;
    }

    componentWillMount() {
        const {surveyId} = this.props.params;
        this.props.surveyActions.loadSurveyDetail(surveyId);
    }

    componentDidUpdate() {
        this.initDragula();
    }

    showEditQuestionModal(question) {
        this.props.surveyActions.toggleEditQuestion(true, question);
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
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="title">{survey.name}</h3>
                        {
                            isLoading ? <Loading/> : (
                                <div className="drake">
                                    {
                                        survey.questions && survey.questions.sort((a, b) => a.order > b.order).map((question) => {
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
                                                            <div className="timeline-body"
                                                                 style={{
                                                                     display: "flex",
                                                                     justifyContent: "space-between"
                                                                 }}>
                                                                <p style={{
                                                                    fontSize: 18,
                                                                    margin: 10
                                                                }}>{question.content}</p>
                                                                <div style={{minWidth: 180}}>
                                                                    <a className="btn btn-rose btn-sm"
                                                                       onClick={() => this.showEditQuestionModal(question)}>
                                                                        <i className="material-icons">build</i>
                                                                    </a>
                                                                    <a className="btn btn-info btn-sm">
                                                                        <i className="material-icons">content_copy</i>
                                                                    </a>
                                                                    <a className="btn btn-default btn-sm">
                                                                        <i className="material-icons">delete</i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            );
                                        })
                                    }
                                </div>
                            )
                        }

                    </div>
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