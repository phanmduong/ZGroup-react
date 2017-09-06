import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal} from "react-bootstrap";
import PropTypes from 'prop-types';
import * as taskActions from '../taskActions';
import FormInputText from "../../../components/common/FormInputText";
import {CirclePicker} from "react-color";
import Select from 'react-select';
import AddMemberProjectOverlay from "./AddMemberProjectOverlay";
import Avatar from "../../../components/common/Avatar";


class ProjectDetailModalContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.statusOptions = [
            {value: 'open', label: 'open'},
            {value: 'close', label: 'close'}
        ];

    }

    close() {
        this.props.taskActions.closeProjectDetailModal();
    }

    changeStatus(option) {
        this.props.taskActions.updateProjectData({
            ...this.props.project,
            status: option.value
        });
    }

    updateFormData(event) {
        let project = {...this.props.project};
        project[event.target.name] = event.target.value;
        this.props.taskActions.updateProjectData(project);
    }

    submit() {
        this.props.taskActions.submitProject(this.props.project);
    }

    changeColor(color) {
        this.props.taskActions.updateProjectData({
            ...this.props.project,
            color: color.hex
        });
    }

    render() {
        const {project, isSaving, showModal} = this.props;
        return (
            <Modal show={showModal} bsSize="large" onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title><strong>{project.title}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-sm-8">
                            <h5>
                                <strong>Mô tả</strong>
                            </h5>
                            <form role="form">

                                <FormInputText
                                    placeholder="Nhập tên dự án"
                                    label="Tên dự án"
                                    name="title"
                                    updateFormData={this.updateFormData}
                                    value={project.title}/>
                                <FormInputText
                                    placeholder="Nhập mô tả dự án"
                                    label="Mô tả dự án"
                                    name="description"
                                    updateFormData={this.updateFormData}
                                    value={project.description}/>

                                <CirclePicker
                                    width="100%"
                                    color={project.color || ""}
                                    onChangeComplete={this.changeColor}/>

                                <div className="form-group">
                                    <Select
                                        name="status"
                                        value={project.status}
                                        options={this.statusOptions}
                                        onChange={this.changeStatus}
                                    />
                                </div>

                                <div>
                                    {isSaving ?
                                        (
                                            <button
                                                type="button"
                                                className="btn btn-primary disabled">
                                                <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                            </button>
                                        ) :
                                        (
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn btn-rose"
                                                    onClick={this.submit}>
                                                    Lưu dự án
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-default"
                                                    onClick={this.close}>
                                                    Đóng
                                                </button>
                                            </div>
                                        )}
                                </div>
                            </form>
                        </div>

                        <div className="col-sm-4">
                            <div className="card-detail-btn-group">
                                <AddMemberProjectOverlay/>

                            </div>
                            <div style={{padding: 5, display: "flex", flexWrap: "wrap"}}>
                                {
                                    project.members && project.members.map((member) => {
                                        return <Avatar key={member.id} url={member.avatar_url} size={48}/>;
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

ProjectDetailModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    project: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.task.projectDetail.showModal,
        isSaving: state.task.projectDetail.isSaving,
        project: state.task.projectDetail.project
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailModalContainer);