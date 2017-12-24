import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Barchart from "../Barchart";
import PointTaskBarchart from "./PointTaskBarchart";

// Import actions here!!

class DashboardItContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const dateArray = ["1/2/2017", "2/2/2017", "3/2/2017", "4/2/2017"];
        const pointByDate = [4, 3, 7, 9];
        const taskByDate = [2, 3, 3, 5];
        return (
            <div>
                <PointTaskBarchart
                    label={dateArray}
                    data={[pointByDate, taskByDate]}
                    id="barchar_task_and_point_by_date"/>
            </div>
        );
    }
}

DashboardItContainer.propTypes = {
    //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardItContainer);