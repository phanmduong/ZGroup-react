/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as jobAssignmentAction from '../jobAssignment/jobAssignmentAction';
import * as PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import {Modal} from 'react-bootstrap';
import moment from "moment/moment";
import {DATETIME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";
import FormInputText from "../../components/common/FormInputText";
import FormInputDateTime from "../../components/common/FormInputDateTime";
import CardWork from "./CardWork";

class ExtendWorkModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            deadline: moment().add(1, "hours"),
            penalty: 0,
            reason: "",
        }
    }

    render() {
        let time = moment(this.props.data.deadline || "" , [DATETIME_FORMAT,  DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT);
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xin gia hạn công việc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isLoading ?
                            <Loading/>
                            :
                            <div className="row">
                                <div className="col-md-12">
                                    <FormInputDateTime
                                        label="Deadline mới"
                                        name="deadline"
                                        updateFormData={this.updateFormData}
                                        value={ this.state.deadline.timer}
                                        defaultDate={moment().add(1, "hours")}
                                        id="deadline"
                                        minDate={time}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <FormInputText
                                        label={"Số tiền phạt(" + (this.props.data.bonus_type == "coin" ? "Coin" : "VNĐ") +")" }
                                        required
                                        type="number"
                                        name="cost"
                                        updateFormData={this.updateFormData}
                                        value={this.state.penalty || 0}
                                    /></div>
                                <div className="col-md-12">
                                    <FormInputText
                                        label="Lý do"
                                        required
                                        type="text"
                                        name="cost"
                                        updateFormData={this.updateFormData}
                                        value={this.state.reason || 0}
                                    /></div>
                            </div>
                    }
                </Modal.Body>
            </Modal>

        );
    }
}

ExtendWorkModal.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.object,
    show: PropTypes.bool,
    onHide: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        isLoading : state.jobAssignment.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        jobAssignmentAction: bindActionCreators(jobAssignmentAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtendWorkModal);