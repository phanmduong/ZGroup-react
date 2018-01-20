import React from 'react';
import {connect} from 'react-redux';
import CurrencyComponent from '../currency/CurrencyComponent';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import {Link} from "react-router";
import Search from "../../components/common/Search";
import FormInputDate from "../../components/common/FormInputDate";
import * as helper from '../../helpers/helper';
import Select from 'react-select';
import Pagination from "../../components/common/Pagination";

class CurrencyContainer extends React.Component {
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
            page: 1,
            status: {
                sale: null,
                display: null,
                highlight: null
            }
        };
        this.timeOut = null;
        this.table = null;
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
                                                <Link
                                                    to="/good/create-product"
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
                                    <div>
                                        {
                                            this.props.isLoading ? (
                                                <Loading/>
                                            ) : (
                                                <div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <div className="card card-stats">
                                                            <div className="card-header" data-background-color="green">
                                                                <i className="material-icons">store</i>
                                                            </div>
                                                            <div className="card-content">
                                                                <p className="category">Tổng sản phẩm</p>
                                                                <h3 className="card-title">{helper.dotNumber(this.props.productsTotal)}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <div className="card card-stats">
                                                            <div className="card-header" data-background-color="rose">
                                                                <i className="material-icons">equalizer</i>
                                                            </div>
                                                            <div className="card-content">
                                                                <p className="category">Tổng số lượng</p>
                                                                <h3 className="card-title">{helper.dotNumber(this.props.productsQuantity)}</h3>
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
                                                            <i className="material-icons">filter_list</i> Lọc
                                                        </button>
                                                    </div>
                                                </div>
                                                <div id="demo" className="collapse">
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
                                                </div>
                                                <br/>
                                                {
                                                    this.props.isLoading ? <Loading/> : (
                                                        <CurrencyComponent
                                                            setTable={this.setTable}
                                                            products={this.props.products}
                                                            manufactures={this.props.manufactures}
                                                            categories={this.props.categories}
                                                            showPriceModal={this.showPriceModal}
                                                            showWareHouseModal={this.showWareHouseModal}
                                                            showAvatarModal={this.showAvatarModal}
                                                            showSameProductModal={this.showSameProductModal}
                                                            deleteProduct={this.deleteProduct}/>
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
            </div>
        );
    }
}

CurrencyContainer.propTypes = {
    productListAction: PropTypes.object.isRequired,
    modalProductAction: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    modalUpdated: PropTypes.bool.isRequired,
    productsTotal: PropTypes.number.isRequired,
    productsQuantity: PropTypes.number.isRequired,
    categories: PropTypes.array.isRequired,
    manufactures: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    inventoryGoodAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        products: state.productList.products,
        productsTotal: state.productList.productsTotal,
        productsQuantity: state.productList.productsQuantity,
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

function mapDispatchToProps() {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyContainer);
