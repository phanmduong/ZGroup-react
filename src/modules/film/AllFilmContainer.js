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
            <div>
                <div className="form-group is-empty">
                    <div className="flex-row flex">
                        <h4 className="card-title" style={{lineHeight: '0px'}}><strong>Danh sách film</strong></h4>
                        <div style={{lineHeight: '5  px'}}>
                            <button
                                onClick={()=>{
                                    this.props.filmAction.showAddEditFilmModal();
                                    this.props.filmAction.handleFilmModal({});
                                }}
                                className="btn btn-primary btn-round btn-xs button-add none-margin" type="button">
                                <strong>+</strong>
                            </button>
                        </div>
                    </div>
                    <Search
                        onChange={()=>{}}
                        value=""
                        placeholder="Nhập tên hoặc nội dung tin nhắn để tìm"
                    /><br/>
                </div>
                <FilmComponent films={this.props.allFilms}/>
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