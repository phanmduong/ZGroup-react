import React from 'react';
import {observer} from 'mobx-react';
import Filter from "./Filter";
import CardRevenue from "./CardRevenue";
import filterStore from "./filterStore";
import cardRevenueStore from "./cardRevenueStore";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import Loading from "../../../components/common/Loading";
import DashboardKpiStore from "./DashboardKpiStore";

@observer
class DashboardKpiComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new DashboardKpiStore();
    }

    componentDidMount() {
        const filter = {...filterStore.filter};
        filter.start_time = filterStore.filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filterStore.filter.end_time.format(DATE_FORMAT_SQL);
        // this.store.analyticsRegister(filter);
    }

    loadData = (filter) => {
        cardRevenueStore.analyticsRevenue(filter);
        // this.store.analyticsRegister(filter);
    }

    render() {
        const {isLoading} = this.store;
        return (
            <div>
                <Filter loadData={this.loadData}/>
                <CardRevenue/>
                {isLoading ? <Loading/> :
                    <div className="row">
                        <div className="col-md-12">

                        </div>
                    </div>
                }
            </div>

        );
    }
}


export default DashboardKpiComponent;