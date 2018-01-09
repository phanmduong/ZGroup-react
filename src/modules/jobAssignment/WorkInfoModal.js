/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as jobAssignmentAction from '../jobAssignment/jobAssignmentAction';
import * as PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import FormInputText from "../../components/common/FormInputText";
import ListStaffs from './ListStaffs';
import moment from "moment/moment";
import {DATETIME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";
import {Modal} from 'react-bootstrap';

const money = [{value: 'vnd', label: 'VNĐ',},{value: 'coin', label: 'Coin',},];
const types = [
    {value: 'personal', label: 'Cá nhân',},
    {value: 'team', label: 'Nhóm',},
    {value: 'person_project', label: 'Dự án riêng',},
];

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
                                                <div className="card-header card-header-icon"
                                                     data-background-color="rose">
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
                                                                updateFormData={() => {
                                                                }}
                                                                value={this.props.data.name || ""}
                                                                disabled
                                                            /></div>
                                                        <div className="col-md-6">
                                                            <label className="">
                                                                Loại
                                                            </label>
                                                            {types.map((obj) => {
                                                                if (this.props.data && obj.value == this.props.data.type)
                                                                    return (<div key={obj.value}>{obj.label}</div>);
                                                            })}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Chi phí"
                                                                required
                                                                type="number"
                                                                name="cost"
                                                                updateFormData={() => {
                                                                }}
                                                                value={this.props.data.cost || 0}
                                                                disabled
                                                            /></div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Deadline"
                                                                required
                                                                type="text"
                                                                updateFormData={() => {
                                                                }}
                                                                value={time}
                                                                disabled
                                                            /></div>
                                                        <div className="col-md-6">
                                                            <label className="">
                                                                Thưởng
                                                            </label>
                                                            <div>{this.props.data.bonus_value +" - "}

                                                            {money.map((obj) => {
                                                                if (this.props.data && this.props.data.bonus_type == obj.value)
                                                                    return (obj.label);
                                                            })}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card">
                                                <div className="card-header card-header-icon"
                                                     data-background-color="rose">
                                                    <i className="material-icons">contacts</i>
                                                </div>

                                                <div className="card-content">
                                                    <h4 className="card-title">Người thực hiện</h4>
                                                    <div className="row">
                                                        <ListStaffs
                                                            staffs={this.props.data.staffs || []}
                                                        />
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
    modalType: PropTypes.string,
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