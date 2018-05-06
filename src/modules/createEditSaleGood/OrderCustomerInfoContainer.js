import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormInputText from '../../components/common/FormInputText';


import * as createSaleGoodsActions from './createSaleGoodsActions';
import {ORDER_STATUS} from "../../constants/constants";
import ReactSelect from "react-select";


import FormInputSelect from '../../components/common/FormInputSelect';
import Loading from "../../components/common/Loading";

// import {Modal} from "react-bootstrap";


export function addSelect(customers) {
    return customers.map((customer) => {
        return {value: customer.id, label: customer.name + " (" + customer.phone + " - " + customer.email + " )"};
    });
}

class OrderCustomerInfoContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {isDisabled: false};
        this.updateCustomerFormData = this.updateCustomerFormData.bind(this);
        this.updateInfoOrderFormData = this.updateInfoOrderFormData.bind(this);
        this.updateFormSelect = this.updateFormSelect.bind(this);
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

    updateFormSelect(value) {
        this.setState({isDisabled: true});
        const tmp = this.props.customers.filter((customer) => {
            return customer.id === value.value;
        })[0];
        const customer = {
            ...this.props.customer,
            name: tmp.name,
            phone: tmp.phone,
            email: tmp.email,
            address: tmp.address,
            customer_id: value.value,
        };
        this.props.createSaleGoodsActions.updateCustomerFormData(customer);
    }

    openPanel() {
        this.setState({isDisabled: false});
        this.props.createSaleGoodsActions.updateCustomerFormData({});
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
                {this.props.isLoadingCustomers ? <Loading/> :
                    <div className="card">
                        <div className="card-title"/>
                        <div className="card-header card-header-icon" data-background-color="rose"><i
                            className="material-icons">announcement</i></div>
                        <div className="card-content">
                            <h4 className="card-title">Thông tin khách hàng</h4>





                            <div className="panel-group" id="accordion" role="tablist"
                                 aria-multiselectable="true">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <div className="row">
                                            < div className="col-md-9">
                                                <ReactSelect
                                                    value={this.props.customer.customer_id}
                                                    options={addSelect(this.props.customers)}
                                                    onChange={this.updateFormSelect}
                                                    placeholder="Search theo tên, số điện thoại hoặc email"
                                                />
                                            </div>
                                            <div className="col-md-2" style={{top: -5, right: 10}}>
                                                <button href={"#customer"}
                                                   className="btn btn-primary btn-round btn-xs collapsed"
                                                   role="button" data-toggle="collapse" data-parent="#accordion"
                                                   aria-expanded="false" aria-controls="collapseOne"
                                                   onClick={() => this.openPanel()}
                                                >
                                                    <strong>+</strong>
                                                </button>
                                            </div>
                                        </div>

                                        <div id="customer" className="panel-collapse collapse" role="tabpanel"
                                             aria-labelledby="headingOne" aria-expanded="false"
                                        >
                                            <FormInputText
                                                label="Tên khách hàng"
                                                name="name"
                                                value={this.props.customer.name ? this.props.customer.name : ''}
                                                updateFormData={this.updateCustomerFormData}
                                                disabled={this.state.isDisabled}
                                            />
                                            <FormInputText
                                                label="Email"
                                                name="email"
                                                value={this.props.customer.email ? this.props.customer.email : ''}
                                                updateFormData={this.updateCustomerFormData}
                                                disabled={this.state.isDisabled}

                                            />
                                            <FormInputText
                                                label="Số điện thoại"
                                                name="phone"
                                                value={this.props.customer.phone ? this.props.customer.phone : ''}
                                                updateFormData={this.updateCustomerFormData}
                                                disabled={this.state.isDisabled}

                                            />
                                            <FormInputText
                                                label="Địa chỉ"
                                                name="address"
                                                value={this.props.customer.address ? this.props.customer.address : ''}
                                                updateFormData={this.updateCustomerFormData}
                                                disabled={this.state.isDisabled}
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>





                        </div>
                    </div>
                }


                <div className="card">
                    <div className="card-title"/>
                    <div className="card-header card-header-icon" data-background-color="rose"
                         style={{zIndex: 0}}
                    >
                        <i className="material-icons">announcement</i>
                    </div>
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


                {/*<Modal*/}
                {/*show={this.props.isOpenCustomerModal}*/}
                {/*bsStyle="primary"*/}
                {/*onHide={this.closePaymentModal}*/}
                {/*>*/}
                {/*<Modal.Header/>*/}
                {/*<Modal.Body>*/}
                {/*</Modal.Body>*/}
                {/*</Modal>*/}
            </div>

        );
    }
}

OrderCustomerInfoContainer.propTypes = {
    isLoadingCustomers: PropTypes.bool,
    customer: PropTypes.object,
    customers: PropTypes.array,
    infoOrder: PropTypes.object,
    createSaleGoodsActions: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        customers: state.createSaleGoods.customers,
        customer: state.createSaleGoods.customer,
        isLoadingCustomers: state.createSaleGoods.isLoadingCustomers,
        infoOrder: state.createSaleGoods.infoOrder,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createSaleGoodsActions: bindActionCreators(createSaleGoodsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCustomerInfoContainer);


