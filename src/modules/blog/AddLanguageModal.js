import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from '../../components/common/FormInputText';

class AddLanguageModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <form id="form-language">
                <FormInputText
                    label="Ngôn ngữ"
                    required
                    name="name"
                    updateFormData={this.props.updateFormLanguage}
                    value={this.props.language.name}
                />
                <FormInputText
                    label="Encode"
                    required
                    name="encoding"
                    updateFormData={this.props.updateFormLanguage}
                    value={this.props.language.encoding}
                />
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger btn-simple"
                            onClick={() => {
                                this.props.closeAddLanguageModal();
                            }}
                    >Huỷ
                    </button>
                    {this.props.isCreatingLanguage ?
                        (
                            <button type="button" className="btn btn-rose disabled">
                                <i className="fa fa-spinner fa-spin "/>Đang thêm
                            </button>
                        )
                        :
                        (
                            <button type="button" className="btn btn-rose"
                                    onClick={(e) => {
                                        this.props.createLanguage(this.props.closeAddLanguageModal);
                                        e.preventDefault();
                                    }}>Thêm
                            </button>
                        )
                    }
                </div>
            </form>
        );
    }
}

AddLanguageModal.propTypes = {
    language: PropTypes.object.isRequired,
    updateFormLanguage: PropTypes.func.isRequired,
    createLanguage: PropTypes.func.isRequired,
    isCreatingLanguage: PropTypes.bool.isRequired,
    closeAddLanguageModal: PropTypes.func.isRequired,
};


export default AddLanguageModal;