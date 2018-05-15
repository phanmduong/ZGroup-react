import React from 'react';
import PropTypes from 'prop-types';
import {DATETIME_FORMAT} from "../../constants/constants";
import moment from "moment";

class InlineInputDateTime extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const el = $('#' + this.props.id);
        el.on('dp.change', this.props.updateFormData);
        el.datetimepicker({
            defaultDate: this.props.value ? moment(this.props.value, DATETIME_FORMAT) : moment(),
            inline: true,
            format: DATETIME_FORMAT
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="form-group is-empty" style={{marginTop: 0}}>
                        <input type="text" value={this.props.value} disabled className="form-control"/>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div id={this.props.id}/>
                </div>
            </div>
        );
    }
}

InlineInputDateTime.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    format: PropTypes.string,
    updateFormData: PropTypes.func.isRequired,
};

export default InlineInputDateTime;
