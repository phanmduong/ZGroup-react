import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import *as filmAction from "../filmAction";
import {Link} from 'react-router';
import AddEditSessionModal from "./AddEditSessionModal";
import AddEditFilmModal from "../film/AddEditFilmModal";
import * as helper from "../../../helpers/helper";


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
        !helper.isEmptyInput(this.props.search) ? this.props.filmAction.loadAllSessions(1, this.props.search) :this.props.filmAction.loadAllSessions();
        !helper.isEmptyInput(this.props.search) ? this.props.filmAction.loadShowingSession(1, this.props.search) :this.props.filmAction.loadShowingSession();
        !helper.isEmptyInput(this.props.search) ? this.props.filmAction.loadShownSession(1, this.props.search) :this.props.filmAction.loadShownSession();
        this.props.filmAction.loadAllFilms();
        this.props.filmAction.loadAllRooms(20);
    }

    componentDidMount(){
        this.props.filmAction.showFilmSession("");
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isSaving !== this.props.isSaving && !nextProps.isSaving) {
            this.props.filmAction.loadAllSessions();
            this.props.filmAction.loadShowingSession();
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
                    <Link to={`${this.state.link}/shown`} style={{color: "white"}}>
                        <button type="button"
                                className={this.path === `${this.state.link}/shown` ? 'btn-primary btn btn-round' : 'btn btn-round'}
                                data-dismiss="modal">
                            Đã chiếu
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
                <AddEditFilmModal/>
            </div>
        );
    }
}

SessionContainer.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.element,
    filmAction: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    search: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        isSaving: state.film.isSaving,
        search: state.film.search,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionContainer);