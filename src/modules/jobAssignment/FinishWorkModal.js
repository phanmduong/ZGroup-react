/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as jobAssignmentAction from '../jobAssignment/jobAssignmentAction';
import * as PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import {Modal} from 'react-bootstrap';
import FormInputText from "../../components/common/FormInputText";
import RateStar from "../../components/common/RateStar";
import * as helper from "../../helpers/helper";

class FinishWorkModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            star: 0,
            cost: 0,
            self_report: "",
        };
        this.submit = this.submit.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.textAreaAdjust = this.textAreaAdjust.bind(this);

    }

    componentWillMount() {
        helper.setFormValidation('#form-finish-work');
    }

    componentWillReceiveProps() {
        //if (!(!this.props.isSaving && nextProps.isSaving))
    }

    componentDidUpdate(){
        helper.setFormValidation('#form-finish-work');
    }

    textAreaAdjust() {}

    updateFormData(e){
        if(!e) return;
        let feild = e.target.name;
        let value = e.target.value;let newdata = {...this.state,[feild] : value};
        this.setState(newdata);
    }

    submit(){
        if($('#form-finish-work').valid())
            helper.showNotification("OK");
        else helper.showErrorNotification("Vui lòng điền đầy đủ thông tin");
    }

    render() {

        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Báo cáo hoàn thành công việc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form role="form" id="form-finish-work" onSubmit={(e) => e.preventDefault()}>
                        {
                            this.props.isLoading ?
                                <Loading/>
                                :
                                <div className="row">
                                    <div className="col-md-12">
                                        <RateStar
                                            name="star"
                                            updateFormData={this.updateFormData}
                                            value={this.state.star}
                                            label="Mức độ hoàn thành"
                                            maxStar="5"
                                            placeholder="5"
                                        /></div>
                                    <div className="col-md-12">
                                        <FormInputText
                                            label={"Số tiền phạt"}
                                            required
                                            type="number"
                                            name="cost"
                                            updateFormData={this.updateFormData}
                                            value={this.state.cost || 0}
                                        /></div>
                                    <div className="col-md-12">
                                        <label className="control-label">Tự đánh giá</label>
                                    <div className="comment-input-wrapper">
                                        <textarea
                                            id="textarea-card-comment"
                                            name="self_report"
                                            onChange={this.updateFormData}
                                            value={this.state.self_report || ""}
                                            onKeyUp={this.textAreaAdjust}
                                            placeholder="Tự đánh giá"
                                            className="comment-input"
                                            required
                                            style={{width:"100%",
                                                margin:"10px",
                                                height: "369px",
                                                overflowY: "scroll",
                                                resize: "none",
                                            }}
                                        />
                                    </div>
                                    </div>
                                    <div className="col-md-12" style={{display: "flex", flexFlow: "row-reverse"}}>
                                        {this.props.isSaving ?
                                            <button disabled className="btn btn-rose  disabled" type="button">
                                                <i className="fa fa-spinner fa-spin"/> Đang lưu
                                            </button>
                                            :
                                            <button onClick={this.submit} className="btn btn-rose">Hoàn thành</button>
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

FinishWorkModal.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(FinishWorkModal);