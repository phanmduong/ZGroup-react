import React from 'react';
import PropTypes from "prop-types";
//import FormInputDate from "../../components/common/FormInputDate";
//import FormInputDateTime from "../../components/common/FormInputDateTime";
import {DATETIME_SEAT_FORMAT} from "../../constants/constants";
import moment from "moment";
import FormInputDateTimeBat from "./FormInputDateTimeBat";

class CameToVN extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let order = this.props.order;
        return (
            <div className="card">
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">card_giftcard</i>
                </div>
                <div className="card-content">
                    <div className="form-group">
                        <FormInputDateTimeBat
                            format={DATETIME_SEAT_FORMAT}
                            label="Dự kiến ngày về"
                            name="endTime"
                            defaultDate={moment()}
                            updateFormData={this.props.updateFormData}
                            id="form-end-time"
                            required={true}
                            value={order.attach_info ? JSON.parse(order.attach_info).endTime : ''}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

CameToVN.propTypes = {
    order: PropTypes.object.isRequired,
    updateFormData: PropTypes.func.isRequired
};

export default CameToVN;
