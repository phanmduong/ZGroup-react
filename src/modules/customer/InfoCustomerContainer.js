import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as customerActions from './customerActions';
import Loading from "../../components/common/Loading";
import * as helper from '../../helpers/helper';
import OrdersListCustomerComponent from './OrdersListCustomerComponent';
import InfoCustomerComponent from './InfoCustomerComponent';




class InfoCustomerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page : 1,
            limit : 5,
            id : this.props.params.customerId,
        };
        this.loadOrdersCustomer = this.loadOrdersCustomer.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.loadInfoCustomer = this.loadInfoCustomer.bind(this);
    }




    componentWillMount() {
        this.loadInfoCustomer();
        this.loadOrdersCustomer(1);
    }

    loadInfoCustomer(){
        this.props.customerActions.loadInfoCustomer(this.state.id);
    }

    loadOrdersCustomer(page) {
        this.setState({page: page});
        this.props.customerActions.loadOrdersCustomer(this.state.id,this.state.page, this.state.limit);
    }
    updateFormData(event) {
        const field = event.target.name;
        let customer = {...this.props.customer};
        customer[field] = event.target.value;
        this.props.customerActions.updateAddCustomerFormData(customer);
    }

    editCustomer(e) {
        if ($('#form-edit-customer').valid()) {
            if (this.props.customer.birthday === null || this.props.customer.birthday === undefined || this.props.customer.birthday === '') {
                helper.showTypeNotification("Vui lòng chọn sinh nhật", 'warning');
                return;
            }
            if (this.props.customer.gender === null || this.props.customer.gender === undefined || this.props.customer.gender === '') {
                helper.showTypeNotification("Vui lòng chọn giới tính", 'warning');
            }
            else {
                    this.props.customerActions.editCustomer(this.props.customer);
            }
        }
        e.preventDefault();
    }





    render(){
        let currentPage = this.state.page;
        return(
            <div>





                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Chi tiết khách hàng</h4>
                                {this.props.isLoading ? <Loading/> :

                                    <div>
                                        <OrdersListCustomerComponent
                                            ordersList={this.props.ordersList}
                                            loadOrdersCustomer = {this.loadOrdersCustomer}
                                            currentPage = {currentPage}
                                            totalOrderPages = {this.props.totalOrderPages}
                                        />
                                    </div>
                                }

                            </div>
                        </div>
                    </div>







                    <div className="col-md-4">
                        <div className="card">
                            <form id="form-edit-customer" >
                                <div className="card-header card-header-icon" data-background-color="rose"><i
                                className="material-icons">announcement</i></div>
                            <div className="card-content">
                                <h4 className="card-title">Thông tin</h4>
                                {this.props.isLoading ? <Loading/> :

                                    <div>
                                        <InfoCustomerComponent
                                        customer = {this.props.customer}
                                        updateFormData = {this.updateFormData}
                                        />
                                    </div>
                                }
                            </div>
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
                                                onClick={(e) => {this.editCustomer(e);}}
                                        >
                                            <i className="material-icons">save</i> Lưu
                                        </button>
                                    }

                                    <button className="btn btn-sm btn-danger">
                                        <i className="material-icons">cancel</i> Huỷ
                                    </button>
                                </div>
                            </div>
                            </form>




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
    isSaving: PropTypes.bool,
    customer: PropTypes.object,
    ordersList : PropTypes.array,
    totalOrderPages : PropTypes.number,
    customersList : PropTypes.array,
};

function mapStateToProps(state) {
    return {
        customersList : state.customers.customersList,
        isLoading: state.customers.isLoading,
        customer: state.customers.modal.customer,
        isSaving : state.customers.modal.isSaving,
        ordersList : state.customers.ordersList,
        totalOrderPages : state.customers.totalOrderPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        customerActions: bindActionCreators(customerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoCustomerContainer);
