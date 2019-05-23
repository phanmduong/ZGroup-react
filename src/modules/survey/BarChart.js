import React from 'react';
import PropTypes from 'prop-types';

class BarChart extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let data = {
            labels: this.props.label,
            series: this.props.data,


        };

        let options = {
            seriesBarDistance: 10,
            height: '500px',
            horizontalBars: true,
            plugins: [
                // eslint-disable-next-line
                Chartist.plugins.tooltip()
            ]
        };

        let responsiveOptions = [
            ['screen and (min-width: 640px)', {
                seriesBarDistance: 10,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value;
                    },
                },

                axisY: {
                    labelInterpolationFnc: function (value) {
                        return value;
                    },
                    offset: 150
                }
            }]
        ];
        // eslint-disable-next-line
        new Chartist.Bar('#' + this.props.id, data, options, responsiveOptions);
    }

    render() {
        return (
            <div id={this.props.id} className="ct-chart"/>
        );
    }
}

BarChart.propTypes = {
    id: PropTypes.string,
    label: PropTypes.array,
    data: PropTypes.array,
};

export default BarChart;
