import React from 'react';
import ItemOrder from './ItemOrder';
import Loading from '../../components/common/Loading';
import PropTypes from 'prop-types';
import CheckBoxMaterial from "../../components/common/CheckBoxMaterial";
import TooltipButton from "../../components/common/TooltipButton";

class ListOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let checkedPrice = this.props.checkedPrice;
        return (
            <div className="table-responsive">
                {
                    this.props.isLoading ? <Loading/> :
                        (
                            <table className="table">
                                <thead className="text-rose">
                                <tr>
                                    {
                                        this.props.isSendingPrice && (
                                            <TooltipButton text="Chọn tất cả" placement="top">
                                                <th>
                                                    <CheckBoxMaterial
                                                        name="sale_status"
                                                        checked={this.props.checkAll}
                                                        onChange={this.props.chooseAll}
                                                    />
                                                </th>
                                            </TooltipButton>
                                        )
                                    }
                                    <th>Mã đơn hàng</th>
                                    <th>Ngày bán</th>
                                    <th>Khách hàng</th>
                                    <th>Link sản phẩm</th>
                                    <th>Mã hàng Nhật</th>
                                    <th>Tỷ giá</th>
                                    <th>Thu ngân</th>
                                    <th style={{width: "200px"}}>Trạng thái</th>
                                    <th>Ghi chú</th>
                                    <th>Tổng tiền</th>
                                    <th>Còn thiếu</th>
                                    <th>Nhập kho</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.deliveryOrders && this.props.deliveryOrders.map((delivery, index) => {
                                        return (
                                            <ItemOrder delivery={delivery} key={index}
                                                       changeStatus={this.props.changeStatus}
                                                       user={this.props.user}
                                                       showAddNoteModal={this.props.showAddNoteModal}
                                                       showAddCancelNoteModal={this.props.showAddCancelNoteModal}
                                                       showSendPriceModal={this.props.showSendPriceModal}
                                                       check={checkedPrice[delivery.id] ? (true) : (false)}
                                                       isSendingPrice={this.props.isSendingPrice}
                                                       chooseItem={this.props.chooseItem}
                                                       showChooseWalletModal={this.props.showChooseWalletModal}
                                                       showAddJavCodeModal={this.props.showAddJavCodeModal}
                                                       showCameToVNModal={this.props.showCameToVNModal}
                                                       showImportWeightModal={this.props.showImportWeightModal}
                                                       showAddShipFeeModal={this.props.showAddShipFeeModal}
                                            />
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        )
                }
            </div>
        );
    }
}

ListOrder.propTypes = {
    changeStatus: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    deliveryOrders: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    showAddNoteModal: PropTypes.func.isRequired,
    showAddCancelNoteModal: PropTypes.func.isRequired,
    showSendPriceModal: PropTypes.func.isRequired,
    checkedPrice: PropTypes.object.isRequired,
    checkAll: PropTypes.bool.isRequired,
    isSendingPrice: PropTypes.bool.isRequired,
    chooseAll: PropTypes.func.isRequired,
    chooseItem: PropTypes.func.isRequired,
    showChooseWalletModal: PropTypes.func.isRequired,
    showAddJavCodeModal: PropTypes.func.isRequired,
    showCameToVNModal: PropTypes.func.isRequired,
    showImportWeightModal: PropTypes.func.isRequired,
    showAddShipFeeModal: PropTypes.func.isRequired
};


export default ListOrder;
