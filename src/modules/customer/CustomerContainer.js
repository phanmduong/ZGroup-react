import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
import {Link, browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import ReactSelect from 'react-select';
import Pagination from '../../components/common/Pagination';
import Loading from "../../components/common/Loading";
import Search from '../../components/common/Search';
import {CUSTOMTYPE} from '../../constants/constants';
import * as helper from '../../helpers/helper';
import ListChildCustomer from "./ListChildCustomer";
import * as customerActions from './customerActions';
import AddCustomerModal from './AddCustomerModal';

class CustomerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 10,
            query: '',
            isShowModal: false,
            status: '',
            isEdit: false,
        };
        this.timeOut = null;
        this.loadCustomers = this.loadCustomers.bind(this);
        this.customersSearchChange = this.customersSearchChange.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.activeModal = this.activeModal.bind(this);
        this.loadByStatus = this.loadByStatus.bind(this);
        this.openFormDataInEdit = this.openFormDataInEdit.bind(this);
        this.openInfoCustomer = this.openInfoCustomer.bind(this);
    }

    componentWillMount() {
        this.loadCustomers(1, this.state.limit);
    }


    openAddModal() {
        //      set dữ liệu về rỗng trước khi mở modal add
        let customer = {
            name: '',
            phone: '',
            email: '',
            address: '',
            gender: '',
            birthday: '',
        };
        this.props.customerActions.updateAddCustomerFormData(customer);
        this.setState({isShowModal: true, isEdit: false});
    }


    // openFormDataInEdit để mở Modal khi click vào icon chỉnh sửa
    openFormDataInEdit(customer) {
        this.props.customerActions.updateAddCustomerFormData(customer);
        this.setState({isShowModal: true, isEdit: true});
    }


    // openInfoCustomer để route đến /good/goods/customer/info-customer/ khi click vào tên customer
    // Có thể thay thế cho willMount trong InfoCustomerContainer
    openInfoCustomer(customer) {
        this.props.customerActions.updateAddCustomerFormData(customer);     //      Gán customer vào để show ra trong InfoCustomerContainer
        browserHistory.push('/good/goods/customer/info-customer/' + customer.id);
    }

    closeAddModal() {
        // gán các giá trị trong biến tạm customer về rỗng khi đóng modal => để sử dụng mở add
        this.setState({isShowModal: false});
    }

    customersSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.customerActions.loadCustomers(this.state.page, this.state.limit, this.state.query, this.state.status);
        }.bind(this), 500);
    }

    loadByStatus(value) {
        let status = value && value.value ? value.value : "";
        this.setState({status: status, page: 1});
        this.props.customerActions.loadCustomers(this.state.page, this.state.limit, this.state.query, this.state.status);
        // Để làm chậm pha do bất đồng bộ khi ta get giá trị của customersList về rồi gán vào mảng trên state
    }

    //updateFormData sử dụng để update giá trị trong form lên biến tạm customer ở state
    updateFormData(event) {
        const field = event.target.name;
        let customer = {
            ...this.props.customer,
            [field]: event.target.value
        };
        this.props.customerActions.updateAddCustomerFormData(customer);
    }

    activeModal(e) {
        if ($('#form-add-customer').valid()) {
            if (this.props.customer.birthday === null || this.props.customer.birthday === undefined || this.props.customer.birthday === '') {
                helper.showTypeNotification("Vui lòng chọn sinh nhật", 'warning');
                return;
            }
            if (this.props.customer.gender === null || this.props.customer.gender === undefined || this.props.customer.gender === '') {
                helper.showTypeNotification("Vui lòng chọn giới tính", 'warning');
            }
            else {
                if (this.state.isEdit) {
                    this.props.customerActions.editCustomer(this.props.customer, this.closeAddModal);
                }
                else {
                    this.props.customerActions.addCustomer(this.props.customer, this.closeAddModal);
                }
            }
        }
        e.preventDefault();
    }

    loadCustomers(page) {
        this.setState({page: page});
        this.props.customerActions.loadCustomers(page, this.state.limit, this.state.query, this.state.status);
    }

    render() {
        let currentPage = this.state.page;
        let status = this.state.status;
        let first = this.props.totalCount ? (currentPage - 1) * 10 + 1 : 0;
        let end = currentPage < this.props.totalPages ? currentPage * 10 : this.props.totalCount;
        return (
            <div className="content">
                <div className="container-fluid">
                    <div id="page-wrapper">
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-header card-header-tabs" data-background-color="rose">
                                    <div className="nav-tabs-navigation">
                                        <div className="nav-tabs-wrapper">
                                            <ul className="nav nav-tabs" data-tabs="tabs">
                                                <li className="active">
                                                    <Link to="/good/goods/customer">
                                                        Khách hàng
                                                        <div className="ripple-container"/>
                                                    </Link>
                                                </li>
                                                <li className="">
                                                    <Link to="/good/goods/supplier">
                                                        Nhà cung cấp
                                                        <div className="ripple-container"/>
                                                    </Link>
                                                </li>
                                                <li className="">
                                                    <Link to="/good/goods/group-customer">
                                                        Nhóm khách hàng
                                                        <div className="ripple-container"/>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {this.props.isLoading ? <Loading/> :
                                    <div className="card-content">
                                        <div id="property-table_wrapper" className="dataTables_wrapper dt-bootstrap">
                                            <div className="row" style={{marginTop: "20px", marginBottom: "20px"}}>
                                                <div className="col-md-4">
                                                    <a className="btn btn-rose"
                                                       onClick={() => this.openAddModal(false)}>
                                                        Thêm khách hàng</a>
                                                </div>
                                                <div className="col-md-8" style={{marginBottom: 40}}>
                                                    <Search
                                                        onChange={this.customersSearchChange}
                                                        value={this.state.query}
                                                        placeholder="Tìm kiếm khách hàng          "
                                                    />
                                                </div>
                                            </div>


                                            <div className="card-header card-header-icon"
                                                 data-background-color="rose">
                                                <i className="material-icons">assignment</i>
                                            </div>
                                            <h4 className="card-title">Danh sách khách hàng</h4>


                                            <div className="row" style={{marginBottom: "30px"}}>
                                                <div className="col-md-6"/>
                                                <div className="form-group col-md-4" style={{marginTop: -60}}>
                                                    <label className="label-control">Phân loại: </label>
                                                    <ReactSelect
                                                        name="status"
                                                        value={status}
                                                        options={CUSTOMTYPE}
                                                        onChange={this.loadByStatus}
                                                        placeholder="Chọn tình trạng khách hàng"
                                                    />
                                                </div>
                                            </div>
                                            <ListChildCustomer
                                                customersList={this.props.customersList}
                                                openFormDataInEdit={this.openFormDataInEdit}
                                                openInfoCustomer={this.openInfoCustomer}
                                            />
                                            <div className="row float-right">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                                     style={{textAlign: 'right'}}>
                                                    <b style={{marginRight: '15px'}}>
                                                        Hiển thị kêt quả từ {first}
                                                        - {end}/{this.props.totalCount}</b><br/>
                                                    <Pagination
                                                        totalPages={this.props.totalPages}
                                                        currentPage={currentPage}
                                                        loadDataPage={this.loadCustomers}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="float-right">
                                                <div className="btn btn-info btn-simple"> Tổng khách
                                                    hàng: {this.props.totalCount}
                                                </div>
                                                <div className="btn btn-danger btn-simple"> Tổng
                                                    tiền: {this.props.totalMoneys}
                                                </div>
                                                <div className="btn btn-success btn-simple"> Tổng
                                                    nợ: {this.props.totalDebtMoneys}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <Modal show={this.state.isShowModal} bsSize="large" bsStyle="primary" onHide={this.closeAddModal}>
                        <Modal.Header>
                            <Modal.Title>
                                <strong>Thêm khách hàng</strong>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="card">
                                <form id="form-add-customer" onSubmit={(e) => {
                                    e.preventDefault();
                                }}>
                                    <AddCustomerModal
                                        updateFormData={this.updateFormData}
                                        customer={this.props.customer}
                                    />

                                    <div className="row">
                                        <div className="col-md-8"/>
                                        <div className="col-md-4">
                                            {this.props.isSaving ?
                                                (
                                                    <button
                                                        className="btn btn-sm btn-success disabled"
                                                    >
                                                        <i className="fa fa-spinner fa-spin"/>
                                                        {!this.state.isEdit ? ' Đang thêm' : ' Đang cập nhật'}
                                                    </button>
                                                )
                                                :
                                                (
                                                    <button className="btn btn-success btn-sm"
                                                            onClick={(e) => {
                                                                this.activeModal(e);
                                                            }}>
                                                        <i className="material-icons">save</i>
                                                        {this.state.isEdit ? 'Cập nhật' : 'Thêm'}
                                                    </button>
                                                )
                                            }

                                            <button className="btn btn-sm btn-danger"
                                                    onClick={this.closeAddModal}
                                            >
                                                <i className="material-icons">cancel</i> Huỷ
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        );
    }
}

CustomerContainer.propTypes = {
    customerActions: PropTypes.object,
    customersList: PropTypes.array,
    isLoading: PropTypes.bool,
    totalPages: PropTypes.number,
    totalCount: PropTypes.number,
    totalDebtMoneys: PropTypes.number,
    totalMoneys: PropTypes.number,
    isSaving: PropTypes.bool,
    customer: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        customersList: state.customers.customersList,
        isLoading: state.customers.isLoading,
        totalPages: state.customers.totalPages,
        totalCount: state.customers.totalCount,
        totalDebtMoneys: state.customers.totalDebtMoneys,
        totalMoneys: state.customers.totalMoneys,
        isSaving: state.customers.modal.isSaving,
        customer: state.customers.modal.customer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        customerActions: bindActionCreators(customerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerContainer);


// Ngày sinh lấy về là birthday nhưng khi edit và add lại là dob -_-