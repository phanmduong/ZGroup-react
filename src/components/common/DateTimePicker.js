import React from "react";
import moment from "moment";
import DateTimeRangeContainer from "./datePicker/index";

class DateRangePicker extends React.Component {
    constructor(props) {
        super(props);
        let end, start;
        if (props.start && props.end) {
            start = props.start;
            end = props.end;
        } else {
            end = moment();
            start = moment().subtract(30, "days");
        }

        this.state = {
            start: start,
            end: end
        };

        this.onClick = this.onClick.bind(this);
        this.applyCallback = this.applyCallback.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.start != this.props.start) {
            this.setState({
                start: nextProps.start,
            });
        }
        if (nextProps.end != this.props.end) {
            this.setState({
                end: nextProps.end,
            });
        }
    }

    applyCallback(startDate, endDate) {
        console.log("ok");
        this.setState({
            start: startDate,
            end: endDate
        });
        this.props.onChange(startDate, endDate);
    }

    rangeCallback(index, value) {
        console.log(index, value);
    }

    onClick() {
        let newStart = moment(this.state.start).subtract(3, "days");
        // console.log("On Click Callback");
        // console.log(newStart.format("DD-MM-YYYY HH:mm"));
        this.setState({start: newStart});
    }

    render() {
        console.log("render");
        let now = new Date();
        let start = moment(
            new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
        );
        let end = moment(start)
            .add(1, "days")
            .subtract(1, "seconds");
        let ranges = {
            "Hôm nay": [moment(start), moment(end)],
            "Hôm qua": [
                moment(start).subtract(1, "days"),
                moment(end).subtract(1, "days")
            ],
            "3 ngày trước": [moment(start).subtract(3, "days"), moment(end)],
            "5 ngày trước": [moment(start).subtract(5, "days"), moment(end)],
            "1 tuần trước": [moment(start).subtract(7, "days"), moment(end)],
            "2 tuần trước": [moment(start).subtract(14, "days"), moment(end)],
            "1 tháng trước": [moment(start).subtract(1, "months"), moment(end)],
            "1 năm trước": [moment(start).subtract(1, "years"), moment(end)]
        };
        let local = {
            "format": "DD-MM-YYYY",
            "sundayFirst": false,
            days: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            months: [
                'Tháng 1',
                'Tháng 2',
                'Tháng 3',
                'Tháng 4',
                'Tháng 5',
                'Tháng 6',
                'Tháng 7',
                'Tháng 8',
                'Tháng 9',
                'Tháng 10',
                'Tháng 11',
                'Tháng 12',

            ],
            fromDate: 'Ngày bắt đầu',
            toDate: 'Ngày kết thúc',
            selectingFrom: 'Chọn ngày bắt đầu',
            selectingTo: 'Chọn ngày kết thúc',
            maxDate: 'Max Date',
            close: 'Đóng',
            apply: 'Áp dụng',
            cancel: 'Đóng',

        };
        let maxDate = moment(end).add(24, "hour");
        let value = `${this.state.start.format(
            "DD/MM/YYYY"
        )} - ${this.state.end.format("DD/MM/YYYY")}`;
        let {className, style} = this.props;
        className = className ? (` ${className}`) : '';
        return (
            <DateTimeRangeContainer
                ranges={ranges}
                start={this.state.start}
                end={this.state.end}
                local={local}
                maxDate={maxDate}
                applyCallback={this.applyCallback}
                rangeCallback={this.rangeCallback}
                descendingYears={false}
                years={[2015, 2025]}
                pastSearchFriendly
                style={{
                    betweenDates: {color: 'rgb(0,0,0)', backgroundColor: 'rgb(232,232,232)'},
                    fromDate: {color: 'rgb(255,255,255)', backgroundColor: 'rgb(168,168,168)'},
                    toDate: {color: 'rgb(255,255,255)', backgroundColor: 'rgb(168,168,168)'},
                    customRangeButtons: {backgroundColor: 'rgb(241,241,241)', color: 'black'},
                    customRangeSelected: {backgroundColor: 'rgb(168,168,168)', color: 'white'},
                }}
            >
                <div className={"date-range-picker" + className} style={style}>
                    <span className="date-picker">{value}</span>
                    <span className="Select-arrow-zone"><span className="Select-arrow"></span></span>
                </div>
            </DateTimeRangeContainer>
        );
    }
}

export default DateRangePicker;
