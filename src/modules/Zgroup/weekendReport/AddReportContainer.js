import React from "react";
import {connect} from 'react-redux';
import AddReportComponent from "./AddReportComponent";
import PropTypes from "prop-types";
// import {bindActionCreators} from 'redux';
// import PropTypes from 'prop-types';
// import *as weekendReportAction from "./weekendReportAction";

class WeekendReportContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div className="wrapper">
                <div className="content">
                    <div className="content">
                        <div className="container-fluid">
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header card-header-icon"
                                                 data-background-color="rose"><i
                                                className="material-icons">assignment</i>
                                            </div>
                                            <div className="card-content"><h4 className="card-title">Báo cáo cuối tuần</h4>
                                                <br/>
                                                {
                                                    (
                                                        <AddReportComponent
                                                        params = {this.props.params}
                                                        />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

function mapStateToProps(   ) {
    return {
    };
}

function mapDispatchToProps() {
    return {
       // weekendReportAction: bindActionCreators(weekendReportAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekendReportContainer);

