/**
 * Created by phanmduong on 10/28/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as helper from '../../helpers/helper';
import * as roleActions from './roleActions';
import PropTypes from 'prop-types';

class ListTab extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    changeCheckTab(tabData, checked) {
        tabData.checked = checked;
        this.props.roleActions.changeCheckTab(tabData.id, tabData.checked);
        tabData.children.map((tab) => {
            this.changeCheckTab(tab, checked);
        });
    }

    changeDataTab(tabData) {
        let tab = {...tabData};
        if (tab.checked === undefined) tab.checked = false;
        let checked = !tab.checked;
        let isChangeCheckParent = true;
        if (tabData.parent.length > 1) {
            if (checked) {
                this.changeCheckTabParent(tabData.parent, checked);
            } else {
                tabData.parent[tabData.parent.length - 1].children.map((tabChild) => {
                    if (tabChild.id !== tab.id) {
                        if (tabChild.checked) {
                            isChangeCheckParent = false;
                        }
                    }
                });

                if (isChangeCheckParent){
                    this.changeCheckTabParent(tabData.parent, checked);
                }

            }
        }
        this.changeCheckTab(tab, checked);
    }

    changeCheckTabParent(tabsParent, checked) {
        tabsParent.map((tabParent) => {
            if (tabParent.id) {
                this.props.roleActions.changeCheckTab(tabParent.id, checked);
            }
        });
    }

    renderTab(tabParent) {
        tabParent.parent = tabParent.parent ? tabParent.parent : [];
        return (
            <div style={{marginLeft: '30px'}}>
                {
                    tabParent.children.map((tab) => {
                        tab.parent = [...tabParent.parent, tabParent];
                        if (tab.children.length <= 0) {
                            return (
                                <div className="panel panel-default">
                                    <div className="panel-heading" role="tab">
                                        <a>
                                            <div className="panel-title">
                                                <div className="checkbox">
                                                    <label>
                                                        {tab.checked ?
                                                            <input type="checkbox" checked
                                                                   onChange={() => this.changeDataTab(tab)}
                                                            />
                                                            :
                                                            <input type="checkbox"
                                                                   onChange={() => this.changeDataTab(tab)}
                                                            />
                                                        }
                                                        {tab.name}
                                                    </label>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div className="panel panel-default">
                                    <div className="panel-heading flex flex-space-between" role="tab" id={'heading-tab' + tab.id}
                                         >
                                        <div className="checkbox none-margin">
                                            <label>
                                                <input type="checkbox" checked={tab.checked}
                                                       onChange={() => this.changeDataTab(tab)}/>
                                                {tab.name}
                                            </label>
                                        </div>
                                        <a role="button" data-toggle="collapse" data-parent="#accordion"
                                           aria-expanded="false"
                                           aria-controls={'tab-role' + tab.id}
                                           href={'#tab-role' + tab.id}
                                           style={{marginTop:12}}
                                        >
                                            <div className="panel-title" style={{width: '100%'}}>
                                                <i className="material-icons">keyboard_arrow_down</i>
                                            </div>
                                        </a>
                                    </div>
                                    <div id={"tab-role" + tab.id} className="panel-collapse collapse" role="tabpanel"
                                         aria-labelledby={'heading-tab' + tab.id}>
                                        <div className="panel-body">
                                            {this.renderTab(tab)}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })
                }
            </div>
        );

    }

    render() {
        return (
            <div>
                {this.renderTab({children: this.props.tabs})}
            </div>
        );
    }
}

ListTab.propTypes = {
    roleActions: PropTypes.object.isRequired,
    tabs: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        tabs: helper.transformToTree(state.roles.tabs.allTabs ? state.roles.tabs.allTabs : [], "id", "parent_id")
    };
}

function mapDispatchToProps(dispatch) {
    return {
        roleActions: bindActionCreators(roleActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTab);
