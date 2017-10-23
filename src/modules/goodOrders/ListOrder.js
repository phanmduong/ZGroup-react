import React from 'react';
import ItemOrder from './ItemOrder';
import Pagination from '../../components/common/Pagination';
import Loading from '../../components/common/Loading';
import PropTypes from 'prop-types';

class ListOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        let first = (this.props.currentPage - 1) * this.props.limit + 1;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;
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
                <div className="row float-right">
                    <div className="col-md-12" style={{textAlign: 'right'}}>
                        <b style={{marginRight: '15px'}}>
                            Hiển thị kêt quả từ {first} - {end}/{this.props.totalCount}</b><br/>
                        <Pagination
                            totalPages={this.props.totalPages}
                            currentPage={this.props.currentPage}
                            loadDataPage={this.props.loadOrders}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ListOrder.propTypes = {
    loadOrders: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    orders: PropTypes.array.isRequired,
};


export default ListOrder;
