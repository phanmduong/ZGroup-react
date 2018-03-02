import React from "react";
import Loading from "../../components/common/Loading";
import PropTypes from "prop-types";
import * as helper from "../../helpers/helper";

// import {Link} from "react-router";
import { Modal } from "react-bootstrap";
import CallModal from "./CallModal";
import { REGISTER_STATUS } from "../../constants/constants";
import TooltipButton from "../../components/common/TooltipButton";
import ChooseSeatModalContainer from "./chooseSeat/ChooseSeatModalContainer";

import moment from "moment/moment";

export function setRuleShowCall(register) {
    let btn = "";
    let titleCall = "";
    let showCall;
    let created_time = Date.parse(
        moment(register.created_at, "HH:mm DD-MM-YYYY").format(
            "HH:mm MM-DD-YYYY",
        ),
    ); // Phai chuyen sang dinh dang moi parsr duoc
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
    // let lastCall = Date.parse(moment(call.created_at));

    // console.log(expiredTime, Date.parse(register.teleCalls[0] && register.teleCalls[0].created_at),"sadasd");

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
class ListOrder extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isOpenModal: false,
            register: {},
            isOpenCallModal: false,
            isCallModal : false,
        };

        this.openCallModal = this.openCallModal.bind(this);
        this.closeCallModal = this.closeCallModal.bind(this);
        this.openChooseSeatModal = this.openChooseSeatModal.bind(this);
    }

    openCallModal(register,isCallModal) {
        this.setState({ isOpenCallModal: true, register: register,isCallModal : isCallModal });
    }

    closeCallModal() {
        this.setState({ isOpenCallModal: false });
    }
    
    openChooseSeatModal(base){
        this.props.openChooseSeatModal(base);
    }

    render() {
        // console.log(this.props.registers,"QQQQQQQQ");

        return (
            <div className="table-responsive">
                {this.props.isLoading ? (
                    <Loading />
                ) : (
                    <table className="table table-hover">
                        <ChooseSeatModalContainer />
                        <thead className="text-rose">
                        <tr>
                            <th>Gọi</th>
                            <th>Khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Mã đăng ký</th>
                            <th>Saler</th>
                            <th>Trạng thái</th>
                            <th>Chiến dịch</th>
                            <th>Giá tiền</th>
                            <th>Tiền đã trả</th>
                            <th>Đăng ký</th>
                            <th />
                            <th />
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
                                        <td>{register.code || "Chưa có"}</td>
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
                                            {register.status !== "" ? (
                                                <button
                                                    className={
                                                        "btn btn-round " +
                                                        btn +
                                                        " full-width padding-left-right-10"
                                                    }
                                                    onClick={() =>
                                                        this.openCallModal(
                                                            register,true
                                                        )
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            "#" + "5BBD2B",
                                                    }}
                                                >
                                                    {
                                                        REGISTER_STATUS.filter(
                                                            status =>
                                                                status.value ===
                                                                register.status,
                                                        )[0].label
                                                    }
                                                    <div className="ripple-container" />
                                                </button>
                                            ) : (
                                                <button className="btn btn-xs btn-main">
                                                    Chưa có
                                                </button>
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
                                                    {/*  deleete*/}
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
                                        <td>{register.created_at}</td>
                                        <td>
                                            <a
                                                onClick={
                                                    () => this.openChooseSeatModal(register.base.base)
                                                }
                                                style={{ color: "#888" }}
                                            >
                                                <i className="material-icons">
                                                    add_circle
                                                </i>
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
                                    <td>{register.created_at}</td>
                                    <td>
                                        <a
                                            onClick={() =>
                                                this.props.openChooseSeatModal(
                                                    register.base.base.id,
                                                )
                                            }
                                            style={{ color: "#888" }}
                                        >
                                            <i className="material-icons">
                                                add_circle
                                            </i>
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            onClick={() =>
                                                this.openCallModal(
                                                    register,false
                                                )
                                            }
                                            style={{ color: "#888" }}
                                        >
                                            <i className="material-icons">
                                                add_circle
                                            </i>
                                        </a>
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
                            isCallModal =  {this.state.isCallModal}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

ListOrder.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    openChooseSeatModal: PropTypes.func.isRequired,
    registers: PropTypes.array.isRequired,
    filterByCampaign: PropTypes.func.isRequired,
    filterBySaler: PropTypes.func.isRequired,
};

export default ListOrder;
