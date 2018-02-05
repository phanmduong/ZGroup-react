/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as jobAssignmentAction from '../jobAssignment/jobAssignmentAction';
import * as PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import {Modal} from 'react-bootstrap';
import InfoStaffContainer from "../../modules/manageStaff/InfoStaffContainer";
import Avatar from "../../components/common/Avatar";
import * as helper from "../../helpers/helper";
import Slider from "./Slider";

class RateWorkModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            staffId: null,
            rateData:{
                staffs:[],
            },
            bonus: 0,
            currency: "",
        };
        this.updateSlider = this.updateSlider.bind(this);
        this.commit = this.commit.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    // componentWillMount() {
    //
    // }
    //
    componentWillReceiveProps(nextProps) {
        if(this.props.workId != nextProps.workId || (!this.props.show && nextProps.show)){
            this.props.jobAssignmentAction.loadRateData(nextProps.workId);
        }
        if(this.props.isLoadingRateData && !nextProps.isLoadingRateData){
            this.setState({
                rateData: nextProps.rateData,
                bonus: nextProps.rateData.bonus_value,
                currency: nextProps.rateData.currency.name,
            });
        }
    }

    updateSlider(e, index){
        let newState = [...this.state.rateData.staffs];
        let newItem = {...newState[index], penalty:  e};
        newState = [...newState.slice(0, index), newItem,...newState.slice(index+1, newState.length)];
        this.setState({
            rateData: {...this.state.rateData, staffs: newState},
        });
    }

    commit(){
        this.props.jobAssignmentAction.rateWork(
            this.props.workId,
            this.state.rateData.staffs.map((itm)=>{
                return {
                    id: itm.id,
                    value: itm.penalty*this.state.bonus,
                };
            }),
            ()=>{
                this.props.onHide();
                this.props.jobAssignmentAction.loadWorks();
                helper.showNotification("Lưu thành công");
            }
        );
    }

    onHide(){
        helper.confirm("warning", "Thoát", "Bạn có chắc muốn hủy?", ()=>{
            return this.props.onHide();
        });
    }

    render() {
        let {rateData, bonus , currency} = this.state;
        return (
            <Modal
                show={this.props.show}
                onHide={this.onHide}
                bsSize="large"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đánh giá công việc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form role="form" id="form-extend-work" onSubmit={(e) => e.preventDefault()}>
                        {
                            this.props.isLoadingRateData ?
                                <Loading/> :
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="text-rose">
                                        <tr>
                                            <th>STT</th>
                                            <th style={{textAlign: "center", width: "20%"}}>Họ Tên</th>
                                            <th/>
                                            <th>Chi phí</th>
                                            <th>Đánh giá</th>
                                            <th>Báo cáo</th>
                                            <th style={{width: "250px"}}>Đánh giá</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            rateData.staffs.length > 0 ?

                                                rateData.staffs.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>

                                                                {/*<div style={{display: "flex", justifyContent: "space-between",lineHeight: "30px"}}>*/}

                                                                {/*</div>*/}
                                                                <div style={{display: "flex"}}>
                                                                    <Avatar size={30} url={helper.validateLinkImage(item.avatar_url)}/>
                                                                    {item.name || "Chưa chọn nhân viên"}
                                                                </div>

                                                            </td>
                                                            <td><div style={{display: "flex"}}>
                                                                <a data-toggle="tooltip" title="Xem thông tin"
                                                                   type="button"
                                                                   onClick={()=>{return this.setState({show: true,staffId: item.id});}}
                                                                   rel="tooltip"
                                                                >
                                                                    <i className="material-icons">info</i>
                                                                </a>
                                                            </div></td>
                                                            <td>{item.cost || 0}</td>
                                                            <td>{item.rate_star || "0"}/5</td>
                                                            <td>{item.rate_description || ""}</td>
                                                            <td><Slider
                                                                min={-200} step={5} max={100}
                                                                value={item.penalty}
                                                                onChange={(e)=>{return this.updateSlider(e, index)}}
                                                                name={"slider-"+ index}
                                                                label={`${Math.round(item.penalty*bonus/100) + bonus} ${currency}`}
                                                                disabled={this.props.isSaving}
                                                            /></td>

                                                        </tr>
                                                    );
                                                })
                                                :
                                                <tr>
                                                    <td colSpan={4}><h5>Chưa có dữ liệu</h5></td>
                                                </tr>
                                        }

                                        </tbody>
                                    </table>
                                    <div>

                                        {this.props.isSaving  ?
                                            <button style={{float: 'right', width: "35%"}} className="btn btn-rose disabled" type="button">
                                                <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                            </button>
                                            :


                                            <button
                                                disabled={!(rateData.staffs.length > 0) ||this.props.isLoadingRateData}
                                                style={{float: 'right', width: "20%"}}
                                                className="btn btn-fill btn-rose "
                                                type="button"
                                                onClick={this.commit}
                                            > Lưu </button>

                                        }</div>
                                </div>
                        }
                    </form>
                </Modal.Body>
                <Modal
                    show={this.state.show}
                    onHide={()=>{this.setState({show: false});}}
                    bsSize="large"
                >
                    <Modal.Header closeButton/>
                    <Modal.Body>
                        <InfoStaffContainer staffId={this.state.staffId} type=""/>
                    </Modal.Body>
                </Modal>
            </Modal>

        );
    }
}

RateWorkModal.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isLoadingRateData: PropTypes.bool,
    data: PropTypes.object,
    rateData: PropTypes.object,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    submit: PropTypes.func,
    workId: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        isLoading : state.jobAssignment.isLoading,
        isLoadingRateData : state.jobAssignment.isLoadingRateData,
        isSaving : state.jobAssignment.isSaving,
        rateData : state.jobAssignment.rateData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        jobAssignmentAction: bindActionCreators(jobAssignmentAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RateWorkModal);