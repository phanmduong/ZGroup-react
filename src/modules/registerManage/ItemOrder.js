import React from 'react';
import TooltipButton from '../../components/common/TooltipButton';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
// import {REGISTER_STATUS} from "../../constants/constants";


class ItemOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
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

    render() {
        const register = this.props.register;
        return (
            <tr>
                <td>
                    {register.code || "Chưa có"}
                </td>
                <td>{register.subscription.subscription_kind_name}</td>
                <td>{register.subscription.user_pack_name}</td>
                <td>
                    {register.user.name}
                </td>
                <td>
                    {register.subscription.hours}
                </td>
                <td>
                    {/*{REGISTER_STATUS.filter(status => status.value === register.status)[0].label}*/}
                </td>
                <td>
                    {helper.dotNumber(register.subscription.price)}đ
                </td>
                <td>{helper.dotNumber(register.money)}đ</td>
            </tr>
        );
    }
}

ItemOrder.propTypes = {
    register: PropTypes.object.isRequired,
};

export default ItemOrder;
