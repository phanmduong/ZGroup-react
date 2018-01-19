import React from 'react';
import PropTypes from 'prop-types';

class BarChartDepartment extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let data = {
            labels: this.props.label,
            series: this.props.data
        };

        let options = {
            seriesBarDistance: 5,
            height: '400px',
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
                    }
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

BarChartDepartment.propTypes = {
    id: PropTypes.string,
    label: PropTypes.array,
    data: PropTypes.array,
};

export default BarChartDepartment;
