import React from 'react';
import Search from "../../components/common/Search";
import Select from "react-select";
import InventoryGoodComponent from "./InventoryGoodComponent";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as inventoryGoodAction from './inventoryGoodAction';
import * as modalProductAction from '../productList/modals/modalProductAction';
import {dotNumber} from "../../helpers/helper";
import WareHouseModalContainer from "../productList/modals/WareHouseModalContainer";

class InventoryGoodContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            time: {
                startTime: '',
                endTime: ''
            },
            query: '',
            manufacture: null,
            category: null,
            warehouse_id: null,
            page: 1,
            status: ''
        };
        this.timeOut = null;
        this.inventoriesSearchChange = this.inventoriesSearchChange.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
        this.manufacturesSearchChange = this.manufacturesSearchChange.bind(this);
        this.getHistoryInventories = this.getHistoryInventories.bind(this);
        this.categoriesSearchChange = this.categoriesSearchChange.bind(this);
        this.showWareHouseModal = this.showWareHouseModal.bind(this);
        this.warehousesSearchChange = this.warehousesSearchChange.bind(this);
    }

    componentWillMount() {
        this.props.inventoryGoodAction.getInventories();
        this.props.inventoryGoodAction.getManufacturesInventoryGood();
        this.props.inventoryGoodAction.getCategoriesInventoryGood();
        this.props.inventoryGoodAction.getWarehouseList();
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.inventoryGoodAction.getInventories(
            page,
            this.state.query,
            this.state.manufacture,
            this.state.category,
            this.state.warehouse_id
        );
    }

    inventoriesSearchChange(value) {
        this.setState({
            query: value,
            page: 1
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.inventoryGoodAction.getInventories(
                1,
                value,
                this.state.manufacture,
                this.state.category,
                this.state.warehouse_id
            );
        }.bind(this), 500);
    }

    manufacturesSearchChange(value) {
        if (value) {
            this.setState({
                manufacture: value.id,
                page: 1
            });
            this.props.inventoryGoodAction.getInventories(
                1,
                this.state.query,
                value.id,
                this.state.category,
                this.state.warehouse_id
            );
        } else {
            this.setState({
                manufacture: null
            });
            this.props.inventoryGoodAction.getInventories(
                1,
                this.state.query,
                null,
                this.state.category,
                this.state.warehouse_id
            );
        }
    }

    categoriesSearchChange(value) {
        if (value) {
            this.setState({
                category: value.id,
                page: 1
            });
            this.props.inventoryGoodAction.getInventories(
                1,
                this.state.query,
                this.state.manufacture,
                value.id,
                this.state.warehouse_id
            );
        } else {
            this.setState({
                category: null
            });
            this.props.inventoryGoodAction.getInventories(
                1,
                this.state.query,
                this.state.manufacture,
                null,
                this.state.warehouse_id
            );
        }
    }

    warehousesSearchChange(value) {
        if (value) {
            this.setState({
                warehouse_id: value.value,
                page: 1
            });
            this.props.inventoryGoodAction.getInventories(
                1,
                this.state.query,
                this.state.manufacture,
                this.state.category,
                value.value
            );
        } else {
            this.setState({
                warehouse_id: null,
                page: 1
            });
            this.props.inventoryGoodAction.getInventories(
                1,
                this.state.query,
                this.state.manufacture,
                this.state.category,
                null
            );
        }
    }

    getHistoryInventories(inventory) {
        this.props.inventoryGoodAction.showHistoryModal();
        this.props.inventoryGoodAction.getHistoryInventories(inventory);
    }

    showWareHouseModal(product) {
        this.props.modalProductAction.showWareHouseModal();
        this.props.modalProductAction.openWareHouseTab();
        this.props.modalProductAction.handleWarehouseProduct(product);
        this.props.inventoryGoodAction.getWarehouseInventories(product);
    }

    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;
        return (
            <div className="wrapper">
                <div className="content">
                    <div className="content">
                        <div className="container-fluid">
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}>
                                            <div>
                                                <button rel="tooltip" data-placement="top" title=""
                                                        data-original-title="Remove item" type="button"
                                                        className="btn btn-success">
                                                    <i className="material-icons">print</i> In mã vạch
                                                </button>
                                                <button rel="tooltip" data-placement="top" title=""
                                                        data-original-title="Remove item" type="button"
                                                        className="btn btn-info">
                                                    <i className="material-icons">save</i> Lưu về máy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            this.props.isLoading ? (
                                                <Loading/>
                                            ) : (
                                                <div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                                        <div className="card card-stats">
                                                            <div className="card-header" data-background-color="green">
                                                                <i className="material-icons">store</i>
                                                            </div>
                                                            <div className="card-content">
                                                                <p className="category">Tổng số lượng</p>
                                                                <h3 className="card-title">{dotNumber(this.props.count)}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                                        <div className="card card-stats">
                                                            <div className="card-header" data-background-color="rose">
                                                                <i className="material-icons">equalizer</i>
                                                            </div>
                                                            <div className="card-content">
                                                                <p className="category">Tổng vốn tồn kho</p>
                                                                <h3 className="card-title">{dotNumber(this.props.totalImportMoney)}đ</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                                        <div className="card card-stats">
                                                            <div className="card-header" data-background-color="blue">
                                                                <i className="fa fa-twitter"/>
                                                            </div>
                                                            <div className="card-content">
                                                                <p className="category">Tổng giá trị tồn kho</p>
                                                                <h3 className="card-title">{dotNumber(this.props.totalMoney)}đ</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header card-header-icon"
                                                 data-background-color="rose"><i
                                                className="material-icons">assignment</i>
                                            </div>
                                            <div className="card-content"><h4 className="card-title">Danh sách
                                                hàng tồn kho</h4>
                                                <div className="row">
                                                    <Search
                                                        onChange={this.inventoriesSearchChange}
                                                        value={this.state.query}
                                                        placeholder="Nhập tên hoặc mã hàng hoá để tìm"
                                                        className="col-md-12"
                                                    />
                                                    <div className="form-group col-md-4">
                                                        <label className="label-control">Tìm theo nhà sản xuất</label>
                                                        <Select
                                                            name="manufactures"
                                                            value={this.state.manufacture}
                                                            options={this.props.manufactures.map((manufacture) => {
                                                                return {
                                                                    ...manufacture,
                                                                    value: manufacture.id,
                                                                    label: manufacture.name
                                                                };
                                                            })}
                                                            onChange={this.manufacturesSearchChange}
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label className="label-control">Tìm theo nhóm hàng hóa</label>
                                                        <Select
                                                            name="categories"
                                                            value={this.state.category}
                                                            options={this.props.categories.map((category) => {
                                                                return {
                                                                    ...category,
                                                                    value: category.id,
                                                                    label: category.label
                                                                };
                                                            })}
                                                            onChange={this.categoriesSearchChange}
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label className="label-control">Tìm theo kho hàng</label>
                                                        <Select
                                                            name="warehouses"
                                                            value={this.state.warehouse_id}
                                                            options={this.props.warehousesList.map((warehouse) => {
                                                                return {
                                                                    ...warehouse,
                                                                    value: warehouse.id,
                                                                    label: warehouse.name
                                                                };
                                                            })}
                                                            onChange={this.warehousesSearchChange}
                                                        />
                                                    </div>
                                                    <br/>
                                                </div>
                                                <br/>
                                                {
                                                    this.props.isLoading ? <Loading/> : (
                                                        <InventoryGoodComponent
                                                            inventories={this.props.inventories}
                                                            showWareHouseModal={this.showWareHouseModal}/>
                                                    )
                                                }
                                            </div>
                                            <div className="row float-right">
                                                <div className="col-md-12" style={{textAlign: 'right'}}>
                                                    <b style={{marginRight: '15px'}}>
                                                        Hiển thị kêt quả từ {first}
                                                        - {end}/{this.props.totalCount}</b><br/>
                                                    <Pagination
                                                        totalPages={this.props.totalPages}
                                                        currentPage={this.props.currentPage}
                                                        loadDataPage={this.loadOrders}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="container-fluid">
                        <nav className="pull-left">
                            <ul>
                                <li>
                                    <a href="#">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Company
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Portfolio
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </footer>
                <WareHouseModalContainer
                    showWareHouseModal={this.showWareHouseModal}/>
            </div>

        );
    }
}

InventoryGoodContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    inventories: PropTypes.array.isRequired,
    inventoryGoodAction: PropTypes.object.isRequired,
    modalProductAction: PropTypes.object.isRequired,
    manufactures: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    totalImportMoney: PropTypes.number.isRequired,
    totalMoney: PropTypes.number.isRequired,
    warehousesList: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.inventoryGood.isLoading,
        inventories: state.inventoryGood.inventories,
        manufactures: state.inventoryGood.manufactures,
        categories: state.inventoryGood.categories,
        totalPages: state.inventoryGood.totalPages,
        currentPage: state.inventoryGood.currentPage,
        totalCount: state.inventoryGood.totalCount,
        limit: state.inventoryGood.limit,
        count: state.inventoryGood.count,
        totalImportMoney: state.inventoryGood.totalImportMoney,
        totalMoney: state.inventoryGood.totalMoney,
        warehousesList: state.inventoryGood.warehousesList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        inventoryGoodAction: bindActionCreators(inventoryGoodAction, dispatch),
        modalProductAction: bindActionCreators(modalProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryGoodContainer);
