import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../../components/common/Avatar";

class MemberReactSelectValue extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderRemoveIcon = this.renderRemoveIcon.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.handleTouchEndRemove = this.handleTouchEndRemove.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);

    }
    handleMouseDown (event) {
        if (event.type === 'mousedown' && event.button !== 0) {
            return;
        }
        if (this.props.onClick) {
            event.stopPropagation();
            this.props.onClick(this.props.value, event);
            return;
        }
        if (this.props.value.href) {
            event.stopPropagation();
        }
    }

    onRemove (event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onRemove(this.props.value);
    }

    handleTouchEndRemove (event){
        // Check if the view is being dragged, In this case
        // we don't want to fire the click event (because the user only wants to scroll)
        if(this.dragging) return;

        // Fire the mouse events
        this.onRemove(event);
    }

    handleTouchMove () {
        // Set a flag that the view is being dragged
        this.dragging = true;
    }

    handleTouchStart () {
        // Set a flag that the view is not being dragged
        this.dragging = false;
    }

    renderRemoveIcon() {
        if (this.props.disabled || !this.props.onRemove) return;
        return (
            <span className="Select-value-icon"
                  aria-hidden="true"
                  onMouseDown={this.onRemove}
                  onTouchEnd={this.handleTouchEndRemove}
                  onTouchStart={this.handleTouchStart}
                  onTouchMove={this.handleTouchMove}>
				&times;
			</span>
        );
    }

    render() {
        let avatarStyle = {
            borderRadius: 3,
            display: 'inline-block',
            marginRight: 5,
            position: 'relative',
            verticalAlign: 'middle'
        };
        return (
            <div className="Select-value" title={this.props.value.name}>
                {this.renderRemoveIcon()}
                <span className="Select-value-label">
					<Avatar style={avatarStyle} url={this.props.value.icon_url} size={15}/>
                    {this.props.children}
				</span>
            </div>
        );
    }
}

MemberReactSelectValue.propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,               // disabled prop passed to ReactSelect
    id: PropTypes.string,                   // Unique id for the value - used for aria
    onClick: PropTypes.func,                // method to handle click on value label
    onRemove: PropTypes.func,               // method to handle removal of the value
    value: PropTypes.object.isRequired,     // the option object for this value
};

export default MemberReactSelectValue;