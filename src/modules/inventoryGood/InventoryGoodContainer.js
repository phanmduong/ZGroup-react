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
import {dotNumber} from "../../helpers/helper";

class InventoryGoodContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            time: {
                startTime: '',
                endTime: ''
            },
            query: '',
            manufacture: '',
            category: '',
            page: '',
            status: ''
        };
        this.timeOut = null;
        this.inventoriesSearchChange = this.inventoriesSearchChange.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
        this.manufacturesSearchChange = this.manufacturesSearchChange.bind(this);
        this.getHistoryInventories = this.getHistoryInventories.bind(this);
        this.categoriesSearchChange = this.categoriesSearchChange.bind(this);
    }

    componentWillMount() {
        this.props.inventoryGoodAction.getInventories();
        this.props.inventoryGoodAction.getManufacturesInventoryGood();
        this.props.inventoryGoodAction.getCategoriesInventoryGood();
        this.props.inventoryGoodAction.getInfoInventories();
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.inventoryGoodAction.getInventories(
            page,
            this.state.query,
            this.state.manufacture,
            this.state.category
        );
    }

    inventoriesSearchChange(value) {
        this.setState({
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.inventoryGoodAction.getInventories(
                1,
                value,
                this.state.manufacture,
                this.state.category
            );
        }.bind(this), 500);
    }

    manufacturesSearchChange(value) {
        this.setState({
            manufacture: value.id
        });
        this.props.inventoryGoodAction.getInventories(
            1,
            this.state.query,
            value.id,
            this.state.category
        );
    }

    categoriesSearchChange(value) {
        this.setState({
            category: value.id
        });
        this.props.inventoryGoodAction.getInventories(
            1,
            this.state.query,
            this.state.manufacture,
            value.id
        );
    }

    getHistoryInventories(id) {
        this.props.inventoryGoodAction.getHistoryInventories(id);
    }

    render() {
        let first = (this.props.currentPage - 1) * this.props.limit + 1;
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
                                                        <label className="control-label">Tìm theo nhà sản xuất</label>
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
                                                        <label className="control-label">Tìm theo nhóm hàng hóa</label>
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
                                                    <br/>
                                                </div>
                                                <br/>
                                                {
                                                    this.props.isLoading ? <Loading/> : (
                                                        <InventoryGoodComponent
                                                            inventories={this.props.inventories}
                                                            getHistoryInventories={this.getHistoryInventories}/>
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
                                            <div className="card-footer">
                                                <div style={{float: "right"}}>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-success btn-simple disabled"
                                                    >Tổng số lượng: {dotNumber(this.props.count)}
                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-info btn-simple disabled"
                                                    >Tổng vốn tồn kho: {dotNumber(this.props.totalImportMoney)}đ
                                                        {dotNumber(this.props.totalImportMoney)}đ
                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-danger btn-simple disabled"
                                                    >Tổng giá trị tồn kho: {dotNumber(this.props.totalMoney)}đ
                                                        <div className="ripple-container"/>
                                                    </button>
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
            </div>

        );
    }
}

InventoryGoodContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    inventories: PropTypes.array.isRequired,
    inventoryGoodAction: PropTypes.object.isRequired,
    manufactures: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    totalImportMoney: PropTypes.number.isRequired,
    totalMoney: PropTypes.number.isRequired
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
        totalMoney: state.inventoryGood.totalMoney
    };
}

function mapDispatchToProps(dispatch) {
    return {
        inventoryGoodAction: bindActionCreators(inventoryGoodAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryGoodContainer);
