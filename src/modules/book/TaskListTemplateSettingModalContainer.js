import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import * as bookActions from '../book/bookActions';
import Loading from "../../components/common/Loading";
import CheckBoxMaterial from "../../components/common/CheckBoxMaterial";

class TaskListTemplateSettingModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.save = this.save.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.showModal && nextProps.showModal)
            this.props.bookActions.loadTaskListTemplateSetting(this.props.taskListTemplate.id);
    }

    componentDidUpdate() {
        $.material.init();
    }

    handleCheckBoxChange(event, board) {
        this.props.bookActions.handleChangeBoxTaskListTemplateSetting({
            ...board,
            checked: event.target.checked
        });
    }

    close() {
        this.props.bookActions.showTaskListTemplateSettingModal(false);
    }

    save() {
        this.props.bookActions.saveTaskListTemplateSetting(this.props.taskListTemplate.id, this.props.boards);
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Cài đặt quy trình</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isLoading ? (
                            <Loading/>
                        ) : (
                            <ListGroup>
                                {
                                    this.props.boards && this.props.boards.map((board) => (
                                        <ListGroupItem key={board.id}>
                                            <CheckBoxMaterial
                                                label={board.title}
                                                onChange={(event) => this.handleCheckBoxChange(event, board)}
                                                name="cb"
                                                checked={board.checked}/>
                                        </ListGroupItem>
                                    ))
                                }

                            </ListGroup>
                        )
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-rose" onClick={this.save}>Lưu</Button>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

TaskListTemplateSettingModalContainer.propTypes = {
    boards: PropTypes.array.isRequired,
    showModal: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    bookActions: PropTypes.object.isRequired,
    taskListTemplate: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        boards: state.book.taskListTemplateModal.boards,
        showModal: state.book.taskListTemplateModal.showModal,
        taskListTemplate: state.book.taskListDetail.taskList,
        isLoading: state.book.taskListTemplateModal.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        bookActions: bindActionCreators(bookActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListTemplateSettingModalContainer);