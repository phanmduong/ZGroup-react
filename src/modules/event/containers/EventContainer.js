import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import eventActions from "../actions/eventActions";
import StoreEventModalContainer from "./StoreEventModalContainer";
import Pagination from "../../../components/common/Pagination";
import Loading from "../../../components/common/Loading";
import Search from "../../../components/common/Search";
import ListEvents from "../components/ListEvents";

class EventContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            limit: 9,
        };
        this.openStoreEventModal = this.openStoreEventModal.bind(this);
        this.loadEvents = this.loadEvents.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }


    componentWillMount() {
        this.loadEvents(this.state.page, this.state.limit);
    }

    openStoreEventModal() {
        this.props.eventActions.showStoreEventModal(true);
    }

    loadEvents(page = 1) {
        this.setState({page});
        this.props.eventActions.loadEvents(page, this.state.limit);
    }

    onSearchChange(query) {
        this.setState({
            query,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            function () {
                this.props.eventActions.loadEvents(this.state.page, this.state.limit, query);
            }, 500
        );
    }
    handleSwitch(id, status, name) {
        this.props.eventActions.changeStatus(id, status, name);
    }

    render() {
        // console.log(this.props.events, this.props.totalPages);
        return (
            <div className="container-fluid">
                {this.props.isLoadingEvents ? <Loading/> :
                    <div className="card">
                        <div
                            className="card-header card-header-icon"
                            data-background-color="rose"
                        >
                            <i className="material-icons">assignment</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Danh sách sự kiện</h4>
                            <div className="row">
                                <div className="col-md-4">
                                    <a
                                        onClick={this.openStoreEventModal}
                                        className="btn btn-rose"
                                    >
                                        Tạo sự kiện
                                    </a>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-10">
                                    <Search
                                        onChange={this.onSearchChange}
                                        value={this.state.query}
                                        placeholder="Tìm kiếm tiêu đề"
                                    />
                                </div>
                            </div>


                            <ListEvents
                                handleSwitch = {this.handleSwitch}
                                events={this.props.events}
                                openModal={this.openStoreEventModal}
                            />
                            <div className="card-content">
                                <Pagination
                                    totalPages={this.props.totalPages}
                                    currentPage={this.state.page}
                                    loadDataPage={this.loadEvents}
                                />
                            </div>

                        </div>
                    </div>
                }
                <StoreEventModalContainer/>
            </div>
        );
    }
}

EventContainer.propTypes = {
    eventActions: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    isLoadingEvents: PropTypes.bool.isRequired,
};

export default connect(
    (state) => {
        return {
            events: state.event.events,
            totalPages: state.event.totalPages,
            isLoadingEvents: state.event.isLoadingEvents,
        };
    },
    dispatch => {
        return {
            eventActions: bindActionCreators(eventActions, dispatch),
        };
    },
)(EventContainer);
