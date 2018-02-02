import React from "react";
import * as helper from "../../helpers/helper";
import Barchart from './Barchart';
import TooltipButton from '../../components/common/TooltipButton';
import RoomModal from './RoomModal';
import PropTypes from 'prop-types';

class DashBoardUpComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            registers_by_date: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                83,
                26,
                30,
                10,
                20,
                29,
                34,
                38,
                37,
                38,
                25,
                64,
                23,
                27,
                21,
                44,
                30,
                17,
                21,
                12
            ],
            paid_by_date: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                38,
                8,
                17,
                5,
                10,
                16,
                24,
                18,
                22,
                30,
                19,
                49,
                12,
                23,
                14,
                25,
                9,
                12,
                16,
                9
            ],
            date_array: [
                "2017-10-01",
                "2017-10-02",
                "2017-10-03",
                "2017-10-04",
                "2017-10-05",
                "2017-10-06",
                "2017-10-07",
                "2017-10-08",
                "2017-10-09",
                "2017-10-10",
                "2017-10-11",
                "2017-10-12",
                "2017-10-13",
                "2017-10-14",
                "2017-10-15",
                "2017-10-16",
                "2017-10-17",
                "2017-10-18",
                "2017-10-19",
                "2017-10-20",
                "2017-10-21",
                "2017-10-22",
                "2017-10-23",
                "2017-10-24",
                "2017-10-25",
                "2017-10-26",
                "2017-10-27",
                "2017-10-28",
                "2017-10-29",
                "2017-10-30",
                "2017-10-31"
            ],
            money_by_date: [
                "10780000",
                "31580000",
                "4450000",
                "13160000",
                "15230000",
                "9410000",
                "21610000",
                "6550000",
                "19670000",
                "19120000",
                "15560000",
                "9500000",
                "11430000",
                "6300000",
                "12210000",
                "1550000",
                "4000000",
                "8810000",
                "17200000",
                "6950000",
                "17560000",
                "18290000",
                "69370000",
                "33310000",
                "13980000",
                "3410000",
                "2620000",
                "10970000",
                "5770000",
                "22900000",
                "25410000"
            ],
            user: {
                "id": 2,
                "name": "Nguyễn Việt Hùng",
                "email": "thanghungkhi@gmail.com",
                "phone": "01684026343",
                "username": "thanghungkhi",
                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1503369355g3nTaVigDKKyjUQ.jpg",
                "color": "009688",
                "current_role": {
                    "id": 9,
                    "role_title": "CEO"
                },
                "role": 2,
                "is_saler": false,
                rating: {
                    "rating_number_teach": 20,
                    "rating_avg_teach": "4.7500",
                    "rating_number_ta": 20,
                    "rating_avg_ta": "4.5000"
                }
            },
            openModal: false,
        };
        this.closeRoomModal = this.closeRoomModal.bind(this);
    }

    componentWillMount() {

    }

    closeRoomModal() {
        this.setState({openModal: false});
    }

    render() {
         {

            let classProfile = this.state.user.is_saler && this.state.user.rating ? 'col-md-3' : 'col-md-4';
            if (this.state.user) {
                return (
                    <div>
                        <RoomModal
                            isLoadingSeats={this.props.isLoadingSeats}
                            show={this.state.openModal}
                            onHide={this.closeRoomModal}
                            domain={this.props.domain}
                            seats={this.props.seats}
                            rooms={this.props.rooms}
                            loadSeats={this.props.loadSeats}
                            seats_count={this.props.seats_count}
                            available_seats={this.props.available_seats}
                        />
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-content text-align-left">
                                        <p className="category">Doanh
                                            thu</p>
                                        <h3 className="card-title">{helper.convertDotMoneyToK(helper.dotNumber(46866000))}/{helper.convertDotMoneyToK(helper.dotNumber(51997000))}</h3>
                                        <TooltipButton placement="top"
                                                       text={Math.round(46866000 * 100 / 51997000) + '%'}>
                                            <div className="progress progress-line-primary"
                                            >
                                                <div className="progress-bar" role="progressbar"
                                                     style={{width: 46866000 * 100 / 51997000 + '%'}}/>
                                            </div>
                                        </TooltipButton>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">timeline</i>
                                            <a href="#money-by-date">Chi tiết</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-content text-align-left">
                                        <p className="category">Đã thanh toán</p>
                                        <h3 className="card-title">{1000}/{10000}</h3>
                                        <div className="progress progress-line-danger">
                                            <TooltipButton placement="top"
                                                           text={`${1000} học viên đã nộp tiền`}>
                                                <div className="progress-bar progress-bar-success"
                                                     style={{width: 1000 * 100 / 10000 + '%'}}/>
                                            </TooltipButton>
                                            <TooltipButton placement="top"
                                                           text={`${400} học viên nộp 0 đồng`}>
                                                <div className="progress-bar progress-bar-warning"
                                                     style={{width: 400 * 100 / 10000 + '%'}}/>
                                            </TooltipButton>
                                            <TooltipButton placement="top"
                                                           text={`${10000 - 400 - 1000} chưa nộp tiền`}>
                                                <div className="progress progress-line-danger"
                                                     style={{width: (10000 - 400 - 1000) * 100 / 10000 + '%'}}/>
                                            </TooltipButton>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">list</i>
                                            <a>Chi tiết</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-content text-align-left">
                                        <p className="category">Tổng số phòng</p>
                                        <h3 className="card-title">{this.props.rooms_count}</h3>
                                        <div className="progress progress-line-danger">
                                            <TooltipButton placement="top"
                                                           text={`${Math.round((100))}%`}>
                                                <div className="progress progress-line-rose">
                                                    <div className="progress-bar progress-bar-rose" role="progressbar"
                                                         style={{width: (100) + '%'}}/>
                                                </div>
                                            </TooltipButton>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">list</i>
                                            <a onClick={() => this.setState({openModal: !this.state.openModal})}>Chi
                                                tiết</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-content text-align-left">
                                        <p className="category">Số ngày còn lại</p>
                                        <h3 className="card-title">{10}</h3>
                                        <div className="progress progress-line-danger">
                                            <TooltipButton placement="top"
                                                           text={`${Math.round((100 - 30))}%`}>
                                                <div className="progress progress-line-rose">
                                                    <div className="progress-bar progress-bar-rose" role="progressbar"
                                                         style={{width: (100 - 30) + '%'}}/>
                                                </div>
                                            </TooltipButton>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">update</i> {"2018-02-02"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-stats">
                                    <div className="card-content">
                                        <div className="row">
                                            <div className={"text-align-left " + classProfile}>
                                                <p className="category">Nhân viên</p>
                                                <h3 className="card-title">{this.state.user.name}</h3>
                                                <div className="card-footer" style={{
                                                    margin: '10px 0 10px',
                                                }}>
                                                    <div className="stats">
                                                        <i className="material-icons">account_box</i>
                                                        <a href="/profile/my-profile">Trang cá nhân</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"text-align-left " + classProfile}>
                                                <p className="category">Chức vụ</p>
                                                <h3 className="card-title">{this.state.user.current_role.role_title}</h3>
                                            </div>

                                            {
                                                (this.state.user.rating) &&
                                                <div className={"text-align-left " + classProfile}>
                                                    <p className="category">Đánh giá</p>
                                                    <TooltipButton placement="top"
                                                                   text={helper.calculatorRating([this.state.user.rating.rating_number_teach, this.state.user.rating.rating_number_ta],
                                                                       [this.state.user.rating.rating_avg_teach, this.state.user.rating.rating_avg_ta])}>
                                                        <div className="star-rating float-left">
                                            <span style={{
                                                width: 20 * helper.calculatorRating([this.state.user.rating.rating_number_teach, this.state.user.rating.rating_number_ta],
                                                    [this.state.user.rating.rating_avg_teach, this.state.user.rating.rating_avg_ta]) + '%'
                                            }}/>
                                                        </div>
                                                    </TooltipButton>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row" id="register-by-date">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">insert_chart</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Số lượng đăng kí theo ngày
                                            <small/>
                                        </h4>
                                        <Barchart
                                            label={this.state.date_array}
                                            data={[this.state.registers_by_date, this.state.paid_by_date]}
                                            id="barchar_register_by_date"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" id="money-by-date">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">insert_chart</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Doanh thu theo ngày
                                            <small/>
                                        </h4>
                                        <Barchart
                                            label={this.state.date_array}
                                            data={[this.state.money_by_date]}
                                            id="barchar_money_by_date"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                );
            } else {
                return (
                    <h1>Có lỗi xảy ra</h1>
                );
            }
        }
    }
}

DashBoardUpComponent.propTypes = {
    loadSeats: PropTypes.object.isRequired,
    domain: PropTypes.object.isRequired,
    seats : PropTypes.array.isRequired,
    seats_count: PropTypes.number.isRequired,
    available_seats: PropTypes.number.isRequired,
    isLoadingSeats: PropTypes.func.isRequired
};

export default DashBoardUpComponent;