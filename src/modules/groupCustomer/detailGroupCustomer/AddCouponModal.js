import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from '../../../components/common/FormInputText';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as groupCustomerActions from '../groupCustomerActions';
import FormInputDate from '../../../components/common/FormInputDate';
import FormInputSelect from '../../../components/common/FormInputSelect';
import CheckBoxMaterial from '../../../components/common/CheckBoxMaterial';


class AddCouponModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            unlimited: (this.props.coupon.quantity === -1)
        };
        this.changeQuantity = this.changeQuantity.bind(this);
        this.generateCode = this.generateCode.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.changeQuantityInProps = this.changeQuantityInProps.bind(this);
    }


    componentWillMount() {
        const coupon = {
            name: '',
            description: '',
            discount_type: '',
            discount_value: '',
            type: '',
            used_for: '',
            start_time: '',
            end_time: '',
            customer_group_id: '',
            quantity: '',
            shared: '',
        };
        this.props.groupCustomerActions.updateDiscountFormData(coupon);
    }

    componentDidMount() {
        const coupon = {
            name: '',
            description: '',
            discount_type: '',
            discount_value: '',
            type: '',
            used_for: '',
            start_time: '',
            end_time: '',
            customer_group_id: '',
            quantity: '',
            shared: '',
        };
        this.props.groupCustomerActions.updateDiscountFormData(coupon);
    }

    changeQuantity() {
        this.setState({unlimited: !this.state.unlimited}); // Logic có vấn đề do các hàm thực hiện cùng nhau
        if (this.state.unlimited === false) {
            this.changeQuantityInProps(-1);
        }
        else {
            this.changeQuantityInProps(0);
        }
    }

    updateFormData(event) {
        const field = event.target.name;
        let coupon = {...this.props.coupon};
        coupon[field] = event.target.value;
        this.props.groupCustomerActions.updateDiscountFormData(coupon);
    }

    changeQuantityInProps(i) {
        const field = 'quantity';
        let coupon = {...this.props.coupon};
        coupon[field] = i;
        this.props.groupCustomerActions.updateDiscountFormData(coupon);
    }

    generateCode() {
        this.props.groupCustomerActions.generateCode();
    }

    render() {
        let DISCOUNTYPE = [
            {
                name: '',
                id: '',
            },
            {
                name: 'Phần trăm',
                id: 'percentage',
            },
            {
                name: 'VNĐ',
                id: 'fix',
            },

        ];
        let SHARED = [
            {
                name: '',
                id: '',
            },
            {
                name: 'Có thể dùng chung',
                id: 1,
            },
            {
                name: 'Không dùng chung',
                id: 0,
            },

        ];
        const {name, description, discount_type, discount_value, start_time, end_time, quantity, shared} = this.props.coupon;
        return (
            <div>
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">card_giftcard</i>
                </div>
                <div className="card-content">
                    <h4 className="card-title">
                        Chương trình khuyến mãi
                    </h4>


                    <div className="row">
                        <div className="col-md-6">
                            <FormInputText
                                placeholder="Mã khuyến mãi"
                                name="name"
                                updateFormData={this.updateFormData}
                                type="text"
                                value={name}
                            />
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-primary btn-xs"
                                    onClick={(e) => {
                                        this.generateCode();
                                        e.preventDefault();
                                    }}
                            >Tự động tạo mã
                            </button>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-8">

                            <FormInputText
                                label="Mô tả"
                                name="description"
                                updateFormData={this.updateFormData}
                                type="text"
                                value={description}
                            />
                        </div>
                        <div className="col-md-4" style={{marginTop : -24}}>
                            <FormInputSelect
                                label="Cách dùng"
                                data={SHARED}
                                required={true}
                                updateFormData={this.updateFormData}
                                name="shared"
                                value={shared}
                            />
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            <FormInputSelect
                                label="Loại khuyến mãi"
                                data={DISCOUNTYPE}
                                required={true}
                                updateFormData={this.updateFormData}
                                name="discount_type"
                                value={discount_type}
                            />
                        </div>
                        <div className="col-md-6">

                            {discount_type === '' ? null :
                                <div>
                                    <div style={{marginTop: 22}} className="col-md-6">
                                        <FormInputText
                                            label={discount_type === 'percentage' ? 'Phần trăm' : 'Số tiền'}
                                            name="discount_value"
                                            type="tel"
                                            updateFormData={this.updateFormData}
                                            value={discount_value}
                                            required={true}
                                        />
                                    </div>
                                    <div className="col-md-2 input-group-addon border-color-input-group"
                                         data-bind="text: $parent.Culture"
                                         style={{
                                             width: "12px",
                                             marginTop: "49px",
                                             marginLeft: "-16px",
                                         }}
                                    >{discount_type === 'percentage' ? '%' : '₫'}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            {quantity !== -1 ?
                                <FormInputText
                                    label="Số lần sử dụng khuyến mãi"
                                    name="quantity"
                                    type="number"
                                    updateFormData={this.updateFormData}
                                    value={quantity}
                                    required={true}
                                /> : null
                            }
                        </div>
                        <div className="col-md-6" style={{marginTop: 25}}>
                            <CheckBoxMaterial
                                label="Sử dụng vô số lần"
                                name="quantity"
                                checked={this.state.unlimited}
                                onChange={() => {
                                    return this.changeQuantity();
                                }}
                            />
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <FormInputDate
                                    label="Bắt đầu khuyễn mãi"
                                    name="start_time"
                                    value={start_time}
                                    placeholder="dd/mm/yyyy"
                                    updateFormData={this.updateFormData}
                                    id="form-start-time"
                                    required={true}
                                    maxDate={this.props.coupon.end_time !== '' ? this.props.coupon.end_time : ''}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <FormInputDate
                                    label="Hết hạn khuyến mãi"
                                    name="end_time"
                                    value={end_time}
                                    placeholder="dd/mm/yyyy"
                                    updateFormData={this.updateFormData}
                                    id="form-end-time"
                                    required={true}
                                    minDate={this.props.coupon.start_time !== '' ? this.props.coupon.start_time : ''}
                                />
                            </div>
                        </div>
                    </div>


                </div>
            </div>


        );
    }
}

AddCouponModal.propTypes = {
    isLoadingModal: PropTypes.bool,
    groupCustomerActions: PropTypes.object,
    coupon: PropTypes.object,
    isEdit: PropTypes.bool,
    params: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoadingOverlay: state.groupCustomers.isLoadingOverlay,
        isLoadingModal: state.groupCustomers.isLoadingModal,
        coupon: state.groupCustomers.coupon,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        groupCustomerActions: bindActionCreators(groupCustomerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCouponModal);