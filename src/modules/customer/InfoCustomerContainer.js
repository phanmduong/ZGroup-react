import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as customerActions from './customerActions';
import Loading from "../../components/common/Loading";
//import * as helper from '../../helpers/helper';
import OrdersListCustomerComponent from './OrdersListCustomerComponent';
import InfoCustomerComponent from './InfoCustomerComponent';
import AddOverlay from './AddOverlay';
import {browserHistory} from 'react-router';
import {isEmptyInput, showTypeNotification} from "../../helpers/helper";

class InfoCustomerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 5,
            id: this.props.params.customerId,
        };
        this.loadOrdersCustomer = this.loadOrdersCustomer.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.loadGroupCustomer = this.loadGroupCustomer.bind(this);
        this.assignGroupCustomer = this.assignGroupCustomer.bind(this);
        this.removeGroupCustomer = this.removeGroupCustomer.bind(this);
    }

    componentWillMount() {
        this.props.customerActions.loadInfoCustomer(this.state.id);
        this.loadOrdersCustomer(1);
    }

    loadOrdersCustomer(page) {
        this.setState({page: page});
        this.props.customerActions.loadOrdersCustomer(this.state.id, this.state.page, this.state.limit);
    }

    updateFormData(event) {
        const field = event.target.name;
        let customer = {
            ...this.props.customer,
            [field]: event.target.value
        };
        this.props.customerActions.updateAddCustomerFormData(customer);
    }

    editCustomer() {
        const customer = this.props.customer;
        if (isEmptyInput(customer.birthday)) {
            showTypeNotification("Vui lòng chọn sinh nhật", 'warning');
        } else if (isEmptyInput(customer.gender)) {
            showTypeNotification("Vui lòng chọn giới tính", 'warning');
        } else if (isEmptyInput(customer.address)) {
            showTypeNotification("Vui lòng nhập địa chỉ", 'warning');
        } else {
            this.props.customerActions.editCustomer(customer);
        }
    }

    loadGroupCustomer(page, limit, query, stringId) {
        this.props.customerActions.loadGroupCustomer(page, limit, query, stringId);
    }

    assignGroupCustomer(id) {
        this.props.customerActions.assignCustomerFormData(id);
    }

    removeGroupCustomer(group) {
        this.props.customerActions.removeCustomerFormData(group);
    }

    render() {
        let currentPage = this.state.page;
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <div className="row" style={{marginBottom: 25}}>
                                    <div className="col-md-6">
                                        <h4 className="card-title">Danh sách đơn hàng đặt</h4>
                                    </div>
                                    <div className="col-md-2" style={{marginLeft: 20}}>
                                        <AddOverlay
                                            items={this.props.groupsInOverlay}
                                            name="Nhóm khách hàng"
                                            isSearch={true}
                                            isPagination={true}
                                            isLoadingInOverlay={this.props.isLoadingInOverlay}
                                            icon="people"
                                            loadFunction={this.loadGroupCustomer}
                                            totalPages={this.props.totalGroupCustomerPages}
                                            formData={this.props.customer}
                                            fieldName="stringId"
                                            fieldName2="groups"
                                            updateFormData={this.props.customerActions.updateAddCustomerFormData}
                                            assignGroupCustomer={this.assignGroupCustomer}
                                        />
                                    </div>
                                </div>
                                {this.props.isLoading ? <Loading/> :

                                    <div>
                                        <OrdersListCustomerComponent
                                            ordersList={this.props.customer.delivery_orders}
                                            loadOrdersCustomer={this.loadOrdersCustomer}
                                            currentPage={currentPage}
                                            totalOrderPages={this.props.totalOrderPages}
                                            name="Danh sách đơn hàng đặt"
                                        />
                                    </div>
                                }


                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <div className="row" style={{marginBottom: 25}}>
                                    <div className="col-md-6">
                                        <h4 className="card-title">Danh sách đơn hàng sẵn</h4>
                                    </div>
                                </div>
                                {this.props.isLoading ? <Loading/> :

                                    <div>
                                        <OrdersListCustomerComponent
                                            ordersList={this.props.customer.orders}
                                            loadOrdersCustomer={this.loadOrdersCustomer}
                                            currentPage={currentPage}
                                            totalOrderPages={this.props.totalOrderPages}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>


                    <div className="col-md-4">
                        <div className="card">
                            <form id="form-edit-customer">


                                <div className="card-header card-header-icon" data-background-color="rose"><i
                                    className="material-icons">announcement</i></div>
                                <div className="card-content">
                                    <h4 className="card-title">Thông tin</h4>


                                    <h4><strong>Nhóm khách hàng</strong></h4>
                                    <div className="bootstrap-tagsinput">
                                        {this.props.customer.groups && this.props.customer.groups.map((group) => {
                                            return (
                                                <span className="tag btn" key={group.id} style={{
                                                    backgroundColor: group.color,
                                                    fontSize: 12
                                                }}>{group.name + '  '}
                                                    <a onClick={() => {
                                                        this.removeGroupCustomer(group);
                                                    }}>
                                        <span data-role="remove" aria-hidden={true}/>
                                          </a>
                                        </span>
                                            );
                                        })}
                                    </div>


                                    {this.props.isLoading ? <Loading/> :

                                        <div>
                                            <InfoCustomerComponent
                                                customer={this.props.customer}
                                                updateFormData={this.updateFormData}
                                            />
                                        </div>
                                    }
                                </div>

                            </form>
                            <div className="card-footer">
                                <div className="float-right" style={{marginBottom: '20px'}}>
                                    {this.props.isSaving ?

                                        <button
                                            className="btn btn-sm btn-success disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/>
                                            Đang cập nhật
                                        </button>
                                        :

                                        <button className="btn btn-sm btn-success"
                                                onClick={this.editCustomer}>
                                            <i className="material-icons">save</i> Lưu
                                        </button>
                                    }

                                    <button className="btn btn-sm btn-danger"
                                            onClick={(e) => {
                                                browserHistory.push("/good/goods/customer");
                                                e.preventDefault();
                                            }}
                                    >
                                        <i className="material-icons">cancel</i> Huỷ
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

InfoCustomerContainer.propTypes = {
    customerActions: PropTypes.object,
    isLoading: PropTypes.bool,
    isLoadingInOverlay: PropTypes.bool,
    isSaving: PropTypes.bool,
    customer: PropTypes.object,
    groupsInOverlay: PropTypes.array,
    ordersList: PropTypes.array,
    totalOrderPages: PropTypes.number,
    totalGroupCustomerPages: PropTypes.number,
    customersList: PropTypes.array,
    params: PropTypes.object,

};

function mapStateToProps(state) {
    return {
        customersList: state.customers.customersList,
        isLoading: state.customers.isLoading,
        customer: state.customers.modal.customer,
        groupsInOverlay: state.customers.groupsInOverlay,
        isSaving: state.customers.modal.isSaving,
        ordersList: state.customers.ordersList,
        totalOrderPages: state.customers.totalOrderPages,
        totalGroupCustomerPages: state.customers.totalGroupCustomerPages,
        isLoadingInOverlay: state.customers.isLoadingInOverlay,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        customerActions: bindActionCreators(customerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoCustomerContainer);
