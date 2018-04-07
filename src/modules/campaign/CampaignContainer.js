import React from 'react';
import {Link, IndexLink} from 'react-router';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import *as campaignAction from "./campaignAction";


class CampaignContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.campaignId = this.props.params.campaignId;
        this.state = {
            type: "edit",
            link: ""
        };
    }

    componentWillMount() {
        this.props.campaignAction.loadTypeOfMessage();
        this.props.campaignAction.loadAllMessage(this.props.params.campaignId, 1, '');
        this.setState({
            type: "edit",
            link: `/sms/campaign-detail/${this.campaignId}`
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isSavingMessage !== this.props.isSavingMessage && !nextProps.isSavingMessage) {
            this.props.campaignAction.loadAllMessage(this.campaignId, 1, '');
        }
    }

    render() {
        this.path = this.props.location.pathname;
        return (
            <div>
                <IndexLink to={this.state.link}>
                    <button type="button" style={{color: "white"}}
                            className={this.path === this.state.link ? 'btn-primary btn btn-round' : 'btn btn-round'}
                            data-dismiss="modal">
                        CHIẾN DỊCH
                        <div className="ripple-container"/>
                    </button>
                </IndexLink>&emsp;
                <Link to={`${this.state.link}/receivers`} style={{color: "white"}}>
                    <button type="button"
                            className={this.path === `${this.state.link}/receivers` ? 'btn-primary btn btn-round' : 'btn btn-round'}
                            data-dismiss="modal">
                        NGƯỜI NHẬN
                        <div className="ripple-container"/>
                    </button>
                </Link>&emsp;
                <Link to={`${this.state.link}/history`} style={{color: "white"}}>
                    <button type="button"
                            className={this.path === `${this.state.link}/history` ? 'btn-primary btn btn-round' : 'btn btn-round'}
                            data-dismiss="modal">
                        LỊCH SỬ
                    </button>
                </Link><br/><br/>

                <div className="tab-content">
                    {this.props.children}
                </div>

                <footer className="footer">
                    <div className="container-fluid">
                        <nav className="pull-left">
                            <ul>
                                <li>
                                    <a href="#">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Company
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Portfolio
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </footer>

            </div>
        );
    }
}

CampaignContainer.propTypes = {
    children: PropTypes.element,
    location: PropTypes.object.isRequired,
    pathname: PropTypes.string,
    campaignAction: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    isSavingMessage: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isSavingMessage: state.smsCampaign.isSavingMessage,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        campaignAction: bindActionCreators(campaignAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignContainer);