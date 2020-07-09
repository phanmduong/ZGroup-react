import React from 'react';
import Loading from '../../components/common/Loading';
import ListRole from './ListRole';
import PropTypes from 'prop-types';
import HRTab from "../manageDepartment/HRTab";
import {Modal} from 'react-bootstrap';
import CreateRoleContainer from "./CreateRoleContainer";
import EditRoleContainer from "./EditRoleContainer";

class ManageRoleComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModalCreate: false,
            showModalEdit: false,
            roleId:''
        };
    }

    componentWillReceiveProps(nextProps) {
        if((this.props.isLoadingUpdateRole && !nextProps.isLoadingUpdateRole) || (this.props.isLoadingCreateRole && !nextProps.isLoadingCreateRole)){
            this.setState({showModalCreate: false,showModalEdit: false,});
        }
    }

    // redirectCreateRole() {
    //     browserHistory.push('/hr/create-role');
    // }

    openModalEdit = (roleId)=>{
        this.setState({roleId, showModalEdit:true, showModalCreate: false,});
    }

    render() {
        return (
            <div>

                <HRTab path="manage-role"/>


                <div className="card" mask="purple">
                    <img className="img-absolute"/>
                    <div className="card-content">

                        <div className="flex-row flex">
                            <h5 className="card-title"><strong>&#160;&#160;Danh sách chức vụ</strong></h5>
                            {/*{this.props.user.role == 2 &&  <div>*/}

                        </div>
                        <br/>
                        <div className="flex-row flex flex-wrap" style={{marginTop: '8%'}}>
                            <button
                                className="btn btn-white btn-round margin-right-10"
                                onClick={() => this.setState({showModalCreate: true})}
                            >Thêm chức vụ
                            </button>
                        </div>




                    </div>
                </div>

                {this.props.isLoadingRoles ? <Loading/> :
                    <ListRole
                        roles={this.props.roleListData}
                        deleteRole={this.props.deleteRole}
                        openModalEdit={this.openModalEdit}
                        disableActions={false}
                        // disableActions={this.props.user.role == 2}

                    />

                }
                <Modal
                    show={this.state.showModalCreate}
                    onHide={() => this.setState({showModalCreate: false})}
                >
                    {this.state.showModalCreate && <CreateRoleContainer/>}
                </Modal>
                <Modal
                    show={this.state.showModalEdit}
                    onHide={() => this.setState({showModalEdit: false})}
                >
                    {this.state.showModalEdit && <EditRoleContainer params={{roleId:this.state.roleId}}/>}
                </Modal>

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
