import React from 'react';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';

class FormInputMoney extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        $.material.init();
        if (this.props.placeholder) {
            $(`#form-input-${this.props.name}`).removeClass('is-empty');
        }
    }

    componentDidUpdate() {
        if (!helper.isEmptyInput(this.props.value)) {
            $(`#form-input-${this.props.name}`).removeClass('is-empty');
        }
        if (this.props.placeholder) {
            $(`#form-input-${this.props.name}`).removeClass('is-empty');
        }
    }

    onChange(e){
        e.target.value = helper.convertDotStringNumberToStringNumber(e.target.value);
        this.props.updateFormData(e);
    }

    render() {
        const className = this.props.isNotValid ? ' has-error' : '';
        return (
            <div
                id={`form-input-${this.props.name}`}
                className={
                    'form-group label-floating' +
                    className +
                    ' ' +
                    (this.props.className ? this.props.className : '')
                }
                style={this.props.style}>
                {this.props.label && (
                    <label className="control-label">
                        {this.props.label}{' '}
                        {this.props.required &&
                            !this.props.disabled && <star style={{ color: 'red' }}>*</star>}
                    </label>
                )}

                {this.props.disabled ? (
                    <p className="form-control-static">{helper.dotStringNumber(this.props.value)}</p>
                ) : (
                    <input
                        autoComplete={this.props.autoComplete}
                        type={this.props.type || 'text'}
                        className="form-control"
                        required={this.props.required}
                        onChange={this.onChange}
                        name={this.props.name}
                        value={this.props.value ? helper.dotStringNumber(this.props.value) : ''}
                        disabled={this.props.disabled}
                        onKeyPress={this.props.onKeyPress}
                        placeholder={this.props.placeholder}
                        min={this.props.minValue ? this.props.minValue : undefined}
                        max={this.props.maxValue ? this.props.maxValue : undefined}
                    />
                )}

                {this.props.children}
                {this.props.isNotValid && <span className="help-block">{this.props.errorMessage}</span>}
            </div>
        );
    }
}

FormInputMoney.propTypes = {
    children: PropTypes.element,
    name: PropTypes.string.isRequired,
    autoComplete: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    updateFormData: PropTypes.func,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    type: PropTypes.string,
    isNotValid: PropTypes.bool,
    errorMessage: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    equalTo: PropTypes.string,
    onKeyPress: PropTypes.func,
    minValue: PropTypes.string,
    maxValue: PropTypes.string,
    style: PropTypes.object
};

export default FormInputMoney;
