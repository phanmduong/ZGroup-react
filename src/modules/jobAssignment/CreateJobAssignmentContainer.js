/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as jobAssignmentAction from '../jobAssignment/jobAssignmentAction';
import * as PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import FormInputText from "../../components/common/FormInputText";
import FormInputDateTime from "../../components/common/FormInputDateTime";
import ReactSelect from 'react-select';

class CreateJobAssignmentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }


    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    {
                        this.props.isLoading ? <Loading/> :

                        <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-header card-header-icon" data-background-color="rose">
                                            <i className="material-icons">assignment</i>
                                        </div>

                                        <div className="card-content">
                                            <h4 className="card-title">Tạo công việc</h4>
                                            <div className="row">
                                                <div className="col-md-12">
                                                <FormInputText
                                                    label="Tên công việc"
                                                    required
                                                    type="text"
                                                    name="name"
                                                    updateFormData={()=>{}}
                                                    value={""}
                                                /></div><div className="col-md-12">
                                                <label className="">
                                                    Loại
                                                </label>
                                                <ReactSelect
                                                    disabled={this.props.isLoading}
                                                    options={[
                                                        {value: 'personal', label: 'Cá nhân',},
                                                        {value: 'team', label: 'Nhóm',},
                                                        {value: 'person_project', label: 'Dự án riêng',},
                                                    ]}
                                                    onChange={this.onMoneyFilterChange}
                                                    value={"personal"}
                                                    defaultMessage="Tuỳ chọn"
                                                    name="type"
                                                /></div><div className="col-md-12">
                                                <FormInputText
                                                    label="Chi phí"
                                                    required
                                                    type="number"
                                                    name="cost"
                                                    updateFormData={()=>{}}
                                                    value={""}
                                                /></div><div className="col-md-12">
                                                <FormInputDateTime
                                                    label="Deadline"
                                                    name="deadline"
                                                    updateFormData={()=>{}}
                                                    value={""}
                                                    id="deadline"
                                                    maxDate=""

                                                /></div><div className="col-md-4">
                                                <label className="">
                                                    Loại
                                                </label>
                                                </div><div className="col-md-4">
                                                <FormInputText
                                                    label="Điểm cộng"
                                                    required
                                                    type="text"
                                                    name="point"
                                                    updateFormData={()=>{}}
                                                    value={""}
                                                /></div><div className="col-md-4">
                                                <FormInputText
                                                    label="Điểm cộng"
                                                    required
                                                    type="text"
                                                    name="point"
                                                    updateFormData={()=>{}}
                                                    value={""}
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
                                                <Loading/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

CreateJobAssignmentContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobAssignmentContainer);