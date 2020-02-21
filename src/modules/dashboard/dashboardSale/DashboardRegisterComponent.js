import React from 'react';
import {observer} from 'mobx-react';
import Filter from "./Filter";
import CardRevenue from "./CardRevenue";
import filterStore from "./filterStore";
import cardRevenueStore from "./cardRevenueStore";
import Barchart from "../Barchart";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import DashboardRegisterStore from "./DashboardRegisterStore";
import Loading from "../../../components/common/Loading";

@observer
class DashboardRegisterComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new DashboardRegisterStore();
    }

    componentDidMount() {
        const filter = {...filterStore.filter};
        filter.start_time = filterStore.filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filterStore.filter.end_time.format(DATE_FORMAT_SQL);
        this.store.analyticsRegister(filter);
    }

    loadData = (filter) => {
        cardRevenueStore.analyticsRevenue(filter);
        this.store.analyticsRegister(filter);
    }

    render() {
        const {isLoading, data} = this.store;
        console.log(data);
        return (
            <div>
                <Filter loadData={this.loadData}/>
                <CardRevenue/>
                {isLoading ? <Loading/> :
                    <div className="row gutter-20">
                        <div className="col-md-12">
                            <div className="card margin-bottom-20 margin-top-0">
                                <div className="card-content text-align-left">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong>Số lượng đăng kí theo ngày</strong>
                                        </h4>
                                        <br/>
                                        <br/>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <Barchart
                                                label={data.dates}
                                                data={[data.registers_by_date, data.paid_by_date]}
                                                id="barchar_register_by_date"
                                            />
                                        }
                                        <br/>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card margin-bottom-20 margin-top-0">
                                <div className="card-content text-align-left">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong>Doanh thu theo ngày</strong>
                                        </h4>
                                        <br/>
                                        <br/>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <Barchart
                                                label={data.dates}
                                                data={[data.money_by_date]}
                                                id="barchar_money_by_date"
                                            />
                                        }
                                        <br/>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                }

            </div>

        );
    }
}


export default DashboardRegisterComponent;