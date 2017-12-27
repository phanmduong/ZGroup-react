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
                    <div className="col-sm-12">
                        <table id="property-table" className="table table-hover table-responsive" role="grid"
                               aria-describedby="property-table_info">
                            <thead>
                            <tr className="text-rose" role="row">
                                <th>Tên</th>
                                <th>Loại</th>
                                <th>Thời gian bắt đầu</th>
                                <th>Thời gian kết thúc</th>
                                <th>Sử dụng cho</th>
                                <th>Điều kiện khuyến mãi</th>
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
                                            <td><a className="text-name-student-register" rel="tooltip" title
                                                   data-original-title="Remove item">{discount.name}</a></td>
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
                                                                                    <button className="btn btn-xs btn-main btn-default">Tất cả
                                                                                    </button>
                                                                            )
                                                                    )
                                                            )
                                                    )
                                                }
                                            </td>
                                            <td>
                                                {discount.used_for === 'good' ?
                                                    'Mặt hàng: ' + discount.good.name : (
                                                        discount.used_for === 'category' ?
                                                            'Danh mục: ' + discount.category.name : (
                                                            discount.used_for === 'customer' ?
                                                                'Khách hàng: ' + discount.customer.name : (
                                                                discount.used_for === 'customer-group' ?
                                                                    'Nhóm khách hàng :' + discount.customer_group.name : (
                                                                    discount.used_for === 'order' ?
                                                                        'Giá trị đơn hàng từ ' + discount.order_value : "Tất cả các đơn hàng"
                                                                )
                                                            )
                                                        )
                                                    )
                                                }
                                            </td>
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