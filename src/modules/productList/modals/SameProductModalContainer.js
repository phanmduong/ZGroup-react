import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from 'redux';
import * as productListAction from './../productListAction';
import * as helper from '../../../helpers/helper';

class SameProductModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const product = this.props.productPresent;
        const indexForChilds = this.props.index;
        return (
            <Modal show={this.props.sameProductModal}
                   onHide={() => this.props.showSameProductModal(indexForChilds)}>
                <a onClick={() => this.props.showSameProductModal(indexForChilds)}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Sản phẩm cùng loại</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr className="text-rose">
                                <th>Sản phẩm</th>
                                <th>Mã</th>
                                <th>Giá</th>
                                <th>Kho</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (product && product.children) && product.children.map((child, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <span>
                                                    {`${product.name} `}
                                                </span>
                                                {
                                                    child.properties.map((pro, index) => {
                                                        return (
                                                            <span key={index}>
                                                                {`${pro.value} `}
                                                            </span>
                                                        );
                                                    })
                                                }
                                            </td>
                                            <td>{child.barcode}</td>
                                            <td>
                                                <a onClick={() => this.props.showPriceModal(child)}>
                                                    <span className="label label-rose">
                                                        {helper.dotNumber(child.price)}đ
                                                    </span>
                                                </a>
                                            </td>
                                            <td>
                                                <a className="text-name-student-register"
                                                   rel="tooltip" title=""
                                                   data-original-title="Remove item"
                                                   onClick={() => this.props.showWareHouseModal(child)}>
                                                    {
                                                        product.warehouses_count !== 0 ? (
                                                            <p>{product.warehouses_count} kho</p>
                                                        ) : (
                                                            <p>Chưa có</p>
                                                        )
                                                    }
                                                </a>
                                            </td>
                                            <td>
                                                {
                                                    product.children && product.children.length > 1 ? (
                                                        <div className="btn-group-action">
                                                            <a style={{color: "#878787"}}
                                                               data-toggle="tooltip" title=""
                                                               type="button" rel="tooltip"
                                                               data-original-title="Xoá"
                                                               onClick={() => {
                                                                   this.props.deleteProduct(child, true, indexForChilds);
                                                               }}>
                                                                <i className="material-icons">delete</i>
                                                            </a>
                                                        </div>
                                                    ) : (
                                                        <div className="btn-group-action">
                                                            <a style={{color: "#878787"}}
                                                               data-toggle="tooltip" title=""
                                                               type="button" rel="tooltip"
                                                               data-original-title="Xoá"
                                                               onClick={() => {
                                                                   this.props.deleteProduct(child, false, indexForChilds);
                                                               }}>
                                                                <i className="material-icons">delete</i>
                                                            </a>
                                                        </div>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

SameProductModalContainer.propTypes = {
    sameProductModal: PropTypes.bool,
    productPresent: PropTypes.object.isRequired,
    showWareHouseModal: PropTypes.func.isRequired,
    showSameProductModal: PropTypes.func.isRequired,
    showPriceModal: PropTypes.func.isRequired,
    productListAction: PropTypes.object.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        sameProductModal: state.productList.modalInProduct.sameProductModal,
        productPresent: state.productList.productEditing.productPresent,
        index: state.productList.productEditing.index
    };
}

function mapDispatchToProps(dispatch) {
    return {
        productListAction: bindActionCreators(productListAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SameProductModalContainer);
