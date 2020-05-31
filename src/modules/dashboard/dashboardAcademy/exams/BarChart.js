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
            // height: 30 * data.labels.length + 'px',
            // horizontalBars: true,

            plugins: [
                // eslint-disable-next-line
                Chartist.plugins.legend({
                    position: 'bottom'

                }),
                // eslint-disable-next-line
                Chartist.plugins.tooltip({
                    transformTooltipTextFnc: (tooltip) =>{
                        let xy = Math.round(tooltip * 100) / 100;
                        return xy;
                    }
                })
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
                    categorySpacing: 40,
                    // offset: 400
                },
                scales: {
                    xAxes: [{
                        categorySpacing: 40,
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                responsive:true,
                maintainAspectRatio: false,
            }]
        ];
        // eslint-disable-next-line
        new Chartist.Bar('#' + this.props.id, data, options, responsiveOptions);
    }

    render() {
        let style = {maxHeight: 750,position: "relative"};
        if(30 * this.props.label.length > 750 ){
            style = {...style, overflowY: "scroll"};
        }
        return (
            <div style={style} id={this.props.id} className="ct-chart"/>
        );
    }
}

BarChart.propTypes = {
    id: PropTypes.string,
    label: PropTypes.array,
    data: PropTypes.array,
};

export default BarChart;
