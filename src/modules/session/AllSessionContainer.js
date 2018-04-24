import React from "react";
import SessionComponent from "./SessionComponent";
import * as sessionAction from "./sessionAction";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

class AllSessionContainer extends React.Component {
    render() {
        return (
            <SessionComponent
                sessions={this.props.allSessions}/>
        );
    }
}

AllSessionContainer.propTypes = {
    allSessions: PropTypes.array.isRequired,
    sessionAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        allSessions: state.session.allSessions,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sessionAction: bindActionCreators(sessionAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSessionContainer);