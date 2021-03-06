import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination from "../../components/common/Pagination";
import Loading from "../../components/common/Loading";
import ListCampaign from "./ListCampaign";
import * as marketingCampaignActions from "./marketingCampaignActions";
import {Modal} from "react-bootstrap";
import StoreCampaign from "./StoreCampaign";
import PropTypes from 'prop-types';

class MarketingCampaignContainerUp extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            showModalStoreCampaign: false,
        };
        this.loadMarketingCampaigns = this.loadMarketingCampaigns.bind(this);
        this.closeModalStoreCampaign = this.closeModalStoreCampaign.bind(this);
        this.openModalStoreCampaign = this.openModalStoreCampaign.bind(this);
        this.storeMarketingCampaign = this.storeMarketingCampaign.bind(this);
    }

    componentWillMount() {
        this.loadMarketingCampaigns();
        // this.props.marketingCampaignActions.loadAllCourse();
    }

    closeModalStoreCampaign() {
        this.setState({showModalStoreCampaign: false});
    }

    openModalStoreCampaign(campaign) {
        if (campaign) {
            this.setState({
                showModalStoreCampaign: true,
                campaign: campaign,
                edit: true
            });
        } else {
            this.setState({
                showModalStoreCampaign: true,
                campaign: {},
                edit: false
            });
        }
    }

    loadMarketingCampaigns(page = 1) {
        this.setState({page: page});
        this.props.marketingCampaignActions.loadMarketingCampaigns(page);
    }

    storeMarketingCampaign(marketingCampaign) {
        this.props.marketingCampaignActions.storeMarketingCampaign(marketingCampaign, this.closeModalStoreCampaign);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">


                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <div className="flex-row flex">
                                    <h4 className="card-title">
                                        <strong>Chiến dịch marketing</strong>
                                    </h4>
                                    <div>
                                        <button
                                            className="btn btn-primary btn-round btn-xs button-add none-margin "
                                            type="button"
                                            onClick={() => this.openModalStoreCampaign()}
                                        >
                                            <strong>+</strong>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {
                                this.props.isLoading ? <Loading/> :
                                    <ListCampaign
                                        campaigns={this.props.marketingCampaigns}
                                        // courses={this.props.courses}
                                        user={this.props.user}
                                        openModalStoreCampaign={this.openModalStoreCampaign}
                                    />
                            }
                            <Pagination
                                currentPage={this.state.page}
                                loadDataPage={this.loadMarketingCampaigns}
                                totalPages={this.props.totalPages}
                            />
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.state.showModalStoreCampaign}
                    // bsSize="lg"
                    onHide={this.closeModalStoreCampaign}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.edit ? "Sửa chiến dịch" : "Thêm chiến dịch"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <StoreCampaign
                            campaign={this.state.campaign}
                            closeModal={this.closeModalStoreCampaign}
                            storeMarketingCampaign={this.storeMarketingCampaign}
                            isStoringCampaign={this.props.isStoringCampaign}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

MarketingCampaignContainerUp.propTypes = {
    marketingCampaignActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isStoringCampaign: PropTypes.bool.isRequired,
    marketingCampaigns: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.marketingCampaignUp.isLoading,
        isStoringCampaign: state.marketingCampaignUp.isStoringCampaign,
        marketingCampaigns: state.marketingCampaignUp.marketingCampaigns,
        totalPages: state.marketingCampaignUp.totalPages,
        user: state.login.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        marketingCampaignActions: bindActionCreators(marketingCampaignActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketingCampaignContainerUp);
