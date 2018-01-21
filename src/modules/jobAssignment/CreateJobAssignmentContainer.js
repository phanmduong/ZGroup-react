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
import Select from 'react-select';
import ListStaffs from './ListStaffs';
import ItemReactSelect from "../../components/common/ItemReactSelect";
import * as helper from '../../helpers/helper';
import moment from "moment/moment";
import {DATETIME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";
import MemberReactSelectOption from "../tasks/board/filter/MemberReactSelectOption";
import {ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import InfoStaffContainer from "../../modules/manageStaff/InfoStaffContainer";
import Avatar from "../../components/common/Avatar";

class CreateJobAssignmentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
          staffId: null,
          show: false,
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.updateFormDataType = this.updateFormDataType.bind(this);
        this.updateFormDataBonusType = this.updateFormDataBonusType.bind(this);
        this.onPayerChange = this.onPayerChange.bind(this);
        this.checkValid = this.checkValid.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
//        console.log(this.props);
        helper.setFormValidation('#form-job-assignment');
        this.props.jobAssignmentAction.loadCurrencies();
        this.props.jobAssignmentAction.loadStaffs();
        if(this.props.params.workId)
            this.props.jobAssignmentAction.loadWork(this.props.params.workId);
        else this.props.jobAssignmentAction.resetDataCreate();
    }

    componentWillReceiveProps(nextProps) {
        //console.log("next",nextProps);
        if(this.props.isLoadingStaffs && !nextProps.isLoadingStaffs)
            if(this.props.params.workId)
                this.props.jobAssignmentAction.loadWork(this.props.params.workId);
            else this.props.jobAssignmentAction.resetDataCreate();

    }

    componentDidUpdate(){
        helper.setFormValidation('#form-job-assignment');
    }

    updateFormData(e){
        if(!e) return;
        let feild = e.target.name;
        let value = e.target.value;
        let newdata = {...this.props.data,[feild] : value};
        this.props.jobAssignmentAction.updateFormData(newdata);
    }

    updateFormDataType(e){
        if(!e) return;
        let value = e.value;
        let newdata = {...this.props.data,type : value};
        this.props.jobAssignmentAction.updateFormData(newdata);
    }

    updateFormDataBonusType(e){
        if(!e) return;
        let newdata = {...this.props.data,currency : e};
        this.props.jobAssignmentAction.updateFormData(newdata);
    }


    checkValid(){
        let data = this.props.data;
        if ($('#form-job-assignment').valid()) {
            if(data.deadline == "0000-00-00 00:00:00"){
                helper.showErrorNotification("Vui lòng chọn ngày!");
                return false;
            }
            if(data.staffs && data.staffs.length == 0){
                helper.showErrorNotification("Vui lòng chọn ít nhất một nhân viên!");
                return false;
            }
            if(!data.payer.id){
                helper.showErrorNotification("Vui lòng chọn người chi trả!");
                return false;
            }
            return true;
        }
        return false;
    }

    submit(){
        if (this.checkValid()) {
            helper.showNotification("Đang lưu...");
            if(!this.props.params.workId)
                this.props.jobAssignmentAction.createWork(this.props.data);
            else this.props.jobAssignmentAction.editWork(this.props.data);
        }
    }

    onPayerChange(payer){
        if(!payer) return;
        let newdata = {...this.props.data, payer};
        this.props.jobAssignmentAction.updateFormData(newdata);
    }

    render() {
        let {payer} = this.props.data;
        let time = moment(this.props.data.deadline || "" , [DATETIME_FORMAT,  DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT);

        return (
            <div className="content">
                <div className="container-fluid">
                    {

                        (this.props.isLoading || this.props.isLoadingStaffs)

                            ?
                            <Loading/> :

                            <form role="form" id="form-job-assignment" onSubmit={(e) => e.preventDefault()}>
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
                                                            updateFormData={this.updateFormData}
                                                            value={this.props.data.name || ""}

                                                        /></div>
                                                    <div className="col-md-12">
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
                                                            onChange={this.updateFormDataType}
                                                            value={this.props.data.type || ""}

                                                            defaultMessage="Tuỳ chọn"
                                                            name="type"
                                                        /></div>
                                                    <div className="col-md-12">
                                                        <FormInputText
                                                            label="Chi phí"
                                                            required
                                                            type="number"
                                                            name="cost"
                                                            updateFormData={this.updateFormData}
                                                            value={this.props.data.cost || 0}

                                                        /></div>
                                                    <div className="col-md-12">
                                                        <FormInputDateTime
                                                            label="Deadline"
                                                            name="deadline"
                                                            updateFormData={this.updateFormData}

                                                            value={time.timer}
                                                            defaultDate={moment().add(1, "hours")}
                                                            id="deadline"


                                                        /></div>
                                                    <div className="col-md-8">
                                                        <FormInputText
                                                            label="Điểm cộng"
                                                            required
                                                            type="number"
                                                            name="bonus_value"
                                                            updateFormData={this.updateFormData}
                                                            value={this.props.data.bonus_value || 0}
                                                        /></div>
                                                    <div className="col-md-4">
                                                        <ReactSelect
                                                            disabled={this.props.isLoading}
                                                            options={this.props.currencies}
                                                            onChange={this.updateFormDataBonusType}
                                                            value={this.props.data.currency || ""}
                                                            defaultMessage="Đơn vị"
                                                            style={{marginTop: "20px", width: "100%"}}
                                                        /></div>
                                                    <div className="col-md-12"
                                                         style={{display: "flex", flexFlow: "row-reverse"}}>
                                                        {this.props.isSaving ?
                                                            <button disabled className="btn btn-rose  disabled"
                                                                    type="button">
                                                                <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                                            </button>
                                                            :
                                                            <button onClick={this.submit}
                                                                    className="btn btn-rose">Lưu</button>
                                                        }

                                                    </div>
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
                                                <h4 className="card-title">Người chi trả</h4>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label>
                                                            Chọn nhân viên
                                                        </label>
                                                        <Select
                                                            placeholder="Nhập tên để tìm kiếm"
                                                            style={{width: "100%"}}
                                                            value={payer}
                                                            name="payer"
                                                            multi={false}
                                                            //valueComponent={MemberReactSelectValue}
                                                            optionComponent={MemberReactSelectOption}
                                                            options={this.props.staffs}
                                                            onChange={this.onPayerChange}
                                                        />
                                                    </div>
                                                </div>
                                                <br/>
                                                <ListGroup>
                                                    <ListGroupItem
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                        }}>
                                                        <div style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            lineHeight: "30px"
                                                        }}>
                                                            <div style={{display: "flex"}}>
                                                                <Avatar size={30}
                                                                        url={helper.validateLinkImage(payer.avatar_url)}/>
                                                                {payer.id ? (payer.label ||payer.name) :  "Chưa chọn nhân viên"}
                                                            </div>
                                                            <div style={{display: "flex"}}>{
                                                                payer.id ?
                                                                    <div onClick={() => {
                                                                        return this.setState({show: true,staffId: payer.id});
                                                                    }}><i className="material-icons">info</i></div>
                                                                    :
                                                                    <div></div>
                                                            }</div>

                                                        </div>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header card-header-icon" data-background-color="rose" style={{zIndex: 0}}>
                                                <i className="material-icons">people</i>
                                            </div>

                                            <div className="card-content">
                                                <h4 className="card-title">Người thực hiện</h4>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group" hidden={this.props.isLoadingStaffs}>
                                                            <label className="label-control">Nhập tên để tìm kiếm nhân
                                                                viên</label>

                                                            <Select
                                                                name="form-field-name"
                                                                value={"Chọn nhân viên"}
                                                                options={this.props.staffs}
                                                                onChange={(e) => {
                                                                    return this.props.jobAssignmentAction.chooseStaff(e);
                                                                }}
                                                                optionRenderer={(option) => {
                                                                    return (
                                                                        <ItemReactSelect label={option.label}
                                                                                         url={helper.validateLinkImage(option.avatar_url)}/>
                                                                    );
                                                                }}
                                                                valueRenderer={(option) => {
                                                                    return (
                                                                        <ItemReactSelect label={option.label}
                                                                                         url={helper.validateLinkImage(option.avatar_url)}/>
                                                                    );
                                                                }}
                                                                placeholder="Chọn nhân viên"
                                                                disabled={this.props.isLoading || this.props.isSaving}

                                                            />
                                                        </div>
                                                    </div>
                                                    <ListStaffs staffs={this.props.data.staffs} remove={(e) => {
                                                        this.props.jobAssignmentAction.removeStaff(e);
                                                    }}/>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                    }
                </div>
                <Modal
                    show={this.state.show}
                    onHide={()=>{this.setState({show: false});}}
                    bsSize="large"
                >
                    <Modal.Header closeButton/>
                    <Modal.Body>
                        <InfoStaffContainer staffId={this.state.staffId} />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

CreateJobAssignmentContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoadingStaffs: PropTypes.bool,
    isSaving: PropTypes.bool.isRequired,
    data: PropTypes.object,
    staffs: PropTypes.array,
    currencies: PropTypes.array,
    jobAssignmentAction: PropTypes.object,
    params: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoading : state.jobAssignment.isLoading,
        isLoadingStaffs : state.jobAssignment.isLoadingStaffs,
        isSaving : state.jobAssignment.isSaving,
        data : state.jobAssignment.data,
        staffs : state.jobAssignment.staffs,
        currencies : state.jobAssignment.currencies,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        jobAssignmentAction: bindActionCreators(jobAssignmentAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobAssignmentContainer);