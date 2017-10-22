import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as modalProductAction from './modalProductAction';
import PropTypes from "prop-types";

class PriceModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal show={this.props.priceModal}
                   onHide={this.props.modalProductAction.showPriceModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Giá bán</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="label-control">Nhập giá</label>
                        <input type="text" className="form-control datepicker" value="1.000.000"/>
                        <span className="material-input"></span>
                    </div>


                    <div className="form-group label-floating is-empty">
                        <label className="control-label">Ghi chú</label>
                        <input type="password" className="form-control"/>
                        <span className="material-input"></span>
                    </div>

                    <button rel="tooltip" data-placement="top" title=""
                            data-original-title="Remove item" type="button"
                            className="btn btn-success btn-round" data-dismiss="modal"><i
                        className="material-icons">check</i> Xác nhận
                    </button>
                    <button rel="tooltip" data-placement="top" title=""
                            data-original-title="Remove item" type="button"
                            className="btn btn-danger btn-round" data-dismiss="modal"><i
                        className="material-icons">close</i> Huỷ
                    </button>

                </Modal.Body>

            </Modal>
        );
    }
}

PriceModalContainer.propTypes = {
    modalProductAction: PropTypes.object.isRequired,
    priceModal: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        priceModal: state.productList.modalInProduct.priceModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modalProductAction: bindActionCreators(modalProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceModalContainer);
