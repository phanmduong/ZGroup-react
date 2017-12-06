import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $('.selectpicker').selectpicker();

    }

    componentDidUpdate() {
        $('.selectpicker').selectpicker();


    }

    render() {
        return (
            <select
                name={this.props.name}
                value={this.props.value}
                onChange={(event) => this.props.onChange(event.target.value)}
                className="selectpicker"
                data-style="btn btn-rose btn-round">
                <option selected disabled>{this.props.defaultMessage || "Please select"}</option>
                <option value='11'>Tất cả</option>
                {this.props.options.map((option, index) => {
                    return <option key={index} value={option.id}>Khóa {option.name}</option>;
                })}
            </select>

        );
    }
}


Select.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultMessage: PropTypes.string,
    name: PropTypes.string.isRequired
};

export default Select;
