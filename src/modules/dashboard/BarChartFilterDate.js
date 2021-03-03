import React from 'react';
import PropTypes from 'prop-types';
import {Bar, Line} from "react-chartjs-2";
import _ from 'lodash';
import moment from "moment";
import {DATE_FORMAT,} from "../../constants/constants";
import Loading from "../../components/common/Loading";
import * as helper from "../../helpers/helper";
import ReactSelect from "react-select";

const filter = [
    {
        key: "date",
        value: "Ngày",
    },
    {
        key: "week",
        value: "Tuần",
    },
    {
        key: "month",
        value: "Tháng",
    },
    {
        key: "quarter",
        value: "Quý",
    },
    {
        key: "year",
        value: "Năm",
    }
];

const chartTypes = [
    {
        label: "Bar chart",
        value: "bar"
    }, {
        label: "Line chart",
        value: "line"
    }
]


class BarChartFilterDate extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentFilter: window.location.hostname.includes("ieg") ? "month" : "date",
            chartType: "bar"
        };
    }

    onChangeFilter = (filter) => {
        this.setState({
            currentFilter: filter
        });
    };

    downloadData = () => {
        let cols = [{"wch": 22}, {"wch": 22}, {"wch": 22}, {"wch": 22}, {"wch": 22}];//độ rộng cột

        let json = this.props.dates.map((item, index) => {
            let data = {
                "Ngày": item,
            };
            this.props.labels.forEach((itemlabel, indexLabel) => {
                data[itemlabel.label] = this.props.data[indexLabel][index];
            });
            return data;
        });
        let wb = helper.newWorkBook();
        helper.appendJsonToWorkBook(json, wb, 'Thống kê', cols, []);
        helper.saveWorkBookToExcel(wb,
            'Thông kê ' + this.props.fileNameDownload
        );
    }

    getLabels = (groupDates) => {

        switch (this.state.currentFilter) {
            case "date":
                return this.props.dates;
            case "week":
            case "month":
            case "quarter":
            case "year":
                return Object.keys(groupDates).map((key) => {
                    return groupDates[key][0] + " - " + groupDates[key][groupDates[key].length - 1];
                });
            default :
                return this.props.dates;
        }
    };

    getDataSet = (groupDates) => {
        let data = [];
        switch (this.state.currentFilter) {
            case "date":
                data = this.props.data;
                break;
            case "week":
            case "month":
            case "quarter":
            case "year":
                data = this.props.data.map((dataArray) => {
                    let firstIndex = 0;
                    return Object.keys(groupDates).map((key) => {
                        const newData = _.sumBy(dataArray.slice(firstIndex, firstIndex + groupDates[key].length), (item) => Number.parseFloat(item));
                        firstIndex = groupDates[key].length + firstIndex;
                        return newData;
                    });
                });
                break;
            default :
                data = this.props.data;
                break;
        }

        return this.props.labels.map((value, index) => {
            return {
                ...value,
                data: [...data[index]]
            };
        });
    }

    onChangeType = (value) => {
        const type = value ? value.value : 'bar';

        this.setState({chartType: type})
    }

    renderFilter = () => {
        const {currentFilter} = this.state;

        return (
            <div className="flex flex-wrap flex-space-between flex-row flex-align-items-center">
                {/*<div>*/}
                {/*    {this.props.children}*/}
                {/*</div>*/}
                <ul className="nav nav-pills nav-pills-dark" data-tabs="tabs"
                    style={{marginTop: 15, marginBottom: "15"}}>
                    {filter.map((item, index) => {
                        let className = currentFilter === item.key ? 'active' : '';
                        return (
                            <li className={className} key={index}>
                                <a onClick={() => this.onChangeFilter(item.key)}>
                                    {item.value}
                                </a>
                            </li>
                        );
                    })}
                    {/*<li>*/}
                    {/*    <TooltipButton placement="top" text={"Tải thống kê"}>*/}
                    {/*        <a onClick={this.downloadData}>*/}
                    {/*            <i className="material-icons" style={{padding: 0}}>*/}
                    {/*                cloud_download*/}
                    {/*            </i>*/}
                    {/*        </a>*/}
                    {/*    </TooltipButton>*/}
                    {/*</li>*/}
                </ul>
                <div style={{width: 130}}>
                    <ReactSelect
                        value={this.state.chartType}
                        options={chartTypes}
                        onChange={this.onChangeType}
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn biểu đồ"
                        clearable={false}
                    />
                </div>

            </div>
        );
    }

    render() {
        const {dateFormat, optionsBar, isLoading, height} = this.props;
        const {currentFilter} = this.state;

        if (isLoading) {
            return (
                <div>
                    {this.renderFilter()}
                    <Loading/>
                </div>);
        }

        const groupDates = _.groupBy(this.props.dates, (result) => moment(result, dateFormat).startOf(currentFilter));

        const dataSet = {
            labels: this.getLabels(groupDates),
            datasets: this.getDataSet(groupDates)
        };
        console.log({dataSet});
        return (
            <div>
                {this.renderFilter()}
                {this.state.chartType == 'line' ?
                    <Line
                        data={dataSet}
                        options={optionsBar}
                        height={height}
                    />
                    :
                    <Bar
                        data={dataSet}
                        options={optionsBar}
                        height={height}
                    />
                }

            </div>
        );
    }
}

BarChartFilterDate.defaultProps = {
    dateFilterFormat: DATE_FORMAT,
    fileNameDownload: ""
};

BarChartFilterDate.propTypes = {
    dates: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    dateFormat: PropTypes.string,
    fileNameDownload: PropTypes.string,
    optionsBar: PropTypes.object,
    isLoading: PropTypes.bool,
};

export default BarChartFilterDate;
