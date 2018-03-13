import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as orderedProductAction from "./orderedProductAction";
import PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import CameToVN from "./CameToVN";

class CameToVNModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleDate = this.handleDate.bind(this);
    }

    handleDate(e) {
        let attach_info = {
            ...JSON.parse(this.props.orderCameToVN.attach_info),
            endTime: e.target.value
        };
        let order = {
            ...this.props.orderCameToVN,
            attach_info: JSON.stringify(attach_info)
        };
        this.props.orderedProductAction.handleCameToVNModal(order);
    }

    render() {
        let order = this.props.orderCameToVN;
        return (
            <Modal show={this.props.cameToVNModal}
                   onHide={() => this.props.orderedProductAction.showCameToVNModal()}>
                <a onClick={() => this.props.orderedProductAction.showCameToVNModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Bổ sung thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card">
                        <form id="form-add-coupon-in-group-customer">
                            <CameToVN
                                order={order}
                                handleDate={this.handleDate}/>
                        </form>
                    </div>
                    {
                        this.props.isSendingNote ? <Loading/> : (
                            <div>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-success btn-round" data-dismiss="modal"
                                        onClick={() => this.props.orderedProductAction.changeStatus(
                                            "arrive_date", order.id, null, order.attach_info
                                        )}>
                                    <i className="material-icons">check</i> Xác nhận
                                </button>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-danger btn-round" data-dismiss="modal"
                                        onClick={() => this.props.orderedProductAction.showCameToVNModal()}>
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

CameToVNModal.propTypes = {
    orderedProductAction: PropTypes.object.isRequired,
    cameToVNModal: PropTypes.bool,
    orderCameToVN: PropTypes.object.isRequired,
    isSendingNote: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        cameToVNModal: state.orderedProduct.cameToVNModal,
        orderCameToVN: state.orderedProduct.orderCameToVN,
        isSendingNote: state.orderedProduct.isSendingNote
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedProductAction: bindActionCreators(orderedProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CameToVNModal);
