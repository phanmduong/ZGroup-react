import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import PropTypes from 'prop-types';
import * as taskActions from '../taskActions';
import Select from 'react-select';
import AddMemberProjectOverlay from "./AddMemberProjectOverlay";
import ProjectMemberDetailOverlayContainer from "./ProjectMemberDetailOverlayContainer";
import Switch from "../../../components/common/Switch";
import Loading from "../../../components/common/Loading";
import ProjectDetailCommon from "./common/ProjectDetailCommon";


class ProjectDetailModalContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changeStartBoard = this.changeStartBoard.bind(this);
        this.statusOptions = [
            {value: 'open', label: 'open'},
            {value: 'close', label: 'close'}
        ];

    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.showModal && nextProps.showModal && nextProps.projectId)
            this.props.taskActions.loadProjectDetail(nextProps.projectId);
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

    changeStartBoard(option) {
        this.props.taskActions.updateProjectData({
            ...this.props.project,
            start_board: option
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
        const {project, isSaving, showModal, isLoading} = this.props;
        const boardOptions = project.boards && project.boards.map((board) => {
            return {
                ...board,
                label: board.title,
                value: board.id
            };
        });
        return (
            <Modal show={showModal} bsSize="large" onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title><strong>{project.title}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        isLoading ? <Loading/> : (
                            <div className="row">
                                <div className="col-sm-8">
                                    {
                                        project.members && (
                                            <div>
                                                <h5>
                                                    <strong>Thành viên</strong>
                                                </h5>
                                                <div style={{padding: 5, display: "flex", flexWrap: "wrap"}}>
                                                    {
                                                        project.members.map((member) => {
                                                            return (<ProjectMemberDetailOverlayContainer
                                                                key={member.id}
                                                                member={member}/>);
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )}
                                    <h5>
                                        <strong>Mô tả</strong>
                                    </h5>
                                    <form role="form">

                                        <ProjectDetailCommon
                                            updateFormData={this.updateFormData}
                                            changeColor={this.changeColor}
                                            project={project}/>

                                        {
                                            (project.status === "book" || project.status === "fashion") && (
                                                <div className="form-group label-floating">
                                                    <label className="control-label">Bảng bắt đầu</label>
                                                    <Select
                                                        name="start"
                                                        value={project.start_board ? project.start_board.id : 0}
                                                        options={boardOptions}
                                                        onChange={this.changeStartBoard}
                                                    />
                                                </div>
                                            )
                                        }


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
                                                        className="btn btn-rose disabled">
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
                                    <div>
                                        <h4>Cài đặt cho thành viên</h4>
                                        <ListGroup>
                                            <ListGroupItem>
                                                <Switch
                                                    onChange={() => this.props.taskActions.changeProjectSetting({
                                                        ...project,
                                                        canDragBoard: !project.canDragBoard
                                                    })}
                                                    value={!!project.canDragBoard}/>
                                                Kéo thả bảng
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Switch
                                                    onChange={() => this.props.taskActions.changeProjectSetting({
                                                        ...project,
                                                        canDragCard: !project.canDragCard
                                                    })}
                                                    value={!!project.canDragCard}/>
                                                Kéo thả thẻ
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </Modal.Body>
            </Modal>
        );
    }
}

ProjectDetailModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    project: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired,
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.task.projectDetail.showModal,
        isSaving: state.task.projectDetail.isSaving,
        isLoading: state.task.projectDetail.isLoading,
        project: state.task.projectDetail.project,
        projectId: state.task.projectDetail.projectId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailModalContainer);