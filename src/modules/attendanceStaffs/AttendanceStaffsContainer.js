/**
 * Created by phanmduong on 12/7/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as attendanceStaffsActions from './attendanceStaffsActions';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import * as helper from '../../helpers/helper';
import FormInputDate from '../../components/common/FormInputDate';
import {Panel} from 'react-bootstrap';
import Select from '../../components/common/Select';
import StatisticAttendanceStaffs from "./StatisticAttendanceStaffs";
import {DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";
import moment from "moment";

class AttendanceStaffsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectGenId: 0,
            selectBaseId: 0,
            gens: [],
            bases: [],
            time: {
                startTime: '',
                endTime: '',
            },
            openFilterPanel: false,
        };
        this.onChangeGen = this.onChangeGen.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.openFilterPanel = this.openFilterPanel.bind(this);
        this.updateFormDate = this.updateFormDate.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.loadStatistic = this.loadStatistic.bind(this);
        this.setData = this.setData.bind(this);
    }

    setData(salesMakerings, teachers) {
        this.salesMaketings = salesMakerings;
        this.teachers = teachers;
    }

    componentWillMount() {
        this.props.attendanceStaffsActions.loadGensData();
        this.props.attendanceStaffsActions.loadBasesData();
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

    loadStatistic() {
        this.props.attendanceStaffsActions.loadStatisticAttendanceStaffs(this.state.selectGenId, this.state.selectBaseId,
            this.state.time.startTime, this.state.time.endTime);
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
        this.props.attendanceStaffsActions.loadStatisticAttendanceStaffs(value, this.state.selectBaseId,
            this.state.time.startTime, this.state.time.endTime);
    }

    onChangeBase(value) {
        this.setState({selectBaseId: value});
        this.props.attendanceStaffsActions.loadStatisticAttendanceStaffs(this.state.selectGenId, value,
            this.state.time.startTime, this.state.time.endTime);
    }

    openFilterPanel() {
        let newstatus = !this.state.openFilterPanel;
        this.setState({openFilterPanel: newstatus});
    }

    updateFormDate(event) {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;

        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.setState({time: time, page: 1});
            this.props.attendanceStaffsActions.loadStatisticAttendanceStaffs(this.state.selectGenId, this.state.selectBaseId,
                time.startTime, time.endTime);
        } else {
            this.setState({time: time});
        }
    }

    convertDataGeneral(data) {
        return data && data.length > 0 ? data.map((item, index) => {
            let staff = item.attendances[0].user;
            return {
                'STT': index + 1,
                'Họ và tên': staff.name,
                'Đi làm': item.total_attendance,
                'Đúng luật': item.total_lawful,
                'Bỏ làm': item.total_not_work,
                'Checkin muộn': item.total_checkin_late,
                'Checkout sớm': item.total_checkout_early,
                'Không checkin': item.total_not_checkin,
                'Không checkout': item.total_not_checkout,
            };
        }) : [{
            'STT': '',
            'Họ và tên': '',
            'Đi làm': '',
            'Đúng luật': '',
            'Bỏ làm': '',
            'Checkin muộn': '',
            'Checkout sớm': '',
            'Không checkin': '',
            'Không checkout': '',
        }];
    }

    exportExcel() {
        let wb = helper.newWorkBook();
        let generalSales = this.convertDataGeneral(this.salesMaketings);
        let generalTeachers = this.convertDataGeneral(this.teachers);

        let cols = [{"wch": 5}, {"wch": 20}, {"wch": 10}, {"wch": 10}, {"wch": 15}, {"wch": 15}, {"wch": 15}, {"wch": 15}, {"wch": 15}];
        helper.appendJsonToWorkBook(generalTeachers, wb, 'Tổng quan giảng viên', cols);
        helper.appendJsonToWorkBook(generalSales, wb, 'Tổng quan sales & makering', cols);

        let base = this.state.bases.filter(base => (base.key == this.state.selectBaseId));
        let gen = this.state.gens.filter(gen => (gen.key == this.state.selectGenId));
        let startTime = moment(this.state.time.startTime, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
        let endTime = moment(this.state.time.endTime, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
        helper.saveWorkBookToExcel(wb,
            'Tổng kết điểm danh' + ` - ${base[0].value == 'Tất cả' ? 'Tất cả cơ sở' : base[0].value}` +
            (helper.isEmptyInput(this.state.time.startTime) || helper.isEmptyInput(this.state.time.startTime)
                    ? ` - ${gen[0].value}`
                    :
                    (`${helper.isEmptyInput(this.state.time.startTime) ? '' : (' - ' + startTime)}` +
                        `${helper.isEmptyInput(this.state.time.endTime) ? '' : (' - ' + endTime)  }`)
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
                                        disableRound
                                        value={this.state.selectGenId}
                                        onChange={this.onChangeGen}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={this.state.bases}
                                        disableRound
                                        value={this.state.selectBaseId}
                                        onChange={this.onChangeBase}
                                    />
                                </div>
                                <div className="col-sm-2 col-xs-5">
                                    <button
                                        style={{width: '100%'}}
                                        onClick={this.openFilterPanel}
                                        className="btn btn-info btn-rose"
                                    >
                                        <i className="material-icons">filter_list</i>
                                        Lọc
                                    </button>
                                </div>
                                {this.props.isLoading ?
                                    <div/>
                                    :
                                    <div className="col-sm-2 col-xs-5">
                                        <button
                                            onClick={this.exportExcel}
                                            className="btn btn-info btn-rose"
                                        >
                                            Xuất ra excel
                                        </button>
                                    </div>
                                }
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
                            <StatisticAttendanceStaffs
                                loadStatistic={this.loadStatistic}
                                isLoading={this.props.isLoading}
                                salesMarketings={this.props.salesMarketings}
                                teachers={this.props.teachers}
                                setData={this.setData}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

AttendanceStaffsContainer.propTypes = {
    gens: PropTypes.array.isRequired,
    attendanceStaffsActions: PropTypes.object.isRequired,
    currentGen: PropTypes.object.isRequired,
    bases: PropTypes.array.isRequired,
    salesMarketings: PropTypes.array.isRequired,
    teachers: PropTypes.array.isRequired,
    isLoadingGens: PropTypes.bool.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        gens: state.attendancesStaffs.gens,
        isLoadingGens: state.attendancesStaffs.isLoadingGens,
        currentGen: state.attendancesStaffs.currentGen,
        bases: state.attendancesStaffs.bases,
        isLoadingBases: state.attendancesStaffs.isLoadingBases,
        isLoading: state.attendancesStaffs.isLoading,
        salesMarketings: state.attendancesStaffs.salesMarketings,
        teachers: state.attendancesStaffs.teachers,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceStaffsActions: bindActionCreators(attendanceStaffsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceStaffsContainer);
