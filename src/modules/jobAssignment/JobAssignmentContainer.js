/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as jobAssignmentAction from '../jobAssignment/jobAssignmentAction';
import  CardWork from '../jobAssignment/CardWork';
import * as PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import * as helper from "../../helpers/helper";
import WorkInfoModal from './WorkInfoModal';
import ExtendWorkModal from './ExtendWorkModal';
import FinishWorkModal from './FinishWorkModal';
import {Link} from "react-router";
import Select from 'react-select';
import ReactSelect from 'react-select';
import {STATUS_WORK} from "../../constants/constants";
import MemberReactSelectOption from "../tasks/board/filter/MemberReactSelectOption";
import MemberReactSelectValue from "../tasks/board/filter/MemberReactSelectValue";

const workTypes=[
    {value: 'all', label: 'Tất cả',},
    {value: 'personal', label: 'Cá nhân',},
    {value: 'team', label: 'Nhóm',},
    {value: 'person_project', label: 'Dự án riêng',},
];

class JobAssignmentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.deleteWork =this.deleteWork.bind(this);
        this.changeWorkStatus =this.changeWorkStatus.bind(this);
        this.openInfoModal =this.openInfoModal.bind(this);
        this.closeInfoModal =this.closeInfoModal.bind(this);
        this.acceptWork =this.acceptWork.bind(this);
        this.doneWork =this.doneWork.bind(this);
        this.revertWork =this.revertWork.bind(this);
        this.openExtendModal =this.openExtendModal.bind(this);
        this.closeExtendModal =this.closeExtendModal.bind(this);
        this.openFinishModal =this.openFinishModal.bind(this);
        this.closeFinishModal =this.closeFinishModal.bind(this);
        this.extendWork =this.extendWork.bind(this);
        this.onWorkTypeChange =this.onWorkTypeChange.bind(this);
        this.onStaffFilterChange =this.onStaffFilterChange.bind(this);

        this.state = {
            showInfoModal: false,
            showExtendModal: false,
            showFinishModal: false,
            work: {
                staffs:[],
            },
            staffFilter: "",
            typeFilter: "all",
            staffs: [],
            selectedStaffs:[],
        }
    }

    componentWillMount() {
        this.props.jobAssignmentAction.loadWorks();
        this.props.jobAssignmentAction.loadStaffs();
    }

    componentWillReceiveProps(nextProps) {
        console.log('job',nextProps);
        if(this.props.isLoadingStaffs && !nextProps.isLoadingStaffs){
            this.setState({staffs : nextProps.staffs});
        }
    }

    deleteWork(id){
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa công việc này không?", () => {
            this.props.jobAssignmentAction.deleteWork(id, ()=>{
                return this.props.jobAssignmentAction.loadWorks();
            });
        });
    }

    changeWorkStatus(work, stt){
        helper.confirm('error', 'Hủy', "Bạn có muốn hủy công việc này không?", () => {
            this.props.jobAssignmentAction.editWork(work, stt, ()=>{
                return this.props.jobAssignmentAction.loadWorks();
            });
        });
    }

    openInfoModal(work){
        this.setState({showInfoModal: true, work:work,});
    }

    closeInfoModal(){
        this.setState({showInfoModal: false});
    }

    openExtendModal(work){
        this.setState({showExtendModal: true, work:work});
    }

    closeExtendModal(){
        this.setState({showExtendModal: false});
    }

    openFinishModal(work){
        this.setState({showFinishModal: true, work:work});
    }

    closeFinishModal(){
        this.setState({showFinishModal: false});
    }

    acceptWork(workId, staffId){
        this.props.jobAssignmentAction.changeStatusWork(workId,staffId, STATUS_WORK[1].value, ()=>{
            helper.showNotification("Đã chấp nhận công việc.");
            return this.props.jobAssignmentAction.loadWorks();
        });
    }

    doneWork(data){
        this.props.jobAssignmentAction.doneWork(this.state.work.id,this.props.user.id, data, ()=>{
            helper.showNotification("Đã hoàn thành công việc.");
            this.closeFinishModal();
            return this.props.jobAssignmentAction.loadWorks();
        });
    }

    revertWork(work){
        this.props.jobAssignmentAction.revertWork(work, "doing", this.props.jobAssignmentAction.loadWorks);
    }

    onWorkTypeChange(obj){
        this.setState({typeFilter: obj.value});
    }

    extendWork(workId, data){
        this.props.jobAssignmentAction.extendWork(workId,this.props.user.id, data, this.closeExtendModal);
    }

    onStaffFilterChange(obj){
        this.setState({ selectedStaffs: obj});
    }

    render() {
        let pending = [], doing = [], done = [], cancel = [];
        let {works} = this.props;
        let {typeFilter, selectedStaffs} =this.state;
        works = works.filter(obj => typeFilter == "all"  ? true : (obj.type == typeFilter));
        selectedStaffs.forEach( staff => {
            works = works.filter(work => checkStaff(staff, work.staffs) );
        });
        works.forEach((obj)=>{
            switch (obj.status){
                case STATUS_WORK[0].value:{
                    pending = [...pending, obj];
                    break;
                }
                case STATUS_WORK[1].value:{
                    doing = [...doing, obj];
                    break;
                }
                case STATUS_WORK[2].value:{
                    done = [...done, obj];
                    break;
                }
                case STATUS_WORK[3].value:{
                    cancel = [...cancel, obj];
                    break;
                }
            }
        });
        return (
            <div>
                <WorkInfoModal
                    show={this.state.showInfoModal}
                    onHide={this.closeInfoModal}
                    data={this.state.work}
                />
                <ExtendWorkModal
                    show={this.state.showExtendModal}
                    onHide={this.closeExtendModal}
                    data={this.state.work}
                    submit={this.extendWork}

                />
                <FinishWorkModal
                    show={this.state.showFinishModal}
                    onHide={this.closeFinishModal}
                    data={this.state.work}
                    submit={this.doneWork}
                />
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", paddingLeft: "5px",}}>
                    <div className="filter-container" style={{alignItems:"center"}}>
                        <div className="select-container">
                            <Select
                                placeholder="Chọn nhân viên"
                                style={{minWidth: 200, maxWidth: 400}}
                                value={this.state.selectedStaffs}
                                name="form-field-name"
                                multi={true}
                                valueComponent={MemberReactSelectValue}
                                optionComponent={MemberReactSelectOption}
                                options={this.state.staffs}
                                onChange={this.onStaffFilterChange}
                                disabled={this.props.isLoading || this.props.isLoadingStaffs}
                            />
                        </div>
                        <div className="select-container">
                            <ReactSelect
                                disabled={this.props.isLoading}
                                options={workTypes}
                                onChange={this.onWorkTypeChange}
                                value={this.state.typeFilter}
                                defaultMessage="Tuỳ chọn"
                                name="type"
                                style={{minWidth: 150, maxWidth: 300}}
                            />
                        </div>

                    </div>
                    <div className="filter-item">
                        <Link to="hr/job-assignment/create" className="btn btn-rose">
                            <i className="material-icons keetool-card">add</i>
                            Thêm công việc
                        </Link>
                    </div>
                </div>
                <div className="board-canvas">

                    <div className="board-container">
                        {/*1*/}
                        <div  data-order="0" className="card card-container keetool-board">
                            <div className="board-title undraggable">
                                <span style={{fontWeight: 600}}>Đợi chấp nhận</span>
                            </div>
                            <div className="board">
                                {this.props.isLoading ?
                                    <Loading/>
                                    :
                                    pending.map((work)=>{
                                        return (
                                            <CardWork
                                                work={work}
                                                delete={this.deleteWork}
                                                change={this.changeWorkStatus}
                                                status="pending"
                                                openInfoModal={()=>{return this.openInfoModal(work);}}
                                                user={this.props.user}
                                                acceptWork={this.acceptWork}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                        {/*1*/}
                        {/*2*/}
                        <div  data-order="1" className="card card-container keetool-board">
                            <div className="board-title undraggable">
                                <span style={{fontWeight: 600}}>Đang làm</span>
                            </div>
                            <div className="board">
                                {this.props.isLoading ?
                                    <Loading/>
                                    :
                                    doing.map((work)=>{
                                        return (
                                            <CardWork
                                                work={work}
                                                delete={this.deleteWork}
                                                status="doing"
                                                openInfoModal={()=>{return this.openInfoModal(work);}}
                                                user={this.props.user}
                                                doneWork={this.doneWork}
                                                openExtendModal={()=>{return this.openExtendModal(work);}}
                                                openFinishModal={()=>{return this.openFinishModal(work);}}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    {/*2*/}
                    {/*3*/}
                        <div  data-order="2" className="card card-container keetool-board">
                            <div className="board-title undraggable">
                                <span style={{fontWeight: 600}}>Hoàn thành</span>
                            </div>
                            <div className="board">
                                {this.props.isLoading ?
                                    <Loading/>
                                    :
                                    done.map((work)=>{
                                        return (
                                            <CardWork
                                                work={work}
                                                delete={this.deleteWork}
                                                status="done"
                                                openInfoModal={()=>{return this.openInfoModal(work);}}
                                                user={this.props.user}
                                                revertWork={this.revertWork}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                        {/*3*/}
                        {/*4*/}

                        <div  data-order="3" className="card card-container keetool-board">
                            <div className="board-title undraggable">
                                <span style={{fontWeight: 600}}>Hủy</span>
                            </div>
                            <div className="board">
                                {this.props.isLoading ?
                                    <Loading/>
                                    :
                                    cancel.map((work)=>{
                                        return (
                                            <CardWork
                                                work={work}
                                                delete={this.deleteWork}
                                                status="cancel"
                                                openInfoModal={()=>{return this.openInfoModal(work);}}
                                                user={this.props.user}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>

                        {/*4*/}
                    </div>
                </div>
            </div>
        );
    }
}

JobAssignmentContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoadingStaffs: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    works: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    jobAssignmentAction: PropTypes.object.isRequired,
    staffs: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        isLoading : state.jobAssignment.isLoading,
        isLoadingStaffs : state.jobAssignment.isLoadingStaffs,
        isSaving : state.jobAssignment.isSaving,
        works : state.jobAssignment.works,
        user: state.login.user,
        staffs : state.jobAssignment.staffs,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        jobAssignmentAction: bindActionCreators(jobAssignmentAction, dispatch),
    };
}

function checkStaff(staff, arr) {
    let check = false;
    arr.forEach(item => {
       if(staff.id == item.id)
           check = true;
    });
    return check;
}

export default connect(mapStateToProps, mapDispatchToProps)(JobAssignmentContainer);