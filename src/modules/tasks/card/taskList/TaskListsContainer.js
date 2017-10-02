import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from '../../taskActions';
import Loading from "../../../../components/common/Loading";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import TaskItem from "./TaskItem";
import AddMemberToTaskModalContainer from "./AddMemberToTaskModalContainer";
import TaskDeadlineModalContainer from "./TaskDeadlineModalContainer";
import {confirm} from "../../../../helpers/helper";

class TaskListsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.addTask = this.addTask.bind(this);
    }

    addTask(taskListId) {
        return (event) => {
            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    this.props.taskActions.createTask({
                        title: event.target.value,
                        task_list_id: taskListId
                    }, this.props.card);
                }
            }
        };
    }


    render() {
        const tasksComplete = (taskList) => taskList.tasks.filter(t => t.status).length;
        const totalTasks = (taskList) => taskList.tasks.length;
        const percent = (taskList) => tasksComplete(taskList) / totalTasks(taskList);
        const isAdmin = this.props.members.filter(member => member.is_admin && member.id === this.props.user.id).length > 0 || this.props.user.role === 2;
        const canEditTask = isAdmin || this.props.canEditTask;
        return (
            <div className="task-lists">
                <AddMemberToTaskModalContainer/>
                <TaskDeadlineModalContainer/>
                {
                    this.props.card.taskLists && this.props.card.taskLists.map((taskList) => {
                        return (
                            <div key={taskList.id}>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <h4>
                                        <strong>{taskList.title}</strong>
                                    </h4>
                                    {
                                        canEditTask && (
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
                                        )
                                    }
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
                                        taskList.tasks.map((task) =>
                                            (<TaskItem
                                                canEditTask={canEditTask}
                                                openTaskDeadlineModal={this.props.taskActions.openTaskDeadlineModal}
                                                openAddMemberToTaskModal={this.props.taskActions.openAddMemberToTaskModal}
                                                card={this.props.card}
                                                toggleTaskStatus={this.props.taskActions.toggleTaskStatus}
                                                deleteTask={this.props.taskActions.deleteTask}
                                                key={task.id}
                                                task={task}/>))
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
                        );
                    })
                }
            </div>
        );
    }
}

TaskListsContainer.propTypes = {
    card: PropTypes.object.isRequired,
    members: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    canEditTask: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        members: state.task.boardList.members,
        user: state.login.user,
        canEditTask: state.task.boardList.canEditTask
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListsContainer);