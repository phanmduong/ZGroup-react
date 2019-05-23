import React from 'react';
import PropTypes from 'prop-types';
import {Pie} from "react-chartjs-2";

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
    getRandomColor = ()=> {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    componentDidMount() {
        let colors = this.props.label.map(()=>{
            return this.getRandomColor();
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
};

export default PieChart;
