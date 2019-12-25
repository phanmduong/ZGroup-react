import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as groupCustomerActions from '../groupCustomerActions';
import * as helper from '../../../helpers/helper';
import {Modal} from 'react-bootstrap';
import ListChildCoupon from './ListChildCoupon';
import AddCouponModal from './AddCouponModal';
import AddCustomerModal from './AddCustomerModal';
import GeneralInfoGroup from "./GeneralInfoGroup";
import ListChildCustomer from "./ListChildCustomer";
import {browserHistory} from 'react-router';


class DetailGroupCustomerContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpenDiscountModal: false,
            isOpenAddCustomerModal: false,
        };
        this.loadCustomersInOverlay = this.loadCustomersInOverlay.bind(this);
        this.editFormData = this.editFormData.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.assignCustomer = this.assignCustomer.bind(this);
        this.removeCustomer = this.removeCustomer.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.activeModal = this.activeModal.bind(this);
        this.openDiscountModal = this.openDiscountModal.bind(this);
        this.closeDiscountModal = this.closeDiscountModal.bind(this);
        this.openAddCustomerModal = this.openAddCustomerModal.bind(this);
        this.closeAddCustomerModal = this.closeAddCustomerModal.bind(this);
        this.addCoupon = this.addCoupon.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
    }


    loadCustomersInOverlay(page, limit, query, stringId) {
        this.props.groupCustomerActions.loadCustomersInOverlay(page, limit, query, stringId);
    }

    editFormData(event) {
        const field = event.target.name;
        let groupCustomerForm = {...this.props.groupCustomerForm};
        groupCustomerForm[field] = event.target.value;
        this.props.groupCustomerActions.updateGroupCustomerFormData(groupCustomerForm);
    }

    openDiscountModal() {
        this.setState({isOpenDiscountModal: true});
    }

    closeDiscountModal() {
        this.setState({isOpenDiscountModal: false});
    }

    openAddCustomerModal() {
        this.setState({isOpenAddCustomerModal: true});
    }

    closeAddCustomerModal() {
        this.setState({isOpenAddCustomerModal: false});
    }

    changeColor(color) {
        let groupCustomerForm = {...this.props.groupCustomerForm};
        groupCustomerForm.color = color.hex;
        this.updateFormData(groupCustomerForm);
    }

    updateFormData(groupCustomerForm) {
        this.props.groupCustomerActions.updateGroupCustomerFormData(groupCustomerForm);
    }                   // tách ra để dùng cho overlays

    assignCustomer(id) {
        this.props.groupCustomerActions.assignGroupCustomerFormData(id);
    }

    removeCustomer(customer) {
        this.props.groupCustomerActions.removeGroupCustomerFormData(customer);
    }

    addCustomer() {
        this.props.groupCustomerActions.addCustomer(this.props.groupCustomerForm, this.props.params.groupId, this.closeAddCustomerModal);
    }

    activeModal(e) {
        if ($('#form-add-group-customer').valid()) {
            if (this.props.groupCustomerForm.name === null || this.props.groupCustomerForm.name === undefined || this.props.groupCustomerForm.name === '') {
                helper.showTypeNotification("Vui lòng nhập tên nhóm khách hàng", 'warning');
            }
            this.props.groupCustomerActions.editGroupCustomer(this.props.groupCustomerForm, this.props.params.groupId);
        }
        e.preventDefault();
    }

    addCoupon() {
        if ($('#form-add-coupon-in-group-customer').valid()) {
            if (this.props.coupon.name === null || this.props.coupon.name === undefined || this.props.coupon.name === '') {
                helper.showTypeNotification("Vui lòng nhập mã khuyến mãi", 'warning');
                return;
            }
            if (this.props.coupon.start_time === null || this.props.coupon.start_time === undefined || this.props.coupon.start_time === '') {
                helper.showTypeNotification("Vui lòng chọn ngày bắt đầu", 'warning');
                return;
            }
            if (this.props.coupon.shared === null || this.props.coupon.shared === undefined || this.props.coupon.shared === '') {
                helper.showTypeNotification("Vui lòng chọn cách dùng", 'warning');
                return;
            }
            if (this.props.coupon.end_time === null || this.props.coupon.end_time === undefined || this.props.coupon.end_time === '') {
                helper.showTypeNotification("Vui lòng chọn ngày kết thúc", 'warning');
                return;
            }
            this.props.groupCustomerActions.addCoupon(this.props.coupon, this.props.params.groupId, this.closeDiscountModal());
        }
    }

    render() {
        const {stringId, customersShowInAddModal} = this.props.groupCustomerForm;
        return (
            <div>
                <form id="form-add-group-customer">


                    <GeneralInfoGroup
                        groupCustomerForm={this.props.groupCustomerForm}
                        editFormData={this.editFormData}
                        changeColor={this.changeColor}
                    />


                    <div className="row">
                        <div className="col-md-7">
                            {/*-----------------CUSTOMER TABLE------------------*/}


                            <ListChildCustomer
                                groupId={this.props.params.groupId}
                                openAddCustomerModal={this.openAddCustomerModal}
                            />

                        </div>


                        <div className="col-md-5">
                            {/*-----------------LIST CHILD COUPON------------------*/}

                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">card_giftcard</i>
                                </div>
                                <div className="card-content">
                                    <div style={{display: "flex"}}>
                                        <div style={{justifyContent: "space-between"}}>
                                            <div className="col-md-10">
                                                <h4 className="card-title">
                                                    Khuyến mãi
                                                </h4>
                                            </div>
                                            <div className="col-md-2">
                                                <a className="btn btn-round btn-sm btn-primary"
                                                   ref="target" onClick={() => this.openDiscountModal()}>
                                    <span>
                                        <i className="material-icons">add</i>Thêm
                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <ListChildCoupon
                                        idGroup={this.props.params.groupId}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    {/*-----------------BUTTON------------------*/}


                    <div className="row" style={{marginLeft: 30, marginBottom: 20}}>
                        <div className="col-md-8"/>
                        <div className="col-md-4">
                            {this.props.isSaving ?
                                (
                                    <button
                                        className="btn btn-sm btn-success disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/>
                                        Đang cập nhật
                                    </button>
                                )
                                :
                                (
                                    <button className="btn btn-success btn-sm"
                                            onClick={(e) => {
                                                this.activeModal(e);
                                            }}>
                                        <i className="material-icons">save</i> Lưu
                                    </button>
                                )
                            }

                            <a className="btn btn-sm btn-danger"
                               onClick={(e) => {
                                   browserHistory.push("/good/goods/group-customer");
                                   e.preventDefault();
                               }}
                            >
                                <i className="material-icons">cancel</i> Huỷ
                            </a>
                        </div>
                    </div>


                    <Modal show={this.state.isOpenDiscountModal}
                           bsSize="large"
                           bsStyle="primary"
                           onHide={() => this.closeDiscountModal()}>
                        <Modal.Header closeButton/>
                        <Modal.Body>
                            <div className="card">
                                <form id="form-add-coupon-in-group-customer">
                                    <AddCouponModal
                                    />
                                    <div className="row" style={{marginLeft: 30, marginBottom: 20}}>
                                        <div className="col-md-6"/>
                                        <div className="col-md-6">
                                            {this.props.isSavingCoupon ?
                                                (
                                                    <button
                                                        className="btn btn-sm btn-success disabled"
                                                    >
                                                        <i className="fa fa-spinner fa-spin"/>
                                                        Đang cập nhật
                                                    </button>
                                                )
                                                :
                                                (
                                                    <button className="btn btn-success btn-sm"
                                                            onClick={(e) => {
                                                                this.addCoupon();
                                                                e.preventDefault();
                                                            }}>
                                                        <i className="material-icons">save</i> Lưu
                                                    </button>
                                                )
                                            }

                                            <button className="btn btn-sm btn-danger"
                                                    onClick={(e) => {
                                                        this.closeDiscountModal();
                                                        e.preventDefault();
                                                    }}
                                            >
                                                <i className="material-icons">cancel</i> Huỷ
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>


                    </Modal>


                    <Modal show={this.state.isOpenAddCustomerModal}
                           bsSize="large"
                           bsStyle="primary"
                           onHide={() => this.closeAddCustomerModal()}>
                        <Modal.Header closeButton/>
                        <Modal.Body>
                            <div className="card">
                                <form id="form-add-coupon-in-group-customer">
                                    <AddCustomerModal
                                        items={this.props.customersList}
                                        name="Khách hàng"
                                        isSearch={true}
                                        isPagination={true}
                                        isLoadingOverlay={this.props.isLoadingOverlay}
                                        icon="people"
                                        loadFunction={this.loadCustomersInOverlay}
                                        totalPages={this.props.totalCustomerInOverlayPages}
                                        formData={this.props.groupCustomerForm}
                                        fieldName="stringId"
                                        fieldName2="customersShowInAddModal"
                                        updateFormData={this.updateFormData}
                                        assignCustomer={this.assignCustomer}
                                        stringId={stringId}
                                        customersShowInAddModal={customersShowInAddModal}
                                        removeCustomer={this.removeCustomer}
                                    />
                                    <div className="row">
                                        <div className="col-md-8"/>
                                        <div className="col-md-4">
                                            {this.props.isSavingCustomer ?
                                                (
                                                    <button
                                                        className="btn btn-sm btn-success disabled"
                                                    >
                                                        <i className="fa fa-spinner fa-spin"/>
                                                        Đang cập nhật
                                                    </button>
                                                )
                                                :
                                                (
                                                    <button className="btn btn-success btn-sm"
                                                            onClick={(e) => {
                                                                this.addCustomer();
                                                                e.preventDefault();
                                                            }}>
                                                        <i className="material-icons">save</i> Lưu
                                                    </button>
                                                )
                                            }

                                            <button className="btn btn-sm btn-danger"
                                                    onClick={(e) => {
                                                        this.closeAddCustomerModal();
                                                        e.preventDefault();
                                                    }}
                                            >
                                                <i className="material-icons">cancel</i> Huỷ
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>


                    </Modal>

                </form>
            </div>

        );
    }
}

