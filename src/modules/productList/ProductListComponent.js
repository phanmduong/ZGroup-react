import React from 'react';
import PropTypes from "prop-types";
import WareHouseModalContainer from "./modals/WareHouseModalContainer";
import AvatarModalContainer from "./modals/AvatarModalContainer";
import PriceModalContainer from "./modals/PriceModalContainer";
import SameProductModalContainer from "./modals/SameProductModalContainer";
import {dotNumber} from "../../helpers/helper";
import {Link} from "react-router";

class ProductListComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
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
                        this.props.products && this.props.products.map((product) => {
                            return (
                                <tr key={product.id}>
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
                                                <a onClick={() => this.props.showSameProductModal(product)}>
                                                    <i className="material-icons">search</i>
                                                    {product.children.length} sản phẩm cùng loại
                                                </a>
                                            ) : (<div/>)
                                        }
                                    </td>
                                    <td style={{width: "50px"}}>{product.quantity}</td>
                                    <td>
                                        <a onClick={() => this.props.showPriceModal(product)}>
                                            {dotNumber(product.price)}đ
                                        </a>
                                    </td>
                                    <td>
                                        {dotNumber(product.import_price)}
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
                                                <a onClick={() => this.props.showSameProductModal(product)}>
                                                    <i className="material-icons">search</i>
                                                </a>
                                            ) : (
                                                <a className="text-name-student-register"
                                                   rel="tooltip" title=""
                                                   data-original-title="Remove item"
                                                   onClick={() => this.props.showWareHouseModal(product)}>                                                        {
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
                                            <Link to={`/product/${product.id}/edit`}
                                                  style={{color: "#878787"}}
                                                  data-toggle="tooltip" title=""
                                                  type="button" rel="tooltip"
                                                  data-original-title="Sửa"><i
                                                className="material-icons">edit</i></Link>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Xoá"><i
                                                className="material-icons">delete</i></a>
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
                    showWareHouseModal={this.props.showWareHouseModal}/>
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
    categories: PropTypes.array.isRequired
};

export default ProductListComponent;