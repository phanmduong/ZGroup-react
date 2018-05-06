import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import *as sessionAction from "./sessionAction";
import {Link} from 'react-router';
import AddEditSessionModal from "./AddEditSessionModal";


class SessionContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.state = {
            type: "edit",
            link: "/film/session",
        };
        this.timeOut = null;
    }

    componentWillMount() {
        this.props.sessionAction.loadAllSessions();
        this.props.sessionAction.loadAllFilms();
        this.props.sessionAction.loadShowingSession();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isSaving !== this.props.isSaving && !nextProps.isSaving) {
            this.props.sessionAction.loadAllSessions();
        }
    }

    render() {
        this.path = this.props.location.pathname;
        return (
            <div>
                <div style={{display: "flex"}}>
                    <Link to={`${this.state.link}/all`}>
                        <button type="button" style={{color: "white"}}
                                className={this.path === `${this.state.link}/all` ? 'btn-primary btn btn-round' : 'btn btn-round'}
                                data-dismiss="modal">
                            Tất cả
                            <div className="ripple-container"/>
                        </button>
                    </Link>&emsp;
                    <Link to={`${this.state.link}/showing`} style={{color: "white"}}>
                        <button type="button"
                                className={this.path === `${this.state.link}/showing` ? 'btn-primary btn btn-round' : 'btn btn-round'}
                                data-dismiss="modal">
                            Đang chiếu
                            <div className="ripple-container"/>
                        </button>
                    </Link>&emsp;
                </div>

                <div>
                    {this.props.children}
                </div>
                <AddEditSessionModal/>
            </div>
        );
    }
}

SessionContainer.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.element,
    sessionAction: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isSaving,
};

function mapStateToProps(state) {
    return {
        isSaving: state.session.isSaving,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sessionAction: bindActionCreators(sessionAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionContainer);