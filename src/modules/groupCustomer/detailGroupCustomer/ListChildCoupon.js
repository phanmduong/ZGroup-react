import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as groupCustomerActions from '../groupCustomerActions';
import Loading from "../../../components/common/Loading";


class ListChildCoupon extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadCouponsInModal = this.loadCouponsInModal.bind(this);
    }

    componentWillMount() {
        this.loadCouponsInModal();
    }

    loadCouponsInModal() {
        this.props.groupCustomerActions.loadCouponsInModal(this.props.idGroup);
    }

    render() {
        const {coupons} = this.props.groupCustomerForm;
        return (
            <div>

                        {this.props.isLoadingCoupon ?
                            <Loading/>
                            :
                            <div className="table-responsive">
                                <table className="table table-hover"
                                       style={{fontSize: 14}}>
                                    {coupons && coupons.length !== 0 ?
                                        <thead>
                                        <tr className="text-rose" role="row">
                                            <th>Tên</th>
                                            <th>Bắt đầu</th>
                                            <th>Kết thúc</th>
                                            <th>Giá trị</th>
                                            <th>Mô tả</th>
                                        </tr>
                                        </thead>
                                        : null
                                    }
                                    <tbody>
                                    {coupons && coupons.map(
                                        (coupon) => {
                                            return (
                                                <tr role="row" className="even" key={coupon.id}>
                                                    <td>{coupon.name}</td>
                                                    <td>{coupon.start_time}</td>
                                                    <td>{coupon.end_time}</td>
                                                    <td>{coupon.discount_value + ((coupon.discount_type === 'percentage') ? '%' : '₫')}</td>
                                                    <td>{coupon.description}</td>
                                                </tr>

                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }



            </div>
        );
    }
}

ListChildCoupon.propTypes = {
    isLoadingCoupon: PropTypes.bool,
    coupons: PropTypes.array,
    groupCustomerForm: PropTypes.array,
    isSaving: PropTypes.bool,
    groupCustomerActions: PropTypes.func,
    params: PropTypes.object,
    idGroup: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        isLoadingCoupon: state.groupCustomers.isLoadingCoupon,
        coupons: state.groupCustomers.groupCustomerForm.coupons,
        isSaving: state.groupCustomers.isSaving,
        groupCustomerForm: state.groupCustomers.groupCustomerForm,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        groupCustomerActions: bindActionCreators(groupCustomerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListChildCoupon);