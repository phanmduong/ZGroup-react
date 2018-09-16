import React from 'react';
import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as taskActions from '../../taskActions';
import {bindActionCreators} from "redux";
import DeadLinePopover from "./DeadLinePopover";
import {isEmptyInput, showErrorNotification} from "../../../../helpers/helper";
import {DATETIME_FORMAT} from "../../../../constants/constants";

class DeadlineOverlayContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);
        this.state = {
            show: false,
            deadline: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveDeadline = this.saveDeadline.bind(this);
    }



    componentWillMount() {
        this.setState({deadline: this.props.card.deadline});
    }

    toggle() {
        this.setState({show: !this.state.show});
    }

    handleChange({date}) {
        this.setState({
            deadline: date.format(DATETIME_FORMAT)
        });
    }

    saveDeadline() {
        if (isEmptyInput(this.state.deadline)) {
            showErrorNotification("Bạn cần phải nhập hạn chót");
        } else {
            this.props.taskActions.updateCardDeadline({
                ...this.props.card,
                deadline: this.state.deadline
            });
            this.toggle();
        }
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
                        deadline={this.state.deadline || ""}
                        isSavingDeadline={this.props.isSavingDeadline}
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
    isSavingDeadline: PropTypes.bool.isRequired,
    card: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isSavingDeadline: state.task.cardDetail.isSavingDeadline,
        card: state.task.cardDetail.card,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeadlineOverlayContainer);
