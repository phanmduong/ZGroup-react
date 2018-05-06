import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../../components/common/Avatar";
import {Media} from "react-bootstrap";

class MemberReactSelectOption extends React.Component {
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
        let avatarStyle = {
            borderRadius: 3,
            display: 'inline-block',
            marginRight: 10,
            position: 'relative',
            top: -2,
            verticalAlign: 'middle',
        };

        return (
            <div className={this.props.className}
                 onMouseDown={this.handleMouseDown}
                 onMouseEnter={this.handleMouseEnter}
                 onMouseMove={this.handleMouseMove}
                 title={this.props.option.title}>

                <Media>
                    <Media.Left>
                        <Avatar
                            style={avatarStyle}
                            // distance={0}
                            url={
                                this.props.option.icon_url
                            } size={20}/>
                    </Media.Left>
                    <Media.Body>
                        {this.props.children}
                    </Media.Body>
                </Media>

            </div>
        );
    }
}

MemberReactSelectOption.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired,
};

export default MemberReactSelectOption;