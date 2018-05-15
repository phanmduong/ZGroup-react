import React from 'react';
import {Link} from 'react-router';
import TooltipButton from '../../components/common/TooltipButton';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import {ORDERED_STATUS, ORDERED_STATUS_COLORS} from "../../constants/constants";
import StatusSelect from "../goodOrders/status/StatusSelect";
import CheckBoxMaterial from "../../components/common/CheckBoxMaterial";

class ItemOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus(value) {
        const user = this.props.user;
        const delivery = this.props.delivery;
        let currentStatus = ORDERED_STATUS.filter(status => this.props.delivery.status === status.value)[0];
        let nextStatus = ORDERED_STATUS.filter(status => status.value === value)[0];
        if (nextStatus.order < currentStatus.order && user.role !== 2) {
            helper.showErrorNotification("Không thể chuyển về trạng thái trước");
        } else {
            if (nextStatus.order === 8) {
                this.props.showAddCancelNoteModal([delivery]);
            } else if (nextStatus.order === 1) {
                this.props.showSendPriceModal([delivery]);
            } else if (nextStatus.order === 3) {
                this.props.showAddJavCodeModal([delivery]);
            } else if (nextStatus.order === 4) {
                this.props.showCameToVNModal([delivery]);
            } else if (nextStatus.order === 5) {
                this.props.showImportWeightModal([delivery]);
            } else if (nextStatus.order === 6) {
                this.props.showAddShipFeeModal([delivery]);
            } else {
                helper.confirm("error", "Chuyển trạng thái", "Bạn có chắc muốn chuyển trạng thái", () => {
                    const deliveryOrders = [{
                        id: this.props.delivery.id,
                        attach_info: this.props.delivery.attach_info
                    }];
                    this.props.changeStatus(value, deliveryOrders, null);
                });
            }
        }
    }

    render() {
        const delivery = this.props.delivery;
        const attach_info = JSON.parse(delivery.attach_info);
        const link = attach_info.link.length > 40 ? (attach_info.link.substring(0, 39) + "...") : attach_info.link;
        let delivery_note;
        if (delivery.note) {
            delivery_note = delivery.note.length < 16 ? delivery.note : (delivery.note.substring(0, 15) + "...");
        } else delivery_note = "";
        return (
            <tr>
                {
                    this.props.isSendingPrice && (
                        <td style={{padding: "0 5px"}}>
                            <CheckBoxMaterial
                                name="sale_status"
                                checked={this.props.check}
                                onChange={() => this.props.chooseItem(delivery.id)}
                            />
                        </td>
                    )
                }
                <td style={{padding: "0 5px"}}>
                    <Link
                        style={{
                            backgroundColor: ORDERED_STATUS_COLORS[delivery.status]
                        }}
                        className="btn btn-sm btn-success btn-main text-name-student-register"
                        //className="btn text-name-student-register"
                        to={`/order/${delivery.id}/edit`}>
                        {delivery.code ? delivery.code : 'Không có mã'}
                    </Link>
                </td>
                <td style={{
                    padding: "0 5px",
                }}>
                    <div style={{
                        cursor: "default"
                    }}
                         className="btn btn-xs btn-simple btn-main text-name-student-register">{delivery.created_at}</div>
                </td>
                <td style={{padding: "0 5px"}}>
                    {
                        delivery.customer ? (
                            <span>{delivery.customer.name || ''}&nbsp;
                                ({delivery.customer.phone || ''})<br/>
                                {delivery.customer.email || ''}<br/>{delivery.customer.address || ''}
                    </span>
                        ) : "Không nhập"
                    }
                </td>
                <td style={{padding: "0 5px"}}>
                    <a href={attach_info.link} target="_blank">{link}</a>
                </td>
                <td>{attach_info.size}</td>
                <td>{attach_info.color}</td>
                <td style={{padding: "0 5px"}}>
                    {attach_info.code}</td>
                <td>{attach_info.ratio}</td>
                <td style={{padding: "0 5px"}}>
                    {
                        delivery.staff ?

                            (
                                <TooltipButton text={delivery.staff.name} placement="top">
                                    <span className="label label-rose"
                                            style={{backgroundColor: delivery.staff.color ? delivery.staff.color : ''}}>
                                        {helper.getShortName(delivery.staff.name)}
                                    </span>
                                </TooltipButton>
                            )
                            :
                            (
                                <div>Không có</div>
                            )
                    }
                </td>
                <td style={{padding: "0 5px"}}>
                    <StatusSelect options={ORDERED_STATUS}
                                  onChange={this.changeStatus}
                                  value={delivery.status}/>
                </td>
                <td style={{padding: "0 5px"}}>
                    <a type="button" onClick={() => this.props.showAddNoteModal(delivery)}>
                        {
                            delivery_note === "" ? (
                                <i className="material-icons">edit</i>
                            ) : (
                                <p>{delivery_note}</p>
                            )
                        }
                    </a>
                </td>
                <td style={{padding: "0 5px"}}>
                    <TooltipButton text="Thanh toán" placement="top">
                        <button
                            onClick={() => this.props.showChooseWalletModal(delivery)}
                            className="btn btn-xs btn-success btn-main"
                            disabled={(delivery.status === "place_order")}>
                            {helper.dotNumber(delivery.total)}đ
                        </button>
                    </TooltipButton>
                </td>
                <td style={{padding: "0 5px"}}>
                    {helper.dotNumber(delivery.debt)}đ
                </td>
                {
                    delivery.delivery_warehouse_status !== "exported" ? (
                        <td style={{padding: "0 5px"}}>
                            {
                                ORDERED_STATUS.filter(status => delivery.status === status.value)[0].order > 6 && (
                                    <div className="btn-group-action">
                                        <Link to={`/order/${delivery.id}/warehouse-import`}
                                              data-toggle="tooltip" title=""
                                              type="button" rel="tooltip"
                                              data-original-title="Nhập kho">
                                            <i className="material-icons">import_export</i>
                                        </Link>
                                    </div>
                                )
                            }
                        </td>
                    ) : (
                        <td style={{padding: "0 5px"}}>
                            <span>Đã nhập kho</span>
                        </td>
                    )
                }
            </tr>
        );
    }
}

ItemOrder.propTypes = {
    delivery: PropTypes.object.isRequired,
    changeStatus: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    showAddNoteModal: PropTypes.func.isRequired,
    showAddCancelNoteModal: PropTypes.func.isRequired,
    showSendPriceModal: PropTypes.func.isRequired,
    check: PropTypes.bool.isRequired,
    isSendingPrice: PropTypes.bool.isRequired,
    chooseItem: PropTypes.func.isRequired,
    showChooseWalletModal: PropTypes.func.isRequired,
    showAddJavCodeModal: PropTypes.func.isRequired,
    showCameToVNModal: PropTypes.func.isRequired,
    showImportWeightModal: PropTypes.func.isRequired,
    showAddShipFeeModal: PropTypes.func.isRequired
};

export default ItemOrder;
