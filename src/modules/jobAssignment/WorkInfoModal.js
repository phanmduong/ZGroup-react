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
import * as helper from "../../helpers/helper";
import {ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import Avatar from "../../components/common/Avatar";
import InfoStaffContainer from "../../modules/manageStaff/InfoStaffContainer";

const types = [
    {value: 'personal', label: 'Cá nhân',},
    {value: 'team', label: 'Nhóm',},
    {value: 'person_project', label: 'Dự án riêng',},
];

class WorkInfoModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            staffId: null,
        };
    }

    render() {
        let {data} = this.props;
        let {payer} = data;
        let time = moment(data.deadline || "" , [DATETIME_FORMAT,  DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT);
        return (
            <div>
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
                                                                value={data.name || ""}
                                                                disabled
                                                            /></div>
                                                        <div className="col-md-6">
                                                            <label className="">
                                                                Loại
                                                            </label>
                                                            {types.map((obj) => {
                                                                if (data && obj.value == data.type)
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
                                                                value={data.cost || 0}
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
                                                                name="deadline"
                                                            /></div>
                                                        <div className="col-md-6">
                                                            <label className="">
                                                                Thưởng
                                                            </label>
                                                            <div>{data.bonus_value +" - " + (data.currency ? (data.currency.name || "") : "")}</div>
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
                                                                        <div/>
                                                                }</div>

                                                            </div>
                                                        </ListGroupItem>
                                                    </ListGroup>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">people</i>
                                                </div>

                                                <div className="card-content">
                                                    <h4 className="card-title">Người thực hiện</h4>
                                                    <div className="row">
                                                        <ListStaffs
                                                            staffs={data.staffs || []}
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