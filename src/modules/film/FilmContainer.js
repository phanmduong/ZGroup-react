import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import *as filmAction from "./filmAction";
import AddEditFilmModal from "./AddEditFilmModal";
import {Link} from 'react-router';


class FilmContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.state = {
            type: "edit",
            link: "/film"
        };
    }
    componentWillMount() {
        this.props.filmAction.loadAllFilms();
    }

    render() {
        this.path = this.props.location.pathname;
        return (
            <div>
                <Link to={`${this.state.link}/all`}>
                    <button type="button" style={{color: "white", width:160}}
                            className={this.path === `${this.state.link}/all` ? 'btn-primary btn btn-round' : 'btn btn-round'}
                            data-dismiss="modal">
                        Tất cả phim
                        <div className="ripple-container"/>
                    </button>
                </Link>&emsp;
                <Link to={`${this.state.link}/showing`} style={{color: "white", width:160}}>
                    <button type="button"
                            className={this.path === `${this.state.link}/showing` ? 'btn-primary btn btn-round' : 'btn btn-round'}
                            data-dismiss="modal">
                        Phim đang chiếu
                        <div className="ripple-container"/>
                    </button>
                </Link>&emsp;
                <Link to={`${this.state.link}/coming`} style={{color: "white", width:160}}>
                    <button type="button"
                            className={this.path === `${this.state.link}/coming` ? 'btn-primary btn btn-round' : 'btn btn-round'}
                            data-dismiss="modal">
                        Phim sắp chiếu
                    </button>
                </Link>

                <div>
                    {this.props.children}
                </div>
                <AddEditFilmModal/>
            </div>
        );
    }
}

FilmContainer.propTypes = {
    filmAction: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    children: PropTypes.element
};

function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmContainer);