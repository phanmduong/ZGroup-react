import React from 'react';
import PropTypes from 'prop-types';
import Search from '../../../components/common/Search';
import Pagination from '../../../components/common/Pagination';
import Loading from "../../../components/common/Loading";
import * as groupCustomerActions from '../groupCustomerActions';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as helper from '../../../helpers/helper';




class ListChildCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 6,
            query: '',
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.assignCustomer = this.assignCustomer.bind(this);
        this.removeCustomer = this.removeCustomer.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.loadCustomersInModal = this.loadCustomersInModal.bind(this);
    }
    componentWillMount() {
        this.loadCustomersInModal(1);
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
            this.props.groupCustomerActions.loadCustomersInModal(this.state.page, this.state.limit, this.state.query, this.props.groupId);
        }.bind(this), 500);
    }
    updateFormData(groupCustomerForm) {
        this.props.groupCustomerActions.updateGroupCustomerFormData(groupCustomerForm);
    }

    assignCustomer(id) {
        this.props.groupCustomerActions.assignGroupCustomerFormData(id);
    }

    removeCustomer(customer) {
        helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa " + customer.name,
            function () {
                this.props.groupCustomerActions.removeGroupCustomerFormData(customer);
            }.bind(this));
    }
    loadCustomersInModal(page) {
        this.setState({page: page});
        this.props.groupCustomerActions.loadCustomersInModal(page, this.state.limit, this.state.query, this.props.groupId);
    }
    render() {
        const currentPage = this.state.page;
        const {customersShowInTable} = this.props.groupCustomerForm;
        return (
            <div className="card">
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">people</i>
                </div>
                <div className="card-content">
                    <h4 className="card-title">Khách hàng</h4>
                    <div className="row">
                        <div className="col-md-8">
                            {customersShowInTable.length === 0 ? null :
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
                            {/*<AddOverlay*/}
                            {/*items={this.props.customersList}*/}
                            {/*name="Khách hàng"*/}
                            {/*isSearch={true}*/}
                            {/*isPagination={true}*/}
                            {/*isLoadingOverlay={this.props.isLoadingOverlay}*/}
                            {/*icon="people"*/}
                            {/*loadFunction={this.loadCustomersInOverlay}*/}
                            {/*totalPages={this.props.totalCustomerInOverlayPages}*/}
                            {/*formData={this.props.groupCustomerForm}*/}
                            {/*fieldName="stringId"*/}
                            {/*fieldName2="customersShowInTable"*/}
                            {/*updateFormData={this.updateFormData}*/}
                            {/*assignCustomer={this.assignCustomer}*/}
                            {/*stringId={stringId}*/}
                            {/*customersShowInTable={customersShowInTable}*/}
                            {/*/>*/}
                            <a className="btn btn-round btn-sm btn-primary"
                               onClick={() => this.props.openAddCustomerModal()}>
                                    <span>
                                        <i className="material-icons">add</i>Thêm khách hàng
                                    </span>
                            </a>


                        </div>
                    </div>
                    {this.props.isLoadingCustomer ? <Loading/> :
                        <div className="table-responsive">
                            <table id="property-table" className="table table-hover" role="grid"
                                   aria-describedby="property-table_info">
                                {customersShowInTable && customersShowInTable.length !== 0 ?
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
                                {customersShowInTable && customersShowInTable.map(
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
                        </div>
                    }
                    {customersShowInTable && customersShowInTable.length === 0 ? null :
                        <Pagination
                            totalPages={this.props.totalCustomerPages}
                            currentPage={currentPage}
                            loadDataPage={this.loadCustomersInModal}/>
                    }
                </div>
            </div>
        );
    }
}

ListChildCustomer.propTypes = {
    groupCustomerForm: PropTypes.object,
    totalCustomerPages: PropTypes.number,
    totalCustomerInOverlayPages: PropTypes.number,
    groupId: PropTypes.number,
    isLoadingCustomer: PropTypes.bool,
    isSavingCoupon: PropTypes.bool,
    isLoadingOverlay: PropTypes.bool,
    customersList: PropTypes.array,
    groupCustomerActions: PropTypes.func,
    openAddCustomerModal: PropTypes.func,
};


function mapStateToProps(state) {
    return {
        isLoadingCustomer: state.groupCustomers.isLoadingCustomer,
        customersList: state.groupCustomers.customersList,
        groupCustomerForm: state.groupCustomers.groupCustomerForm,
        totalCustomerInOverlayPages: state.groupCustomers.totalCustomerInOverlayPages,
        totalCustomerPages: state.groupCustomers.totalCustomerPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        groupCustomerActions: bindActionCreators(groupCustomerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListChildCustomer);
