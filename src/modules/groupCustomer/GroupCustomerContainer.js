import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import GroupCustomerItem from './GroupCustomerItem';
import {Modal} from 'react-bootstrap';
import GroupCustomerModal from './GroupCustomerModal';
import * as groupCustomerActions from './groupCustomerActions';
import Search from '../../components/common/Search';
import Pagination from '../../components/common/Pagination';
import Loading from "../../components/common/Loading";
import * as helper from '../../helpers/helper';


class GroupCustomerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 6,
            query: '',
            isShowModal: false,
            idModal: 1,
        };

        this.openAddModal = this.openAddModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.loadGroupCustomer = this.loadGroupCustomer.bind(this);
        this.groupCustomerSearchChange = this.groupCustomerSearchChange.bind(this);
        this.activeModal = this.activeModal.bind(this);
        this.deleteGroupCustomer = this.deleteGroupCustomer.bind(this);
    }

    componentWillMount() {
        this.loadGroupCustomer(1, this.state.limit);
    }

    groupCustomerSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
            isEdit: false,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.groupCustomerActions.loadGroupCustomer(this.state.page, this.state.limit, this.state.query);
        }.bind(this), 500);
    }

    loadGroupCustomer(page) {
        this.setState({page: page});
        this.props.groupCustomerActions.loadGroupCustomer(page, this.state.limit, this.state.query);
    }


    openAddModal() {
        // set dữ liệu về rỗng trước khi mở modal add
        let groupCustomerForm = {
            id: 0,
            name: '',
            description: '',
            stringId: [],
            color: ''
        };
        this.props.groupCustomerActions.updateGroupCustomerFormData(groupCustomerForm);
        this.setState({isShowModal: true});
    }


    closeModal() {
        this.setState({isShowModal: false});
    }

    activeModal(e) {
        if ($('#form-add-group-customer').valid()) {
            if (this.props.groupCustomerForm.name === null || this.props.groupCustomerForm.name === undefined || this.props.groupCustomerForm.name === '') {
                helper.showTypeNotification("Vui lòng nhập tên nhóm khách hàng", 'warning');
                return ;
            }
            if (this.props.groupCustomerForm.order_value === null || this.props.groupCustomerForm.order_value === undefined || this.props.groupCustomerForm.order_value === '') {
                helper.showTypeNotification("Vui lòng nhập tiền mua theo đơn", 'warning');
                return ;
            }
            if (this.props.groupCustomerForm.delivery_value === null || this.props.groupCustomerForm.delivery_value === undefined || this.props.groupCustomerForm.delivery_value === '') {
                helper.showTypeNotification("Vui lòng nhập tiền mua hàng sẵn", 'warning');
                return ;
            }
            if (this.props.groupCustomerForm.currency_value === null || this.props.groupCustomerForm.currency_value === undefined || this.props.groupCustomerForm.currency_value === '') {
                helper.showTypeNotification("Vui lòng nhập tỉ giá", 'warning');
                return ;
            }
            if (this.props.groupCustomerForm.ship_price === null || this.props.groupCustomerForm.ship_price === undefined || this.props.groupCustomerForm.ship_price === '') {
                helper.showTypeNotification("Vui lòng nhập giá đặt hàng", 'warning');
                return ;
            }
                this.props.groupCustomerActions.addGroupCustomer(this.props.groupCustomerForm, this.state.page);
        }
        e.preventDefault();
    }

    deleteGroupCustomer(id, name) {
        helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa nhóm " + name,
            function () {
                this.props.groupCustomerActions.deleteGroupCustomer(id);
            }.bind(this));
    }

    render() {
        const currentPage = this.state.page;

        return (
            <div className="container-fluid">
                <div className="card">


                    <div className="card-header card-header-tabs" data-background-color="rose">
                        <div className="nav-tabs-navigation">
                            <div className="nav-tabs-wrapper">
                                <ul className="nav nav-tabs" data-tabs="tabs">
                                    <li className="">
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
                                    <li className="active">
                                        <Link to="/good/goods/group-customer">
                                            Nhóm khách hàng
                                            <div className="ripple-container"/>
                                        </Link>
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </div>


                    {/*//          ADD*/}


                    <div className="card-content">
                        <div className="row" style={{marginBottom: 60}}>
                            <div className="col-md-3">
                                <div style={{marginTop: 15}}>
                                    <a className="btn btn-rose" onClick={() => {
                                        this.openAddModal();
                                    }}>Thêm nhóm khách hàng</a>
                                </div>
                            </div>


                            {/*//      SEARCH*/}


                            <div className="col-md-9" style={{marginTop: "0px", paddingLeft: 100}}>
                                <div className="form-group">
                                    <Search
                                        onChange={this.groupCustomerSearchChange}
                                        value={this.state.query}
                                        placeholder="Tìm kiếm nhóm khách hàng          "
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="row" style={{paddingLeft: 20}}>
                            <div className="card-header card-header-icon " style={{marginBottom: 20}}
                                 data-background-color="rose">
                                <i className="material-icons">group</i>
                            </div>
                            <h4 className="card-title">Danh sách nhóm khách hàng</h4>
                        </div>

                        {/*//      GROUPITEM*/}


                        {this.props.isLoading ? <Loading/> :
                            <div className="row">
                                {this.props.groupCustomersList.map((groupCustomer, index) => {
                                    return (
                                        <GroupCustomerItem
                                            key={index}
                                            openEditModal={this.openEditModal}
                                            groupCustomerItem={groupCustomer}
                                            deleteGroupCustomer={this.deleteGroupCustomer}
                                        />
                                    );
                                })}
                            </div>
                        }


                        {/*//          PAGINATION*/}


                        <div className="row" style={{marginTop: 50}}>
                            <div className="col-sm-5">
                                <div className="dataTables_info" id="property-table_info"
                                     role="status" aria-live="polite">Hiển trị
                                    trang {currentPage} trên tổng số
                                    {' ' + this.props.totalGroupCustomerPages} trang
                                </div>
                            </div>
                            <div className="col-sm-7" style={{textAlign: 'right'}}>
                                <Pagination
                                    totalPages={this.props.totalGroupCustomerPages}
                                    currentPage={currentPage}
                                    loadDataPage={this.loadGroupCustomer}
                                />
                            </div>
                        </div>


                    </div>
                </div>


                {/*//              MODAL*/}


                <Modal show={this.state.isShowModal} bsSize="large" bsStyle="primary" onHide={this.closeModal}>
                    <Modal.Body>
                        <div className="card">
                            <form id="form-add-group-customer">
                                <GroupCustomerModal
                                />
                                <div className="row" style={{marginLeft: 30, marginBottom: 20}}>
                                    <div className="col-md-8"/>
                                    <div className="col-md-4">
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
                            </form>
                        </div>
                    </Modal.Body>


                </Modal>

            </div>
        )
            ;
    }
}


GroupCustomerContainer.propTypes = {
    isLoading: PropTypes.bool,
    isSaving: PropTypes.bool,
    groupCustomerActions: PropTypes.object,
    totalGroupCustomerPages: PropTypes.number,
    groupCustomersList: PropTypes.array,
    groupCustomerForm: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoading: state.groupCustomers.isLoading,
        totalGroupCustomerPages: state.groupCustomers.totalGroupCustomerPages,
        groupCustomersList: state.groupCustomers.groupCustomersList,
        groupCustomerForm: state.groupCustomers.groupCustomerForm,
        isSaving: state.groupCustomers.isSaving,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        groupCustomerActions: bindActionCreators(groupCustomerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupCustomerContainer);