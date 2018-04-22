import React from 'react';
import FilmComponent from "./FilmComponent";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import *as filmAction from "./filmAction";
import Search from "../../components/common/Search";


class AllFilmContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <div className="tab-content">
                        <div className="flex-row flex">
                            <h4 className="card-title">
                                <strong>Danh sách tất cả phim</strong>
                            </h4>
                            <div>
                                <button
                                    className="btn btn-primary btn-round btn-xs button-add none-margin"
                                    type="button" class="btn btn-primary btn-round btn-xs button-add none-margin" type="button"
                                    onClick={()=>{
                                            this.props.filmAction.showAddEditFilmModal();
                                            this.props.filmAction.handleFilmModal({});
                                    }}>
                                    <strong>+</strong>
                                </button>
                            </div>
                        </div>
                                
                    
                        <Search
                            onChange={()=>{}}
                            value=""
                            placeholder="Nhập tên hoặc nội dung tin nhắn để tìm"
                        />
                        <br/>
                    </div>
                    <FilmComponent films={this.props.allFilms}/>
                </div>    
            </div>
        );
    }
}

AllFilmContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AllFilmContainer);