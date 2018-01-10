import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import {createSurvey} from './surveyApi';

class AddSurveyModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            surveyName: '',
            isLoading: false,
        };

        this.handleClose = this.handleClose.bind(this);
        this.inputOnchange = this.inputOnchange.bind(this);
        this.submitButtonOnClick = this.submitButtonOnClick.bind(this);
    }

    handleClose() {
        this.props.closeModal();
    }

    submitButtonOnClick() {
        this.setState({
            isLoading: true,
        });
        createSurvey(this.state.surveyName).then(() => {
            this.setState({
                isLoading: false,
            });
            this.handleClose();
        });
    }

    inputOnchange(event) {
        console.log(this.state.surveyName);
        this.setState({
            surveyName: event.target.value
        });
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm survey</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Tên:</label>
                        <input type="text" value={this.state.surveyName} className="form-control"
                               placeholder="hell yeah"
                               onChange={this.inputOnchange}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.state.isLoading ?
                        (
                            <button
                                className="btn btn-fill btn-rose disabled"
                            >
                                <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                            </button>
                        ) :
                        (
                            <div>
                                <button className="btn btn-rose" onClick={this.submitButtonOnClick}>Tạo</button>
                                <Button onClick={this.handleClose}>Đóng</Button>
                            </div>
                        )
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

AddSurveyModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default AddSurveyModal;