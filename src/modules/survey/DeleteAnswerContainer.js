import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {removeAnswer} from './surveyActions';
import PropTypes from 'prop-types';

// Import actions here!!

class DeleteAnswerContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.removeAnswer = this.removeAnswer.bind(this);
    }

    removeAnswer() {
        this.props.surveyActions.removeAnswer(this.props.answer);
    }

    render() {
        if (this.props.isSavingQuestion) {
            return <span/>;
        } else {
            return (
                <a style={{color: "#5f5f5f"}}
                   onClick={this.removeAnswer}>
                    &times;
                </a>
            );
        }

    }
}

DeleteAnswerContainer.propTypes = {
    isSavingQuestion: PropTypes.bool.isRequired,
    surveyActions: PropTypes.object.isRequired,
    answer: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isSavingQuestion: state.survey.isSavingQuestion
    };
}

function mapDispatchToProps(dispatch) {
    return {
        surveyActions: bindActionCreators({
            removeAnswer
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAnswerContainer);