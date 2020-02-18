import React from 'react';
import {observer} from 'mobx-react';
import {store} from "./DashBoardMarketingStore";
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
            <div className="row gutter-20">


                    <div className="col-md-3">
                        <DateRangePicker className="background-white padding-vertical-10px cursor-pointer"
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
                            className="react-select-white-light-round cursor-pointer"
                            placeholder="Chọn khóa"
                            clearable={false}
                        />
                    </div>
                    <div className="col-md-3">
                        <ReactSelect
                            value={store.filter.base_id}
                            options={store.getFilterOptions.bases}
                            onChange={(e) => store.onChangeFilter('base_id', e)}
                            className="react-select-white-light-round cursor-pointer"
                            placeholder="Chọn cơ sở"
                            clearable={false}
                        />
                    </div>
                    <div className="col-md-3">
                        <ReactSelect.Async
                            loadOptions={(p1, p2) => store.loadStaffs(p1, p2, true)}
                            loadingPlaceholder="Đang tải..."
                            className="react-select-white-light-round cursor-pointer"
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
                            <div className="card margin-top-20 margin-bottom-10">
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

            </div>
        );
    }
}