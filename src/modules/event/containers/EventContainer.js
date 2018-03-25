import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import eventActions from "../actions/eventActions";
import StoreEventModalContainer from "./StoreEventModalContainer";

class EventContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openStoreEventModal = this.openStoreEventModal.bind(this);
    }

    openStoreEventModal() {
        this.props.eventActions.showStoreEventModal(true);
    }

    render() {
        return (
            <div className="container-fluid">
                <StoreEventModalContainer/>
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
                    </div>
                </div>
            </div>
        );
    }
}

EventContainer.propTypes = {
    eventActions: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
};

export default connect(
    state => {
        const { events } = state.event;
        return { events };
    },
    dispatch => {
        return {
            eventActions: bindActionCreators(eventActions, dispatch),
        };
    },
)(EventContainer);
