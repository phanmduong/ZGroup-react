/**
 * Created by phanmduong on 10/27/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormInputText from '../../../components/common/FormInputText';
import Search from '../../../components/common/Search';
import Loading from '../../../components/common/Loading';
import PropTypes from 'prop-types';
import * as importGoodActions from '../importGoodActions';
import ListGood from './ListGood';

class ImportContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.setTable = this.setTable.bind(this);
        this.table = null;
    }

    componentWillMount() {
        this.props.importGoodActions.loadImportGoodsOrder(this.props.params.importGoodId);
    }

    setTable(table) {
        this.table = table;
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
                                <Search
                                    onChange={(value) => {
                                        this.table ? this.table.search(value).draw() : null;
                                    }}
                                    placeholder="Nhập mã hoặc tên sản phẩm"
                                />
                                {this.props.isLoading ? <Loading/> :
                                    <ListGood
                                        importGoods={this.props.importOrder.imported_goods}
                                        setTable={this.setTable}
                                    />
                                }

                            </div>
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
                                                           value={this.props.importOrder.code} disabled/>
                                            <FormInputText
                                                label="Ngày tạo"
                                                name="created_at"
                                                value={this.props.importOrder.created_at}
                                                disabled
                                            />
                                            <FormInputText
                                                label="Người bán"
                                                name="staff"
                                                value={this.props.importOrder.user ? this.props.importOrder.user.name : 'Không có'}
                                                disabled
                                            />
                                            <FormInputText label="Ghi chú" name="note"
                                                           value={this.props.importOrder.note}/>
                                        </div>
                                        <div>
                                            <h4>
                                                <strong>Thông tin thanh toán </strong>
                                            </h4>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <b>Tổng cộng</b>
                                                </div>
                                                <div className="col-md-6">
                                                    <b>{this.props.importOrder.total_money}</b>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    Nợ
                                                </div>
                                                <div className="col-md-6">
                                                    {this.props.importOrder.debt}
                                                </div>
                                            </div>
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

ImportContainer.propTypes = {
    importGoodActions: PropTypes.object.isRequired,
    importOrder: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        importOrder: state.importGoods.importGood.importOrder,
        isLoading: state.importGoods.importGood.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        importGoodActions: bindActionCreators(importGoodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportContainer);
