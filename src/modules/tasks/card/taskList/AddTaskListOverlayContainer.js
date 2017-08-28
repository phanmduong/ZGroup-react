import React from 'react';
import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as taskActions from '../../taskActions';
import {bindActionCreators} from "redux";
import TaskFormPopover from "./TaskFormPopover";
import {showNotification} from "../../../../helpers/helper";

class AddTaskListOverlayContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);
        this.saveTaskList = this.saveTaskList.bind(this);
        this.updateCreateTaskListFormData = this.updateCreateTaskListFormData.bind(this);
        this.state = {
            show: false
        };
    }

    toggle() {
        this.setState({show: !this.state.show});
    }

    saveTaskList() {
        this.props.taskActions
            .saveTaskList({...this.props.taskList, card_id: this.props.card.id})
            .then(() => {
                showNotification("Tạo danh sách việc thành công");
                this.toggle();
            });
    }

    updateCreateTaskListFormData(event) {
        const value = event.target.value;
        const field = event.target.name;
        let taskList = {...this.props.taskList};
        taskList[field] = value;
        this.props.taskActions.updateCreateTaskListFormData(taskList);
    }

    render() {
        return (
            <div style={{position: "relative"}}>
                <button className="btn btn-default"
                        ref="target" onClick={this.toggle}>
                    <i className="material-icons">work</i> Việc cần làm
                </button>
                <Overlay
                    show={this.state.show}
                    onHide={() => this.setState({show: false})}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <TaskFormPopover
                        isSavingTaskList={this.props.isSavingTaskList}
                        taskList={this.props.taskList}
                        updateCreateTaskListFormData={this.updateCreateTaskListFormData}
                        saveTaskList={this.saveTaskList}
                        toggle={this.toggle}/>
                </Overlay>
            </div>
        );
    }
}


AddTaskListOverlayContainer.propTypes = {
    isSavingTaskList: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    taskList: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isSavingTaskList: state.task.createTaskList.isSavingTaskList,
        taskList: state.task.createTaskList.taskList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskListOverlayContainer);
