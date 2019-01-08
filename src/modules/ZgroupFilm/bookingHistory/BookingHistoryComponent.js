import React from "react";
//import TooltipButton from '../../../components/common/TooltipButton';
//import Loading from "../../../components/common/Loading";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Switch from 'react-bootstrap-switch';
import TooltipButton from '../../../components/common/TooltipButton';


class BookingHistoryComponent extends React.Component {
    render() {
        return (
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>STT</th>
                        <th>Thời gian <br/> đặt vé</th>
                        <th>Mã đơn hàng</th>
                        <th>Họ tên</th>
                        <th>Phone</th>
                        <th>Phim</th>
                        <th>Thời gian <br/> chiếu</th>
                        <th>Ghế</th>
                        <th>Tiền (VNĐ)</th>
                        <th>Loại giảm giá</th>
                        <th>Người bán</th>
                        <th>HTTT</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.bookingHistories && this.props.bookingHistories.map((bk, index) => {
                            return (
                                <tr key={index}>
                                    <td>&nbsp;{this.props.totalCount + 20 - index - this.props.currentPage * 20}</td>
                                    <td>&emsp;&nbsp;{bk.time.slice(11, 16)}
                                        <br/> {bk.time.slice(8, 10)}/{bk.time.slice(5, 7)}/{bk.time.slice(0, 4)}
                                    </td>
                                    <td>
                                        {bk.order_code}
                                    </td>
                                    <td>
                                        {bk.user_name}
                                    </td>
                                    <td>
                                        {bk.user_phone}
                                    </td>
                                    <td>
                                        {bk.film_name}
                                    </td>
                                    <td>&emsp;&nbsp;{bk.session_time.slice(0, 5)}
                                        <br/> {bk.session_date.slice(8, 10)}/{bk.session_date.slice(5, 7)}/{bk.session_date.slice(0, 4)}
                                    </td>
                                    <td>
                                        {bk.seat_name}
                                    </td>
                                    <td className="film-name" style={{textAlign: "right"}}>
                                        {bk.price > 0 ? Math.floor(bk.price / 1000) + ".000" : '0 đ '}
                                    </td>
                                    <td className="film-name">
                                        <TooltipButton text={(bk && bk.code_info) || ''} placement="top">
                                            <span>
                                        {bk.code_name}
                                        </span>
                                        </TooltipButton>
                                    </td>
                                    <td>
                                        {bk.staff_name}
                                    </td>
                                    <td>

                                        <Switch
                                            value={bk.payment_method === "online"}
                                            onText="On" offText="Off"
                                            bsSize="mini"
                                        />
                                    </td>
                                    <td>

                                        <div className="btn-group-action">
                                            <TooltipButton text="Resend Email" placement="top"
                                                           style={{display: "inline-block"}}>
                                                <a style={{color: "#878787"}}
                                                   onClick={() => {
                                                       this.props.sendMail(bk.register_id, bk.code, bk.payment_method);
                                                   }}>
                                                    <i className="material-icons">send</i>
                                                </a>
                                            </TooltipButton>
                                        </div>


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
    totalCount: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    sendMail: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        bookingHistories: state.bookingHistory.bookingHistories,
        totalCount: state.bookingHistory.totalCount,
        totalPages: state.bookingHistory.totalPages,
        currentPage: state.bookingHistory.currentPage,
    };
}


export default connect(mapStateToProps)(BookingHistoryComponent);