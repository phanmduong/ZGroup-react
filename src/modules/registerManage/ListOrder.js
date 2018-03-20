import React from "react";
import Loading from "../../components/common/Loading";
import PropTypes from "prop-types";
import * as helper from "../../helpers/helper";

// import {Link} from "react-router";
import {Modal, Tooltip, OverlayTrigger} from "react-bootstrap";
import CallModal from "./CallModal";
// import { REGISTER_STATUS } from "../../constants/constants";
import TooltipButton from "../../components/common/TooltipButton";
import ChooseSeatModalContainer from "./chooseSeat/ChooseSeatModalContainer";

import moment from "moment/moment";
import ChooseSeatHistoryModalContainer from "./chooseSeat/ChooseSeatHistoryModalContainer";
import PaymentModal from "./PaymentModal";
import UserpackModal from "./UserpackModal";

export function setRuleShowCall(register) {
    let btn = "";
    let titleCall = "";
    let showCall;
    let created_time = Date.parse(
        moment(register.created_at, "HH:mm DD-MM-YYYY").format(
            "HH:mm MM-DD-YYYY",
        ),
    ); // Phai chuyen sang dinh dang moi parse duoc
    let expiredTime = Date.parse(
        moment(register.created_at, "HH:mm DD-MM-YYYY")
            .add(1, "days")
            .format("HH:mm MM-DD-YYYY"),
    );
    let firstCall = Date.parse(
        moment(
            register.teleCalls[0] && register.teleCalls[0].created_at,
            "HH:mm DD-MM-YYYY",
        ).format("HH:mm MM-DD-YYYY"),
    );
    let presentTime = new Date();
    presentTime = Date.parse(presentTime);
    let call =
        register.teleCalls && register.teleCalls[register.teleCalls.length - 1];
    if (register.teleCalls.length > 0) {
        showCall = Math.floor((firstCall - created_time) / 3600000);
        if (call.call_status === 1) {
            btn = " btn-success";
            titleCall = "Gọi thành công lúc " + call.created_at;
        } else if (call.call_status === 0) {
            btn = " btn-danger";
            titleCall = "Gọi thất bại lúc " + call.created_at;
        }
    } else {
        showCall = Math.floor((presentTime - created_time) / 3600000);
        if (expiredTime >= presentTime) {
            btn = " btn-default ";
            titleCall =
                " Còn " +
                Math.floor((expiredTime - presentTime) / 3600000) +
                " h";
        } else {
            btn = " btn-warning ";
            titleCall =
                " Đã quá hạn " +
                Math.floor((presentTime - expiredTime) / 3600000) +
                " h";
        }
    }
    return [btn, titleCall, showCall];
}

export function sumMoney(register) {
    let sumMoney = 0;
    register.historyPayments &&
    register.historyPayments.map(payment => {
        sumMoney += payment.money_value;
    });
    return sumMoney;
}

