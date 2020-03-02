import React from 'react';
import DateRangePicker from "../../../components/common/DateTimePicker";
import {store} from "./DashBoardMarketingStore";
import ItemReactSelect from "../../../components/common/ItemReactSelect";
import ReactSelect from "react-select";
import moment from 'moment';
import * as baseActions from "../../../actions/baseActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as userActions from "../../../actions/userActions";

class DashboardLeadFilter extends React.Component {

    constructor(props, context) {
        super(props, context);

    }

    onChangeProvince = (value) => {
        const provinceId = value ? value.value : 0;
        userActions.choiceProvince(provinceId, false);
        let user = {...this.props.user};
        user.choice_province_id = provinceId;
        store.filter.choice_province_id = provinceId;
        localStorage.setItem("user", JSON.stringify(user));
        store.load();

    };

    onChangeBase = (value) => {
        const base_id = value ? value.value : 0;
        store.filter.base_id = base_id;
        this.props.baseActions.selectedBase(base_id);
        store.load();
    };

    getBasesData = () => {
        let {bases, user} = this.props;
        let basesData = bases ? bases.filter((base) => {
            if (user && user.choice_province_id > 0) {
                return base.district.province.id == user.choice_province_id;
            } else {
                return true;
            }
        }).map((base) => {
            return {value: base.id, label: base.name};
        }) : [];
        basesData = [{value: 0, label: "Tất cả cơ sở"}, ...basesData];
        return basesData;
    };
    getProvincesData = () => {
        let {provinces} = this.props;
        return [{value: 0, label: "Tất cả thành phố"}, ...provinces.map((province) => {
            return {value: province.id, label: province.name};
        })];
    };

    render() {
        let {filter} = store;
        let {selectedBaseId} = this.props;
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
                {/*<div className="col-md-3">*/}
                {/*    <ReactSelect*/}
                {/*        value={store.filter.base_id}*/}
                {/*        options={bases}*/}
                {/*        onChange={(e) => store.onChangeFilter('base_id', e)}*/}
                {/*        className="react-select-white-light-round cursor-pointer margin-bottom-20"*/}
                {/*        placeholder="Chọn cơ sở"*/}
                {/*        clearable={false}*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="col-md-3">
                    <ReactSelect.Async
                        loadOptions={(p1, p2) => store.loadStaffs(p1, p2, 'importers')}
                        loadingPlaceholder="Đang tải..."
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn nhân viên"
                        searchPromptText="Không có dữ liệu nhân viên"
                        onChange={(e) => store.onChangeFilter('imported_by', e)}
                        value={store.filter.importer}
                        id="select-async-importer"
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
                <div className="col-md-3">
                    <ReactSelect.Async
                        loadOptions={(p1, p2) => store.loadStaffs(p1, p2, 'staffs')}
                        loadingPlaceholder="Đang tải..."
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn nhân viên"
                        searchPromptText="Không có dữ liệu nhân viên"
                        onChange={(e) => store.onChangeFilter('carer_id', e)}
                        value={store.filter.carer}
                        id="select-async-carer"
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

                <div className="col-md-3">
                    <ReactSelect
                        value={store.filter.choice_province_id}
                        options={this.getProvincesData()}
                        onChange={this.onChangeProvince}
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn thành phồ"
                        clearable={false}
                    />
                </div>
                <div className="col-md-3">
                    <ReactSelect
                        value={selectedBaseId}
                        options={this.getBasesData()}
                        onChange={this.onChangeBase}
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn cơ sở"
                        clearable={false}
                    />
                </div>
                <div className="col-md-3">
                    <ReactSelect
                        value={filter.source_id}
                        options={store.getFilterOptions.sources}
                        onChange={(e) => store.onChangeFilter('source_id', e)}
                        // onChange={this.onChangeSource}
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn nguồn"
                        clearable={false}
                    />
                </div>
                <div className="col-md-3">
                    <ReactSelect
                        value={filter.campaign_id}
                        options={store.getFilterOptions.campaigns}
                        // onChange={this.onChangeCampaign}
                        onChange={(e) => store.onChangeFilter('campaign_id', e)}
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn chiến dịch"
                        clearable={false}
                    />
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        selectedBaseId: state.global.selectedBaseId,
        bases: state.global.bases,
        provinces: state.global.provinces,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        baseActions: bindActionCreators(baseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLeadFilter);
