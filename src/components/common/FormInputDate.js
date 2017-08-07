import React from 'react';

class FormInputSelect extends React.Component {
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

export default FormInputSelect;
