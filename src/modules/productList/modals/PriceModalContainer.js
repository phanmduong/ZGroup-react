import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as modalProductAction from './modalProductAction';
import * as productListAction from '../productListAction';
import PropTypes from "prop-types";

class PriceModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            price: 12,
            id:this.props.productEditing.id
        };
        this.updatePrice = this.updatePrice.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.productEditing !== {}) {
            this.setState({price: this.props.productEditing.price});
            console.log("batman_beyond", this.props.productEditing);
        }
    }

    updatePrice(e) {
        console.log("batman");
        e.preventDefault();
        console.log("batman_beyond", this.state);
        this.props.productListAction.updatePrice(this.state);
        this.props.modalProductAction.showPriceModal({});
    }

    handlePrice(e){
        e.preventDefault();
        this.setState({price:e.target.value});
    }

    render() {
        return (
            <Modal show={this.props.priceModal}
                   onHide={() => this.props.modalProductAction.showPriceModal({})}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Giá bán</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="label-control">Nhập giá</label>
                        <input type="text" className="form-control datepicker" value={this.state.price}
                               onChange={(e)=>this.handlePrice(e)}/>
                        <span className="material-input"></span>
                    </div>

                    <div className="form-group label-floating is-empty">
                        <label className="control-label">Ghi chú</label>
                        <input type="password" className="form-control"/>
                        <span className="material-input"></span>
                    </div>

                    <button rel="tooltip" data-placement="top" title=""
                            data-original-title="Remove item" type="button"
                            className="btn btn-success btn-round" data-dismiss="modal" onClick={this.updatePrice}><i
                        className="material-icons">check</i> Xác nhận
                    </button>
                    <button rel="tooltip" data-placement="top" title=""
                            data-original-title="Remove item" type="button"
                            className="btn btn-danger btn-round" data-dismiss="modal"
                            onClick={() => this.props.modalProductAction.showPriceModal({})}><i
                        className="material-icons">close</i> Huỷ
                    </button>
                </Modal.Body>
            </Modal>
        );
    }
}

PriceModalContainer.propTypes = {
    modalProductAction: PropTypes.object.isRequired,
    productListAction: PropTypes.object.isRequired,
    priceModal: PropTypes.bool.isRequired,
    productEditing: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        priceModal: state.productList.modalInProduct.priceModal,
        productEditing: state.productList.productEditing
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modalProductAction: bindActionCreators(modalProductAction, dispatch),
        productListAction: bindActionCreators(productListAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceModalContainer);
