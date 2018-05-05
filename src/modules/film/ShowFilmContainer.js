import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ShowFilmContainer extends React.Component {
	render() {
		let a = this.props.allFilms.filter((film) => film.id == this.props.params.filmId)[0];
		return (
			<div className="wrapper">
				<div className="content">
					<div className="content">
						<div className="container-fluid">
							<div>
								<div className="row">
									<div className="col-md-12">
										<div className="card">
											<div
												className="card-header card-header-icon"
												data-background-color="rose">
												<i className="material-icons">assignment</i>
											</div>
											<div className="card-content">
												<h4 className="card-title">{a.name}</h4>
												<br />
												<img style={{ width: '300px' }} src={a.avatar_url} />
												<h1>Trailer</h1>
												<iframe
													width="560px"
													height="315px"
													//https://www.youtube.com/watch?v=
													src={
														'https://www.youtube.com/embed/' +
														a.trailer_url.slice(32, 44)
													}
													frameBorder="0"
													allowFullScreen
												/>
												<div>director:{a.director}</div>
												<div>Diễn viên:{a.cast}</div>
												<div>running_time:{a.running_time}</div>
												<div>release_date:{a.release_date}</div>
												<div>country:{a.country}</div>
												<div>language:{a.language}</div>
												<div>film_genre:{a.film_genre}</div>
												<div>rate:{a.rate}</div>
												<div>summary:{a.summary}</div>
												<div>created_at:{a.created_at}</div>
												<div>updated_at:{a.updated_at}</div>
												<div>film_rated:{a.film_rated}</div>
												<Link type="button" className="btn btn-rose" to={`/film/all`}>
													Trở Lại
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ShowFilmContainer.propTypes = {
	params: PropTypes.object.isRequired,
	allFilms: PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return {
		allFilms: state.film.allFilms
	};
}

function mapDispatchToProps() {
	return {
		// weekendReportAction: bindActionCreators(weekendReportAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowFilmContainer);
