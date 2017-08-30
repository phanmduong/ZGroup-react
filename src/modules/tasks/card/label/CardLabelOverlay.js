import React from 'react';
import PropTypes from 'prop-types';
import {CirclePicker} from "react-color";

class CardLabelOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            color: ""
        };
    }

    render() {
        return (
            <div className="kt-overlay" style={{width: "300px", marginLeft: -30}}>
                <button
                    onClick={this.props.toggle}
                    type="button" className="close"
                    style={{color: '#5a5a5a'}}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>
                <h4>Nhãn</h4>
                <CirclePicker width="100%"
                              color={this.state.color}
                              onChangeComplete={this.props.changeColor}/>
            </div>
        );
    }
}

CardLabelOverlay.propTypes = {
    myProp: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired,
    changeColor: PropTypes.func.isRequired
};

export default CardLabelOverlay;