import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import *as sessionAction from "./sessionAction";
import {Link} from 'react-router';
import AddEditSessionModal from "./AddEditSessionModal";
import TooltipButton from "../../components/common/TooltipButton";
import Search from "../../components/common/Search";
import Select from "react-select";
import {Panel} from "react-bootstrap";
import FormInputDate from "../../components/common/FormInputDate";

class SessionContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.state = {
            type: "edit",
            link: "/film/session",
            openFilter: false,
            filter: {
                startTime: "",
                endTime: "",
            },
        };
        this.timeOut = null;
    }

    componentWillMount() {
        this.props.sessionAction.loadAllSessions();
        this.props.sessionAction.loadAllFilms();
        this.props.sessionAction.loadShowingSession();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isSaving !== this.props.isSaving && !nextProps.isSaving) {
            this.props.sessionAction.isLoadingAllSessions();
        }
    }
    updateFormFilter(event) {
        const field = event.target.name;
        let filter = {...this.state.filter};
        filter[field] = event.target.value;
        this.setState({filter: filter});
    }

    render() {
        this.path = this.props.location.pathname;
        return (
            <div>
                <div style={{display: "flex"}}>
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
                </div>
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
                                            onClick={() => {
                                                this.props.sessionAction.toggleSessionModal();
                                                this.props.sessionAction.handleSessionModal({});
                                            }}>

                                            <strong>+</strong>
                                        </button>
                                    </TooltipButton>
                                </div>
                                <div>
                                    <TooltipButton
                                        placement="top"
                                        text="Lọc theo ngày">
                                        <button
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            type="button"
                                            onClick={() => this.setState({openFilter: !this.state.openFilter,})}>
                                            <i className="material-icons">
                                                filter_list
                                            </i>
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
                            <Panel collapsible expanded={this.state.openFilter}>
                            <div className="row">
                                <div className="col-md-3">
                                    <br/>
                                    <label className="label-control">Tên phim</label>
                                    <Select
                                        disabled={false}
                                        value={''}
                                        options={this.props.allFilms.map  ((film) => {
                                            return {
                                                ...film,
                                                value: film.id,
                                                label: film.name
                                            };
                                        })}
                                        onChange={()=>{}}

                                    />
                                </div>
                                <div className="col-md-3">
                                    <FormInputDate
                                        label="Từ ngày"
                                        name="startTime"
                                        updateFormData={() =>
                                            this
                                                .updateFormFilter
                                        }
                                        id="form-start-time"
                                        value={
                                            this.state.filter.startTime
                                        }
                                        maxDate={
                                            this.state.filter.endTime
                                        }
                                    />
                                </div>
                                <div className="col-md-3">
                                    <FormInputDate
                                        label="Đến ngày"
                                        name="endTime"
                                        updateFormData={() =>
                                            this.updateFormFilter
                                        }
                                        id="form-end-time"
                                        value={
                                            this.state.filter.endTime
                                        }
                                        minDate={
                                            this.state.filter.startTime
                                        }
                                    />
                                </div>

                            </div>
                            </Panel>
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
    allFilms: PropTypes.array.isRequired,
    children: PropTypes.element,
    sessionAction: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isSaving
};

function mapStateToProps(state) {
    return {
        allFilms: state.session.allFilms,
        isSaving: state.session.isSaving,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sessionAction: bindActionCreators(sessionAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionContainer);