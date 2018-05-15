import React from 'react';
import PropTypes from 'prop-types';

class CardCommentAttachment extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.delete = this.delete.bind(this);
    }

    delete() {
        this.props.delete(this.props.file);
    }

    render() {
        const {file} = this.props;
        return (
            <div>
                <a className="text-rose comment-card-url"
                   target="_blank" href={file.url}>
                    {file.name}
                </a>
                <a style={{marginLeft: 5, color: "#c50000"}} onClick={this.delete}>&times;</a>
            </div>
        );
    }
}

CardCommentAttachment.propTypes = {
    file: PropTypes.object.isRequired,
    delete: PropTypes.func.isRequired
};

export default CardCommentAttachment;