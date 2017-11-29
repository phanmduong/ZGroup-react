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
                                    <th>Cửa hàng</th>
                                    <th>Trạng thái</th>
                                    <th>Tổng tiền</th>
                                    <th>Nợ</th>
                                    <th />
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.orders.map((order, index) => {
                                        return <ItemOrder order={order} key={index}/>;
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
    isLoading: PropTypes.bool.isRequired,
    orders: PropTypes.array.isRequired,
};


export default ListOrder;
