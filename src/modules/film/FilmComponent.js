import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router";
import {connect} from "react-redux";
import * as filmAction from "./filmAction";
import {bindActionCreators} from 'redux';
import {confirm} from "../../helpers/helper";
import TooltipButton from '../../components/common/TooltipButton';

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
                                    <div className="card-action" style={{height: 50, justifyContent:"space-between", display:"flex"}}>
                                        <div><h4 className="card-title" style={{ fontWeight: 400}}>
                                            <Link to={`/film/film/` + film.id}>
                                                {film.name}
                                            </Link>
                                        </h4>
                                        
                                        </div>
                                        <div className="btn-group-action">
                                            <TooltipButton text="Sửa phim" placement="top"><a onClick={()=>{
                                                       this.props.filmAction.showAddEditFilmModal();
                                                       this.props.filmAction.handleFilmModal(film);
                                                   }}><i className="material-icons">edit</i>
                                            </a></TooltipButton>
                                            <TooltipButton text="Xóa phim" placement="top"><a onClick={() => this.delFilm(film)}><i className="material-icons">delete</i></a></TooltipButton>
                                        </div>
                                    </div> 
                                    <div style={{display: "flex", justifyContent: "space-between", height: 60}}>
                                        <p className="category">{film.summary}</p>
                                    </div>   
                                    <div>{
                                            film.film_status == 0 ? <h5>Chưa sử dụng</h5> : ""
                                        }
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