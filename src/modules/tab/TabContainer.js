import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
// import {Link} from "react-router";
import * as tabsActions from './tabsActions';
import {closeSidebar, getNewDomain, transformToTree} from '../../helpers/helper';
import Loading from "../../components/common/Loading";
// Import actions here!!
const TABIDS = [27, 213, 214, 5, 151];


class TabContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            parentTabId: null,
            tabs: []
        };

        this.currentTab = {};
        this.parentCurrentTab = {};
    }

    componentWillMount() {
        this.props.tabsActions.loadTabsData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tabsListData.length > this.props.tabsListData.length) {

            // tạo cây
            let tabs = transformToTree(nextProps.tabsListData, "id", "parent_id");

            this.setState({tabs: this.convertDataTabs({children: tabs}, nextProps.pathname)});
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

    convertDataTabs(tabs, pathname) {
        tabs.parent = tabs.parent ? tabs.parent : [];

        tabs.children = tabs.children.map((tab) => {
            tab.parent = [...tabs.parent, tabs];
            if (pathname === tab.url) {
                this.currentTab = tab;
                this.parentCurrentTab = this.currentTab.parent[1];
            }
            if (tab.children.length > 0) {
                return this.convertDataTabs(tab, pathname);
            }
            return tab;
        });

        return tabs;
    }

    renderTabChildren(tabChildren) {

        return (
            <ul className="nav">
                {
                    tabChildren.children.map((tab, index) => {
                        if (tab.children.length <= 0) {
                            return (
                                <li key={"keytabpar" + index}
                                    className={this.props.pathname === tab.url ? "active" : ""}>
                                    {this.parentCurrentTab && tab.parent[1] && this.parentCurrentTab.id == tab.parent[1].id ?
                                        (
                                            <a href={this.newVersionTab(tab)} activeClassName="active"
                                               onClick={() => {
                                                   closeSidebar();
                                               }}
                                            >
                                                <p style={{paddingLeft: '10px'}}>{tab.name}</p>
                                            </a>
                                        ) :
                                        (
                                            <a href={this.newVersionTab(tab)}
                                               onClick={() => {
                                                   closeSidebar();
                                               }}
                                            >
                                                <p style={{paddingLeft: '10px'}}>{tab.name}</p>
                                            </a>
                                        )
                                    }
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

    newVersionTab = (tab) => {
        let url;
        if (TABIDS.indexOf(tab.id) >= 0) {
            url = `${getNewDomain()}${tab.url}`;
        } else {
            url = tab.url;
        }
        return url;
    }

    render() {
        if (this.props.isLoadingTab) {
            return <Loading/>;
        } else {
            return (
                <ul className="nav">
                    {this.state.tabs && this.state.tabs.children && this.state.tabs.children.map((tab, index) => {
                        if (tab.children.length <= 0) {
                            return (
                                <li key={"keytabpar" + index}
                                    className={this.props.pathname === tab.url ? "active" : ""}>
                                    <a href={this.newVersionTab(tab)}
                                       onClick={() => {
                                           closeSidebar();
                                       }}
                                    >
                                        {//eslint-disable-next-line
                                        }
                                        <div dangerouslySetInnerHTML={{__html: tab.icon}}/>
                                        <p>{tab.name}</p>
                                    </a>
                                </li>
                            );
                        } else {
                            return (
                                <li key={"keytabpar" + index}>
                                    <a data-toggle="collapse"
                                       href={'#tab' + tab.id}>
                                        {//eslint-disable-next-line
                                        }
                                        <div dangerouslySetInnerHTML={{__html: tab.icon}}/>
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
