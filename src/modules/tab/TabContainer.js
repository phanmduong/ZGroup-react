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

        // mảng lưu id các phần tử cha của id được họn
        this.tabStack = [];

        // kiểm tra xem đã tìm thấy tab con chưa
        this.checkTabChild = false;
    }

    componentWillMount() {
        this.props.tabsActions.loadTabsData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tabsListData.length > this.props.tabsListData.length) {

            // tạo cây
            let tabs = helper.transformToTree(nextProps.tabsListData, "id", "parent_id");
            this.setState({tabs: tabs});
            const tab = nextProps.tabsListData
                .filter(t => t.url === this.props.pathname)[0];
            if (tab) {
                const parentTab = nextProps.tabsListData
                    .filter(t => t.id === tab.parent_id)[0];

                if (parentTab) {
                    this.setState({
                        parentTabId: parentTab.id
                    });
                }

            }

        }
    }

    componentDidUpdate() {

        // truy vết tất cả thằng cha để mở collapse
        if (this.tabStack.length > 0 && this.checkTabChild) {
            this.tabStack.forEach((tabId) => {
                if (!$("#tab" + tabId).hasClass('collapse in')) {
                    $("#tab" + tabId).collapse('toggle');
                }
            });
        }
    }

    renderTabChildren(tabChildren) {

        // lưu cha lại để truy vết
        if (!this.checkTabChild)
            this.tabStack.push(tabChildren.id);

        if (this.state.parentTabId === tabChildren.id) {
            this.checkTabChild = true;
        }

        return (
            <ul className="nav">
                {
                    tabChildren.children.map((tab, index) => {
                        if (tab.children.length <= 0) {
                            return (
                                <li key={"keytabpar" + index}
                                    className={this.props.pathname === tab.url ? "active" : ""} >
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
                                <li key={"keytabpar" + index} >
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
                                        <div style={{display: 'none'}}>
                                            {
                                                (!this.checkTabChild) && this.tabStack.pop()
                                            }
                                        </div>
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
                                        }
                                        <div dangerouslySetInnerHTML={{__html: tab.icon}}/>
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