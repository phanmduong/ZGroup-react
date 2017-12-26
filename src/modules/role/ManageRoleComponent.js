import React from 'react';
import { browserHistory} from 'react-router';
import Loading from '../../components/common/Loading';
import ListRole from './ListRole';
import PropTypes from 'prop-types';
import HRTab from "../manageDepartment/HRTab";
class ManageRoleComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    redirectCreateRole() {
        browserHistory.push('/hr/create-role');
    }

    render() {
        return (
            <div>
                <div className="col-lg-12">
                    <div className="card">
                        <HRTab path="manage-role"/>
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
                                        deleteRole={this.props.deleteRole}
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
    deleteRole: PropTypes.func.isRequired,
};

export default ManageRoleComponent;
