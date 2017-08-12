import React from 'react';
import {Link, browserHistory} from 'react-router';
import Loading from '../common/Loading';
import ListRole from './ListRole';
import PropTypes from 'prop-types';

class ManageRoleComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    redirectCreateRole() {
        browserHistory.push('create-role');
    }

    render() {
        return (
            <div>
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header card-header-tabs" data-background-color="rose">
                            <div className="nav-tabs-navigation">
                                <div className="nav-tabs-wrapper">
                                    <ul className="nav nav-tabs" data-tabs="tabs">
                                        <li>
                                            <Link to="manage/quan-li-nhan-su">
                                                Nhân viên
                                                <div className="ripple-container"/>
                                            </Link>
                                        </li>
                                        <li className="active">
                                            <Link to="manage-role">
                                                Chức vụ
                                                <div className="ripple-container"/>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="tab-content">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="col-md-3">
                                            <button
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={() => this.redirectCreateRole()}
                                            >
                                                Tạo mới
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                {this.props.isLoadingRoles ? <Loading/> : (
                                    <ListRole
                                        roles={this.props.roleListData}
                                    />
                                )
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ManageRoleComponent.propTypes = {
    roleListData: PropTypes.array.isRequired,
    isLoadingRoles: PropTypes.bool.isRequired,
};

export default ManageRoleComponent;
