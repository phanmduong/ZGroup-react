import React from 'react';
import PropTypes from 'prop-types';
import  D3GenChart from "./D3GenChart";
// import "./D3GenChart";


class BubbleChart extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
        const { width, height,data,id } = this.props;
        D3GenChart.create({width, height,data,id});
    }

    render() {

        return (
            <div id={this.props.id  || "bubble-chart"}/>
        );
    }
}

BubbleChart.propTypes = {
    id: PropTypes.string,
    label: PropTypes.array,
    data: PropTypes.array,
};

export default BubbleChart;
