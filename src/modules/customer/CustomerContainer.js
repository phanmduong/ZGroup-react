import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import ListChildCustomer from "./ListChildCustomer";
import _ from 'lodash';
import * as customerActions from './customerActions';
import Loading from "../../components/common/Loading";
import Search from '../../components/common/Search';
import {Modal} from 'react-bootstrap';
import AddCustomerModal from './AddCustomerModal';
import FormInputSelect from '../../components/common/FormInputSelect';
import {CUSTOMTYPE} from '../../constants/constants';
import * as helper from '../../helpers/helper';



class CustomerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 10,
            query: '',
            isShowModal: false,
            status : '',
        };
        this.loadCustomers = this.loadCustomers.bind(this);
        this.customersSearchChange = this.customersSearchChange.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.loadByStatus = this.loadByStatus.bind(this);
    }

    componentWillMount() {
        this.loadCustomers(1, this.state.limit);
    }

    componentDidUpdate() {
        this.initForm();
    }
    openAddModal() {
        this.setState({isShowModal: true});
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

    addCustomer(e){
        if ($('#form-add-customer').valid()) {
            if (this.props.customer.dob === null || this.props.customer.dob === undefined || this.props.customer.dob === '') {
                helper.showTypeNotification("Vui lòng chọn sinh nhật", 'warning');
                return;
            }
            if (this.props.customer.gender === null || this.props.customer.gender === undefined || this.props.customer.gender === '' ) {
                helper.showTypeNotification("Vui lòng chọn giới tính", 'warning');
            }
            else {
                this.props.customerActions.addCustomer(this.props.customer, this.closeAddModal);
            }
        }
        e.preventDefault();
    }

    loadCustomers(page, limit) {
        this.setState({page: page});
            this.props.customerActions.loadCustomers(page,limit);
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
        let limit = this.state.limit;
        let status = this.state.status;
        return (
            <div className="content">
                <div className="container-fluid">
                    <div id="page-wrapper">
                        <div className="container-fluid">
                            <div style={{marginTop: 15}}>
                                <a className="btn btn-rose" onClick={() => this.openAddModal()}>Thêm khách hàng</a>
                            </div>
                            {this.props.isLoading ? <Loading/> :
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">assignment</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Danh sách khách hàng</h4>
                                        <div className="table-responsive">
                                            <div id="property-table_wrapper"
                                                 className="dataTables_wrapper form-inline dt-bootstrap">
                                                <div className="row" style={{marginTop: 40 , marginBottom : 30}}>
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
                                                <ListChildCustomer
                                                    customersList={this.props.customersList}
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
                                                        <ul className="pagination pagination-primary">


                                                            {_.range(1, this.props.totalPages + 1).map(page => {
                                                                if (Number(currentPage) === page) {
                                                                    return (
                                                                        <li key={page} className="active">
                                                                            <a onClick={() => this.loadCustomers(page, limit)}>{page}</a>
                                                                        </li>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <li key={page}>
                                                                            <a onClick={() => this.loadCustomers(page, limit)}>{page}</a>
                                                                        </li>
                                                                    );
                                                                }
                                                            })}
                                                        </ul>
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
                                                Đang thêm
                                            </button>
                                        )
                                        :
                                        (
                                            <button rel="tooltip" data-placement="top" title=""
                                                    data-original-title="Remove item"
                                                    type="button" className="btn btn-round btn-success "
                                                    onClick={(e) =>this.addCustomer(e)}
                                            ><i className="material-icons">check</i>
                                                Thêm
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
                        {/*<Modal.Footer>*/}
                            {/*<form>*/}
                                {/**/}
                               {/**/}
                            {/*</form>*/}
                        {/*</Modal.Footer>*/}
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