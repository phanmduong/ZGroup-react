/**
 * Created by phanmduong on 11/20/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination from "../../components/common/Pagination";
import Loading from "../../components/common/Loading";
import ListCampaign from "./ListCampaign";
import * as marketingCampaignActions from "./marketingCampaignActions";

class MarketingCampaignContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1
        };
        this.loadMarketingCampaigns = this.loadMarketingCampaigns.bind(this);
    }

    componentWillMount() {
        this.loadMarketingCampaigns();
        this.props.marketingCampaignActions.loadAllCourse();
    }

    loadMarketingCampaigns(page = 1) {
        this.setState({page: page});
        this.props.marketingCampaignActions.loadMarketingCampaigns(page);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">


                    <div className="card">

                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">Chiến dịch marketing</h4>

                            <div style={{marginTop: "15px"}}>
                                <button className="btn btn-rose">
                                    Thêm chiến dịch
                                </button>
                            </div>

                            {
                                this.props.isLoading ? <Loading/> :
                                    <ListCampaign
                                        campaigns={this.props.marketingCampaigns}
                                        courses={this.props.courses}
                                        user={this.props.user}
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.marketingCampaigns.isLoading,
        marketingCampaigns: state.marketingCampaigns.marketingCampaigns,
        totalPages: state.marketingCampaigns.totalPages,
        courses: state.marketingCampaigns.courses,
        user: state.login.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        marketingCampaignActions: bindActionCreators(marketingCampaignActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketingCampaignContainer);
