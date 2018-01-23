import React from 'react';
import PropTypes from 'prop-types';
import {Button, ControlLabel, FormControl, FormGroup, Modal} from "react-bootstrap";
import {createSurvey} from './surveyApi';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as surveyActions from "./surveyActions";
import FieldGroup from "../../components/common/FieldGroup";

class AddSurveyModalContainer extends React.Component {
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
        this.props.surveyActions.toggleEditSurveyModal(false);
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
        this.setState({
            surveyName: event.target.value
        });
    }

    render() {
        const {survey} = this.props;

        return (
            <Modal show={this.props.showEditSurveyModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm khảo sát</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="fileinput fileinput-new text-center" data-provides="fileinput">
                        <div className="fileinput-new thumbnail">
                            <img src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1514889391e5VI7T5ybUMuOPN.jpg"/>
                        </div>
                        <div className="fileinput-preview fileinput-exists thumbnail"/>
                        <div>
                            <span className="btn btn-rose btn-round btn-file">
                                <span className="fileinput-new">Ảnh đại diện</span>
                                <span className="fileinput-exists">Change</span>
                                <input type="file" name="..."/>
                                <div className="ripple-container"/>
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Tên:</label>
                        <input type="text" value={survey.name} className="form-control"
                               placeholder="Tên khảo sát"
                               onChange={this.inputOnchange}/>
                    </div>

                    <FormGroup
                        controlId="target">
                        <ControlLabel>Chỉ tiêu</ControlLabel>
                        <FormControl
                            type="text"
                            value={survey.target}
                            placeholder="Chỉ tiêu"
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="description">
                        <ControlLabel>Mô tả</ControlLabel>
                        <FormControl
                            value={survey.description}
                            componentClass="textarea" placeholder="Mô tả"/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.state.isLoading ?
                            (
                                <button
                                    className="btn btn-fill btn-rose disabled">
                                    <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                </button>
                            ) :
                            (
                                <div>
                                    <button
                                        disabled={this.state.surveyName === ""}
                                        className="btn btn-rose" onClick={this.submitButtonOnClick}>Tạo
                                    </button>
                                    <Button className="btn btn-default" onClick={this.handleClose}>Đóng</Button>
                                </div>
                            )
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

AddSurveyModalContainer.propTypes = {
    showEditSurveyModal: PropTypes.bool.isRequired,
    surveyActions: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showEditSurveyModal: state.survey.showEditSurveyModal,
        survey: state.survey.survey,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        surveyActions: bindActionCreators(surveyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSurveyModalContainer);