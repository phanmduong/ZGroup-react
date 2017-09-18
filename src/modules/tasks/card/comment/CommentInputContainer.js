import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from '../../taskActions';
import {commentCard} from '../../taskApi';
import './comment.css';
import Loading from "../../../../components/common/Loading";

class CommentInputContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
        this.state = {
            isCommenting: false
        };
    }

    onEnterKeyPress(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            const value = e.target.value;
            this.setState({
                isCommenting: true
            });
            commentCard(value, this.props.card.id)
                .then((res) => {
                    this.setState({
                        isCommenting: false
                    });
                    this.props.taskActions.saveCardCommentSuccess(res.data.data.comment);
                });
        }
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                {
                    this.state.isCommenting ? <Loading/> : (
                        <textarea
                            placeholder="Viết bình luận của bạn..."
                            onKeyPress={this.onEnterKeyPress}
                            className="comment-input"/>
                    )
                }

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