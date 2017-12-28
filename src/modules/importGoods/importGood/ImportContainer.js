/**
 * Created by phanmduong on 10/27/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormInputText from '../../../components/common/FormInputText';
import Search from '../../../components/common/Search';
import Loading from '../../../components/common/Loading';
import * as helper from '../../../helpers/helper';
import PropTypes from 'prop-types';
import * as importGoodActions from '../importGoodActions';
import ListGood from './ListGood';
import {Modal} from 'react-bootstrap';
import HistoryPaid from "./HistoryPaid";

class ImportContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.setTable = this.setTable.bind(this);
        this.closeModalHistoryPaid = this.closeModalHistoryPaid.bind(this);
        this.openModalHistoryPaid = this.openModalHistoryPaid.bind(this);
        this.state = {
            showModalHistoryPaid: false,

        };
        this.table = null;
    }

    componentWillMount() {
        this.props.importGoodActions.loadImportGoodsOrder(this.props.params.importGoodId);
    }

    closeModalHistoryPaid() {
        this.setState({showModalHistoryPaid: false});
    }

    openModalHistoryPaid() {
        this.setState({showModalHistoryPaid: true});
    }

    setTable(table) {
        this.table = table;
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
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
                    <div className="col-md-12">
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
                                            <FormInputText
                                                label="Kho hàng"
                                                name="warehouse"
                                                value={this.props.importOrder.warehouse ? this.props.importOrder.warehouse.name : 'Không có'}
                                                disabled
                                            />
                                            <FormInputText label="Ghi chú" name="note"
                                                           value={this.props.importOrder.note}
                                                           disabled
                                            />
                                        </div>
                                        <div>
                                            <div className="flex flex-row flex-space-between">
                                                <h4>
                                                    <strong>Thông tin thanh toán </strong>
                                                </h4>
                                                <button className="btn btn-rose btn-xs btn-simple text-align-right"
                                                        onClick={this.openModalHistoryPaid}
                                                >
                                                    Xem thêm <i className="material-icons">navigate_next</i>
                                                </button>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <b>Tổng cộng</b>
                                                </div>
                                                <div className="col-md-6">
                                                    <b>{helper.dotNumber(this.props.importOrder.total_money)} đ</b>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <b>Đã thanh toán</b>
                                                </div>
                                                <div className="col-md-6">
                                                    <b>{helper.dotNumber(this.props.importOrder.total_money - this.props.importOrder.debt)}
                                                        đ</b>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    Nợ
                                                </div>
                                                <div className="col-md-6">
                                                    {helper.dotNumber(this.props.importOrder.debt)} đ
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showModalHistoryPaid} bsSize="large" onHide={this.closeModalHistoryPaid}>
                    <Modal.Header closeButton closeLabel="Đóng">
                        <Modal.Title>Tho thanh toán</Modal.Title>
                        <Modal.Title>Thanh toán</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <HistoryPaid
                            importGoodId={this.props.params.importGoodId}
                            closeModal={this.closeModalHistoryPaid}
                        />
                    </Modal.Body>
                </Modal>
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
