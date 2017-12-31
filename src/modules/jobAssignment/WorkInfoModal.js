/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as jobAssignmentAction from '../jobAssignment/jobAssignmentAction';
import * as PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import FormInputText from "../../components/common/FormInputText";
import ReactSelect from 'react-select';
import ListStaffs from './ListStaffs';
import moment from "moment/moment";
import {DATETIME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";
import {Modal} from 'react-bootstrap';

class WorkInfoModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let time = moment(this.props.data.deadline || "" , [DATETIME_FORMAT,  DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT);
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                bsSize="large"
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <div className="content" >
                        <div className="container-fluid">
                            {

                                this.props.isLoading

                                    ?
                                    <Loading/> :

                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">assignment</i>
                                                </div>

                                                <div className="card-content">
                                                    <h4 className="card-title">Thông tin công việc</h4>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Tên công việc"

                                                                type="text"
                                                                name="name"
                                                                updateFormData={()=>{}}
                                                                value={this.props.data.name || ""}
                                                                disabled
                                                            /></div><div className="col-md-12">
                                                        <label className="">
                                                            Loại
                                                        </label>
                                                        <ReactSelect
                                                            disabled
                                                            options={[
                                                                {value: 'personal', label: 'Cá nhân',},
                                                                {value: 'team', label: 'Nhóm',},
                                                                {value: 'person_project', label: 'Dự án riêng',},
                                                            ]}
                                                            onChange={()=>{}}
                                                            value={this.props.data.type || ""}
                                                            defaultMessage="Tuỳ chọn"
                                                            name="type"
                                                        /></div><div className="col-md-12">
                                                        <FormInputText
                                                            label="Chi phí"
                                                            required
                                                            type="number"
                                                            name="cost"
                                                            updateFormData={()=>{}}
                                                            value={this.props.data.cost || 0}
                                                            disabled
                                                        /></div><div className="col-md-12">
                                                            <FormInputText
                                                            label="Deadline"
                                                            required
                                                            type="text"
                                                            updateFormData={()=>{}}
                                                            value={time}
                                                            disabled
                                                            /></div>
                                                        <div className="col-md-8">
                                                            <FormInputText
                                                                label="Điểm cộng"
                                                                required
                                                                type="number"
                                                                name="bonus_value"
                                                                updateFormData={()=>{}}
                                                                value={this.props.data.bonus_value || 0}
                                                                disabled
                                                            /></div>
                                                        <div className="col-md-4">
                                                            <ReactSelect
                                                                disabled
                                                                options={[
                                                                    {value: 'vnd', label: 'VNĐ',},
                                                                    {value: 'coin', label: 'Coin',},
                                                                ]}
                                                                onChange={()=>{}}
                                                                value={this.props.data.bonus_type || ""}
                                                                defaultMessage="Đơn vị"
                                                                style={{marginTop : "20px", width: "100%"}}
                                                            /></div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">contacts</i>
                                                </div>

                                                <div className="card-content">
                                                    <h4 className="card-title">Người thực hiện</h4>
                                                    <div className="row">
                                                        <ListStaffs staffs={this.props.data.staffs||[]} />


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            
        );
    }
}

WorkInfoModal.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoadingStaffs: PropTypes.bool,
    isSaving: PropTypes.bool.isRequired,
    data: PropTypes.object,
    show: PropTypes.bool,
    onHide: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        isLoading : state.jobAssignment.isLoading,
        isLoadingStaffs : state.jobAssignment.isLoadingStaffs,
        isSaving : state.jobAssignment.isSaving,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        jobAssignmentAction: bindActionCreators(jobAssignmentAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkInfoModal);