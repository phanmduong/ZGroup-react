import React from 'react';
import {observer} from 'mobx-react';
import filterStore from "./filterStore";
import DateRangePicker from "../../components/common/DateTimePicker";
import ReactSelect from "react-select";
import PropTypes from "prop-types";
import moment from "moment";
import Loading from "../../components/common/Loading";
import {DATE_FORMAT_SQL} from "../../constants/constants";

@observer
class Filter extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        filterStore.loadData(() => {
            this.load();
        });
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

    load = () => {
        const filter = {...filterStore.filter};
        filter.start_time = filterStore.filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filterStore.filter.end_time.format(DATE_FORMAT_SQL);
        this.props.loadData(filter);
    }


    render() {
        let {filter, gensData, isLoading} = filterStore;
        if (isLoading) return (
            <div className="flex flex-align-items-center flex-wrap none-padding">
                <Loading/>
            </div>
        );
        return (
            <div className="flex flex-align-items-center flex-wrap card-filter none-padding">
                <DateRangePicker
                    className="padding-vertical-10px cursor-pointer margin-bottom-20"
                    start={filter.start_time} end={filter.end_time}
                    style={{padding: '5px 10px 5px 20px', lineHeight: '34px'}}
                    onChange={this.changeDateRangePicker}
                />
                <div style={{width: 180, marginLeft: 20}}>
                    <ReactSelect
                        value={filter.gen_id}
                        options={gensData}
                        onChange={this.onChangeGen}
                        className="cursor-pointer margin-bottom-20"
                        placeholder="Chọn khóa"
                        clearable={false}
                    />
                </div>

            </div>
        );
    }
}

Filter.propTypes = {
    loadData: PropTypes.func,
};


export default Filter;
