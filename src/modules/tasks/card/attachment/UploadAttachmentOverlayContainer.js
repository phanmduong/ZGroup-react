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

            this.props.taskActions.uploadAttachment(this.props.card, fileWrapper);
        });


    }


    toggle() {
        this.setState({show: !this.state.show});
    }

    render() {
        return (
            <div style={{position: "relative"}}>
                <button className="btn btn-default"
                        ref="target" onClick={this.toggle}>
                    <i className="material-icons">attachment</i> Đính kèm
                </button>
                <Overlay
                    show={this.state.show}
                    onHide={() => this.setState({show: false})}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <UploadAttachmentPopover
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
    card: PropTypes.object.isRequired,
    files: PropTypes.array.isRequired
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
