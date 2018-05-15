import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import * as createProductAction from './createProductAction';
import FormInputText from "../../components/common/FormInputText";
import * as helper from "../../helpers/helper";
import Search from "../../components/common/Search";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";

class ManufacturesManageModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: null,
            query: '',
            page: 1
        };
        this.timeOut = null;
        this.createManufactureModal = this.createManufactureModal.bind(this);
        this.handleName = this.handleName.bind(this);
        this.deleteManufactureModal = this.deleteManufactureModal.bind(this);
        this.manufacturesSearchChange = this.manufacturesSearchChange.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
    }

    handleName(e) {
        this.setState({
            name: e.target.value
        });
    }

    createManufactureModal(name) {
        if (helper.isNull(name)) {
            helper.showErrorNotification("Bạn cần nhập tên nhà sản xuất");
        } else {
            this.setState({
                query: '',
                page: 1,
                name: null
            });
            this.props.createProductAction.createManufactureModal(name);
        }
    }

    deleteManufactureModal(manufacture) {
        helper.confirm("error", "Xóa nhà sản xuất", "Bạn có chắc muốn xóa nhà sản xuất này", () => {
            this.props.createProductAction.deleteManufactureModal(manufacture);
        });
    }

    manufacturesSearchChange(value) {
        this.setState({
            query: value,
            page: 1
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.createProductAction.filterManufacturesModal(
                1,
                value
            );
        }.bind(this), 50);
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.createProductAction.filterManufacturesModal(
            page,
            this.state.query
        );
    }

    render() {
        let first = this.props.totalCountManufactures ? (this.props.currentPageManufactures - 1) * 10 + 1 : 0;
        let end = this.props.currentPageManufactures < this.props.totalPagesManufactures ? this.props.currentPageManufactures * 10 : this.props.totalCountManufactures;
        return (
            <Modal show={this.props.manufacturesManageModal}
                   onHide={() => this.props.createProductAction.showManufacturesManageModal()}>
                <a onClick={() => this.props.createProductAction.showManufacturesManageModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Quản lý nhà sản xuất</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-9">
                            <FormInputText name="name"
                                           value={this.state.name}
                                           placeholder="Nhập tên nhà sản xuất"
                                           updateFormData={this.handleName}/>
                        </div>
                        <div className="col-md-3">
                            <button type="button"
                                    className="btn btn-rose btn-md"
                                    onClick={() => this.createManufactureModal(this.state.name)}>
                                <i className="material-icons">save</i>
                                Lưu
                            </button>
                        </div>
                    </div>
                    <Search
                        onChange={this.manufacturesSearchChange}
                        value={this.state.query}
                        placeholder="Nhập tên nhà sản xuất để tìm"
                    />
                    {
                        this.props.isLoadingManufacture ? (
                            <Loading/>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                    <tr className="text-rose">
                                        <th className="col-lg-10 col-md-10 col-sm-10 col-xs-10">Tên nhà sản xuất</th>
                                        <th className="col-lg-2 col-md-2 col-sm-2 col-xs-2"/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.manufacturesRender && this.props.manufacturesRender.map((manufacture, id) => {
                                            return (
                                                <tr key={id}>
                                                    <td>{manufacture.name}</td>
                                                    <td>
                                                        <a style={{color: "#878787"}}
                                                           data-toggle="tooltip" title=""
                                                           type="button" rel="tooltip"
                                                           data-original-title="Xoá"
                                                           onClick={() => this.deleteManufactureModal(manufacture)}>
                                                            <i className="material-icons">delete</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                    <div style={{textAlign: 'right'}}>
                        <b style={{marginRight: '15px'}}>
                            Hiển thị kêt quả từ {first}
                            - {end}/{this.props.totalCountManufactures}</b><br/>
                        <Pagination
                            totalPages={this.props.totalPagesManufactures}
                            currentPage={this.props.currentPageManufactures}
                            loadDataPage={this.loadOrders}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

ManufacturesManageModal.propTypes = {
    manufacturesManageModal: PropTypes.bool.isRequired,
    createProductAction: PropTypes.object.isRequired,
    manufacturesRender: PropTypes.array.isRequired,
    isLoadingManufacture: PropTypes.bool.isRequired,
    totalPagesManufactures: PropTypes.number.isRequired,
    currentPageManufactures: PropTypes.number.isRequired,
    totalCountManufactures: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        manufacturesManageModal: state.createProduct.manufacturesManageModal,
        manufacturesRender: state.createProduct.manufacturesRender,
        isLoadingManufacture: state.createProduct.isLoadingManufacture,
        totalPagesManufactures: state.createProduct.totalPagesManufactures,
        currentPageManufactures: state.createProduct.currentPageManufactures,
        totalCountManufactures: state.createProduct.totalCountManufactures,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createProductAction: bindActionCreators(createProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturesManageModal);
