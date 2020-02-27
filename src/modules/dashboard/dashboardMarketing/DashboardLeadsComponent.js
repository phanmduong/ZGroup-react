import React from 'react';
import {observer} from 'mobx-react';
import {store} from "./DashBoardMarketingStore";
import Barchart from "../Barchart";
import DateRangePicker from "../../../components/common/DateTimePicker";
import ItemReactSelect from "../../../components/common/ItemReactSelect";
import ReactSelect from "react-select";
import moment from "moment";

@observer
export default class DashboardLeadsComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            filter: {}
        };
        // this.routePrefix = `/dashboard/marketing`;

        this.cardDatas = [
            {title: 'Số Lead mới', field: 'leadsCountByDates', url: ''},
            {title: 'Số Lead đã tiếp cận', field: 'leadsReachedCountByDates', url: ''},
            {title: 'Số Lead đã chuyển đổi', field: 'leadsComebackCountByDates', url: ''},
            {title: 'Số Lead quay lại', field: 'leadsComebackTwiceCountByDates', url: ''},
        ];
    }

    componentDidMount() {
        store.pathname = this.props.location.pathname;
    }


    render() {
        this.path = this.props.location.pathname;
        let {isLoading, filter} = store;

        return (
            <div className="row gutter-20 margin-top-20">


                <div className="col-md-3">
                    <DateRangePicker className="background-white padding-vertical-10px cursor-pointer margin-bottom-20"
                                     start={moment(filter.start_time)} end={moment(filter.end_time)}
                                     style={{padding: '5px 10px 5px 20px', lineHeight: '34px'}}
                                     onChange={store.changeDateRangePicker}

                    />
                </div>
                <div className="col-md-3">
                    <ReactSelect
                        value={store.filter.gen_id}
                        options={store.getFilterOptions.gens}
                        onChange={(e) => store.onChangeFilter('gen_id', e)}
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn khóa"
                        clearable={false}
                    />
                </div>
                <div className="col-md-3">
                    <ReactSelect
                        value={store.filter.base_id}
                        options={store.getFilterOptions.bases}
                        onChange={(e) => store.onChangeFilter('base_id', e)}
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn cơ sở"
                        clearable={false}
                    />
                </div>
                <div className="col-md-3">
                    <ReactSelect.Async
                        loadOptions={(p1, p2) => store.loadStaffs(p1, p2, true)}
                        loadingPlaceholder="Đang tải..."
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn nhân viên"
                        searchPromptText="Không có dữ liệu nhân viên"
                        onChange={(e) => store.onChangeFilter('carer_id', e)}
                        value={store.filter.carer}
                        optionRenderer={(option) => {
                            return (
                                <ItemReactSelect label={option.label}
                                                 url={option.avatar_url}/>
                            );
                        }}
                        valueRenderer={(option) => {
                            return (
                                <ItemReactSelect label={option.label}
                                                 url={option.avatar_url}/>
                            );
                        }}
                    />
                </div>


                {!isLoading &&
                this.cardDatas.map((card) => {
                    return (
                        <div className="col-md-3">
                            <div className="card margin-bottom-20 margin-top-0">
                                <div className="card-content text-align-left">
                                    <p className="category">{card.title}</p>
                                    <h3 className="card-title">{store.getSumArray(card.field) || 0}</h3>
                                    <div
                                        className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400 cursor-pointer">
                                        Xem chi tiết
                                    </div>
                                </div>

                            </div>
                        </div>
                    );
                })
                }
                {!isLoading &&
                <div className="col-md-12">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <div className="tab-content">
                                <h4 className="card-title">
                                    <strong>Số lượng đăng kí theo ngày</strong>
                                </h4>
                                <br/>
                                <br/>
                                {this.cardDatas.map((card, key) => {
                                    let val = store.getSumArray(card.field) || 0;
                                    let total = store.getSumArray('leadsCountByDates') || 0;
                                    return (
                                        <div className="margin-top-20 margin-bottom-20" key={key}>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="text-align-left">
                                                        <div>{card.title}</div>
                                                        <h3 className="card-title">{val}</h3>
                                                        <div
                                                            className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400 cursor-pointer">
                                                            Xem chi tiết
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
                                                    <div className="progress  progress-bar-dashboard-marketing">
                                                        <div className="progress-bar progress-bar-success"
                                                             role="progressbar"
                                                             aria-valuenow="60"
                                                             aria-valuemin="0"
                                                             aria-valuemax="100"
                                                             style={{
                                                                 width: Math.max(val / total * 100, 0.1) + '%',
                                                                 opacity: (1 - key / 5)
                                                             }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    );
                                })}
                                <br/>

                            </div>
                        </div>

                    </div>
                </div>}
                {!isLoading &&
                <div className="col-md-12">
                    <div className="card margin-bottom-20 margin-top-0">
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
                }
                {!isLoading &&
                <div className="col-md-12">
                    <div className="card margin-bottom-20 margin-top-0">
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
                }
            </div>
        );
    }
}
