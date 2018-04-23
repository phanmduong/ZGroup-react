import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import *as sessionAction from "./sessionAction";
import {Link} from 'react-router';
import AddEditSessionModal from "./AddEditSessionModal";
import TooltipButton from "../../components/common/TooltipButton";
import Search from "../../components/common/Search";

class SessionContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.state = {
            type: "edit",
            link: "/film/session",
            //query:'',
        };
        this.timeOut = null;
    }
    componentWillMount() {
        this.props.sessionAction.loadAllSessions();
        this.props.sessionAction.loadAllFilms();
        this.props.sessionAction.loadShowingSession();
        this.props.sessionAction.loadComingSession();
    }
    // templatesSearchChange(value) {
    //     this.setState({
    //         query: value,
    //     });
    //     if (this.timeOut !== null) {
    //         clearTimeout(this.timeOut);
    //     }
    //     this.timeOut = setTimeout(function () {
    //         this.props.sessionAction.loadDaySession(value);
    //     }.bind(this), 500);
    // }
    render() {

        this.path = this.props.location.pathname;
        return (
            <div>
                <Link to={`${this.state.link}/all`}>
                    <button type="button" style={{color: "white"}}
                            className={this.path === `${this.state.link}/all` ? 'btn-primary btn btn-round' : 'btn btn-round'}
                            data-dismiss="modal">
                        Tất cả
                        <div className="ripple-container"/>
                    </button>
                </Link>&emsp;
                <Link to={`${this.state.link}/showing`} style={{color: "white"}}>
                    <button type="button"
                            className={this.path === `${this.state.link}/showing` ? 'btn-primary btn btn-round' : 'btn btn-round'}
                            data-dismiss="modal">
                        Đang chiếu
                        <div className="ripple-container"/>
                    </button>
                </Link>&emsp;
                {/*<Link to={`${this.state.link}/day`}>*/}
                    {/*<FormInputDate*/}
                        {/*label="Thời gian bắt đầu"*/}
                        {/*value={this.state.query}*/}
                        {/*updateFormData={this.templatesSearchChange}*/}
                        {/*name="start_date"*/}
                        {/*id="form-start-time"*/}
                    {/*/>*/}
                {/*</Link><br/><br/>*/}


                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <div className="flex-row flex">
                                <h4 className="card-title">
                                    <strong>Danh sách suất chiếu</strong>
                                </h4>
                                <div>
                                    <TooltipButton
                                        placement="top"
                                        text="Thêm suất chiếu">
                                        <button
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            type="button"
                                            onClick={()=>{
                                                this.props.sessionAction.toggleSessionModal();
                                                this.props.sessionAction.handleSessionModal({});
                                            }}>

                                            <strong>+</strong>
                                        </button>
                                    </TooltipButton>
                                </div>
                            </div>


                            <Search
                                onChange={()=>{}}
                                value=""
                                placeholder="Nhập tên phim để tìm kiếm"
                            />
                            <br/>
                        </div>
                        <div>
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <AddEditSessionModal/>
            </div>
        );
    }
}

SessionContainer.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.element,
    sessionAction: PropTypes.object.isRequired
};

function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sessionAction:bindActionCreators(sessionAction,dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionContainer);