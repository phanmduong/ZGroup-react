import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from '../../components/common/FormInputText';
import FormInputSelect from '../../components/common/FormInputSelect';
import FormInputDate from '../../components/common/FormInputDate';
import {GENDER} from '../../constants/constants';


class AddCustomerModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        let {name, email, address, phone, birthday, gender} = this.props.customer;
        return (
            <div>
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">contacts</i>
                </div>
                <div className="card-content">
                    <h4 className="card-title">
                        Thông tin khách hàng
                    </h4>

                    <div className="row">
                        <div className="col-md-6">
                            <FormInputText
                                label="Họ và tên"
                                name="name"
                                updateFormData={this.props.updateFormData}
                                required={true}
                                type="text"
                                value={name}
                            />

                        </div>
                        <div className="col-md-6">
                            <FormInputText
                                label="Địa chỉ email"
                                name="email"
                                updateFormData={this.props.updateFormData}
                                required={true}
                                type="email"
                                value={email}
                                placeholder="Nhập email "
                            />
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            <FormInputSelect
                                label="Giới tính"
                                updateFormData={this.props.updateFormData}
                                name="gender"
                                data={GENDER}
                                value={gender}
                                required={true}
                            />

                        </div>
                        <div className="col-md-6">
                            <FormInputDate
                                label="Sinh nhật"
                                name="birthday"
                                updateFormData={this.props.updateFormData}
                                id="form-date-of-birth"
                                value={birthday}
                                required={true}
                                placeholder="dd/mm/yyyy"
                            />

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <FormInputText
                                label="Số điện thoại"
                                name="phone"
                                updateFormData={this.props.updateFormData}
                                type="tel"
                                value={phone}
                                required={true}
                                placeholder="+84..."
                            />
                        </div>
                        <div className="col-md-9">
                            <FormInputText
                                label="Địa chỉ"
                                name="address"
                                updateFormData={this.props.updateFormData}
                                type="text"
                                value={address}
                                required={true}
                            />
                        </div>
                    </div>


                </div>
            </div>

        );
    }
}

AddCustomerModal.propTypes = {
    isShowModal: PropTypes.bool,
    updateFormData: PropTypes.func,
    customer: PropTypes.object,
};


export default AddCustomerModal;
