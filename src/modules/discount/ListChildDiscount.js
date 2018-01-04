import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';


class ListChildDiscount extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="table-responsive">
                        <table className="table table-hover ">
                            <thead>
                            <tr className="text-rose">
                                <th>Tên</th>
                                <th>Loại</th>
                                <th>Thời gian bắt đầu</th>
                                <th>Thời gian kết thúc</th>
                                <th>Sử dụng cho</th>
                                <th>Điều kiện khuyến mãi</th>
                                <th>Số lần</th>
                                <th>Mô tả</th>
                                <th/>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.discountsList && this.props.discountsList.map(
                                (discount) => {
                                    return (
                                        <tr role="row" className="even" key={discount.id}>
                                            <td>
                                                <a onClick={() => {
                                                       browserHistory.push('/good/discount/edit/' + discount.id);
                                                   }}
                                                >{discount.name}
                                                </a>
                                            </td>
                                            <td>{discount.type === 'code' ?
                                                <button className="btn btn-xs btn-main btn-success">Mã khuyến
                                                    mãi</button>
                                                :
                                                <button className="btn btn-xs btn-main btn-info">Chương trình khuyến
                                                    mãi</button>
                                            }</td>
                                            <td>{discount.start_time}</td>
                                            <td>{discount.end_time}</td>
                                            <td>
                                                {discount.used_for === 'good' ?
                                                    <button
                                                        className="btn btn-xs btn-main btn-success">Hàng hóa
                                                    </button> : (
                                                        discount.used_for === 'category' ?
                                                            <button
                                                                className="btn btn-xs btn-main btn-info">Danh mục
                                                            </button> : (
                                                                discount.used_for === 'customer' ?
                                                                    <button
                                                                        className="btn btn-xs btn-main btn-warning">Khách
                                                                        hàng
                                                                    </button> : (
                                                                        discount.used_for === 'customer-group' ?
                                                                            <button
                                                                                className="btn btn-xs btn-main btn-rose">Nhóm
                                                                                khách hàng
                                                                            </button> : (
                                                                                discount.used_for === 'order' ?
                                                                                    <button
                                                                                        className="btn btn-xs btn-main btn-primary">
                                                                                        Đơn hàng
                                                                                    </button> :
                                                                                    <button
                                                                                        className="btn btn-xs btn-main btn-default">
                                                                                        Tất cả
                                                                                    </button>
                                                                            )
                                                                    )
                                                            )
                                                    )
                                                }
                                            </td>
                                            <td>
                                                {discount.used_for === 'good' ?
                                                    discount.good.name ? 'Mặt hàng:' + discount.good.name : 'Chưa có' :
                                                    (
                                                        discount.used_for === 'category' ?
                                                            discount.category.name ? 'Danh mục: ' + discount.category.name : 'Chưa có' :
                                                            (
                                                                discount.used_for === 'customer' ?
                                                                    discount.customer.name ? 'Khách hàng: ' + discount.customer.name : 'Chưa có' :
                                                                    (
                                                                        discount.used_for === 'customer-group' ?
                                                                            discount.customer_group.name ? 'Nhóm khách hàng :' + discount.customer_group.name : 'Chưa có' : (
                                                                                discount.used_for === 'order' ?
                                                                                    discount.order_value ? 'Giá trị đơn hàng từ ' + discount.order_value : 'Chưa có' :
                                                                                    "Tất cả các đơn hàng"
                                                                            )
                                                                    )
                                                            )
                                                    )
                                                }
                                            </td>
                                            <td>{discount.quantity === -1 ? "Vô số lần" : discount.quantity === null ? "Chưa điền" : discount.quantity + " lần"}</td>
                                            <td>{discount.description}</td>
                                            <td>
                                                <div className="btn-group-action">
                                                    <div style={{display: 'inline-block'}}>
                                                        <a onClick={() => {
                                                            browserHistory.push('/good/discount/edit/' + discount.id);
                                                        }}>
                                                            <i className="material-icons">edit</i>
                                                        </a></div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="btn-group-action">
                                                    <div style={{display: 'inline-block'}}>
                                                        <a onClick={() => this.props.deleteDiscount(discount.id, discount.name)}
                                                        >
                                                            <i className="material-icons">delete</i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

ListChildDiscount.propTypes = {
    discountsList: PropTypes.array,
    openFormDataInEdit: PropTypes.func,
    deleteDiscount: PropTypes.func,
};


export default ListChildDiscount;