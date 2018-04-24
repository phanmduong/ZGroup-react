import React from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormGroup, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Switch from 'react-bootstrap-switch';
import {saveSurvey, toggleEditSurveyModal, updateSurveyFormData} from "./surveyActions";
import FormInputText from "../../components/common/FormInputText";
import * as helper from '../../helpers/helper';

class AddSurveyModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            surveyName: '',
            isLoading: false,
        };

        this.handleClose = this.handleClose.bind(this);
        this.inputOnchange = this.inputOnchange.bind(this);
        this.changeSwitch = this.changeSwitch.bind(this);
        this.submitButtonOnClick = this.submitButtonOnClick.bind(this);
    }

    handleClose() {
        this.props.surveyActions.toggleEditSurveyModal(false);
    }

    submitButtonOnClick() {
        let file = null;
        if (this.refs.file.files.length > 0) {
            file = this.refs.file.files[0];
        }
        const survey = {...this.props.survey};
        if (helper.isEmptyInput(survey.name) || helper.isEmptyInput(survey.description)) {
            if (helper.isEmptyInput(survey.name)) {helper.showErrorNotification("Bạn cần nhập Tên khảo sát");}
            if (helper.isEmptyInput(survey.description)) {helper.showErrorNotification("Bạn cần nhập Mô tả");}
        } else {
             if (survey.id) {
                this.props.surveyActions.saveSurvey(survey,file);
            } else this.props.surveyActions.saveSurvey(this.props.survey,file);
        }    


    }

    changeSwitch() {
        const survey = {...this.props.survey};
        if (Number(survey.active) === 0 || !survey.active) {
            survey.active = 1;
        } else {
            survey.active = 0;
        }

        this.props.surveyActions.updateSurveyFormData(survey);
    }

    inputOnchange(event) {
        const survey = {...this.props.survey};
        const field = event.target.name;
        survey[field] = event.target.value;
        this.props.surveyActions.updateSurveyFormData(survey);
    }

    render() {
        const {survey} = this.props;

        return (
            <Modal show={this.props.showEditSurveyModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{survey.id ? "Sửa khảo sát" : "Thêm khảo sát"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="fileinput fileinput-new text-center" data-provides="fileinput">
                            <div className="btn-file" style={{overflow:"visible"}}>
                                <div className="fileinput-new">
                                    <div className="fileinput-new thumbnail">
                                        <img
                                            src={survey.image_url ||
                                            "http://d1j8r0kxyu9tj8.cloudfront.net/images/1516675031ayKt10MXsow6QAh.jpg"}/>
                                    </div>
                                </div>
                                <div className="fileinput-preview fileinput-exists thumbnail"/>
                                <input type="file"
                                       ref="file"
                                       name="image"/>
                            </div>
                    </div>
                    <form role="form"  id="form-add-room">
                        <FormInputText
                            label="Tên khảo sát"
                            name="name"
                            updateFormData={this.inputOnchange}
                            value={survey.name || ""}
                            required
                        />
                        <FormInputText
                            label="Chỉ tiêu"
                            name="target"
                            type="number"
                            updateFormData={this.inputOnchange}
                            value={survey.target || ""}
                        />
                        <div className="form-group">
                            <label className="label-control">Mô tả&#160;<star style={{ color: "red" }}>*</star></label>
                            <textarea type="text" className="form-control"
                                      value={survey.description || ""}
                                      name="description"
                                      onChange={this.inputOnchange}/>
                            <span className="material-input"/>
                        </div>
                    <FormGroup controlId="description">
                        <ControlLabel>Hiện khảo sát cho học viên:</ControlLabel>
                        <div>
                            <Switch
                                onChange={this.changeSwitch}
                                bsSize="mini"
                                onText="Hiện" offText="Ẩn"
                                value={Number(survey.active) === 1}
                            />
                        </div>
                    </FormGroup>
                </form>    
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
                                        className="btn btn-rose" onClick={this.submitButtonOnClick}>Lưu
                                    </button>
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
        surveyActions: bindActionCreators({
            saveSurvey,
            toggleEditSurveyModal,
            updateSurveyFormData
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSurveyModalContainer);