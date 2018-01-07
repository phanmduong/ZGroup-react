import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as goodOrderActions from '../goodOrderActions';
import * as helper from '../../../helpers/helper';


class EditButton extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isEdit: false,
            quantity : 0,
        };
        this.openEditQuantity = this.openEditQuantity.bind(this);
        this.clearEditQuantity = this.clearEditQuantity.bind(this);
    }

    openEditQuantity(e, quantity) {
        if (this.state.isEdit) {
            if (quantity <= 0) {
                helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa ",
                    function () {
                        this.props.goodOrderActions.editOrder(this.props.order, this.props.orderId,this.props.index);
                    }.bind(this));
            }
            else {
                this.props.goodOrderActions.editOrder(this.props.order, this.props.orderId, this.props.index);
                e.preventDefault();
            }
            this.setState({isEdit: !this.state.isEdit, quantity : this.props.quantity});
        }
        else
            this.setState({isEdit: !this.state.isEdit});
    }
    clearEditQuantity( e){
        if (this.state.isEdit) {
                this.props.updateQuantity(this.state.quantity,this.props.index);
                e.preventDefault();
            this.setState({isEdit: !this.state.isEdit});
        }
        else
            this.setState({isEdit: !this.state.isEdit});
    }



    render() {
        const goodOrder = this.props.goodOrder;
        const index = this.props.index;
        return (
            <td style={{width: 120, display:"flex"}} >
                {this.state.isEdit ?
                    <input type="number" name="quantity" value={goodOrder.quantity}
                           className="form-control"
                           style={{width: 40}}
                           onChange={(e) => {
                               this.props.updateQuantity(e.target.value, index);
                           }}
                    />
                    :
                    goodOrder.quantity
                }
                <span>

                     {this.props.isSavingQuantity && this.props.isSavingQuantity.id === index && this.props.isSavingQuantity.status ?
                         (
                             <span className="btn-group-action">
                                <a className="btn-group-action disabled">
                                    <i className="fa fa-spinner fa-spin" style={{fontSize: 20, marginLeft: 8}}/>
                                </a>
                            </span>
                         )
                         :
                         (
                             !this.state.isEdit ?
                                 <span className="btn-group-action">
                            <a onClick={(e) => this.openEditQuantity(e, goodOrder.quantity)}
                            >
                                <i className="material-icons" style={{fontSize: 20, marginLeft: 8}}>edit</i>
                            </a>
                        </span>
                                 :
                                 <span className="btn-group-action" style={{marginTop: 10}}>
                            <a  onClick={(e) => {
                                this.openEditQuantity(e, goodOrder.quantity);
                            }}>
                                <i className="material-icons" style={{fontSize: 20, marginLeft: 8 , color : "green"}}>check</i>
                            </a>
                                <a
                                    onClick={(e) => this.clearEditQuantity(e, goodOrder.quantity)}
                                >
                                <i className="material-icons" style={{fontSize: 20, marginLeft: 8, color : "red"}}>clear</i>
                            </a>
                        </span>
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
    isSavingQuantity: PropTypes.bool,
    orderId: PropTypes.number,
    goodOrder: PropTypes.object.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    index: PropTypes.number,
    quantity: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        isSavingQuantity: state.goodOrders.order.isSavingQuantity,
        order: state.goodOrders.order,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodOrderActions: bindActionCreators(goodOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditButton);