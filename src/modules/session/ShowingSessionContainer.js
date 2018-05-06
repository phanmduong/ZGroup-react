import React from "react";
import SessionComponent from "./SessionComponent";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as sessionAction from "./sessionAction";
import {bindActionCreators} from 'redux';
import Pagination from "../../components/common/Pagination";
import Loading from "../../components/common/Loading";
import TooltipButton from "../../components/common/TooltipButton";
import Search from "../../components/common/Search";
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

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.sessionAction.loadShowingSession(page);
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
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.sessionAction.loadShowingSession(1, value);
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
                                            this.props.sessionAction.toggleSessionModal();
                                            this.props.sessionAction.handleSessionModal({});
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
                        />
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
    sessionAction: PropTypes.object.isRequired,
    isLoadingShowingSession: PropTypes.bool.isRequired,
    totalCountShowing: PropTypes.number.isRequired,
    totalPagesShowing: PropTypes.number.isRequired,
    limitShowing: PropTypes.number.isRequired,
    currentPageShowing: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        showingSession: state.session.showingSession,
        isLoadingShowingSession: state.session.isLoadingShowingSession,
        totalCountShowing: state.session.totalCountShowing,
        totalPagesShowing: state.session.totalPagesShowing,
        currentPageShowing: state.session.currentPageShowing,
        limitShowing: state.session.limitShowing,
        allFilms: state.session.allFilms,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sessionAction: bindActionCreators(sessionAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowingSessionContainer);