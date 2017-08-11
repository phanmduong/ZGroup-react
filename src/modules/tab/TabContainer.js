import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Link} from "react-router";
import * as tabsActions from './tabsActions';
import Loading from "../../components/common/Loading";

// Import actions here!!

class TabContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            parentTabId: null
        };
    }

    componentWillMount() {
        this.props.tabsActions.loadTabsData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tabsListData.length > this.props.tabsListData.length) {

            const tab = nextProps.tabsListData
                .filter(t => t.url === this.props.pathname)[0];
            if (tab) {
                const parentTab = nextProps.tabsListData
                    .filter(t => t.id === tab.parent_id)[0];

                if (parentTab) {
                    this.setState({
                        parentTabId: '#tab' + parentTab.id
                    });
                }
            }

        }
    }

    componentDidUpdate() {
        if (this.state.parentTabId && !$(this.state.parentTabId).hasClass('collapse in')) {
            $(this.state.parentTabId).collapse('toggle');
        }
    }


    render() {

        if (this.props.isLoadingTab) {
            return <Loading/>;
        } else {
            return (
                <ul className="nav">
                    {this.props.tabsListData.map((tab, index) => {
                        let checkDropdown = false;
                        if (tab.parent_id === 0) {
                            this.props.tabsListData.forEach((tabChild) => {
                                if (tabChild.parent_id === tab.id && !checkDropdown) {
                                    checkDropdown = true;
                                }
                            });
                            if (checkDropdown) {
                                return (
                                    <li key={"keytabpar" + index}>
                                        <a data-toggle="collapse"
                                           href={'#tab' + tab.id}>
                                            <div dangerouslySetInnerHTML={{__html: tab.icon}}/>
                                            <p>{tab.name}
                                                <b className="caret">
                                                </b>
                                            </p>
                                        </a>
                                        <div className="collapse" id={'tab' + tab.id}>
                                            <ul className="nav">
                                                {
                                                    this.props.tabsListData.map((tabChild) => {
                                                        if (tabChild.parent_id === tab.id) {

                                                            return (
                                                                <li className={this.props.pathname === tabChild.url ? "active" : ""}
                                                                    key={"tabChild" + tabChild.id}>
                                                                    <Link to={tabChild.url} activeClassName="active">
                                                                        {tabChild.name}
                                                                    </Link>
                                                                </li>
                                                            );
                                                        }
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                );
                            } else {
                                return (
                                    <li key={"keytabpar" + index}
                                        className={this.props.pathname === tab.url ? "active" : ""}>
                                        <Link to={tab.url} activeClassName="active">
                                            <div dangerouslySetInnerHTML={{__html: tab.icon}}/>
                                            <p>{tab.name}</p>
                                        </Link>
                                    </li>
                                );
                            }
                        }
                    })}
                </ul>
            );
        }


    }
}

TabContainer.propTypes = {
    isLoadingTab: PropTypes.bool.isRequired,
    errorLoadingTab: PropTypes.bool.isRequired,
    tabsListData: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired,
    tabsActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoadingTab: state.tabs.isLoading,
        errorLoadingTab: state.tabs.error,
        tabsListData: state.tabs.tabListData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        tabsActions: bindActionCreators(tabsActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabContainer);