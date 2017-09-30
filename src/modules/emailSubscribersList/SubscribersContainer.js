/**
 * Created by phanmduong on 9/26/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import Search from "../../components/common/Search";
import Loading from "../../components/common/Loading";
import PropTypes from 'prop-types';
import ListSubscribers from './ListSubscribers';
import * as helper from '../../helpers/helper';
import {Modal} from 'react-bootstrap';
import * as emailSubscribersListActions from './emailSubscribersListActions';

class SubscribersContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            showModalAddEmail: false,
            showModalUpFile: false,
            emails: ""
        };
        this.subscribersSearchChange = this.subscribersSearchChange.bind(this);
        this.closeModalAddEmail = this.closeModalAddEmail.bind(this);
        this.openModalAddEmail = this.openModalAddEmail.bind(this);
        this.closeModalUpFile = this.closeModalUpFile.bind(this);
        this.openModalUpFile = this.openModalUpFile.bind(this);
        this.addEmails = this.addEmails.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.deleteSubscriber = this.deleteSubscriber.bind(this);
        this.listId = this.props.params.listId;
    }


    componentWillMount() {
        if (this.listId) {
            this.loadSubscribers();
        }
    }

    componentDidUpdate() {
        $('#emails').tagsinput();
    }

    subscribersSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.emailSubscribersListActions.loadSubscribers(this.listId, 1, value);
        }.bind(this), 500);

    }

    loadSubscribers(page = 1) {
        this.setState({page});
        this.props.emailSubscribersListActions.loadSubscribers(this.listId, page, this.state.query);
    }

    closeModalAddEmail() {
        this.setState({showModalAddEmail: false});
    }

    openModalAddEmail() {
        this.setState({
            showModalAddEmail: true,
        });
    }

    closeModalUpFile() {
        this.setState({showModalUpFile: false});
    }

    openModalUpFile() {
        this.setState({
            showModalUpFile: true,
        });
    }

    addEmails() {
        this.setState({
            page: 1,
            query: ""
        });
        this.props.emailSubscribersListActions.addSubscribers(this.listId, $("#emails").val(), this.closeModalAddEmail);
    }

    uploadFile() {
        if (this.state.file == undefined || this.state.file == null) {
            helper.showTypeNotification("Vui lòng chọn file", "info");
            return;
        }
        this.props.emailSubscribersListActions.uploadFile(this.listId, this.state.file, this.closeModalUpFile);
    }

    deleteSubscriber(subscriberId) {
        this.props.emailSubscribersListActions.deleteSubscriber(this.listId, subscriberId);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">

                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">email</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Danh sách email</h4>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-5">
                                                <button className="btn btn-rose" onClick={this.openModalAddEmail}>
                                                    Thêm
                                                </button>
                                                <button className="btn btn-rose" onClick={this.openModalUpFile}>
                                                    Upload csv
                                                </button>
                                            </div>
                                            <Search
                                                onChange={this.subscribersSearchChange}
                                                value={this.state.query}
                                                placeholder="Tìm kiếm"
                                                className="col-md-7"
                                            />
                                        </div>
                                    </div>

                                    {this.props.isLoading ? <Loading/> :
                                        <ListSubscribers
                                            subscribers={this.props.subscribers}
                                            deleteSubscriber={this.deleteSubscriber}
                                        />
                                    }
                                </div>
                                <div className="card-content">
                                    <ul className="pagination pagination-primary">
                                        {_.range(1, this.props.totalPages + 1).map(page => {
                                            if (Number(this.state.page) === page) {
                                                return (
                                                    <li key={page} className="active">
                                                        <a onClick={() => this.loadSubscribers(page)}>{page}</a>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={page}>
                                                        <a onClick={() => this.loadSubscribers(page)}>{page}</a>
                                                    </li>
                                                );
                                            }

                                        })}
                                    </ul>
                                </div>
                            </div>


                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header card-header-icon"
                                     data-background-color="rose">
                                    <i className="material-icons">perm_identity</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">
                                        {this.listId ? "Sửa danh sách email" : "Tạo danh sách email"}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <Modal show={this.state.showModalAddEmail} onHide={this.closeModalAddEmail}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm email</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-muted">
                            Các email cần được ngăn cách bởi dấu "," hoặc ENTER
                        </p>
                        <div className="row">
                            <div className="col-md-12">
                                <input type="text" className="tagsinput" data-role="tagsinput" data-color="rose"
                                       name="emails"
                                       placeholder="Thêm emails"
                                       id="emails"
                                />
                            </div>
                        </div>
                        {this.props.isLoadingAddEmails ?
                            (
                                <button className="btn btn-fill btn-rose disabled"
                                        type="button">
                                    <i className="fa fa-spinner fa-spin"/> Đang thêm
                                </button>
                            )
                            :
                            (
                                <button
                                    className="btn btn-fill btn-rose"
                                    type="button"
                                    onClick={this.addEmails}
                                >
                                    Thêm
                                </button>
                            )

                        }
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showModalUpFile} onHide={this.closeModalUpFile}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload CSV</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-muted">
                            Bạn có thể tải file mẫu <a href="http://d1j8r0kxyu9tj8.cloudfront.net/csv/sample.csv">tại
                            đây</a>
                        </p>
                        <div className="row">
                            <div className="col-sm-3 col-xs-5">
                                <button className="btn btn-fill btn-rose" type="button">
                                    Chọn file
                                    <input type="file"
                                           accept=".csv,.xls,.xlsx"
                                           onChange={(event) => {
                                               this.setState({
                                                   file: event.target.files[0]
                                               });
                                           }}
                                           style={{
                                               cursor: 'pointer',
                                               opacity: "0.0",
                                               position: "absolute",
                                               top: 0,
                                               left: 0,
                                               bottom: 0,
                                               right: 0,
                                               width: "100%",
                                               height: "100%"
                                           }}
                                    />
                                </button>
                            </div>
                            <div className="col-sm-9 col-xs-7" style={{height: "61px"}}>
                                {
                                    this.state.file &&
                                    <div className="flex-row-center full-height">
                                        <p className="none-margin">
                                            {this.state.file.name}
                                        </p>
                                    </div>


                                }
                            </div>

                        </div>
                        <div className="flex-row-center">
                            {this.props.isLoadingAddEmails ?
                                (
                                    <button className="btn btn-fill btn-rose disabled"
                                            type="button">
                                        <i className="fa fa-spinner fa-spin"/> Đang upload
                                    </button>
                                )
                                :
                                (
                                    <button
                                        className="btn btn-fill btn-rose"
                                        type="button"
                                        onClick={this.uploadFile}
                                    >
                                        Upload
                                    </button>
                                )

                            }
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
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    emailSubscribersListActions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        subscribers: state.emailSubscribersList.subscribers.subscribers,
        isLoading: state.emailSubscribersList.subscribers.isLoading,
        isLoadingAddEmails: state.emailSubscribersList.isLoadingAddEmails,
        currentPage: state.emailSubscribersList.subscribers.currentPage,
        totalPages: state.emailSubscribersList.subscribers.totalPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        emailSubscribersListActions: bindActionCreators(emailSubscribersListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribersContainer);
