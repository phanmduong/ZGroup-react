import React from 'react';
import _ from 'lodash';
import {Pie} from 'react-chartjs-2';
import {Link} from 'react-router';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';

const legendOpts = {
    display: false,
    position: 'top',
    fullWidth: true,
};

class CardChart extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataChart: {}
        };
    }

    componentWillMount() {
        this.initChart(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.campaign != this.props.campaign) {
            this.initChart(nextProps);
        }
    }

    initChart(props) {
        let labels = [];
        let data = [];
        let colors = [];
        props.campaign.registers.map((register) => {
            labels.push(register.saler ? register.saler.name : "Không có");
            data.push(register.total_registers);
            if (register.saler && !helper.isEmptyInput(register.saler.color)) {
                colors.push("#" + register.saler.color);
            } else {
                colors.push("#c50000");
            }
        });
        let dataChart = {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }]
        };
        this.setState({
            dataChart: dataChart
        });
    }


    render() {
        let totalRegisters = _.sumBy(this.props.campaign.registers, (item) => item.total_registers);

        return (
            <div className="col-md-4">
                <div className="card">
                    <div className="card-content">
                        <Pie
                            data={this.state.dataChart}
                            legend={legendOpts}
                        />

                        <br/>
                    </div>
                    <div className="card-footer">

                        <h4 className="card-title" style={{paddingBottom: '0px'}}>
                            <Link to={`/teaching/registerlist/${this.props.campaign.campaign_id}`}>
                                {this.props.campaign.registers[0].campaign.name}
                            </Link>
                        </h4>

                        <p className="category">Tổng số đơn: {totalRegisters}</p>
                    </div>
                </div>
            </div>

        );
    }
}

CardChart.propTypes = {
    campaign: PropTypes.object.isRequired,
};

export default CardChart;
