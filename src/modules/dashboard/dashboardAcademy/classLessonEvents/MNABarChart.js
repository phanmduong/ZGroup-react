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
        let high = this.props.high;
        let options = {
            seriesBarDistance: 10,
            height:'500px',
            // height: 30 * data.labels.length + 'px',
            // horizontalBars: true,
            // stackBars: true,
            // stackMode: 'overlap',
            high,
            low: 0,
            plugins: [
                // eslint-disable-next-line
                Chartist.plugins.legend({
                    position: 'bottom'

                }),
                // eslint-disable-next-line
                Chartist.plugins.tooltip({
                    tooltipFnc: (tooltip) =>{
                        return tooltip;
                    },
                    // transformTooltipTextFnc: (tooltip,e) =>{
                    //     console.log('2',tooltip,e);
                    //     let xy = Math.round(tooltip * 100) / 100;
                    //     return xy;
                    // }
                }),
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
            if(data.type === 'bar' ){
                console.log('chart',data);

                if( data.series) {
                    let y1 = data.axisY.axisLength /  high * (high - data.series.data[data.index].min);
                    let y2 = y1 - data.axisY.axisLength /  high * (data.series.data[data.index].range);
                    console.log(y1,y2,data.series.data[data.index]);
                    data.element.attr({
                        y1:y1 +15,
                        y2:y2+15,
                        // style: 'padding-bottom: transparent;'
                    });
                }
            }
        });
    }

    render() {
        let style = {maxHeight: 750, minHeight:500,position: "relative"};
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
