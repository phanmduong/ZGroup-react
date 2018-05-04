import React from 'react';
import FilmComponent from "./FilmComponent";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import *as filmAction from "./filmAction";


class ShowingFilmContainer extends React.Component{
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let showing = this.props.allFilms.filter((film)=>(film.film_status == 1));
        return (

            <FilmComponent films={showing}/>
        );
    }
}
ShowingFilmContainer.propTypes = {
    allFilms: PropTypes.array.isRequired,
    filmAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        allFilms: state.film.allFilms,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowingFilmContainer);