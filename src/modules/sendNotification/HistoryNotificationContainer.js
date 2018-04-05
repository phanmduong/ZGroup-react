import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Search from "../../components/common/Search";
import {Modal} from "react-bootstrap";
import SendNotificationContainer from "./SendNotificationContainer";
import ListSendNotifications from "./ListSendNotifications";
import * as sendNotificationActions from "./sendNotificationActions";
import Pagination from "../../components/common/Pagination";
import Loading from "../../components/common/Loading";

class HistoryNotificationContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            page: 1
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.historyNotiSearchChange = this.historyNotiSearchChange.bind(this);
        this.loadHistoryNotifications = this.loadHistoryNotifications.bind(this);
    }

    componentWillMount() {
        this.loadHistoryNotifications();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoading !== this.props.isLoading && !nextProps.isLoading) {
            this.setState({page: nextProps.currentPage});
        }
    }

    historyNotiSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.sendNotificationActions.loadHistoryNotifications(1, value);
        }.bind(this), 500);
    }

    loadHistoryNotifications(page = 1) {
        this.setState({page: page});
        this.props.sendNotificationActions.loadHistoryNotifications(page, this.state.query);
    }

    closeModal() {
        this.setState({showModal: false});
    }

    openModal() {
        this.setState({
            showModal: true,
        });
    }


    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <div className="flex-row flex">
                                    <h5 className="card-title">
                                        <strong>Gửi Notification</strong>
                                    </h5>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            type="button" onClick={() => this.openModal()}>
                                            <strong>+</strong>
                                        </button>
                                    </div>
                                </div>
                                <Search
                                    onChange={this.historyNotiSearchChange}
                                    value={this.state.query}
                                    placeholder="Tìm kiếm"
                                />
                            </div>

                            
                            {
                                this.props.isLoading ? <Loading/> :
                                    <ListSendNotifications
                                        historyNotifications={this.props.historyNotifications}
                                    />
                            }
                            <Pagination
                                totalPages={this.props.totalPages}
                                currentPage={this.state.page}
                                loadDataPage={this.loadNotificationTypes}
                            />
                        </div>
                    </div>


                </div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Gửi notification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SendNotificationContainer
                            closeModal={this.closeModal}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

HistoryNotificationContainer.propTypes = {
    sendNotificationActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    historyNotifications: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.sendNotification.isLoading,
        totalPages: state.sendNotification.totalPages,
        currentPage: state.sendNotification.currentPage,
        historyNotifications: state.sendNotification.historyNotifications,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendNotificationActions: bindActionCreators(sendNotificationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryNotificationContainer);
