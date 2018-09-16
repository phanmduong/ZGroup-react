import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as createSaleGoodsActions from './createSaleGoodsActions';
import * as helper from '../../helpers/helper';


class EditButton extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isEdit: false,
            quantity: this.props.good.quantity,
        };
        this.openEditQuantity = this.openEditQuantity.bind(this);
        this.updateTmpQuantity = this.updateTmpQuantity.bind(this);
    }
    updateTmpQuantity(tmpQuantity, index) {
        let goodsShowInTable = this.props.goodsShowInTable.map((good)=>{
            if (good.id === index){
               return  {...good,tmpQuantity : tmpQuantity, quantity : this.state.quantity -tmpQuantity };
            }
            return good;
        });
        this.props.createSaleGoodsActions.updateTmpQuantity(goodsShowInTable);
    }

    openEditQuantity( good) {
        if (this.state.isEdit) {
            if (good.tmpQuantity <= 0) {
                helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa ",
                    function () {
                        this.props.removeGood(good);
                    }.bind(this));
            }
            this.setState({isEdit: !this.state.isEdit});
        }
        else
            this.setState({isEdit: !this.state.isEdit});
    }


    render() {
        const tmpQuantity = this.props.tmpQuantity;
        return (
            <td style={{width: 120, display: "flex" , alignItems : "center" , height: 75, justifyContent : "space-evenly"}}>
                {this.state.isEdit ?
                    <input type="number" name="tmpQuantity" value={tmpQuantity}
                           className="form-control"
                           style={{width: 40}}
                           min={0}
                           max={this.props.good.quantity}
                           onChange={(e) => {
                               this.updateTmpQuantity(e.target.value, this.props.index,this.props.good.quantity);
                           }}
                    />
                    :
                    tmpQuantity
                }
                <span>

                    {!this.state.isEdit ?
                        <span className="btn-group-action">
                            <a onClick={() => this.openEditQuantity(this.props.good)}
                            >
                                <i className="material-icons" style={{fontSize: 20, marginLeft: 8}}>edit</i>
                            </a>
                        </span>
                        :
                        <span className="btn-group-action" style={{marginTop: 10}}>
                            <a onClick={() => {
                                this.openEditQuantity(this.props.good);
                            }}>
                                <i className="material-icons" style={{fontSize: 20, marginLeft: 8, color: "green"}}>check</i>
                            </a>
                        </span>}
                </span>
            </td>
        );
    }
}


EditButton.propTypes = {
    createSaleGoodsActions: PropTypes.object,
    good: PropTypes.object,
    goodsShowInTable: PropTypes.array,
    tmpQuantity: PropTypes.number,
    index: PropTypes.number,
    removeGood: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        goodsList: state.createSaleGoods.goodsList,
        isLoadingGoodModal: state.createSaleGoods.isLoadingGoodModal,
        goodsShowInTable: state.createSaleGoods.goodsShowInTable,
        totalGoodPages: state.createSaleGoods.totalGoodPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createSaleGoodsActions: bindActionCreators(createSaleGoodsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditButton);