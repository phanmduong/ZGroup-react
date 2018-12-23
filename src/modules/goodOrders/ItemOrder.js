import React from "react";
import {Link} from "react-router";
import TooltipButton from "../../components/common/TooltipButton";
import * as helper from "../../helpers/helper";
import PropTypes from "prop-types";
import {ORDER_STATUS, ORDER_STATUS_COLORS} from "../../constants/constants";
import StatusSelect from "./status/StatusSelect";

class ItemOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeStatusOrder = this.changeStatusOrder.bind(this);
    }

    statusOrder(status) {
        switch (status) {
            case "ship_uncall":
                return (
                    <TooltipButton text="Chưa gọi ship" placement="top">
                        <button className="btn btn-xs btn-main btn-info">
                            Chưa gọi ship
                        </button>
                    </TooltipButton>
                );
            case "success":
                return (
                    <TooltipButton text="Chưa gọi ship" placement="top">
                        <button className="btn btn-xs btn-main btn-success">
                            Hoàn thành
                        </button>
                    </TooltipButton>
                );
            case "pending":
                return (
                    <TooltipButton text="Đang chờ" placement="top">
                        <button className="btn btn-xs btn-main">
                            Đang chờ
                        </button>
                    </TooltipButton>
                );
            default:
                return null;
        }
    }

    changeStatusOrder(value) {
        const user = this.props.user;
        let currentStatus = ORDER_STATUS.filter(
            status => this.props.order.status === status.value
        )[0];
        let nextStatus = ORDER_STATUS.filter(
            status => status.value === value
        )[0];
        if (nextStatus.order < currentStatus.order && user.role !== 2) {
            helper.showErrorNotification(
                "Không thể chuyển về trạng thái trước"
            );
        } else {
            if (currentStatus.order < 2 && nextStatus.order > 1) {
                this.props.showSelectWarehouseModal(value, this.props.order.id);
            } else {
                helper.confirm(
                    "error",
                    "Chuyển trạng thái",
                    "Bạn có chắc muốn chuyển trạng thái",
                    () => {
                        this.props.changeStatusOrder(
                            value,
                            this.props.order.id,
                            null
                        );
                    }
                );
            }
        }
    }

    render() {
        const order = this.props.order;
        let order_note;
        if (order.note) {
            order_note =
                order.note.length < 16
                    ? order.note
                    : order.note.substring(0, 15) + "...";
        } else order_note = "";
        return (
            <tr>
                <td>
                    <Link
                        style={{
                            backgroundColor: ORDER_STATUS_COLORS[order.status]
                        }}
                        className="btn text-name-student-register"
                        to={`/good/goods/order/${order.id}`}
                    >
                        {order.code ? order.code : "Không có mã"}
                    </Link>
                </td>
                <td>{order.created_at}</td>
                <td>{order.customer ? order.customer.name : "Không nhập"}</td>
                <td>
                    {order.staff ? (
                        <TooltipButton text={order.staff.name} placement="top">
                            <button
                                className="btn btn-xs btn-main"
                                style={{
                                    backgroundColor: order.staff.color
                                        ? order.staff.color
                                        : ""
                                }}
                            >
                                {helper.getShortName(order.staff.name)}
                            </button>
                        </TooltipButton>
                    ) : (
                        <div>Không có</div>
                    )}
                </td>
                <td>
                    {order.base ? (
                        <TooltipButton text={order.base.name} placement="top">
                            <button className="btn btn-xs btn-main">
                                {order.base.name}
                            </button>
                        </TooltipButton>
                    ) : (
                        <div>Không có</div>
                    )}
                </td>
                <td>
                    <StatusSelect
                        options={ORDER_STATUS}
                        onChange={this.changeStatusOrder}
                        value={order.status}
                    />
                </td>
                <td>
                    <a
                        data-toggle="tooltip"
                        title="Ghi chú"
                        type="button"
                        className="text-rose"
                        rel="tooltip"
                        onClick={() => this.props.showAddNoteModal(order)}
                    >
                        {order_note === "" ? (
                            <i className="material-icons">edit</i>
                        ) : (
                            <p>{order_note}</p>
                        )}
                    </a>
                </td>
                <td>{helper.dotNumber(order.ship_money)}đ</td>
                <td>{helper.dotNumber(order.total)}đ</td>
                <td>{helper.dotNumber(order.debt)}đ</td>
                <td>
                    <button
                        disabled={order.status !== "ship_order"}
                        className="btn btn-social btn-fill btn-twitter"
                        onClick={() => this.props.showShipGoodModal(order)}
                    >
                        <i className="fa fa-twitter"/> Ship hàng
                    </button>
                </td>
            </tr>
        );
    }
}

ItemOrder.propTypes = {
    order: PropTypes.object.isRequired,
    changeStatusOrder: PropTypes.func.isRequired,
    showShipGoodModal: PropTypes.func.isRequired,
    showAddNoteModal: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    showSelectWarehouseModal: PropTypes.func.isRequired
};

export default ItemOrder;
