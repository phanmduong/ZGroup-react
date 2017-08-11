import React from 'react';
import PropTypes from 'prop-types';

class Switch extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    componentDidMount() {
        $.material.init();
    }

    handleInputChange(event) {
        const value = event.target.checked;
        this.props.onChange(value);
    }

    render() {
        return (
            <div className="togglebutton">
                <label>
                    <input
                        type="checkbox"
                        checked={this.props.value}
                        onChange={this.handleInputChange}/>
                    {this.props.value ? "Mở" : "Đóng"}
                </label>
            </div>
        );
    }
}

Switch.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired
};

export default Switch;