import React from 'react';
import PropTypes from 'prop-types';

class FormInputDate extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name} >{this.props.label}</label>
                <input
                    className="form-control"
                    type="date"
                    id={this.props.name}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.updateFormData}
                />
            </div>
        );
    }
}

FormInputDate.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    updateFormData: PropTypes.func.isRequired,
};

export default FormInputDate;
