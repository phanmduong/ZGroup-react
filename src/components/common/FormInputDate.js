import React from 'react';
import PropTypes from 'prop-types';
import {isEmpty} from "../../helpers/entity/mobx";

class FormInputDate extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $('#' + this.props.id).on('dp.change', this.props.updateFormData);
        $('#' + this.props.id).datetimepicker({
            format: this.props.format || 'YYYY-MM-DD'
        });
        if (this.props.minDate && this.props.minDate !== '') {
            $('#' + this.props.id).data('DateTimePicker').minDate(this.props.minDate);
        }
        if (this.props.maxDate && this.props.maxDate !== '') {
            $('#' + this.props.id).data('DateTimePicker').maxDate(this.props.maxDate);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!($('#' + this.props.id).is(":visible") && $('#' + this.props.id).html() != "")) {
            $('#' + this.props.id).datetimepicker({
                format: this.props.format || 'YYYY-MM-DD'
            });
        }
        if (nextProps.minDate && nextProps.minDate !== '') {
            $('#' + this.props.id).data('DateTimePicker').minDate(nextProps.minDate);
        }
        if (nextProps.maxDate && nextProps.maxDate !== '') {
            $('#' + this.props.id).data('DateTimePicker').maxDate(nextProps.maxDate);
        }
    }

    clear = () => {
        $('#' + this.props.id).datetimepicker('setDate', null);
        this.props.updateFormData({target:{value:''}});
    };


    render() {
        return (
            <div className="form-group">
                {this.props.label && <label className="label-control">{this.props.label}</label>}
                <input
                    type="text"
                    className="form-control datetimepicker"
                    placeholder={this.props.placeholder || ''}
                    name={this.props.name}
                    id={this.props.id}
                    value={this.props.value || ''}
                    disabled={this.props.disabled || false}
                />
                {this.props.clearable && !isEmpty(this.props.value) && <div onClick={this.clear} style={{
                    "position": "absolute",
                    "right": "10px",
                    "bottom": "20px",
                    "color": "#999",
                    "cursor": "pointer",
                    "fontSize": "18px"
                }}>×</div>}
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
    format: PropTypes.string,
    maxDate: PropTypes.string,
    minDate: PropTypes.string,
    updateFormData: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    clearable: PropTypes.bool,
};

export default FormInputDate;
