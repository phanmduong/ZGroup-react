/**
 * Created by phanmduong on 10/17/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import Loading from '../../components/common/Loading';
import _ from 'lodash';
import Search from "../../components/common/Search";
import * as staffActions from './staffActions';
import ListStaff from './ListStaff';

class AddUserToStaff extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeRoleStaff = this.changeRoleStaff.bind(this);
        this.changeBaseStaff = this.changeBaseStaff.bind(this);
        this.usersSearchChange = this.usersSearchChange.bind(this);
        this.state = {
            page: 1,
            query: ""
        };
        this.timeOut = null;
    }

    componentWillMount() {
        this.loadUsers();
    }

    changeRoleStaff(staffId, roleId) {
        this.props.staffActions.changeRoleStaff(staffId, roleId);
    }

    changeBaseStaff(staffId, baseId) {
        this.props.staffActions.changeBaseStaff(staffId, baseId);
    }

    usersSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.staffActions.loadUsersData(this.state.page, this.state.query);
        }.bind(this), 500);
    }

    loadUsers(page = 1) {
        this.setState({page});
        this.props.staffActions.loadUsersData(page, this.state.query);
    }

    render() {
        let roleListData = (this.props.roleListData !== undefined) ? this.props.roleListData : [];
        let baseListData = (this.props.baseListData !== undefined) ? this.props.baseListData : [];
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <Search
                                onChange={this.usersSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm tài khoản"
                            />
                        </div>
                    </div>
                    <div className="row">
                        {this.props.isLoadingUsers ? <Loading/> : (
                            <ListStaff
                                staffs={this.props.userListData}
                                roles={[{id: 0, role_title: ''}, ...roleListData]}
                                bases={[{id: 0, name: '', address: ''}, ...baseListData]}
                                changeRoleStaff={this.changeRoleStaff}
                                changeBaseStaff={this.changeBaseStaff}
                                disableActions
                                titleList="Danh sách người dùng"
                            />
                        )
                        }
                    </div>
                    <div className="card-content">
                        <ul className="pagination pagination-primary">
                            {_.range(1, this.props.totalPages + 1).map(page => {
                                if (Number(this.props.currentPage) === page) {
                                    return (
                                        <li key={page} className="active">
                                            <a onClick={() => this.loadUsers(page)}>{page}</a>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={page}>
                                            <a onClick={() => this.loadUsers(page)}>{page}</a>
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

AddUserToStaff.propTypes = {
    staffActions: PropTypes.object.isRequired,
    isLoadingUsers: PropTypes.bool.isRequired,
    userListData: PropTypes.array.isRequired,
    roleListData: PropTypes.array.isRequired,
    baseListData: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
};

AddUserToStaff.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        isLoadingUsers: state.staffs.users.isLoading,
        userListData: state.staffs.users.userListData,
        currentPage: state.staffs.users.currentPage,
        totalPages: state.staffs.users.totalPages,
        roleListData: state.staffs.roles.roleListData,
        baseListData: state.staffs.bases.basesData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        staffActions: bindActionCreators(staffActions, dispatch),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToStaff);
