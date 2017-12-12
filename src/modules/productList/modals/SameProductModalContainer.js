import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import PropTypes from "prop-types";

class SameProductModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let product = this.props.productEditing.productPresent;
        return (
            <Modal show={this.props.sameProductModal}
                   onHide={() => this.props.showSameProductModal(product)}>
                <a onClick={() => this.props.showSameProductModal(product)}
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
                            </tr>
                            </thead>
                            <tbody>
                            {
                                product.children && product.children.map((child, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <a>
                                                    {`${product.name} `}
                                                </a>
                                                {
                                                    child.properties.map((pro, index) => {
                                                        return (
                                                            <a key={index}>
                                                                {`${pro.value} `}
                                                            </a>
                                                        );
                                                    })
                                                }
                                            </td>
                                            <td>{child.barcode}</td>
                                            <td>{child.price}</td>
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
    productEditing: PropTypes.object.isRequired,
    showSameProductModal: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        sameProductModal: state.productList.modalInProduct.sameProductModal,
        productEditing: state.productList.productEditing
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SameProductModalContainer);
