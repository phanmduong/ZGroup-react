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
import AskGoodPropertiesModalContainer from "../../../good/AskGoodPropertiesModalContainer";

class TaskListsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.addTask = this.addTask.bind(this);
        this.toggleTaskStatus = this.toggleTaskStatus.bind(this);
        this.state = {
            showAskGoodPropertiesModal: false,
            goodProperties: [],
            goodPropertiesOutput: {},
            currentTask: {},
            currentCard: {}
        };
        this.openAskGoodPropertiesModal = this.openAskGoodPropertiesModal.bind(this);
        this.closeAskGoodPropertiesModal = this.closeAskGoodPropertiesModal.bind(this);
    }

    openAskGoodPropertiesModal(task) {
        this.props.taskActions.openAskGoodPropertiesModal(task);
    }

    closeAskGoodPropertiesModal() {
        this.setState({
            showAskGoodPropertiesModal: false
        });
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

    toggleTaskStatus(task, card) {
        if (task.good_property_items && task.good_property_items.length > 0) {
            if (!task.status) {
                this.openAskGoodPropertiesModal(task);
            } else {
                console.log("toggle");
                this.props.taskActions.toggleTaskStatus(task, card);
            }

        } else {
            this.props.taskActions.toggleTaskStatus(task, card);
        }

    }


    render() {

        const tasksComplete = (taskList) => taskList.tasks.filter(t => t.status).length;
        const totalTasks = (taskList) => taskList.tasks.length;
        const percent = (taskList) => tasksComplete(taskList) / totalTasks(taskList);
        return (
            <div className="task-lists">
                <AskGoodPropertiesModalContainer/>

                <AddMemberToTaskModalContainer/>

                <TaskDeadlineModalContainer/>
                {
                    this.props.card.taskLists && this.props.card.taskLists.map((taskList) => {
                        const isProcess = taskList.role === "process";
                        return (
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
                                        taskList.tasks.sort((a, b) => a.order - b.order).map((task) => {

                                            let isEnable = true;
                                            if (isProcess) {
                                                const previousTask = taskList.tasks.filter((t) => {
                                                    const previousTaskOrder = Number(task.order) - 1;
                                                    return t.order === previousTaskOrder;
                                                })[0];


                                                isEnable = !task.status &&
                                                    (task.order === 0 || !!previousTask.status);
                                            }

                                            return (<TaskItem
                                                isEnable={isEnable}
                                                openTaskDeadlineModal={this.props.taskActions.openTaskDeadlineModal}
                                                openAddMemberToTaskModal={this.props.taskActions.openAddMemberToTaskModal}
                                                card={this.props.card}
                                                toggleTaskStatus={this.toggleTaskStatus}
                                                deleteTask={this.props.taskActions.deleteTask}
                                                key={task.id}
                                                task={task}/>);
                                        })

                                    }
                                    {
                                        !isProcess && (
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
                                        )
                                    }

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
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListsContainer);