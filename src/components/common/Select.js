import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $('.selectpicker').selectpicker();

    }

    render() {
        return (
            <select
                value={this.props.value}
                onChange={(event) => this.props.onChange(event.target.value)}
                className="selectpicker"
                data-style="btn btn-primary btn-round" data-size="7">
                <option disabled>{this.props.defaultMessage || "Please select"}</option>
                {this.props.options.map((option, index) => {
                    return <option key={index} value={option.key}>{option.value}</option>;
                })}
            </select>

        );
    }
}


Select.propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultMessage: PropTypes.string,
};

export default Select;
