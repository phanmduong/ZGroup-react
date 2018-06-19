import React from "react";
//import TooltipButton from '../../../components/common/TooltipButton';
//import Loading from "../../../components/common/Loading";
import {connect} from "react-redux";
import PropTypes from 'prop-types';


class BookingHistoryComponent extends React.Component {
    render() {
        return (
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>STT</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Phim</th>
                        <th>Phòng</th>
                        <th>Ghế</th>
                        <th>Mã giảm giá</th>
                        <th>Tiền</th>
                        <th>Thời gian đặt vé</th>
                        <th>Loại thanh toán</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.bookingHistories && this.props.bookingHistories.map((bk,index) => {
                            return (
                                <tr key={index}>
                                    <td>&ensp;{index+1}</td>
                                    <td>
                                        {bk.user_name}
                                    </td>
                                    <td>{bk.user_email}</td>
                                    <td>
                                        {bk.user_phone}
                                    </td>
                                    <td>
                                        {bk.film_name}
                                    </td>
                                    <td>
                                        {bk.room_name}
                                    </td>
                                    <td>{bk.seat_name}</td>
                                    <td>{bk.code}</td>
                                    <td>{bk.price}</td>
                                    <td>{bk.time} 12:34</td>
                                    <td>{bk.payment_method}</td>
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