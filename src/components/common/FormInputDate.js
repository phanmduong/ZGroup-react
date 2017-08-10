import React from 'react';
import PropTypes from 'prop-types';

class FormInputDate extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        $('#'+this.props.id).on('dp.change', this.props.updateFormData);
    }

    render() {
        return (
            <div className="form-group">
                <label className="label-control">{this.props.label}</label>
                <input
                    type="text"
                    className="form-control datetimepicker"
                    name={this.props.name}
                    id={this.props.id}
                    value={this.props.value}
                />
            </div>
        );
    }
}

FormInputDate.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    updateFormData: PropTypes.func.isRequired,
};

export default FormInputDate;
