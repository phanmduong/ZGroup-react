import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as goodOrderActions from '../goodOrderActions';
import * as helper from '../../../helpers/helper';
import TooltipButton from '../../../components/common/TooltipButton';


class EditButton extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isEdit: false,
            quantity: 0,
        };
        this.openEditQuantity = this.openEditQuantity.bind(this);
        this.clearEditQuantity = this.clearEditQuantity.bind(this);
        this.openEditQuantityInReturnOrder = this.openEditQuantityInReturnOrder.bind(this);
    }

    openEditQuantity(e, quantity) {
        if (this.state.isEdit) {
            if (quantity <= 0) {
                helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa ",
                    function () {
                        this.props.goodOrderActions.editOrder(this.props.order, this.props.orderId, true, this.props.index);
                    }.bind(this));
            }
            else {
                this.props.goodOrderActions.editOrder(this.props.order, this.props.orderId, true, this.props.index);
                e.preventDefault();
            }
            this.setState({isEdit: !this.state.isEdit, quantity: this.props.quantity});
        }
        else
        this.setState({isEdit: !this.state.isEdit ,quantity : quantity});
    }

    openEditQuantityInReturnOrder(e, quantity) {
        if (this.state.isEdit) {
            if (quantity <= 0) {
                helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa ",
                    function () {
                        this.props.goodOrderActions.editReturnOrders(this.props.order, this.props.orderId, true, this.props.index);
                    }.bind(this));
            }
            else {
                if (this.props.order.order.warehouse === null || this.props.order.order.warehouse === undefined || this.props.order.order.warehouse === '') {
                    helper.showTypeNotification("Vui lòng nhập kho hàng", 'warning');
                    return;
                }
                else {
                    this.props.goodOrderActions.editReturnOrders(this.props.order, this.props.orderId, true, this.props.index);
                }
                e.preventDefault();
            }
            this.setState({isEdit: !this.state.isEdit, quantity: this.props.quantity});
        }
        else
            this.setState({isEdit: !this.state.isEdit,quantity : quantity});
    }


    clearEditQuantity(e) {
            this.props.updateQuantity(this.state.quantity, this.props.index);
            e.preventDefault();
            this.setState({isEdit: !this.state.isEdit});
    }


    render() {
        const goodOrder = this.props.goodOrder;
        const index = this.props.index;
        return (
            <td style={{width: 120, display: "flex", justifyContent: "space-around"}}>
                {this.state.isEdit ?
                    (
                        <input type="number" name="quantity" value={goodOrder.quantity}
                               className="form-control"
                               style={{width: 40}}
                               onChange={(e) => {
                                   this.props.updateQuantity(e.target.value, index);
                               }}
                               max={this.props.isReturnOrders && this.props.order.order.good_orders[index].quantity}
                               min={0}
                        />
                    )
                    :
                    goodOrder.quantity
                }


                <span>
                     {
                         !this.props.isReturnOrders
                             ?
                             this.props.isSavingQuantity && this.props.isSavingQuantity.id === index && this.props.isSavingQuantity.status ?
                                 (
                                     <span className="btn-group-action">
                                         <a className="btn-group-action disabled">
                                             <i className="fa fa-spinner fa-spin"
                                                style={{fontSize: 20, marginLeft: 8}}/>
                                         </a>
                                     </span>
                                 )
                                 :
                                 (
                                     !this.state.isEdit
                                         ? (
                                             (this.props.isReturnOrders &&
                                                 this.props.order.order.status === "confirm_order" ||
                                                 this.props.order.order.status === "ship_order" ||
                                                 this.props.order.order.status === "completed_order" ||
                                                 this.props.order.order.status === "cancel")
                                                 ?
                                                 (
                                                     <TooltipButton text="Không chỉnh sửa sau khi xác nhận đơn hàng"
                                                                    placement="top">
                                                         <span className="btn-group-action ">
                                                             <a className="disabled">
                                                                 <i className="material-icons"
                                                                    style={{fontSize: 20, marginLeft: 8}}>edit</i>
                                                             </a>
                                                         </span>
                                                     </TooltipButton>
                                                 )
                                                 :
                                                 (
                                                     <span className="btn-group-action">
                                                         <a onClick={(e) => this.openEditQuantity(e, goodOrder.quantity)}>
                                                             <i className="material-icons"
                                                                style={{fontSize: 20, marginLeft: 8}}>edit</i>
                                                         </a>
                                                     </span>
                                                 )
                                         )
                                         :
                                         (
                                             <span className="btn-group-action" style={{marginTop: 10}}>
                                             <a onClick={(e) => {
                                                 this.openEditQuantity(e, goodOrder.quantity);
                                             }}>
                                                 <i className="material-icons"
                                                    style={{fontSize: 20, marginLeft: 8, color: "green"}}>check</i>
                                             </a>
                                             <a onClick={(e) => this.clearEditQuantity(e, goodOrder.quantity)}>
                                                 <i className="material-icons"
                                                    style={{fontSize: 20, marginLeft: 8, color: "red"}}>clear</i>
                                             </a>
                                             </span>
                                         )
                                 )
                             :
                             this.props.isSavingQuantityInReturnOrders && this.props.isSavingQuantityInReturnOrders.id === index && this.props.isSavingQuantityInReturnOrders.status ?
                                 (
                                     <span className="btn-group-action">
                                         <a className="btn-group-action disabled">
                                             <i className="fa fa-spinner fa-spin"
                                                style={{fontSize: 20, marginLeft: 8}}/>
                                         </a>
                                     </span>
                                 )
                                 :
                                 (
                                     !this.state.isEdit ?
                                         (<span className="btn-group-action">
                                                 <a onClick={(e) => this.openEditQuantityInReturnOrder(e, goodOrder.quantity)}>
                                                 <i className="material-icons" style={{fontSize: 20, marginLeft: 8}}>edit</i>
                                             </a>
                                         </span>

                                         )
                                         :
                                         (<span className="btn-group-action" style={{marginTop: 10}}>
                                             <a onClick={(e) => {
                                                 this.openEditQuantityInReturnOrder(e, goodOrder.quantity);
                                             }}>
                                                 <i className="material-icons"
                                                    style={{fontSize: 20, marginLeft: 8, color: "green"}}>check</i>
                                             </a>
                                             <a onClick={(e) => this.clearEditQuantity(e, goodOrder.quantity)}>
                                                 <i className="material-icons"
                                                    style={{fontSize: 20, marginLeft: 8, color: "red"}}>clear</i>
                                             </a>
                                         </span>)
                                 )
                     }

                </span>
            </td>
        );
    }
}


EditButton.propTypes = {
    goodOrderActions: PropTypes.object.isRequired,
    order: PropTypes.object,
    isSavingQuantity: PropTypes.object,
    isSavingQuantityInReturnOrders: PropTypes.object,
    isReturnOrders: PropTypes.bool.isRequired,
    orderId: PropTypes.string,
    goodOrder: PropTypes.object.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    index: PropTypes.number,
    quantity: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        isSavingQuantity: state.goodOrders.order.isSavingQuantity,
        isSavingQuantityInReturnOrders: state.goodOrders.order.isSavingQuantityInReturnOrders,
        order: state.goodOrders.order,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodOrderActions: bindActionCreators(goodOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditButton);