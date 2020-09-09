import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as departmentActions from './departmentActions';
import HRTab from './HRTab';
//import Loading from '../../components/common/Loading';
import ListDepartments from '../../modules/manageDepartment/ListDepartments';
import AddDepartmentModal from '../../modules/manageDepartment/AddDepartmentModal';
import EditDepartmentModal from '../../modules/manageDepartment/EditDepartmentModal';
import * as helper from '../../helpers/helper';

class ManageDepartmentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openModalAddDepartment = this.openModalAddDepartment.bind(this);
        this.closeModalAddDepartment = this.closeModalAddDepartment.bind(this);
        this.openModalEditDepartment = this.openModalEditDepartment.bind(this);
        this.closeModalEditDepartment = this.closeModalEditDepartment.bind(this);
        this.addDepartment = this.addDepartment.bind(this);
        this.editDepartment = this.editDepartment.bind(this);
        this.deleteDepartment = this.deleteDepartment.bind(this);
        this.state = {
            page: 1,
            query: "",
            departments: [],
            openModalAddDepartment: false,
            openModalEditDepartment: false,
            editdata: {},
        };
    }

    componentWillMount() {
        this.props.departmentActions.loadDepartment();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLoading && !nextProps.isLoading) {
            this.setState({departments: nextProps.data.departments});
        }
    }

    //add
    openModalAddDepartment() {
        this.setState({openModalAddDepartment: true});
    }

    closeModalAddDepartment() {
        this.setState({openModalAddDepartment: false});
    }

    //edit
    openModalEditDepartment(obj) {
        this.setState({openModalEditDepartment: true, editdata: obj});
    }

    closeModalEditDepartment() {
        this.setState({openModalEditDepartment: false});
    }

    //actions
    addDepartment(data) {
        this.props.departmentActions.addDepartment(data, () => {
            this.closeModalAddDepartment();
            this.props.departmentActions.loadDepartment();
        });
    }

    editDepartment(data) {
        this.props.departmentActions.editDepartment(data, () => {
            this.closeModalEditDepartment();
            this.props.departmentActions.loadDepartment();
        });
    }

    //delete
    deleteDepartment(obj) {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa phòng ban này không?", () => {
            this.props.departmentActions.deleteDepartment(obj, this.props.departmentActions.loadDepartment);
        });
    }

    render() {
        return (
            <div>

                <HRTab path="manage-department"/>
                <div className="flex flex-space-between">
                    <div className="flex  flex-wrap tool-bar-actions width-100">


                        <button
                            className="btn button-green btn-icon margin-right-10"
                            onClick={this.openModalAddDepartment}
                            style={{padding: "12px 20px", height: 42, margin: '10px 10px 0 0'}}
                        ><i className="material-icons">add_circle</i>&nbsp;&nbsp;&nbsp;&nbsp;Thêm phòng ban
                        </button>

                    </div>
                </div>
                {/*<div className="card" mask="purple">*/}
                {/*    <img className="img-absolute"/>*/}
                {/*    <div className="card-content">*/}
                {/*        <div className="flex-row flex">*/}
                {/*            <h5 className="card-title">*/}
                {/*                <strong>Danh sách phòng ban</strong>*/}
                {/*            </h5>*/}
                {/*        </div>*/}
                {/*        <br/><br/>*/}
                {/*        <div className="flex-row flex flex-wrap" style={{marginTop: '8%'}}>*/}

                {/*            {this.props.user.role == 2 && <button*/}
                {/*                className="btn btn-white btn-round margin-right-10"*/}
                {/*                onClick={this.openModalAddDepartment}*/}
                {/*            >Thêm phòng ban*/}
                {/*            </button>}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <ListDepartments
                    isLoading={this.props.isLoading}
                    departments={this.props.data.departments}
                    edit={this.openModalEditDepartment}
                    delete={this.deleteDepartment}
                    disableActions={this.props.user.role != 2}
                />

                {/*<ul className="pagination pagination-primary">*/}
                {/*    {_.range(1, this.props.data.paginator.total_pages + 1).map(page => {*/}
                {/*        if (Number(this.props.data.paginator.page) === page) {*/}
                {/*            return (*/}
                {/*                <li key={page} className="active">*/}
                {/*                    <a onClick={() => {*/}
                {/*                    }}>{page}</a>*/}
                {/*                </li>*/}
                {/*            );*/}
                {/*        } else {*/}
                {/*            return (*/}
                {/*                <li key={page}>*/}
                {/*                    <a onClick={() => {*/}
                {/*                    }}>{page}</a>*/}
                {/*                </li>*/}
                {/*            );*/}
                {/*        }*/}

                {/*    })}*/}
                {/*</ul>*/}


                <AddDepartmentModal
                    show={this.state.openModalAddDepartment}
                    onHide={this.closeModalAddDepartment}
                    addDepartment={this.addDepartment}
                    isAddingDepartment={this.props.isLoading}
                />
                <EditDepartmentModal
                    show={this.state.openModalEditDepartment}
                    onHide={this.closeModalEditDepartment}
                    editDepartment={this.editDepartment}
                    isEditingDepartment={this.props.isLoading}
                    data={this.state.editdata}
                />
            </div>

        );
    }
}

ManageDepartmentContainer.propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.object,
    departmentActions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,

};


function mapStateToProps(state) {
    return {
        isLoading: state.department.isLoading,
        data: state.department.data,
        user: state.login.user,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        departmentActions: bindActionCreators(departmentActions, dispatch),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDepartmentContainer);
