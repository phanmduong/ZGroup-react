/**
 * Created by phanmduong on 9/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import Search from "../../components/common/Search";
import Loading from "../../components/common/Loading";
import PropTypes from 'prop-types';
import ListSubscribersList from './ListSubscribersList';
import * as emailSubscribersListActions from './emailSubscribersListActions';
import * as helper from '../../helpers/helper';
import {Modal} from 'react-bootstrap';
import FormInputText from '../../components/common/FormInputText';

class EmailSubscribersListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            showModal: false,
            edit: false,
            subscribersList: {}
        };
        this.timeOut = null;
        this.subscriberListSearchChange = this.subscriberListSearchChange.bind(this);
        this.deleteSubscriberList = this.deleteSubscriberList.bind(this);
        this.storeSubscribersList = this.storeSubscribersList.bind(this);
        this.subscriberListSearchChange = this.subscriberListSearchChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentWillMount() {
        this.loadSubscriberList();
    }

    subscriberListSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.emailSubscribersListActions.loadSubscribersList(1, value);
        }.bind(this), 500);

    }

    loadSubscriberList(page = 1) {
        this.setState({page});
        this.props.emailSubscribersListActions.loadSubscribersList(page, this.state.query);
    }

    deleteSubscriberList(subscriberListId) {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa email này không?", () => {
            this.props.emailSubscribersListActions.deleteSubscribersList(subscriberListId);
        });
    }

    updateFormData(event) {
        const field = event.target.name;
        let subscribersList = {...this.state.subscribersList};
        subscribersList[field] = event.target.value;
        this.setState({subscribersList: subscribersList});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    openModal(subscribersList = null) {
        if (subscribersList) {
            this.setState({
                showModal: true,
                edit: true,
                subscribersList: subscribersList,
            });
        } else {
            this.setState({
                showModal: true,
                edit: false,
                subscribersList: {
                    name: '',
                    id: ''
                },
            });
        }
    }

    storeSubscribersList() {
        helper.setFormValidation("#form-edit-email");
        if ($("#form-edit-email").valid()) {
            this.props.emailSubscribersListActions.storeSubscribersList(this.state.subscribersList, this.closeModal);
        }
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
                                    <div className="col-md-3">
                                        <button className="btn btn-rose" onClick={() => this.openModal()}>
                                            Tạo
                                        </button>
                                    </div>
                                    <Search
                                        onChange={this.subscriberListSearchChange}
                                        value={this.state.query}
                                        placeholder="Tìm kiếm"
                                        className="col-md-9"
                                    />
                                </div>
                            </div>

                            {this.props.isLoading ? <Loading/> :
                                <ListSubscribersList
                                    subscribersList={this.props.subscribersList}
                                    deleteSubscriberList={this.deleteSubscriberList}
                                    openModal={this.openModal}

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
                        <form id="form-edit-email" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <FormInputText
                                label="Tên"
                                name="name"
                                updateFormData={this.updateFormData}
                                value={this.state.subscribersList.name}
                                required={true}
                                type="text"
                            />
                            {
                                this.props.isStoring ?
                                    (
                                        <button
                                            className="btn btn-fill btn-rose disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/>
                                            {this.state.edit ? 'Đang cập nhật' : 'Đang tạo'}
                                        </button>
                                    )
                                    :
                                    <button
                                        className="btn btn-fill btn-rose"
                                        onClick={this.storeSubscribersList}
                                    >
                                        {this.state.edit ? 'Cập nhật' : 'Tạo'}
                                    </button>
                            }
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

EmailSubscribersListContainer.propTypes = {
    subscribersList: PropTypes.array.isRequired,
    emailSubscribersListActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isStoring: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        subscribersList: state.emailSubscribersList.subscribersList,
        isLoading: state.emailSubscribersList.isLoading,
        isStoring: state.emailSubscribersList.isStoring,
        currentPage: state.emailSubscribersList.currentPage,
        totalPages: state.emailSubscribersList.totalPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        emailSubscribersListActions: bindActionCreators(emailSubscribersListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSubscribersListContainer);
