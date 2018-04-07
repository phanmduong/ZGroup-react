import React from 'react';
import {Link} from 'react-router';
import Loading from '../../components/common/Loading';
import Search from '../../components/common/Search';
import ListStaff from './ListStaff';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Modal} from 'react-bootstrap';
import AddUserToStaff from './AddUserToStaff';
import HRTab from "../manageDepartment/HRTab";
class ManageStaffsComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModalAddUserToStaff: false,
        };
        this.closeModalAddUserToStaff = this.closeModalAddUserToStaff.bind(this);
        this.openModalAddUserToStaff = this.openModalAddUserToStaff.bind(this);
    }

    closeModalAddUserToStaff() {
        this.setState({showModalAddUserToStaff: false});
    }

    openModalAddUserToStaff() {
        this.setState({showModalAddUserToStaff: true});
    }

    render() {
        return (
            <div>
                <div className="col-lg-12">
                    <HRTab path="manage/quan-li-nhan-su"/>
                </div>
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <div className="flex-row flex">
                                    <h5 className="card-title">
                                        <strong>Danh sách nhân viên</strong>
                                    </h5>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-primary btn-round btn-xs dropdown-toggle button-add none-margin"
                                            type="button"
                                            data-toggle="dropdown">
                                            <strong>+</strong>
                                        </button>
                                        <ul className="dropdown-menu dropdown-primary">
                                            <li>
                                                <Link to="/hr/add-staff">Tạo nhân viên</Link>
                                            </li>
                                            <li>
                                                <a onClick={() => this.openModalAddUserToStaff()}>Thêm từ người dùng</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <Search
                                        onChange={this.props.staffsSearchChange}
                                        value={this.props.search}
                                        placeholder="Tìm kiếm nhân viên"
                                    />
                                <br/><br/>    
                                <div className="row">
                                    {this.props.isLoadingStaffs ? <Loading/> : (
                                        <ListStaff
                                            staffs={this.props.staffListData}
                                            roles={this.props.roleListData}
                                            bases={this.props.baseListData}
                                            departments={this.props.departments}
                                            changeRoleStaff={this.props.changeRoleStaff}
                                            changeBaseStaff={this.props.changeBaseStaff}
                                            changeDepartmentStaff={this.props.changeDepartmentStaff}
                                            deleteStaff={this.props.deleteStaff}
                                            disableActions={false}
                                            titleList="Danh sách nhân viên"
                                        />
                                    )
                                    }
                                </div>
                                <ul className="pagination pagination-primary">
                                    {_.range(1, this.props.totalPages + 1).map(page => {
                                        if (Number(this.props.currentPage) === page) {
                                            return (
                                                <li key={page} className="active">
                                                    <a onClick={() => this.props.loadStaffs(page)}>{page}</a>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={page}>
                                                    <a onClick={() => this.props.loadStaffs(page)}>{page}</a>
                                                </li>
                                            );
                                        }

                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showModalAddUserToStaff} bsSize="large" onHide={this.closeModalAddUserToStaff}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm nhân viên từ người dùng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.state.showModalAddUserToStaff && <AddUserToStaff/>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

ManageStaffsComponent.propTypes = {
    isLoadingStaffs: PropTypes.bool.isRequired,
    baseListData: PropTypes.array.isRequired,
    roleListData: PropTypes.array.isRequired,
    departments: PropTypes.array.isRequired,
    staffListData: PropTypes.array.isRequired,
    changeRoleStaff: PropTypes.func.isRequired,
    changeBaseStaff: PropTypes.func.isRequired,
    changeDepartmentStaff: PropTypes.func.isRequired,
    staffsSearchChange: PropTypes.func.isRequired,
    loadStaffs: PropTypes.func.isRequired,
    deleteStaff: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
};

export default ManageStaffsComponent;
