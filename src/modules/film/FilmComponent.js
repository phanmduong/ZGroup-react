import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router";
import {connect} from "react-redux";
import * as filmAction from "./filmAction";
import {bindActionCreators} from 'redux';
import {confirm} from "../../helpers/helper";


class FilmComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.delFilm = this.delFilm.bind(this);
    }
    delFilm(film) {
        confirm("error", "Xóa film", "Bạn có chắc muốn xóa film này", () => {
            this.props.filmAction.deleteFilm(film);
        });
    }
    render() {
        return (
            <div className="row" id="list-base">
                {this.props.films && this.props.films.map((film, index) => {
                    return (
                        <div className="col-sm-4" key={index}>
                            <div className="card card-chart">
                                <div className="card-header" data-background-color="white" style={{
                                    borderRadius: '10px'
                                }}>
                                    <Link to={`/film/film/` + film.id}>
                                            <div id="simpleBarChart" className="ct-chart"
                                                 style={{
                                                     width: '100%',
                                                     background: 'url(' + film.avatar_url + ')',
                                                     backgroundSize: 'cover',
                                                     backgroundPosition: 'center',
                                                     height: '200px',
                                                     borderRadius: '10px'
                                                 }}
                                            />
                                    </Link>
                                </div>
                                <div className="card-content" style={{minHeight: '140px'}}>
                                    <div className="card-action" style={{height: 50}}>
                                        <Link to={`/film/film/` + film.id}>
                                            <h4 className="card-title">
                                                {film.name}
                                            </h4>
                                        </Link>
                                        <div className="btn-group-action">
                                            <div style={{display: 'inline-block'}}>
                                                <a data-toggle="tooltip" title=""
                                                   onClick={()=>{
                                                       this.props.filmAction.showAddEditFilmModal();
                                                       this.props.filmAction.handleFilmModal(film);
                                                   }}
                                                   type="button" rel="tooltip"
                                                   data-original-title="Sửa"><i
                                                    className="material-icons">edit</i></a></div>
                                            <a data-toggle="tooltip" title="" type="button" rel="tooltip"
                                               onClick={() => this.delFilm(film)}
                                               data-original-title="Xoá"><i className="material-icons">delete</i></a>
                                        </div>
                                        <div>{
                                            film.film_status == 0 ? <h5>Chưa sử dụng</h5> : ""
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                        ;
                })
                }
            </div>
        );
    }
}

FilmComponent.propTypes = {
    films: PropTypes.array.isRequired,
    filmAction: PropTypes.object.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmComponent);