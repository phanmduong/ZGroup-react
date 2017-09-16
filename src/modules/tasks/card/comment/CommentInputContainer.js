import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from '../../taskActions';
import './comment.css';

class CommentInputContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <textarea className="comment-input"/>
            </div>
        );
    }
}

CommentInputContainer.propTypes = {
    card: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        card: state.task.cardDetail.card,
        comment: state.task.comment.comment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer);