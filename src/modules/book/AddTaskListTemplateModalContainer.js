import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Modal} from "react-bootstrap";
import PropTypes from 'prop-types';
import * as bookActions from './bookActions';
import Loading from "../../components/common/Loading";
import FormInputText from "../../components/common/FormInputText";


class AddTaskListTemplateModalContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    close() {
        this.props.bookActions.closeAddTaskListTemplateModal();
    }

    save() {
        this.props.bookActions.storeTaskListTemplates(this.props.taskList);
    }

    updateFormData(event) {
        const name = event.target.name;
        let taskList = {...this.props.taskList};
        taskList[name] = event.target.value;
        this.props.bookActions.updateFormData(taskList);
    }

    render() {
        const {taskList, isSaving, showModal} = this.props;
        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title><strong>Quy trình</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInputText
                        value={taskList.title}
                        label="Tên quy trình"
                        updateFormData={this.updateFormData}
                        name="title"/>
                </Modal.Body>
                <Modal.Footer>
                    {
                        isSaving ? <Loading/> : (
                            <div>
                                <Button className="btn btn-rose" onClick={this.save}>Lưu</Button>
                                <Button onClick={this.close}>Đóng</Button>
                            </div>
                        )
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

AddTaskListTemplateModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    taskList: PropTypes.object.isRequired,
    bookActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.book.addTaskList.showModal,
        isSaving: state.book.addTaskList.isSaving,
        taskList: state.book.addTaskList.taskList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        bookActions: bindActionCreators(bookActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskListTemplateModalContainer);