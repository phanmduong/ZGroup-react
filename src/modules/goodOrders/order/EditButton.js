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
        };
        this.openEditQuantity = this.openEditQuantity.bind(this);
    }

    openEditQuantity(e, quantity) {
        if (this.state.isEdit) {
            if (quantity <= 0) {
                helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa ",
                    function () {
                        this.props.goodOrderActions.editOrder(this.props.order, this.props.orderId);
                    }.bind(this));
            }
            else {
                this.props.goodOrderActions.editOrder(this.props.order, this.props.orderId);
                e.preventDefault();
            }
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
                               this.props.updateQuantity(e, index);
                           }}
                    />
                    :
                    goodOrder.quantity
                }
                <span>

                    {!this.props.isSaving ?
                        (<span className="btn-group-action">
                            <a onClick={(e) => this.openEditQuantity(e, goodOrder.quantity)}
                            >
                                <i className="material-icons" style={{fontSize: 20, marginLeft: 8}}>edit</i>
                            </a>

                        </span>)
                        :
                        (
                            <span className="btn-group-action">
                                <a className="btn-group-action disabled">
                                    <i className="fa fa-spinner fa-spin" style={{fontSize: 20, marginLeft: 8}}/>
                                </a>
                            </span>)
                    }
                </span>
            </td>
        );
    }
}


EditButton.propTypes = {
    goodOrderActions: PropTypes.object.isRequired,
    order: PropTypes.object,
    isSaving: PropTypes.bool,
    orderId: PropTypes.number,
    goodOrder: PropTypes.object.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    index: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        isSaving: state.goodOrders.order.isSaving,
        order: state.goodOrders.order,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodOrderActions: bindActionCreators(goodOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditButton);
