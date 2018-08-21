/**
 * Created by phanmduong on 9/3/17.
 */
import React from "react";
import Select from "../../components/common/Select";
import Loading from "../../components/common/Loading";
import DashboardStaffComponent from "./DashboardStaffComponent";
import { observer } from "mobx-react";
import { store } from "./dashboardStaffStore";

@observer
class DashboardStaffContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        store.loadGens();
        store.loadBases();
    }

    onChangeGen(value) {
        store.selectedGenId = value;
        store.loadDashboardStaff();
    }

    onChangeBase(value) {
        store.selectedGenId = value;
        store.loadDashboardStaff();
    }

    render() {
        return (
            <div>
                {store.isLoadingGens || store.isLoadingBases ? (
                    <Loading />
                ) : (
                    <div>
                        <div className="row">
                            <div className="col-sm-3 col-xs-5">
                                <Select
                                    defaultMessage={"Chọn khóa học"}
                                    options={store.gensData}
                                    value={store.selectedGenId}
                                    onChange={this.onChangeGen}
                                />
                            </div>
                            <div className="col-sm-3 col-xs-5">
                                <Select
                                    defaultMessage={"Chọn cơ sở"}
                                    options={store.basesData}
                                    value={store.selectedBaseId}
                                    onChange={this.onChangeBase}
                                />
                            </div>
                        </div>
                        <DashboardStaffComponent />
                    </div>
                )}
            </div>
        );
    }
}

export default DashboardStaffContainer;
