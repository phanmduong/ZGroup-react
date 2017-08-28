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
        console.log(event.target.files);
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
                        handleChange={this.handleChange}
                        toggle={this.toggle}/>
                </Overlay>
            </div>
        );
    }
}


UploadAttachmentOverlayContainer.propTypes = {
    taskActions: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadAttachmentOverlayContainer);
