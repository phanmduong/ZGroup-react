import React from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

class TooltipButton extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const toolTip = (
            <Tooltip id="tooltip">{this.props.text}</Tooltip>
        );
        return (
            <OverlayTrigger placement={this.props.placement} overlay={toolTip}>
                {this.props.children}
            </OverlayTrigger>
        );
    }
}

TooltipButton.propTypes = {
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    placement: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};

export default TooltipButton;