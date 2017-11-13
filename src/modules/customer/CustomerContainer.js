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
import * as helper from '../../helpers/helper';



class CustomerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 10,
            query: '',
            isShowModal: false,
        };
        this.loadCustomers = this.loadCustomers.bind(this);
        this.customersSearchChange = this.customersSearchChange.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
    }

    componentWillMount() {
        this.loadCustomers(this.state.page, this.state.limit);
        this.props.customerActions.loadTotalAndDebtMoney();
    }

    loadCustomers(page, limit) {
        this.setState({page: page});
        this.props.customerActions.loadCustomers(page, limit);
    }

    openAddModal() {
        this.setState({isShowModal: true});
    }

    closeAddModal() {
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
            this.props.customerActions.loadCustomers(this.state.page, 10, this.state.query);
        }.bind(this), 500);
    }

    updateFormData(event) {
        const field = event.target.name;
        let customer = {...this.props.customer};
        customer[field] = event.target.value;
        this.props.customerActions.updateAddCustomerFormData(customer);
    }

    addCustomer(e){
        this.props.customerActions.addCustomer(this.props.customer , this.closeAddModal );
        e.preventDefault();
    }
    deleteCustomer(id , name){
        helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa " + name,
            function () {
                this.props.customerActions.deleteCustomer(id);
            }.bind(this));
    }
    render() {
        let currentPage = this.state.page;
        let limit = this.state.limit;
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
                                                        <div id="property-table_length" style={{marginTop: 18}}>
                                                            <label>Phân loại:
                                                                <div className="form-group form-group-md"
                                                                     style={{marginTop: 0, marginLeft: 20}}>
                                                                    <select name="property-table_length"
                                                                            aria-controls="property-table"
                                                                            className="form-control">
                                                                        <option value={10}>Tất cả</option>
                                                                        <option value={25}>Khách hàng từng mua</option>
                                                                        <option value={50}>Khách hàng còn nợ</option>
                                                                    </select>
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
                                                    deleteCustomer = {this.deleteCustomer}
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
                            <AddCustomerModal
                                updateFormData={this.updateFormData}
                                customer = {this.props.customer}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <form>
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
                        </Modal.Footer>
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