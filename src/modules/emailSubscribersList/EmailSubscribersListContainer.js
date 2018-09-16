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
import {Link} from 'react-router';

class EmailSubscribersListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
        };
        this.timeOut = null;
        this.subscriberListSearchChange = this.subscriberListSearchChange.bind(this);
        this.deleteSubscriberList = this.deleteSubscriberList.bind(this);
        this.subscriberListSearchChange = this.subscriberListSearchChange.bind(this);
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

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <div className="flex-row flex">
                                    <h4 className="card-title">
                                        <strong>Danh sách email</strong>
                                    </h4>
                                    <div>
                                        <Link className="btn btn-primary btn-round btn-xs button-add none-margin" to={"email/subscribers"}>
                                            <strong>+</strong>
                                        </Link>
                                    </div>
                                </div>
                                <Search
                                    onChange={this.subscriberListSearchChange}
                                    value={this.state.query}
                                    placeholder="Tìm kiếm"
                                />
                                {this.props.isLoading ? <Loading/> :
                                    <ListSubscribersList
                                        subscribersList={this.props.subscribersList}
                                        deleteSubscriberList={this.deleteSubscriberList}
                                    />
                                }
                            </div>    
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
            </div>
        );
    }
}

EmailSubscribersListContainer.propTypes = {
    subscribersList: PropTypes.array.isRequired,
    emailSubscribersListActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        subscribersList: state.emailSubscribersList.subscribersList,
        isLoading: state.emailSubscribersList.isLoading,
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
