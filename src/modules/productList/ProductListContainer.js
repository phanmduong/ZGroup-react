import React from 'react';
import {connect} from 'react-redux';
import * as productListAction from './productListAction';
import {bindActionCreators} from 'redux';
import ProductListComponent from './ProductListComponent';
import PropTypes from 'prop-types';
import * as modalProductAction from './modals/modalProductAction';
import Loading from "../../components/common/Loading";
import {Link} from "react-router";
import Search from "../../components/common/Search";
import FormInputDate from "../../components/common/FormInputDate";
import * as helper from '../../helpers/helper';
import Select from 'react-select';
import Pagination from "../../components/common/Pagination";

class ProductListContainer extends React.Component {
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
        this.table = null;
        this.showPriceModal = this.showPriceModal.bind(this);
        this.showWareHouseModal = this.showWareHouseModal.bind(this);
        this.showAvatarModal = this.showAvatarModal.bind(this);
        this.setTable = this.setTable.bind(this);
        this.updateFormDate = this.updateFormDate.bind(this);
        this.productsSearchChange = this.productsSearchChange.bind(this);
        this.manufacturesSearchChange = this.manufacturesSearchChange.bind(this);
        this.categoriesSearchChange = this.categoriesSearchChange.bind(this);
        this.productsPageChange = this.productsPageChange.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
        this.statusesSearchChange = this.statusesSearchChange.bind(this);
    }

    componentWillMount() {
        this.props.productListAction.getProducts();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modalUpdated) {
            this.props.productListAction.getProducts();
        }
    }

    updateFormDate(event) {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;
        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.props.productListAction.getProducts(
                1,
                this.state.query,
                time.startTime,
                time.endTime,
                this.state.manufacture,
                this.state.category,
                this.state.status
            );
            this.setState({time: time});
        } else {
            this.setState({time: time});
        }
    }

    productsSearchChange(value) {
        this.setState({
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.productListAction.getProducts(
                1,
                value,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.manufacture,
                this.state.category,
                this.state.status
            );
        }.bind(this), 500);
    }

    manufacturesSearchChange(value) {
        this.setState({
            manufacture: value.id
        });
        this.props.productListAction.getProducts(
            1,
            this.state.query,
            this.state.time.startTime,
            this.state.time.endTime,
            value.id,
            this.state.category,
            this.state.status
        );
    }

    categoriesSearchChange(value) {
        this.setState({
            category: value.id
        });
        this.props.productListAction.getProducts(
            1,
            this.state.query,
            this.state.time.startTime,
            this.state.time.endTime,
            this.state.manufacture,
            value.id,
            this.state.status
        );
    }

    statusesSearchChange(value) {
        this.setState({
            status: value.value
        });
        this.props.productListAction.getProducts(
            1,
            this.state.query,
            this.state.time.startTime,
            this.state.time.endTime,
            this.state.manufacture,
            this.state.category,
            value.value
        );
    }

    productsPageChange(value) {
        this.setState({page: value});
        this.props.productListAction.getProducts(
            value,
            this.state.query,
            this.state.time.startTime,
            this.state.time.endTime,
            this.state.manufacture,
            this.state.category,
            this.state.status
        );
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.productListAction.getProducts(
            page,
            this.state.query,
            this.state.time.startTime,
            this.state.time.endTime,
            this.state.manufacture,
            this.state.category,
            this.state.status
        );
    }

    showPriceModal(product) {
        this.props.modalProductAction.showPriceModal();
        this.props.modalProductAction.handleProduct(product);
    }

    showWareHouseModal(product) {
        this.props.modalProductAction.showWareHouseModal();
        this.props.modalProductAction.handleProduct(product);
    }

    showAvatarModal(product) {
        this.props.modalProductAction.showAvatarModal();
        this.props.modalProductAction.handleProduct(product);
        this.props.modalProductAction.handleManufacture(product.manufacture_id);
        this.props.modalProductAction.handleCategory(product.good_category_id);
        this.props.modalProductAction.handleStatus(product.status);
    }

    setTable(table) {
        this.table = table;
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
                                                <Link
                                                    to="/good/create"
                                                    rel="tooltip" data-placement="top" title=""
                                                    data-original-title="Thêm sản phẩm" type="button"
                                                    className="btn btn-rose">
                                                    Thêm sản phẩm
                                                </Link>
                                            </div>
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
                                                sản phẩm</h4>
                                                <div className="row">
                                                    <Search
                                                        onChange={this.productsSearchChange}
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
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">Tìm theo trạng thái</label>
                                                        <Select
                                                            name="status"
                                                            value={this.state.status}
                                                            options={this.props.statuses.map((status) => {
                                                                return {
                                                                    ...status
                                                                };
                                                            })}
                                                            onChange={this.statusesSearchChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <FormInputDate
                                                            label="Từ ngày"
                                                            name="startTime"
                                                            updateFormData={this.updateFormDate}
                                                            id="form-start-time"
                                                            value={this.state.time.startTime}
                                                            maxDate={this.state.time.endTime}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <FormInputDate
                                                            label="Đến ngày"
                                                            name="endTime"
                                                            updateFormData={this.updateFormDate}
                                                            id="form-end-time"
                                                            value={this.state.time.endTime}
                                                            minDate={this.state.time.startTime}
                                                        />
                                                    </div>
                                                    <br/>
                                                </div>
                                                <br/>
                                                {
                                                    this.props.isLoading ? <Loading/> : (
                                                        <ProductListComponent
                                                            setTable={this.setTable}
                                                            products={this.props.products}
                                                            manufactures={this.props.manufactures}
                                                            categories={this.props.categories}
                                                            showPriceModal={this.showPriceModal}
                                                            showWareHouseModal={this.showWareHouseModal}
                                                            showAvatarModal={this.showAvatarModal}/>
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
                                                            className="btn btn-danger btn-simple disabled"
                                                    >Đang kinh doanh: {this.props.productsBusiness}
                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-danger btn-simple disabled"
                                                    >Ngừng kinh doanh: {this.props.productsNotBusiness}
                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-danger btn-simple disabled"
                                                    >Hiển thị ra web: {this.props.productsDisplay}
                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-danger btn-simple disabled"
                                                    >Không hiển thị ra web: {this.props.productsNotDisplay}
                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-danger btn-simple disabled"
                                                    >Đã xóa: {this.props.productsDeleted}
                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-info btn-simple"
                                                            onClick={() => {
                                                                this.setState({
                                                                    query: '',
                                                                    manufacture: '',
                                                                    category: '',
                                                                    page: '',
                                                                    status: ''
                                                                });
                                                                this.props.productListAction.getProducts();
                                                            }}
                                                    >Tổng sản phẩm: {this.props.productsTotal}

                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-success btn-simple disabled"
                                                    >Tổng số lượng : {this.props.productsQuantity}
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

ProductListContainer.propTypes = {
    productListAction: PropTypes.object.isRequired,
    modalProductAction: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    modalUpdated: PropTypes.bool.isRequired,
    productsTotal: PropTypes.number.isRequired,
    productsBusiness: PropTypes.number.isRequired,
    productsNotBusiness: PropTypes.number.isRequired,
    productsDisplay: PropTypes.number.isRequired,
    productsNotDisplay: PropTypes.number.isRequired,
    productsDeleted: PropTypes.number.isRequired,
    productsQuantity: PropTypes.number.isRequired,
    categories: PropTypes.array.isRequired,
    manufactures: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    statuses: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        products: state.productList.products,
        productsTotal: state.productList.productsTotal,
        productsBusiness: state.productList.productsBusiness,
        productsNotBusiness: state.productList.productsNotBusiness,
        productsDisplay: state.productList.productsDisplay,
        productsNotDisplay: state.productList.productsNotDisplay,
        productsDeleted: state.productList.productsDeleted,
        productsQuantity: state.productList.productsQuantity,
        isLoading: state.productList.isLoading,
        modalUpdated: state.productList.modalInProduct.modalUpdated,
        categories: state.productList.categories,
        manufactures: state.productList.manufactures,
        totalPages: state.productList.totalPages,
        currentPage: state.productList.currentPage,
        limit: state.productList.limit,
        totalCount: state.productList.totalCount,
        statuses: state.productList.statuses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        productListAction: bindActionCreators(productListAction, dispatch),
        modalProductAction: bindActionCreators(modalProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
