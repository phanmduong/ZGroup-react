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
import * as inventoryGoodAction from '../inventoryGood/inventoryGoodAction';

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
            page: 1,
            status: {
                sale: '',
                display: '',
                highlight: ''
            }
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
        this.saleStatusChange = this.saleStatusChange.bind(this);
        this.displayStatusChange = this.displayStatusChange.bind(this);
        this.highlightStatusChange = this.highlightStatusChange.bind(this);
    }

    componentWillMount() {
        this.props.productListAction.getProducts();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modalUpdated) {
            this.props.productListAction.getProducts(
                this.state.page,
                this.state.query,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.manufacture,
                this.state.category,
                this.state.status
            );
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
            this.setState({
                time: time,
                page: 1
            });
        } else {
            this.setState({
                time: time,
                page: 1
            });
        }
    }

    productsSearchChange(value) {
        this.setState({
            query: value,
            page: 1
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
        if (value) {
            this.setState({
                manufacture: value.id,
                page: 1
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
        } else {
            this.setState({
                manufacture: null,
                page: 1
            });
            this.props.productListAction.getProducts(
                1,
                this.state.query,
                this.state.time.startTime,
                this.state.time.endTime,
                null,
                this.state.category,
                this.state.status
            );
        }
    }

    categoriesSearchChange(value) {
        if (value) {
            this.setState({
                category: value.id,
                page: 1
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
        } else {
            this.setState({
                category: null
            });
            this.props.productListAction.getProducts(
                1,
                this.state.query,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.manufacture,
                null,
                this.state.status
            );
        }
    }

    saleStatusChange(value) {
        let status = {...this.state.status};
        if (value) {
            status.sale = value.value;
            this.setState({
                status: status,
                page: 1
            });
            this.props.productListAction.getProducts(
                1,
                this.state.query,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.manufacture,
                this.state.category,
                status
            );
        } else {
            status.sale = null;
            this.setState({
                status: status,
                page: 1
            });
            this.props.productListAction.getProducts(
                1,
                this.state.query,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.manufacture,
                this.state.category,
                status
            );
        }
    }

    displayStatusChange(value) {
        let status = {...this.state.status};
        if (value) {
            status.display = value.value;
            this.setState({
                status: status,
                page: 1
            });
            this.props.productListAction.getProducts(
                1,
                this.state.query,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.manufacture,
                this.state.category,
                status
            );
        } else {
            status.display = null;
            this.setState({
                status: status,
                page: 1
            });
            this.props.productListAction.getProducts(
                1,
                this.state.query,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.manufacture,
                this.state.category,
                status
            );
        }
    }

    highlightStatusChange(value) {
        let status = {...this.state.status};
        if (value) {
            status.highlight = value.value;
            this.setState({
                status: status,
                page: 1
            });
            this.props.productListAction.getProducts(
                1,
                this.state.query,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.manufacture,
                this.state.category,
                status
            );
        } else {
            status.highlight = null;
            this.setState({
                status: status,
                page: 1
            });
            this.props.productListAction.getProducts(
                1,
                this.state.query,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.manufacture,
                this.state.category,
                status
            );
        }
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
        this.props.modalProductAction.openWareHouseTab();
        this.props.modalProductAction.handleProduct(product);
        this.props.inventoryGoodAction.getHistoryInventories(product);
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
                                                    to="/create-product"
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
                                                    <div className="col-md-10">
                                                        <Search
                                                            onChange={this.productsSearchChange}
                                                            value={this.state.query}
                                                            placeholder="Nhập tên hoặc mã hàng hoá để tìm"
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <button type="button" data-toggle="collapse" data-target="#demo"
                                                                className="btn btn-info">
                                                            <i className="material-icons">filter</i> Lọc
                                                        </button>
                                                    </div>
                                                </div>
                                                <div id="demo" className="collapse">
                                                    <div className="row">
                                                        <div className="form-group col-md-3">
                                                            <label className="label-control">Tìm theo nhà sản
                                                                xuất</label>
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
                                                        <div className="form-group col-md-3">
                                                            <label className="label-control">Tìm theo nhóm hàng
                                                                hóa</label>
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
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-md-4">
                                                            <label className="label-control">Tìm theo trạng thái kinh
                                                                doanh</label>
                                                            <Select
                                                                value={this.state.status.sale}
                                                                options={[
                                                                    {
                                                                        value: 1,
                                                                        label: "ĐANG KINH DOANH"
                                                                    },
                                                                    {
                                                                        value: "0",
                                                                        label: "NGỪNG KINH DOANH"
                                                                    }
                                                                ]}
                                                                onChange={this.saleStatusChange}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-4">
                                                            <label className="label-control">Tìm theo trạng thái hiển
                                                                thị</label>
                                                            <Select
                                                                value={this.state.status.display}
                                                                options={[
                                                                    {
                                                                        value: 1,
                                                                        label: "HIỂN THỊ RA WEBSITE"
                                                                    },
                                                                    {
                                                                        value: "0",
                                                                        label: "KHÔNG HIỂN THỊ RA WEBSITE"
                                                                    }
                                                                ]}
                                                                onChange={this.displayStatusChange}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-4">
                                                            <label className="label-control">Tìm theo trạng thái nổi
                                                                bật</label>
                                                            <Select
                                                                value={this.state.status.highlight}
                                                                options={[
                                                                    {
                                                                        value: 1,
                                                                        label: "NỔI BẬT"
                                                                    },
                                                                    {
                                                                        value: "0",
                                                                        label: "KHÔNG NỔI BẬT"
                                                                    }
                                                                ]}
                                                                onChange={this.highlightStatusChange}
                                                            />
                                                        </div>

                                                        <br/>
                                                    </div>
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
                                                    <div rel="tooltip" data-placement="top" title=""
                                                         className="btn btn-danger btn-simple"
                                                    >Đang kinh doanh: {this.props.productsBusiness}
                                                        <div className="ripple-container"/>
                                                    </div>
                                                    <div rel="tooltip" data-placement="top" title=""
                                                         className="btn btn-danger btn-simple"
                                                    >Ngừng kinh doanh: {this.props.productsNotBusiness}
                                                        <div className="ripple-container"/>
                                                    </div>
                                                    <div rel="tooltip" data-placement="top" title=""
                                                         className="btn btn-danger btn-simple"
                                                    >Hiển thị ra website: {this.props.productsDisplay}
                                                        <div className="ripple-container"/>
                                                    </div>
                                                    <div rel="tooltip" data-placement="top" title=""
                                                         className="btn btn-danger btn-simple"
                                                    >Không hiển thị ra website: {this.props.productsNotDisplay}
                                                        <div className="ripple-container"/>
                                                    </div>
                                                    <div rel="tooltip" data-placement="top" title=""
                                                         className="btn btn-danger btn-simple"
                                                    >Nổi bật: {this.props.productsHighlight}
                                                        <div className="ripple-container"/>
                                                    </div>
                                                    <div rel="tooltip" data-placement="top" title=""
                                                         className="btn btn-danger btn-simple"
                                                    >Không nổi bật: {this.props.productsNotHighlight}
                                                        <div className="ripple-container"/>
                                                    </div>
                                                    <div rel="tooltip" data-placement="top" title=""
                                                         className="btn btn-info btn-simple"
                                                    >Tổng sản phẩm: {this.props.productsTotal}

                                                        <div className="ripple-container"/>
                                                    </div>
                                                    <div rel="tooltip" data-placement="top" title=""
                                                         className="btn btn-success btn-simple"
                                                    >Tổng số lượng : {this.props.productsQuantity}
                                                        <div className="ripple-container"/>
                                                    </div>
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
    productsQuantity: PropTypes.number.isRequired,
    categories: PropTypes.array.isRequired,
    manufactures: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    productsHighlight: PropTypes.number.isRequired,
    productsNotHighlight: PropTypes.number.isRequired,
    inventoryGoodAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        products: state.productList.products,
        productsTotal: state.productList.productsTotal,
        productsBusiness: state.productList.productsBusiness,
        productsNotBusiness: state.productList.productsNotBusiness,
        productsDisplay: state.productList.productsDisplay,
        productsNotDisplay: state.productList.productsNotDisplay,
        productsQuantity: state.productList.productsQuantity,
        productsHighlight: state.productList.productsHighlight,
        productsNotHighlight: state.productList.productsNotHighlight,
        isLoading: state.productList.isLoading,
        modalUpdated: state.productList.modalInProduct.modalUpdated,
        categories: state.productList.categories,
        manufactures: state.productList.manufactures,
        totalPages: state.productList.totalPages,
        currentPage: state.productList.currentPage,
        limit: state.productList.limit,
        totalCount: state.productList.totalCount
    };
}

function mapDispatchToProps(dispatch) {
    return {
        productListAction: bindActionCreators(productListAction, dispatch),
        modalProductAction: bindActionCreators(modalProductAction, dispatch),
        inventoryGoodAction: bindActionCreators(inventoryGoodAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
