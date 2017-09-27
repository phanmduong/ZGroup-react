/**
 * Created by phanmduong on 9/27/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import Search from "../../components/common/Search";
import Loading from "../../components/common/Loading";
// import PropTypes from 'prop-types';
// import * as helper from '../../helpers/helper';
import * as emailCampaignActions from './emailCampaignActions';
import {Modal} from 'react-bootstrap';
// import FormInputText from '../../components/common/FormInputText';
import ListCampaign from './ListCampaign';

class EmailCampaignsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            showModal: false,
        };
        this.campaignsSearchChange = this.campaignsSearchChange.bind(this);
        this.ownerId = this.props.params.ownerId;
    }

    componentWillMount() {
        this.loadCampaigns();
        if (this.props.params.ownerId) {
            this.ownerId = this.props.params.ownerId;
        } else {
            this.ownerId = "";
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.ownerId !== this.props.params.ownerId) {
            this.ownerId = nextProps.params.ownerId;
            this.setState({
                query: ''
            });
            this.props.emailCampaignActions.loadCampaigns(1, '', this.ownerId);
        }
    }

    campaignsSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.emailCampaignActions.loadCampaigns(1, value, this.ownerId);
        }.bind(this), 500);

    }

    loadCampaigns(page = 1) {
        this.setState({page});
        this.props.emailCampaignActions.loadCampaigns(page, this.state.query, this.ownerId);
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
                            <h4 className="card-title">Chiến dịch</h4>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="col-md-3">
                                        <button className="btn btn-rose" onClick={() => this.openModal()}>
                                            Tạo
                                        </button>
                                    </div>
                                    <Search
                                        onChange={this.campaignsSearchChange}
                                        value={this.state.query}
                                        placeholder="Tìm kiếm"
                                        className="col-md-9"
                                    />
                                </div>
                            </div>

                            {this.props.isLoading ? <Loading/> :
                                <ListCampaign
                                    campaigns={this.props.campaigns}
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
                                            <a onClick={() => this.loadCampaigns(page)}>{page}</a>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={page}>
                                            <a onClick={() => this.loadCampaigns(page)}>{page}</a>
                                        </li>
                                    );
                                }

                            })}
                        </ul>
                    </div>

                </div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chỉnh sửa chiến dịch</Modal.Title>
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
        campaigns: state.emailCampaigns.campaigns,
        isLoading: state.emailCampaigns.isLoading,
        totalPages: state.emailCampaigns.totalPages,
        currentPage: state.emailCampaigns.currentPage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        emailCampaignActions: bindActionCreators(emailCampaignActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailCampaignsContainer);
