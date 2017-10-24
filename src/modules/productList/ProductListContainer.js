import React from 'react';
import {connect} from 'react-redux';
import * as productListAction from './productListAction';
import {bindActionCreators} from 'redux';
import ProductListComponent from './ProductListComponent';
import PropTypes from 'prop-types';
import * as modalProductAction from './modals/modalProductAction';
import Loading from "../../components/common/Loading";

class ProductListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.getProducts = this.getProducts.bind(this);
        this.showPriceModal = this.showPriceModal.bind(this);
    }

    getProducts() {
        this.props.productListAction.getProducts();
    }

    componentWillMount() {
        this.getProducts();
    }

    showPriceModal(product) {
        this.props.modalProductAction.showPriceModal();
        this.props.modalProductAction.handleProduct(product);
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
                                                <button rel="tooltip" data-placement="top" title=""
                                                        data-original-title="Remove item" type="button"
                                                        className="btn btn-rose">
                                                    Thêm sản phẩm
                                                </button>
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
                                                    <div className="col-md-12">
                                                        <div className="form-group is-empty"><input
                                                            type="search"
                                                            className="form-control"
                                                            placeholder="Nhập tên hoặc mã hàng hoá để tìm"
                                                            value=""/><span
                                                            className="material-input"></span></div>
                                                    </div>
                                                    <div className=" col-md-3 form-group">
                                                        <label className="label-control">Từ ngày</label>
                                                        <input type="text"
                                                               className="form-control datetimepicker"
                                                               value="10/05/2016"/>
                                                        <span className="material-input"></span></div>
                                                    <div className="col-md-3 form-group">
                                                        <label className="label-control">Đến ngày</label>
                                                        <input type="text"
                                                               className="form-control datetimepicker"
                                                               value="10/05/2016"/>
                                                        <span className="material-input"></span></div>

                                                </div>
                                                <br/>
                                                {
                                                    this.props.isLoading ? <Loading/> : (
                                                        <ProductListComponent
                                                            products={this.props.products}
                                                            showPriceModal={this.showPriceModal}/>
                                                    )
                                                }


                                                <div className="row">
                                                    <div className="col-md-12" style={{textAlign: "right"}}>
                                                        <b style={{marginRight: "15px"}}>Hiển thị kêt quả từ
                                                            10-20/1000</b>
                                                        <br/>
                                                        <ul className="pagination pagination-info">
                                                            <li>
                                                                <a href="#"> prev</a>
                                                            </li>
                                                            <li>
                                                                <a href="#">1</a>
                                                            </li>
                                                            <li>
                                                                <a href="#">2</a>
                                                            </li>
                                                            <li className="active">
                                                                <a href="#">3</a>
                                                            </li>
                                                            <li>
                                                                <a href="#">4</a>
                                                            </li>
                                                            <li>
                                                                <a href="#">5</a>
                                                            </li>
                                                            <li>
                                                                <a href="#">next </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div style={{float: "right"}}>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            data-original-title="Remove item"
                                                            className="btn btn-info btn-simple"
                                                    >Tổng sản phẩm: 5
                                                        <div className="ripple-container"></div>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            data-original-title="Remove item"
                                                            className="btn btn-danger btn-simple"
                                                    >Đang kinh doanh: 15
                                                        <div className="ripple-container"></div>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            data-original-title="Remove item"
                                                            className="btn btn-success btn-simple"
                                                    >Tổng số lượng : 24
                                                        <div className="ripple-container"></div>
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
    isLoading:PropTypes.bool.isRequired
};


function mapStateToProps(state) {
    return {
        products: state.productList.products,
        isLoading:state.productList.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        productListAction: bindActionCreators(productListAction, dispatch),
        modalProductAction: bindActionCreators(modalProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
