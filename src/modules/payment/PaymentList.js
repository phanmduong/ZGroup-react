import React from "react";
import {Link} from 'react-router';
import PropTypes from "prop-types";
class PaymentList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <div className="table-responsive">

                <table id="datatables"
                       className="table table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead className="text-rose">
                    <tr>
                        <th/>
                        <th>Bên gửi</th>
                        <th>Bên nhận</th>
                        <th>Số tiền</th>
                        <th>Nội dung</th>
                        <th>Loại</th>
                        <th/>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map((pp) => {
                            return (
                                <tr key={pp.id}>
                                    <td/>
                                    <td>{pp.payer.name}</td>
                                    <td>{pp.receiver.name}</td>
                                    <td>{pp.money_value}</td>
                                    <td> {pp.description ? pp.description : "Không có"}</td>
                                    <td>{
                                        (pp.type === "debt_print") ? "Đặt in": (pp.type=== "debt_export")?
                                            "Xuất hàng" : "Thanh toán"
                                    }</td>
                                    <td>
                                        <div className="btn-group-action">
                                            <div style={{display: "inline-block"}}>
                                                <Link data-toggle="tooltip" title="Sửa"
                                                      to={"/business/company/payment/edit/" + pp.id}
                                                      type="button" rel="tooltip">
                                                    <i className="material-icons">edit</i>
                                                </Link>
                                            </div>
                                            <a data-toggle="tooltip" title="Thông tin"
                                                onClick={() => this.props.openInfoModal(pp)} type="button"
                                               rel="tooltip">
                                                <i className="material-icons">info</i>
                                            </a>
                                        </div>
                                    </td>
                                    <td/>
                                </tr>
                            );
                        })
                    }
                    </tbody>

                </table>
            </div>
        );
    }
}
PaymentList.propTypes ={
    data: PropTypes.array.isRequired,
    openInfoModal: PropTypes.func.isRequired,
};
export default PaymentList;