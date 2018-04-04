/**
 * Created by phanmduong on 11/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../../components/common/Select';
import * as summarySalesActions from './summarySalesActions';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import SummarySalesComponent from "./SummarySalesComponent";
import * as helper from '../../helpers/helper';
import FormInputDate from '../../components/common/FormInputDate';
import { Panel} from 'react-bootstrap';
import moment from "moment";
import {DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL} from '../../constants/constants';

class SummarySalesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectGenId: 0,
            selectBaseId: 0,
            gens: [],
            bases: [],
            time:{
                startTime: '',
                endTime: '',
            },
            openFilterPanel: false,
        };
        this.onChangeGen = this.onChangeGen.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.loadSummary = this.loadSummary.bind(this);
        this.openFilterPanel = this.openFilterPanel.bind(this);
        this.updateFormDate = this.updateFormDate.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
    }

    componentWillMount() {
        this.props.summarySalesActions.loadGensData();
        this.props.summarySalesActions.loadBasesData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingGens !== this.props.isLoadingGens && !nextProps.isLoadingGens) {
            this.setState({
                gens: this.getGens(nextProps.gens),
                selectGenId: nextProps.currentGen.id
            });
        }
        if (nextProps.isLoadingBases !== this.props.isLoadingBases && !nextProps.isLoadingBases) {
            this.setState({
                bases: this.getBases(nextProps.bases),
            });
        }
    }

    getGens(gens) {
        return gens.map(function (gen) {
            return {
                key: gen.id,
                value: 'Khóa ' + gen.name
            };
        });
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

    onChangeGen(value) {
        this.setState({selectGenId: value});
        this.props.summarySalesActions.loadSummarySalesData(value, this.state.selectBaseId, this.state.time.startTime,this.state.time.endTime);
    }

    onChangeBase(value) {
        this.setState({selectBaseId: value});
        this.props.summarySalesActions.loadSummarySalesData(this.state.selectGenId, value, this.state.time.startTime,this.state.time.endTime);
    }

    loadSummary() {
        this.props.summarySalesActions.loadSummarySalesData(this.state.selectGenId, this.state.selectBaseId);
    }

    openFilterPanel(){
        let newstatus = !this.state.openFilterPanel;
        this.setState({openFilterPanel: newstatus});
    }

    updateFormDate(event) {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;

        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.setState({time: time, page: 1});
            this.props.summarySalesActions.loadSummarySalesData(this.state.selectGenId, this.state.selectBaseId, time.startTime,time.endTime);
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
        let cols = [{ "wch": 5 },{ "wch": 20 },{ "wch": 20 },{ "wch": 20 },];
        helper.appendJsonToWorkBook(general, wb, 'Tổng quan', cols);

        let detail = this.props.summary.map((item, index) => {
            let res = {'STT': index + 1, 'Họ và tên': item.name};
            item.campaigns.forEach(obj => (res[obj.name] = obj['total_registers']));
            return res;
        });
        cols = [{ "wch": 5 },{ "wch": 20 }];
        helper.appendJsonToWorkBook(detail, wb, 'Chi tiết', cols);

        let base = this.state.bases.filter(base => (base.key === this.state.selectBaseId));
        let gen = this.state.gens.filter(gen => (gen.key === this.state.selectGenId));
        let startTime = moment(this.state.time.startTime, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
        let endTime = moment(this.state.time.endTime, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
        let empt1 =helper.isEmptyInput(this.state.time.startTime);
        let empt2 =helper.isEmptyInput(this.state.time.endTime);
        helper.saveWorkBookToExcel(wb,
            'Tổng kết sales' +
            ` - ${base[0].value === 'Tất cả' ? 'Tất cả cơ sở' : base[0].value}` +
            (
                (empt1 || empt2)
                    ? ` - ${gen[0].value}`
                    :
                    (`${helper.isEmptyInput(this.state.time.startTime) ? '' : (' - ' + startTime)}` +
                     `${helper.isEmptyInput(this.state.time.endTime)   ? '' : (' - ' + endTime)  }`)
            )
        );

    }

    render() {
        return (
            <div>
                {this.props.isLoadingGens || this.props.isLoadingBases ? <Loading/> :
                    (
                        <div>
                            <div className="row">
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn khóa học'}
                                        options={this.state.gens}
                                        // disableRound
                                        value={this.state.selectGenId}
                                        onChange={this.onChangeGen}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={this.state.bases}
                                        // disableRound
                                        value={this.state.selectBaseId}
                                        onChange={this.onChangeBase}
                                    />
                                </div>
                                <div className="col-sm-2 col-xs-5">
                                    <button
                                        style={{width: '100%'}}
                                        onClick={this.openFilterPanel}
                                        className="btn btn-info btn-rose btn-round"
                                    >
                                        <i className="material-icons">filter_list</i>
                                        Lọc
                                    </button>
                                </div>
                                <div className="col-sm-2 col-xs-5">
                                    <button
                                        onClick={this.props.isLoading ? ()=>{} :  this.exportExcel}
                                        className="btn btn-info btn-rose btn-round"
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
                                            <div className="card-content">
                                                <div className="tab-content">
                                                    <h4 className="card-title">
                                                        <strong>Bộ lọc</strong>
                                                    </h4>
                                                    <br/>
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

SummarySalesContainer.propTypes = {
    gens: PropTypes.array.isRequired,
    summarySalesActions: PropTypes.object.isRequired,
    currentGen: PropTypes.object.isRequired,
    bases: PropTypes.array.isRequired,
    summary: PropTypes.array.isRequired,
    isLoadingGens: PropTypes.bool.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loadSummarySalesData: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        gens: state.summarySales.gens,
        isLoadingGens: state.summarySales.isLoadingGens,
        currentGen: state.summarySales.currentGen,
        bases: state.summarySales.bases,
        summary: state.summarySales.summary,
        isLoadingBases: state.summarySales.isLoadingBases,
        isLoading: state.summarySales.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        summarySalesActions: bindActionCreators(summarySalesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummarySalesContainer);