class ListOrder extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            register: {},
            isOpenCallModal: false,
            isOpenPaymentModal: false,
            sumMoney: 0,
            isOpenUserpackModal: false,
        };

        this.openCallModal = this.openCallModal.bind(this);
        this.openPaymentModal = this.openPaymentModal.bind(this);
        this.closeCallModal = this.closeCallModal.bind(this);
        this.closePaymentModal = this.closePaymentModal.bind(this);
        this.openChooseSeatModal = this.openChooseSeatModal.bind(this);
        this.closeUserpackModal = this.closeUserpackModal.bind(this);
        this.openUserpackModal = this.openUserpackModal.bind(this);
    }

    openCallModal(register) {
        this.setState({
            isOpenCallModal: true,
            register: register,
        });
    }

    openPaymentModal(register) {
        this.setState({
            isOpenPaymentModal: true,
            register: register,
        });
    }


    closeCallModal() {
        this.setState({isOpenCallModal: false});
    }

    closePaymentModal() {
        this.setState({isOpenPaymentModal: false});
    }

    openChooseSeatModal(base) {
        this.props.openChooseSeatModal(base);
    }

    openUserpackModal(register) {
        this.setState({isOpenUserpackModal: true, register: register});
    }

    closeUserpackModal() {
        this.setState({isOpenUserpackModal: false});
    }

    render() {
        const ChooseSeatTooltip = <Tooltip id="tooltip">Chọn chỗ ngồi</Tooltip>;
        const TopupTooltip = <Tooltip id="tooltip">Thu tiền</Tooltip>;
        const UserpackTooltip = <Tooltip id="tooltip">Chọn gói</Tooltip>;
        const HistoryTooltip = <Tooltip id="tooltip">Lịch sử đặt chỗ</Tooltip>;

        return (
            <div className="table-responsive">
                {this.props.isLoading ? (
                    <Loading/>
                ) : (
                    <table className="table table-hover">
                        <ChooseSeatModalContainer/>
                        <thead className="text-rose">
                        <tr>
                            <th>Gọi</th>
                            <th>Khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Saler</th>
                            <th>Chiến dịch</th>
                            <th>Giá tiền</th>
                            <th>Tiền đã trả</th>
                            <th>Gói thành viên</th>
                            <th>Đăng ký</th>
                            <th/>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.registers.map(register => {
                            let [
                                btn,
                                titleCall,
                                showCall,
                            ] = setRuleShowCall(register);
                            return (
                                <tr key={register.id}>
                                    <td>
                                        <div className="container-call-status">
                                            <TooltipButton
                                                text={titleCall}
                                                placement="top"
                                            >
                                                <button
                                                    className={
                                                        "btn btn-round " +
                                                        btn +
                                                        " full-width padding-left-right-10"
                                                    }
                                                    onClick={() =>
                                                        this.openCallModal(
                                                            register,
                                                        )
                                                    }
                                                >
                                                    <i className="material-icons">
                                                        phone
                                                    </i>{" "}
                                                    {showCall
                                                        ? showCall + " h"
                                                        : null}
                                                </button>
                                            </TooltipButton>
                                        </div>
                                    </td>
                                    <td>
                                        <a className="text-name-student-register">
                                            {register.user.name}
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href={"tel:" + register.phone}
                                            className="text-name-student-register"
                                        >
                                            {register.user.phone
                                                ? helper.formatPhone(
                                                    register.user.phone,
                                                )
                                                : "Chưa có"}
                                        </a>
                                    </td>
                                    <td>
                                        {register.saler ? (
                                            <a
                                                className="btn btn-xs btn-main"
                                                onClick={e => {
                                                    this.props.filterBySaler(
                                                        register.saler.id,
                                                    );
                                                    e.preventDefault();
                                                }}
                                                style={{
                                                    backgroundColor:
                                                    register.saler
                                                        .color &&
                                                    "#" +
                                                    register.saler
                                                        .color,
                                                }}
                                            >
                                                {register.saler.name}
                                            </a>
                                        ) : (
                                            <a className="btn btn-xs btn-main disabled">
                                                Chưa có
                                            </a>
                                        )}
                                    </td>

                                    <td>
                                        {register.campaign ? (
                                            <a
                                                className="btn btn-xs btn-main"
                                                style={{
                                                    backgroundColor:
                                                    "#" +
                                                    register.campaign
                                                        .color,
                                                }}
                                                onClick={e => {
                                                    this.props.filterByCampaign(
                                                        register.campaign
                                                            .id,
                                                    );
                                                    e.preventDefault();
                                                }}
                                            >
                                                {register.campaign.name}{" "}
                                            </a>
                                        ) : (
                                            <a className="btn btn-xs btn-main disabled">
                                                Chưa có
                                            </a>
                                        )}
                                    </td>

                                    <td>
                                        {helper.dotNumber(
                                            register.subscription.price,
                                        )}đ
                                    </td>
                                    <td>
                                        {helper.dotNumber(register.money)}đ
                                    </td>
                                    <td>
                                        <b>
                                            {
                                                register.subscription
                                                    .user_pack.name
                                            }
                                        </b>
                                        <br/>
                                        {
                                            register.subscription
                                                .subscription_kind_name
                                        }
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={UserpackTooltip}
                                        >
                                            <a
                                                onClick={() =>
                                                    this.openUserpackModal(
                                                        register,
                                                    )
                                                }
                                                style={{color: "#888"}}
                                            >
                                                <i className="material-icons">
                                                    class
                                                </i>
                                            </a>
                                        </OverlayTrigger>
                                    </td>
                                    <td>{register.created_at}</td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={ChooseSeatTooltip}
                                        >
                                            <a
                                                onClick={() =>
                                                    this.props.openChooseSeatModal(
                                                        register.base.base,
                                                        register,
                                                    )
                                                }
                                                style={{color: "#888"}}
                                            >
                                                <i className="material-icons">
                                                    add_circle
                                                </i>
                                            </a>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={HistoryTooltip}
                                        >
                                            <a
                                                style={{color: "#888"}}
                                                onClick={() =>
                                                    this.props.openChooseSeatHistoryModal()
                                                }
                                            >
                                                <i className="material-icons">
                                                    event_seat
                                                </i>
                                            </a>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={TopupTooltip}
                                        >
                                            <a
                                                onClick={() =>
                                                    this.openPaymentModal(
                                                        register,
                                                    )
                                                }
                                                style={{color: "#888"}}
                                            >
                                                <i className="material-icons">
                                                    attach_money
                                                </i>
                                            </a>
                                        </OverlayTrigger>
                                    </td>

                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                )}
                <Modal
                    show={this.state.isOpenCallModal}
                    bsStyle="primary"
                    onHide={this.closeCallModal}
                >
                    <Modal.Header/>
                    <Modal.Body>
                        <CallModal
                            register={this.state.register}
                            closeCallModal={this.closeCallModal}
                        />
                    </Modal.Body>
                </Modal>
                <Modal
                    show={this.state.isOpenPaymentModal}
                    bsStyle="primary"
                    onHide={this.closePaymentModal}
                >
                    <Modal.Header/>
                    <Modal.Body>
                        <PaymentModal
                            register={this.state.register}
                            closePaymentModal={this.closePaymentModal}
                            sumMoney={sumMoney(this.state.register)}
                        />
                    </Modal.Body>
                </Modal>
                <Modal
                    show={this.state.isOpenUserpackModal}
                    bsStyle="primary"
                    onHide={this.closeUserpackModal}
                >
                    <Modal.Header/>
                    <Modal.Body>
                        <UserpackModal
                            register_id={this.state.register.id}
                            closeUserpackModal={this.closeUserpackModal}
                        />
                    </Modal.Body>
                </Modal>


                <ChooseSeatHistoryModalContainer/>
            </div>
        );
    }
}

ListOrder.propTypes = {
    openChooseSeatHistoryModal: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    openChooseSeatModal: PropTypes.func.isRequired,
    registers: PropTypes.array.isRequired,
    filterByCampaign: PropTypes.func.isRequired,
    filterBySaler: PropTypes.func.isRequired,
};

export default ListOrder;
