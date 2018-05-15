import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as modalProductAction from './modalProductAction';
import WareHouseTab from './WareHouseTab';
import HistoryTab from "../../inventoryGood/HistoryTab";
import Loading from "../../../components/common/Loading";
import * as inventoryGoodAction from "../../inventoryGood/inventoryGoodAction";

class WareHouseModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal show={this.props.wareHouseModal}
                   onHide={() => this.props.modalProductAction.showWareHouseModal()}>
                <a onClick={() => this.props.modalProductAction.showWareHouseModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Danh sách kho chứa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container" style={{width: '100%'}}>
                        <div className="row">
                            <div className="col-sm-12 nav-tabs-wrapper">
                                <ul className="nav nav-pills nav-pills-rose">
                                    <li className={this.props.showWareHouse && "active"}><a
                                        onClick={this.props.modalProductAction.openWareHouseTab}>Danh sách kho hàng</a>
                                    </li>
                                    <li className={!this.props.showWareHouse && "active"}><a
                                        onClick={this.props.modalProductAction.openHistoryTab}>Lịch sử xuất nhập</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            {
                                this.props.isLoadingHistoryModal ? <Loading/> : (
                                    <div className="col-sm-12">
                                        {
                                            this.props.showWareHouse ?
                                                <WareHouseTab
                                                    warehouses={this.props.warehouses}/> :
                                                <HistoryTab
                                                    totalPages={this.props.totalPages}
                                                    currentPage={this.props.currentPage}
                                                    warehousesList={this.props.warehousesList}
                                                    histories={this.props.histories}
                                                    inventoryInfo={this.props.inventoryInfo}
                                                    isLoadingMore={this.props.isLoadingMore}
                                                    getHistoryInventories={this.props.inventoryGoodAction.getHistoryInventories}
                                                    inventory={this.props.productPresent}
                                                    isLoadingHistoryList={this.props.isLoadingHistoryList}
                                                    productWarehouse={this.props.productWarehouse}/>
                                        }
                                    </div>
                                )
                            }
                            <div className="col-sm-4"/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

WareHouseModalContainer.propTypes = {
    histories: PropTypes.array.isRequired,
    warehouses: PropTypes.array.isRequired,
    wareHouseModal: PropTypes.bool,
    inventoryInfo: PropTypes.object.isRequired,
    modalProductAction: PropTypes.object.isRequired,
    showWareHouseModal: PropTypes.func.isRequired,
    productEditing: PropTypes.object.isRequired,
    showWareHouse: PropTypes.bool,
    isLoadingHistoryModal: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
    inventoryGoodAction: PropTypes.object.isRequired,
    productPresent: PropTypes.object.isRequired,
    warehousesList: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    isLoadingHistoryList: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
    productWarehouse: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        inventoryInfo: state.inventoryGood.inventoryChecking.inventoryInfo,
        histories: state.inventoryGood.inventoryChecking.histories,
        warehouses: state.inventoryGood.inventoryChecking.warehouses,
        wareHouseModal: state.productList.modalInProduct.wareHouseModal,
        productEditing: state.productList.productEditing,
        showWareHouse: state.productList.showWareHouse,
        isLoadingHistoryModal: state.inventoryGood.isLoadingHistoryModal,
        isLoadingMore: state.inventoryGood.isLoadingMore,
        productPresent: state.productList.productEditing.productPresent,
        warehousesList: state.inventoryGood.warehousesList,
        totalPages: state.inventoryGood.inventoryChecking.totalPages,
        currentPage: state.inventoryGood.inventoryChecking.currentPage,
        isLoadingHistoryList: state.inventoryGood.isLoadingHistoryList,
        products: state.productList.products,
        productWarehouse: state.productList.productEditing.productWarehouse
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modalProductAction: bindActionCreators(modalProductAction, dispatch),
        inventoryGoodAction: bindActionCreators(inventoryGoodAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WareHouseModalContainer);