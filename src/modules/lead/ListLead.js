import React from 'react';
import PropTypes from 'prop-types';
import {
    avatarEmpty, getShortName,
    //getShortName
} from "../../helpers/helper";
import {
    NO_AVATAR
} from "../../constants/env";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import Star from "../../components/common/Star";
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import {
    Modal
} from "react-bootstrap";
import EditLead from "./EditLead";
import Checkbox from "../../components/common/Checkbox";
import TooltipButton from "../../components/common/TooltipButton";
import {openModalRegisterDetail} from "../globalModal/globalModalActions";

//import TooltipButton from "../../components/common/TooltipButton";

class ListLead extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpenModalEdit: false,
            lead: {}
        };
        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
    }

    openEditModal(lead) {
        this.setState({
            isOpenModalEdit: true,
            lead: lead
        });
    }

    closeEditModal() {
        this.setState({
            isOpenModalEdit: false
        });
    }

    isCheckedLead(leadId) {
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
                                <th>Ngày sinh</th>
                                <th>Nguồn</th>
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
                                                delete={this.props.deleteAllSelected}
                                            />
                                        </th>
                                        :
                                        <th/>

                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.leads.map((lead) => {
                                    const avatar = !avatarEmpty(lead.avatar_url) ?
                                        lead.avatar_url : NO_AVATAR;
                                    return (
                                        <tr key={lead.id} style={{backgroundColor: lead.status}}>
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
                                                <a onClick={()=>openModalRegisterDetail(`/sales/info-student/${lead.id}`)}
                                                   className="text-name-student-register">
                                                    {lead.name}
                                                </a>
                                                <div>{lead.email}</div>
                                                <div>{lead.phone}</div>
                                            </td>
                                            <td>{lead.dob}</td>
                                            <td>
                                                <div>{lead.source}</div>
                                                <div>{lead.campaign}</div>
                                                {

                                                    !this.props.showSelectedLead &&
                                                        lead.carer &&
                                                        <div className="btn btn-xs btn-main"
                                                             style={{backgroundColor: '#' + lead.carer.color}}
                                                        >
                                                            {getShortName(lead.carer.name)}
                                                            <div className="ripple-container"/>
                                                        </div>


                                                }

                                            </td>

                                            <td>
                                                <div className="flex flex-row">
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
                                                {
                                                    this.props.removeLead ?
                                                        <ButtonGroupAction
                                                            disabledDelete={false}
                                                            delete={() => this.props.removeLead(lead)}
                                                            edit={() => this.openEditModal(lead)}
                                                            disabledEdit={this.props.showSelectedLead}
                                                        >
                                                            <a
                                                                data-toggle="tooltip"
                                                                title="Tạo đăng kí"
                                                                onClick={() => this.props.openCreateRegisterModal(lead)}
                                                                type="button"
                                                                rel="tooltip"
                                                            >
                                                                <i className="material-icons">add</i>
                                                            </a>
                                                        </ButtonGroupAction>
                                                        :
                                                        <ButtonGroupAction
                                                            disabledDelete={!this.props.showSelectedLead}
                                                            delete={() => this.props.deleteLeadSelected(lead)}
                                                            edit={() => this.openEditModal(lead)}
                                                            disabledEdit={this.props.showSelectedLead}
                                                        >
                                                            <a
                                                                data-toggle="tooltip"
                                                                title="Tạo đăng kí"
                                                                onClick={() => this.props.openCreateRegisterModal(lead)}
                                                                type="button"
                                                                rel="tooltip"
                                                            >
                                                                <i className="material-icons">add</i>
                                                            </a>
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

export default ListLead;