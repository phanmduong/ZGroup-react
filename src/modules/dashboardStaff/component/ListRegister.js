import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { store } from "../dashboardStaffStore";
import { dotNumber, formatPhone } from "../../../helpers/helper";
import TooltipButton from "../../../components/common/TooltipButton";

@observer
export default class componentName extends Component {
    @observable type = 1;
    render() {
        const registers = this.type == 1 ? store.user.registers_paid : store.user.registers;
        return (
            <div className="card">
                <div className="card-content">
                    <div className="tab-content">
                        <h4 className="card-title">
                            <strong>Danh sách đăng kí</strong>
                        </h4>
                        <br />
                        <div>
                            <button
                                className={
                                    "btn btn-round margin-right-10" + (this.type == 1 ? " btn-rose" : "")
                                }
                                onClick={() => (this.type = 1)}>
                                Đã nộp tiền ({store.user.total_registers_paid})
                            </button>
                            <button
                                className={
                                    "btn btn-round margin-right-10 margin-left-20" +
                                    (this.type == 0 ? " btn-rose" : "")
                                }
                                onClick={() => (this.type = 0)}>
                                Chưa đóng tiền ({store.user.total_registers})
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table
                                className="table table-striped table-no-bordered table-hover"
                                cellSpacing="0"
                                width="100%"
                                style={{ width: "100%" }}>
                                <thead className="text-rose">
                                    <tr>
                                        <th>Lớp</th>
                                        <th>Gọi</th>
                                        <th>Họ tên</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Mã thẻ</th>
                                        <th>Chiến dịch</th>
                                        <th>Học phí</th>
                                        <th>Đăng kí</th>
                                        <th>Hẹn nộp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registers.map(register => {
                                        let btn = "";
                                        let titleCall = "Chưa gọi - Còn " + register.time_to_reach + "h";
                                        if (register.call_status === "success") {
                                            btn = " btn-success";
                                            titleCall =
                                                "Gọi thành công trong vòng " + register.time_to_reach + "h";
                                        } else if (register.call_status === "failed") {
                                            btn = " btn-danger";
                                            titleCall = "Gọi thất bại - Còn " + register.time_to_reach + "h";
                                        } else if (register.call_status === "calling") {
                                            btn = " btn-info";
                                            titleCall = "Đang gọi";
                                        }
                                        return (
                                            <tr key={register.id}>
                                                <td>
                                                    <div className="container-dot-bottom-right">
                                                        <button
                                                            className="btn btn-round btn-fab btn-fab-mini text-white"
                                                            data-toggle="tooltip"
                                                            title=""
                                                            type="button"
                                                            rel="tooltip"
                                                            data-placement="right"
                                                            data-original-title={register.class.name}>
                                                            <img src={register.course_avatar_url} alt="" />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="container-call-status">
                                                        <button
                                                            className={
                                                                "btn btn-round " +
                                                                btn +
                                                                " full-width padding-left-right-10"
                                                            }
                                                            data-toggle="tooltip"
                                                            title=""
                                                            type="button"
                                                            rel="tooltip"
                                                            data-original-title={titleCall}>
                                                            <i className="material-icons">phone</i>{" "}
                                                            {register.call_status !== "calling" &&
                                                                register.time_to_reach + "h"}
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a
                                                        href={`/sales/info-student/${register.student_id}`}
                                                        className="text-name-student-register">
                                                        {register.name}
                                                    </a>
                                                </td>
                                                <td>
                                                    <div
                                                        id="register-email"
                                                        data-toggle="tooltip"
                                                        title=""
                                                        type="button"
                                                        rel="tooltip"
                                                        data-original-title={register.email}>
                                                        {register.email}
                                                    </div>
                                                </td>
                                                <td>
                                                    <a
                                                        href={"tel:" + register.phone}
                                                        className="text-name-student-register">
                                                        {formatPhone(register.phone)}
                                                    </a>
                                                </td>
                                                {this.props.genId == 0 && <th>{register.gen_name}</th>}
                                                <td>{register.code}</td>
                                                <td>
                                                    {register.campaign ? (
                                                        <button
                                                            className="btn btn-xs btn-main"
                                                            style={{
                                                                backgroundColor: "#" + register.campaign.color
                                                            }}>
                                                            {register.campaign.name}
                                                            <div className="ripple-container" />
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn-xs btn-main no-data">
                                                            Không có
                                                            <div className="ripple-container" />
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {register.paid_status ? (
                                                        <div
                                                            className="btn btn-xs btn-main main-background-color"
                                                            data-toggle="tooltip"
                                                            title=""
                                                            type="button"
                                                            rel="tooltip"
                                                            data-original-title={register.note}>
                                                            {dotNumber(register.money)} vnd
                                                        </div>
                                                    ) : (
                                                        "Chưa nộp"
                                                    )}
                                                </td>
                                                <td>
                                                    <div
                                                        data-toggle="tooltip"
                                                        title=""
                                                        type="button"
                                                        rel="tooltip"
                                                        data-original-title={register.created_at}>
                                                        {register.created_at}
                                                    </div>
                                                </td>
                                                <td>
                                                    <TooltipButton
                                                        text={register.appointment_payment_date}
                                                        placement="top">
                                                        <div>{register.appointment_payment}</div>
                                                    </TooltipButton>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
