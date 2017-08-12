import React from 'react';
import PropTypes from 'prop-types';

class FormInputSelect extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (this.props.isNotForm) {
            return (
                <select
                    className="form-control"
                    value={this.props.value}
                    onChange={this.props.updateFormData}
                    name={this.props.name}>
                    {this.props.data !== null && this.props.data !== undefined &&
                    this.props.data.map((item, key) => {
                        return (
                            <option
                                key={key}
                                value={item.id}
                            >
                                {item.name}
                            </option>);
                    })}
                </select>
            );
        } else {
            return (
                <div className="form-group">
                    <label>{this.props.label}</label>
                    <select
                        className="form-control"
                        value={this.props.value}
                        onChange={this.props.updateFormData}
                        name={this.props.name}>
                        {this.props.data !== null && this.props.data !== undefined &&
                        this.props.data.map((item, key) => {
                            return (
                                <option
                                    key={key}
                                    value={item.id}
                                >
                                    {item.name}
                                </option>);
                        })}
                    </select>
                </div>
            );
        }
    }
}

FormInputSelect.propTypes = {
    isNotForm: PropTypes.bool,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    updateFormData: PropTypes.func.isRequired,
    data: PropTypes.array,
};

export default FormInputSelect;
