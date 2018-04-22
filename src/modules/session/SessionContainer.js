import FormInputDate from '../../components/common/FormInputDate';
import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import *as sessionAction from "./sessionAction";
import {Link} from 'react-router';
import AddEditSessionModal from "./AddEditSessionModal";

class SessionContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.state = {
            type: "edit",
            link: "/film/session",
            query:'',
        };
        this.timeOut = null;
    }
    componentWillMount() {
        this.props.sessionAction.loadAllSessions();
        this.props.sessionAction.loadAllFilms();
        this.props.sessionAction.loadShowingSession();
        this.props.sessionAction.loadComingSession();
    }
    templatesSearchChange(value) {
        this.setState({
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.sessionAction.loadDaySession(value);
        }.bind(this), 500);
    }
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
                <Link to={`${this.state.link}/coming`} style={{color: "white"}}>
                    <button type="button"
                            className={this.path === `${this.state.link}/coming` ? 'btn-primary btn btn-round' : 'btn btn-round'}
                            data-dismiss="modal">
                        Sắp chiếu
                    </button>
                </Link>&emsp;
                <Link to={`${this.state.link}/day`}>
                    <FormInputDate
                        label="Thời gian bắt đầu"
                        value={this.state.query}
                        updateFormData={this.templatesSearchChange}
                        name="start_date"
                        id="form-start-time"
                    />
                </Link><br/><br/>

                <div className="tab-content">
                    {this.props.children}
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