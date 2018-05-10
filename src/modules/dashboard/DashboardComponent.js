import React from "react";
import Loading from "../../components/common/Loading";
import * as helper from "../../helpers/helper";
import TooltipButton from "../../components/common/TooltipButton";
import {Link} from "react-router";
import Barchart from "./Barchart";
import ListClass from "./ListClass";
import PropTypes from "prop-types";
import {Panel} from "react-bootstrap";
import ReactSelect from 'react-select';
import {isEmptyInput} from "../../helpers/helper";
// import ListAttendanceShift from "./ListAttendanceShift";
// import ListAttendanceClass from "./ListAttendanceClass";
// import { DATE } from "../../constants/constants";

class DashboardComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            filterClass: {
                base_id: '',
                course_id: '',
            },
            openFilterClass: false
        };
    }


    componentWillMount() {
        this.props.loadDashboard();
    }

    onChangeFilterBaseClass = (value) => {
        let result = value ? value.value : '';
        this.setState({filterClass: {...this.state.filterClass, base_id: result}});
    }

    onChangeFilterCourseClass = (value) => {
        let result = value ? value.value : '';
        this.setState({filterClass: {...this.state.filterClass, course_id: result}});
    }

    convertData(arr) {
        let data = arr.map(function (obj) {
            return {
                ...obj,
                value: obj.id,
                label: obj.name
            };
        });

        return [{
            value: '',
            label: 'Tất cả'
        }, ...data];
    }

    render() {
        if (this.props.isLoading) {
            return <Loading/>;
        } else {
            let {
                total_money,
                target_revenue,
                register_number,
                paid_number,
                zero_paid_number,
                remain_days,
                percent_remain_days,
                total_classes,
                courses,
                user,
                registers_by_date,
                date_array,
                paid_by_date,
                money_by_date,
                classes,
                // shifts,
                // now_classes,
                // current_date,
                end_time_gen
            } = this.props.dashboard;
            if (!isEmptyInput(this.state.filterClass.base_id)) {
                classes = classes.filter((classItem) => classItem.room && classItem.room.base_id == this.state.filterClass.base_id);
            }
            if (!isEmptyInput(this.state.filterClass.course_id)) {
                classes = classes.filter((classItem) => classItem.course.id == this.state.filterClass.course_id);
            }
            if (this.props.dashboard.user) {
                return (
                    <div>
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-content text-align-left">
                                        <p className="category">Doanh thu</p>
                                        <h3 className="card-title">
                                            {helper.convertDotMoneyToK(helper.dotNumber(total_money))}/{helper.convertDotMoneyToK(
                                            helper.dotNumber(target_revenue)
                                        )}
                                        </h3>
                                        <TooltipButton
                                            placement="top"
                                            text={Math.round(total_money * 100 / target_revenue) + "%"}>
                                            <div className="progress progress-line-primary">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                        width: total_money * 100 / target_revenue + "%"
                                                    }}
                                                />
                                            </div>
                                        </TooltipButton>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">timeline</i>
                                            <Link to="#money-by-date">Chi tiết</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-content text-align-left">
                                        <p className="category">Đã đóng tiền</p>
                                        <h3 className="card-title">
                                            {paid_number}/{register_number}
                                        </h3>
                                        <div className="progress progress-line-danger">
                                            <TooltipButton
                                                placement="top"
                                                text={`${paid_number} học viên đã nộp tiền`}>
                                                <div
                                                    className="progress-bar progress-bar-success"
                                                    style={{
                                                        width: paid_number * 100 / register_number + "%"
                                                    }}
                                                />
                                            </TooltipButton>
                                            <TooltipButton
                                                placement="top"
                                                text={`${zero_paid_number} học viên nộp 0 đồng`}>
                                                <div
                                                    className="progress-bar progress-bar-warning"
                                                    style={{
                                                        width: zero_paid_number * 100 / register_number + "%"
                                                    }}
                                                />
                                            </TooltipButton>
                                            <TooltipButton
                                                placement="top"
                                                text={`${register_number -
                                                zero_paid_number -
                                                paid_number} chưa nộp tiền`}>
                                                <div
                                                    className="progress progress-line-danger"
                                                    style={{
                                                        width:
                                                        (register_number -
                                                            zero_paid_number -
                                                            paid_number) *
                                                        100 /
                                                        register_number +
                                                        "%"
                                                    }}
                                                />
                                            </TooltipButton>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">list</i>
                                            <a href="/finance/paidlist">Chi tiết</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-content text-align-left">
                                        <p className="category">Số lớp còn lại</p>
                                        <h3 className="card-title">{total_classes}</h3>
                                        <div className="progress progress-line-danger">
                                            {courses.map((course, index) => {
                                                return (
                                                    <TooltipButton
                                                        placement="top"
                                                        key={index}
                                                        text={`${course.name}: ${course.total_classes} lớp`}>
                                                        <div
                                                            className="progress-bar"
                                                            style={{
                                                                width:
                                                                course.total_classes *
                                                                100 /
                                                                total_classes +
                                                                "%",
                                                                background: course.color
                                                            }}
                                                        />
                                                    </TooltipButton>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">list</i>
                                            <a href="#list-class">Chi tiết</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-content text-align-left">
                                        <p className="category">Số ngày còn lại</p>
                                        <h3 className="card-title">{remain_days}</h3>
                                        <div className="progress progress-line-danger">
                                            <TooltipButton
                                                placement="top"
                                                text={`${Math.round(100 - percent_remain_days)}%`}>
                                                <div className="progress progress-line-rose">
                                                    <div
                                                        className="progress-bar progress-bar-rose"
                                                        role="progressbar"
                                                        style={{
                                                            width: 100 - percent_remain_days + "%"
                                                        }}
                                                    />
                                                </div>
                                            </TooltipButton>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">update</i> {end_time_gen}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" id="register-by-date">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="tab-content">
                                            <h4 className="card-title">
                                                <strong>Số lượng đăng kí theo ngày</strong>
                                            </h4>
                                            <br/>
                                            <br/>
                                            <Barchart
                                                label={date_array}
                                                data={[registers_by_date, paid_by_date]}
                                                id="barchar_register_by_date"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" id="money-by-date">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="tab-content">
                                            <h4 className="card-title">
                                                <strong>Doanh thu theo ngày</strong>
                                            </h4>
                                            <br/>
                                            <br/>
                                            <Barchart
                                                label={date_array}
                                                data={[money_by_date]}
                                                id="barchar_money_by_date"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*{(shifts || this.props.dateShifts !== current_date) && (*/}
                        {/*<div className="row">*/}
                        {/*<div className="col-md-12">*/}
                        {/*<div className="card">*/}
                        {/*<div className="card-content">*/}
                        {/*<div className="tab-content">*/}
                        {/*<div className="flex flex-row flex-space-between">*/}
                        {/*<h4 className="card-title">*/}
                        {/*<strong>*/}
                        {/*{this.props.dateShifts === current_date*/}
                        {/*? "Lịch trực hôm nay"*/}
                        {/*: "Lịch trực " + this.props.dateShifts}*/}
                        {/*</strong>*/}
                        {/*</h4>*/}
                        {/*<div className="flex flex-row">*/}
                        {/*<button*/}
                        {/*className="btn btn-rose btn-sm"*/}
                        {/*onClick={() =>*/}
                        {/*this.props.loadAttendanceShift(-DATE)*/}
                        {/*}>*/}
                        {/*<span className="btn-label">*/}
                        {/*<i className="material-icons">*/}
                        {/*keyboard_arrow_left*/}
                        {/*</i>*/}
                        {/*</span>*/}
                        {/*Trước*/}
                        {/*</button>*/}
                        {/*<button*/}
                        {/*className="btn btn-rose btn-sm"*/}
                        {/*onClick={() =>*/}
                        {/*this.props.loadAttendanceShift(DATE)*/}
                        {/*}>*/}
                        {/*Sau*/}
                        {/*<span className="btn-label btn-label-right">*/}
                        {/*<i className="material-icons">*/}
                        {/*keyboard_arrow_right*/}
                        {/*</i>*/}
                        {/*</span>*/}
                        {/*</button>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*<br />*/}
                        {/*{this.props.isLoadingAttendanceShifts ? (*/}
                        {/*<Loading />*/}
                        {/*) : shifts ? (*/}
                        {/*<ListAttendanceShift*/}
                        {/*baseId={this.props.baseId}*/}
                        {/*shifts={shifts}*/}
                        {/*/>*/}
                        {/*) : (*/}
                        {/*<div>*/}
                        {/*<strong>Hiện không có lịch trực</strong>*/}
                        {/*</div>*/}
                        {/*)}*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*)}*/}
                        {/*{*/}
                        {/*<div className="row">*/}
                        {/*<div className="col-md-12">*/}
                        {/*<div className="card">*/}
                        {/*<div className="card-content">*/}
                        {/*<div className="tab-content">*/}
                        {/*<div className="flex flex-row flex-space-between">*/}
                        {/*<h4 className="card-title">*/}
                        {/*<strong>*/}
                        {/*{this.props.dateClasses === current_date*/}
                        {/*? "Lớp học hôm nay"*/}
                        {/*: "Lớp học " + this.props.dateClasses}*/}
                        {/*</strong>*/}
                        {/*</h4>*/}
                        {/*<div className="flex flex-row">*/}
                        {/*<button*/}
                        {/*className="btn btn-rose btn-sm"*/}
                        {/*onClick={() =>*/}
                        {/*this.props.loadAttendanceClass(-DATE)*/}
                        {/*}>*/}
                        {/*<span className="btn-label">*/}
                        {/*<i className="material-icons">*/}
                        {/*keyboard_arrow_left*/}
                        {/*</i>*/}
                        {/*</span>*/}
                        {/*Trước*/}
                        {/*</button>*/}
                        {/*<button*/}
                        {/*className="btn btn-rose btn-sm"*/}
                        {/*onClick={() =>*/}
                        {/*this.props.loadAttendanceClass(DATE)*/}
                        {/*}>*/}
                        {/*Sau*/}
                        {/*<span className="btn-label btn-label-right">*/}
                        {/*<i className="material-icons">*/}
                        {/*keyboard_arrow_right*/}
                        {/*</i>*/}
                        {/*</span>*/}
                        {/*</button>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*<br />*/}
                        {/*{this.props.isLoadingAttendanceClasses ? (*/}
                        {/*<Loading />*/}
                        {/*) : now_classes ? (*/}
                        {/*<ListAttendanceClass*/}
                        {/*baseId={this.props.baseId}*/}
                        {/*now_classes={now_classes}*/}
                        {/*/>*/}
                        {/*) : (*/}
                        {/*<div>*/}
                        {/*<strong>Hiện không có lớp học</strong>*/}
                        {/*</div>*/}
                        {/*)}*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*}*/}

                        <div className="row" id="list-class">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="tab-content">
                                            <div className="flex flex-row flex-space-between">
                                                <h4 className="card-title">
                                                    <strong>Danh sách lớp</strong>
                                                </h4>
                                                <TooltipButton text="Lọc" placement="top">
                                                    <button
                                                        onClick={() => this.setState({openFilterClass: !this.state.openFilterClass})}
                                                        className="btn btn-primary btn-round btn-xs none-margin btn-header-card"
                                                    >
                                                        <i className="material-icons"
                                                        >filter_list</i>
                                                    </button>
                                                </TooltipButton>
                                            </div>

                                            <br/>
                                            <Panel collapsible expanded={this.state.openFilterClass}>
                                                <div className="row">
                                                    <div className="col-md-3 form-group">
                                                        <label className="">
                                                            Cơ sở
                                                        </label>
                                                        <ReactSelect
                                                            options={this.convertData(this.props.bases)}
                                                            onChange={this.onChangeFilterBaseClass}
                                                            value={this.state.filterClass.base_id}
                                                            defaultMessage="Tuỳ chọn"
                                                            name="filter_class_base"
                                                        />
                                                    </div>
                                                    <div className="col-md-3 form-group">
                                                        <label className="">
                                                            Môn học
                                                        </label>
                                                        <ReactSelect
                                                            options={this.convertData(courses)}
                                                            onChange={this.onChangeFilterCourseClass}
                                                            value={this.state.filterClass.course_id}
                                                            defaultMessage="Tuỳ chọn"
                                                            name="filter_class_course"
                                                        />
                                                    </div>
                                                </div>
                                            </Panel>
                                            <ListClass
                                                classes={classes}
                                                user={user}
                                                changeClassStatus={this.props.changeClassStatus}
                                                openModalClass={this.props.openModalClass}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return <h1>Có lỗi xảy ra</h1>;
            }
        }
    }
}

DashboardComponent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoadingAttendanceShifts: PropTypes.bool.isRequired,
    isLoadingAttendanceClasses: PropTypes.bool.isRequired,
    dashboard: PropTypes.object.isRequired,
    changeClassStatus: PropTypes.func.isRequired,
    openModalClass: PropTypes.func.isRequired,
    loadAttendanceShift: PropTypes.func.isRequired,
    loadAttendanceClass: PropTypes.func.isRequired,
    baseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    dateShifts: PropTypes.string.isRequired,
    dateClasses: PropTypes.string.isRequired,
    loadDashboard: PropTypes.func.isRequired
};

export default DashboardComponent;
