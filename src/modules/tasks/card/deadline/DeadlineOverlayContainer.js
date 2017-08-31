import React from 'react';
import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as taskActions from '../../taskActions';
import {bindActionCreators} from "redux";
import DeadLinePopover from "./DeadLinePopover";

class DeadlineOverlayContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);
        this.state = {
            show: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveDeadline = this.saveDeadline.bind(this);
    }

    toggle() {
        this.setState({show: !this.state.show});
    }

    handleChange(event) {
        console.log(event.target.value);
    }

    saveDeadline() {

    }

    render() {
        return (
            <div style={{position: "relative"}}>
                <button className="btn btn-default card-detail-btn-action"
                        ref="target" onClick={this.toggle}>
                    <i className="material-icons">timer</i> Hạn chót
                </button>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={() => this.setState({show: false})}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <DeadLinePopover
                        saveDeadline={this.saveDeadline}
                        toggle={this.toggle}
                        handleChange={this.handleChange}/>
                </Overlay>
            </div>
        );
    }
}


DeadlineOverlayContainer.propTypes = {
    taskActions: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        card: state.task.cardDetail.card,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeadlineOverlayContainer);
