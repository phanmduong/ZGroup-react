import React from 'react';
import PropTypes from 'prop-types';

class FormInputText extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="form-group label-floating">
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
    onKeyPress: PropTypes.func

};

export default FormInputText;
