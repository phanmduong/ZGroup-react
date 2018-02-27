/**
 * Created by phanmduong on 9/26/17.
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import Search from "../../components/common/Search";
import Loading from "../../components/common/Loading";
import PropTypes from "prop-types";
import ListSubscribers from "./ListSubscribers";
import * as helper from "../../helpers/helper";
import { Modal } from "react-bootstrap";
import * as emailSubscribersListActions from "./emailSubscribersListActions";
import FormInputText from "../../components/common/FormInputText";
import { utils } from "xlsx";
import * as emailSubcribersListApi from "./emailSubcribersListApi";

class SubscribersContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            showModalAddEmail: false,
            showModalUpFile: false,
            emails: "",
            subscribersList: {},
            subscriber: {},
        };
        this.subscribersSearchChange = this.subscribersSearchChange.bind(this);
        this.closeModalAddEmail = this.closeModalAddEmail.bind(this);
        this.openModalAddEmail = this.openModalAddEmail.bind(this);
        this.closeModalUpFile = this.closeModalUpFile.bind(this);
        this.openModalUpFile = this.openModalUpFile.bind(this);
        this.addEmails = this.addEmails.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.deleteSubscriber = this.deleteSubscriber.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.storeSubscribersList = this.storeSubscribersList.bind(this);
        this.updateFormDataSubscriber = this.updateFormDataSubscriber.bind(
            this,
        );
        this.listId = this.props.params.listId;
        this.exportExcel = this.exportExcel.bind(this);
    }

    componentWillMount() {
        if (this.listId) {
            this.loadSubscribers();
            this.loadSubscribersListItem(this.listId);
        } else {
            this.props.emailSubscribersListActions.init();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.subscribersListItem.id !=
            this.props.subscribersListItem.id
        ) {
            this.setState({
                subscribersList: nextProps.subscribersListItem,
            });
        }
    }

    componentDidUpdate() {
        $("#emails").tagsinput();
    }

    async exportExcel() {
        this.props.emailSubscribersListActions.showGlobalLoading();
        const res = await emailSubcribersListApi.loadSubscribers(
            this.listId,
            1,
            this.state.query,
            -1,
        );

        this.props.emailSubscribersListActions.hideGlobalLoading();

        const wsData = res.data.subscribers.map(subscriber => [
            subscriber.name ? subscriber.name : "",
            subscriber.email ? subscriber.email : "",
        ]);

        const ws = utils.aoa_to_sheet([["Tên", "Email"], ...wsData]);

        const sheetName = "Danh sách người đăng kí";
        let workbook = {
            SheetNames: [],
            Sheets: {},
        };
        workbook.SheetNames.push(sheetName);

        workbook.Sheets[sheetName] = ws;

        helper.saveWorkBookToExcel(workbook, this.state.subscribersList.name);
    }

    updateFormData(event) {
        const field = event.target.name;
        let subscribersList = { ...this.state.subscribersList };
        subscribersList[field] = event.target.value;
        this.setState({ subscribersList: subscribersList });
    }

    storeSubscribersList() {
        helper.setFormValidation("#form-edit-email");
        if ($("#form-edit-email").valid()) {
            this.props.emailSubscribersListActions.storeSubscribersList(
                this.state.subscribersList,
            );
        }
    }

    subscribersSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            function() {
                this.props.emailSubscribersListActions.loadSubscribers(
                    this.listId,
                    1,
                    value,
                );
            }.bind(this),
            500,
        );
    }

    loadSubscribers(page = 1) {
        this.setState({ page });
        this.props.emailSubscribersListActions.loadSubscribers(
            this.listId,
            page,
            this.state.query,
        );
    }

    closeModalAddEmail() {
        this.setState({ showModalAddEmail: false });
    }

    openModalAddEmail(subscriber) {
        if (subscriber) {
            this.setState({
                showModalAddEmail: true,
                subscriber: subscriber,
                edit: true,
            });
        } else {
            this.setState({
                showModalAddEmail: true,
                subscriber: {},
                edit: false,
            });
        }
    }

    closeModalUpFile() {
        this.setState({ showModalUpFile: false });
    }

    openModalUpFile() {
        this.setState({
            showModalUpFile: true,
        });
    }

    addEmails() {
        helper.setFormValidation("#form-add-subscriber");
        if ($("#form-add-subscriber").valid()) {
            this.setState({
                page: 1,
                query: "",
            });
            if (this.state.edit) {
                this.props.emailSubscribersListActions.editSubscriber(
                    this.state.subscriber,
                    this.closeModalAddEmail,
                );
            } else {
                this.props.emailSubscribersListActions.addSubscriber(
                    this.listId,
                    this.state.subscriber,
                    this.closeModalAddEmail,
                );
            }
        }
    }

    uploadFile() {
        if (this.state.file == undefined || this.state.file == null) {
            helper.showTypeNotification("Vui lòng chọn file", "info");
            return;
        }
        this.props.emailSubscribersListActions.uploadFileSubscribers(
            this.listId,
            this.state.file,
            this.closeModalUpFile,
        );
    }

    deleteSubscriber(subscriberId) {
        this.props.emailSubscribersListActions.deleteSubscriber(
            this.listId,
            subscriberId,
        );
    }

    loadSubscribersListItem(listId) {
        this.props.emailSubscribersListActions.loadSubscribersListItem(listId);
    }

    updateFormDataSubscriber(event) {
        const field = event.target.name;
        let subscriber = { ...this.state.subscriber };
        subscriber[field] = event.target.value;
        this.setState({ subscriber: subscriber });
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div
                                    className="card-header card-header-icon"
                                    data-background-color="rose"
                                >
                                    <i className="material-icons">email</i>
                                </div>

                                {this.props.subscribersListItem.id ||
                                this.props.isLoadingSubscribersListItem ||
                                this.props.isLoading ? (
                                    <div>
                                        <div className="card-content">
                                            <h4 className="card-title">
                                                Danh sách email
                                            </h4>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <button
                                                        className="btn btn-warning"
                                                        onClick={() =>
                                                            this.openModalAddEmail()
                                                        }
                                                    >
                                                        <i className="material-icons">
                                                            add_circle
                                                        </i>
                                                        Thêm
                                                    </button>
                                                    <button
                                                        className="btn btn-rose"
                                                        onClick={
                                                            this.openModalUpFile
                                                        }
                                                    >
                                                        <i className="material-icons">
                                                            file_upload
                                                        </i>
                                                        Upload csv
                                                    </button>
                                                    <button
                                                        className="btn btn-success"
                                                        disabled={
                                                            this.props
                                                                .isLoadingSubscribersListItem
                                                        }
                                                        onClick={
                                                            this.exportExcel
                                                        }
                                                    >
                                                        <i className="material-icons">
                                                            file_download
                                                        </i>
                                                        Export Excel
                                                    </button>
                                                </div>
                                                <Search
                                                    onChange={
                                                        this
                                                            .subscribersSearchChange
                                                    }
                                                    value={this.state.query}
                                                    placeholder="Tìm kiếm"
                                                    className="col-md-12"
                                                />
                                            </div>

                                            {this.props.isLoading ? (
                                                <Loading />
                                            ) : (
                                                <ListSubscribers
                                                    subscribers={
                                                        this.props.subscribers
                                                    }
                                                    deleteSubscriber={
                                                        this.deleteSubscriber
                                                    }
                                                    openModalAddEmail={
                                                        this.openModalAddEmail
                                                    }
                                                />
                                            )}
                                        </div>
                                        <div className="card-content">
                                            <ul className="pagination pagination-primary">
                                                {_.range(
                                                    1,
                                                    this.props.totalPages + 1,
                                                ).map(page => {
                                                    if (
                                                        Number(
                                                            this.state.page,
                                                        ) === page
                                                    ) {
                                                        return (
                                                            <li
                                                                key={page}
                                                                className="active"
                                                            >
                                                                <a
                                                                    onClick={() =>
                                                                        this.loadSubscribers(
                                                                            page,
                                                                        )
                                                                    }
                                                                >
                                                                    {page}
                                                                </a>
                                                            </li>
                                                        );
                                                    } else {
                                                        return (
                                                            <li key={page}>
                                                                <a
                                                                    onClick={() =>
                                                                        this.loadSubscribers(
                                                                            page,
                                                                        )
                                                                    }
                                                                >
                                                                    {page}
                                                                </a>
                                                            </li>
                                                        );
                                                    }
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="card-content">
                                        <h4 className="card-title" />
                                        <div className="flex-row-center flex-justify-content-center">
                                            <h4>
                                                Vui lòng tạo danh sách email
                                            </h4>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div
                                    className="card-header card-header-icon"
                                    data-background-color="rose"
                                >
                                    <i className="material-icons">
                                        perm_identity
                                    </i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">
                                        {this.listId
                                            ? "Sửa danh sách email"
                                            : "Tạo danh sách email"}
                                    </h4>
                                    {this.props.isLoadingSubscribersListItem ? (
                                        <Loading />
                                    ) : (
                                        <form
                                            id="form-edit-email"
                                            onSubmit={e => {
                                                e.preventDefault();
                                            }}
                                        >
                                            <FormInputText
                                                label="Tên"
                                                name="name"
                                                updateFormData={
                                                    this.updateFormData
                                                }
                                                value={
                                                    this.state.subscribersList
                                                        .name
                                                }
                                                required={true}
                                                type="text"
                                            />
                                            {this.props.isStoring ? (
                                                <button className="btn btn-fill btn-rose disabled">
                                                    <i className="fa fa-spinner fa-spin" />
                                                    {this.listId
                                                        ? " Đang cập nhật"
                                                        : " Đang tạo"}
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-fill btn-rose"
                                                    onClick={
                                                        this
                                                            .storeSubscribersList
                                                    }
                                                >
                                                    {this.listId
                                                        ? "Cập nhật"
                                                        : "Tạo"}
                                                </button>
                                            )}
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.state.showModalAddEmail}
                    onHide={this.closeModalAddEmail}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.state.edit ? "Sửa email" : "Thêm email"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form
                            id="form-add-subscriber"
                            onSubmit={e => {
                                e.preventDefault();
                            }}
                        >
                            <FormInputText
                                label="Tên"
                                name="name"
                                updateFormData={this.updateFormDataSubscriber}
                                value={this.state.subscriber.name}
                                type="text"
                            />
                            <FormInputText
                                name="email"
                                label="Email"
                                type="email"
                                required
                                value={this.state.subscriber.email}
                                updateFormData={this.updateFormDataSubscriber}
                            />
                        </form>
                        {this.props.isLoadingAddEmails ? (
                            <button
                                className="btn btn-fill btn-rose disabled"
                                type="button"
                            >
                                <i className="fa fa-spinner fa-spin" />
                                {this.state.edit
                                    ? " Đang cập nhật"
                                    : " Đang thêm"}
                            </button>
                        ) : (
                            <button
                                className="btn btn-fill btn-rose"
                                type="button"
                                onClick={this.addEmails}
                            >
                                {this.state.edit ? " Cập nhật" : " Thêm"}
                            </button>
                        )}
                    </Modal.Body>
                </Modal>
                <Modal
                    show={this.state.showModalUpFile}
                    onHide={this.closeModalUpFile}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Upload CSV</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-muted">
                            Bạn có thể tải file mẫu{" "}
                            <a href="http://d1j8r0kxyu9tj8.cloudfront.net/csv/sample.csv">
                                tại đây
                            </a>
                        </p>
                        <div className="row">
                            <div className="col-sm-3 col-xs-5">
                                <button
                                    className="btn btn-fill btn-rose"
                                    type="button"
                                >
                                    Chọn file
                                    <input
                                        type="file"
                                        accept=".csv,.xls,.xlsx"
                                        onChange={event => {
                                            this.setState({
                                                file: event.target.files[0],
                                            });
                                        }}
                                        style={{
                                            cursor: "pointer",
                                            opacity: "0.0",
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </button>
                            </div>
                            <div
                                className="col-sm-9 col-xs-7"
                                style={{ height: "61px" }}
                            >
                                {this.state.file && (
                                    <div className="flex-row-center full-height">
                                        <p className="none-margin">
                                            {this.state.file.name}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-row-center">
                            {this.props.isLoadingAddEmails ? (
                                <button
                                    className="btn btn-fill btn-rose disabled"
                                    type="button"
                                >
                                    <i className="fa fa-spinner fa-spin" /> Đang
                                    upload
                                </button>
                            ) : (
                                <button
                                    className="btn btn-fill btn-rose"
                                    type="button"
                                    onClick={this.uploadFile}
                                >
                                    Upload
                                </button>
                            )}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

SubscribersContainer.propTypes = {
    subscribers: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingAddEmails: PropTypes.bool.isRequired,
    isStoring: PropTypes.bool.isRequired,
    isLoadingSubscribersListItem: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    emailSubscribersListActions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    subscribersListItem: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        subscribers: state.emailSubscribersList.subscribers.subscribers,
        isLoading: state.emailSubscribersList.subscribers.isLoading,
        isLoadingAddEmails: state.emailSubscribersList.isLoadingAddEmails,
        currentPage: state.emailSubscribersList.subscribers.currentPage,
        totalPages: state.emailSubscribersList.subscribers.totalPages,
        isLoadingSubscribersListItem:
            state.emailSubscribersList.isLoadingSubscribersListItem,
        subscribersListItem: state.emailSubscribersList.subscribersListItem,
        isStoring: state.emailSubscribersList.isStoring,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        emailSubscribersListActions: bindActionCreators(
            emailSubscribersListActions,
            dispatch,
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    SubscribersContainer,
);