DetailGroupCustomerContainer.propTypes = {
    isLoadingOverlay: PropTypes.bool,
    isLoadingCustomer: PropTypes.bool,
    groupCustomerActions: PropTypes.object,
    coupon: PropTypes.object,
    groupCustomerForm: PropTypes.object,
    customersList: PropTypes.array,
    totalCustomerInOverlayPages: PropTypes.number,
    totalCustomerPages: PropTypes.number,
    params: PropTypes.object,
    isSaving: PropTypes.bool,
    isSavingCoupon: PropTypes.bool,
    isSavingCustomer: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        isLoadingOverlay: state.groupCustomers.isLoadingOverlay,
        isLoadingCustomer: state.groupCustomers.isLoadingCustomer,
        customersList: state.groupCustomers.customersList,
        groupCustomerForm: state.groupCustomers.groupCustomerForm,
        totalCustomerInOverlayPages: state.groupCustomers.totalCustomerInOverlayPages,
        totalCustomerPages: state.groupCustomers.totalCustomerPages,
        isSaving: state.groupCustomers.isSaving,
        coupon: state.groupCustomers.coupon,
        isSavingCoupon: state.groupCustomers.isSavingCoupon,
        isSavingCustomer: state.groupCustomers.isSavingCustomer,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        groupCustomerActions: bindActionCreators(groupCustomerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailGroupCustomerContainer);