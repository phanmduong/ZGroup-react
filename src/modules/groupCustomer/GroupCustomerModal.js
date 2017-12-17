import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from '../../components/common/FormInputText';
import AddOverlay from "./AddOverlay";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as groupCustomerActions from './groupCustomerActions';
import {CirclePicker} from 'react-color';
import Search from '../../components/common/Search';
import Pagination from '../../components/common/Pagination';
import Loading from "../../components/common/Loading";


// import FormInputSelect from '../../components/common/FormInputSelect';
// import FormInputDate from '../../components/common/FormInputDate';
// import {GENDER} from '../../constants/constants';


class GroupCustomerModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            limit: 6,
            query: '',
            idModal : props.idModal,
        };
        this.loadCustomersInOverlay = this.loadCustomersInOverlay.bind(this);
        this.loadCustomersInModal = this.loadCustomersInModal.bind(this);
        this.editFormData = this.editFormData.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.assignCustomer = this.assignCustomer.bind(this);
        this.removeCustomer = this.removeCustomer.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }


    componentWillMount() {
        this.loadCustomersInModal(1);
    }

    loadCustomersInOverlay(page, limit, query) {
        this.props.groupCustomerActions.loadCustomersInOverlay(page, limit, query, this.props.groupCustomerForm.stringId);
    }

    loadCustomersInModal(page) {
        this.props.groupCustomerActions.loadCustomersInModal(page, this.state.limit, this.state.query ,this.state.idModal);
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
            this.props.groupCustomerActions.loadCustomersInModal(this.state.page, this.state.limit, this.state.query);
        }.bind(this), 500);
    }

    editFormData(event) {
        const field = event.target.name;
        let groupCustomerForm = {...this.props.groupCustomerForm};
        groupCustomerForm[field] = event.target.value;
        this.updateFormData(groupCustomerForm);
    }

    changeColor(color) {
        let groupCustomerForm = {...this.props.groupCustomerForm};
        groupCustomerForm.color = color.hex;
        this.updateFormData(groupCustomerForm);
    }

    updateFormData(groupCustomerForm) {
        this.props.groupCustomerActions.updateGroupCustomerFormData(groupCustomerForm);
    }

    assignCustomer(id) {
        this.props.groupCustomerActions.assignGroupCustomerFormData(id);
    }

    removeCustomer(customer) {
        this.props.groupCustomerActions.removeGroupCustomerFormData(customer);
    }


    render() {
        const currentPage = this.state.page;
        const {name, description, stringId, color , customersShowInModal} = this.props.groupCustomerForm;
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
                        <div className="col-md-8">

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

                            <Search
                                onChange={this.onSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm ..."/>


                            {this.props.isLoadingModal ? <Loading/> :
                                <table id="property-table" className="table table-hover" role="grid"
                                       aria-describedby="property-table_info">
                                    {this.props.groupCustomerForm.customers.length !== 0 ?
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


                            <Pagination
                                totalPages={this.props.totalCustomerInModalPages}
                                currentPage={currentPage}
                                loadDataPage={this.loadCustomersInModal}/>


                        </div>
                        <div className="col-md-4">
                            <div style={{
                                display: 'flex',
                                marginTop: "42px"
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
                                    stringId={stringId} // ko dung ???
                                />
                            </div>


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

                </div>
            </div>

        );
    }
}

GroupCustomerModal.propTypes = {
    isLoadingOverlay: PropTypes.bool,
    isLoadingModal: PropTypes.bool,
    groupCustomerActions: PropTypes.object,
    groupCustomerForm: PropTypes.object,
    customersList: PropTypes.array,
    totalCustomerInOverlayPages: PropTypes.number,
    totalCustomerInModalPages: PropTypes.number,
    idModal: PropTypes.number,
    isEdit: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        isLoadingOverlay: state.groupCustomers.isLoadingOverlay,
        isLoadingModal: state.groupCustomers.isLoadingModal,
        customersList: state.groupCustomers.customersList,
        groupCustomerForm: state.groupCustomers.groupCustomerForm,
        totalCustomerInOverlayPages: state.groupCustomers.totalCustomerInOverlayPages,
        totalCustomerInModalPages: state.groupCustomers.totalCustomerInModalPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        groupCustomerActions: bindActionCreators(groupCustomerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupCustomerModal);