import React from 'react';
import PropTypes from 'prop-types';
import {isEmptyInput,} from "../../helpers/helper";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import {Modal, Overlay} from "react-bootstrap";
import EditLead from "./EditLead";
import Checkbox from "../../components/common/Checkbox";
import TooltipButton from "../../components/common/TooltipButton";
import {openModalRegisterDetail} from "../globalModal/globalModalActions";
import StatusesOverlay from "../infoStudent/overlays/StatusesOverlay";
import SourceOverlay from "../infoStudent/overlays/SourceOverlay";
import PicOverlay from "../infoStudent/overlays/PicOverlay";
import * as studentActions from "../infoStudent/studentActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as leadActions from "./leadActions";
import * as ReactDOM from "react-dom";
import MarketingCampaignOverlay from "../infoStudent/overlays/MarketingCampaignOverlay";
import MarketingCampaignRegisterStore from "../registerStudentsV3/store/MarketingCampaignRegisterStore";

//import TooltipButton from "../../components/common/TooltipButton";
const TAGS = [
    {
        label: "First",
        value: "first_lead"
    },
    {
        label: "Old",
        value: "old_lead"
    },
    {
        label: "New",
        value: "new_lead"
    },
];

class ListLead extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isOpenModalEdit: false,
            lead: {}, showOverlay: [],

        };
        this.campaignStore = new MarketingCampaignRegisterStore();

    }

    openEditModal = (lead) => {
        this.setState({
            isOpenModalEdit: true,
            lead: lead
        });
    };


    closeEditModal = () => {
        this.setState({
            isOpenModalEdit: false
        });
    };

    isCheckedLead = (leadId) => {
        if (this.props.selectedLeads) {
            const leads = this.props.selectedLeads.filter((lead) => lead.id == leadId && lead.checked);
            if (leads && leads.length > 0) {
                return true;
            }
            return false;
        }
        return false;
    };
    toggleOverlay = (key) => {
        let showOverlay = [...this.props.leads].map(() => false);
        showOverlay[key] = true;
        this.setState({showOverlay});
    };
    closeOverlay = (key) => {
        let showOverlay = this.state.showOverlay;
        showOverlay[key] = false;
        this.setState({showOverlay});
    };

    render() {
        return (
            <div>


                {this.props.isLoading ?
                    <Loading/>
                    :
                    <div className="table-sticky-head table-split" radius="five">
                        <table className="table" style={{zIndex: 0}}>
                            <thead className="text-rose">
                            <tr>
                                {this.props.isDistribution && <th/>}
                                {/*<th/>*/}
                                <th>Sao</th>
                                <th>Họ tên</th>
                                <th>P.I.C</th>
                                <th>Nguồn</th>
                                <th>Chiến dịch</th>
                                <th>Trạng thái</th>
                                {/*<th>Đã đóng tiền</th>*/}

                                <th>Ghi chú</th>
                                <th>Ghi chú cuội gọi</th>
                                <th>Quan tâm</th>
                                {!this.props.showSelectedLead && <th>Ngày nhập</th>}
                                {!this.props.showSelectedLead && <th>Ngày tạo</th>}
                                {!this.props.last_time_interact && <th>Tương tác</th>}
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.leads
                                    // .filter(l=>this.state.currentPicFilter.operator(l))
                                    .map((lead) => {
                                        // const avatar = !avatarEmpty(lead.avatar_url) ? lead.avatar_url : NO_AVATAR;
                                        let rowClassName = '';
                                        if (lead.staff_id) rowClassName = 'success';
                                        let leadTagDetail =
                                            `Đăng kí cuối: ${lead.last_time_register || 'Chưa có'} - Lần gọi cuối: ${lead.last_time_cal || 'Chưa có'}`;
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
                                                {/*<td>*/}
                                                {/*    <div className="avatar-list-staff"*/}
                                                {/*         style={{*/}
                                                {/*             background: 'url(' + avatar + ') center center / cover',*/}
                                                {/*             display: 'inline-block'*/}
                                                {/*         }}*/}
                                                {/*    />*/}
                                                {/*</td>*/}
                                                <td>
                                                    <div onClick={() => this.openEditModal(lead)}
                                                         className="btn btn-xs btn-icon btn-warning">
                                                        {lead.rate}&nbsp;<span className="material-icons">star</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <div className="flex flex-align-items-center">
                                                            <a className="text-name-student-register"
                                                               onClick={() => openModalRegisterDetail(`/sales/info-student/${lead.id}`)}>
                                                                {lead.name}
                                                                <TooltipButton text={leadTagDetail} placement="top">
                                                                    <span className="btn-danger btn-xs margin-left-5"
                                                                          style={{
                                                                              fontSize: 10,
                                                                              padding: '3px'
                                                                          }}>{TAGS.filter(item => item.value == lead.lead_tag)[0].label.toUpperCase()}</span>
                                                                </TooltipButton>
                                                            </a>


                                                        </div>
                                                        {/*<div>{lead.email}</div>*/}
                                                        <div>{lead.phone}</div>
                                                        {!isEmptyInput(lead.city) && <div>TP. {lead.city}</div>}
                                                    </div>
                                                </td>
                                                <td>
                                                    <PicOverlay
                                                        styleButton={{padding: '4px 15px', whiteSpace: 'nowrap'}}
                                                        student={lead}
                                                        disabled={this.props.showSelectedLead}
                                                        className="btn-xs width-100 source-value none-padding"
                                                    />
                                                </td>
                                                <td>
                                                    <SourceOverlay
                                                        styleButton={{padding: '4px 15px', whiteSpace: 'nowrap'}}
                                                        className="btn-xs width-100 source-value none-padding"
                                                        disabled={this.props.showSelectedLead}
                                                        student={lead}
                                                    />
                                                </td>
                                                <td>
                                                    {/*{lead.campaign ? (*/}
                                                    {/*    <button className="btn btn-xs bold none-margin width-100"*/}
                                                    {/*            style={{*/}
                                                    {/*                backgroundColor: "#" + lead.campaign.color*/}
                                                    {/*            }}>*/}
                                                    {/*        {lead.campaign.name}*/}
                                                    {/*    </button>*/}
                                                    {/*) : (*/}
                                                    {/*    <button className="btn btn-xs bold none-margin width-100">*/}
                                                    {/*        No Campaign*/}
                                                    {/*    </button>*/}
                                                    {/*)}*/}
                                                    <MarketingCampaignOverlay
                                                        student={lead}
                                                        updateInfoStudent={this.props.leadActions.updateLeadInList}
                                                        className="btn btn-xs source-value width-100"
                                                        store={this.campaignStore}
                                                    />
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
                                                </td>

                                                <td>
                                                    <StatusesOverlay
                                                        styleButton={{padding: '4px 15px'}}
                                                        data={lead.lead_status}
                                                        refId={lead.id}
                                                        disabled={this.props.showSelectedLead}
                                                        statusRef="leads"
                                                        className="btn-xs status-overlay none-padding"
                                                    />
                                                </td>
                                                {/*<td>*/}
                                                {/*    <div className="flex flex-row margin-bottom-10">*/}
                                                {/*        {*/}
                                                {/*            lead.courses && lead.courses.map((course, lead.id) => {*/}
                                                {/*                return (*/}
                                                {/*                    <div key={lead.id}>*/}
                                                {/*                        <TooltipButton*/}
                                                {/*                            placement="top"*/}
                                                {/*                            text={course.name}*/}
                                                {/*                        >*/}
                                                {/*                            <div className="avatar-list-staff"*/}
                                                {/*                                 style={{*/}
                                                {/*                                     background: 'url(' + course.icon_url + ') center center / cover',*/}
                                                {/*                                     display: 'inline-block',*/}
                                                {/*                                     borderColor: 'white',*/}
                                                {/*                                     borderStyle: 'solid',*/}
                                                {/*                                     marginLeft: '-10px'*/}
                                                {/*                                 }}*/}
                                                {/*                            />*/}
                                                {/*                        </TooltipButton>*/}
                                                {/*                    </div>*/}
                                                {/*                );*/}
                                                {/*            })*/}
                                                {/*        }*/}
                                                {/*    </div>*/}
                                                {/*</td>*/}

                                                <td onClick={() => this.openEditModal(lead)}>
                                                    {!isEmptyInput(lead.note) &&
                                                    <div className="">
                                                        {lead.note}
                                                    </div>
                                                    }
                                                </td>
                                                <td onClick={() => this.openEditModal(lead)}>
                                                    {!isEmptyInput(lead.notes) && lead.notes.length > 0 && lead.notes.map((note, key) => {
                                                        if (!isEmptyInput(note))
                                                            return (
                                                                <div className="" key={key}>
                                                                    {note}
                                                                </div>);
                                                    })}
                                                </td>
                                                <td onClick={() => this.openEditModal(lead)}>{lead.interest}</td>

                                                {!this.props.showSelectedLead && <td>{lead.imported_at}</td>}
                                                {!this.props.showSelectedLead && <td>{lead.created_at}</td>}
                                                {!this.props.showSelectedLead && <td>{lead.last_time_interact}</td>}
                                                <td>
                                                    {!this.props.showSelectedLead && <div style={{position: "relative"}}
                                                                                          className="cursor-pointer"
                                                                                          mask="table-btn-action">
                                                        <div ref={'target' + lead.id}
                                                             onClick={() => this.toggleOverlay(lead.id)}
                                                             className="flex flex-justify-content-center cursor-pointer">
                                                            <i className="material-icons">more_horiz</i>
                                                        </div>
                                                        <Overlay
                                                            rootClose={true}
                                                            show={this.state.showOverlay[lead.id]}
                                                            onHide={() => this.closeOverlay(lead.id)}
                                                            placement="bottom"
                                                            container={() => ReactDOM.findDOMNode(this.refs['target' + lead.id]).parentElement}
                                                            target={() => ReactDOM.findDOMNode(this.refs['target' + lead.id])}>
                                                            <div className="kt-overlay overlay-container"
                                                                 mask="table-btn-action" style={{
                                                                width: 150,
                                                                marginTop: 10,
                                                                left: -115,
                                                            }} onClick={() => this.closeOverlay(lead.id)}>
                                                                <button type="button"
                                                                        className="btn btn-white width-100"
                                                                        onClick={() => this.openEditModal(lead)}>
                                                                    Sửa thông tin
                                                                </button>
                                                                {/*{!this.props.showSelectedLead && <CreateRegisterOverlay*/}
                                                                {/*    // onShow={() => {*/}
                                                                {/*    //     let student = {*/}
                                                                {/*    //         ...lead,*/}
                                                                {/*    //         dob: lead.dob ? moment(lead.dob, DATE_VN_FORMAT).format(DATE_FORMAT_SQL) : ''*/}
                                                                {/*    //     };*/}
                                                                {/*    //     console.log('setInfoStudent',student);*/}
                                                                {/*    //     this.props.studentActions.setInfoStudent(student);*/}
                                                                {/*    // }}*/}
                                                                {/*    studentData={{*/}
                                                                {/*        ...lead,*/}
                                                                {/*        dob: lead.dob ? moment(lead.dob, DATE_VN_FORMAT).format(DATE_FORMAT_SQL) : ''*/}
                                                                {/*    }}*/}
                                                                {/*    className="register-lead-overlay cursor-pointer"*/}
                                                                {/*    direction="right"*/}
                                                                {/*    children={<button type="button"*/}
                                                                {/*                      className="btn btn-white width-100">*/}
                                                                {/*        Tạo đăng kí (Deal)*/}
                                                                {/*    </button>}*/}
                                                                {/*/>}*/}
                                                                {this.props.removeLead && <button type="button"
                                                                                                  className="btn btn-white width-100"
                                                                                                  onClick={() => this.props.removeLead(lead)}>
                                                                    Xóa
                                                                </button>}

                                                            </div>
                                                        </Overlay>
                                                    </div>}

                                                    {this.props.showSelectedLead &&
                                                    <ButtonGroupAction
                                                        disabledDelete={true}
                                                        // delete={() => this.props.deleteLeadSelected(lead)}
                                                        edit={() => this.openEditModal(lead)}
                                                        disabledEdit={this.props.showSelectedLead}
                                                    >
                                                        {this.props.deleteLeadSelected && !this.props.isAll && <a
                                                            data-toggle="tooltip"
                                                            title="Bỏ chọn lead"
                                                            onClick={() => this.props.deleteLeadSelected(lead)}
                                                            type="button"
                                                            rel="tooltip"
                                                        >
                                                            <i className="material-icons">highlight_off</i>
                                                        </a>}

                                                    </ButtonGroupAction>}
                                                    {/*<ButtonGroupAction*/}
                                                    {/*    disabledDelete*/}
                                                    {/*    edit={() => this.openEditModal(lead)}*/}
                                                    {/*    // delete={() => this.deleteLead(lead)}*/}
                                                    {/*    disabledEdit={this.props.showSelectedLead}*/}
                                                    {/*>*/}
                                                    {/*    {this.props.removeLead && <a*/}
                                                    {/*        data-toggle="tooltip"*/}
                                                    {/*        title="Xóa lead"*/}
                                                    {/*        onClick={() => this.props.removeLead(lead)}*/}
                                                    {/*        type="button"*/}
                                                    {/*        rel="tooltip"*/}
                                                    {/*    >*/}
                                                    {/*        <i className="material-icons">delete</i>*/}
                                                    {/*    </a>}*/}
                                                    {/*    {!this.props.showSelectedLead && <CreateRegisterOverlay*/}
                                                    {/*        onShow={() => {*/}
                                                    {/*            let student = {*/}
                                                    {/*                ...lead,*/}
                                                    {/*                dob: lead.dob ? moment(lead.dob, DATE_VN_FORMAT).format(DATE_FORMAT_SQL) : ''*/}
                                                    {/*            };*/}
                                                    {/*            this.props.studentActions.setInfoStudent(student);*/}
                                                    {/*        }}*/}
                                                    {/*        className="register-lead-overlay cursor-pointer"*/}
                                                    {/*        direction="right"*/}
                                                    {/*    ><i className="material-icons">add</i>*/}
                                                    {/*    </CreateRegisterOverlay>}*/}

                                                    {/*</ButtonGroupAction>*/}

                                                </td>
                                            </tr>
                                        );
                                    })
                            }
                            {this.props.showSelectedLead && this.props.isAll && <tr className="success">
                                <td/>
                                <td>+{this.props.selectedLeadsCount - this.props.leads.length} Lead khác</td>
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                            </tr>}
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
    // deleteAllSelected: PropTypes.func,
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