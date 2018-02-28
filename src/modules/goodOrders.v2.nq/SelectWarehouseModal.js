import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import * as goodOrderActions from './goodOrderActions';
import Search from "../../components/common/Search";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";

class SelectWarehouseModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            query: '',
            page: 1
        };
        this.timeOut = null;
        this.warehousesSearchChange = this.warehousesSearchChange.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
    }

    warehousesSearchChange(value) {
        this.setState({
            query: value,
            page: 1
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.goodOrderActions.loadWareHouse(
                1,
                value
            );
        }.bind(this), 500);
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.goodOrderActions.loadWareHouse(
            page,
            this.state.query
        );
    }

    render() {
        let first = this.props.totalCountWarehouse ? (this.props.currentPageWarehouse - 1) * 10 + 1 : 0;
        let end = this.props.currentPageWarehouse < this.props.totalPagesWarehouse ? this.props.currentPageWarehouse * 10 : this.props.totalCountWarehouse;
        return (
            <Modal show={this.props.selectWarehouseModal}
                   onHide={() => this.props.goodOrderActions.showSelectWarehouseModal(this.props.nextStatus, this.props.orderIdWarehouseModal)}>
                <a onClick={() => this.props.goodOrderActions.showSelectWarehouseModal(this.props.nextStatus, this.props.orderIdWarehouseModal)}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Chọn kho để xuất hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Search
                        onChange={this.warehousesSearchChange}
                        value={this.state.query}
                        placeholder="Nhập tên kho để tìm"
                    />
                    {
                        this.props.isLoadingWarehouse ? (
                            <Loading/>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                    <tr className="text-rose">
                                        <th>Tên kho</th>
                                        <th>Địa chỉ</th>
                                        <th>Cơ sở</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.warehousesList && this.props.warehousesList.map((warehouse, id) => {
                                            return (
                                                <tr key={id}
                                                    onClick={() => this.props.goodOrderActions.changeStatusOrder(
                                                        this.props.nextStatus,
                                                        this.props.orderIdWarehouseModal,
                                                        warehouse.id
                                                    )}
                                                    style={{cursor: "pointer"}}>
                                                    <td>{warehouse.name}</td>
                                                    <td>{warehouse.location}</td>
                                                    <td>{warehouse.base ? warehouse.base.name : "Không có"}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                    <div style={{textAlign: 'right'}}>
                        <b style={{marginRight: '15px'}}>
                            Hiển thị kêt quả từ {first}
                            - {end}/{this.props.totalCountWarehouse}</b><br/>
                        <Pagination
                            totalPages={this.props.totalPagesWarehouse}
                            currentPage={this.props.currentPageWarehouse}
                            loadDataPage={this.loadOrders}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

SelectWarehouseModal.propTypes = {
    goodOrderActions: PropTypes.object.isRequired,
    warehousesList: PropTypes.array.isRequired,
    totalCountWarehouse: PropTypes.number.isRequired,
    totalPagesWarehouse: PropTypes.number.isRequired,
    currentPageWarehouse: PropTypes.number.isRequired,
    isLoadingWarehouse: PropTypes.bool.isRequired,
    selectWarehouseModal: PropTypes.bool.isRequired,
    nextStatus: PropTypes.string.isRequired,
    orderIdWarehouseModal: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        warehousesList: state.goodOrders.warehousesList,
        totalCountWarehouse: state.goodOrders.totalCountWarehouse,
        totalPagesWarehouse: state.goodOrders.totalPagesWarehouse,
        currentPageWarehouse: state.goodOrders.currentPageWarehouse,
        isLoadingWarehouse: state.goodOrders.isLoadingWarehouse,
        selectWarehouseModal: state.goodOrders.selectWarehouseModal,
        nextStatus: state.goodOrders.nextStatus,
        orderIdWarehouseModal: state.goodOrders.orderIdWarehouseModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodOrderActions: bindActionCreators(goodOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectWarehouseModal);
