/**
 * Created by kiyoshitaro on 02/25/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import Select from '../../components/common/Select';
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
import Select from "../../components/common/Select";

class SummarySalesRoomContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        let time = new Date;
        let year = time.getFullYear();
        let month = time.getMonth();
        let startTime = year + "-" + month + "-01";
        let endTime;
        if (month !== 12) {
            endTime = year + "-" + (month + 1) + "-01";
        }
        else {
            endTime = year + 1 + "-01" + "-01";
        }
        this.state = {
            baseId: 0,
            bases: [],
            startTime: startTime,
            endTime: endTime,
            isSelectDate: true,
            isShowMonthBox: false,
            openFilterPanel: false,
            month: {year: year, month: month},
        };


        this.openFilterPanel = this.openFilterPanel.bind(this);
        this.updateFormDate = this.updateFormDate.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.handleClickMonthBox = this.handleClickMonthBox.bind(this);
        this.handleAMonthChange = this.handleAMonthChange.bind(this);
        this.handleAMonthDismiss = this.handleAMonthDismiss.bind(this);
        this.loadSummary = this.loadSummary.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
    }

    componentWillMount() {
        let time = new Date;
        let startTime = time.getFullYear() + "-" + time.getMonth() + "-01";
        let endTime;
        if (time.getMonth() !== 12) {
            endTime = time.getFullYear() + "-" + (time.getMonth() + 1) + "-01";
        }
        else {
            endTime = time.getFullYear() + 1 + "-01" + "-01";
        }
        this.loadSummary(
            startTime, endTime
        );
        this.props.summarySalesActions.loadBases();
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps.bases,'wwwwwwwwwwwwwwwww');
    //     if ( nextProps.isLoadingBases !==this.props.isLoadingBases && !nextProps.isLoadingBases) {
    //         this.setState({
    //             bases: this.getBases(nextProps.bases)
    //         });
    //         console.log( this.state.bases, "qqqqqqqqqqqqqqq");
    //     }
    // }


    // getBases(bases) {
    //     let options = bases.map((base) => {
    //         return {
    //             key: base.id,
    //             value: base.name,
    //         };
    //     });
    //     this.setState({baseId : 0});
    //     return [{key: null, value: "Tất cả"}, ...options];
    // }

    onChangeBase(baseId){
        this.setState({baseId});
        this.props.summarySalesActions.loadSummarySalesData(this.state.startTime,this.state.endTime,baseId);
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
        else {
            endTime = value.year + 1 + "-01" + "-01";
        }
        this.props.summarySalesActions.loadSummarySalesData(
            startTime,
            endTime,
            this.state.baseId,
            () => this.setState({month: value, isSelectDate: true}),
        );
        this.setState({startTime, endTime, isSelectDate: false});
        this.handleAMonthDismiss();
    }

    handleAMonthDismiss() {
        this.setState({isShowMonthBox: false});
    }


    openFilterPanel() {
        let newstatus = !this.state.openFilterPanel;
        this.setState({openFilterPanel: newstatus, isShowMonthBox: false});
    }

    updateFormDate(event) {
        if (this.state.isSelectDate) {
            if (event.target.name === "startTime") {
                let startTime = event.target.value;
                if (!helper.isEmptyInput(this.state.startTime) && !helper.isEmptyInput(this.state.endTime)) {
                    this.setState({startTime: startTime, page: 1, month: {year: 0, month: 0}, isSelectDate: false});
                    this.props.summarySalesActions.loadSummarySalesData(startTime, this.state.endTime,this.state.baseId,
                        () => this.setState({isSelectDate: true}),
                    );
                } else {
                    this.setState({startTime: startTime, isSelectDate: false});
                }
            }
            else {
                let endTime = event.target.value;
                if (!helper.isEmptyInput(this.state.endTime) && !helper.isEmptyInput(this.state.endTime)) {
                    this.setState({endTime: endTime, page: 1, month: {year: 0, month: 0}, isSelectDate: false});
                    this.props.summarySalesActions.loadSummarySalesData(this.state.startTime, endTime,this.state.baseId,
                        () => this.setState({isSelectDate: true}),
                    );
                } else {
                    this.setState({endTime: endTime, isSelectDate: false});
                }
            }
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

        // let base = this.state.bases.filter(base => (base.key === this.state.selectBaseId));
        let startTime = moment(this.state.startTime, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
        let endTime = moment(this.state.endTime, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);

        helper.saveWorkBookToExcel(wb,
            'Tổng kết sales' +
            // ` - ${base[0].value === 'Tất cả' ? 'Tất cả cơ sở' : base[0].value}` +
            (
                // (empt1 || empt2)
                //     ?null         // *********************************** ///
                //     :
                (`${helper.isEmptyInput(this.state.startTime) ? '' : (' - ' + startTime)}` +
                    `${helper.isEmptyInput(this.state.endTime) ? '' : (' - ' + endTime)  }`)
            )
        );

    }

    loadSummary(startTime = this.state.startTime, endTime = this.state.endTime) {
        this.props.summarySalesActions.loadSummarySalesData(
            startTime, endTime,
        );
    }

    render() {
        console.log(this.state.bases,"saaaaaaaaaaaaaa");
        return (
            <div>
                {
                    this.props.isLoading && this.props.isLoadingBases  ? <Loading/> :
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
                                    <div className="col-sm-3 col-xs-5">
                                        <Select
                                            defaultMessage={'Chọn cơ sở'}
                                            options={this.props.bases}
                                            disableRound
                                            value={this.state.baseId}
                                            onChange={this.onChangeBase}
                                        />
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
                                                <div className="card-header card-header-icon"
                                                     data-background-color="rose">
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
                                                                value={this.state.startTime}
                                                                maxDate={this.state.endTime}
                                                            />
                                                        </div>
                                                        <div className="col-md-3 col-xs-5">
                                                            <FormInputDate
                                                                label="Đến ngày"
                                                                name="endTime"
                                                                updateFormData={this.updateFormDate}
                                                                id="form-end-time"
                                                                value={this.state.endTime}
                                                                minDate={this.state.startTime}
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
                                    loadSummary={this.loadSummary}
                                />
                            </div>
                        )
                }
            </div>
        );
    }
}

SummarySalesRoomContainer.propTypes = {
    summarySalesActions: PropTypes.object.isRequired,
    summary: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    bases: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        summary: state.summarySalesRoom.summary,
        isLoadingBases: state.summarySalesRoom.isLoadingBases,
        isLoading: state.summarySalesRoom.isLoading,
        bases: state.summarySalesRoom.bases,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        summarySalesActions: bindActionCreators(summarySalesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummarySalesRoomContainer);
