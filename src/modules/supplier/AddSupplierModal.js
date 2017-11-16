import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from '../../components/common/FormInputText';

class AddSupplierModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        let {name, email, phone} = this.props.supplier;
        return (
            <div>
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">contacts</i>
                </div>
                <div className="card-content">
                    <h4 className="card-title">
                        Thông tin nhà cung cấp
                    </h4>

                    <FormInputText
                        label="Họ và tên"
                        name="name"
                        updateFormData={this.props.updateFormData}
                        required={true}
                        type="text"
                        value={name}
                    />
                    <FormInputText
                        label="Địa chỉ email"
                        name="email"
                        updateFormData={this.props.updateFormData}
                        required={true}
                        type="email"
                        value={email}
                    />
                    
                    <FormInputText
                        label="Số điện thoại"
                        name="phone"
                        updateFormData={this.props.updateFormData}
                        type="tel"
                        value={phone}
                        required={true}
                    />
                    
                    

                </div>
            </div>

        );
    }
}

AddSupplierModal.propTypes = {
    isShowModal: PropTypes.bool,
    updateFormData: PropTypes.func,
    supplier: PropTypes.object,
};



export default AddSupplierModal;
