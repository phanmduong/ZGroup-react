import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as eventActions from "../actions/eventActions";

class EventContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return <div>test</div>;
    }
}

EventContainer.propTypes = {
    eventActions: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
};

export default connect(
    state => {
        const { events } = state.event;
        return { events };
    },
    dispatch => {
        return {
            eventActions: bindActionCreators(eventActions, dispatch),
        };
    },
);
