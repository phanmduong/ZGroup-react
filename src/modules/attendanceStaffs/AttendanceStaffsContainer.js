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

    setData(salesMakerings, teachers) {
        this.salesMaketings = salesMakerings;
        this.teachers = teachers;
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

    exportExcel() {
        let wb = helper.newWorkBook();
        let generalSales = helper.convertDataGeneral(this.salesMaketings);
        let generalTeachers = helper.convertDataGeneral(this.teachers);
        let detailTeacher = helper.convertDataDetailTeacher(this.teachers);
        let detailTeacherAttendance = helper.convertDataDetailTeacher(this.teachers, 'attendance');
        let detailTeacherLawful = helper.convertDataDetailTeacher(this.teachers, 'isLawful');
        let detailTeacherNotWork = helper.convertDataDetailTeacher(this.teachers, 'isNotWork');
        let detailTeacherCheckinLate = helper.convertDataDetailTeacher(this.teachers, 'isCheckinLate');
        let detailTeacherCheckoutEarly = helper.convertDataDetailTeacher(this.teachers, 'isCheckoutEarly');
        let detailTeacherNotCheckin = helper.convertDataDetailTeacher(this.teachers, 'isNotCheckin');
        let detailTeacherNotCheckout = helper.convertDataDetailTeacher(this.teachers, 'isNotCheckout');
        let detailSalesMarketingAttendance = helper.convertDataDetailSalesMarketing(this.salesMaketings, 'attendance');
        let detailSalesMarketingLawful = helper.convertDataDetailSalesMarketing(this.salesMaketings, 'isLawful');
        let detailSalesMarketingNotWork = helper.convertDataDetailSalesMarketing(this.salesMaketings, 'isNotWork');
        let detailSalesMarketingCheckinLate = helper.convertDataDetailSalesMarketing(this.salesMaketings, 'isCheckinLate');
        let detailSalesMarketingCheckoutEarly = helper.convertDataDetailSalesMarketing(this.salesMaketings, 'isCheckoutEarly');
        let detailSalesMarketingNotCheckin = helper.convertDataDetailSalesMarketing(this.salesMaketings, 'isNotCheckin');
        let detailSalesMarketingNotCheckout = helper.convertDataDetailSalesMarketing(this.salesMaketings, 'isNotCheckout');

        let cols1 = [{"wch": 5}, {"wch": 20}, {"wch": 10}, {"wch": 10}, {"wch": 15}, {"wch": 15}, {"wch": 15}, {"wch": 15}, {"wch": 15}];
        let cols2 = [{"wch": 5}, {"wch": 20}, {"wch": 20}, {"wch": 30}, {"wch": 20}, {"wch": 20}, {"wch": 20}, {"wch": 40}];
        helper.appendJsonToWorkBook(generalTeachers, wb, 'Tổng quan giảng viên', cols1);
        helper.appendJsonToWorkBook(generalSales, wb, 'Tổng quan sales & makering', cols1);
        helper.appendJsonToWorkBook(detailTeacher.data, wb, 'Chi tiết giảng viên', cols2, null, detailTeacher.merges);
        helper.appendJsonToWorkBook(detailTeacherAttendance.data, wb, 'Giảng viên đi làm', cols2, null, detailTeacherAttendance.merges);
        helper.appendJsonToWorkBook(detailTeacherLawful.data, wb, 'Giảng viên đúng luật', cols2, null, detailTeacherLawful.merges);
        helper.appendJsonToWorkBook(detailTeacherNotWork.data, wb, 'Giảng viên bỏ làm', cols2, null, detailTeacherNotWork.merges);
        helper.appendJsonToWorkBook(detailTeacherCheckinLate.data, wb, 'Giảng viên checkin muộn', cols2, null, detailTeacherCheckinLate.merges);
        helper.appendJsonToWorkBook(detailTeacherCheckoutEarly.data, wb, 'Giảng viên checkout sớm', cols2, null, detailTeacherCheckoutEarly.merges);
        helper.appendJsonToWorkBook(detailTeacherNotCheckin.data, wb, 'Giảng viên không checkin', cols2, null, detailTeacherNotCheckin.merges);
        helper.appendJsonToWorkBook(detailTeacherNotCheckout.data, wb, 'Giảng viên không checkout', cols2, null, detailTeacherNotCheckout.merges);
        helper.appendJsonToWorkBook(detailSalesMarketingAttendance.data, wb, 'SalesMarketing đi làm', cols2, null, detailSalesMarketingAttendance.merges);
        helper.appendJsonToWorkBook(detailSalesMarketingLawful.data, wb, 'SalesMarketing đúng luật', cols2, null, detailSalesMarketingLawful.merges);
        helper.appendJsonToWorkBook(detailSalesMarketingNotWork.data, wb, 'SalesMarketing bỏ làm', cols2, null, detailSalesMarketingNotWork.merges);
        helper.appendJsonToWorkBook(detailSalesMarketingCheckinLate.data, wb, 'SalesMarketing checkin muộn', cols2, null, detailSalesMarketingCheckinLate.merges);
        helper.appendJsonToWorkBook(detailSalesMarketingCheckoutEarly.data, wb, 'SalesMarketing checkout sớm', cols2, null, detailSalesMarketingCheckoutEarly.merges);
        helper.appendJsonToWorkBook(detailSalesMarketingNotCheckin.data, wb, 'SalesMarketing không checkin', cols2, null, detailSalesMarketingNotCheckin.merges);
        helper.appendJsonToWorkBook(detailSalesMarketingNotCheckout.data, wb, 'SalesMarketing không checkout', cols2, null, detailSalesMarketingNotCheckout.merges);

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
                                {this.props.isLoading ?
                                    <div/>
                                    :
                                    <div className="col-sm-2 col-xs-5">
                                        <button
                                            style={{width: '100%'}}
                                            onClick={this.exportExcel}
                                            className="btn btn-info btn-rose btn-round"
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
                                            <div className="card-content">
                                                <div className="tab-content">
                                                    <h4 className="card-title">
                                                        <strong>Bộ lọc</strong>
                                                    </h4>
                                                </div>
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
