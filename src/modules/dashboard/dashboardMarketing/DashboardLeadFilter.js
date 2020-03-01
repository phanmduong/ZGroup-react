import React from 'react';
import DateRangePicker from "../../../components/common/DateTimePicker";
import {store} from "./DashBoardMarketingStore";
import ItemReactSelect from "../../../components/common/ItemReactSelect";
import ReactSelect from "react-select";
import moment from 'moment';
export default class DashboardLeadFilter extends React.Component {

    constructor(props, context) {
        super(props, context);

    }

    render() {
        let {filter} = store;

        return (

            <div className="gutter-20">

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
            </div>
        );
    }
}