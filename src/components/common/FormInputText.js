import React from 'react';
import PropTypes from 'prop-types';

class FormInputText extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        // return (
        //     <div className={this.props.isValidate ? "form-group has-error" : "form-group"}>
        //         <label className="control-label" htmlFor={this.props.name}>{this.props.label}</label>
        //         <input
        //             className="form-control"
        //             id={this.props.name}
        //             name={this.props.name}
        //             placeholder={this.props.placeholder}
        //             value={this.props.value}
        //             onChange={this.props.updateFormData}
        //             disabled={this.props.disabled}
        //         />
        //         { this.props.isValidate &&  <span className="help-block">{this.props.notiValidate}</span>}
        //
        //     </div>
        // );
        return (
            <div className="form-group label-floating">
                <label className="control-label">
                    {this.props.label} {(this.props.required && <star>*</star>)}
                </label>
                <input
                    type={(this.props.type || 'text')}
                    className="form-control"
                    required={this.props.required}
                    onChange={this.props.updateFormData}
                    name={this.props.name}
                    value={this.props.value}
                />
            </div>
        );
    }
}

FormInputText.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    updateFormData: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    type: PropTypes.string,

};

export default FormInputText;
