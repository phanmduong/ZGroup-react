import React from 'react';
import PriceModalContainer from "./modals/PriceModalContainer";
import PropTypes from "prop-types";
import WareHouseModalContainer from "./modals/WareHouseModalContainer";
import AvatarModalContainer from "./modals/AvatarModalContainer";

class ProductListComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead className="text-rose">
                    <tr>
                        <th/>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá bán</th>
                        <th>Nhóm hàng</th>
                        <th>Kho</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.products.map((product) => {
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
                                             data-original-title="Yến Nhi"/>
                                    </td>
                                    <td>
                                        <a className="text-name-student-register"
                                           rel="tooltip" title=""
                                           data-original-title="Remove item"
                                           onClick={() => this.props.showAvatarModal(product)}>{product.code}</a>
                                    </td>
                                    <td>{product.name}</td>
                                    <td><a className="text-name-student-register"
                                           rel="tooltip" title=""
                                           data-original-title="Remove item">{product.quantity}</a></td>
                                    <td>
                                        <button rel="tooltip" data-placement="top"
                                                title=""
                                                data-original-title="Remove item"
                                                className="btn btn-info btn-xs"
                                                style={{width: "100%"}}
                                                onClick={() => this.props.showPriceModal(product)}>{product.price}
                                            <div className="ripple-container"/>
                                        </button>
                                    </td>
                                    <td>
                                        <a className="text-name-student-register"
                                           rel="tooltip" title=""
                                           data-original-title="Remove item">Nike
                                            Air</a>
                                    </td>
                                    <td>
                                        <a className="text-name-student-register"
                                           rel="tooltip" title=""
                                           data-original-title="Remove item"
                                           onClick={() => this.props.showWareHouseModal(product)}>
                                            {
                                                !product.warehouses ? (
                                                    <p>0</p>
                                                ) : (
                                                    <p>{product.warehouses.length}</p>
                                                )
                                            }
                                        </a>
                                    </td>
                                    <td style={{width: "100px"}}>
                                        <div className="btn-group-action">
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Sửa"><i
                                                className="material-icons">edit</i></a>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Xoá"><i
                                                className="material-icons">delete</i></a>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Ngừng kinh doanh">
                                                <i className="material-icons">pause</i></a>
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
            </div>
        );
    }
}

ProductListComponent.propTypes = {
    products: PropTypes.array.isRequired,
    showPriceModal: PropTypes.func.isRequired,
    showWareHouseModal: PropTypes.func.isRequired,
    showAvatarModal: PropTypes.func.isRequired,
};

export default ProductListComponent;