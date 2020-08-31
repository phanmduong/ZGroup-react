/**
 * Created by phanmduong on 9/27/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import Search from "../../components/common/Search";
import Loading from "../../components/common/Loading";
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';
import * as emailCampaignActions from './emailCampaignActions';
import {Modal} from 'react-bootstrap';
import FormInputText from '../../components/common/FormInputText';
import ListCampaign from './ListCampaign';
import ReactSelect from 'react-select';
import moment from "moment";
import FormInputDateTime from '../../components/common/FormInputDateTime';
import {DATETIME_FORMAT, DATETIME_FORMAT_SQL} from '../../constants/constants';

class EmailCampaignsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            showModal: false,
            campaign: {
                subscribers_list: []
            },
            edit: false,
            optionsSelectSubscriberList: [],
            optionsSelectEmailForms: [],

        };
        this.campaignsSearchChange = this.campaignsSearchChange.bind(this);
        this.openModalStoreCampaign = this.openModalStoreCampaign.bind(this);
        this.closeModalStoreCampaign = this.closeModalStoreCampaign.bind(this);
        this.changeSubscribersList = this.changeSubscribersList.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.storeCampaign = this.storeCampaign.bind(this);
        this.deleteCampaign = this.deleteCampaign.bind(this);
        this.changeEmailForm = this.changeEmailForm.bind(this);
        this.ownerId = this.props.params.ownerId;
    }

    componentWillMount() {
        this.props.emailCampaignActions.loadSubscribersList();
        this.props.emailCampaignActions.loadForms();
        this.loadCampaigns();
        if (this.props.params.ownerId) {
            this.ownerId = this.props.params.ownerId;
        } else {
            this.ownerId = "";
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.ownerId !== this.props.params.ownerId) {
            this.ownerId = nextProps.params.ownerId;
            this.setState({
                query: ''
            });
            this.props.emailCampaignActions.loadCampaigns(1, '', this.ownerId);
        }
        if (nextProps.subscribersList && nextProps.subscribersList !== this.props.subscribersList) {
            let dataSubscribersList = [];
            nextProps.subscribersList.forEach(subscribersListItem => {
                dataSubscribersList.push({
                    ...subscribersListItem, ...{
                        value: subscribersListItem.id,
                        label: subscribersListItem.name
                    }
                });
            });
            this.setState({
                optionsSelectSubscriberList: dataSubscribersList
            });
        }

        if (nextProps.emailForms && nextProps.emailForms !== this.props.emailForms) {
            let dataEmailForms = [];
            nextProps.emailForms.forEach(emailForm => {
                dataEmailForms.push({
                    ...emailForm, ...{
                        value: emailForm.id,
                        label: emailForm.name
                    }
                });
            });
            this.setState({
                optionsSelectEmailForms: dataEmailForms
            });
        }
    }

    campaignsSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.emailCampaignActions.loadCampaigns(1, value, this.ownerId);
        }.bind(this), 500);

    }

    loadCampaigns(page = 1) {
        this.setState({page});
        this.props.emailCampaignActions.loadCampaigns(page, this.state.query, this.ownerId);
    }

    openModalStoreCampaign(campaign = null) {
        if (campaign) {
            let dateIsValid = moment(campaign.timer, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).isValid();
            this.setState({
                showModal: true,
                campaign: {
                    ...campaign,
                    subscribers_list: campaign.subscribers_list_ids,
                    timer: dateIsValid ? moment(campaign.timer, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT) : null
                },
                edit: true,
            })
            ;
        } else {
            this.setState({
                showModal: true,
                campaign: {},
                edit: false,
            });
        }
    }

    changeSubscribersList(value) {
        this.setState({
            campaign: {
                ...this.state.campaign,
                subscribers_list: value
            }
        });
    }

    changeEmailForm(value) {
        this.setState({
            campaign: {
                ...this.state.campaign,
                form_id: value.id
            }
        });
    }

    closeModalStoreCampaign() {
        this.setState({
            showModal: false
        });
    }

    storeCampaign() {
        helper.setFormValidation("#form-campaign");
        if ($("#form-campaign").valid()) {
            this.props.emailCampaignActions.storeCampaign({
                ...this.state.campaign,
                subscribers_list: this.state.campaign.subscribers_list[0] && this.state.campaign.subscribers_list[0].id ?
                    _.map(this.state.campaign.subscribers_list, 'id') : this.state.campaign.subscribers_list
            }, this.closeModalStoreCampaign);
        }
    }

    updateFormData(event) {
        const field = event.target.name;
        let campaign = {...this.state.campaign};
        campaign[field] = event.target.value;
        this.setState({campaign: campaign});
    }

    deleteCampaign(campaign) {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa chiến dịch này không?", () => {
            this.props.emailCampaignActions.deleteEmailForm(campaign.id);
        });
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">

                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <h4 className="card-title">
                                    <strong>Chiến dịch</strong>
                                </h4>
                                <div className="row">
                                    <Search
                                        onChange={this.campaignsSearchChange}
                                        value={this.state.query}
                                        placeholder="Tìm kiếm"
                                        className="col-md-12"
                                    />
                                </div>
                                <br/>
                                {this.props.isLoading ? <Loading/> :
                                    <ListCampaign
                                        openModal={this.openModalStoreCampaign}
                                        deleteCampaign={this.deleteCampaign}
                                        campaigns={this.props.campaigns}
                                    />
                                }
                            </div>    
                        </div>
                    </div>

                    <div className="card-content">
                        <ul className="pagination pagination-primary">
                            {_.range(1, this.props.totalPages + 1).map(page => {
                                if (Number(this.state.page) === page) {
                                    return (
                                        <li key={page} className="active">
                                            <a onClick={() => this.loadCampaigns(page)}>{page}</a>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={page}>
                                            <a onClick={() => this.loadCampaigns(page)}>{page}</a>
                                        </li>
                                    );
                                }

                            })}
                        </ul>
                    </div>

                </div>
                <Modal show={this.state.showModal} onHide={this.closeModalStoreCampaign}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.edit ? "Chỉnh sửa chiến dịch" : "Tạo chiến dịch"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-campaign" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <FormInputText
                                name="name"
                                required
                                label="Tên"
                                updateFormData={this.updateFormData}
                                value={this.state.campaign.name}
                            />
                            <FormInputText
                                name="subject"
                                required
                                label="Subject"
                                updateFormData={this.updateFormData}
                                value={this.state.campaign.subject}
                            />
                            <FormInputDateTime
                                name="timer"
                                id="input-datetime-timer"
                                updateFormData={this.updateFormData}
                                value={this.state.campaign.timer}
                                // defaultDate={moment().add(1, "hours")}
                                label="Hẹn giờ gửi mail"
                            />
                            <ReactSelect
                                name="form-field-name"
                                options={this.state.optionsSelectSubscriberList}
                                value={this.state.campaign.subscribers_list}
                                placeholder="Chọn danh sách"
                                multi
                                onChange={this.changeSubscribersList}
                            />
                            <div className="form-group">
                                <ReactSelect
                                    name="form-field-name"
                                    options={this.state.optionsSelectEmailForms}
                                    value={this.state.campaign.form_id}
                                    placeholder="Chọn email form"
                                    onChange={this.changeEmailForm}
                                />
                            </div>
                            {
                                this.props.isStoring ?
                                    (
                                        <button
                                            className="btn btn-fill btn-rose disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/>
                                            {this.state.edit ? ' Đang cập nhật' : ' Đang tạo'}
                                        </button>
                                    )
                                    :
                                    <button
                                        className="btn btn-fill btn-rose"
                                        onClick={this.storeCampaign}
                                    >
                                        {this.state.edit ? 'Cập nhật' : 'Tạo'}
                                    </button>
                            }
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

EmailCampaignsContainer.propTypes = {
    campaigns: PropTypes.array.isRequired,
    subscribersList: PropTypes.array.isRequired,
    isStoring: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    emailCampaignActions: PropTypes.object.isRequired,
    emailForms: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        campaigns: state.emailCampaigns.campaigns,
        subscribersList: state.emailCampaigns.subscribersList,
        emailForms: state.emailCampaigns.forms,
        isStoring: state.emailCampaigns.isStoring,
        isLoading: state.emailCampaigns.isLoading,
        totalPages: state.emailCampaigns.totalPages,
        currentPage: state.emailCampaigns.currentPage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        emailCampaignActions: bindActionCreators(emailCampaignActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailCampaignsContainer);
