/**
 * Created by Kiyoshitaro on 15/04/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';

import * as blogActions from "../actions/blogActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FormInputText from '../../../components/common/FormInputText';
import { Modal } from "react-bootstrap";



class AddLanguageModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.closeAddLanguageModal = this.closeAddLanguageModal.bind(this);
        this.createLanguage = this.createLanguage.bind(this);
        this.updateFormLanguage = this.updateFormLanguage.bind(this);
    }

    closeAddLanguageModal() {
        this.props.blogActions.closeAddLanguageModal();
    }
    updateFormLanguage(event) {
        const field = event.target.name;
        let data = { ...this.props.language };
        data[field] = event.target.value;
        this.props.blogActions.updateFormLanguage(data);
    }
    createLanguage(e) {
        if ($("#form-language").valid()) {
            this.props.blogActions.createLanguage(this.props.language, this.closeAddLanguageModal);
        }
        e.preventDefault();
    }
    render() {
        return (
            <Modal
                show={this.props.isOpenLanguageModal}
                bsSize="sm"
                bsStyle="primary"
                onHide={this.closeAddLanguageModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4 className="card-title">Thêm ngôn ngữ</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="form-language">
                        <FormInputText
                            label="Ngôn ngữ"
                            required
                            name="name"
                            updateFormData={this.updateFormLanguage}
                            value={this.props.language && this.props.language.name}
                        />
                        <FormInputText
                            label="Encode"
                            required
                            name="encoding"
                            updateFormData={this.updateFormLanguage}
                            value={this.props.language && this.props.language.encoding}
                        />
                        <div className="modal-footer">
                            {this.props.isCreatingLanguage ?
                                (
                                    <button type="button" className="btn btn-rose disabled">
                                        <i className="fa fa-spinner fa-spin " />Đang thêm
                                    </button>
                                )
                                :
                                (
                                    <button type="button" className="btn btn-rose"
                                        onClick={
                                            (e) => {
                                                this.createLanguage(e);
                                            }}
                                    >Thêm</button>
                                )
                            }
                            <button type="button"
                                className="btn"
                                onClick={
                                    () => {
                                        this.closeAddLanguageModal();
                                    }}
                            >Huỷ</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

AddLanguageModal.propTypes = {
    language: PropTypes.object.isRequired,
    isCreatingLanguage: PropTypes.bool.isRequired,
    blogActions: PropTypes.object.isRequired,
    isOpenLanguageModal: PropTypes.bool.isRequired,

};
function mapStateToProps(state) {
    return {
        isOpenLanguageModal: state.blog.isOpenLanguageModal,
        language: state.blog.language,
        isCreatingLanguage: state.blog.isCreatingLanguage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogActions: bindActionCreators(blogActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLanguageModal);


