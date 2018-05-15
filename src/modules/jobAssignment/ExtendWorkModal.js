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
import * as helper from "../../helpers/helper";

class ExtendWorkModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            new_deadline: moment().add(1, "hours"),
            penalty: 0,
            reason: "",
        };
        this.submit = this.submit.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentWillMount() {
        helper.setFormValidation('#form-extend-work');
    }

    componentWillReceiveProps(nextProps) {
        if (!(!this.props.isSaving && nextProps.isSaving))
            this.setState({
                new_deadline: nextProps.data.deadline,
                penalty: 0,
                reason: "",
            });
    }

    componentDidUpdate(){
        helper.setFormValidation('#form-extend-work');
    }
    
    updateFormData(e){
        if(!e) return;
        let feild = e.target.name;
        let value = e.target.value;
        let newdata = {...this.state,[feild] : value};
        this.setState(newdata);
    }

    submit(){
        if($('#form-extend-work').valid())
            this.props.submit(this.props.data.id, this.state);
    }


    render() {
        let isValidDate = moment(this.state.new_deadline, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).isValid();
        let time = "";
        if(isValidDate) time = moment(this.state.new_deadline || "" , [DATETIME_FORMAT,  DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT);
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xin gia hạn công việc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form role="form" id="form-extend-work" onSubmit={(e) => e.preventDefault()}>
                        {
                            this.props.isLoading ?
                                <Loading/>
                                :

                                <div className="row">
                                    <div className="col-md-12">
                                        <FormInputDateTime
                                            label="Deadline mới"
                                            name="new_deadline"
                                            updateFormData={this.updateFormData}
                                            value={time}
                                            id="new_deadline"
                                            format={DATETIME_FORMAT}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <FormInputText
                                            label={"Số tiền phạt(" + (this.props.data.bonus_type === "coin" ? "Coin" : "VNĐ") + ")"}
                                            required
                                            type="number"
                                            name="penalty"
                                            updateFormData={this.updateFormData}
                                            value={this.state.penalty || 0}
                                        /></div>
                                    <div className="col-md-12">
                                        <FormInputText
                                            label="Lý do"
                                            required
                                            type="text"
                                            name="reason"
                                            updateFormData={this.updateFormData}
                                            value={this.state.reason || ""}
                                        /></div>
                                    <div className="col-md-12" style={{display: "flex", flexFlow: "row-reverse"}}>
                                        {this.props.isSaving ?
                                            <button disabled className="btn btn-rose  disabled" type="button">
                                                <i className="fa fa-spinner fa-spin"/> Đang gửi
                                            </button>
                                            :
                                            <button onClick={this.submit} className="btn btn-rose">Gửi yêu cầu</button>
                                        }
                                    </div>
                                </div>

                        }
                    </form>
                </Modal.Body>
            </Modal>

        );
    }
}

ExtendWorkModal.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    data: PropTypes.object,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    submit: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        isLoading : state.jobAssignment.isLoading,
        isSaving : state.jobAssignment.isSaving,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        jobAssignmentAction: bindActionCreators(jobAssignmentAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtendWorkModal);