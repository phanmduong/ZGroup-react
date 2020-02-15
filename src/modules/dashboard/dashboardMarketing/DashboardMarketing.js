import React from 'react';
import ReactSelect from "react-select";
import {IndexLink, Link} from 'react-router';
import {HISTORY_CARE_TYPES} from "../../../constants/constants";
import DateRangePicker from "../../../components/common/DateTimePicker";
import moment from "moment";

export default class DashboardMarketing extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [{

                key: "",
                value: "Tất cả"
            }, {

                key: "-2",
                value: "Không có nhân viên",
            }, {

                key: "-1",
                value: "Có nhân viên",
            }],
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
        this.numbers = [0, 1, 2, 3];
    }


    render() {
        this.path = this.props.location.pathname;
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
                <div className="row margin-top-20 gutter-20">

                    <div className="col-md-3">
                        <DateRangePicker className="background-white padding-vertical-10px"
                                         start={moment().subtract(30, "days")} end={moment()}
                                         style={{padding: '5px 15px', lineHeight: '34px'}}
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

                </div>
                <div className="row gutter-20">
                    {this.numbers.map(() => {
                        return (
                            <div className="col-md-3">
                                <div className="card margin-top-20 margin-bottom-10">
                                    <div className="card-content text-align-left">
                                        <p className="category">Doanh thu</p>
                                        <h3 className="card-title">123</h3>
                                        <div
                                            className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400">
                                            Xem chi tiết
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="row gutter-20">
                    <div className="col-md-12">
                        <div className="card margin-top-10 margin-bottom-10">
                        <div className="card-content text-align-left">
                            <div style={{height:500}}/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}