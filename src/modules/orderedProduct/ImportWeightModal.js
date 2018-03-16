import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as orderedProductAction from "./orderedProductAction";
import PropTypes from "prop-types";

class ImportWeightModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            price: ""
        };
        this.handleWeight = this.handleWeight.bind(this);
    }

    handleWeight(e) {
        const name = e.target.name;
        let attach_info = {
            ...JSON.parse(this.props.orderImportWeight.attach_info)
        };
        if (name === "price") {
            this.setState({price: e.target.value});
            attach_info = {
                ...attach_info,
                fee: attach_info.weight * e.target.value
            };
        } else attach_info = {
            ...attach_info,
            weight: e.target.value,
            fee: e.target.value * this.state.price
        };
        let order = {
            ...this.props.orderImportWeight,
            attach_info: JSON.stringify(attach_info)
        };
        this.props.orderedProductAction.handleImportWeightModal(order);
    }

    render() {
        let order = this.props.orderImportWeight;
        return (
            <Modal show={this.props.importWeightModal}
                   onHide={() => this.props.orderedProductAction.showImportWeightModal()}>
                <a onClick={() => this.props.orderedProductAction.showImportWeightModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Bổ sung thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <div className="form-group">
                            <label className="label-control">Khối lượng(kg)</label>
                            <input type="number"
                                   name="weight"
                                   placeholder="Nhập cân"
                                   className="form-control"
                                   value={order.attach_info ? JSON.parse(order.attach_info).weight : ''}
                                   onChange={this.handleWeight}/>
                            <span className="material-input"/>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <div className="form-group">
                            <label className="label-control">Giá tiền 1 cân(vnd/kg)</label>
                            <input type="number"
                                   name="price"
                                   placeholder="Nhập giá"
                                   className="form-control"
                                   value={this.state.price}
                                   onChange={this.handleWeight}/>
                            <span className="material-input"/>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <div className="form-group">
                            <label className="label-control">Phí ship(vnd)</label>
                            <input type="number"
                                   name="fee"
                                   className="form-control"
                                   value={order.attach_info ? JSON.parse(order.attach_info).fee : 0}
                                   disabled={true}/>
                            <span className="material-input"/>
                        </div>
                    </div>
                    <div>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Remove item" type="button"
                                className="btn btn-success btn-round" data-dismiss="modal"
                                onClick={() => this.props.orderedProductAction.changeStatus(
                                    "arrived", order.id, null, order.attach_info
                                )}>
                            <i className="material-icons">check</i> Xác nhận
                        </button>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Remove item" type="button"
                                className="btn btn-danger btn-round" data-dismiss="modal"
                                onClick={() => this.props.orderedProductAction.showImportWeightModal()}>
                            <i className="material-icons">close</i> Huỷ
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

ImportWeightModal.propTypes = {
    orderedProductAction: PropTypes.object.isRequired,
    importWeightModal: PropTypes.bool,
    orderImportWeight: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        importWeightModal: state.orderedProduct.importWeightModal,
        orderImportWeight: state.orderedProduct.orderImportWeight,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedProductAction: bindActionCreators(orderedProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportWeightModal);
