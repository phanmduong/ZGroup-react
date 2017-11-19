import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
// import ListChildDiscount from "./ListChildDiscount";
import * as discountActions from './discountActions';
// import Loading from "../../components/common/Loading";
// import Search from '../../components/common/Search';
// import FormInputSelect from '../../components/common/FormInputSelect';
// import {CUSTOMTYPE} from '../../constants/constants';
// import * as helper from '../../helpers/helper';

class DiscountContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <div>
                <div className="content">
                    <div className="container-fluid">
                        <div>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-header card-header-icon" data-background-color="rose"><i
                                            className="material-icons">assignment</i>
                                        </div>
                                        <div className="card-content">
                                            <h4 className="card-title">Thêm mã khuyễn mãi</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-header card-header-icon" data-background-color="rose"><i
                                            className="material-icons">today</i></div>
                                        <div className="card-content">
                                            <h4 className="card-title">Thời gian áp dụng</h4>
                                            <div className="form-group">
                                                <label className="label-control">Bắt đầu khuyễn mãi</label>
                                                <input type="text" className="form-control datetimepicker"
                                                       defaultValue="10/05/2016"/>
                                                <span className="material-input"/></div>
                                            <div className="form-group">
                                                <label className="label-control">Hết hạn khuyến mãi</label>
                                                <input type="text" className="form-control datetimepicker"
                                                       defaultValue="10/05/2016"/>
                                                <span className="material-input"/></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 20
                                }}>
                                    <div>
                                        <button rel="tooltip" data-placement="top" title
                                                data-original-title="Remove item" className="btn btn-success btn-sm">
                                            <i className="material-icons">work</i> Phí vận chuyển
                                        </button>
                                        <button rel="tooltip" data-placement="top" title
                                                data-original-title="Remove item" className="btn btn-info btn-sm">
                                            <i className="material-icons">card_giftcard</i> Giảm giá
                                        </button>
                                        <button rel="tooltip" data-placement="top" title
                                                data-original-title="Remove item" className="btn btn-danger btn-sm">
                                            <i className="material-icons">attach_money</i> Thanh toán
                                        </button>
                                    </div>
                                    <div>
                                        <button rel="tooltip" data-placement="top" title
                                                data-original-title="Remove item" className="btn btn-success btn-sm">
                                            <i className="material-icons">save</i> Lưu
                                        </button>
                                        <button rel="tooltip" data-placement="top" title
                                                data-original-title="Remove item" className="btn btn-danger btn-sm">
                                            <i className="material-icons">cancel</i> Huỷ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DiscountContainer.propTypes = {
    discountActions: PropTypes.object,

};

function mapStateToProps(state) {
    return {
        discount: state.discount,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        discountActions: bindActionCreators(discountActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscountContainer);