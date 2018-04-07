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
        this.state = {
            type: "create",
            link: `/sms/campaign`
        };
    }
    componentWillMount() {
        this.props.campaignAction.loadTypeOfMessage();
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
                            className={this.path ===`${this.state.link}/receivers`?'btn-primary btn btn-round':'btn btn-round'}
                            data-dismiss="modal">
                        NGƯỜI NHẬN
                        <div className="ripple-container"/>
                    </button>
                </Link>&emsp;
                <Link to={`${this.state.link}/history`} style={{color: "white"}}>
                    <button type="button"
                            className={this.path ===`${this.state.link}/history`?'btn-primary btn btn-round':'btn btn-round'}
                            data-dismiss="modal">
                        LỊCH SỬ
                    </button>
                </Link><br/><br/>

                <div className="tab-content">
                    {this.props.children}
                </div>

            </div>
        );
    }
}

CampaignContainer.propTypes = {
    children: PropTypes.element,
    location: PropTypes.object.isRequired,
    pathname: PropTypes.string,
    campaignAction: PropTypes.object.isRequired
};
function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        campaignAction: bindActionCreators(campaignAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignContainer);