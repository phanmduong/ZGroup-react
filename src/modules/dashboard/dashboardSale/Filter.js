import React from 'react';
import {observer} from 'mobx-react';
import filterStore from "./filterStore";
import DateRangePicker from "../../../components/common/DateTimePicker";
import ItemReactSelect from "../../../components/common/ItemReactSelect";
import ReactSelect from "react-select";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import * as baseActions from "../../../actions/baseActions";
import {connect} from "react-redux";
import moment from "moment";
import Loading from "../../../components/common/Loading";
import {DATE_FORMAT_SQL} from "../../../constants/constants";

@observer
class Filter extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }

    changeDateRangePicker = (start_time, end_time) => {
        filterStore.filter = {...filterStore.filter, start_time, end_time, gen_id: 0};
        this.load();
    }

    onChangeGen = (value) => {
        const gen_id = value ? value.value : 0;

        if (value) {
            filterStore.filter.start_time = moment(value.start_time);
            filterStore.filter.end_time = moment(value.end_time);
        }

        filterStore.filter = {...filterStore.filter, gen_id};
        this.load();
    }

    onChangeBase = (value) => {
        const base_id = value ? value.value : 0;
        filterStore.filter = {...filterStore.filter, base_id};
        this.props.baseActions.selectedBase(base_id);
    }

    onChangeStaff = (value) => {
        const staff_id = value ? value.value : 0;
        filterStore.filter = {...filterStore.filter, staff_id, staff: value};
        this.load();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedBaseId !== this.props.selectedBaseId) {
            filterStore.filter = {...filterStore.filter, base_id: nextProps.selectedBaseId};
            this.load();
        }
    }

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
        basesData = [{value: 0, label: "Tất cả"}, ...basesData];
        return basesData;
    }

    load = () => {
        const filter = {...filterStore.filter};
        filter.start_time = filterStore.filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filterStore.filter.end_time.format(DATE_FORMAT_SQL);
        this.props.loadData(filter);
    }


    render() {
        let {filter, gensData, isLoading} = filterStore;
        let {selectedBaseId} = this.props;
        if (isLoading) return (
            <div className="row gutter-20 margin-top-20">
                <Loading/>
            </div>
        );
        return (
            <div className="row gutter-20 margin-top-20">
                <div className="col-md-3">
                    <DateRangePicker
                        className="background-white padding-vertical-10px cursor-pointer margin-bottom-20"
                        start={filter.start_time} end={filter.end_time}
                        style={{padding: '5px 10px 5px 20px', lineHeight: '34px'}}
                        onChange={this.changeDateRangePicker}
                    />
                </div>
                <div className="col-md-3">
                    <ReactSelect
                        value={filter.gen_id}
                        options={gensData}
                        onChange={this.onChangeGen}
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn khóa"
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
                    <ReactSelect.Async
                        loadOptions={(p1, p2) => filterStore.loadStaffs(p1, p2, true)}
                        loadingPlaceholder="Đang tải..."
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn nhân viên"
                        searchPromptText="Không có dữ liệu nhân viên"
                        onChange={this.onChangeStaff}
                        value={filter.staff}
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

Filter
    .propTypes = {
    selectedBaseId: PropTypes.number,
    baseActions: PropTypes.object,
    loadData: PropTypes.func.render,
    user: PropTypes.object,
};

function

mapStateToProps(state) {
    return {
        selectedBaseId: state.global.selectedBaseId,
        bases: state.global.bases,
        user: state.login.user,
    };
}

function

mapDispatchToProps(dispatch) {
    return {
        baseActions: bindActionCreators(baseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);