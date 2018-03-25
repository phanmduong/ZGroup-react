import React from 'react';
import PropTypes from 'prop-types';

class Barchart extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let data = {
            labels: this.props.label,
            series: this.props.data
        };

        let options = {
            seriesBarDistance: 10,
            height: '500px',
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
                        return value.slice(8, 10) + ' / ' + value.slice(5, 7);
                    }
                },
                axisY: {
                    labelInterpolationFnc: function (value) {
                        if (value > 1000) return value / 1000 + 'K';
                        return value;
                    },
                    offset: 50
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

Barchart.propTypes = {
    id: PropTypes.string,
    label: PropTypes.array,
    data: PropTypes.array,
};

export default Barchart;
