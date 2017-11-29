import React from 'react';
import PropTypes from 'prop-types';




class ListChildDiscount extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <table id="property-table" className="table table-hover" role="grid"
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
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.discountsList && this.props.discountsList.map(
                                (discount) => {
                                    return (
                                        <tr role="row" className="even" key={discount.id}>
                                            <td>{discount.name}</td>
                                            <td>{discount.type}</td>
                                            <td>{discount.start_time}</td>
                                            <td>{discount.end_time}</td>
                                            <td>{discount.used_for}</td>
                                            <td>hihih</td>
                                            <td>{discount.description}</td>
                                            <td>
                                                <div className="btn-group-action">
                                                    <div style={{display: 'inline-block'}}>
                                                        <a data-toggle="tooltip" title type="button"
                                                           rel="tooltip"
                                                           data-original-title="Sửa"
                                                           // onClick={() => this.props.openFormDataInEdit(discount)}
                                                        >
                                                            <i className="material-icons">edit</i>
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
};


export default ListChildDiscount;