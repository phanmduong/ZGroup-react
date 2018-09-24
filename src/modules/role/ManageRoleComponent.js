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
                    <HRTab path="manage-role"/>
                </div>                
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <div className="flex-row flex">
                                    <h5 className="card-title"><strong>&#160;&#160;Danh sách chức vụ</strong></h5>
                                    {/*{this.props.user.role == 2 &&  <div>*/}
                                    {<div>
                                        <button className="btn btn-primary btn-round btn-xs button-add none-margin" onClick={() => this.redirectCreateRole()}>
                                            <strong>+</strong>
                                        </button>
                                    </div>}
                                </div>  
                                <br/>
                                
                                 
                                <div className="row">
                                {this.props.isLoadingRoles ? <Loading/> : (
                                    <ListRole
                                        roles={this.props.roleListData}
                                        deleteRole={this.props.deleteRole}
                                        disableActions={false}
                                        // disableActions={this.props.user.role == 2}

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
    user: PropTypes.object.isRequired,
};

export default ManageRoleComponent;
