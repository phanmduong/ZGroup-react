import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as orderedProductAction from "./orderedProductAction";
import PropTypes from "prop-types";
import {DATETIME_VN_FORMAT} from "../../constants/constants";
import moment from "moment/moment";
import FormInputDateTimeForModal from "./FormInputDateTimeForModal";
//import {DATETIME_SEAT_FORMAT} from "../../constants/constants";
//import {moment} from "moment";

class CameToVNModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
    }

    updateFormData(e) {
        let orders = this.props.orderCameToVN.map(order => {
            let attach_info = {
                ...JSON.parse(order.attach_info),
                endTime: e.target.value
            };
            return {
                ...order,
                attach_info: JSON.stringify(attach_info)
            };
        });
        this.props.orderedProductAction.handleCameToVNModal(orders);
    }

    render() {
        let order = this.props.orderCameToVN[0];
        return (
            <Modal show={this.props.cameToVNModal}
                   onHide={() => this.props.orderedProductAction.showCameToVNModal()}
                   bsStyle="primary">
                <a onClick={() => this.props.orderedProductAction.showCameToVNModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Bổ sung thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInputDateTimeForModal
                        format={DATETIME_VN_FORMAT}
                        label="Dự kiến ngày về"
                        name="endTime"
                        defaultDate={moment()}
                        updateFormData={this.updateFormData}
                        id="form-end-time"
                        value={order.attach_info ? JSON.parse(order.attach_info).endTime : ''}
                    />
                    <div>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Remove item" type="button"
                                className="btn btn-success btn-round" data-dismiss="modal"
                                onClick={() => this.props.orderedProductAction.changeStatus(
                                    "arrive_date", this.props.orderCameToVN, null
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
                </Modal.Body>
            </Modal>
        );
    }
}

CameToVNModal.propTypes = {
    orderedProductAction: PropTypes.object.isRequired,
    orderCameToVN: PropTypes.array.isRequired,
    cameToVNModal: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        cameToVNModal: state.orderedProduct.cameToVNModal,
        orderCameToVN: state.orderedProduct.orderCameToVN,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedProductAction: bindActionCreators(orderedProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CameToVNModal);
