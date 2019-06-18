import React from 'react';
import PropTypes from 'prop-types';
import {Pie} from "react-chartjs-2";
import randomColor from "randomcolor";

const legendOpts = {
    display: true,
    position: "left",
    fullWidth: true,
};

class PieChart extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataChart: {}
        };
    }

    componentDidMount() {
        let colors = this.props.colors.map(color=>{
            if(color) return color;
            return randomColor({hue: 'red',format: 'hex', count: 1, luminosity: "bright"})[0];
        });
        let dataChart = {
            labels: this.props.label,
            datasets: [
                {
                    data: this.props.data,
                    backgroundColor: colors,
                    hoverBackgroundColor: colors,
                },
            ],
        };
        this.setState({
            dataChart: dataChart
        });
    }

    render() {
        return (

                <Pie
                    data={this.state.dataChart}
                    legend={legendOpts}
                    height={150}
                />
        );
    }
}

PieChart.propTypes = {
    id: PropTypes.string,
    label: PropTypes.array,
    data: PropTypes.array,
    colors: PropTypes.array,
};

export default PieChart;
