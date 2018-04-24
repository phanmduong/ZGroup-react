import React from 'react';
//import PropTypes from 'prop-types';
//import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import *as campaignListAction from "./campaignListAction";
import Pagination from "../../components/common/Pagination";
import Search from "../../components/common/Search";
import CampaignListComponent from "./CampaignListComponent";
import Loading from "../../components/common/Loading";
import CreateEditCampaignModal from "./CreateEditCampaignModal";
import ManageTemplateTypesModal from "./ManageTemplateTypesModal";

class CampaignListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: ''
        };
        this.timeOut = null;
        this.campaignsSearchChange = this.campaignsSearchChange.bind(this);
        this.loadCampaigns = this.loadCampaigns.bind(this);
        this.changeCampaignStatus = this.changeCampaignStatus.bind(this);
        this.showCreateEditCampaignModal = this.showCreateEditCampaignModal.bind(this);
    }

    componentWillMount() {
        this.props.campaignListAction.getCampaignList();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isSavingCampaign !== this.props.isSavingCampaign && !nextProps.isSavingCampaign) {
            this.setState({
                page: 1,
                query: ''
            });
            this.props.campaignListAction.getCampaignList();
        }
    }

    campaignsSearchChange(value) {
        this.setState({
            query: value,
            page: 1
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.campaignListAction.getCampaignList(
                1,
                value
            );
        }.bind(this), 500);
    }

    loadCampaigns(page = 1) {
        this.setState({page: page});
        this.props.campaignListAction.getCampaignList(
            page,
            this.state.query
        );
    }

    changeCampaignStatus(campaignId, value) {
        this.props.campaignListAction.changeCampaignStatus(campaignId, value ? "open" : "close");
    }

    showCreateEditCampaignModal(campaign) {
        this.props.campaignListAction.showCreateEditCampaignModal();
        this.props.campaignListAction.handleCreateEditCampaignModal(campaign);
    }

    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;

        return (
            <div className="campaign-content">
                <div className="form-group is-empty">
                    <div className="flex-row flex">
                        <h5 className="card-title" style={{lineHeight: "0px"}}>
                            <strong>Danh sách chiến dịch</strong>
                        </h5>
                        <div className="dropdown">
                            <button data-toggle="dropdown" aria-expanded="false"
                                    className="dropdown-toggle button-plus">
                                <i className="material-icons" style={{fontSize: "20px"}}>add</i>
                            </button>
                            <ul className="dropdown-menu dropdown-primary">
                                <li>
                                    <a onClick={() => this.showCreateEditCampaignModal({
                                        status: "open"
                                    })}>Thêm chiến dịch</a>
                                </li>
                                <li>
                                    <a onClick={() => this.props.campaignListAction.showManageTemplateTypesModal()}
                                    >Thêm loại tin nhắn</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Search
                        onChange={this.campaignsSearchChange}
                        value={this.state.query}
                        placeholder="Nhập tên chiến dịch để tìm"
                    />
                </div>
                <br/>
                {
                    this.props.isLoading ? (
                        <Loading/>
                    ) : (
                        <CampaignListComponent campaigns={this.props.campaigns}
                                               changeCampaignStatus={this.changeCampaignStatus}
                                               showCreateEditCampaignModal={this.showCreateEditCampaignModal}/>
                    )
                }
                <div className="row float-right">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                         style={{textAlign: 'right'}}>
                        <b style={{marginRight: '15px'}}>
                            Hiển thị kêt quả từ {first}
                            - {end}/{this.props.totalCount}</b><br/>
                        <Pagination
                            totalPages={this.props.totalPages}
                            currentPage={this.props.currentPage}
                            loadDataPage={this.loadCampaigns}
                        />
                    </div>
                </div>
                <CreateEditCampaignModal/>
                <ManageTemplateTypesModal/>
            </div>
        );
    }
}

CampaignListContainer.propTypes = {
    campaignListAction: PropTypes.object.isRequired,
    campaigns: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSavingCampaign: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        campaigns: state.campaignList.campaigns,
        totalCount: state.campaignList.totalCount,
        totalPages: state.campaignList.totalPages,
        currentPage: state.campaignList.currentPage,
        limit: state.campaignList.limit,
        isLoading: state.campaignList.isLoading,
        isSavingCampaign: state.campaignList.isSavingCampaign
    };
}

function mapDispatchToProps(dispatch) {
    return {
        campaignListAction: bindActionCreators(campaignListAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignListContainer);