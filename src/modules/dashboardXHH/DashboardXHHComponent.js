import React from 'react';
import PropTypes from 'prop-types';
import {NO_AVATAR} from "../../constants/env";
import {Pie} from "react-chartjs-2";
import Barchart from "./Barchart";
import {randomMonoChromeHEX, isEmptyInput, avatarEmpty} from "../../helpers/helper";

const legendOpts = {
    display: false,
    position: 'top',
    fullWidth: true,
};

class DashboardXHHComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    convertData(analyticsBlogs, isRandomColor) {
        let labels = [];
        let data = [];
        let colors = [];
        analyticsBlogs.map((analyticsBlog) => {
            labels.push(analyticsBlog.name);
            data.push(analyticsBlog.total);
            if (!isEmptyInput(analyticsBlog.color)) {
                colors.push("#" + analyticsBlog.color);
            } else {
                if (isRandomColor) {
                    colors.push(randomMonoChromeHEX(210));
                } else {
                    colors.push('#c50000');
                }

            }
        });

        let dataChart;
        dataChart = {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }]
        };

        return dataChart;
    }

    // convertDataBook(typesBook) {
    //     let labels = [];
    //     let data = [];
    //     let colors = [];
    //     typesBook.map((typeBook) => {
    //         labels.push(typeBook.name);
    //         data.push(typeBook.total);
    //         colors.push(randomMonoChromeHEX(210));
    //     });
    //
    //     let dataChart;
    //     dataChart = {
    //         labels: labels,
    //         datasets: [{
    //             data: data,
    //             backgroundColor: colors,
    //             hoverBackgroundColor: colors
    //         }]
    //     };
    //
    //     return dataChart;
    // }

    convertDataBookBarChart(typesBook, name) {
        return typesBook.map((typeBook) => {
            return typeBook[name];
        });
    }

    render() {
        let {user, dashboard} = this.props;
        let avatar = user && !avatarEmpty(user.avatar_url) ? user.avatar_url : NO_AVATAR;
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
                                <h4>Số bài viết hôm nay: {dashboard.total_blogs_today}</h4>
                                <h4>Số bài viết 30 ngày: {dashboard.total_blogs_30}</h4>
                                <h4>Tổng số bài viết: {dashboard.total_blogs}</h4>
                                <h4>Tổng số cuốn sách: {dashboard.total_books}</h4>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-4">
                        <div className="card card-profile" style={{marginTop: '24px'}}>
                            <div className="card-avatar">
                                <a className="content-avatar">
                                    <div className="img"
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
                                <a href="/profile/my-profile" className="btn btn-rose btn-round">Trang cá
                                    nhân</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">insert_chart</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Tỉ lệ người tham gia bài viết
                                    <small/>
                                </h4>
                                <Pie
                                    data={this.convertData(dashboard.analytics_blogs, false)}
                                    legend={legendOpts}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">insert_chart</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Tỉ lệ bài viết cho từng thể loại
                                    <small/>
                                </h4>
                                <Pie
                                    data={this.convertData(dashboard.analytics_blog_types, true)}
                                    legend={legendOpts}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">insert_chart</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Số lượng sách cho từng thể loại
                                    <small/>
                                </h4>
                                <Barchart
                                    label={this.convertDataBookBarChart(dashboard.type_books, 'name')}
                                    data={[this.convertDataBookBarChart(dashboard.type_books, 'total')]}
                                    id="barchar_money_by_date"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DashboardXHHComponent.propTypes = {
    dashboard: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};


export default DashboardXHHComponent;
