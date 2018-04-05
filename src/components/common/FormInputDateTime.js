import React from "react";
import PropTypes from "prop-types";
import { DATETIME_FORMAT } from "../../constants/constants";
import moment from "moment";

class FormInputDateTime extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const format = this.props.format || DATETIME_FORMAT;
        $("#" + this.props.id).on("dp.change", this.props.updateFormData);
        $("#" + this.props.id).datetimepicker({
            // autoclose: true,

            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: "fa fa-chevron-left",
                next: "fa fa-chevron-right",
                today: "fa fa-screenshot",
                clear: "fa fa-trash",
                close: "fa fa-remove",
            },
            defaultDate: this.props.value
                ? moment(this.props.value, format)
                : this.props.defaultDate ? this.props.defaultDate : moment(),
            format,
        });
        if (this.props.minDate && this.props.minDate !== "") {
            $("#" + this.props.id)
                .data("DateTimePicker")
                .minDate(this.props.minDate);
        }
        if (this.props.maxDate && this.props.maxDate !== "") {
            $("#" + this.props.id)
                .data("DateTimePicker")
                .maxDate(this.props.maxDate);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.minDate && nextProps.minDate !== "") {
            $("#" + this.props.id)
                .data("DateTimePicker")
                .minDate(nextProps.minDate);
        }
        if (nextProps.maxDate && nextProps.maxDate !== "") {
            $("#" + this.props.id)
                .data("DateTimePicker")
                .maxDate(nextProps.maxDate);
        }
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
    defaultDate: PropTypes.object,
    maxDate: PropTypes.string,
    minDate: PropTypes.string,
};

export default FormInputDateTime;
