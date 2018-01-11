import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as surveyActions from "./surveyActions";
import Loading from "../../components/common/Loading";
import {ListGroup, ListGroupItem} from "react-bootstrap";

class SurveyDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const {surveyId} = this.props.params;
        this.props.surveyActions.loadSurveyDetail(surveyId);
    }

    render() {
        const {survey, isLoading} = this.props;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">assignment</i>
                            </div>

                            <div className="card-content">
                                <h4 className="card-title">{survey.name}</h4>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="panel-group" id="accordion" role="tablist"
                                             aria-multiselectable="true">
                                            {
                                                isLoading ? <Loading/> : (
                                                    <div>
                                                        {
                                                            survey.questions && survey.questions.sort((a, b) => a.order - b.order).map((question) => {
                                                                return (
                                                                    <div className="panel panel-default">
                                                                        <div className="panel-heading" role="tab"
                                                                             id="headingOne">
                                                                            <a href="">
                                                                                <i style={{
                                                                                    float: "left",
                                                                                    marginRight: "5px",
                                                                                    fontSize: "20px"
                                                                                }}
                                                                                   className="material-icons">edit</i>
                                                                            </a>
                                                                            <a role="button" data-toggle="collapse"
                                                                               data-parent="#accordion"
                                                                               href={"#collapse" + question.id}
                                                                               aria-expanded="false"
                                                                               aria-controls="collapseOne"
                                                                               className="collapsed">
                                                                                <h4 className="panel-title">
                                                                                    {question.content}
                                                                                    <i className="material-icons">keyboard_arrow_down</i>
                                                                                </h4>
                                                                            </a>
                                                                        </div>
                                                                        <div id={"collapse" + question.id}
                                                                             className="panel-collapse collapse"
                                                                             role="tabpanel"
                                                                             aria-labelledby="headingOne">
                                                                            <div className="panel-body">
                                                                                <ListGroup>
                                                                                    {
                                                                                        question.answers && question.answers.map((answer) => (
                                                                                            <ListGroupItem
                                                                                                key={answer.id}>{answer.content}</ListGroupItem>
                                                                                        ))
                                                                                    }
                                                                                </ListGroup>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                )
                                            }
                                            <div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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