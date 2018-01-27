import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as notificationTypeActions from './notificationTypeActions';
import Search from "../../components/common/Search";
import Pagination from "../../components/common/Pagination";
import Loading from "../../components/common/Loading";
import ListNotification from "./ListNotification";
import {confirm} from "../../helpers/helper";
import {Modal} from "react-bootstrap";
import StoreNotificationType from "./StoreNotificationType";

class ListNotificationTypeContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: '',
            showModal: false,
            edit: false,
            notificationType: {}
        };
        this.deleteNotificationType = this.deleteNotificationType.bind(this);
        this.loadNotificationTypes = this.loadNotificationTypes.bind(this);
        this.notificationTypesSearchChange = this.notificationTypesSearchChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    closeModal() {
        this.setState({showModal: false});
    }

    openModal(notificationType) {
        if (notificationType) {
            this.setState({
                edit: true,
                showModal: true,
                notificationType: notificationType
            });
        } else {
            this.setState({
                edit: false,
                showModal: true,
                notificationType: {}
            });
        }
    }

    componentWillMount() {
        this.loadNotificationTypes();
    }

    notificationTypesSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.notificationTypeActions.loadNotificationTypes(1, value);
        }.bind(this), 500);
    }

    deleteNotificationType(notificationType) {
        confirm('error', 'Xóa', "Bạn có muốn xóa loại thông báo này không?", () => {
            this.props.notificationTypeActions.deleteNotificationType(notificationType.id, this.state.page, this.state.query);
        });

    }

    loadNotificationTypes(page = 1) {
        this.setState({page: page});
        this.props.notificationTypeActions.loadNotificationTypes(page, this.state.query);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">

                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">Notification</h4>
                            <div className="row">
                                <div className="col-md-2">
                                    <button className="btn btn-rose" onClick={() => this.openModal()}>
                                        Tạo
                                    </button>
                                </div>
                                <div className="col-md-10">
                                    <Search
                                        onChange={this.notificationTypesSearchChange}
                                        value={this.state.query}
                                        placeholder="Tìm kiếm notification"
                                    />
                                </div>
                            </div>
                            {
                                this.props.isLoading ? <Loading/> :
                                    <ListNotification
                                        deleteNotificationType={this.deleteNotificationType}
                                        notificationTypes={this.props.notificationTypes}
                                        openModal={this.openModal}
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
                        <Modal.Title>{this.state.edit ? 'Sửa' : 'Tạo'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <StoreNotificationType
                            notificationType={this.state.notificationType}
                            closeModal={this.closeModal}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

ListNotificationTypeContainer.propTypes = {
    notificationTypeActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    notificationTypes: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.notificationType.isLoading,
        totalPages: state.notificationType.totalPages,
        notificationTypes: state.notificationType.notificationTypes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        notificationTypeActions: bindActionCreators(notificationTypeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNotificationTypeContainer);