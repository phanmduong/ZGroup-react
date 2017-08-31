import React from 'react';
import PropTypes from 'prop-types';

class FormInputDateTime extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $('#' + this.props.id).on('dp.change', this.props.updateFormData);
        $('#' + this.props.id).datetimepicker({
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });
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

FormInputDateTime.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    format: PropTypes.string,
    updateFormData: PropTypes.func.isRequired,
};

export default FormInputDateTime;
