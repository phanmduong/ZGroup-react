import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Link} from "react-router";
import * as tabsActions from './tabsActions';
import * as helper from '../../helpers/helper';
import Loading from "../../components/common/Loading";

// Import actions here!!

class TabContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            parentTabId: null,
            tabs: []
        };

        this.currentTab = [];

    }

    componentWillMount() {
        this.props.tabsActions.loadTabsData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tabsListData.length > this.props.tabsListData.length) {

            // tạo cây
            let tabs = helper.transformToTree(nextProps.tabsListData, "id", "parent_id");
            this.setState({tabs: tabs});
        }
    }

    componentDidUpdate() {
        if (this.currentTab.parent) {
            this.currentTab.parent.forEach((tabParent) => {
                if (!$("#tab" + tabParent.id).hasClass('collapse in')) {
                    $("#tab" + tabParent.id).collapse('toggle');
                }
            });
        }

    }

    renderTabChildren(tabChildren) {
        tabChildren.parent = tabChildren.parent ? tabChildren.parent : [];

        return (
            <ul className="nav">
                {
                    tabChildren.children.map((tab, index) => {
                        tab.parent = [...tabChildren.parent, tabChildren];
                        if (tab.children.length <= 0) {
                            if (this.props.pathname === tab.url) {
                                this.currentTab = tab;
                            }
                            return (
                                <li key={"keytabpar" + index}
                                    className={this.props.pathname === tab.url ? "active" : ""}>
                                    <Link to={tab.url} activeClassName="active"
                                          onClick={() => {
                                              helper.closeSidebar();
                                          }}
                                    >
                                        <p style={{paddingLeft: '10px'}}>{tab.name}</p>
                                    </Link>
                                </li>
                            );
                        } else {
                            return (
                                <li key={"keytabpar" + index}>
                                    <a data-toggle="collapse"
                                       href={'#tab' + tab.id}>
                                        <p>{tab.name}
                                            <b className="caret"/>
                                        </p>
                                    </a>
                                    <div className="collapse" id={'tab' + tab.id} style={{paddingLeft: '10px'}}>
                                        {

                                            this.renderTabChildren(tab)
                                        }
                                    </div>
                                </li>
                            );
                        }
                    })
                }
            </ul>
        );

    }

    render() {
        if (this.props.isLoadingTab) {
            return <Loading/>;
        } else {
            return (
                <ul className="nav">
                    {this.state.tabs.map((tab, index) => {
                        if (tab.children.length <= 0) {
                            return (
                                <li key={"keytabpar" + index}
                                    className={this.props.pathname === tab.url ? "active" : ""}>
                                    <Link to={tab.url} activeClassName="active"
                                          onClick={() => {
                                              helper.closeSidebar();
                                          }}
                                    >
                                        {//eslint-disable-next-line
                                        }<div dangerouslySetInnerHTML={{__html: tab.icon}}/>
                                        <p>{tab.name}</p>
                                    </Link>
                                </li>
                            );
                        } else {
                            return (
                                <li key={"keytabpar" + index}>
                                    <a data-toggle="collapse"
                                       href={'#tab' + tab.id}>
                                        {//eslint-disable-next-line
                                        }<div dangerouslySetInnerHTML={{__html: tab.icon}}/>
                                        <p>{tab.name}
                                            <b className="caret"/>
                                        </p>
                                    </a>
                                    <div className="collapse" id={'tab' + tab.id}>
                                        {
                                            this.renderTabChildren(tab)
                                        }
                                    </div>
                                </li>
                            );
                        }
                    })
                    }
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