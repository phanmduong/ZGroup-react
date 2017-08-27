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
                onChange={this.props.onChange}
                className="selectpicker"
                data-style="btn btn-primary btn-round" data-size="20">
                <option selected disabled>{this.props.defaultMessage || "Please select"}</option>
                {this.props.options.map((option, index) => {
                    console.log(option);
                    return <option key={option.id} value={option.id}>Khóa {option.name}</option>;
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
    name: PropTypes.string.isRequired
};

export default Select;
