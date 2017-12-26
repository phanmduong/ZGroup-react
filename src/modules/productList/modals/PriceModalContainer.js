import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as modalProductAction from './modalProductAction';
import * as productListAction from '../productListAction';
import PropTypes from "prop-types";
import Loading from "../../../components/common/Loading";

class PriceModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updatePrice = this.updatePrice.bind(this);
        this.handleProduct = this.handleProduct.bind(this);
    }

    updatePrice() {
        this.props.productListAction.updatePrice(this.props.productEditing.productPresent);
    }

    handleProduct(e) {
        const field = e.target.name;
        let productPresent = {...this.props.productEditing.productPresent};
        productPresent[field] = e.target.value;
        this.props.modalProductAction.handleProduct(productPresent);
    }

    render() {
        const indexForChilds = this.props.productEditing.index;
        const product = indexForChilds ? this.props.products[indexForChilds] : this.props.productEditing.productPresent;
        return (
            <Modal show={this.props.priceModal}
                   onHide={() => this.props.showPriceModal(product)}>
                <a onClick={() => this.props.showPriceModal(product)}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Giá bán</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="label-control">Nhập giá</label>
                        <input type="text"
                               name="price"
                               className="form-control date-picker"
                               value={this.props.productEditing.productPresent.price}
                               onChange={this.handleProduct}/>
                        <span className="material-input"/>
                    </div>

                    <div className="form-group">
                        <label className="control-label">Ghi chú</label>
                        <input type="text" className="form-control"/>
                        <span className="material-input"/>

                    </div>
                    {
                        this.props.isModalUpdating ? <Loading/> : (
                            <div>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-success btn-round" data-dismiss="modal"
                                        onClick={this.updatePrice}><i
                                    className="material-icons">check</i> Xác nhận
                                </button>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-danger btn-round" data-dismiss="modal"
                                        onClick={() => this.props.showPriceModal(product)}>
                                    <i className="material-icons">close</i> Huỷ
                                </button>
                            </div>
                        )
                    }
                </Modal.Body>
            </Modal>
        );
    }
}

PriceModalContainer.propTypes = {
    modalProductAction: PropTypes.object.isRequired,
    productListAction: PropTypes.object.isRequired,
    priceModal: PropTypes.bool,
    productEditing: PropTypes.object.isRequired,
    isModalUpdating: PropTypes.bool,
    showPriceModal: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        priceModal: state.productList.modalInProduct.priceModal,
        productEditing: state.productList.productEditing,
        isModalUpdating: state.productList.modalInProduct.isModalUpdating,
        products: state.productList.products
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modalProductAction: bindActionCreators(modalProductAction, dispatch),
        productListAction: bindActionCreators(productListAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceModalContainer);
