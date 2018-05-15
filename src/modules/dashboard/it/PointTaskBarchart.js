import React from 'react';
import PropTypes from 'prop-types';

class PointTaskBarchart extends React.Component {
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
            ['screen and (min-width: 640px)']
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

PointTaskBarchart.propTypes = {
    id: PropTypes.string,
    label: PropTypes.array,
    data: PropTypes.array,
};

export default PointTaskBarchart;
