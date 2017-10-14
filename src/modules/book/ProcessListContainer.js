import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as bookActions from './bookActions';
import * as taskActions from '../tasks/taskActions';
import Search from "../../components/common/Search";
import TaskListItem from "./TaskListItem";
import _ from 'lodash';
import Loading from "../../components/common/Loading";
import AddTaskListTemplateModalContainer from "./AddTaskListTemplateModalContainer";
import TaskListDetailModalContainer from "./TaskListDetailModalContainer";
import {confirm} from "../../helpers/helper";

class ProcessListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadTaskLists = this.loadTaskLists.bind(this);
        this.taskListSearchChange = this.taskListSearchChange.bind(this);
        this.openAddTaskListTemplateModal = this.openAddTaskListTemplateModal.bind(this);
        this.openTaskListTemplateDetailModal = this.openTaskListTemplateDetailModal.bind(this);
        this.deleteTaskListTemplate = this.deleteTaskListTemplate.bind(this);
        this.state = {
            page: 1,
            query: ""
        };
    }

    componentWillMount() {
        this.loadTaskLists();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.type !== this.props.params.type) {
            this.props.bookActions.loadTaskListTemplates(1, "", nextProps.params.type);
        }
    }

    deleteTaskListTemplate(taskList) {
        confirm("warning", "Xoá danh sách việc",
            "Toàn bộ công việc trong danh sách này sẽ bị xoá vĩnh viễn",
            () => {
                this.props.bookActions.deleteTaskList(taskList);
            }, null);
    }

    loadTaskLists(page = 1) {
        this.setState({page});
        this.props.bookActions.loadTaskListTemplates(page, this.state.query, this.props.params.type);
    }

    taskListSearchChange(query) {
        this.setState({
            page: 1,
            query
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.bookActions.loadTaskListTemplates(this.state.page, this.state.query);
        }.bind(this), 500);

    }

    openAddTaskListTemplateModal() {
        this.props.bookActions.openAddTaskListTemplateModal();
    }

    openTaskListTemplateDetailModal(taskList) {
        this.props.bookActions.openTaskListDetailModal(taskList);
    }

    render() {
        return (
            <div id="page-wrapper">
                <AddTaskListTemplateModalContainer type={this.props.params.type}/>
                <TaskListDetailModalContainer/>
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">Quy trình</h4>

                            <div style={{marginTop: "15px"}}>
                                <a onClick={this.openAddTaskListTemplateModal} className="btn btn-rose">
                                    Thêm quy trình
                                </a>
                            </div>

                            <Search
                                onChange={this.taskListSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm quy trình (tên)"
                            />

                            {this.props.isLoading ? <Loading/> :
                                <div className="row">
                                    {/*<ProjectDetailModalContainer/>*/}
                                    {
                                        this.props.taskLists.map((taskList) => {
                                            return (
                                                <TaskListItem
                                                    delete={this.deleteTaskListTemplate}
                                                    openTaskListTemplateDetailModal={this.openTaskListTemplateDetailModal}
                                                    key={taskList.id}
                                                    taskList={taskList}/>
                                            );
                                        })}
                                </div>
                            }
                        </div>
                        <div className="card-content">
                            <ul className="pagination pagination-primary">
                                {_.range(1, this.props.totalPages + 1).map(page => {
                                    if (Number(this.props.currentPage) === page) {
                                        return (
                                            <li key={page} className="active">
                                                <a onClick={() => this.loadProjects(page)}>{page}</a>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li key={page}>
                                                <a onClick={() => this.loadProjects(page)}>{page}</a>
                                            </li>
                                        );
                                    }

                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProcessListContainer.propTypes = {
    taskLists: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    bookActions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        taskLists: state.book.taskLists.taskLists,
        isLoading: state.book.taskLists.isLoading,
        currentPage: state.book.taskLists.currentPage,
        totalPages: state.book.taskLists.totalPages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        bookActions: bindActionCreators(bookActions, dispatch),
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessListContainer);