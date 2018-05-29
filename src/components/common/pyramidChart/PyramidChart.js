/* eslint-disable import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import './amcharts.js';
import './funnel.js';

class PyramidChart extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let chart;

        /* eslint-disable */

        chart = new AmCharts.AmFunnelChart();
        chart.rotate = true;
        chart.titleField = "title";
        chart.balloon.fixedPosition = true;
        chart.marginRight = 210;
        chart.marginLeft = 15;
        chart.labelPosition = "right";
        chart.funnelAlpha = 0.9;
        chart.valueField = "value";
        chart.startX = -500;
        chart.dataProvider = this.props.data;
        chart.startAlpha = 0;
        chart.sequencedAnimation = false;
        chart.startDuration = 'easeInSine';
        // chart.startEffect = 2;
        chart.write(this.props.id);
        /* eslint-enable */
    }

    render() {
        return (
            <div id={this.props.id} style={{width: '100%', height: '80vh'}}/>
        );
    }
}

PyramidChart.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};

export default PyramidChart;