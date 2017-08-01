import React from 'react';
import Loading from '../common/Loading';
import Search from '../common/Search';
import Header from '../Header';

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
                    {/*{this.props.isLoading ? <Loading/> : (*/}
                        {/*<ul className="nav">*/}
                            {/*{this.props.users.map(function (user, index) {*/}
                                {/*return (<DropdownStudent index={index} key={index} user={user} next_code={that.props.next_code}*/}
                                                         {/*onChangeDropdown={that.changeDropdownOpen} idDowndown={that.state.idDropdown}/>);*/}
                            {/*})}*/}
                        {/*</ul>*/}
                    {/*)*/}
                    {/*}*/}
                </div>
            </div>
        );
    }
}

export default ManageStaffsComponent;
