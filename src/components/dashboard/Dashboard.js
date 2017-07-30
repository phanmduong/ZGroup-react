import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import ClassList from './ClassList';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (

      <div>

        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-3">
                    <i className="fa fa-comments fa-3x"></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <div className="huge">{this.props.total_money}K</div>
                    <div>Tổng tiền</div>
                  </div>
                </div>
              </div>
              <a href="#">
                <div className="panel-footer">
                  <span className="pull-left">Xem chi tiết</span>
                  <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                  <div className="clearfix"></div>
                </div>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="panel panel-green">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-3">
                    <i className="fa fa-tasks fa-3x"></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <div className="huge">{this.props.registers_number}</div>
                    <div>Lượt đăng kí</div>
                  </div>
                </div>
              </div>
              <Link to="/register-list">
                <div className="panel-footer">
                  <span className="pull-left">Xem chi tiết</span>
                  <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                  <div className="clearfix"></div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="panel panel-yellow">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-3">
                    <i className="fa fa-shopping-cart fa-3x"></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <div className="huge">{this.props.paid_number}</div>
                    <div>Học viên đóng tiền</div>
                  </div>
                </div>
              </div>
              <Link to="#">
                <div className="panel-footer">
                  <span className="pull-left">Xem chi tiết</span>
                  <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                  <div className="clearfix"></div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="panel panel-red">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-3">
                    <i className="fa fa-support fa-3x"></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <div className="huge">{this.props.zero_paid_num}</div>
                    <div>Học viên nộp 0 đồng</div>
                  </div>
                </div>
              </div>
              <a href="#">
                <div className="panel-footer">
                  <span className="pull-left">Xem chi tiết</span>
                  <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                  <div className="clearfix"></div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-3">
                    <i className="fa fa-comments fa-3x"></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <div className="huge">{this.props.total_money}K</div>
                    <div>Tổng tiền hôm nay</div>
                  </div>
                </div>
              </div>
              <a href="#">
                <div className="panel-footer">
                  <span className="pull-left">Xem chi tiết</span>
                  <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                  <div className="clearfix"></div>
                </div>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="panel panel-green">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-3">
                    <i className="fa fa-tasks fa-3x"></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <div className="huge">{this.props.registers_number}</div>
                    <div>Lượt đăng kí hôm nay</div>
                  </div>
                </div>
              </div>
              <a href="#">
                <div className="panel-footer">
                  <span className="pull-left">Xem chi tiết</span>
                  <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                  <div className="clearfix"></div>
                </div>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="panel panel-yellow">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-3">
                    <i className="fa fa-shopping-cart fa-3x"></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <div className="huge">{this.props.total_classes}</div>
                    <div>Tổng lớp</div>
                  </div>
                </div>
              </div>
              <Link to="#">
                <div className="panel-footer">
                  <span className="pull-left">Xem chi tiết</span>
                  <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                  <div className="clearfix"></div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="panel panel-red">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-3">
                    <i className="fa fa-support fa-3x"></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <div className="huge">{this.props.remain_days}</div>
                    <div>Số ngày còn lại</div>
                  </div>
                </div>
              </div>
              <a href="#">
                <div className="panel-footer">
                  <span className="pull-left">Xem chi tiết</span>
                  <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                  <div className="clearfix"></div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title"><i className="fa fa-bar-chart-o fa-fw"></i> Đăng kí theo ngày</h3>
              </div>
              <div className="panel-body">
                <canvas id="register-by-date-chart" style={{width: '100%'}}></canvas>
                <div className="text-right">
                  <a href="#">Xem chi tiết <i className="fa fa-arrow-circle-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title"><i className="fa fa-bar-chart-o fa-fw"></i> Doanh thu theo ngày</h3>
              </div>
              <div className="panel-body">
                <canvas id="money-by-date-chart" style={{width: '100%'}}></canvas>
                <div className="text-right">
                  <a href="#">Xem chi tiết <i className="fa fa-arrow-circle-right"></i></a>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title"><i className="fa fa-bar-chart-o fa-fw"></i> Số đơn đặt hàng sách trong
                  vòng 28 ngày</h3>
              </div>
              <div className="panel-body">
                <canvas id="order-by-date-chart" style={{width: '100%'}}></canvas>
                <div className="text-right">
                  <a href="#">Xem chi tiết <i className="fa fa-arrow-circle-right"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title"><i className="fa fa-bar-chart-o fa-fw"></i> Area Chart</h3>
              </div>
              <div className="panel-body">
                <canvas id="campaign-chart" style={{width: '100%'}}></canvas>
                <div className="text-right">
                  <a href="#">Xem chi tiết <i className="fa fa-arrow-circle-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title"><i className="fa fa-money fa-fw"></i>Danh sách lớp</h3>
              </div>
              <ClassList classes={this.props.classes}/>
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
