import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import * as taskActions from '../../taskActions';
import Loading from "../../../../components/common/Loading";
import InlineInputDateTime from "../../../../components/common/InlineInputDateTime";
import {DATETIME_FORMAT} from "../../../../constants/constants";

class TaskDeadlineModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        $(".bootstrap-datetimepicker-widget table td.day > div").css("z-index", 0);
    }

    close() {
        this.props.taskActions.closeTaskDeadlineModal();
    }

    save() {
        this.props.taskActions.saveTaskDeadline(this.props.task);
    }

    handleChange({date}) {
        this.props.taskActions.updateTaskDeadline(date.format(DATETIME_FORMAT));
    }

    render() {
        return (
            <Modal bsSize="small" show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Phân công việc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InlineInputDateTime
                        value={this.props.task.deadline || ""}
                        id="task-deadline"
                        updateFormData={this.handleChange}/>
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.props.isSaving ? <Loading/> : (
                            <div>
                                <Button onClick={this.save}>Lưu</Button>
                                <Button onClick={this.close}>Đóng</Button>
                            </div>
                        )
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

TaskDeadlineModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.task.taskDeadline.showModal,
        isSaving: state.task.taskDeadline.isSaving,
        task: state.task.taskDeadline.task
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDeadlineModalContainer);