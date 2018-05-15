import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';


class GroupCustomerItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let groupCustomerItem = this.props.groupCustomerItem;
        return (
            <div className="col-md-4 col-sm-6" key={groupCustomerItem.id}>
                <a className="btn btn-default btn-lg"
                   style={{
                       width: '100%',
                       background: 'white',
                       color: 'rgb(69, 90, 100)',
                       textAlign: 'left'
                   }}
                   onClick={(e) => {
                       browserHistory.push('/good/goods/group-customer/' + groupCustomerItem.id);
                       e.stopPropagation();
                   }}
                >

                    <div className="dropdown" style={{position: "absolute", top: "10px", right: "10px"}}>
                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                           data-toggle="dropdown">
                            <i className="material-icons">more_horiz</i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right hover-dropdown-menu">

                            <li className="more-dropdown-item">
                                <a onClick={() => {
                                    this.props.openEditModal(groupCustomerItem);
                                }}
                                >
                                    <i className="material-icons">edit</i> Sửa nhóm
                                </a>
                            </li>
                            <li className="more-dropdown-item">
                                <a onClick={(event) => {
                                    event.stopPropagation(event);
                                    this.props.deleteGroupCustomer(groupCustomerItem.id, groupCustomerItem.name);
                                }}
                                >
                                    <i className="material-icons">delete</i> Xóa nhóm
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="row" style={{fontSize: 16, fontWeight: 600}}>
                        <i className="material-icons">account_balance_wallet</i> {groupCustomerItem.name}
                    </div>
                    <div className="row" style={{
                        height: 5,
                        marginTop: 10,
                        marginBottom: 10,
                        background: groupCustomerItem.color
                    }}/>
                    <div className="row" style={{textTransform: 'none', marginBottom: 10}}>
                        <span>{"Mô tả : " + groupCustomerItem.description}</span>
                        <br/>
                        <br/>
                        | {groupCustomerItem.customers.length + " "}
                        Khách hàng
                        | {"       " + groupCustomerItem.coupons_count ? groupCustomerItem.coupons_count + " " : 0}
                        Khuyến mãi
                        <br/>
                    </div>

                    <div className="row" style={{textTransform: 'none', marginBottom: 10}}>
                        <br/>
                        | Tiền mua theo đơn : {groupCustomerItem.order_value ? groupCustomerItem.order_value + " " : 0}
                        <br/>
                        | Tiền mua hàng sẵn
                        : {groupCustomerItem.delivery_value ? groupCustomerItem.delivery_value + " " : 0}
                        <br/>
                        <br/>
                        | Tỉ giá
                        : {groupCustomerItem.currency_value ? groupCustomerItem.currency_value + " " : 0}
                        <br/>
                    </div>


                    <div className="ripple-container"/>
                </a>
            </div>

        );
    }
}

GroupCustomerItem.propTypes = {
    openEditModal: PropTypes.func,
    deleteGroupCustomer: PropTypes.func,
    groupCustomerItem: PropTypes.object,

};
export default GroupCustomerItem;