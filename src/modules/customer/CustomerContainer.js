import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import ListChildCustomer from "./ListChildCustomer";
import Pagination from '../../components/common/Pagination';
import * as customerActions from './customerActions';
import Loading from "../../components/common/Loading";
import Search from '../../components/common/Search';
import {Modal} from 'react-bootstrap';
import AddCustomerModal from './AddCustomerModal';
import FormInputSelect from '../../components/common/FormInputSelect';
import {CUSTOMTYPE} from '../../constants/constants';
import * as helper from '../../helpers/helper';
import {Link} from 'react-router';




class CustomerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 10,
            query: '',
            isShowModal: false,
            status : '',
            isEdit : false,
        };
        this.loadCustomers = this.loadCustomers.bind(this);
        this.customersSearchChange = this.customersSearchChange.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.activeModal = this.activeModal.bind(this);
        this.loadByStatus = this.loadByStatus.bind(this);
        this.openFormDataInEdit = this.openFormDataInEdit.bind(this);
    }

    componentWillMount() {
        this.loadCustomers(1, this.state.limit);
    }

    componentDidUpdate() {
        this.initForm();
    }
    openAddModal(isEdit) {
        this.setState({isShowModal: true , isEdit : isEdit});
    }

    openFormDataInEdit(customer ){
        this.props.customerActions.updateAddCustomerFormData(customer);
        this.openAddModal(true);
    }

    closeAddModal() {
        let customer = {
            name : '',
            phone : '',
            email : '',
            address : '',
            gender : '',
            dob : '',
        };
        this.props.customerActions.updateAddCustomerFormData(customer);
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
            this.props.customerActions.loadCustomers(this.state.page, this.state.limit, this.state.query,this.state.status);
        }.bind(this), 500);
    }

    updateFormData(event) {
        const field = event.target.name;
        let customer = {...this.props.customer};
        customer[field] = event.target.value;
        this.props.customerActions.updateAddCustomerFormData(customer);
    }

    activeModal(e){
        if ($('#form-add-customer').valid()) {
            if (this.props.customer.dob === null || this.props.customer.dob === undefined || this.props.customer.dob === '') {
                helper.showTypeNotification("Vui lòng chọn sinh nhật", 'warning');
                return;
            }
            if (this.props.customer.gender === null || this.props.customer.gender === undefined || this.props.customer.gender === '' ) {
                helper.showTypeNotification("Vui lòng chọn giới tính", 'warning');
            }
            else {
                if (this.state.isEdit)
                {
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
            this.props.customerActions.loadCustomers(page,this.state.limit);
    }
    loadByStatus(e){
        this.setState({status: e.target.value});
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.customerActions.loadCustomers(this.state.page, this.state.limit, this.state.query,this.state.status);
        }.bind(this), 500);
    }
    initForm() {
        helper.setFormValidation('#form-add-customer');
    }

    render() {
        let currentPage = this.state.page;
        let status = this.state.status;
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
                                                    <Link to="goods/customer">
                                                        Khách hàng
                                                        <div className="ripple-container"/>
                                                    </Link>
                                                </li>
                                                <li className="">
                                                    <Link to="goods/supplier">
                                                        Nhà cung cấp
                                                        <div className="ripple-container"/>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            {this.props.isLoading ? <Loading/> :
                                <div>
                                    <div style={{marginTop: 30 ,  marginLeft: 30 }}>
                                        <a className="btn btn-rose" onClick={() => this.openAddModal(false)}>Thêm khách hàng</a>
                                    </div>


                                    <div className="card-content">
                                        <div className="table-responsive">
                                            <div id="property-table_wrapper"
                                                 className="dataTables_wrapper form-inline dt-bootstrap">
                                                <div className="row" style={{marginTop: 30 , marginBottom : 30}}>
                                                    <div className="col-md-8">
                                                        <div id="property-table_length">
                                                            <label>Phân loại:
                                                                <div className="form-group form-group-md"
                                                                     style={{marginTop: 0, marginLeft: 20}}>
                                                                    <FormInputSelect
                                                                        updateFormData={this.loadByStatus}
                                                                        name="status"
                                                                        data = {CUSTOMTYPE}
                                                                        value={status}
                                                                    />
                                                                    <span className="material-input"/></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4" style={{marginRight : 0}}>
                                                        <Search
                                                            onChange={this.customersSearchChange}
                                                            value={this.state.query}
                                                            placeholder="Tìm kiếm khách hàng"
                                                            className="col-md-6"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">assignment</i>
                                                </div>
                                                <h4 className="card-title">Danh sách khách hàng</h4>
                                                <ListChildCustomer
                                                    customersList={this.props.customersList}
                                                    openFormDataInEdit = {this.openFormDataInEdit}
                                                />
                                                <div className="row">
                                                    <div className="col-sm-5">
                                                        <div className="dataTables_info" id="property-table_info"
                                                             role="status" aria-live="polite">Hiển trị
                                                            trang {currentPage} trên tổng số
                                                            {' ' + this.props.totalPages} trang
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-7" style={{textAlign: 'right'}}>
                                                        <Pagination
                                                            totalPages={this.props.totalPages}
                                                            currentPage={currentPage}
                                                            loadDataPage={this.loadCustomers}
                                                        />
                                                    </div>
                                                </div>
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
                                customer = {this.props.customer}
                            />
                                    {this.props.isSaving ?
                                        (
                                            <button
                                                className="btn btn-round btn-fill btn-success disabled"
                                            >
                                                <i className="fa fa-spinner fa-spin"/>
                                                {! this.state.isEdit ? ' Đang thêm' : ' Đang cập nhật' }
                                            </button>
                                        )
                                        :
                                        (
                                            <button rel="tooltip" data-placement="top" title=""
                                                    data-original-title="Remove item"
                                                    type="button" className="btn btn-round btn-success "
                                                    onClick={(e) =>this.activeModal(e)}
                                            ><i className="material-icons">check</i>
                                                {this.state.isEdit ? 'Cập nhật' : 'Thêm'}
                                            </button>
                                        )
                                    }
                                    <button rel="tooltip" data-placement="top" title="" data-original-title="Remove item"
                                            type="button" className="btn btn-round btn-danger " data-dismiss="modal"
                                            onClick={this.closeAddModal}><i className="material-icons">close</i> Huỷ
                                    </button>
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
    totalCount : PropTypes.number,
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
        totalCount : state.customers.totalCount,
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