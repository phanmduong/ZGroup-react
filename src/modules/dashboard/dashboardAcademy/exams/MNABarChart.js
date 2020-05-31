import React from 'react';
import PropTypes from 'prop-types';




class MNABarChart extends React.Component {
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
            stackBars: true,
            // stackMode: 'overlap',
            high: 10,
            low: 0,
            plugins: [
                // eslint-disable-next-line
                // Chartist.plugins.legend({
                //     position: 'bottom'
                // }),
                // eslint-disable-next-line
                Chartist.plugins.tooltip({
                    tooltipFnc: (tooltip,e) =>{

                        console.log('1',tooltip,e);
                        return tooltip;
                    },
                    // transformTooltipTextFnc: (tooltip,e) =>{
                    //     console.log('2',tooltip,e);
                    //     let xy = Math.round(tooltip * 100) / 100;
                    //     return xy;
                    // }
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
                            // beginAtZero:true
                        }
                    }]
                },
                responsive:true,
                maintainAspectRatio: false,
            }]
        ];
        // eslint-disable-next-line
        new Chartist.Bar('#' + this.props.id, data, options, responsiveOptions).on('draw', function(data) {
            console.log('chart',data);
            if(data.type === 'bar' ){
                data.element.attr({
                    style: 'border:none;'
                });
                if( data.series && data.series.name === 'Min') {
                    data.element.attr({
                        // style: 'stroke: white; border:none;'
                        style: 'stroke: transparent;'
                    });
                }
            }
        });
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

MNABarChart.propTypes = {
    id: PropTypes.string,
    label: PropTypes.array,
    data: PropTypes.array,
};

export default MNABarChart;
