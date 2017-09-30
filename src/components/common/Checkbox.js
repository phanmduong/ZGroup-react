import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $.material.init();
    }

    render() {
        return (
            <label>
                {this.props.label}
                <input type="checkbox"
                       name={this.props.name}
                       checked={this.props.checked}
                       onChange={this.props.onChange}
                       disabled={this.props.disabled}
                />
            </label>
        );
    }
}

Checkbox.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
};

export default Checkbox;
