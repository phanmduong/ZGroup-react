import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as bookActions from "../book/bookActions";
import * as taskActions from "../tasks/taskActions";
import * as goodActions from "../good/goodActions";
import AddMemberToTaskModalContainer from "../tasks/card/taskList/AddMemberToTaskModalContainer";
import TaskSpanModalContainer from "../book/TaskSpanModalContainer";
import Loading from "../../components/common/Loading";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import TaskTemplateItem from "../book/TaskTemplateItem";
import {Link} from "react-router";
import AddPropertyItemsToTaskModalContainer from "./AddPropertyItemsToTaskModalContainer";
import {updateTasksOrder} from '../tasks/taskApi';


class TaskListTemplateContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.addTask = this.addTask.bind(this);
        this.state = {
            isEditTitle: false,
            title: ""
        };
        this.autoAssignBoardToTask = this.autoAssignBoardToTask.bind(this);
        this.toggleEditTitle = this.toggleEditTitle.bind(this);
        this.saveTitle = this.saveTitle.bind(this);
        this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
        this.moveTaskDown = this.moveTaskDown.bind(this);
        this.moveTaskUp = this.moveTaskUp.bind(this);
        this.updateTasksOrder = this.updateTasksOrder.bind(this);
    }

    componentWillMount() {
        this.props.bookActions.loadTaskListTemplate(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.taskList.title
        });
    }

    toggleEditTitle() {
        if (!this.state.title) {
            this.setState({
                title: this.props.taskList.title
            });
        }
        this.setState({
            isEditTitle: !this.state.isEditTitle
        });
    }

    saveTitle() {
        this.toggleEditTitle();
        this.props.bookActions.storeTaskListTemplates({
            ...this.props.taskList,
            title: this.state.title
        });
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

    onEnterKeyPress(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            this.saveTitle();
        }
    }

    updateTasksOrder() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            updateTasksOrder(this.props.taskList.tasks);
        }, 500);
    }

    moveTaskUp(task) {
        this.props.taskActions.moveTaskUp(this.props.taskList, task);
        this.updateTasksOrder();
    }

    moveTaskDown(task) {
        this.props.taskActions.moveTaskDown(this.props.taskList, task);
        this.updateTasksOrder();
    }

    autoAssignBoardToTask() {
        this.props.taskActions.autoAssignBoardToTask(this.props.taskList.id);
    }

    render() {
        const {taskList, isSaving} = this.props;
        return (
            <div id="page-wrapper">
                <div className="container-fluid">

                    <div className="card">

                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>

                        <div className="card-content">
                            <h4 style={{position: "relative"}} className="card-title">
                                Quy trình: {!this.props.isLoading && (
                                <span>
                                    {
                                        this.state.isEditTitle ? (
                                            <span>
                                                <input
                                                    onKeyPress={this.onEnterKeyPress}
                                                    onChange={(event) => this.setState({title: event.target.value})}
                                                    value={this.state.title}/>
                                                <a onClick={this.saveTitle}> <i
                                                    className="fa fa-check"
                                                    aria-hidden="true"/></a>
                                                <a onClick={this.toggleEditTitle}>
                                                    <i className="fa fa-times"
                                                       aria-hidden="true"/></a>
                                            </span>
                                        ) : (
                                            <span>{this.state.title} <a onClick={this.toggleEditTitle}>
                                                <i className="fa fa-pencil" aria-hidden="true"/></a>
                                            </span>
                                        )
                                    }
                                </span>

                            )}
                                {
                                    !this.props.isLoading && (
                                        <a onClick={this.autoAssignBoardToTask}
                                           style={{position: "absolute", right: 0, top: 0}}>
                                            <i className="material-icons">autorenew</i>
                                        </a>
                                    )
                                }

                            </h4>

                            {this.props.isLoading ? <Loading/> : (
                                <div>
                                    <div className="task-lists">
                                        <AddMemberToTaskModalContainer isTemplate={true}/>
                                        {
                                            taskList.type &&
                                            <AddPropertyItemsToTaskModalContainer type={taskList.type}/>
                                        }

                                        <TaskSpanModalContainer/>

                                        <div key={taskList.id}>
                                            <ListGroup>
                                                {
                                                    taskList.tasks && taskList.tasks
                                                        .sort((a, b) => a.order - b.order)
                                                        .map((task) =>
                                                            (<TaskTemplateItem
                                                                canMoveUp={task.order !== 0}
                                                                canMoveDown={task.order !== taskList.tasks.length - 1}
                                                                isTemplate={true}
                                                                moveTaskUp={this.moveTaskUp}
                                                                moveTaskDown={this.moveTaskDown}
                                                                type={taskList.type}
                                                                openAddPropertyItemToTaskModal={this.props.goodActions.openAddPropertyItemModal}
                                                                openTaskSpanModal={this.props.bookActions.openTaskSpanModal}
                                                                openAddMemberToTaskModal={this.props.taskActions.openAddMemberToTaskModal}
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
                                        <Link
                                            to={`/${taskList.type}/process`}
                                            type="button"
                                            className="btn btn-default"
                                            onClick={this.close}>
                                            Xong
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TaskListTemplateContainer.propTypes = {
    isSaving: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    bookActions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    goodActions: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    taskList: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isSaving: state.book.taskListDetail.isSaving,
        isLoading: state.book.taskListDetail.isLoading,
        taskList: state.book.taskListDetail.taskList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        bookActions: bindActionCreators(bookActions, dispatch),
        taskActions: bindActionCreators(taskActions, dispatch),
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListTemplateContainer);