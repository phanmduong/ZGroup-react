import React from 'react';
import PropTypes from 'prop-types';
import AddOverlay from "./AddOverlay";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as groupCustomerActions from './groupCustomerActions';
import {CirclePicker} from 'react-color';
import Search from '../../components/common/Search';
import Pagination from '../../components/common/Pagination';
import Loading from "../../components/common/Loading";
import * as helper from '../../helpers/helper';
import {Modal} from 'react-bootstrap';
import ListChildCoupon from './ListChildCoupon';
import AddCouponModal from './AddCouponModal';


import FormInputText from '../../components/common/FormInputText';


class DetailGroupCustomerContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            limit: 6,
            query: '',
            isOpenDiscountModal: false,
        };
        this.loadCustomersInOverlay = this.loadCustomersInOverlay.bind(this);
        this.loadCustomersInModal = this.loadCustomersInModal.bind(this);
        this.editFormData = this.editFormData.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.assignCustomer = this.assignCustomer.bind(this);
        this.removeCustomer = this.removeCustomer.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.activeModal = this.activeModal.bind(this);
        this.openDiscountModal = this.openDiscountModal.bind(this);
        this.closeDiscountModal = this.closeDiscountModal.bind(this);
        this.addCoupon = this.addCoupon.bind(this);
        // this.loadCouponsInModal = this.loadCouponsInModal.bind(this);
    }


    componentWillMount() {
        this.loadCustomersInModal(1);
        // this.loadCouponsInModal();
    }

    loadCustomersInOverlay(page, limit, query, stringId) {
        this.props.groupCustomerActions.loadCustomersInOverlay(page, limit, query, stringId);
    }

    // loadCouponsInModal(){
    //     this.props.groupCustomerActions.loadCouponsInModal();
    // }

    loadCustomersInModal(page) {
        this.setState({page: page});
        this.props.groupCustomerActions.loadCustomersInModal(page, this.state.limit, this.state.query, this.props.params.groupId);
    }

    onSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.groupCustomerActions.loadCustomersInModal(this.state.page, this.state.limit, this.state.query, this.props.params.groupId);
        }.bind(this), 500);
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

    changeColor(color) {
        let groupCustomerForm = {...this.props.groupCustomerForm};
        groupCustomerForm.color = color.hex;
        this.updateFormData(groupCustomerForm);
    }

    updateFormData(groupCustomerForm) {
        this.props.groupCustomerActions.updateGroupCustomerFormData(groupCustomerForm);
    }                   // tách ra để dùng cho overlay

    assignCustomer(id) {
        this.props.groupCustomerActions.assignGroupCustomerFormData(id);
    }

    removeCustomer(customer) {
        this.props.groupCustomerActions.removeGroupCustomerFormData(customer);
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
            if (this.props.coupon.end_time === null || this.props.coupon.end_time === undefined || this.props.coupon.end_time === '') {
                helper.showTypeNotification("Vui lòng chọn ngày kết thúc", 'warning');
                return;
            }
            this.props.groupCustomerActions.addCoupon(this.props.coupon, this.props.params.groupId, this.closeDiscountModal());
        }
    }

    render() {
        const currentPage = this.state.page;
        const {name, description, stringId, color, customersShowInModal} = this.props.groupCustomerForm;
        return (
            <div>
                <form id="form-add-group-customer">

                    <div className="row">

                        <div className="col-md-7">
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">people</i>
                                </div>

                                {/*----------------- INFO ------------------*/}


                                <div className="card-content">
                                    <h4 className="card-title">
                                        Sửa nhóm khách hàng
                                    </h4>
                                    <FormInputText
                                        label="Tên nhóm"
                                        name="name"
                                        updateFormData={this.editFormData}
                                        type="text"
                                        value={name}
                                    />
                                    <FormInputText
                                        label="Mô tả"
                                        name="description"
                                        updateFormData={this.editFormData}
                                        type="text"
                                        value={description}
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            {/*-----------------PICK COLOR------------------*/}
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">contacts</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">Chọn màu</h4>
                                    <CirclePicker width="100%"
                                                  color={color || ""}
                                                  onChangeComplete={this.changeColor}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-7">
                            {/*-----------------CUSTOMER TABLE------------------*/}
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">people</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">Khách hàng</h4>
                                    <div className="row">
                                        <div className="col-md-8">
                                            {customersShowInModal.length === 0 ? null :
                                                <Search
                                                    onChange={this.onSearchChange}
                                                    value={this.state.query}
                                                    placeholder="Tìm kiếm ..."
                                                    className="col-md-10"
                                                />
                                            }
                                        </div>
                                        <div className="col-md-4"
                                             style={{
                                                 display: 'flex',
                                                 marginTop: "15px"
                                             }}>
                                            <AddOverlay
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
                                                fieldName2="customersShowInModal"
                                                updateFormData={this.updateFormData}
                                                assignCustomer={this.assignCustomer}
                                                stringId={stringId}
                                            />
                                        </div>
                                    </div>
                                    {this.props.isLoadingModal ? <Loading/> :
                                        <table id="property-table" className="table table-hover" role="grid"
                                               aria-describedby="property-table_info">
                                            {customersShowInModal && customersShowInModal.length !== 0 ?
                                                <thead>

                                                <tr className="text-rose" role="row">
                                                    <th/>
                                                    <th>Tên khách hàng</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Địa chỉ</th>
                                                    <th> Ngày mua cuối</th>
                                                    <th>Tổng tiền hàng</th>
                                                    <th> Tiền trả hàng</th>
                                                    <th> Tiền nợ</th>
                                                </tr>
                                                </thead>
                                                : null
                                            }
                                            <tbody>
                                            {customersShowInModal && customersShowInModal.map(
                                                (customer) => {
                                                    return (
                                                        <tr role="row" className="even" key={customer.id}>
                                                            <td>
                                                                <a>
                                                                    <i className="material-icons"
                                                                       onClick={() => {
                                                                           this.removeCustomer(customer);
                                                                       }}
                                                                    >delete</i>
                                                                </a>
                                                            </td>
                                                            <td className="sorting_1">{customer.name}</td>
                                                            <td>{customer.phone}</td>
                                                            <td>{customer.address}</td>
                                                            <td>{customer.last_order}</td>
                                                            <td>{customer.total_money}</td>
                                                            <td>{customer.total_paid_money}</td>
                                                            <td>{customer.debt}</td>

                                                        </tr>

                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    }
                                    {customersShowInModal.length === 0 ? null :
                                        <Pagination
                                            totalPages={this.props.totalCustomerInModalPages}
                                            currentPage={currentPage}
                                            loadDataPage={this.loadCustomersInModal}/>
                                    }
                                </div>

                            </div>
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
                        <div className="col-md-9"/>
                        <div className="col-md-3">
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

                            <button className="btn btn-sm btn-danger"
                                    onClick={(e) => {
                                        this.closeModal();
                                        e.preventDefault();
                                    }}
                            >
                                <i className="material-icons">cancel</i> Huỷ
                            </button>
                        </div>
                    </div>

                    <Modal show={this.state.isOpenDiscountModal}
                           bsSize="large"
                           bsStyle="primary"
                           onHide={() => this.closeDiscountModal()}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="card">
                                <form id="form-add-coupon-in-group-customer">
                                    <AddCouponModal
                                        groupId={this.props.params.groupId}
                                    />
                                    <div className="row" style={{marginLeft: 30, marginBottom: 20}}>
                                        <div className="col-md-8"/>
                                        <div className="col-md-4">
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

                </form>
            </div>

        );
    }
}

DetailGroupCustomerContainer.propTypes = {
    isLoadingOverlay: PropTypes.bool,
    isLoadingModal: PropTypes.bool,
    groupCustomerActions: PropTypes.object,
    coupon: PropTypes.object,
    groupCustomerForm: PropTypes.object,
    customersList: PropTypes.array,
    totalCustomerInOverlayPages: PropTypes.number,
    totalCustomerInModalPages: PropTypes.number,
    params: PropTypes.object,
    isSaving: PropTypes.bool,
    isSavingCoupon: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        isLoadingOverlay: state.groupCustomers.isLoadingOverlay,
        isLoadingModal: state.groupCustomers.isLoadingModal,
        customersList: state.groupCustomers.customersList,
        groupCustomerForm: state.groupCustomers.groupCustomerForm,
        totalCustomerInOverlayPages: state.groupCustomers.totalCustomerInOverlayPages,
        totalCustomerInModalPages: state.groupCustomers.totalCustomerInModalPages,
        isSaving: state.groupCustomers.isSaving,
        coupon: state.groupCustomers.coupon,
        isSavingCoupon: state.groupCustomers.isSavingCoupon,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        groupCustomerActions: bindActionCreators(groupCustomerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailGroupCustomerContainer);