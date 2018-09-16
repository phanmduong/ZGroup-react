import React from 'react';
import TooltipButton from '../../../components/common/TooltipButton';
import * as helper from '../../../helpers/helper';
import PropTypes from 'prop-types';
import EditButton from "./EditButton";


class ListGood extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isEdit: false,
        };
        this.searchTable = this.searchTable.bind(this);
    }

    componentDidMount() {
        $.material.init();
    }


    searchTable(value) {
        this.table.search(value).draw();
    }

    render() {
        let totalMoneyAll = 0;
        return (
            <div style={{marginTop: 50}}>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="text-rose">
                        <tr>
                            <th>STT</th>
                            <th>Mã hàng</th>
                            <th>Tên hàng</th>
                            <th>Số lượng</th>
                            <th>Giá bán</th>
                            <th>Chiết khấu</th>
                            <th>Thành tiền</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.goodOrders && this.props.goodOrders.map((goodOrder, index) => {
                                let totalMoney = goodOrder.quantity * goodOrder.price;

                                if (goodOrder.discount_money) {
                                    totalMoney -= goodOrder.discount_money;
                                } else {
                                    if (goodOrder.discount_percent) {
                                        totalMoney *= (100 - goodOrder.discount_percent) / 100;
                                    }
                                }

                                totalMoneyAll += totalMoney;

                                return (
                                    <tr key={index}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {goodOrder.code}
                                        </td>
                                        <td>{goodOrder.name}</td>
                                        <EditButton
                                            goodOrder={goodOrder}
                                            index={index}
                                            updateQuantity={this.props.updateQuantity}
                                            orderId={this.props.orderId}
                                            quantity={goodOrder.quantity}
                                            isReturnOrders={this.props.isReturnOrders}
                                        />
                                        <td>{helper.dotNumber(goodOrder.price)}đ</td>
                                        <td>
                                            <div style={{display: 'inline-block'}}>
                                                {(goodOrder.discount_money || goodOrder.discount_percent) &&
                                                <TooltipButton text="Giảm giá" placement="top">
                                                    <div className="flex-row-center">
                                                        <i className="material-icons">card_giftcard</i>
                                                        {goodOrder.discount_money ? helper.dotNumber(goodOrder.discount_money) + 'đ'
                                                            : goodOrder.discount_percent + '%'}
                                                    </div>
                                                </TooltipButton>
                                                }
                                            </div>

                                        </td>
                                        <td className="text-align-right">{helper.dotNumber(Math.round(totalMoney))}đ</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <th/>
                            <th><b>Tổng</b></th>
                            <th className="text-align-right" colSpan="5">
                                <b>{helper.dotNumber(totalMoneyAll)}đ</b>
                            </th>
                            <th/>
                        </tr>
                        <tr>
                            <th/>
                            <th>
                                <b>Giảm</b>
                            </th>
                            <th className="text-align-right" colSpan="5">
                                <b>0%</b>
                            </th>
                            <th/>
                        </tr>
                        <tr>
                            <th/>
                            <th>
                                <b>Thuế</b>
                            </th>
                            <th className="text-align-right" colSpan="5">
                                <b>0%</b>
                            </th>
                            <th/>
                        </tr>
                        <tr>
                            <th/>
                            <th>
                                <h4><b>Phải trả</b></h4>
                            </th>
                            <th className="text-align-right" colSpan="5">
                                <h4><b>{helper.dotNumber(totalMoneyAll)}đ</b></h4>
                            </th>
                            <th/>
                        </tr>

                        <tr>
                            <th/>
                            <th>
                                <h4><b>Còn lại</b></h4>
                            </th>
                            <th className="text-align-right" colSpan="5">
                                <h4><b>{helper.dotNumber(totalMoneyAll - this.props.paid)}đ</b></h4>
                            </th>
                            <th/>
                        </tr>

                        </tfoot>
                    </table>
                </div>
            </div>

        );
    }
}

ListGood.propTypes = {
    goodOrders: PropTypes.array.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    paid: PropTypes.number,
    orderId: PropTypes.number.isRequired,
    isReturnOrders: PropTypes.bool.isRequired,
};

export default ListGood;
