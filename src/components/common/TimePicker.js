import React from 'react';
import PropTypes from 'prop-types';
import {isEmptyInput} from "../../helpers/helper";

class TimePicker extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $('#' + this.props.id).on('dp.change', this.props.onChange);
        $('#' + this.props.id).datetimepicker({
            format: 'H:mm',    // use this format if you want the 24hours timepicker
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove',
                inline: true
            }
        });
    }

    render() {
        return (
            <div className="form-group">
                {!isEmptyInput(this.props.label) && <label className="label-control">{this.props.label}</label>}
                <input type="text" className="form-control timepicker"
                       value={this.props.value}
                       name={this.props.name}
                       id={this.props.id}
                       onChange={this.props.onChange}
                />
            </div>
        );
    }
}

TimePicker.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};
export default TimePicker;
