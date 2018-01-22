import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormInputText from '../../components/common/FormInputText';


import * as createSaleGoodsActions from './createSaleGoodsActions';
import {ORDER_STATUS} from "../../constants/constants";
import ReactSelect from "react-select";


import FormInputSelect from '../../components/common/FormInputSelect';


class OrderCustomerInfoContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateCustomerFormData = this.updateCustomerFormData.bind(this);
        this.updateInfoOrderFormData = this.updateInfoOrderFormData.bind(this);
    }

    updateCustomerFormData(e) {
        const field = e.target.name;
        const customer = {...this.props.customer};
        customer[field] = e.target.value;
        this.props.createSaleGoodsActions.updateCustomerFormData(customer);
    }

    updateInfoOrderFormData(e) {
        const field = e.target.name;
        const infoOrder = {...this.props.infoOrder};
        infoOrder[field] = e.target.value;
        this.props.createSaleGoodsActions.updateInfoOrderFormData(infoOrder);
    }

    render() {
        const PAYMENT = [
            {
                name: "Tiền mặt",
                id: "cash"
            },
            {
                name: "Chuyển khoản",
                id: "transfer"
            },
            {
                name: "Thẻ",
                id: "credit"
            }
        ];
        return (
            <div>
                <div className="card">
                    <div className="card-title"/>
                    <div className="card-header card-header-icon" data-background-color="rose"><i
                        className="material-icons">announcement</i></div>
                    <div className="card-content">
                        <h4 className="card-title">Thông tin khách hàng</h4>
                        <FormInputText
                            label="Tên khách hàng"
                            name="name"
                            value={this.props.customer.name ? this.props.customer.name : ''}
                            updateFormData={this.updateCustomerFormData}
                        />
                        <FormInputText
                            label="Email"
                            name="email"
                            value={this.props.customer.email ? this.props.customer.email : ''}
                            updateFormData={this.updateCustomerFormData}
                        />
                        <FormInputText
                            label="Số điện thoại"
                            name="phone"
                            value={this.props.customer.phone ? this.props.customer.phone : ''}
                            updateFormData={this.updateCustomerFormData}
                        />
                        <FormInputText
                            label="Địa chỉ"
                            name="address"
                            value={this.props.customer.address ? this.props.customer.address : ''}
                            updateFormData={this.updateCustomerFormData}
                        />
                    </div>
                </div>


                <div className="card">
                    <div className="card-title"/>
                    <div className="card-header card-header-icon" data-background-color="rose"><i
                        className="material-icons">announcement</i></div>
                    <div className="card-content">
                        <h4 className="card-title">Thông tin đơn hàng</h4>
                        <div className="form-group">
                            <label className="control-label">Phương thức</label>
                            <FormInputSelect
                                data={PAYMENT}
                                required={true}
                                updateFormData={this.updateInfoOrderFormData}
                                name="payment"
                                value={this.props.infoOrder.payment}
                                placeholder="Chọn phương thức"
                            />
                            <label className="control-label">Trạng thái</label>
                            <ReactSelect
                                name="form-field-name"
                                options={ORDER_STATUS}
                                value="completed_order"
                                placeholder="Chọn trạng thái"
                                onChange={this.updateInfoOrderFormData}
                                disabled={true}
                            />
                            <label className="control-label">Ghi chú</label>
                            <textarea
                                label="Ghi chú"
                                className="form-control"
                                name="note"
                                rows="5"
                                value={this.props.infoOrder.note ? this.props.infoOrder.note : ''}
                                onChange={(e) => this.updateInfoOrderFormData(e)}
                            />
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

OrderCustomerInfoContainer.propTypes = {
    customer: PropTypes.object,
    infoOrder: PropTypes.object,
    createSaleGoodsActions: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        customer: state.createSaleGoods.customer,
        infoOrder: state.createSaleGoods.infoOrder,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createSaleGoodsActions: bindActionCreators(createSaleGoodsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCustomerInfoContainer);


