import React from 'react';
import {Link} from 'react-router';
import TooltipButton from '../../components/common/TooltipButton';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import {ORDERED_STATUS, ORDER_STATUS_COLORS} from "../../constants/constants";
import StatusSelect from "../goodOrders/status/StatusSelect";

class ItemOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.changeStatusOrder = this.changeStatusOrder.bind(this);
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

    /*changeStatusOrder(value) {
        const user = this.props.user;
        let currentStatus = ORDER_STATUS.filter(status => this.props.order.status === status.value)[0];
        let nextStatus = ORDER_STATUS.filter(status => status.value === value)[0];
        if (nextStatus.order < currentStatus.order && user.role !== 2) {
            helper.showErrorNotification("Không thể chuyển về trạng thái trước");
        } else {
            helper.confirm("error", "Chuyển trạng thái", "Bạn có chắc muốn chuyển trạng thái", () => {
                this.props.changeStatusOrder(value, this.props.order.id);
            });
        }
    }*/

    render() {
        const order = this.props.order;
        let order_note;
        if (order.note) {
            order_note = order.note.length < 16 ? order.note : order.note.substring(0, 15) + "...";
        } else order_note = "";
        return (
            <tr>
                <td>
                    <Link
                        style={{
                            backgroundColor: ORDER_STATUS_COLORS[order.status]
                        }}
                        className="btn text-name-student-register"
                        to={`/good/goods/order/${order.id}`}>
                        {order.code ? order.code : 'Không có mã'}
                    </Link>
                </td>
                <td>{order.created_at}</td>
                <td>
                    {
                        order.customer ? (
                            <span>{order.customer.name}<br/>
                        ({order.customer.phone})
                    </span>
                        ) : "Không nhập"
                    }
                </td>
                <td>
                    {
                        order.staff ?

                            (
                                <TooltipButton text={order.staff.name} placement="top">
                                    <button className="btn btn-xs btn-main"
                                            style={{backgroundColor: order.staff.color ? order.staff.color : ''}}>
                                        {helper.getShortName(order.staff.name)}
                                    </button>
                                </TooltipButton>
                            )
                            :
                            (
                                <div>Không có</div>
                            )
                    }
                </td>
                <td>
                    <StatusSelect options={ORDERED_STATUS}
                        //onChange={this.changeStatusOrder}
                                  value={order.status}/>
                </td>
                <td>
                    <a data-toggle="tooltip" title="Ghi chú" type="button"
                       rel="tooltip" onClick={() => this.props.showAddNoteModal(order)}>
                        {
                            order_note === "" ? (
                                <i className="material-icons">edit</i>
                            ) : (
                                <p>{order_note}</p>
                            )
                        }
                    </a>
                </td>
                <td>{helper.dotNumber(order.total)}đ</td>
                <td>
                    <div className="btn-group-action">
                        <Link to={`/order/${order.id}/edit`}
                              style={{color: "#878787"}}
                              data-toggle="tooltip" title=""
                              type="button" rel="tooltip"
                              data-original-title="Sửa">
                            <i className="material-icons">edit</i>
                        </Link>
                        <Link to={`/order/${order.id}/warehouse-import`}
                              style={{color: "#878787"}}
                              data-toggle="tooltip" title=""
                              type="button" rel="tooltip"
                              data-original-title="Nhập kho">
                            <i className="material-icons">import_export</i>
                        </Link>
                    </div>
                </td>
            </tr>
        );
    }
}

ItemOrder.propTypes = {
    order: PropTypes.object.isRequired,
    //changeStatusOrder: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    showAddNoteModal: PropTypes.func.isRequired
};

export default ItemOrder;
