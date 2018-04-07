import React from "react";
import Loading from "../../../components/common/Loading";
import PropTypes from "prop-types";
import * as helper from "../../../helpers/helper";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as registerManageMeetingRoomAction from "../actions/registerManageMeetingRoomAction";
import {Tooltip, OverlayTrigger} from "react-bootstrap";
import moment from "moment/moment";
import PaymentModal from "../container/PaymentModal";
import DatetimeModal from "../container/DatetimeModal";

export function fixTime(register) {
    const time = register.extra_time -
        (moment(register.official_end_time || 0, "YYYY-MM-DD HH:mm:ss").valueOf()
            - moment(register.official_start_time || 0, "YYYY-MM-DD HH:mm:ss").valueOf()
        ) / 3600000;
    const hour = Math.floor(time);
    const minute = (Math.floor((time - Math.floor(time)) * 60));
    return minute === 0 ? hour + " giờ" : hour + " giờ " + minute + " phút";
}

class ListRegisters extends React.Component {
    constructor(props, context) {
        super(props, context);
        // this.state = {
        //     sumMoney : props.register.money,
        // };
        this.openPaymentModal = this.openPaymentModal.bind(this);
        this.openDatetimeModal = this.openDatetimeModal.bind(this);
    }

    openPaymentModal(register) {
        this.props.registerManageMeetingRoomAction.openPaymentModal(register);
    }

    openDatetimeModal(register) {
        this.props.registerManageMeetingRoomAction.openDatetimeModal(register);
    }


    render() {
        const TopupTooltip = <Tooltip id="tooltip">Thu tiền</Tooltip>;

        return (
            <div className="table-responsive">
                {this.props.isLoading ? (
                    <Loading/>
                ) : (
                    <table className="table table-hover">
                        <thead className="text-rose">
                        <tr>
                            <th>Khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Saler</th>
                            <th>Tiền đã trả</th>
                            <th>Bắt đầu dự kiến</th>
                            <th>Kết thúc dự kiến</th>
                            <th>Bắt đầu chính thức</th>
                            <th>Kết thúc chính thức</th>
                            <th>Đăng ký</th>
                            <th>Thời gian còn lại</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.registers.map((register,) => {
                            return (
                                <tr key={register.id}>
                                    <td>
                                        <a className="text-name-student-register">
                                            {register.user && register.user.name}
                                        </a>
                                    </td>
                                    <td>
                                        <a href={"tel:" + register.phone}
                                           className="text-name-student-register"
                                        >
                                            {register.user && register.user.phone
                                                ? helper.formatPhone(register.user.phone) : "Chưa có"}
                                        </a>
                                    </td>
                                    <td>
                                        {register.saler ? (
                                            <a
                                                className="btn btn-xs btn-main"
                                                onClick={e => {
                                                    this.props.filterBySaler(register.saler.id,);
                                                    e.preventDefault();
                                                }}
                                                style={{
                                                    backgroundColor: register.saler.color && "#" + register.saler.color,
                                                }}
                                            >
                                                {register.saler.name}
                                            </a>
                                        ) : (
                                            <a className="btn btn-xs btn-main disabled">Chưa có</a>
                                        )}
                                    </td>
                                    <td>
                                        {helper.dotNumber(register.money)}đ
                                    </td>
                                    <td>{register.start_time}</td>
                                    <td>{register.end_time}</td>

                                    <td>
                                        <a className="text-name-student-register"
                                           onClick={() => this.openDatetimeModal(register)}
                                        >
                                            {register.official_start_time}
                                        </a>
                                    </td>
                                    <td>
                                        <a className="text-name-student-register"
                                           onClick={() => this.openDatetimeModal(register)}
                                        >
                                            {register.official_end_time}
                                        </a>

                                    </td>
                                    <td>{register.created_at}</td>
                                    <td>
                                        {
                                            (
                                                moment(register.official_end_time || 0, "YYYY-MM-DD HH:mm:ss").valueOf()
                                                - moment(register.official_start_time || 0, "YYYY-MM-DD HH:mm:ss").valueOf()
                                            ) / 3600000
                                            > register.extra_time ?
                                                <OverlayTrigger placement="top"
                                                                overlay={TopupTooltip}>
                                                    <a
                                                        onClick={() => this.openPaymentModal(register)}
                                                    >
                                                        <b>Đã hết</b>
                                                        <i className="material-icons">attach_money</i>
                                                    </a>
                                                </OverlayTrigger>
                                                :
                                                <a>
                                                    {fixTime(register)}
                                                </a>
                                        }

                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                )}


                <DatetimeModal/>
                <PaymentModal/>

            </div>
        );
    }
}


ListRegisters.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    registers: PropTypes.array.isRequired,
    register: PropTypes.object.isRequired,
    openPaymentModal: PropTypes.func.isRequired,
    filterBySaler: PropTypes.func.isRequired,
    registerManageMeetingRoomAction: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        register: state.registerManageMeetingRoom.register,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerManageMeetingRoomAction: bindActionCreators(
            registerManageMeetingRoomAction,
            dispatch,
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    ListRegisters
);
