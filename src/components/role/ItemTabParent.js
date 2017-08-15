import React from 'react';
import ItemTabChild from './ItemTabChild';
import PropTypes from 'prop-types';

let self;

class ItemTabParent extends React.Component {
    constructor(props, context) {
        super(props, context);
        self = this;
        this.changeCheckTabChild = this.changeCheckTabChild.bind(this);
    }

    changeCheckTabChild(checked, tabChildData, tabParentData) {
        let checkParent = false;
        let tabChild = {...tabChildData};
        let tabParent = {...tabParentData};
        tabChild.checked = checked;
        tabParent.checked = checked;
        if (checked) {
            this.props.changeCheckTab(tabParent);
            this.props.changeCheckTab(tabChild);
        } else {
            this.props.tabsListData.forEach((tabChildItem) => {
                    if (tabChildItem.parent_id === tabParent.id && tabChildItem.id !== tabChild.id) {
                        if (tabChildItem.checked) {
                            checkParent = true;
                        }
                    }
                }
            );
            if (!checkParent) {
                this.props.changeCheckTab(tabParent);
            }
            this.props.changeCheckTab(tabChild);
        }


    }

    changeCheckTabParent(checked, tabData) {
        let tab = {...tabData};
        tab.checked = checked;

        this.props.tabsListData.forEach((tabChildItem) => {
                if (tabChildItem.parent_id === tab.id) {
                    let tabChild = {...tabChildItem};
                    tabChild.checked = checked;
                    return self.props.changeCheckTab(tabChild);
                }
            }
        )
        ;
        this.props.changeCheckTab(tab);

    }

    componentDidMount() {
        $.material.init();
    }

    render() {
        let {tab, tabsListData} = this.props;
        const parentTab = tabsListData
            .filter(t => tab.id === t.parent_id)[0];
        if (parentTab) {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id={'heading-tab' + tab.id}>
                        <a role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="false"
                           aria-controls={'tab-role' + tab.id}
                           href={(parentTab) ? '#tab-role' + tab.id : ''}
                        >
                            <h4 className="panel-title">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" checked={tab.checked}
                                               onChange={(event) => this.changeCheckTabParent(event.target.checked, tab)}/>
                                        {tab.name}
                                    </label>
                                </div>
                                {parentTab && <i className="material-icons">keyboard_arrow_down</i>}
                            </h4>
                        </a>
                    </div>
                    <div id={"tab-role" + tab.id} className="panel-collapse collapse" role="tabpanel"
                         aria-labelledby={'heading-tab' + tab.id}>
                        <div className="panel-body">
                            <div className="col-lg-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover table-striped table-list-role">
                                        <thead>
                                        <tr>
                                            <th>Tab</th>
                                            <th>Url</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {tabsListData.map((tabChild, index) => {
                                            if (tabChild.parent_id === tab.id) {
                                                return (
                                                    <ItemTabChild
                                                        tabChild={tabChild}
                                                        tabParent={tab}
                                                        key={index}
                                                        changeCheckTabChild={self.changeCheckTabChild}
                                                    />
                                                );
                                            }
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab">
                        <a>
                            <h4 className="panel-title">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" checked={tab.checked}
                                               onChange={(event) => this.changeCheckTabParent(event.target.checked, tab)}/>
                                        {tab.name}
                                    </label>
                                </div>
                            </h4>
                        </a>
                    </div>
                </div>
            );

        }
    }
}


ItemTabParent.propTypes = {
    changeCheckTab: PropTypes.func.isRequired,
    tabsListData: PropTypes.array.isRequired,
    tab: PropTypes.object.isRequired,
};

export default ItemTabParent;
