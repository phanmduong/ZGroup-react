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
            <div id="page-wrapper">
                <div className="container-fluid">
                    <ul className="nav nav-tabs">
                        <li><Link to="/manage/quan-li-nhan-su">Nhân viên</Link></li>
                        <li  className="active"><Link to="/manage-role">Chức vụ</Link></li>
                    </ul>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={()=>this.redirectCreateRole()}
                    >
                        Tạo mới
                    </button>
                    {this.props.isLoadingRoles ? <Loading/> : (
                        <ListRole
                            roles={this.props.roleListData}
                        />
                    )
                    }
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
