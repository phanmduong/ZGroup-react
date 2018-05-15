import React from 'react';
import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as taskActions from '../../taskActions';
import {bindActionCreators} from "redux";
import CardLabelPopover from "./CardLabelOverlay";

class CardLabelOverlayContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);
        this.state = {
            show: false
        };
    }

    toggle() {
        this.setState({show: !this.state.show});
    }

    render() {
        return (
            <div style={{position: "relative"}}>
                <button className="btn btn-default card-detail-btn-action"
                        ref="target" onClick={this.toggle}>
                    <i className="material-icons">label</i> nhãn
                </button>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={() => this.setState({show: false})}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <CardLabelPopover
                        loadCardLabelsSuccess={this.props.taskActions.loadCardLabelsSuccess}
                        card={this.props.card}
                        deleteCardLabel={this.props.taskActions.deleteCardLabel}
                        assignCardLabel={this.props.taskActions.assignCardLabel}
                        projectId={this.props.projectId}
                        toggle={this.toggle}/>
                </Overlay>
            </div>
        );
    }
}


CardLabelOverlayContainer.propTypes = {
    taskActions: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        projectId: Number(state.task.boardList.projectId),
        card: state.task.cardDetail.card
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardLabelOverlayContainer);
