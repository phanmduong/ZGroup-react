import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import CommentItem from "./CommentItem";
import * as taskActions from '../../taskActions';

class CommentListContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div style={{
                borderTop: "1px solid #d9d9d9",
                marginTop: 20,
                paddingTop: 20
            }}>
                {
                    this.props.comments.map((comment) => {
                        return (
                            <CommentItem
                                delete={this.props.taskActions.deleteCardComment}
                                key={comment.id}
                                comment={comment}/>
                        );
                    })
                }
            </div>
        );
    }
}

CommentListContainer.propTypes = {
    comments: PropTypes.array.isRequired,
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        comments: state.task.comment.comments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);