import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as departmentActions from './departmentActions';
import HRTab from './HRTab';

import Search from '../../components/common/Search';
//import Loading from '../../components/common/Loading';
import ListDepartments from '../../modules/manageDepartment/ListDepartments';
import AddDepartmentModal from '../../modules/manageDepartment/AddDepartmentModal';
import EditDepartmentModal from '../../modules/manageDepartment/EditDepartmentModal';
import _ from 'lodash';
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
            this.setState({ departments: nextProps.data.departments });
        }
    }

    //add
    openModalAddDepartment() {
        this.setState({ openModalAddDepartment: true });
    }

    closeModalAddDepartment() {
        this.setState({ openModalAddDepartment: false });
    }

    //edit
    openModalEditDepartment(obj) {
        this.setState({ openModalEditDepartment: true, editdata: obj });
    }

    closeModalEditDepartment() {
        this.setState({ openModalEditDepartment: false });
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
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa bộ phận này không?", () => {
            this.props.departmentActions.deleteDepartment(obj, this.props.departmentActions.loadDepartment);
        });
    }

    render() {
        return (
            <div>
                <div className="col-lg-12">
                    <HRTab path="manage-department" />
                </div>
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <div className="flex-row flex">
                                    <h5 className="card-title">
                                        <strong>Danh sách bộ phận</strong>
                                    </h5>
                                    {this.props.user.role == 2 && <div>
                                        <button
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            type="button" onClick={this.openModalAddDepartment}>
                                            <strong>+</strong>
                                        </button>
                                    </div>}
                                </div>
                                <Search
                                    onChange={() => { }}
                                    value={''}
                                    placeholder="Tìm kiếm bộ phận"
                                />
                                <br /><br />
                                <div className="row">
                                    <ListDepartments
                                        isLoading={this.props.isLoading}
                                        departments={this.props.data.departments}
                                        edit={this.openModalEditDepartment}
                                        delete={this.deleteDepartment}
                                        disableActions={this.props.user.role == 2}
                                    />
                                </div>
                                <ul className="pagination pagination-primary">
                                    {_.range(1, this.props.data.paginator.total_pages + 1).map(page => {
                                        if (Number(this.props.data.paginator.page) === page) {
                                            return (
                                                <li key={page} className="active">
                                                    <a onClick={() => {
                                                    }}>{page}</a>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={page}>
                                                    <a onClick={() => {
                                                    }}>{page}</a>
                                                </li>
                                            );
                                        }

                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
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
