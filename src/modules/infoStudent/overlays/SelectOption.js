import React from 'react';
import PropTypes from 'prop-types';
import {DISCOUNTYPE} from "../../../constants/constants";

class SelectOption extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    handleMouseDown(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    }

    handleMouseEnter(event) {
        this.props.onFocus(this.props.option, event);
    }

    handleMouseMove(event) {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, event);
    }

    render() {

        let {option} = this.props;
        const btnStyle = {
            backgroundColor: option.color,
            width: "calc(100% - 12px)",
            margin: "4px 6px",
            textAlign: 'left',
            height: 65,
            padding: '10px 15px',
            borderRadius:8,
            border:'none'
        };
        let type = DISCOUNTYPE.filter(t => t.id == option.discount_type)[0] || {};
        let text = `${option.name} (-${option.discount_value}${type.suffix})`;
        let shared = option.shared == 1 ? 'Có thể dùng chung' : 'Không thể dùng chung';
        // console.log(this.props);
        return (
            <div className="btn"
                 style={btnStyle}
                 onMouseDown={this.handleMouseDown}
                 onMouseEnter={this.handleMouseEnter}
                 onMouseMove={this.handleMouseMove}
                 title={option.title}>
                {/*{this.props.children}*/}

                <div><b>{text}</b></div>
                <div>{`Đã dùng ${option.used_quantity}/${option.quantity} - ${option.expired_in}`}</div>
                <div>{shared}</div>
            </div>
        );
    }
}

SelectOption.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired,
};

export default SelectOption;