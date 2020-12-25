/**
 * Created by phanmduong on 9/6/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from '../../components/common/Loading';
import Search from '../../components/common/Search';
import * as historyCollectMoneyActions from './historyCollectMoneyActions';
import ListRegister from './ListRegister';
import PropTypes from 'prop-types';
import Pagination from "../../components/common/Pagination";
import DateRangePicker from "../../components/common/DateTimePicker";
import moment from "moment";
import {DATE_FORMAT_SQL} from "../../constants/constants";
import {
    appendJsonToWorkBook,
    dotNumber,
    newWorkBook,
    renderExcelColumnArray,
    saveWorkBookToExcel
} from "../../helpers/helper";

class HistoryCollectMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            openFilterPanel: false,
            page: 1,
            search: "",
            collectorId: '',
            start_time: moment().subtract(30, 'days'),
            end_time: moment(),
        };
        this.timeOut = null;
        this.registersSearchChange = this.registersSearchChange.bind(this);
        this.loadHistoryCollectMoneyByCollector = this.loadHistoryCollectMoneyByCollector.bind(this);
    }

    componentWillMount() {
        this.load(this.state);
    }

    registersSearchChange(value) {
        this.setState({
            page: 1,
            search: value,
            collectorId: ''
        });
        // if (this.timeOut !== null) {
        //     clearTimeout(this.timeOut);
        // }
        // this.timeOut = setTimeout(function () {
        //     this.props.historyCollectMoneyActions.historyCollectMoney(this.state.search, this.state.page);
        // }.bind(this), 500);
    }

    onRegistersSearchChange = () => {
        this.load(this.state);

    }

    // loadHistoryCollectMoney(page = 1) {
    //     this.setState({page});
    //     this.load(this.state);
    // }

    loadHistoryCollectMoneyByCollector(collectorId) {
        this.setState({
            page: 1,
            search: '',
            collectorId,
        });
        this.load({
            ...this.state,
            search:'',
            page:1, 
            collectorId
            });
    }

    openFilterPanel = () => {
        this.setState({openFilterPanel: !this.state.openFilterPanel});
    }

    changeDateRangePicker = (start_time, end_time) => {
        if (this.props.isLoading) return;
        this.setState({start_time, end_time});
        this.load({
            ...this.state,
            start_time, end_time
        })

    };

    load = (filter) => {
        this.props.historyCollectMoneyActions.historyCollectMoney({
            ...filter,
            start_time: filter.start_time.format(DATE_FORMAT_SQL),
            end_time: filter.end_time.format(DATE_FORMAT_SQL)
        });
    }


    exportExcel = async (input) => {

        // let res = await historyCollectMoney({
        //     ...this.state,
        //     start_time: this.state.start_time.format(DATE_FORMAT_SQL),
        //     end_time: this.state.end_time.format(DATE_FORMAT_SQL),
        //     limit: -1
        // });
        // console.log(res);
        // return;
        let wb = newWorkBook();
        let data;
        let cols = [5, 30, 20, 30, 30, 15, 20]; //độ rộng cột

        data = input.map((item, index) => {
            /* eslint-disable */
            let res = {
                STT: index + 1,
                "Tên sản phẩm": item.name || "Không tên",
                Giá: dotNumber(item.price) || "Không có",
                "Mã sản phẩm": item.code || "Không có",
                Barcode: item.barcode || "Không có",
                "Số lượng": item.quantity || 0
            };
            if (item.properties) {
                res = {...res, "Thuộc tính =>": ""};
                item.properties.forEach(e => {
                    res = {...res, [e.name]: e.value || ""};
                    let len = Math.max(
                        e.name ? e.name.length : 0,
                        e.value ? e.value.length : 0
                    );
                    cols = [...cols, len + 5];
                });
            }
            /* eslint-enable */
            return res;
        });

        appendJsonToWorkBook(
            data,
            wb,
            "Danh sách học viên nộp tiền",
            renderExcelColumnArray(cols)
        );

        //xuất file
        saveWorkBookToExcel(wb,
            (input && input.length > 0 && input[0].name) ? input[0].name : "Thông tin sản phẩm");
    };

    render() {
        return (
            <div className="container-fluid">
                {/*<div className="card">*/}
                {/*    <div className="card-content">*/}
                {/*        <div className="tab-content">*/}
                <h4 className="card-title">
                    <strong>Danh sách học viên đã nộp tiền</strong>
                </h4>
                {/*            <Search*/}
                {/*                onChange={this.registersSearchChange}*/}
                {/*                value={this.state.search}*/}
                {/*                placeholder="Tìm kiếm học viên"*/}
                {/*            />*/}
                <div className="flex flex-space-between">
                    <div className="flex flex-wrap tool-bar-actions">
                        <Search
                            onChange={this.registersSearchChange}
                            value={this.state.search}
                            placeholder="Tìm kiếm học viên"
                            className="white-seacrh margin-right-10 margin-right-10 min-width-200-px form-group-none-padding"
                            onSearch={this.onRegistersSearchChange}
                            disabled={this.props.isLoading}
                        />
                        <DateRangePicker
                            className="background-white cursor-pointer margin-top-10"
                            start={this.state.start_time} end={this.state.end_time}
                            style={{padding: '5px 10px 5px 20px', lineHeight: '33px'}}
                            onChange={this.changeDateRangePicker}
                        />
                        <div
                            onClick={this.exportExcel}
                            className="btn btn-white btn-icon"
                            style={{padding: "12px 20px", height: 42, margin: '10px 10px 0 10px'}}
                            disabled={this.props.isLoading}
                        ><span className="material-icons">get_app</span>&nbsp;&nbsp;&nbsp;&nbsp;Tải xuống
                        </div>
                    </div>
                </div>
                {this.props.isLoading ? <Loading/> :
                    <div>
                        <ListRegister
                            registers={this.props.registers}
                            loadHistoryCollectMoneyByCollector={this.loadHistoryCollectMoneyByCollector}
                        />
                        <div style={{
                            float: "right"
                        }}>
                            <Pagination
                                totalPages={this.props.totalPages}
                                currentPage={this.state.page}
                                loadDataPage={this.loadHistoryCollectMoney}
                            />
                        </div>

                    </div>
                }
                {/*</div>    */}
                {/*</div>*/}
                {/*</div>*/}
            </div>
        );
    }
}

HistoryCollectMoneyContainer.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    registers: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    historyCollectMoneyActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        currentPage: state.historyCollectMoney.currentPage,
        totalPages: state.historyCollectMoney.totalPages,
        registers: state.historyCollectMoney.registers,
        isLoading: state.historyCollectMoney.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        historyCollectMoneyActions: bindActionCreators(historyCollectMoneyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCollectMoneyContainer);
