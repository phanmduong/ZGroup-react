/**
 * Created by kiyoshitaro on 02/25/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as summarySalesActions from './summarySalesActions';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import SummarySalesComponent from "./SummarySalesComponent";
import * as helper from '../../helpers/helper';
import FormInputDate from '../../components/common/FormInputDate';
import {Panel} from 'react-bootstrap';
import moment from "moment";
import {DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL} from '../../constants/constants';
import SelectMonthBox from "../../components/common/SelectMonthBox";

class SummarySalesUpContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectBaseId: 0,
            bases: [],
            time: {
                startTime: '',
                endTime: '',
            },
            isShowMonthBox: false,
            openFilterPanel: false,
            month: {year: 0, month: 0},
        };
        this.onChangeBase = this.onChangeBase.bind(this);
        this.openFilterPanel = this.openFilterPanel.bind(this);
        this.updateFormDate = this.updateFormDate.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.handleClickMonthBox = this.handleClickMonthBox.bind(this);
        this.handleAMonthChange = this.handleAMonthChange.bind(this);
        this.handleAMonthDismiss = this.handleAMonthDismiss.bind(this);
    }

    componentWillMount() {
        this.props.summarySalesActions.loadBasesData();
        this.props.summarySalesActions.loadSummarySalesData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingBases !== this.props.isLoadingBases && !nextProps.isLoadingBases) {
            this.setState({
                bases: this.getBases(nextProps.bases),
            });
        }
    }


    getBases(bases) {
        let baseData = bases.map(function (base) {
            return {
                key: base.id,
                value: base.name
            };
        });
        this.setState({selectBaseId: 0});
        return [{
            key: 0,
            value: 'Tất cả'
        }, ...baseData];
    }

    handleClickMonthBox() {
        this.setState({isShowMonthBox: true});
    }

    handleAMonthChange(value) {
        let startTime = value.year + "-" + value.month + "-01";
        let endTime;
        if (value.month !== 12) {
            endTime = value.year + "-" + (value.month + 1) + "-01";
        }
        else endTime = value.year + 1 + "-01" + "-01";
        this.props.summarySalesActions.loadSummarySalesData(
            this.state.selectBaseId,
            startTime,
            endTime,
            () => this.setState({month: value}),
        );
        let time = {...this.state.time};
        time["startTime"] = startTime;
        time["endTime"] = endTime;
        this.setState({time: time});
        this.handleAMonthDismiss();
    }

    handleAMonthDismiss() {
        this.setState({isShowMonthBox: false});
    }


    onChangeBase(value) {
        this.setState({selectBaseId: value});
        this.props.summarySalesActions.loadSummarySalesData(value, this.state.time.startTime, this.state.time.endTime);
    }


    openFilterPanel(){
        let newstatus = !this.state.openFilterPanel;
        this.setState({openFilterPanel: newstatus, isShowMonthBox: false});
    }

    updateFormDate(event) {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;

        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.setState({time: time, page: 1, month: {year: 0, month: 0}});
            this.props.summarySalesActions.loadSummarySalesData(this.state.selectBaseId, time.startTime, time.endTime);
        } else {
            this.setState({time: time});
        }
    }

    exportExcel() {
        let wb = helper.newWorkBook();
        let general = this.props.summary.map((item, index) => {
            /* eslint-disable */
            return {
                'STT': index + 1,
                'Họ và tên': item.name,
                'Số lượng đã nộp tiền': item.total_paid_registers,
                'Số lượng đăng kí': item.total_registers,
            };
            /* eslint-enable */
        });
        let cols = [{"wch": 5}, {"wch": 20}, {"wch": 20}, {"wch": 20},];
        helper.appendJsonToWorkBook(general, wb, 'Tổng quan', cols);

        let detail = this.props.summary.map((item, index) => {
            let res = {'STT': index + 1, 'Họ và tên': item.name};
            item.campaigns.forEach(obj => (res[obj.name] = obj['total_registers']));
            return res;
        });
        cols = [{"wch": 5}, {"wch": 20}];
        helper.appendJsonToWorkBook(detail, wb, 'Chi tiết', cols);

        let base = this.state.bases.filter(base => (base.key === this.state.selectBaseId));
        let startTime = moment(this.state.time.startTime, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
        let endTime = moment(this.state.time.endTime, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
        let empt1 = helper.isEmptyInput(this.state.time.startTime);
        let empt2 = helper.isEmptyInput(this.state.time.endTime);
        helper.saveWorkBookToExcel(wb,
            'Tổng kết sales' +
            ` - ${base[0].value === 'Tất cả' ? 'Tất cả cơ sở' : base[0].value}` +
            (
                (empt1 || empt2)
                    ? ` - ${gen[0].value}`         // *********************************** ///
                    :
                    (`${helper.isEmptyInput(this.state.time.startTime) ? '' : (' - ' + startTime)}` +
                        `${helper.isEmptyInput(this.state.time.endTime) ? '' : (' - ' + endTime)  }`)
            )
        );

    }

    render() {
        return (
            <div>
                {this.props.isLoadingBases || this.props.isLoading ? <Loading/> :
                    (
                        <div>
                            <div className="row">
                                <div className="col-sm-3 col-xs-5">
                                    <SelectMonthBox
                                        theme="light"
                                        isHide={this.state.openFilterPanel}
                                        value={this.state.month}
                                        onChange={this.handleAMonthChange}
                                        isAuto={false}
                                        isShowMonthBox={this.state.isShowMonthBox}
                                        openBox={this.handleClickMonthBox}
                                        closeBox={this.handleAMonthDismiss}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-5">
                                    {/*<Select*/}
                                        {/*defaultMessage={'Chọn cơ sở'}*/}
                                        {/*options={this.state.bases}*/}
                                        {/*disableRound*/}
                                        {/*value={this.state.selectBaseId}*/}
                                        {/*onChange={this.onChangeBase}*/}
                                    {/*/>*/}
                                </div>
                                <div className="col-sm-2 col-xs-5">
                                    {
                                        this.state.isShowMonthBox ?
                                                <button
                                                    style={{width: '100%'}}
                                                    className="btn btn-info btn-rose disabled"
                                                >
                                                    <i className="material-icons disabled">filter_list</i>
                                                    Lọc
                                                </button>
                                            :
                                                <button
                                                    style={{width: '100%'}}
                                                    onClick={this.openFilterPanel}
                                                    className="btn btn-info btn-rose "
                                                >
                                                    <i className="material-icons">filter_list</i>
                                                    Lọc
                                                </button>
                                    }
                                </div>
                                <div className="col-sm-2 col-xs-5">
                                    <button
                                        onClick={this.props.isLoading ? () => {
                                        } : this.exportExcel}
                                        className="btn btn-info btn-rose"
                                        disabled={this.props.isLoading}
                                    >
                                        Xuất ra excel
                                    </button>
                                </div>
                            </div>
                            <Panel collapsible expanded={this.state.openFilterPanel}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header card-header-icon" data-background-color="rose">
                                                <i className="material-icons">filter_list</i>
                                            </div>
                                            <div className="card-content">
                                                <h4 className="card-title">Bộ lọc
                                                    <small/>
                                                </h4>
                                                <div className="row">
                                                    <div className="col-md-3 col-xs-5">
                                                        <FormInputDate
                                                            label="Từ ngày"
                                                            name="startTime"
                                                            updateFormData={this.updateFormDate}
                                                            id="form-start-time"
                                                            value={this.state.time.startTime}
                                                            maxDate={this.state.time.endTime}
                                                        />
                                                    </div>
                                                    <div className="col-md-3 col-xs-5">
                                                        <FormInputDate
                                                            label="Đến ngày"
                                                            name="endTime"
                                                            updateFormData={this.updateFormDate}
                                                            id="form-end-time"
                                                            value={this.state.time.endTime}
                                                            minDate={this.state.time.startTime}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Panel>

                            <SummarySalesComponent
                                {...this.props}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

SummarySalesUpContainer.propTypes = {
    summarySalesActions: PropTypes.object.isRequired,
    bases: PropTypes.array.isRequired,
    summary: PropTypes.array.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        bases: state.summarySalesUp.bases,
        summary: state.summarySalesUp.summary,
        isLoadingBases: state.summarySalesUp.isLoadingBases,
        isLoading: state.summarySalesUp.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        summarySalesActions: bindActionCreators(summarySalesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummarySalesUpContainer);
