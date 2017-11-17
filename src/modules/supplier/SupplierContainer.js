import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import ListChildSupplier from "./ListChildSupplier";
import _ from 'lodash';
import * as supplierActions from './supplierActions';
import Loading from "../../components/common/Loading";
import Search from '../../components/common/Search';
import {Modal} from 'react-bootstrap';
import AddSupplierModal from './AddSupplierModal';
import * as helper from '../../helpers/helper';



class SupplierContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 10,
            query: '',
            isShowModal: false,
        };
        this.loadSuppliers = this.loadSuppliers.bind(this);
        this.suppliersSearchChange = this.suppliersSearchChange.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.addSupplier = this.addSupplier.bind(this);
    }

    componentWillMount() {
        this.loadSuppliers(1, this.state.limit);
    }

    componentDidUpdate() {
        this.initForm();
    }
    openAddModal() {
        this.setState({isShowModal: true});
    }

    closeAddModal() {
        let supplier = {
            name : '',
            phone : '',
            email : '',
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
            this.props.supplierActions.loadSuppliers(this.state.page, this.state.limit, this.state.query,this.state.status);
        }.bind(this), 500);
    }

    updateFormData(event) {
        const field = event.target.name;
        let supplier = {...this.props.supplier};
        supplier[field] = event.target.value;
        this.props.supplierActions.updateAddSupplierFormData(supplier);
    }

    addSupplier(e){
        if ($('#form-add-supplier').valid()) {
            if (this.props.supplier.name === null || this.props.supplier.name === undefined || this.props.supplier.name === '') {
                this.initForm();
            }
            if (this.props.supplier.email === null || this.props.supplier.email === undefined || this.props.supplier.email === '' ) {
                this.initForm();
            }
            if (this.props.supplier.phone === null || this.props.supplier.phone === undefined || this.props.supplier.phone === '' ) {
                this.initForm();
            }
            else {
                this.props.supplierActions.addSupplier(this.props.supplier, this.closeAddModal);
            }
        }
        e.preventDefault();
    }

    loadSuppliers(page, limit) {
        this.setState({page: page});
        this.props.supplierActions.loadSuppliers(page,limit);
    }
    initForm() {
        helper.setFormValidation('#form-add-supplier');
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
                                <a className="btn btn-rose" onClick={() => this.openAddModal()}>Thêm nhà cung cấp</a>
                            </div>
                            {this.props.isLoading ? <Loading/> :
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">assignment</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Danh sách nhà cung cấp</h4>
                                        <div className="table-responsive">
                                            <div id="property-table_wrapper"
                                                 className="dataTables_wrapper form-inline dt-bootstrap">
                                                <div className="row" >
                                                    <div className="col-md-12" cols={12}>
                                                        <Search
                                                            onChange={this.suppliersSearchChange}
                                                            value={this.state.query}
                                                            placeholder="Tìm kiếm theo mã hàng, tên hàng hóa"
                                                            className="col-md-12"
                                                        />
                                                    </div>
                                                </div>
                                                <ListChildSupplier
                                                    suppliersList={this.props.suppliersList}
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
                                                                        <li key={page} className="active disabled">
                                                                            <a onClick={() => this.loadSuppliers(page, limit)}>{page}</a>
                                                                        </li>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <li key={page}>
                                                                            <a onClick={() => this.loadSuppliers(page, limit)}>{page}</a>
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
                                </div>
                            }
                        </div>
                    </div>
                    <Modal show={this.state.isShowModal} bsSize="large" bsStyle="primary" onHide={this.closeAddModal}>
                        <Modal.Header>
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
                                        supplier = {this.props.supplier}
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
                                                    onClick={(e) =>this.addSupplier(e)}
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
    totalCount : PropTypes.number,
    isSaving: PropTypes.bool,
    supplier: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        suppliersList: state.suppliers.suppliersList,
        isLoading: state.suppliers.isLoading,
        totalPages: state.suppliers.totalPages,
        totalCount : state.suppliers.totalCount,
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