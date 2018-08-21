import React from "react";
import AddReportComponent from "./AddReportComponent";
import PropTypes from "prop-types";

class WeekendReportContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <h4 className="card-title">
                                <strong>Báo cáo cuối tuần</strong>
                            </h4>
                            <br/>
                            {
                                (
                                    <AddReportComponent
                                        params={this.props.params}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

WeekendReportContainer.propTypes = {
    params: PropTypes.object.isRequired,
};


export default WeekendReportContainer;

