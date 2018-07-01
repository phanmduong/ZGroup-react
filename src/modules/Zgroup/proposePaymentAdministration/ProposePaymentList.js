import React from "react";
import { Link } from 'react-router';
import PropTypes from "prop-types";
import * as helper from "../../../helpers/helper";

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
                    cellSpacing="0" width="100%" style={{ width: "100%" }}>
                    <thead className="text-rose">
                        <tr>

                            <th>STT</th>
                            <th>Mã đề xuất</th>
                            <th>Bên gửi</th>
                            <th>Bên nhận</th>
                            <th> Hạn thanh toán </th>
                            <th> Ngày tạo </th>
                            <th>Trạng thái</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map((pp, index) => {
                                const toggleInfo =
                                    (this.props.user.role == 2 || this.props.user.id == pp.staff.id) 
                                        ?  () => this.props.openInfoModal(pp) 
                                            : ()=>{};
                                let status = 'Chưa duyệt'                                            ;
                                switch(pp.status){
                                    case 1:{
                                        status = 'Đã duyệt';
                                        break;
                                    }
                                    case 2:{
                                        status = 'Đã thanh toán';
                                        break;
                                    }
                                }
                                return (
                                    <tr key={pp.id}>
                                        <td onClick={toggleInfo}>{index + 1}</td>
                                        <td onClick={toggleInfo}><b>{pp.command_code}</b></td>
                                        <td onClick={toggleInfo}>{pp.payer.name}</td>
                                        <td onClick={toggleInfo}>{pp.receiver.name}</td>
                                        <td onClick={toggleInfo}>{pp.deadline}</td>
                                        <td onClick={toggleInfo}>{pp.created_at}</td>
                                        <td onClick={toggleInfo}>{status}</td>
                                        <td>
                                            {(pp.status === 0 && this.props.user.role == 2) ?
                                                <div className="btn-group-action">
                                                    <a data-toggle="tooltip" title="Duyệt"
                                                        onClick={() => {
                                                            helper.confirm('warning','Duyệt đề xuất', 'Bạn có chắc muốn duyệt?', ()=>this.props.changeStatus(pp.id, 1));
                                                        }} type="button"
                                                        rel="tooltip">
                                                        <i className="material-icons">done</i>
                                                    </a>
                                                    <div style={{ display: "inline-block" }}>
                                                        <Link data-toggle="tooltip" title="Sửa"
                                                            to={"/business/propose-payment/edit/" + pp.id}
                                                            type="button" rel="tooltip">
                                                            <i className="material-icons">edit</i>
                                                        </Link>
                                                    </div>
                                                    {/* <a data-toggle="tooltip" title="Thông tin"
                                               onClick={() => this.props.openInfoModal(pp)} type="button"
                                               rel="tooltip">
                                                <i className="material-icons">info</i>
                                            </a> */}
                                                </div> : null}
                                        </td>
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

PaymentList.propTypes = {
    data: PropTypes.array.isRequired,
    openInfoModal: PropTypes.func.isRequired,
    changeStatus: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};
export default PaymentList;