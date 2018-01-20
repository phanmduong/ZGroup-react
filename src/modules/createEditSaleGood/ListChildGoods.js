import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as createSaleGoodsActions from './createSaleGoodsActions';
import * as helper from '../../helpers/helper';
// import TooltipButton from '../../components/common/TooltipButton';
import EditButton from "./EditButton";


class ListChildGoods extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.removeGood = this.removeGood.bind(this);
    }

    removeGood(good) {
        helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa ",
            function () {
                this.props.createSaleGoodsActions.removeGood(good);
            }.bind(this));
    }


    render() {
        let totalMoneyAll = 0;

        return (
            <div className="table-responsive">
                <div className="material-datatables">
                    <table id="datatables-goodorders" className="table"
                           width="100%">
                        <thead className="text-rose">
                        <tr>
                            <td/>
                            <th>STT</th>
                            <th>Mã hàng</th>
                            <th>Tên hàng</th>
                            <th>Số lượng bán</th>
                            <th>Số lượng trong kho</th>
                            <th>Giá bán</th>
                            <th>Thành tiền</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            this.props.goodsShowInTable && this.props.goodsShowInTable.map((good, index) => {
                                let totalMoney = good.tmpQuantity * good.price;
                                if (good.discount_money) {
                                    totalMoney -= good.discount_money;
                                } else {
                                    if (good.discount_percent) {
                                        totalMoney *= (100 - good.discount_percent) / 100;
                                    }
                                }

                                totalMoneyAll += totalMoney;

                                return (
                                    <tr key={index}>
                                        <td>
                                            <a>
                                                <i className="material-icons"
                                                   onClick={() => {
                                                       this.removeGood(good);
                                                   }}
                                                >delete</i>
                                            </a>
                                        </td>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td><span>
                                            <img style={{
                                                width: "30px",
                                                height: "30px",
                                                borderRadius: "50%",
                                                verticalAlign: "middle",
                                                background: "url(" + good.avatar_url + ") center center / cover",
                                                display: "inline-block",
                                                float: "left",
                                                marginLeft: "3px"
                                            }}/>
                                            {good.code}</span>
                                        </td>
                                        <td>{good.name}</td>
                                        <EditButton
                                            removeGood={this.removeGood}
                                            index={good.id}
                                            tmpQuantity={good.tmpQuantity}
                                            good={good}
                                        />
                                        <td>
                                            <div className="bootstrap-tags-input">
                                                        <button className="tag btn btn-success btn-round btn-fab btn-fab-mini" style={{
                                                            fontSize: 12,
                                                        }}>{good.quantity}
                                                        </button>
                                            </div>
                                        </td>
                                        <td>{helper.dotNumber(good.price)}đ</td>
                                        {/*<td>*/}
                                        {/*<div style={{display: 'inline-block'}}>*/}
                                        {/*{(good.discount_money || good.discount_percent) &&*/}
                                        {/*<TooltipButton text="Giảm giá" placement="top">*/}
                                        {/*<div className="flex-row-center">*/}
                                        {/*<i className="material-icons">card_giftcard</i>*/}
                                        {/*{good.discount_money ? helper.dotNumber(good.discount_money) + 'đ'*/}
                                        {/*: good.discount_percent + '%'}*/}
                                        {/*</div>*/}
                                        {/*</TooltipButton>*/}
                                        {/*}*/}
                                        {/*</div>*/}
                                        {/*</td>*/}
                                        {/*<td/>*/}
                                        <td className="text-align-right">{helper.dotNumber(Math.round(totalMoney))}đ</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <th/>
                            <th><b>Tổng</b></th>
                            <th className="text-align-right" colSpan="5">
                                <b>{helper.dotNumber(totalMoneyAll)}đ</b>
                            </th>
                            <th/>
                        </tr>
                        <tr>
                            <th/>
                            <th>
                                <h4><b>Phải trả</b></h4>
                            </th>
                            <th className="text-align-right" colSpan="5">
                                <h4><b>{helper.dotNumber(totalMoneyAll)}đ</b></h4>
                            </th>
                            <th/>
                        </tr>


                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
}

ListChildGoods.propTypes = {
    createSaleGoodsActions: PropTypes.object,
    goodsList: PropTypes.array,
    goodsShowInTable: PropTypes.array,
    createSaleGoods: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        goodsList: state.createSaleGoods.goodsList,
        isLoadingGoodModal: state.createSaleGoods.isLoadingGoodModal,
        goodsShowInTable: state.createSaleGoods.goodsShowInTable,
        createSaleGoods: state.createSaleGoods,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createSaleGoodsActions: bindActionCreators(createSaleGoodsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListChildGoods);


