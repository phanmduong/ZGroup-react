import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from '../../components/common/FormInputText';
import AddOverlay from "./AddOverlay";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as groupCustomerActions from './groupCustomerActions';
// import FormInputSelect from '../../components/common/FormInputSelect';
// import FormInputDate from '../../components/common/FormInputDate';
// import {GENDER} from '../../constants/constants';


class GroupCustomerModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadCustomers = this.loadCustomers.bind(this);
        this.editFormData = this.editFormData.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.assignCustomer = this.assignCustomer.bind(this);
        this.removeCustomer = this.removeCustomer.bind(this);
    }




    loadCustomers(page , limit , query){
        this.props.groupCustomerActions.loadCustomers(page , limit , query, this.props.groupCustomerForm.stringId);
    }




    editFormData(event) {
        const field = event.target.name;
        let groupCustomerForm = {...this.props.groupCustomerForm};
        groupCustomerForm[field] = event.target.value;
        this.updateFormData(groupCustomerForm);
    }
    updateFormData(groupCustomerForm) {
        this.props.groupCustomerActions.updateGroupCustomerFormData(groupCustomerForm);
    }
    assignCustomer(id){
        this.props.groupCustomerActions.assignGroupCustomerFormData(id);
    }
    removeCustomer(customer){
        this.props.groupCustomerActions.removeGroupCustomerFormData(customer);
    }






    render() {
        const {name , description , customers , stringId} = this.props.groupCustomerForm;
        return (
            <div>
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">people</i>
                </div>
                <div className="card-content">
                    <h4 className="card-title">
                        {this.props.isEdit ? "Sửa nhóm khách hàng" : "Thêm nhóm khách hàng"}
                    </h4>
                    <div className="row">
                        <div className="col-md-9">

                            <FormInputText
                                label="Tên nhóm"
                                name="name"
                                updateFormData={this.editFormData}
                                required={true}
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




                            <table id="property-table" className="table table-hover" role="grid"
                                   aria-describedby="property-table_info">
                                {this.props.groupCustomerForm.customers.length !== 0 ?
                                    <thead>

                                    <tr className="text-rose" role="row">
                                        <th>Tên khách hàng</th>
                                        <th>Số điện thoại</th>
                                        <th>Địa chỉ</th>
                                        <th> Ngày mua cuối</th>
                                        <th>Tổng tiền hàng</th>
                                        <th> Tiền trả hàng</th>
                                        <th> Tiền nợ</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    : null
                                }
                                <tbody>
                                {customers && customers.map(
                                    (customer) => {
                                        return (
                                            <tr role="row" className="even" key={customer.id}>
                                                <td className="sorting_1">{customer.name}</td>
                                                <td>{customer.phone}</td>
                                                <td>{customer.address}</td>
                                                <td>{customer.last_order}</td>
                                                <td>{customer.total_money}</td>
                                                <td>{customer.total_paid_money}</td>
                                                <td>{customer.debt}</td>
                                                <td>
                                                    <a>
                                                    <i className="material-icons"
                                                    onClick={()=> {this.removeCustomer(customer);}}
                                                    >delete</i>
                                                </a>
                                                </td>
                                            </tr>

                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-3">
                            <div style={{
                                display: 'flex',
                                marginTop: "42px"
                            }}>
                                <AddOverlay
                                    items={this.props.customersList}
                                    name = "Khách hàng"
                                    isSearch={true}
                                    isPagination={true}
                                    isLoadingOverlay={this.props.isLoadingOverlay}
                                    icon="people"
                                    loadFunction = {this.loadCustomers}
                                    totalPages={this.props.totalCustomerPages}
                                    formData={this.props.groupCustomerForm}
                                    fieldName="stringId"
                                    fieldName2="customers"
                                    updateFormData = {this.updateFormData}
                                    assignCustomer = {this.assignCustomer}
                                    stringId={stringId}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

GroupCustomerModal.propTypes = {
    isLoadingOverlay: PropTypes.bool,
    groupCustomerActions: PropTypes.object,
    groupCustomerForm: PropTypes.object,
    customersList : PropTypes.array,
    totalCustomerPages : PropTypes.number,
    isEdit : PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        isLoadingOverlay: state.groupCustomers.isLoadingOverlay,
        customersList: state.groupCustomers.customersList,
        groupCustomerForm: state.groupCustomers.groupCustomerForm,
        totalCustomerPages: state.groupCustomers.totalCustomerPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        groupCustomerActions: bindActionCreators(groupCustomerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupCustomerModal);