import React from 'react';
import PropTypes from 'prop-types';


class EditButton extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isEdit: false,
        };
        this.openEditQuantity = this.openEditQuantity.bind(this);
    }

    openEditQuantity() {
        this.setState({isEdit: !this.state.isEdit});
    }

    render() {
        const goodOrder = this.props.goodOrder;
        const index = this.props.index;
        return (
            <td >
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
                <a onClick={this.openEditQuantity}
                >
                    <i className="material-icons" style={{fontSize: 20, marginLeft: 8}}>edit</i>
                </a>
            </td>
        );
    }
}

EditButton.propTypes = {
    goodOrder: PropTypes.object.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    index: PropTypes.number,
};

export default EditButton;