import React from "react";
import {observer} from "mobx-react";
import store from "./AnalyticsStore";

@observer
class AnalyticsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        store.loadData();
    }


    render() {
        return (
            <div>

                <div id="embed-api-auth-container"></div>
                <div id="view-selector-container"></div>
                <div id="view-name"></div>
                <div id="active-users-container"></div>

                <hr/>
                <hr/>

                <div className="Chartjs">
                    <h3>This Week vs Last Week (by sessions)</h3>
                    <figure className="Chartjs-figure" id="chart-1-container"></figure>
                    <ol className="Chartjs-legend" id="legend-1-container"></ol>
                </div>
                <div className="Chartjs">
                    <h3>This Year vs Last Year (by users)</h3>
                    <figure className="Chartjs-figure" id="chart-2-container"></figure>
                    <ol className="Chartjs-legend" id="legend-2-container"></ol>
                </div>
                <div className="Chartjs">
                    <h3>Top Browsers (by pageview)</h3>
                    <figure className="Chartjs-figure" id="chart-3-container"></figure>
                    <ol className="Chartjs-legend" id="legend-3-container"></ol>
                </div>
                <div className="Chartjs">
                    <h3>Top Countries (by sessions)</h3>
                    <figure className="Chartjs-figure" id="chart-4-container"></figure>
                    <ol className="Chartjs-legend" id="legend-4-container"></ol>
                </div>
            </div>

        );
    }
}

AnalyticsContainer.propTypes = {};

export default AnalyticsContainer;
