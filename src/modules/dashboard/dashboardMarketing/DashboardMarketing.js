import React from 'react';
import ReactSelect from "react-select";
import {IndexLink, Link} from 'react-router';
import {HISTORY_CARE_TYPES} from "../../../constants/constants";
import DateRangePicker from "../../../components/common/DateTimePicker";
import moment from "moment";
import {observer} from 'mobx-react';
import {store} from "./DashBoardMarketingStore";
import Loading from "../../../components/common/Loading";
import Barchart from "../Barchart";

@observer
export default class DashboardMarketing extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            filter: {}
        };
        this.routePrefix = `/dashboard/marketing`;
        this.routes = [
            {
                path: `${this.routePrefix}`, text: 'Tổng quan',
            },
            {
                path: `${this.routePrefix}/history-teaching`, text: 'Chương trình học',
            },
            {
                path: `${this.routePrefix}/progress`, text: 'Điểm danh',
            },
            {
                path: `${this.routePrefix}/checkin-checkout`, text: 'Checkin',
            },
            {
                path: `${this.routePrefix}/score`, text: 'Điểm học viên',
            },
        ];
        this.cardDatas = [
            {title: 'Số Lead mới', field: 'leadsCountByDates', url: ''},
            {title: 'Số Lead đã tiếp cận', field: 'leadsReachedCountByDates', url: ''},
            {title: 'Số Lead đã chuyển đổi', field: 'leadsComebackCountByDates', url: ''},
            {title: 'Số Lead quay lại', field: 'leadsComebackTwiceCountByDates', url: ''},
        ];
    }

    componentDidMount() {
        // store.load();
    }

    changeDateRangePicker = (start_time, end_time) => {
        console.log(start_time, end_time);
        store.filter = {...store.filter, start_time, end_time};
        store.load();
    };

    render() {
        this.path = this.props.location.pathname;
        let {isLoading, filter} = store;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <ul className="nav nav-pills nav-pills-dark margin-top-10" data-tabs="tabs">
                            {this.routes.map((route, index) => {
                                return (
                                    index ?
                                        <li className={this.path === route.path ? 'active' : ''}>
                                            <Link to={route.path}>
                                                {route.text}
                                            </Link>
                                        </li>
                                        :
                                        <li className={this.path === route.path ? 'active' : ''}>
                                            <IndexLink to={route.path}>
                                                {route.text}
                                            </IndexLink>
                                        </li>
                                );
                            })}
                        </ul>

                    </div>
                </div>
                {isLoading && <Loading/>}
                {!isLoading && <div className="row margin-top-20 gutter-20">

                    <div className="col-md-3">
                        <DateRangePicker className="background-white padding-vertical-10px"
                                         start={moment(filter.start_time)} end={moment(filter.end_time)}
                                         style={{padding: '5px 15px', lineHeight: '34px'}}
                                         onChange={this.changeDateRangePicker}

                        />
                    </div>
                    <div className="col-md-3">
                        <ReactSelect
                            value={null}
                            options={HISTORY_CARE_TYPES.SELECT_OPTIONS}
                            onChange={() => {
                            }}
                            className="react-select-white-light-round"
                            placeholder="Chọn loại"
                            clearable={false}
                        />
                    </div>
                    <div className="col-md-3">
                        <ReactSelect
                            value={null}
                            options={HISTORY_CARE_TYPES.SELECT_OPTIONS}
                            onChange={() => {
                            }}
                            className="react-select-white-light-round"
                            placeholder="Chọn loại"
                            clearable={false}
                        />
                    </div>
                    <div className="col-md-3">
                        <ReactSelect
                            value={null}
                            options={HISTORY_CARE_TYPES.SELECT_OPTIONS}
                            onChange={() => {
                            }}
                            className="react-select-white-light-round"
                            placeholder="Chọn loại"
                            clearable={false}
                        />
                    </div>

                </div>}
                {!isLoading && <div className="row gutter-20">
                    {this.cardDatas.map((card) => {
                        return (
                            <div className="col-md-3">
                                <div className="card margin-top-20 margin-bottom-10">
                                    <div className="card-content text-align-left">
                                        <p className="category">{card.title}</p>
                                        <h3 className="card-title">{store.getSumArray(card.field) || 0}</h3>
                                        <div
                                            className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400">
                                            Xem chi tiết
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>}
                {!isLoading && <div className="row gutter-20">
                    <div className="col-md-12">
                        <div className="card margin-top-10 margin-bottom-10">
                            <div className="card-content text-align-left">
                                <div className="tab-content">
                                    <h4 className="card-title">
                                        <strong>Số lượng đăng kí theo ngày</strong>
                                    </h4>
                                    <br/>
                                    <br/>
                                    <Barchart
                                        label={store.data.analytics.dates}
                                        data={[store.data.analytics.leadsCountByDates, store.data.analytics.leadsReachedCountByDates]}
                                        id="barchar_lead_by_date"
                                    />
                                    <br/>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>}
                {!isLoading && <div className="row gutter-20">
                    <div className="col-md-12">
                        <div className="card margin-top-10 margin-bottom-10">
                            <div className="card-content text-align-left">
                                <div className="tab-content">
                                    <h4 className="card-title">
                                        <strong>Số Lead chuyển đổi theo ngày</strong>
                                    </h4>
                                    <br/>
                                    <br/>
                                    <Barchart
                                        label={store.data.analytics.dates}
                                        data={[store.data.analytics.leadsComebackCountByDates, store.data.analytics.leadsComebackTwiceCountByDates]}
                                        id="barchar_lead_transfer_by_date"
                                    />
                                    <br/>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}