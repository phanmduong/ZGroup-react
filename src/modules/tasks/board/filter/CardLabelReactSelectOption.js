import React from 'react';
import PropTypes from 'prop-types';

class CardLabelReactSelectOption extends React.Component {
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
        const btnStyle = {
            backgroundColor: this.props.option.color,
            margin: 3,
            width: "calc(100% - 6px)"
        };

        return (
            <div className="btn"
                 style={btnStyle}
                 onMouseDown={this.handleMouseDown}
                 onMouseEnter={this.handleMouseEnter}
                 onMouseMove={this.handleMouseMove}
                 title={this.props.option.title}>
                {this.props.children}
            </div>
        );
    }
}

CardLabelReactSelectOption.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired,
};

export default CardLabelReactSelectOption;