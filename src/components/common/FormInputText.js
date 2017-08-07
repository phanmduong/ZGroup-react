import React from 'react';

class FormInputText extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className={ this.props.isValidate ? "form-group has-error" : "form-group"}>
                <label className="control-label" htmlFor={this.props.name}>{this.props.label}</label>
                <input
                    className="form-control"
                    id={this.props.name}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.updateFormData}
                    disabled={this.props.disabled}
                />
                { this.props.isValidate &&  <span className="help-block">{this.props.notiValidate}</span>}

            </div>
        );
    }
}

export default FormInputText;
