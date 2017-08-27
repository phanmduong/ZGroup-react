import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from '../taskActions';
import Loading from "../../../components/common/Loading";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import TaskItem from "./TaskItem";

class TaskListsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.addTask = this.addTask.bind(this);
    }

    componentWillMount() {
        this.props.taskActions.loadTaskLists(this.props.cardId);
    }


    addTask(taskListId) {
        return (event) => {
            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    this.props.taskActions.createTask({
                        title: event.target.value,
                        task_list_id: taskListId
                    });
                }
            }
        };
    }


    render() {
        return (
            <div className="task-lists">
                {
                    this.props.isLoadingTaskLists ? (
                        <Loading/>
                    ) : this.props.taskLists.map((taskList) => {
                        return (
                            <div key={taskList.id}>
                                <h4>
                                    <strong>{taskList.title}</strong>
                                </h4>
                                <div className="progress progress-line-default">
                                    <div className="progress-bar progress-bar-rose"
                                         role="progressbar"
                                         aria-valuenow="60"
                                         aria-valuemin="0" aria-valuemax="100"
                                         style={{
                                             width: taskList.tasks.length === 0 ?
                                                 0 : (taskList.tasks.filter(t => t.status).length * 100 / taskList.tasks.length) + "%"
                                         }}>
                                        <span className="sr-only">60% Complete</span>
                                    </div>
                                </div>
                                <ListGroup>
                                    {
                                        taskList.tasks.map((task) =>
                                            <TaskItem
                                                toggleTaskStatus={this.props.taskActions.toggleTaskStatus}
                                                deleteTask={this.props.taskActions.deleteTask}
                                                key={task.id}
                                                task={task}/>)
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
    cardId: PropTypes.number.isRequired,
    taskLists: PropTypes.array.isRequired,
    isLoadingTaskLists: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        taskLists: state.task.taskList.taskLists,
        isLoadingTaskLists: state.task.taskList.isLoadingTaskLists
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListsContainer);