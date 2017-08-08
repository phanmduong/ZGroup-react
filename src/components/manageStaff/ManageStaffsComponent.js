import React from 'react';
import {Link, browserHistory} from 'react-router';
import Loading from '../common/Loading';
import Search from '../common/Search';
import ListStaff from './ListStaff';
import PropTypes from 'prop-types';

class ManageStaffsComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    redirectAddStaff() {
        browserHistory.push('add-staff');
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <ul className="nav nav-tabs">
                        <li className="active"><Link to="/manage/quan-li-nhan-su">Nhân viên</Link></li>
                        <li><Link to="/manage-role">Chức vụ</Link></li>
                    </ul>
                    <button
                        type="button"
                        className="btn btn-danger"
                        id="button-add-staff"
                        onClick={() => this.redirectAddStaff()}
                    >
                        Thêm nhân viên
                    </button>
                    <Search
                        onChange={()=>{}}
                        value=""
                        placeholder="Tìm kiếm nhân viên"
                    />
                    {this.props.isLoadingStaffs ? <Loading/> : (
                        <ListStaff
                            staffs={this.props.staffListData}
                            roles={this.props.roleListData}
                            bases={this.props.baseListData}
                            changeRoleStaff={this.props.changeRoleStaff}
                            changeBaseStaff={this.props.changeBaseStaff}
                        />
                    )
                    }
                </div>
            </div>
        );
    }
}

ManageStaffsComponent.propTypes = {
    isLoadingStaffs: PropTypes.bool.isRequired,
    baseListData: PropTypes.array.isRequired,
    roleListData: PropTypes.array.isRequired,
    staffListData: PropTypes.array.isRequired,
    changeRoleStaff: PropTypes.func.isRequired,
    changeBaseStaff: PropTypes.func.isRequired,
};

export default ManageStaffsComponent;
