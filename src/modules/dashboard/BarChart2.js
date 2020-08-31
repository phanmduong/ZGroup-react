import React from 'react';
import PropTypes from 'prop-types';
import {Bar} from "react-chartjs-2";
import Loading from "../../components/common/Loading";

class BarChartFilterDate extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    renderFilter = () => {

        return (
            <div className="flex flex-wrap flex-space-between flex-row flex-align-items-center">
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }

    render() {
        const {optionsBar, isLoading, height} = this.props;

        if (isLoading) {
            return (
                <div>
                    {this.renderFilter()}
                    <Loading/>
                </div>);
        }


        const dataSet = {
            labels: this.props.labels,
            datasets: this.props.datasets
        };
        return (
            <div>
                {this.renderFilter()}
                <Bar
                    data={dataSet}
                    options={optionsBar}
                    height={height}
                />
            </div>
        );
    }
}

BarChartFilterDate.defaultProps = {
};

BarChartFilterDate.propTypes = {
    labels: PropTypes.array.isRequired,
    datasets: PropTypes.array.isRequired,
    optionsBar: PropTypes.object,
    isLoading: PropTypes.bool,
};

export default BarChartFilterDate;
