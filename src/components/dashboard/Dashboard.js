import React from 'react';
// import {Link} from 'react-router';
// import ClassList from './ClassList';
import PropTypes from 'prop-types';

class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        // return (
        //
        //   <div>
        //
        //     <div className="row">
        //       <div className="col-lg-3 col-md-6">
        //         <div className="panel panel-primary">
        //           <div className="panel-heading">
        //             <div className="row">
        //               <div className="col-xs-3">
        //                 <i className="fa fa-comments fa-3x"/>
        //               </div>
        //               <div className="col-xs-9 text-right">
        //                 <div className="huge">{this.props.total_money}K</div>
        //                 <div>Tổng tiền</div>
        //               </div>
        //             </div>
        //           </div>
        //           <a href="#">
        //             <div className="panel-footer">
        //               <span className="pull-left">Xem chi tiết</span>
        //               <span className="pull-right"><i className="fa fa-arrow-circle-right"/></span>
        //               <div className="clearfix"/>
        //             </div>
        //           </a>
        //         </div>
        //       </div>
        //       <div className="col-lg-3 col-md-6">
        //         <div className="panel panel-green">
        //           <div className="panel-heading">
        //             <div className="row">
        //               <div className="col-xs-3">
        //                 <i className="fa fa-tasks fa-3x"/>
        //               </div>
        //               <div className="col-xs-9 text-right">
        //                 <div className="huge">{this.props.registers_number}</div>
        //                 <div>Lượt đăng kí</div>
        //               </div>
        //             </div>
        //           </div>
        //           <Link to="/register-list">
        //             <div className="panel-footer">
        //               <span className="pull-left">Xem chi tiết</span>
        //               <span className="pull-right"><i className="fa fa-arrow-circle-right"/></span>
        //               <div className="clearfix"/>
        //             </div>
        //           </Link>
        //         </div>
        //       </div>
        //       <div className="col-lg-3 col-md-6">
        //         <div className="panel panel-yellow">
        //           <div className="panel-heading">
        //             <div className="row">
        //               <div className="col-xs-3">
        //                 <i className="fa fa-shopping-cart fa-3x"/>
        //               </div>
        //               <div className="col-xs-9 text-right">
        //                 <div className="huge">{this.props.paid_number}</div>
        //                 <div>Học viên đóng tiền</div>
        //               </div>
        //             </div>
        //           </div>
        //           <Link to="#">
        //             <div className="panel-footer">
        //               <span className="pull-left">Xem chi tiết</span>
        //               <span className="pull-right"><i className="fa fa-arrow-circle-right"/></span>
        //               <div className="clearfix"/>
        //             </div>
        //           </Link>
        //         </div>
        //       </div>
        //       <div className="col-lg-3 col-md-6">
        //         <div className="panel panel-red">
        //           <div className="panel-heading">
        //             <div className="row">
        //               <div className="col-xs-3">
        //                 <i className="fa fa-support fa-3x"/>
        //               </div>
        //               <div className="col-xs-9 text-right">
        //                 <div className="huge">{this.props.zero_paid_num}</div>
        //                 <div>Học viên nộp 0 đồng</div>
        //               </div>
        //             </div>
        //           </div>
        //           <a href="#">
        //             <div className="panel-footer">
        //               <span className="pull-left">Xem chi tiết</span>
        //               <span className="pull-right"><i className="fa fa-arrow-circle-right"/></span>
        //               <div className="clearfix"/>
        //             </div>
        //           </a>
        //         </div>
        //       </div>
        //     </div>
        //
        //     <div className="row">
        //       <div className="col-lg-3 col-md-6">
        //         <div className="panel panel-primary">
        //           <div className="panel-heading">
        //             <div className="row">
        //               <div className="col-xs-3">
        //                 <i className="fa fa-comments fa-3x"/>
        //               </div>
        //               <div className="col-xs-9 text-right">
        //                 <div className="huge">{this.props.total_money}K</div>
        //                 <div>Tổng tiền hôm nay</div>
        //               </div>
        //             </div>
        //           </div>
        //           <a href="#">
        //             <div className="panel-footer">
        //               <span className="pull-left">Xem chi tiết</span>
        //               <span className="pull-right"><i className="fa fa-arrow-circle-right"/></span>
        //               <div className="clearfix"/>
        //             </div>
        //           </a>
        //         </div>
        //       </div>
        //       <div className="col-lg-3 col-md-6">
        //         <div className="panel panel-green">
        //           <div className="panel-heading">
        //             <div className="row">
        //               <div className="col-xs-3">
        //                 <i className="fa fa-tasks fa-3x"/>
        //               </div>
        //               <div className="col-xs-9 text-right">
        //                 <div className="huge">{this.props.registers_number}</div>
        //                 <div>Lượt đăng kí hôm nay</div>
        //               </div>
        //             </div>
        //           </div>
        //           <a href="#">
        //             <div className="panel-footer">
        //               <span className="pull-left">Xem chi tiết</span>
        //               <span className="pull-right"><i className="fa fa-arrow-circle-right"/></span>
        //               <div className="clearfix"/>
        //             </div>
        //           </a>
        //         </div>
        //       </div>
        //       <div className="col-lg-3 col-md-6">
        //         <div className="panel panel-yellow">
        //           <div className="panel-heading">
        //             <div className="row">
        //               <div className="col-xs-3">
        //                 <i className="fa fa-shopping-cart fa-3x"/>
        //               </div>
        //               <div className="col-xs-9 text-right">
        //                 <div className="huge">{this.props.total_classes}</div>
        //                 <div>Tổng lớp</div>
        //               </div>
        //             </div>
        //           </div>
        //           <Link to="#">
        //             <div className="panel-footer">
        //               <span className="pull-left">Xem chi tiết</span>
        //               <span className="pull-right"><i className="fa fa-arrow-circle-right"/></span>
        //               <div className="clearfix"/>
        //             </div>
        //           </Link>
        //         </div>
        //       </div>
        //       <div className="col-lg-3 col-md-6">
        //         <div className="panel panel-red">
        //           <div className="panel-heading">
        //             <div className="row">
        //               <div className="col-xs-3">
        //                 <i className="fa fa-support fa-3x"/>
        //               </div>
        //               <div className="col-xs-9 text-right">
        //                 <div className="huge">{this.props.remain_days}</div>
        //                 <div>Số ngày còn lại</div>
        //               </div>
        //             </div>
        //           </div>
        //           <a href="#">
        //             <div className="panel-footer">
        //               <span className="pull-left">Xem chi tiết</span>
        //               <span className="pull-right"><i className="fa fa-arrow-circle-right"/></span>
        //               <div className="clearfix"/>
        //             </div>
        //           </a>
        //         </div>
        //       </div>
        //     </div>
        //
        //     <div className="row">
        //       <div className="col-lg-12">
        //         <div className="panel panel-default">
        //           <div className="panel-heading">
        //             <h3 className="panel-title"><i className="fa fa-bar-chart-o fa-fw"/> Đăng kí theo ngày</h3>
        //           </div>
        //           <div className="panel-body">
        //             <canvas id="register-by-date-chart" style={{width: '100%'}}/>
        //             <div className="text-right">
        //               <a href="#">Xem chi tiết <i className="fa fa-arrow-circle-right"/></a>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //
        //     <div className="row">
        //       <div className="col-lg-12">
        //         <div className="panel panel-default">
        //           <div className="panel-heading">
        //             <h3 className="panel-title"><i className="fa fa-bar-chart-o fa-fw"/> Doanh thu theo ngày</h3>
        //           </div>
        //           <div className="panel-body">
        //             <canvas id="money-by-date-chart" style={{width: '100%'}}/>
        //             <div className="text-right">
        //               <a href="#">Xem chi tiết <i className="fa fa-arrow-circle-right"/></a>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //
        //     </div>
        //
        //     <div className="row">
        //       <div className="col-lg-6">
        //         <div className="panel panel-default">
        //           <div className="panel-heading">
        //             <h3 className="panel-title"><i className="fa fa-bar-chart-o fa-fw"/> Số đơn đặt hàng sách trong
        //               vòng 28 ngày</h3>
        //           </div>
        //           <div className="panel-body">
        //             <canvas id="order-by-date-chart" style={{width: '100%'}}/>
        //             <div className="text-right">
        //               <a href="#">Xem chi tiết <i className="fa fa-arrow-circle-right"/></a>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //       <div className="col-lg-6">
        //         <div className="panel panel-default">
        //           <div className="panel-heading">
        //             <h3 className="panel-title"><i className="fa fa-bar-chart-o fa-fw"/> Area Chart</h3>
        //           </div>
        //           <div className="panel-body">
        //             <canvas id="campaign-chart" style={{width: '100%'}}/>
        //             <div className="text-right">
        //               <a href="#">Xem chi tiết <i className="fa fa-arrow-circle-right"/></a>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //
        //     <div className="row">
        //       <div className="col-lg-12">
        //         <div className="panel panel-default">
        //           <div className="panel-heading">
        //             <h3 className="panel-title"><i className="fa fa-money fa-fw"/>Danh sách lớp</h3>
        //           </div>
        //           <ClassList classes={this.props.classes}/>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // );
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="green">
                                <i className="material-icons">language</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Global Sales by Top Locations</h4>
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="table-responsive table-sales">
                                            <table className="table">
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="flag">
                                                            <img src="../assets/img/flags/US.png"/>
                                                        </div>
                                                    </td>
                                                    <td>USA</td>
                                                    <td className="text-right">
                                                        2.920
                                                    </td>
                                                    <td className="text-right">
                                                        53.23%
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="flag">
                                                            <img src="../assets/img/flags/DE.png"/>
                                                        </div>
                                                    </td>
                                                    <td>Germany</td>
                                                    <td className="text-right">
                                                        1.300
                                                    </td>
                                                    <td className="text-right">
                                                        20.43%
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="flag">
                                                            <img src="../assets/img/flags/AU.png"/>
                                                        </div>
                                                    </td>
                                                    <td>Australia</td>
                                                    <td className="text-right">
                                                        760
                                                    </td>
                                                    <td className="text-right">
                                                        10.35%
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="flag">
                                                            <img src="../assets/img/flags/GB.png"/>
                                                        </div>
                                                    </td>
                                                    <td>United Kingdom</td>
                                                    <td className="text-right">
                                                        690
                                                    </td>
                                                    <td className="text-right">
                                                        7.87%
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="flag">
                                                            <img src="../assets/img/flags/RO.png"/>
                                                        </div>
                                                    </td>
                                                    <td>Romania</td>
                                                    <td className="text-right">
                                                        600
                                                    </td>
                                                    <td className="text-right">
                                                        5.94%
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="flag">
                                                            <img src="../assets/img/flags/BR.png"/>
                                                        </div>
                                                    </td>
                                                    <td>Brasil</td>
                                                    <td className="text-right">
                                                        550
                                                    </td>
                                                    <td className="text-right">
                                                        4.34%
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-md-offset-1">
                                        <div id="worldMap" className="map"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card card-chart">
                            <div className="card-header" data-background-color="rose" data-header-animation="true">
                                <div className="ct-chart" id="websiteViewsChart"></div>
                            </div>
                            <div className="card-content">
                                <div className="card-actions">
                                    <button type="button" className="btn btn-danger btn-simple fix-broken-card">
                                        <i className="material-icons">build</i> Fix Header!
                                    </button>
                                    <button type="button" className="btn btn-info btn-simple" rel="tooltip"
                                            data-placement="bottom" title="Refresh">
                                        <i className="material-icons">refresh</i>
                                    </button>
                                    <button type="button" className="btn btn-default btn-simple" rel="tooltip"
                                            data-placement="bottom" title="Change Date">
                                        <i className="material-icons">edit</i>
                                    </button>
                                </div>
                                <h4 className="card-title">Website Views</h4>
                                <p className="category">Last Campaign Performance</p>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">access_time</i> campaign sent 2 days ago
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-chart">
                            <div className="card-header" data-background-color="green" data-header-animation="true">
                                <div className="ct-chart" id="dailySalesChart"></div>
                            </div>
                            <div className="card-content">
                                <div className="card-actions">
                                    <button type="button" className="btn btn-danger btn-simple fix-broken-card">
                                        <i className="material-icons">build</i> Fix Header!
                                    </button>
                                    <button type="button" className="btn btn-info btn-simple" rel="tooltip"
                                            data-placement="bottom" title="Refresh">
                                        <i className="material-icons">refresh</i>
                                    </button>
                                    <button type="button" className="btn btn-default btn-simple" rel="tooltip"
                                            data-placement="bottom" title="Change Date">
                                        <i className="material-icons">edit</i>
                                    </button>
                                </div>
                                <h4 className="card-title">Daily Sales</h4>
                                <p className="category">
                                    <span className="text-success"><i className="fa fa-long-arrow-up"></i> 55% </span>
                                    increase
                                    in today sales.</p>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">access_time</i> updated 4 minutes ago
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-chart">
                            <div className="card-header" data-background-color="blue" data-header-animation="true">
                                <div className="ct-chart" id="completedTasksChart"></div>
                            </div>
                            <div className="card-content">
                                <div className="card-actions">
                                    <button type="button" className="btn btn-danger btn-simple fix-broken-card">
                                        <i className="material-icons">build</i> Fix Header!
                                    </button>
                                    <button type="button" className="btn btn-info btn-simple" rel="tooltip"
                                            data-placement="bottom" title="Refresh">
                                        <i className="material-icons">refresh</i>
                                    </button>
                                    <button type="button" className="btn btn-default btn-simple" rel="tooltip"
                                            data-placement="bottom" title="Change Date">
                                        <i className="material-icons">edit</i>
                                    </button>
                                </div>
                                <h4 className="card-title">Completed Tasks</h4>
                                <p className="category">Last Campaign Performance</p>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">access_time</i> campaign sent 2 days ago
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="card card-stats">
                            <div className="card-header" data-background-color="orange">
                                <i className="material-icons">weekend</i>
                            </div>
                            <div className="card-content">
                                <p className="category">Bookings</p>
                                <h3 className="card-title">184</h3>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons text-danger">warning</i>
                                    <a href="#pablo">Get More Space...</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="card card-stats">
                            <div className="card-header" data-background-color="rose">
                                <i className="material-icons">equalizer</i>
                            </div>
                            <div className="card-content">
                                <p className="category">Website Visits</p>
                                <h3 className="card-title">75.521</h3>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">local_offer</i> Tracked from Google Analytics
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="card card-stats">
                            <div className="card-header" data-background-color="green">
                                <i className="material-icons">store</i>
                            </div>
                            <div className="card-content">
                                <p className="category">Revenue</p>
                                <h3 className="card-title">$34,245</h3>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">date_range</i> Last 24 Hours
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="card card-stats">
                            <div className="card-header" data-background-color="blue">
                                <i className="fa fa-twitter"></i>
                            </div>
                            <div className="card-content">
                                <p className="category">Followers</p>
                                <h3 className="card-title">+245</h3>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">update</i> Just Updated
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

HomePage.propTypes = {
    registers_count: PropTypes.number.isRequired,
    total_money: PropTypes.string.isRequired,
    registers_number: PropTypes.number.isRequired,
    paid_number: PropTypes.number.isRequired,
    remain_days: PropTypes.number.isRequired,
    date_array: PropTypes.array.isRequired,
    money_by_date: PropTypes.array.isRequired,
    classes: PropTypes.array.isRequired,
    registers_by_date: PropTypes.array.isRequired,
    paid_by_date: PropTypes.array.isRequired,
    registers_by_hour: PropTypes.array.isRequired,
    orders_by_hour: PropTypes.array.isRequired,
    month_ago: PropTypes.array.isRequired,
    uncalled_number: PropTypes.number.isRequired,
    zero_paid_num: PropTypes.number.isRequired,
    total_classes: PropTypes.number.isRequired,
    loadDashboardDataGen: PropTypes.func.isRequired,
};

export default HomePage;
