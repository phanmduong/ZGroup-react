import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import ListChildSupplier from "./ListChildSupplier";
import * as supplierActions from './supplierActions';
import Loading from "../../components/common/Loading";
import Search from '../../components/common/Search';
import {Modal} from 'react-bootstrap';
import AddSupplierModal from './AddSupplierModal';
import * as helper from '../../helpers/helper';
import Pagination from '../../components/common/Pagination';
import {Link} from 'react-router';


class SupplierContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 10,
            query: '',
            isShowModal: false,
            isEdit: false,
        };
        this.loadSuppliers = this.loadSuppliers.bind(this);
        this.suppliersSearchChange = this.suppliersSearchChange.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.activeModal = this.activeModal.bind(this);
        this.deleteSupplier = this.deleteSupplier.bind(this);
        this.openFormDataInEdit = this.openFormDataInEdit.bind(this);
    }

    componentWillMount() {
        this.loadSuppliers(1, this.state.limit);
    }


    openAddModal(isEdit) {
        this.setState({isShowModal: true, isEdit: isEdit});
    }

    closeAddModal() {
        let supplier = {
            name: '',
            phone: '',
            email: '',
            address: '',
        };
        this.props.supplierActions.updateAddSupplierFormData(supplier);
        this.setState({isShowModal: false});
    }

    suppliersSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.supplierActions.loadSuppliers(this.state.page, this.state.limit, this.state.query, this.state.status);
        }.bind(this), 500);
    }

    updateFormData(event) {
        const field = event.target.name;
        let supplier = {...this.props.supplier};
        supplier[field] = event.target.value;
        this.props.supplierActions.updateAddSupplierFormData(supplier);
    }

    openFormDataInEdit(supplier) {
        this.props.supplierActions.updateAddSupplierFormData(supplier);
        this.openAddModal(true);
    }

    activeModal(e) {
        if ($('#form-add-supplier').valid()) {
            if (this.props.supplier.name === null || this.props.supplier.name === undefined || this.props.supplier.name === '') {
                helper.showTypeNotification("Vui lòng nhập tên", 'warning');
                return;
            }
            if (this.props.supplier.email === null || this.props.supplier.email === undefined || this.props.supplier.email === '') {
                helper.showTypeNotification("Vui lòng nhập email", 'warning');
                return;
            }
            if (this.props.supplier.phone === null || this.props.supplier.phone === undefined || this.props.supplier.phone === '') {
                helper.showTypeNotification("Vui lòng nhập số điện thoại", 'warning');
            }
            else {
                if (this.state.isEdit) {
                    this.props.supplierActions.editSupplier(this.props.supplier, this.closeAddModal);
                }
                else
                    this.props.supplierActions.addSupplier(this.props.supplier, this.closeAddModal);
            }
        }
        e.preventDefault();
    }

    loadSuppliers(page) {
        this.setState({page: page});
        this.props.supplierActions.loadSuppliers(page, this.state.limit);
    }

    deleteSupplier(id, name) {
        helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa nhà cung cấp " + name,
            function () {
                this.props.supplierActions.deleteSupplier(id);
            }.bind(this));
    }

    render() {
        let currentPage = this.state.page;
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
                                                <li className="">
                                                    <Link to="/good/goods/customer">
                                                        Khách hàng
                                                        <div className="ripple-container"/>
                                                    </Link>
                                                </li>
                                                <li className="active">
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
                                    <div>
                                        <div className="card-content">
                                            <div>
                                                <div id="property-table_wrapper"
                                                     className="dataTables_wrapper dt-bootstrap">


                                                    <div className="row"
                                                         style={{marginTop: "20px", marginBottom: "20px"}}>
                                                        <div className="col-md-4">
                                                            <a className="btn btn-rose"
                                                               onClick={() => this.openAddModal(false)}>Thêm
                                                                nhà cung cấp</a>
                                                        </div>
                                                        <div className="col-md-8" style={{marginBottom: 40}}>
                                                            <Search
                                                                onChange={this.suppliersSearchChange}
                                                                value={this.state.query}
                                                                placeholder="Tìm kiếm theo mã hàng, tên hàng hóa"
                                                                className="col-md-8"
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="card-header card-header-icon"
                                                         data-background-color="rose">
                                                        <i className="material-icons">assignment</i>
                                                    </div>
                                                    <h4 className="card-title">Danh sách nhà cung cấp</h4>
                                                    <ListChildSupplier
                                                        suppliersList={this.props.suppliersList}
                                                        deleteSupplier={this.deleteSupplier}
                                                        openFormDataInEdit={this.openFormDataInEdit}
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
                                                                loadDataPage={this.loadSuppliers}
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <Modal show={this.state.isShowModal} bsSize="lg" bsStyle="pills" onHide={this.closeAddModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <strong>Thêm nhà cung cấp</strong>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="card">
                                <form id="form-add-supplier" onSubmit={(e) => {
                                    e.preventDefault();
                                }}>
                                    <AddSupplierModal
                                        updateFormData={this.updateFormData}
                                        supplier={this.props.supplier}
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

SupplierContainer.propTypes = {
    supplierActions: PropTypes.object,
    suppliersList: PropTypes.array,
    isLoading: PropTypes.bool,
    totalPages: PropTypes.number,
    totalCount: PropTypes.number,
    isSaving: PropTypes.bool,
    supplier: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        suppliersList: state.suppliers.suppliersList,
        isLoading: state.suppliers.isLoading,
        totalPages: state.suppliers.totalPages,
        totalCount: state.suppliers.totalCount,
        isSaving: state.suppliers.modal.isSaving,
        supplier: state.suppliers.modal.supplier,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        supplierActions: bindActionCreators(supplierActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierContainer);