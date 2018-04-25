import React from "react";
import SessionComponent from "./SessionComponent";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as sessionAction from "./sessionAction";
import {bindActionCreators} from 'redux';

class ShowingSessionContainer extends React.Component {
    render() {
        return (

            <SessionComponent
                sessions={this.props.showingSession}/>

        );
    }
}

ShowingSessionContainer.propTypes = {
    showingSession: PropTypes.array.isRequired,
    sessionAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showingSession: state.session.showingSession,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sessionAction: bindActionCreators(sessionAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowingSessionContainer);