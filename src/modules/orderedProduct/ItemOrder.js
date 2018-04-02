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
        const link = attach_info.link.substring(0, 15) + "...";
        let delivery_note;
        if (delivery.note) {
            delivery_note = delivery.note.length < 16 ? delivery.note : delivery.note.substring(0, 15) + "...";
        } else delivery_note = "";
        return (
            <tr>
                {
                    this.props.isSendingPrice && (
                        <td>
                            <CheckBoxMaterial
                                name="sale_status"
                                checked={this.props.check}
                                onChange={() => this.props.chooseItem(delivery.id)}
                            />
                        </td>
                    )
                }
                <td>
                    <Link
                        style={{
                            backgroundColor: ORDERED_STATUS_COLORS[delivery.status]
                        }}
                        className="btn text-name-student-register"
                        to={`/order/${delivery.id}/edit`}>
                        {delivery.code ? delivery.code : 'Không có mã'}
                    </Link>
                </td>
                <td>{delivery.created_at}</td>
                <td>
                    {
                        delivery.customer ? (
                            <span>{delivery.customer.name}<br/>
                        ({delivery.customer.phone})
                    </span>
                        ) : "Không nhập"
                    }
                </td>
                <td>
                    <TooltipButton text={attach_info.link} placement="top">
                        <a href={attach_info.link} target="_blank">{link}</a>
                    </TooltipButton>
                </td>
                <td>{attach_info.code}</td>
                <td>{attach_info.ratio}</td>
                <td>
                    {
                        delivery.staff ?

                            (
                                <TooltipButton text={delivery.staff.name} placement="top">
                                    <button className="btn btn-xs btn-main"
                                            style={{backgroundColor: delivery.staff.color ? delivery.staff.color : ''}}>
                                        {helper.getShortName(delivery.staff.name)}
                                    </button>
                                </TooltipButton>
                            )
                            :
                            (
                                <div>Không có</div>
                            )
                    }
                </td>
                <td style={{width: "120px"}}>
                    <StatusSelect options={ORDERED_STATUS}
                                  onChange={this.changeStatus}
                                  value={delivery.status}/>
                </td>
                <td>
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
                <td>
                    <TooltipButton text="Thanh toán" placement="top">
                        <button
                            onClick={() => this.props.showChooseWalletModal(delivery)}
                            className="btn btn-sm btn-success btn-main"
                            disabled={(delivery.status === "place_order")}>
                            {helper.dotNumber(delivery.total)}đ
                        </button>
                    </TooltipButton>
                </td>
                <td>
                    {helper.dotNumber(delivery.debt)}đ
                </td>
                {
                    delivery.delivery_warehouse_status !== "exported" ? (
                        <td>
                            <div className="btn-group-action">
                                <Link to={`/order/${delivery.id}/warehouse-import`}
                                      style={{
                                          color: "#878787",
                                          cursor: ORDERED_STATUS.filter(status => delivery.status === status.value)[0].order < 7
                                          && "not-allowed"
                                      }}
                                      data-toggle="tooltip" title=""
                                      type="button" rel="tooltip"
                                      data-original-title="Nhập kho">
                                    <i className="material-icons">import_export</i>
                                </Link>
                            </div>
                        </td>
                    ) : (
                        <td>
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
