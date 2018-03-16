import React from 'react';
import PropTypes from "prop-types";
//import FormInputDate from "../../components/common/FormInputDate";
import FormInputDateTime from "../../components/common/FormInputDateTime";
import {DATETIME_SEAT_FORMAT} from "../../constants/constants";
import moment from "moment";

class CameToVN extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let order = this.props.order;
        return (
            <div>
                <div>
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">card_giftcard</i>
                    </div>
                    <div className="card-content">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <FormInputDateTime
                                        format={DATETIME_SEAT_FORMAT}
                                        label="Dự kiến ngày về"
                                        name="endTime"
                                        defaultDate={moment()}
                                        updateFormData={this.props.handleDate}
                                        id="form-end-time"
                                        value={order.attach_info ? JSON.parse(order.attach_info).endTime : ''}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CameToVN.propTypes = {
    order: PropTypes.object.isRequired,
    handleDate: PropTypes.func.isRequired
};

export default CameToVN;
