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
                                    <th>Mã đăng ký</th>
                                    <th>Tên gói</th>
                                    <th>Tên gói người dùng</th>
                                    <th>Khách hàng</th>
                                    <th>Thời gian thuê</th>
                                    <th>Trạng thái</th>
                                    <th>Giá tiền</th>
                                    <th>Tiền đã trả</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.registers.map((register, index) => {
                                        return (
                                            <ItemOrder register={register} key={index}
                                                       />
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
    isLoading: PropTypes.bool.isRequired,
    registers: PropTypes.array.isRequired,
};


export default ListOrder;
