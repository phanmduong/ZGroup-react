import React from 'react';
import PropTypes from 'prop-types';
import {Media} from "react-bootstrap";

class CommentItem extends React.Component {

    render() {
        const {comment} = this.props;
        return (
            <Media>
                <Media.Left align="top">
                    <img style={{borderRadius: 5}} width={48} height={48} src={comment.commenter.avatar_url}
                         alt={comment.commenter.name}/>
                </Media.Left>
                <Media.Body style={{position: "relative"}}>
                    <div>
                        <b>{comment.commenter.name}</b>
                        <small style={{color: "#919191", marginLeft: 10}}>{comment.created_at}</small>
                    </div>
                    {//eslint-disable-next-line
                    }<div style={{whiteSpace: "pre-wrap"}} dangerouslySetInnerHTML={{__html: comment.content}}/>
                    <a style={{
                        color: "rgb(90, 90, 90)",
                        position: "absolute",
                        top: 5, right: 5
                    }}
                       onClick={() => this.props.delete(comment)}>x</a>
                </Media.Body>
            </Media>
        );
    }

}

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    delete: PropTypes.func.isRequired
};

CommentItem.defaultProps = {};

export default CommentItem;