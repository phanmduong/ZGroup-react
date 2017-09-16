import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import CommentItem from "./CommentItem";

class CommentListContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                {
                    this.props.comments.map((comment) => {
                        return (
                            <CommentItem
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
    comments: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        comments: state.task.comment.comments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);