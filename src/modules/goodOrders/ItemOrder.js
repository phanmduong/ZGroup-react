import React from 'react';
import {Link} from 'react-router';
import TooltipButton from '../../components/common/TooltipButton';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';

class ItemOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    statusOrder(status){
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
        let order = this.props.order;
        return (
            <tr>
                <td>
                    <Link className="text-name-student-register">
                        {order.code}
                    </Link>
                </td>
                <td>{order.created_at}</td>
                <td>{order.user ? order.user.name : "Không nhập"}</td>
                <td>
                    {
                        order.staff ?

                            (
                                <TooltipButton text={order.staff.name} placement="top">
                                    <button className="btn btn-xs btn-main"
                                            style={{backgroundColor: order.staff.color ? order.staff.color : ''}}>
                                        {helper.getShortName(order.staff.name)}
                                    </button>
                                </TooltipButton>
                            )
                            :
                            (
                                <div>Không có</div>
                            )
                    }
                </td>
                <td>
                    {
                        order.base ?
                            (
                                <TooltipButton text={order.base.name} placement="top">
                                    <button className="btn btn-xs btn-main">
                                        {order.base.name}
                                    </button>
                                </TooltipButton>
                            )
                            :
                            (
                                <div>Không có</div>
                            )
                    }
                </td>
                <td>
                    {
                        this.statusOrder(order.status)
                    }
                </td>

                <td>{order.total}</td>
                <td>{order.debt}</td>
                <td>
                    <ButtonGroupAction />
                </td>
            </tr>
        );
    }
}

ItemOrder.propTypes = {
    order : PropTypes.object.isRequired,
};


export default ItemOrder;
