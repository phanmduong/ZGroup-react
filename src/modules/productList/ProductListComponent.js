import React from 'react';
import PropTypes from "prop-types";
import WareHouseModalContainer from "./modals/WareHouseModalContainer";
import AvatarModalContainer from "./modals/AvatarModalContainer";
import PriceModalContainer from "./modals/PriceModalContainer";
import SameProductModalContainer from "./modals/SameProductModalContainer";
import {Link} from "react-router";
import * as helper from '../../helpers/helper';

class ProductListComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    deleteProduct(product, isChild, index) {
        helper.confirm("error", "Xóa sản phẩm", "Bạn có chắc muốn xóa sản phẩm này", () => {
            this.props.deleteProduct(product, isChild, index);
        });
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th/>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>SL</th>
                        <th>Giá bán</th>
                        <th>Giá vốn</th>
                        <th>Nhóm hàng</th>
                        <th>Nhà sản xuất</th>
                        <th>Kho</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.products && this.props.products.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <img style={{
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "50%",
                                            verticalAlign: "middle",
                                            background: "url(" + product.avatar_url + ") center center / cover",
                                            display: "inline-block",
                                            float: "right",
                                            marginLeft: "3px"
                                        }} data-toggle="tooltip" title="" type="button"
                                             rel="tooltip"
                                             data-original-title=""/>
                                    </td>
                                    <td style={{width: "130px"}}>
                                        <a className="text-name-student-register"
                                           rel="tooltip" title=""
                                           data-original-title="Remove item"
                                           onClick={() => this.props.showAvatarModal(product)}>{product.code}</a>
                                    </td>
                                    <td style={{width: "200px"}}>
                                        {product.name}<br/>
                                        {
                                            product.children ? (
                                                <a onClick={() => this.props.showSameProductModal(index)}>
                                                    <i className="material-icons">search</i>
                                                    {product.children.length} sản phẩm cùng loại
                                                </a>
                                            ) : (<div/>)
                                        }
                                    </td>
                                    <td style={{width: "50px"}}>{product.quantity}</td>
                                    <td>
                                        <a onClick={() => this.props.showPriceModal(product)}>
                                            {
                                                product.price.length ? (
                                                    <span>
                                                        {
                                                            product.price[0] === product.price[1] ? (
                                                                <p>{helper.dotNumber(product.price[0])}đ</p>
                                                            ) : (
                                                                <p>{helper.dotNumber(product.price[0])}-{helper.dotNumber(product.price[1])}đ</p>
                                                            )
                                                        }
                                                        </span>
                                                ) : (
                                                    <span>{helper.dotNumber(product.price)}đ</span>
                                                )
                                            }
                                        </a>
                                    </td>
                                    <td>
                                        {helper.dotNumber(product.import_price)}
                                    </td>
                                    <td style={{width: "115px"}}>
                                        {
                                            product.category ? (
                                                product.category.name
                                            ) : "Chưa có"
                                        }
                                    </td>
                                    <td style={{width: "120px"}}>
                                        {
                                            product.manufacture ? (
                                                product.manufacture.name
                                            ) : "Chưa có"
                                        }
                                    </td>
                                    <td>
                                        {
                                            product.children ? (
                                                <a onClick={() => this.props.showSameProductModal(index)}>
                                                    <i className="material-icons">search</i>
                                                </a>
                                            ) : (
                                                <a className="text-name-student-register"
                                                   rel="tooltip" title=""
                                                   data-original-title="Remove item"
                                                   onClick={() => this.props.showWareHouseModal(product)}>
                                                    {
                                                        product.warehouses_count !== 0 ? (
                                                            <p>{product.warehouses_count} kho</p>
                                                        ) : (
                                                            <p>Chưa có</p>
                                                        )
                                                    }
                                                </a>
                                            )
                                        }
                                    </td>
                                    <td>
                                        <div className="btn-group-action">
                                            <Link to={`/good/product/${product.id}/edit`}
                                                  style={{color: "#878787"}}
                                                  data-toggle="tooltip" title=""
                                                  type="button" rel="tooltip"
                                                  data-original-title="Sửa"><i
                                                className="material-icons">edit</i>
                                            </Link>
                                            {
                                                product.children && product.children.length > 1 ? (
                                                    <a style={{color: "#878787"}}
                                                       data-toggle="tooltip" title=""
                                                       type="button" rel="tooltip"
                                                       data-original-title="Xoá"
                                                       onClick={() => this.props.showSameProductModal(index)}>
                                                        <i className="material-icons">delete</i>
                                                    </a>
                                                ) : (
                                                    <a style={{color: "#878787"}}
                                                       data-toggle="tooltip" title=""
                                                       type="button" rel="tooltip"
                                                       data-original-title="Xoá"
                                                       onClick={() => this.deleteProduct(product, false, index)}>
                                                        <i className="material-icons">delete</i>
                                                    </a>
                                                )
                                            }
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                <PriceModalContainer
                    showPriceModal={this.props.showPriceModal}/>
                <WareHouseModalContainer
                    showWareHouseModal={this.props.showWareHouseModal}/>
                <AvatarModalContainer
                    showAvatarModal={this.props.showAvatarModal}/>
                <SameProductModalContainer
                    showSameProductModal={this.props.showSameProductModal}
                    showWareHouseModal={this.props.showWareHouseModal}
                    deleteProduct={this.deleteProduct}/>
            </div>
        );
    }
}

ProductListComponent.propTypes = {
    products: PropTypes.array.isRequired,
    showPriceModal: PropTypes.func.isRequired,
    showWareHouseModal: PropTypes.func.isRequired,
    showAvatarModal: PropTypes.func.isRequired,
    showSameProductModal: PropTypes.func.isRequired,
    setTable: PropTypes.func.isRequired,
    manufactures: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    deleteProduct: PropTypes.func.isRequired
};

export default ProductListComponent;