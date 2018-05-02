import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import *as filmAction from "./filmAction";
import AddEditFilmModal from "./AddEditFilmModal";
import {Link} from 'react-router';
import Search from "../../components/common/Search";
import TooltipButton from "../../components/common/TooltipButton";
import Loading from "../../components/common/Loading";


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
    componentWillReceiveProps(nextProps) {
        if (nextProps.isSaving !== this.props.isSaving && !nextProps.isSaving) {
            this.props.filmAction.loadAllFilms();
        }
    }
    render() {
        this.path = this.props.location.pathname;
        return (
            <div>
                <Link to={`${this.state.link}/all`}>
                    <button type="button" style={{color: "white", width: 160}}
                            className={this.path === `${this.state.link}/all` ? 'btn-primary btn btn-round' : 'btn btn-round'}
                            data-dismiss="modal">
                        Tất cả phim
                        <div className="ripple-container"/>
                    </button>
                </Link>&emsp;
                <Link to={`${this.state.link}/showing`} style={{color: "white", width: 160}}>
                    <button type="button"
                            className={this.path === `${this.state.link}/showing` ? 'btn-primary btn btn-round' : 'btn btn-round'}
                            data-dismiss="modal">
                        Phim đang chiếu
                        <div className="ripple-container"/>
                    </button>
                </Link>&emsp;
                <Link to={`${this.state.link}/coming`} style={{color: "white", width: 160}}>
                    <button type="button"
                            className={this.path === `${this.state.link}/coming` ? 'btn-primary btn btn-round' : 'btn btn-round'}
                            data-dismiss="modal">
                        Phim sắp chiếu
                    </button>
                </Link>


                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <div className="flex-row flex">
                                <h4 className="card-title">
                                    <strong>Danh sách phim</strong>
                                </h4>
                                <div>
                                    <TooltipButton
                                        placement="top"
                                        text="Thêm film">
                                        <button
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            type="button"
                                            onClick={() => {
                                                this.props.filmAction.showAddEditFilmModal();
                                                this.props.filmAction.handleFilmModal({});
                                            }}>

                                            <strong>+</strong>
                                        </button>
                                    </TooltipButton>
                                </div>
                            </div>


                            <Search
                                onChange={() => {
                                }}
                                value=""
                                placeholder="Nhập tên phim để tìm kiếm"
                            />
                            <br/>
                        </div>
                        {
                            this.props.isLoading ? <Loading/> :
                                (
                                    <div>
                                        {this.props.children}
                                    </div>
                                )
                        }

                    </div>
                </div>
                <AddEditFilmModal/>
            </div>
        );
    }
}

FilmContainer.propTypes = {
    filmAction: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    children: PropTypes.element,
};

function mapStateToProps(state) {
    return {
        isLoading: state.film.isLoading,
        isSaving: state.film.isSaving,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmContainer);