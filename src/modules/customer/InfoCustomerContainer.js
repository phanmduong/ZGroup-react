import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as customerActions from './customerActions';
import Loading from "../../components/common/Loading";
import FormInputText from '../../components/common/FormInputText';
import FormInputSelect from '../../components/common/FormInputSelect';
import FormInputDate from '../../components/common/FormInputDate';
import { GENDER } from '../../constants/constants';
import * as helper from '../../helpers/helper';




class InfoCustomerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
    }

    componentWillMount() {
    }
    updateFormData(event) {
        const field = event.target.name;
        let customer = {...this.props.customer};
        customer[field] = event.target.value;
        this.props.customerActions.updateAddCustomerFormData(customer);
    }

    editCustomer(e) {
        if ($('#form-edit-customer').valid()) {
            if (this.props.customer.birthday === null || this.props.customer.birthday === undefined || this.props.customer.birthday === '') {
                helper.showTypeNotification("Vui lòng chọn sinh nhật", 'warning');
                return;
            }
            if (this.props.customer.gender === null || this.props.customer.gender === undefined || this.props.customer.gender === '') {
                helper.showTypeNotification("Vui lòng chọn giới tính", 'warning');
            }
            else {
                    this.props.customerActions.editCustomer(this.props.customer);
            }
        }
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Chi tiết khách hàng</h4>
                                {this.props.isLoading ? <Loading/> :

                                    <div></div>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <form id="form-edit-customer" >

                            <div className="card-header card-header-icon" data-background-color="rose"><i
                                className="material-icons">announcement</i></div>
                            <div className="card-content">
                                <h4 className="card-title">Thông tin</h4>
                                {this.props.isLoading ? <Loading/> :
                                    <div>
                                        <div>
                                            <h4><strong>Thông tin khách hàng</strong></h4>
                                            {/*<FormInputText label="Mã đơn hàng" name="code"*/}
                                                           {/*value={this.props.importOrder.code} disabled/>*/}
                                            <FormInputText
                                                label="Họ và tên"
                                                name="name"
                                                updateFormData={this.updateFormData}
                                                required={true}
                                                type="text"
                                                value={this.props.customer.name}
                                            />
                                            <FormInputText
                                                label="Địa chỉ email"
                                                name="email"
                                                required={true}
                                                type="email"
                                                updateFormData={this.updateFormData}
                                                value={this.props.customer.email}
                                                placeholder = "Nhập email (ví dụ : hung@gmail.com)"
                                            />

                                            <FormInputText
                                                label="Địa chỉ"
                                                name="address"
                                                type="text"
                                                updateFormData={this.updateFormData}
                                                value={this.props.customer.address}
                                                required={true}
                                            />
                                            <FormInputText
                                                label="Số điện thoại"
                                                name="phone"
                                                type="tel"
                                                updateFormData={this.updateFormData}
                                                value={this.props.customer.phone}
                                                required={true}
                                                placeholder = "+84..."
                                            />
                                            <FormInputSelect
                                                label="Giới tính"
                                                name="gender"
                                                data={GENDER}
                                                value={this.props.customer.gender}
                                                required={true}
                                                updateFormData={this.updateFormData}
                                            />

                                            <FormInputDate
                                                label="Sinh nhật"
                                                name="birthday"
                                                id="form-date-of-birth"
                                                value={this.props.customer.birthday}
                                                required={true}
                                                placeholder = "dd/mm/yyyy"
                                                updateFormData={this.updateFormData}
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
                                }
                            </div>
                            {!this.props.isLoading &&
                            <div className="card-footer">
                                <div className="float-right" style={{marginBottom: '20px'}}>
                                    <button className="btn btn-sm btn-success"
                                    onClick={(e) => {this.editCustomer(e);}}
                                    >
                                        <i className="material-icons">save</i> Lưu
                                    </button>
                                    <button className="btn btn-sm btn-danger">
                                        <i className="material-icons">cancel</i> Huỷ
                                    </button>
                                </div>
                            </div>
                            }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

InfoCustomerContainer.propTypes = {
    customerActions: PropTypes.object,
    isLoading: PropTypes.bool,
    isSaving: PropTypes.bool,
    customer: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoading: state.customers.isLoading,
        customer: state.customers.modal.customer,
        isSaving : state.customers.modal.isSaving,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        customerActions: bindActionCreators(customerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoCustomerContainer);
