import React from 'react';
import Loading from '../../components/common/Loading';
import * as helper from '../../helpers/helper';
import TooltipButton from '../../components/common/TooltipButton';
import {Link} from 'react-router';
import {NO_AVATAR} from '../../constants/env';
import Barchart from './Barchart';
import ListClass from './ListClass';
import PropTypes from 'prop-types';
import ListAttendanceShift from './ListAttendanceShift';
import ListAttendanceClass from './ListAttendanceClass';
import {DATE} from '../../constants/constants';

class DashboardComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.loadDashboard();
    }

    render() {
        if (this.props.isLoading) {
            return <Loading/>;
        } else {
            let {
                total_money, target_revenue, register_number, paid_number, zero_paid_number, remain_days,
                percent_remain_days, total_classes, courses, user, bonus, count_paid, count_total, registers_by_date, date_array,
                paid_by_date, money_by_date, classes, shifts, now_classes, current_date

            } = this.props.dashboard;
            let avatar = helper.avatarEmpty(user.avatar_url) ? NO_AVATAR : user.avatar_url;
            return (
                <div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="blue">
                                    <i className="material-icons">timeline</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">Các thông số cơ bản
                                        <small/>
                                    </h4>
                                    <h4>Doanh
                                        thu: {helper.dotNumber(total_money)}đ/{helper.dotNumber(target_revenue)}đ</h4>
                                    <TooltipButton placement='top'
                                                   text={Math.round(total_money * 100 / target_revenue) + '%'}>
                                        <div className="progress progress-line-primary"
                                        >
                                            <div className="progress-bar" role="progressbar"
                                                 style={{width: total_money * 100 / target_revenue + '%'}}>
                                            </div>
                                        </div>
                                    </TooltipButton>
                                    <h4>Đã đóng tiền: {paid_number}/{register_number}</h4>
                                    <div className="progress progress-line-danger">
                                        <TooltipButton placement='top'
                                                       text={`${paid_number} học viên đã nộp tiền`}>
                                            <div className="progress-bar progress-bar-success"
                                                 style={{width: paid_number * 100 / register_number + '%'}}>
                                            </div>
                                        </TooltipButton>
                                        <TooltipButton placement='top'
                                                       text={`${zero_paid_number} học viên nộp 0 đồng`}>
                                            <div className="progress-bar progress-bar-warning"
                                                 style={{width: zero_paid_number * 100 / register_number + '%'}}>
                                            </div>
                                        </TooltipButton>
                                        <TooltipButton placement='top'
                                                       text={`${register_number - zero_paid_number - paid_number} chưa nộp tiền`}>
                                            <div className="progress progress-line-danger"
                                                 style={{width: (register_number - zero_paid_number - paid_number) * 100 / register_number + '%'}}>
                                            </div>
                                        </TooltipButton>
                                    </div>
                                    <h4>Số ngày còn lại: {remain_days}</h4>
                                    <TooltipButton placement='top'
                                                   text={`${Math.round((100 - percent_remain_days))}%`}>
                                        <div className="progress progress-line-rose">
                                            <div className="progress-bar progress-bar-rose" role="progressbar"
                                                 style={{width: (100 - percent_remain_days) + '%'}}>
                                            </div>
                                        </div>
                                    </TooltipButton>
                                    <h4>Tổng số lớp: {total_classes}</h4>
                                    <div className="progress progress-line-danger">
                                        {courses.map((course, index) => {
                                            return (
                                                <TooltipButton placement='top' key={index}
                                                               text={`${course.name}: ${course.total_classes} lớp`}>
                                                    <div className="progress-bar"
                                                         style={{
                                                             width: (course.total_classes * 100 / total_classes) + '%',
                                                             background: course.color
                                                         }}>
                                                    </div>
                                                </TooltipButton>
                                            );
                                        })}
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="col-md-4">
                            <div className="card card-profile" style={{marginTop: '24px'}}>
                                <div className="card-avatar">
                                    <a className="content-avatar">
                                        <img className="img"
                                             style={{
                                                 background: 'url(' + avatar + ') center center / cover',
                                                 width: '130px',
                                                 height: '130px'
                                             }}
                                        />
                                    </a>
                                </div>
                                <div className="card-content">
                                    <h6 className="category text-gray">{user.current_role.role_title}</h6>
                                    <h4 className="card-title">{user.name}</h4>
                                    {(count_paid) ?
                                        (
                                            <div>
                                                <p className="description">
                                                    Thưởng cá nhân: <strong>{helper.dotNumber(bonus)}đ</strong><br/>
                                                    Chỉ tiêu cá nhân
                                                </p>
                                                <TooltipButton placement='top'
                                                               text={`${count_paid}/${count_total}`}>
                                                    <div className="progress progress-line-rose">
                                                        <div className="progress-bar progress-bar-rose"
                                                             role="progressbar"
                                                             style={{width: `${count_paid * 100 / count_total}%`}}>
                                                        </div>
                                                    </div>
                                                </TooltipButton>
                                            </div>
                                        )
                                        :
                                        (<div/>)
                                    }
                                    {
                                        (user.rating) &&
                                        <TooltipButton placement='top'
                                                       text={helper.calculatorRating([user.rating.rating_number_teach, user.rating.rating_number_ta],
                                                           [user.rating.rating_avg_teach, user.rating.rating_avg_ta])}>
                                            <div className="star-rating">
                                            <span style={{
                                                width: 20 * helper.calculatorRating([user.rating.rating_number_teach, user.rating.rating_number_ta],
                                                    [user.rating.rating_avg_teach, user.rating.rating_avg_ta]) + '%'
                                            }}/>
                                            </div>
                                        </TooltipButton>
                                    }
                                    {user.is_saler &&
                                    <Link to={"/manage/registerlist/" + user.id} className="btn btn-rose btn-round">Danh
                                        sách đăng kí</Link>
                                    }

                                    <Link to='/my-profile' className="btn btn-rose btn-round">Trang cá nhân</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">insert_chart</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">Số lượng đăng kí theo ngày
                                        <small></small>
                                    </h4>
                                    <Barchart
                                        label={date_array}
                                        data={[registers_by_date, paid_by_date]}
                                        id='barchar_register_by_date'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">insert_chart</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">Doanh thu theo ngày
                                        <small></small>
                                    </h4>
                                    <Barchart
                                        label={date_array}
                                        data={[money_by_date]}
                                        id='barchar_money_by_date'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        (shifts || this.props.date !== current_date) &&
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">insert_chart</i>
                                    </div>
                                    <div className="card-content">
                                        <div className="flex flex-row flex-space-between">
                                            <h4 className="card-title">
                                                {this.props.date === current_date ? 'Lịch trực hôm nay' : 'Lịch trực ' + this.props.date}
                                                <small></small>
                                            </h4>
                                            <div className="flex flex-row">
                                                <button
                                                    className="btn btn-rose btn-sm"
                                                    onClick={() => this.props.loadAttendanceShift(-DATE)}
                                                >
                                                    <span className="btn-label">
                                                        <i className="material-icons">keyboard_arrow_left</i>
                                                    </span>
                                                    Trước
                                                </button>
                                                <button
                                                    className="btn btn-rose btn-sm"
                                                    onClick={() => this.props.loadAttendanceShift(DATE)}
                                                >
                                                    Sau
                                                    <span className="btn-label btn-label-right">
                                                        <i className="material-icons">
                                                            keyboard_arrow_right
                                                        </i>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        {
                                            this.props.isLoadingAttendanceShifts ? <Loading/> :
                                                (
                                                    shifts ?
                                                        <ListAttendanceShift
                                                            baseId={this.props.baseId}
                                                            shifts={shifts}
                                                        /> : <div><strong>Hiện không có lịch trực</strong></div>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        now_classes &&
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">insert_chart</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Lớp học hôm nay
                                            <small></small>
                                        </h4>
                                        <ListAttendanceClass
                                            baseId={this.props.baseId}
                                            now_classes={now_classes}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">assignment</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">Danh sách lớp</h4>
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
            );
        }
    }
}

DashboardComponent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoadingAttendanceShifts: PropTypes.bool.isRequired,
    dashboard: PropTypes.object.isRequired,
    changeClassStatus: PropTypes.func.isRequired,
    openModalClass: PropTypes.func.isRequired,
    loadAttendanceShift: PropTypes.func.isRequired,
    baseId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    date: PropTypes.string.isRequired,
};


export default DashboardComponent;
