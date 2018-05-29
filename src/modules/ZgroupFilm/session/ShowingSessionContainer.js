import React from "react";
import SessionComponent from "./SessionComponent";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as filmAction from "../filmAction";
import {bindActionCreators} from 'redux';
import Pagination from "../../../components/common/Pagination";
import Loading from "../../../components/common/Loading";
import TooltipButton from "../../../components/common/TooltipButton";
import Search from "../../../components/common/Search";
import * as helper from "../../../helpers/helper";
// import Select from "react-select";
// import {Panel} from "react-bootstrap";
// import FormInputDate from "../../components/common/FormInputDate";


class ShowingSessionContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.state = {
            type: "edit",
            link: "/film/session",
            // openFilter: false,
            // filter: {
            //     startTime: "",
            //     endTime: "",
            // },
            page: 1,
            query: '',
        };
        this.timeOut = null;
        this.loadOrders = this.loadOrders.bind(this);
        this.showingSessionSearchChange = this.showingSessionSearchChange.bind(this);
    }
    componentWillMount(){
        if(!helper.isEmptyInput(this.props.search)){
            this.setState({
                query: this.props.search,
                page: 1
            });
        }
    }
    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.filmAction.loadShowingSession(page);
    }

    // updateFormFilter(event) {
    //     const field = event.target.name;
    //     let filter = {...this.state.filter};
    //     filter[field] = event.target.value;
    //     this.setState({filter: filter});
    // }
    showingSessionSearchChange(value){
        this.setState({
            query: value,
            page: 1
        });
        this.props.filmAction.showFilmSession(value);
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.filmAction.loadShowingSession(1, value);
            this.props.filmAction.loadAllSessions(1, value);
        }.bind(this), 500);
    }
    render() {
        let first = this.props.totalCountShowing ? (this.props.currentPageShowing - 1) * this.props.limitShowing + 1 : 0;
        let end = this.props.currentPageShowing < this.props.totalPagesShowing ? this.props.currentPageShowing * this.props.limitShowing : this.props.totalCountShowing;
        return (
            <div className="card">
                <div className="card-content">
                    <div className="tab-content">
                        <div className="flex-row flex">
                            <h4 className="card-title">
                                <strong>Danh sách suất chiếu đang chiếu</strong>
                            </h4>
                            <div>
                                <TooltipButton
                                    placement="top"
                                    text="Thêm suất chiếu">
                                    <button
                                        className="btn btn-primary btn-round btn-xs button-add none-margin"
                                        type="button"
                                        onClick={() => {
                                            this.props.filmAction.toggleSessionModal();
                                            this.props.filmAction.handleSessionModal({});
                                        }}>

                                        <strong>+</strong>
                                    </button>
                                </TooltipButton>
                            </div>
                            {/*<div>*/}
                                {/*<TooltipButton*/}
                                    {/*placement="top"*/}
                                    {/*text="Lọc theo ngày">*/}
                                    {/*<button*/}
                                        {/*className="btn btn-primary btn-round btn-xs button-add none-margin"*/}
                                        {/*type="button"*/}
                                        {/*onClick={() => this.setState({openFilter: !this.state.openFilter,})}>*/}
                                        {/*<i className="material-icons">*/}
                                            {/*filter_list*/}
                                        {/*</i>*/}
                                    {/*</button>*/}
                                {/*</TooltipButton>*/}
                            {/*</div>*/}
                        </div>


                        <Search
                            onChange={this.showingSessionSearchChange}
                            value={this.state.query}
                            placeholder="Nhập tên phim để tìm kiếm"
                        /><br/>
                        {/*<Panel collapsible expanded={this.state.openFilter}>*/}
                            {/*<div className="row">*/}
                                {/*<div className="col-md-3">*/}
                                    {/*<br/>*/}
                                    {/*<label className="label-control">Tên phim</label>*/}
                                    {/*<Select*/}
                                        {/*disabled={false}*/}
                                        {/*value={''}*/}
                                        {/*options={this.props.allFilms.map((film) => {*/}
                                            {/*return {*/}
                                                {/*...film,*/}
                                                {/*value: film.id,*/}
                                                {/*label: film.name*/}
                                            {/*};*/}
                                        {/*})}*/}
                                        {/*onChange={() => {*/}
                                        {/*}}*/}

                                    {/*/>*/}
                                {/*</div>*/}
                                {/*<div className="col-md-3">*/}
                                    {/*<FormInputDate*/}
                                        {/*label="Từ ngày"*/}
                                        {/*name="startTime"*/}
                                        {/*updateFormData={() =>*/}
                                            {/*this*/}
                                                {/*.updateFormFilter*/}
                                        {/*}*/}
                                        {/*id="form-start-time"*/}
                                        {/*value={*/}
                                            {/*this.state.filter.startTime*/}
                                        {/*}*/}
                                        {/*maxDate={*/}
                                            {/*this.state.filter.endTime*/}
                                        {/*}*/}
                                    {/*/>*/}
                                {/*</div>*/}
                                {/*<div className="col-md-3">*/}
                                    {/*<FormInputDate*/}
                                        {/*label="Đến ngày"*/}
                                        {/*name="endTime"*/}
                                        {/*updateFormData={() =>*/}
                                            {/*this.updateFormFilter*/}
                                        {/*}*/}
                                        {/*id="form-end-time"*/}
                                        {/*value={*/}
                                            {/*this.state.filter.endTime*/}
                                        {/*}*/}
                                        {/*minDate={*/}
                                            {/*this.state.filter.startTime*/}
                                        {/*}*/}
                                    {/*/>*/}
                                {/*</div>*/}

                            {/*</div>*/}
                        {/*</Panel>*/}
                        <br/>

                    </div>
                    <div>
                        {
                            this.props.isLoadingShowingSession ? <Loading/> :
                                <SessionComponent
                                    sessions={this.props.showingSession}/>
                        }

                        <br/>
                        <div className="row float-right">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                 style={{textAlign: 'right'}}>
                                <b style={{marginRight: '15px'}}>
                                    Hiển thị kêt quả từ {first}
                                    - {end}/{this.props.totalCountShowing}</b><br/>
                                <Pagination
                                    totalPages={this.props.totalPagesShowing}
                                    currentPage={this.props.currentPageShowing}
                                    loadDataPage={this.loadOrders}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

ShowingSessionContainer.propTypes = {
    showingSession: PropTypes.array.isRequired,
    allFilms: PropTypes.array.isRequired,
    filmAction: PropTypes.object.isRequired,
    isLoadingShowingSession: PropTypes.bool.isRequired,
    totalCountShowing: PropTypes.number.isRequired,
    totalPagesShowing: PropTypes.number.isRequired,
    limitShowing: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    currentPageShowing: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        showingSession: state.film.showingSession,
        isLoadingShowingSession: state.film.isLoadingShowingSession,
        totalCountShowing: state.film.totalCountShowing,
        totalPagesShowing: state.film.totalPagesShowing,
        currentPageShowing: state.film.currentPageShowing,
        limitShowing: state.film.limitShowing,
        allFilms: state.film.allFilms,
        search: state.film.search,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowingSessionContainer);