import React from 'react';
import PropTypes from 'prop-types';
import {Button, FormControl, FormGroup, Modal} from "react-bootstrap";
import {saveTaskTitle} from './taskApi';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as taskActions from "./taskActions";
import Loading from "../../components/common/Loading";

class EditTaskNameContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            task: {},
            isSaving: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.submit = this.submit.bind(this);
    }


    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({
            task: this.props.task,
            showModal: true
        });
    }

    handleOnChange(event) {
        let task = {...this.state.task};
        task[event.target.name] = event.target.value;
        this.setState({task});
    }

    submit() {
        this.setState({
            isSaving: true
        });
        saveTaskTitle(this.props.task.id, this.state.task.title)
            .then((res) => {
                this.props.taskActions.saveTaskTitle(res.data.data.task);
                this.setState({
                    isSaving: false,
                    showModal: false
                });
            });
    }

    render() {
        return (
            <li className="more-dropdown-item">
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sửa nội dung</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup style={{marginTop: 0}} controlId="formControlsTextarea">
                            <FormControl
                                style={{minHeight: 150}}
                                name="title"
                                onChange={this.handleOnChange}
                                value={this.state.task.title}
                                componentClass="textarea"
                                placeholder="Nhập nội dung"/>
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            this.state.isSaving ? <Loading/> : (
                                <div>
                                    <Button onClick={this.submit} className="btn btn-rose">Lưu</Button>
                                    <Button onClick={this.close}>Đóng</Button>
                                </div>
                            )
                        }

                    </Modal.Footer>
                </Modal>
                <a onClick={this.open}>
                    <i className="material-icons">edit</i>
                    Sửa nội dung
                </a>
            </li>
        );
    }
}

EditTaskNameContainer.propTypes = {
    task: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired
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
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskNameContainer);