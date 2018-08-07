import React from "react";
//import TooltipButton from '../../../components/common/TooltipButton';
//import Loading from "../../../components/common/Loading";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Switch from 'react-bootstrap-switch';

class BookingHistoryComponent extends React.Component {
    render() {
        return (
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>STT</th>
                        <th>Thời gian đặt vé</th>
                        <th>Họ tên</th>
                        <th>Phone</th>
                        <th>Phim</th>
                        <th>Ghế</th>
                        <th>Tiền (VNĐ)</th>
                        <th>Loại giảm giá</th>
                        <th>Hình thức <br/> thanh toán</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.bookingHistories && this.props.bookingHistories.map((bk, index) => {
                            return (
                                <tr key={index}>
                                    <td>&ensp;{index + 1}</td>
                                    <td>{bk.time.slice(11, 16)} - {bk.time.slice(8, 10)}/{bk.time.slice(5, 7)}/{bk.time.slice(0, 4)}</td>
                                    <td>
                                        {bk.user_name}
                                    </td>
                                    <td>
                                        {bk.user_phone}
                                    </td>
                                    <td>
                                        {bk.film_name}
                                    </td>
                                    <td>
                                        {bk.seat_name}
                                    </td>
                                    <td>
                                        {Math.floor(bk.price / 1000)}.000
                                    </td>
                                    <td>
                                        {bk.code_name}
                                    </td>
                                    <td>

                                        <Switch
                                            value={bk.payment_method === "online"}
                                            onText="Online" offText="Offline"
                                            bsSize="mini"
                                        />
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

BookingHistoryComponent.propTypes = {
    bookingHistories: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        bookingHistories: state.bookingHistory.bookingHistories
    };
}


export default connect(mapStateToProps)(BookingHistoryComponent);