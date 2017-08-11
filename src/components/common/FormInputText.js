import React from 'react';
import PropTypes from 'prop-types';

class FormInputText extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const className = this.props.isNotValid ? " has-error" : "";
        return (
            <div className={"form-group label-floating" + className}>
                <label className="control-label">
                    {this.props.label} {(this.props.required && !this.props.disabled && <star>*</star>)}
                </label>
                {(this.props.disabled) ?
                    (
                        <p className="form-control-static">{this.props.value}</p>
                    )
                    :
                    (
                        <input
                            type={(this.props.type || 'text')}
                            className="form-control"
                            required={this.props.required}
                            onChange={this.props.updateFormData}
                            name={this.props.name}
                            value={(this.props.value) ? this.props.value : ''}
                            disabled={this.props.disabled}
                            onKeyPress={this.props.onKeyPress}
                        />
                    )

                }
                {this.props.isNotValid && <span className="help-block">{this.props.errorMessage}</span>}
            </div>

        );
    }
}

FormInputText.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    updateFormData: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    type: PropTypes.string,
    isNotValid: PropTypes.bool,
    errorMessage: PropTypes.string,
    onKeyPress: PropTypes.func

};

export default FormInputText;
