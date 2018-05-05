import React from 'react';
import FilmComponent from "./FilmComponent";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import *as filmAction from "./filmAction";
import Pagination from "../../components/common/Pagination";


class AllFilmContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: ''
        };
        this.loadOrders = this.loadOrders.bind(this);
    }
    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.filmAction.loadAllFilmsHavePagination(page);
    }
    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;
        return (
            <div>
            <FilmComponent films={this.props.allFilmsHavePagination}/><br/>
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

AllFilmContainer.propTypes = {
    allFilmsHavePagination: PropTypes.array.isRequired,
    filmAction: PropTypes.object.isRequired,
    totalCount: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        allFilmsHavePagination: state.film.allFilmsHavePagination,
        limit: state.film.limit,
        totalCount: state.film.totalCount,
        totalPages: state.film.totalPages,
        currentPage: state.film.currentPage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFilmContainer);