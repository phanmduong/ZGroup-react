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
            category: ''
        };
        this.timeOut = null;
        this.table = null;
        this.getProducts = this.getProducts.bind(this);
        this.showPriceModal = this.showPriceModal.bind(this);
        this.showWareHouseModal = this.showWareHouseModal.bind(this);
        this.showAvatarModal = this.showAvatarModal.bind(this);
        this.setTable = this.setTable.bind(this);
        this.updateFormDate = this.updateFormDate.bind(this);
        this.productsSearchChange = this.productsSearchChange.bind(this);
        this.manufacturesSearchChange = this.manufacturesSearchChange.bind(this);
        this.categoriesSearchChange = this.categoriesSearchChange.bind(this);
    }

    componentWillMount() {
        this.props.productListAction.getCategoriesProductsList();
        this.getProducts();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modalUpdated) {
            this.getProducts();
        }
    }

    getProducts() {
        this.props.productListAction.getProducts();
    }

    updateFormDate(event) {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;

        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.props.productListAction.getProducts(
                this.state.query,
                time.startTime,
                time.endTime,
                this.state.manufacture,
                this.state.category
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
                value,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.manufacture,
                this.state.category
            );
        }.bind(this), 500);
    }

    manufacturesSearchChange(value) {
        this.setState({
            manufacture: value.id
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.productListAction.getProducts(
                this.state.query,
                this.state.time.startTime,
                this.state.time.endTime,
                value.id,
                this.state.category
            );
        }.bind(this), 500);
    }

    categoriesSearchChange(value) {
        this.setState({
            category: value.id
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.productListAction.getProducts(
                this.state.query,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.manufacture,
                value.id
            );
        }.bind(this), 500);
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
                                                    <div className="form-group col-md-6">
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
                                                    <div className="form-group col-md-6">
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
                                            <div className="dataTables_paginate paging_full_numbers"
                                                 id="imported-goods-table_paginate">
                                                <ul className="pagination">
                                                    <li className="paginate_button first disabled"
                                                        id="imported-goods-table_first"><a href="#"
                                                                                           aria-controls="imported-goods-table"
                                                                                           data-dt-idx="0" tabindex="0">đầu</a>
                                                    </li>
                                                    <li className="paginate_button previous disabled"
                                                        id="imported-goods-table_previous"><a href="#"
                                                                                              aria-controls="imported-goods-table"
                                                                                              data-dt-idx="1"
                                                                                              tabindex="0">trước</a>
                                                    </li>
                                                    <li className="paginate_button active"><a href="#"
                                                                                          aria-controls="imported-goods-table"
                                                                                          data-dt-idx="2"
                                                                                          tabindex="0">1</a></li>
                                                    <li className="paginate_button next disabled"
                                                        id="imported-goods-table_next"><a href="#"
                                                                                          aria-controls="imported-goods-table"
                                                                                          data-dt-idx="3" tabindex="0">tiếp</a>
                                                    </li>
                                                    <li className="paginate_button last disabled"
                                                        id="imported-goods-table_last"><a href="#"
                                                                                          aria-controls="imported-goods-table"
                                                                                          data-dt-idx="4" tabindex="0">cuối</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="card-footer">
                                                <div style={{float: "right"}}>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-danger btn-simple"
                                                            onClick={() => this.props.productListAction.getProductsStatus("for_sale")}
                                                    >Đang kinh doanh: {this.props.productsBusiness}
                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-danger btn-simple"
                                                            onClick={() => this.props.productListAction.getProductsStatus("not_for_sale")}
                                                    >Ngừng kinh doanh: {this.props.productsNotBusiness}
                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-danger btn-simple"
                                                            onClick={() => this.props.productListAction.getProductsStatus("show")}
                                                    >Hiển thị ra web: {this.props.productsDisplay}
                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-danger btn-simple"
                                                            onClick={() => this.props.productListAction.getProductsStatus("not_show")}
                                                    >Không hiển thị ra web: {this.props.productsNotDisplay}
                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-danger btn-simple"
                                                            onClick={() => this.props.productListAction.getProductsStatus("deleted")}
                                                    >Đã xóa: {this.props.productsDeleted}
                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            className="btn btn-info btn-simple"
                                                            onClick={() => this.props.productListAction.getProducts()}
                                                    >Tổng sản phẩm: {this.props.productsTotal}

                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <p rel="tooltip" data-placement="top" title=""
                                                       className="btn btn-success btn-simple"
                                                    >Tổng số lượng : {this.props.productsQuantity}

                                                        <div className="ripple-container"/>
                                                    </p>
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

ProductListContainer.PropTypes = {
    productListAction: PropTypes.object.isRequired,
    modalProductAction: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isModalUpdating: PropTypes.bool.isRequired,
    modalUpdated: PropTypes.bool.isRequired,
    productsTotal: PropTypes.string.isRequired,
    productsBusiness: PropTypes.string.isRequired,
    productsNotBusiness: PropTypes.string.isRequired,
    productsDisplay: PropTypes.string.isRequired,
    productsNotDisplay: PropTypes.string.isRequired,
    productsDeleted: PropTypes.string.isRequired,
    productsQuantity: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    manufactures: PropTypes.array.isRequired
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
        isModalUpdating: state.productList.modalInProduct.isModalUpdating,
        modalUpdated: state.productList.modalInProduct.modalUpdated,
        categories: state.productList.categories,
        manufactures: state.productList.manufactures
    };
}

function mapDispatchToProps(dispatch) {
    return {
        productListAction: bindActionCreators(productListAction, dispatch),
        modalProductAction: bindActionCreators(modalProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
