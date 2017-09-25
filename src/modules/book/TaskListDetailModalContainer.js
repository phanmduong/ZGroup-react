import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import PropTypes from 'prop-types';
import * as bookActions from './bookActions';
import * as taskActions from '../tasks/taskActions';
import TaskTemplateItem from "./TaskTemplateItem";
import Loading from "../../components/common/Loading";
import AddMemberToTaskModalContainer from "../tasks/card/taskList/AddMemberToTaskModalContainer";
import TaskDeadlineModalContainer from "../tasks/card/taskList/TaskDeadlineModalContainer";


class TaskListDetailModalContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.statusOptions = [
            {value: 'open', label: 'open'},
            {value: 'close', label: 'close'}
        ];

    }

    close() {
        this.props.bookActions.closeTaskListDetailModal();
    }


    render() {
        const tasksComplete = (taskList) => taskList.tasks ? taskList.tasks.filter(t => t.status).length : 0;
        const totalTasks = (taskList) => taskList.tasks ? taskList.tasks.length : 0;
        const percent = (taskList) => totalTasks(taskList) !== 0 ? tasksComplete(taskList) / totalTasks(taskList) : 0;
        const {taskList, showModal} = this.props;
        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title><strong>{taskList.title}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="task-lists">
                        <AddMemberToTaskModalContainer/>
                        <TaskDeadlineModalContainer/>

                        <div key={taskList.id}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <h4>
                                    <strong>{taskList.title}</strong>
                                </h4>
                                <button
                                    onClick={() => {
                                        confirm("warning", "Xoá danh sách việc",
                                            "Toàn bộ công việc trong danh sách này sẽ bị xoá vĩnh viễn",
                                            () => {
                                                this.props.taskActions.deleteTaskList(taskList);
                                            }, null);
                                    }}
                                    type="button" className="close"
                                    style={{color: '#5a5a5a'}}>
                                    <span aria-hidden="true">×</span>
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                            <small>
                                {tasksComplete(taskList)}/{totalTasks(taskList)}
                                {" "}
                                ({totalTasks(taskList) === 0 ?
                                "0%" : Math.round(percent(taskList) * 10000) / 100 + "%"})
                            </small>
                            <div className="progress progress-line-default">
                                <div className="progress-bar progress-bar-rose"
                                     role="progressbar"
                                     aria-valuenow="60"
                                     aria-valuemin="0" aria-valuemax="100"
                                     style={{
                                         width: totalTasks(taskList) === 0 ? 0 : percent(taskList) * 100 + "%"
                                     }}>
                                        <span className="sr-only">
                                            {totalTasks(taskList) === 0 ?
                                                "0%" : Math.round(percent(taskList) * 10000) / 100 + "%"}
                                            Complete
                                        </span>
                                </div>
                            </div>
                            <ListGroup>
                                {
                                    taskList.tasks && taskList.tasks.map((task) =>
                                        (<TaskTemplateItem
                                            openTaskDeadlineModal={this.props.taskActions.openTaskDeadlineModal}
                                            openAddMemberToTaskModal={this.props.taskActions.openAddMemberToTaskModal}
                                            toggleTaskStatus={this.props.taskActions.toggleTaskStatus}
                                            key={task.id}
                                            task={task}
                                            deleteTaskTemplate={this.props.bookActions.deleteTaskTemplate}/>))
                                }
                                <ListGroupItem>
                                    {
                                        taskList.isSavingTask ? <Loading/> :
                                            (
                                                <div className="form-group" style={{marginTop: 0}}>
                                                    <input
                                                        placeholder="Thêm mục"
                                                        type="text"
                                                        className="form-control"
                                                        onKeyDown={this.addTask(taskList.id)}/>
                                                </div>
                                            )
                                    }

                                </ListGroupItem>
                            </ListGroup>
                        </div>

                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-default"
                            onClick={this.close}>
                            Đóng
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

TaskListDetailModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    bookActions: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    taskList: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.book.taskListDetail.showModal,
        taskList: state.book.taskListDetail.taskList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        bookActions: bindActionCreators(bookActions, dispatch),
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListDetailModalContainer);