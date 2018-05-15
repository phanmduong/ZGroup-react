import React from 'react';
import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as taskActions from '../../taskActions';
import {bindActionCreators} from "redux";
import UploadAttachmentPopover from "./UploadAttachmentPopover";
import "./attachment.scss";

class UploadAttachmentOverlayContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            show: false
        };
    }

    handleChange(event) {
        const files = Array.from(event.target.files);

        files.map((file, index) => {
            const fileWrapper = {
                file: file,
                index,
                name: file.name
            };

            this.props.taskActions.uploadAttachment(this.props.card, fileWrapper, this.props.addToComment);
        });


    }

    toggle() {
        this.setState({show: !this.state.show});
    }

    render() {
        return (
            <div style={{position: "relative"}}>
                <a onClick={this.toggle} ref="target">
                    {this.props.children}
                </a>

                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={() => this.setState({show: false})}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <UploadAttachmentPopover
                        addToComment={this.props.addToComment}
                        card={this.props.card}
                        files={this.props.files}
                        handleChange={this.handleChange}
                        toggle={this.toggle}/>
                </Overlay>
            </div>
        );
    }
}


UploadAttachmentOverlayContainer.propTypes = {
    taskActions: PropTypes.object.isRequired,
    addToComment: PropTypes.bool,
    card: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    files: PropTypes.array.isRequired
};

UploadAttachmentOverlayContainer.defaultProps = {
    addToComment: false
};

function mapStateToProps(state) {
    return {
        files: state.task.uploadAttachment.files,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadAttachmentOverlayContainer);
