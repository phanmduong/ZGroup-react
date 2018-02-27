/**
 * Created by phanmduong on 11/25/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as helper from '../../helpers/helper';
import TooltipButton from '../../components/common/TooltipButton';
import {Pie} from "react-chartjs-2";

import PropTypes                    from 'prop-types';

const legendOpts = {
    display: false,
    position: 'top',
    fullWidth: true,
};

class OverviewSalesUp extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    convertData(campaigns) {
        let labels = [];
        let data = [];
        let colors = [];
        campaigns.map((campaign) => {
            labels.push(campaign.name);
            data.push(campaign['total_registers']);
            if (!helper.isEmptyInput(campaign.color)) {
                colors.push("#" + campaign.color);
            } else {
                colors.push("#c50000");
            }
        });

        let dataChart ;
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

    render() {
        return (
            <div>
                {this.props.summary.map((item, index) => {
                    let dataChart = this.convertData(item.campaigns);
                    return (
                        <div className="row" key={index}>
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">timeline</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">{item.name}
                                            <small/>
                                        </h4>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p className="description">
                                                    Thưởng cá nhân:
                                                    <strong> {helper.dotNumber(item['bonus'])}đ</strong><br/>
                                                    Tỉ lệ chốt
                                                    đơn: <strong>
                                                    {`${item['total_paid_registers']}/${item['total_registers']}`}
                                                    ({helper.round2(item['total_paid_registers'], item['total_registers']) * 100}%)
                                                </strong>
                                                </p>
                                                <div style={{width: "50%"}}>
                                                    <TooltipButton placement="top"
                                                                   text={`${item['total_paid_registers']}/${item['total_registers']}`}>
                                                        <div className="progress progress-line-rose">
                                                            <div className="progress-bar progress-bar-rose"
                                                                 role="progressbar"
                                                                 style={{width: `${item['total_paid_registers'] * 100 / item['total_registers']}%`}}/>
                                                        </div>
                                                    </TooltipButton>
                                                </div>
                                                <div>
                                                    <table className="table" width="100%">
                                                        <thead>
                                                        <tr className="text-rose">
                                                            <th>Tên lớp</th>
                                                            <th className="text-center">Số đăng kí</th>
                                                            <th className="text-center">Số tiền</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            item.courses && item.courses.map((course, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{course.name}</td>
                                                                        <td className="text-center">{course.count}</td>
                                                                        <td className="text-center">{helper.dotNumber(course.count * course['sale_bonus'])}đ</td>
                                                                    </tr>
                                                                );
                                                            })
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <Pie
                                                    data={dataChart}
                                                    legend={legendOpts}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
OverviewSalesUp.propTypes={
    summary: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        summary: state.summarySales.summary
    };
}


export default connect(mapStateToProps)(OverviewSalesUp);
