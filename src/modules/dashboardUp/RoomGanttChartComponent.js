import React from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import Select from "../../components/common/Select";
// import * as dashboardActions from "./dashboardActions";
// import Loading from "../../components/common/Loading";
// import FormInputDate from "../../components/common/FormInputDate";
// import { Panel } from "react-bootstrap";
// import PropTypes from "prop-types";
// import * as d3 from "d3";

class RoomGanttChartComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidUpdate() {}

    render() {
        return (
            <div>
                <div style={{ width: "20%" }}>Phòng 101</div>
                <div className="bar" style={{ width: "20%" }} />
                <div
                    className="bar"
                    style={{ width: "30%", marginLeft: "10%" }}
                />
            </div>
        );
    }
}

RoomGanttChartComponent.propTypes = {};

// export default connect(mapStateToProps, mapDispatchToProps)(DashBoardUpContainer);
export default RoomGanttChartComponent;
