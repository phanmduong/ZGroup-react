/**
 * Created by phanmduong on 10/23/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormInputText from '../../../components/common/FormInputText';
import ListGood from './ListGood';
import TooltipButton from '../../../components/common/TooltipButton';
import Loading from '../../../components/common/Loading';
import * as goodOrderActions from '../goodOrderActions';
import PropTypes from 'prop-types';

class OrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            infoOrder: {},
            optionsSelectStaff: []
        };

    }

    componentWillMount() {
        this.props.goodOrderActions.loadDetailOrder(this.props.params.orderId);
        // this.props.goodOrderActions.loadStaffs();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingStaffs !== this.props.isLoadingStaffs && !nextProps.isLoadingStaffs) {
            let dataStaffs = [];
            nextProps.staffs.forEach(staff => {
                dataStaffs.push({
                    ...staff, ...{
                        value: staff.id,
                        label: staff.name
                    }
                });
            });
            this.setState({
                optionsSelectStaff: dataStaffs,
            });
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Chi tiết đơn hàng</h4>
                                {this.props.isLoading ? <Loading/> :
                                    <div>
                                        <h4><strong>Chọn sản phẩm</strong></h4>
                                        <ListGood
                                            goodOrders={this.props.goodOrders}
                                        />
                                    </div>
                                }

                            </div>
                            {!this.props.isLoading &&
                            <div className="card-footer">
                                <div className="flex flex-row flex-space-between" style={{marginBottom: '20px'}}>
                                    <div>
                                        <button className="btn btn-success btn-sm">
                                            <i className="material-icons">work</i> Phí vận chuyển
                                        </button>
                                        <button className="btn btn-info btn-sm">
                                            <i className="material-icons">card_giftcard</i> Giảm giá
                                        </button>
                                        <button className="btn btn-danger btn-sm">
                                            <i className="material-icons">attach_money</i> Thanh toán
                                        </button>
                                    </div>
                                    <div>
                                        <button className="btn btn-success btn-sm">
                                            <i className="material-icons">save</i> Lưu
                                        </button>
                                        <button className="btn btn-danger btn-sm">
                                            <i className="material-icons">cancel</i> Huỷ
                                        </button>
                                    </div>
                                </div>
                            </div>
                            }

                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose"><i
                                className="material-icons">announcement</i></div>
                            <div className="card-content">
                                <h4 className="card-title">Thông tin</h4>
                                {this.props.isLoading ? <Loading/> :
                                    <div>
                                        <div>
                                            <h4><strong>Thông tin đơn hàng</strong></h4>
                                            <FormInputText label="Mã đơn hàng" name="code"
                                                           value={this.props.infoOrder.code} disabled/>
                                            <FormInputText
                                                label="Ngày tạo"
                                                name="created_at"
                                                value={this.props.infoOrder.created_at}
                                                disabled
                                            />
                                            <FormInputText
                                                label="Người bán"
                                                name="staff"
                                                value={this.props.infoOrder.staff ? this.props.infoOrder.staff.name : 'Không có'}
                                                disabled
                                            />
                                            <FormInputText label="Ghi chú" name="note" value={this.props.infoOrder.note}/>
                                        </div>
                                        <div>
                                            <h4><strong>Thông tin khách hàng </strong>
                                                <TooltipButton text="Thêm khách hàng" placement="top">
                                                    <button className="btn btn-round btn-sm btn-danger"
                                                            style={{width: '20px', height: '20px', padding: '0'}}>
                                                        <i className="material-icons">add</i>
                                                    </button>
                                                </TooltipButton>
                                            </h4>
                                            <FormInputText
                                                label="Tên khách hàng"
                                                name="name"
                                                value={this.props.infoUser ? this.props.infoUser.name : ''}
                                                disabled
                                            />
                                            <FormInputText
                                                label="Email"
                                                name="email"
                                                value={this.props.infoUser ? this.props.infoUser.email : ''}
                                                disabled
                                            />
                                            <FormInputText
                                                label="Số điện thoại"
                                                name="phone"
                                                value={this.props.infoUser ? this.props.infoUser.phone : ''}
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <h4><strong>Thông tin giao hàng</strong></h4>
                                            <FormInputText label="Ngày giao" name="ae3qsd" f/>
                                            <FormInputText label="Người giao" name="dsadasd"/>
                                        </div>
                                    </div>
                                }
                            </div>
                            {!this.props.isLoading &&
                            <div className="card-footer">
                                <div className="float-right" style={{marginBottom: '20px'}}>
                                    <button className="btn btn-sm btn-success">
                                        <i className="material-icons">save</i> Lưu
                                    </button>
                                    <button className="btn btn-sm btn-danger">
                                        <i className="material-icons">cancel</i> Huỷ
                                    </button>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

OrderContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoadingStaffs: PropTypes.bool.isRequired,
    staffs: PropTypes.array.isRequired,
    infoOrder: PropTypes.object.isRequired,
    infoUser: PropTypes.object.isRequired,
    goodOrderActions: PropTypes.object.isRequired,
    goodOrders: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.goodOrders.order.isLoading,
        isLoadingStaffs: state.goodOrders.isLoadingStaffs,
        staffs: state.goodOrders.staffs,
        infoOrder: state.goodOrders.order.infoOrder,
        infoUser: state.goodOrders.order.infoUser,
        goodOrders: state.goodOrders.order.goodOrders,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodOrderActions: bindActionCreators(goodOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);
