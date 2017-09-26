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
import TaskSpanModalContainer from "./TaskSpanModalContainer";


class TaskListDetailModalContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.statusOptions = [
            {value: 'open', label: 'open'},
            {value: 'close', label: 'close'}
        ];
        this.addTask = this.addTask.bind(this);

    }


    componentWillReceiveProps(nextProps){
        if (nextProps.showModal && !this.props.showModal) {
            this.props.bookActions.loadTaskListTemplate(nextProps.taskList.id);
        }
    }

    close() {
        this.props.bookActions.closeTaskListDetailModal();
    }

    addTask(taskList) {
        return (event) => {
            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    this.props.bookActions.createTask({
                        title: event.target.value,
                        task_list_id: taskList.id
                    });
                }
            }
        };
    }

    render() {
        const tasksComplete = (taskList) => taskList.tasks ? taskList.tasks.filter(t => t.status).length : 0;
        const totalTasks = (taskList) => taskList.tasks ? taskList.tasks.length : 0;
        const percent = (taskList) => totalTasks(taskList) !== 0 ? tasksComplete(taskList) / totalTasks(taskList) : 0;
        const {taskList, showModal, isSaving} = this.props;
        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title><strong>{taskList.title}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.isLoading ? <Loading/> : (
                        <div>
                            <div className="task-lists">
                                <AddMemberToTaskModalContainer isTemplate={true}/>
                                <TaskSpanModalContainer/>

                                <div key={taskList.id}>
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
                                                    openTaskSpanModal={this.props.bookActions.openTaskSpanModal}
                                                    openAddMemberToTaskModal={this.props.taskActions.openAddMemberToTaskModal}
                                                    toggleTaskStatus={this.props.bookActions.toggleTaskStatus}
                                                    key={task.id}
                                                    task={task}
                                                    deleteTaskTemplate={this.props.bookActions.deleteTaskTemplate}/>))
                                        }
                                        <ListGroupItem>
                                            {
                                                isSaving ? <Loading/> :
                                                    (
                                                        <div className="form-group" style={{marginTop: 0}}>
                                                            <input
                                                                placeholder="Thêm mục"
                                                                type="text"
                                                                className="form-control"
                                                                onKeyDown={this.addTask(taskList)}/>
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
                        </div>
                    )}

                </Modal.Body>
            </Modal>
        );
    }
}

TaskListDetailModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    bookActions: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    taskList: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.book.taskListDetail.showModal,
        isSaving: state.book.taskListDetail.isSaving,
        isLoading: state.book.taskListDetail.isLoading,
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