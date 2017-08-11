import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Import actions here!!
import PropTypes from 'prop-types';
import * as taskActions from './taskActions';
import {isEmptyInput} from '../../helpers/helper';
import _ from 'lodash';
import toastr from 'toastr';
import Loading from "../../components/common/Loading";
import ProjectForm from "./ProjectForm";

class CreateProjectContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            error: {},
            header: "Thêm dự án"
        };
    }

    componentWillMount() {
        if (this.props.route.type === "edit") {
            this.setState({
                header: "Sửa dự án"
            });
        }
        this.props.taskActions.resetProject();
        if (this.props.params.projectId) {
            this.props.taskActions.loadProject(this.props.params.projectId);
        }
    }


    updateFormData(event) {
        const error = this.state.error;
        const field = event.target.name;
        let project = {...this.props.project};
        project[field] = event.target.value;
        error[field] = undefined;
        this.setState({error});
        this.props.taskActions.updateCreateProjectFormData(project);
    }

    submit() {
        let error = {};
        const {title, description} = this.props.project;
        if (isEmptyInput(title)) {
            error.title = "Bạn cần nhập tên dự án";
        }
        if (isEmptyInput(description)) {
            error.description = "Bạn cần nhập mô tả dự án";
        }
        if (_.isEmpty(error)) {
            this.props.taskActions.createProject(this.props.project);
        } else {
            this.setState({error});
            _.values(error).forEach(e => toastr.error(e));
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">mode_edit</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">{this.state.header}</h4>
                            {this.props.isLoadingProject ? (
                                <div className="card-content">
                                    <Loading/>
                                </div>
                            ) : (
                                <ProjectForm
                                    isSaving={this.props.isSavingProject}
                                    error={this.state.error}
                                    project={this.props.project}
                                    submit={this.submit}
                                    updateFormData={this.updateFormData}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

CreateProjectContainer.propTypes = {
    project: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    isLoadingProject: PropTypes.bool.isRequired,
    isSavingProject: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        project: state.task.createProject.project,
        isLoadingProject: state.task.createProject.isLoadingProject,
        isSavingProject: state.task.createProject.isSavingProject
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectContainer);
