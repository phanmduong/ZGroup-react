/**
 * Created by phanmduong on 9/26/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import Search from "../../components/common/Search";
import Loading from "../../components/common/Loading";
// import PropTypes from 'prop-types';
import ListSubscribers from './ListSubscribers';
// import * as helper from '../../helpers/helper';
import {Modal} from 'react-bootstrap';
// import FormInputText from '../../components/common/FormInputText';
import * as emailSubscribersListActions from './emailSubscribersListActions';

class SubscribersContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
        };
        this.subscribersSearchChange = this.subscribersSearchChange.bind(this);
        this.listId = this.props.params.listId;
    }


    componentWillMount() {
        this.loadSubscribers();
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

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">

                    <div className="card">

                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">email</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">Danh sách email</h4>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="col-md-4 col-sm-3 ">
                                        <button className="btn btn-rose" onClick={() => this.openModal()}>
                                            Thêm
                                        </button>
                                        <button className="btn btn-rose" onClick={() => this.openModal()}>
                                            Upload csv
                                        </button>
                                    </div>
                                    <Search
                                        onChange={this.subscribersSearchChange}
                                        value={this.state.query}
                                        placeholder="Tìm kiếm"
                                        className="col-md-8 col-sm-9"
                                    />
                                </div>
                            </div>

                            {this.props.isLoading ? <Loading/> :
                                <ListSubscribers
                                    subscribers={this.props.subscribers}
                                />
                            }
                        </div>
                    </div>

                    <div className="card-content">
                        <ul className="pagination pagination-primary">
                            {_.range(1, this.props.totalPages + 1).map(page => {
                                if (Number(this.state.page) === page) {
                                    return (
                                        <li key={page} className="active">
                                            <a onClick={() => this.loadSubscriberList(page)}>{page}</a>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={page}>
                                            <a onClick={() => this.loadSubscriberList(page)}>{page}</a>
                                        </li>
                                    );
                                }

                            })}
                        </ul>
                    </div>

                </div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chỉnh sửa email</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        subscribers: state.emailSubscribersList.subscribers.subscribers,
        isLoading: state.emailSubscribersList.subscribers.isLoading,
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
