import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from './taskActions';
import ListProject from "./ListProject";
import {Link} from "react-router";
import Loading from "../../components/common/Loading";
import {confirm} from "../../helpers/helper";
import _ from 'lodash';
import Search from "../../components/common/Search";

class ProjectListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.deleteProject = this.deleteProject.bind(this);
        this.loadProjects = this.loadProjects.bind(this);
        this.changeProjectStatus = this.changeProjectStatus.bind(this);
        this.projectsSearchChange = this.projectsSearchChange.bind(this);
        this.state = {
            page: 1,
            query: ""
        };
    }

    componentWillMount() {
        this.props.taskActions.loadProjects();
    }

    changeProjectStatus(project, status) {
        this.props.taskActions.changeProjectStatus(project, status);
    }

    deleteProject(project) {
        confirm("error", "Xoá", "Bạn có chắc chắn muốn xoá dự án này",
            function () {
                this.props.taskActions.deleteProject(project);
            }.bind(this));

    }

    loadProjects(page = 1) {
        this.setState({page});
        this.props.taskActions.loadProjects(page, this.state.query);
    }

    projectsSearchChange(query) {
        this.setState({
            page: 1,
            query
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.taskActions.loadProjects(this.state.page, this.state.query);
        }.bind(this), 500);

    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">Dự án</h4>

                            <div style={{marginTop: "15px"}}>
                                <Link to="/project/create" className="btn btn-rose">
                                    Thêm dự án
                                </Link>
                            </div>

                            <Search
                                onChange={this.projectsSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm cơ sở (tên, địa chỉ)"
                            />

                            {this.props.isLoadingProjects ? <Loading/> :
                                <ListProject
                                    changeProjectStatus={this.changeProjectStatus}
                                    deleteProject={this.deleteProject}
                                    projects={this.props.projects}/>}
                        </div>
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
        );
    }
}

ProjectListContainer.propTypes = {
    projects: PropTypes.array.isRequired,
    isLoadingProjects: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        projects: state.task.project.projects,
        isLoadingProjects: state.task.project.isLoadingProjects,
        currentPage: state.task.project.currentPage,
        totalPages: state.task.project.totalPages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);