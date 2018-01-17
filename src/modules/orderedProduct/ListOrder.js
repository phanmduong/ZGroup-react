import React from 'react';
import ItemOrder from './ItemOrder';
import Loading from '../../components/common/Loading';
import PropTypes from 'prop-types';

class ListOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                {
                    this.props.isLoading ? <Loading/> :
                        (
                            <table className="table">
                                <thead className="text-rose">
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Ngày bán</th>
                                    <th>Khách hàng</th>
                                    <th>Thu ngân</th>
                                    <th>Trạng thái</th>
                                    <th>Ghi chú</th>
                                    <th>Tổng tiền</th>
                                    <th>Nợ</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.deliveryOrders && this.props.deliveryOrders.map((order, index) => {
                                        return (
                                            <ItemOrder order={order} key={index}
                                                       changeStatusOrder={this.props.changeStatusOrder}
                                                       user={this.props.user}/>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        )
                }
            </div>
        );
    }
}

ListOrder.propTypes = {
    changeStatusOrder: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    deliveryOrders: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};


export default ListOrder;
