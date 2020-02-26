import React from 'react';
import PropTypes from 'prop-types';
import {avatarEmpty, isEmptyInput,} from "../../helpers/helper";
import {NO_AVATAR} from "../../constants/env";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import Star from "../../components/common/Star";
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import {Modal} from "react-bootstrap";
import EditLead from "./EditLead";
import Checkbox from "../../components/common/Checkbox";
import TooltipButton from "../../components/common/TooltipButton";
import {openModalRegisterDetail} from "../globalModal/globalModalActions";
import StatusesOverlay from "../infoStudent/overlays/StatusesOverlay";
import SourceOverlay from "../infoStudent/overlays/SourceOverlay";
import PicOverlay from "../infoStudent/overlays/PicOverlay";
import CreateRegisterOverlay from "../infoStudent/overlays/CreateRegisterOverlay";
import * as studentActions from "../infoStudent/studentActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as leadActions from "./leadActions";


//import TooltipButton from "../../components/common/TooltipButton";

class ListLead extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isOpenModalEdit: false,
            lead: {},
        };

    }

    openEditModal = (lead) =>{
        this.setState({
            isOpenModalEdit: true,
            lead: lead
        });
    }


    closeEditModal=()=> {
        this.setState({
            isOpenModalEdit: false
        });
    }

    isCheckedLead = (leadId) => {
        if (this.props.selectedLeads) {
            const leads = this.props.selectedLeads.filter((lead) => lead.id == leadId && lead.checked);
            if (leads && leads.length > 0) {
                return true;
            }
            return false;
        }
        return false;
    }


    render() {
        return (
            <div>


                {this.props.isLoading ?
                    <Loading/>
                    :
                    <div className="table-responsive table-split">
                        <table className="table">
                            <thead className="text-rose">
                            <tr>
                                {this.props.isDistribution && <th/>}
                                <th/>
                                <th>Họ tên</th>
                                <th>Quan tâm</th>
                                <th>Nguồn</th>
                                <th>Trạng thái</th>
                                <th>Đã đóng tiền</th>
                                <th>Đánh giá</th>
                                <th>Ghi chú</th>

                                {
                                    !this.props.showSelectedLead && <th>Thời gian</th>
                                }
                                {
                                    this.props.showSelectedLead ?
                                        <th>
                                            <ButtonGroupAction
                                                disabledEdit
                                                disabledDelete
                                            >
                                                {this.props.deleteAllSelected && <a
                                                    data-toggle="tooltip"
                                                    title="Bỏ chọn tất cả lead"
                                                    onClick={() => this.props.deleteAllSelected()}
                                                    type="button"
                                                    rel="tooltip"
                                                >
                                                    <i className="material-icons">highlight_off</i>
                                                </a>}
                                            </ButtonGroupAction>

                                        </th>
                                        :
                                        <th/>

                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.leads
                                    // .filter(l=>this.state.currentPicFilter.operator(l))
                                    .map((lead) => {
                                    const avatar = !avatarEmpty(lead.avatar_url) ?
                                        lead.avatar_url : NO_AVATAR;
                                    let rowClassName = '';
                                    if (lead.staff_id) rowClassName = 'success';
                                    return (
                                        <tr key={lead.id} className={rowClassName}
                                            // style={{backgroundColor: lead.status}}
                                        >
                                            {
                                                this.props.isDistribution &&
                                                <td>
                                                    <Checkbox
                                                        checked={this.isCheckedLead(lead.id)}
                                                        onChange={(event) => {
                                                            this.props.changeStatusLead(lead, event.target.checked);
                                                        }}
                                                    />
                                                </td>
                                            }
                                            <td>
                                                <div className="avatar-list-staff"
                                                     style={{
                                                         background: 'url(' + avatar + ') center center / cover',
                                                         display: 'inline-block'
                                                     }}
                                                />
                                            </td>
                                            <td>
                                                <div>
                                                    <div className="flex flex-align-items-center">
                                                        <a className="text-name-student-register"
                                                           onClick={() => openModalRegisterDetail(`/sales/info-student/${lead.id}`)}>
                                                            {lead.name}
                                                            {!lead.staff_id &&
                                                            <span className="btn-danger btn-xs margin-left-5"
                                                                  style={{fontSize: 10, padding: '3px'}}>MỚI</span>}
                                                        </a>

                                                        {/*<div>{lead.email}</div>*/}
                                                    </div>
                                                    <div>{lead.phone}</div>
                                                    {!isEmptyInput(lead.city) && <div>TP. {lead.city}</div>}
                                                </div>
                                            </td>
                                            <td>{lead.interest}</td>
                                            <td>
                                                {lead.campaign ? (
                                                    <button className="btn btn-xs btn-main width-100"
                                                            style={{
                                                                backgroundColor: "#" + lead.campaign.color
                                                            }}>
                                                        {lead.campaign.name}
                                                        <div className="ripple-container"/>
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-xs btn-main no-data width-100">
                                                        No Campaign
                                                        <div className="ripple-container"/>
                                                    </button>
                                                )}
                                                {/*<MarketingCampaignOverlay*/}
                                                {/*    student={lead}*/}
                                                {/*    className="btn btn-xs source-value  btn-main width-100"*/}
                                                {/*/>*/}
                                                {/*{lead.campaign && <div className="btn btn-xs btn-main width-100">*/}
                                                {/*    {lead.campaign}</div>}*/}
                                                {/*{*/}

                                                {/*    !this.props.showSelectedLead &&*/}
                                                {/*    lead.carer &&*/}
                                                {/*    <div className="btn btn-xs btn-main width-100"*/}
                                                {/*         style={{backgroundColor: '#' + lead.carer.color}}*/}
                                                {/*    >*/}
                                                {/*        {getShortName(lead.carer.name)}*/}
                                                {/*        <div className="ripple-container"/>*/}
                                                {/*    </div>*/}


                                                {/*}*/}
                                                <SourceOverlay
                                                    style={{padding: '4px 15px'}}
                                                    className="btn-xs width-100 source-value margin-bottom-10"
                                                    student={lead}
                                                />
                                                <PicOverlay
                                                    style={{padding: '4px 15px'}}
                                                    student={lead}
                                                    className="btn-xs width-100 source-value margin-bottom-10"

                                                />
                                            </td>

                                            <td>
                                                <StatusesOverlay
                                                    style={{padding: '4px 15px'}}
                                                    data={lead.lead_status}
                                                    refId={lead.id}
                                                    statusRef="leads"
                                                    className="btn-xs status-overlay  margin-bottom-10"
                                                />
                                            </td>
                                            <td>
                                                <div className="flex flex-row margin-bottom-10">
                                                    {
                                                        lead.courses && lead.courses.map((course, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <TooltipButton
                                                                        placement="top"
                                                                        text={course.name}
                                                                    >
                                                                        <div className="avatar-list-staff"
                                                                             style={{
                                                                                 background: 'url(' + course.icon_url + ') center center / cover',
                                                                                 display: 'inline-block',
                                                                                 borderColor: 'white',
                                                                                 borderStyle: 'solid',
                                                                                 marginLeft: '-10px'
                                                                             }}
                                                                        />
                                                                    </TooltipButton>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <Star
                                                    maxStar={5}
                                                    value={lead.rate}
                                                    disable
                                                />
                                            </td>
                                            <td>{lead.note}</td>

                                            {
                                                !this.props.showSelectedLead && <td>{lead.created_at}</td>
                                            }
                                            <td>

                                                <ButtonGroupAction
                                                    disabledDelete
                                                    edit={() => this.openEditModal(lead)}
                                                    // delete={() => this.deleteLead(lead)}
                                                    disabledEdit={this.props.showSelectedLead}
                                                >
                                                    {this.props.removeLead && <a
                                                        data-toggle="tooltip"
                                                        title="Xóa lead"
                                                        onClick={() => this.props.removeLead(lead)}
                                                        type="button"
                                                        rel="tooltip"
                                                    >
                                                        <i className="material-icons">delete</i>
                                                    </a>}
                                                    {!this.props.showSelectedLead && <CreateRegisterOverlay
                                                        onShow={() => this.props.studentActions.setInfoStudent(lead)}
                                                        className="register-lead-overlay cursor-pointer"
                                                        direction="right"
                                                    ><i className="material-icons">add</i>
                                                    </CreateRegisterOverlay>}

                                                </ButtonGroupAction>

                                                {this.props.showSelectedLead &&
                                                <ButtonGroupAction
                                                    disabledDelete={true}
                                                    // delete={() => this.props.deleteLeadSelected(lead)}
                                                    edit={() => this.openEditModal(lead)}
                                                    disabledEdit={this.props.showSelectedLead}
                                                >
                                                    {this.props.deleteLeadSelected && <a
                                                        data-toggle="tooltip"
                                                        title="Bỏ chọn lead"
                                                        onClick={() => this.props.deleteLeadSelected(lead)}
                                                        type="button"
                                                        rel="tooltip"
                                                    >
                                                        <i className="material-icons">highlight_off</i>
                                                    </a>}

                                                </ButtonGroupAction>
                                                }
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                }

                {
                    !this.props.showSelectedLead &&
                    <Pagination
                        currentPage={this.props.currentPage}
                        totalPages={this.props.totalPages}
                        loadDataPage={this.props.loadData}
                    />
                }
                {this.props.isDistribution && <div style={{height: 125}}/>}
                <Modal
                    show={this.state.isOpenModalEdit}
                    onHide={this.closeEditModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h4 className="card-title">Sửa thông tin lead</h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.isOpenModalEdit && <EditLead
                            lead={this.state.lead}
                            closeModal={this.closeEditModal}
                        />}

                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

ListLead.propTypes = {
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    loadData: PropTypes.func,
    leads: PropTypes.array.isRequired,
    selectedLeads: PropTypes.array,
    deleteLeadSelected: PropTypes.func,
    changeStatusLead: PropTypes.func,
    removeLead: PropTypes.func,
    deleteAllSelected: PropTypes.func,
    showSelectedLead: PropTypes.bool,
    isLoading: PropTypes.bool,
    isDistribution: PropTypes.bool,
};


function mapStateToProps(state) {
    return {
        student: state.infoStudent.student,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch),
        leadActions: bindActionCreators(leadActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListLead);