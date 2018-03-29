import React from "react";
import PropTypes from "prop-types";
// import {DATETIME_VN_FORMAT} from "../../constants/constants";
// import moment from "moment";

class FormInputDateTime extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="form-group">
                <label className="label-control">{this.props.label}</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    value={this.props.value}
                    name={this.props.name}
                    id={this.props.id}
                    onChange={this.props.updateFormData}/>
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
    defaultDate: PropTypes.object
};

export default FormInputDateTime;
