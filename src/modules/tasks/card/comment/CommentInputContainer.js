import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from '../../taskActions';
import {commentCard} from '../../taskApi';
import './comment.css';
import Loading from "../../../../components/common/Loading";
import UploadAttachmentOverlayContainer from "../attachment/UploadAttachmentOverlayContainer";
import CardCommentAttachment from "./CardCommentAttachment";
import {createFileUrl} from "../../../../helpers/helper";

class CommentInputContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
        this.state = {
            isCommenting: false,
            value: ""
        };
        this.textAreaChange = this.textAreaChange.bind(this);
        this.textAreaAdjust = this.textAreaAdjust.bind(this);
    }

    componentDidUpdate() {
        const o = document.querySelector("#textarea-card-comment");
        if (o) {
            o.style.height = "1px";
            o.style.height = (10 + o.scrollHeight) + "px";
        }
    }

    textAreaAdjust(event) {
        const o = event.target;
        o.style.height = (10 + o.scrollHeight) + "px";
    }

    textAreaChange(event) {
        this.props.taskActions.updateCommentInputValue(event.target.value);
    }

    onEnterKeyPress(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            let value = e.target.value;
            this.setState({
                isCommenting: true
            });
            this.props.files.forEach((file) => {
                value += createFileUrl(file);
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
                        <div>
                            <div className="comment-input-wrapper">
                            <textarea
                                id="textarea-card-comment"
                                onChange={this.textAreaChange}
                                value={this.props.value}
                                onKeyUp={this.textAreaAdjust}
                                placeholder="Viết bình luận của bạn..."
                                onKeyPress={this.onEnterKeyPress}
                                className="comment-input"/>
                                <div className="btn-upload-file-comment">
                                    <UploadAttachmentOverlayContainer
                                        addToComment={true}
                                        card={this.props.card}>
                                        <i style={{fontSize: "18px", color: "#858585"}} className="material-icons">attachment</i>
                                    </UploadAttachmentOverlayContainer>
                                </div>
                            </div>
                            <div>
                                {
                                    this.props.files.map((file) => {
                                        return (
                                            <CardCommentAttachment
                                                key={file.id}
                                                delete={this.props.taskActions.deleteCardCommentAttachment}
                                                file={file}/>
                                        );
                                    })
                                }
                            </div>
                            <div>
                                <small>Bấm <b>Enter</b> để gửi bình luận</small>
                                <br/>
                                <small>Bấm <b>Shift + Enter</b> để xuống dòng</small>
                            </div>
                        </div>
                    )
                }

            </div>
        );
    }
}

CommentInputContainer.propTypes = {
    card: PropTypes.object.isRequired,
    files: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        card: state.task.cardDetail.card,
        comment: state.task.comment.comment,
        value: state.task.commentCard.value,
        files: state.task.commentCard.attachments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer);