import React from 'react';
import FilmComponent from "./FilmComponent";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import *as filmAction from "../filmAction";
import Pagination from "../../../components/common/Pagination";


class ShownFilmContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        // this.state = {
        //     page: 1,
        //     query: ''
        // };
        this.loadOrders = this.loadOrders.bind(this);
    }
    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.filmAction.loadShownFilms(page);
    }
    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;
        return (
            <div>
                <FilmComponent films={this.props.shownFilms}/><br/>
                <div className="row float-right">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                         style={{textAlign: 'right'}}>
                        <b style={{marginRight: '15px'}}>
                            Hiển thị kêt quả từ {first}
                            - {end}/{this.props.totalCount}</b><br/>
                        <Pagination
                            totalPages={this.props.totalPages}
                            currentPage={this.props.currentPage}
                            loadDataPage={this.loadOrders}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ShownFilmContainer.propTypes = {
    shownFilms: PropTypes.array.isRequired,
    filmAction: PropTypes.object.isRequired,
    totalCount: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
};

function mapStateToProps(state) {
    return {
        shownFilms: state.film.shownFilms,
        limit: state.film.limitShown,
        totalCount: state.film.totalCountShown,
        totalPages: state.film.totalPagesShown,
        currentPage: state.film.currentPageShown,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShownFilmContainer);