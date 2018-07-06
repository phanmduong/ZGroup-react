import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router";
import {connect} from "react-redux";
import * as filmAction from "../filmAction";
import {bindActionCreators} from 'redux';
import {confirm} from "../../../helpers/helper";
import TooltipButton from '../../../components/common/TooltipButton';
import Star from '../../../components/common/Star';
import Switch from 'react-bootstrap-switch';

class FilmComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.delFilm = this.delFilm.bind(this);
        this.changeFavoriteFilm = this.changeFavoriteFilm.bind(this);
        this.openSessionModal = this.openSessionModal.bind(this);
    }

    delFilm(film) {
        confirm("error", "Xóa film", "Bạn có chắc muốn xóa film này", () => {
            this.props.filmAction.deleteFilm(film);
        });
    }

    changeFavoriteFilm(film, e) {
        this.props.filmAction.changeFavoriteFilm2(film);
        e.stopPropagation();
    }

    openSessionModal(id) {
        this.props.filmAction.toggleSessionModal();
        this.props.filmAction.addFilmSessionOnTabFilm();
        this.props.filmAction.loadAllRooms();
        this.props.filmAction.handleSessionModal({
            film_id: id
        });
    }

    render() {

        return (
            <div className="row" id="list-base">
                {this.props.films && this.props.films.map((film, index) => {
                    return (
                        <div className="col-xs-12 col-sm-6 col-md-4" key={index}>
                            <div className="card card-chart">
                                <div className="card-header" data-background-color="white" style={{
                                    borderRadius: '10px'
                                }}>
                                    <div id="simpleBarChart" className="ct-chart"
                                         style={{
                                             width: '100%',
                                             background: 'url(' + film.avatar_url + ')',
                                             backgroundSize: 'cover',
                                             backgroundPosition: 'center',
                                             height: '200px',
                                             borderRadius: '10px',
                                             position: "relative"
                                         }}
                                    />
                                </div>
                                <div className="card-content" style={{minHeight: '140px'}}>
                                    <div className="card-action"
                                         style={{height: 55, justifyContent: "space-between", display: "flex"}}>
                                        <div>
                                            <TooltipButton placement="top" text={film.name}>
                                                <h4 className="card-title" style={{fontWeight: 300}}>
                                                    <Link to={`/film/session/all`}
                                                          onClick={() => this.props.filmAction.showFilmSession(film.name)}>
                                                        {film.name.length >= 19 ? film.name.slice(0, 18).concat("...") : film.name}
                                                    </Link>
                                                </h4>
                                            </TooltipButton>
                                            <div style={{marginTop: "-23px"}}>
                                                <div className="form-group">
                                                    <div className="flex flex-row-center">
                                                        <Star
                                                            value={film.rate}
                                                            maxStar={5}
                                                            disable={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between"
                                        }}>
                                            {
                                                this.props.user.role === 2 ?
                                                    <div className="dropdown" style={{position: "relative"}}>
                                                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                                                           data-toggle="dropdown">
                                                            <i className="material-icons">more_horiz</i>
                                                        </a>
                                                        <ul className="dropdown-menu dropdown-menu-right hover-dropdown-menu">
                                                            <li className="more-dropdown-item">
                                                                <a onClick={() => {
                                                                    event.stopPropagation(event);
                                                                    this.props.filmAction.showAddEditFilmModal();
                                                                    this.props.filmAction.handleFilmModal({
                                                                        ...film,
                                                                    });
                                                                }}>
                                                                    <i className="material-icons">edit</i> Sửa
                                                                </a>

                                                            </li>
                                                            <li className="more-dropdown-item">
                                                                <a onClick={(event) => {
                                                                    event.stopPropagation(event);
                                                                    this.delFilm(film);
                                                                }}>
                                                                    <i className="material-icons">delete</i> Xóa
                                                                </a>
                                                            </li>
                                                            <li className="more-dropdown-item">
                                                                <a onClick={() => {
                                                                    event.stopPropagation(event);
                                                                    this.openSessionModal(film.id);
                                                                }}>
                                                                    <i className="material-icons">add</i> Thêm suất chiếu
                                                                </a>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                    : ''
                                            }

                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", height: 60}}>
                                        <p className="category">
                                            {film.summary.length >= 71 ? film.summary.slice(0, 70).concat("...") : film.summary}
                                        </p>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", height: 25}}>


                                        {
                                            film.film_status == 1 ? <p/> : <div>
                                                {film.film_status == 0 ?
                                                    <b onClick={() => {
                                                        this.props.user.role === 2 ?
                                                            this.props.filmAction.editStatus(film.id, 2) :
                                                            "";
                                                    }}
                                                       className="text-paly">
                                                        {/*<i className="material-icons">done</i>*/}
                                                        Chưa dùng
                                                    </b> :
                                                    <b onClick={() => {
                                                        this.props.user.role === 2 ?
                                                            this.props.filmAction.editStatus(film.id, 0)
                                                            : "";
                                                    }}
                                                       style={{cursor: "pointer"}}>
                                                        {/*<i className="material-icons">done_all</i>*/}
                                                        Sắp chiếu
                                                    </b>}
                                            </div>
                                        }
                                        <div style={{
                                            height: '20px'
                                        }}>
                                            <Switch
                                                onChange={(e) => this.changeFavoriteFilm(film, e)}
                                                value={film.is_favorite == 1}
                                                onText="Thích" offText="Không"
                                                bsSize="mini"
                                                disabled={this.props.user.role !== 2}
                                            />
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
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmComponent);