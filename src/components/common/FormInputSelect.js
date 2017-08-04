import React from 'react';

class FormInputSelect extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <select
                    className="form-control"
                    value={this.props.value}
                    onChange={this.props.updateFormData}
                    name={this.props.name}
                >
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

export default FormInputSelect;
