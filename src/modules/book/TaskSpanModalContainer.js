import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import * as bookActions from "./bookActions";
import FormInputText from "../../components/common/FormInputText";
import Loading from "../../components/common/Loading";

class TaskSpanModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.save = this.save.bind(this);
        this.state = {
            error: ""
        };
    }

    close() {
        this.props.bookActions.closeTaskSpanModal();
    }

    save() {
        this.props.bookActions.saveTaskSpan(this.props.task);
    }

    updateFormData(event) {
        let name = event.target.name;
        let task = {...this.props.task};

        let value = event.target.value;

        if (!value) {
            value = 0;
        }

        value = Number(value);
        if (value !== 0 && !value) {
            this.setState({
                error: "Bạn cần nhập số"
            });
        } else {
            if (value < 0) {
                value = 0;
            }
            task[name] = value;
            this.setState({
                error: ""
            });
        }

        this.props.bookActions.updateTaskSpanForm(task);
    }

    render() {
        return (
            <Modal show={this.props.showModal} bsSize="small" onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Thời gian thực hiện công việc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{display: "flex"}}>
                        <div style={{
                            flex: 1
                        }}>
                            <FormInputText
                                updateFormData={this.updateFormData}
                                label="Số giờ thực hiện"
                                errorMessage={this.state.error}
                                value={this.props.task.span}
                                name="span"/>
                        </div>
                        <div style={{
                            flex: 0,
                            paddingTop: 35,
                            paddingLeft: 10,
                            display: "inline-block"
                        }}>
                            giờ
                        </div>
                    </div>
                    {this.state.error !== "" && <div className="text-danger">{this.state.error}</div>}
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.props.isSaving ? <Loading/> : (
                            <div>
                                <Button onClick={this.close}>Close</Button>
                                <Button
                                    className="btn btn-rose"
                                    disabled={this.state.error !== "" || !this.props.task.span}
                                    onClick={this.save}>Lưu</Button>
                            </div>
                        )
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

TaskSpanModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    task: PropTypes.object.isRequired,
    bookActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.book.taskSpan.showModal,
        isSaving: state.book.taskSpan.isSaving,
        task: state.book.taskSpan.task
    };
}

function mapDispatchToProps(dispatch) {
    return {
        bookActions: bindActionCreators(bookActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskSpanModalContainer);