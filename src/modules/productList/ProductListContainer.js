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

class ProductListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            time: {
                startTime: '',
                endTime: ''
            }
        };
        this.table = null;
        this.getProducts = this.getProducts.bind(this);
        this.showPriceModal = this.showPriceModal.bind(this);
        this.showWareHouseModal = this.showWareHouseModal.bind(this);
        this.showAvatarModal = this.showAvatarModal.bind(this);
        this.setTable = this.setTable.bind(this);
    }

    componentWillMount() {
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
                                                        onChange={(value) => {
                                                            this.table ? this.table.search(value).draw() : null;
                                                        }}
                                                        placeholder="Nhập tên hoặc mã hàng hoá để tìm"
                                                        className="col-md-12"
                                                    />
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
                                                            showPriceModal={this.showPriceModal}
                                                            showWareHouseModal={this.showWareHouseModal}
                                                            showAvatarModal={this.showAvatarModal}/>
                                                    )
                                                }
                                            </div>
                                            <div className="card-footer">
                                                <div style={{float: "right"}}>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            data-original-title="Remove item"
                                                            className="btn btn-info btn-simple"
                                                    >Tổng sản phẩm: {this.props.productsTotal}

                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            data-original-title="Remove item"
                                                            className="btn btn-danger btn-simple"
                                                    >Đang kinh doanh: 15
                                                        <div className="ripple-container"/>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            data-original-title="Remove item"
                                                            className="btn btn-success btn-simple"
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

ProductListContainer.PropTypes = {
    productListAction: PropTypes.object.isRequired,
    modalProductAction: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isModalUpdating: PropTypes.bool.isRequired,
    modalUpdated: PropTypes.bool.isRequired,
    productsTotal: PropTypes.string.isRequired,
    productsBusiness: PropTypes.string.isRequired,
    productsQuantity: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        products: state.productList.products,
        productsTotal: state.productList.productsTotal,
        productsBusiness: state.productList.productsBusiness,
        productsQuantity: state.productList.productsQuantity,
        isLoading: state.productList.isLoading,
        isModalUpdating: state.productList.modalInProduct.isModalUpdating,
        modalUpdated: state.productList.modalInProduct.modalUpdated,
        categories: state.productList.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        productListAction: bindActionCreators(productListAction, dispatch),
        modalProductAction: bindActionCreators(modalProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
