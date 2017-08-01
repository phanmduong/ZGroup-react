import React from 'react';
import Loading from '../common/Loading';
import Search from '../common/Search';
import Header from '../Header';
import ListStaff from './ListStaff';

let that;
class ManageStaffsComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        that = this;
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <Header header="Nhân viên" title="Quản lý nhân sự" iconTitle="fa fa-edit"/>
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
                        />
                    )
                    }
                </div>
            </div>
        );
    }
}

export default ManageStaffsComponent;
