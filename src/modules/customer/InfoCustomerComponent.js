import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from '../../components/common/FormInputText';
import FormInputSelect from '../../components/common/FormInputSelect';
import FormInputDate from '../../components/common/FormInputDate';
import { GENDER } from '../../constants/constants';






class InfoCustomerComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>

                    <h4><strong>Thông tin khách hàng</strong></h4>
                    {/*<FormInputText label="Mã đơn hàng" name="code"*/}
                    {/*value={this.props.importOrder.code} disabled/>*/}
                    <FormInputText
                        label="Họ và tên"
                        name="name"
                        updateFormData={this.props.updateFormData}
                        required={true}
                        type="text"
                        value={this.props.customer.name}
                    />
                    <FormInputText
                        label="Địa chỉ email"
                        name="email"
                        required={true}
                        type="email"
                        updateFormData={this.props.updateFormData}
                        value={this.props.customer.email}
                        placeholder = "Nhập email (ví dụ : hung@gmail.com)"
                    />

                    <FormInputText
                        label="Địa chỉ"
                        name="address"
                        type="text"
                        updateFormData={this.props.updateFormData}
                        value={this.props.customer.address}
                        required={true}
                    />
                    <FormInputText
                        label="Số điện thoại"
                        name="phone"
                        type="tel"
                        updateFormData={this.props.updateFormData}
                        value={this.props.customer.phone}
                        required={true}
                        placeholder = "+84..."
                    />
                    <FormInputSelect
                        label="Giới tính"
                        name="gender"
                        data={GENDER}
                        value={this.props.customer.gender || ""}
                        required={true}
                        updateFormData={this.props.updateFormData}
                    />

                    <FormInputDate
                        label="Sinh nhật"
                        name="birthday"
                        id="form-date-of-birth"
                        value={this.props.customer.birthday}
                        required={true}
                        placeholder = "dd/mm/yyyy"
                        updateFormData={this.props.updateFormData}
                    />
                </div>








                <div>
                    <h4>
                        <strong>Thông tin thanh toán </strong>
                    </h4>
                    <div className="row">
                        <div className="col-md-6">
                            Nợ
                        </div>
                        <div className="col-md-6">
                            {this.props.customer.debt}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            Trả
                        </div>
                        <div className="col-md-6">
                            {this.props.customer.total_paid_money}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <b>Tổng cộng</b>
                        </div>
                        <div className="col-md-6">
                            <b>{this.props.customer.total_money}</b>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

InfoCustomerComponent.propTypes = {
    customer : PropTypes.object,
    updateFormData : PropTypes.func,
};


export default InfoCustomerComponent;