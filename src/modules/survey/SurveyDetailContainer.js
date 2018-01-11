import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as surveyActions from "./surveyActions";

class SurveyDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const {surveyId} = this.props.params;
        this.props.surveyActions.loadSurveyDetail(surveyId);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Quản lý khảo sát</h4>
                                <div className="row">
                                    <div className="col-md-12">
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