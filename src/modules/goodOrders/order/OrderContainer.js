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
import Select from 'react-select';
import ItemReactSelect from '../../../components/common/ItemReactSelect';

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
        this.props.goodOrderActions.loadStaffs();
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
                                                className="none-padding"
                                            />
                                            <div className="form-group none-margin">
                                                <label className="control-label">
                                                    Người bán
                                                </label>
                                                <Select
                                                    name="form-field-name"
                                                    value={this.props.infoOrder.staff ? this.props.infoOrder.staff.id : ''}
                                                    options={this.state.optionsSelectStaff}
                                                    placeholder="Chọn người bán"
                                                    optionRenderer={(option) => {
                                                        return (
                                                            <ItemReactSelect label={option.label}
                                                                             url={option.avatar_url}/>
                                                        );
                                                    }}
                                                    valueRenderer={(option) => {
                                                        return (
                                                            <ItemReactSelect label={option.label}
                                                                             url={option.avatar_url}/>
                                                        );
                                                    }}
                                                />
                                            </div>
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
                                            <FormInputText label="Tên khách hàng" name="afdsafdsasd"/>
                                            <FormInputText label="Email" name="afdasgrssd"/>
                                            <FormInputText label="Số điện thoại" name="asfdasfawed"/>
                                        </div>
                                        <div>
                                            <h4><strong>Thông tin giao hàng</strong></h4>
                                            <FormInputText label="Ngày giao" name="ae3qsd" f/>
                                            <FormInputText label="Người giao" dfdsa/>
                                        </div>
                                        <div><h4><strong>Nhân viên bán hàng</strong></h4>
                                            <TooltipButton text="Phan M Dương" placement="top">
                                                <button className="btn btn-info btn-xs">
                                                    Dương
                                                </button>
                                            </TooltipButton>
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

function mapStateToProps(state) {
    return {
        isLoading: state.goodOrders.order.isLoading,
        isLoadingStaffs: state.goodOrders.isLoadingStaffs,
        staffs: state.goodOrders.staffs,
        infoOrder: state.goodOrders.order.infoOrder,
        goodOrders: state.goodOrders.order.goodOrders,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodOrderActions: bindActionCreators(goodOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);
