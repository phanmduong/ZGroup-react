import React from 'react';
import Loading from '../common/Loading';
import Search from '../common/Search';
import Header from '../common/Header';
import ListStaff from './ListStaff';
import {browserHistory} from 'react-router';

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
                    <Header header="Nhân viên" title="Quản lý nhân sự" iconTitle="fa fa-edit"/>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.redirectAddStaff()}
                    >
                        Thêm nhân viên
                    </button>
                    <Search
                        onChange={this.textSearchRegistersChange}
                        value={this.value}
                        placeholder="Tìm kiếm nhân viên"
                    />
                    {this.props.isLoadingStaffs ? <Loading/> : (
                        <ListStaff
                            staffs={this.props.staffListData}
                            roles={this.props.roleListData}
                            bases={this.props.baseListData}
                            changeRoleStaff={this.props.changeRoleStaff}
                        />
                    )
                    }
                </div>
            </div>
        );
    }
}

export default ManageStaffsComponent;
