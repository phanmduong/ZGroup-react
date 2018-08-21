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
import {OverlayTrigger, Tooltip} from "react-bootstrap";

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

    openStoreEventModal(id, isEdit) {
        this.props.eventActions.showStoreEventModal(true, id, isEdit);
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
            }.bind(this), 500
        );
    }

    handleSwitch(id, status, name) {
        this.props.eventActions.changeStatus(id, status, name);
    }

    render() {
        const Add = <Tooltip id="tooltip">Tạo sự kiện</Tooltip>;
        return (
            <div className="container-fluid">
                {this.props.isLoadingEvents ? <Loading/> :

                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <div style={{display: "flex"}}>
                                        <h4 className="card-title">
                                            <strong>Danh sách sự kiện</strong>
                                        </h4>
                                        <div>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={Add}
                                            >
                                                <button
                                                    className="btn btn-primary btn-round btn-xs button-add none-margin "
                                                    type="button"
                                                    onClick={() => this.openStoreEventModal(0, false)}
                                                >
                                                    <strong>+</strong>
                                                </button>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
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
                                handleSwitch={this.handleSwitch}
                                events={this.props.events}
                                openStoreEventModal={this.openStoreEventModal}
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
