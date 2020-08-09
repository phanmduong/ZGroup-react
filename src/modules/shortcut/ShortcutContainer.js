import React from 'react';
import {connect} from 'react-redux';
import {isEmpty} from "../../helpers/entity/mobx";
import Loading from "../../components/common/Loading";
import _ from "lodash";

const SHORTCUTS = [
    {
        name: 'Học viên',
        description: 'Quản lý danh sách, thông tin chi tiết về học viên',
        color: '#F44236',
        link: '/sales/register-list',
        icon: 'school'
    },
    {
        name: 'Lớp học',
        description: 'Quản lý danh sách lớp học, môn học, điểm danh',
        color: '#00BCD5',
        link: '/teaching/classes',
        icon: 'home_work'
    },
    {
        name: 'Chấm công',
        description: 'Thống kê chấm công nhân viên, giảng viên, trợ giảng',
        color: '#673BB7',
        link: '/dashboard/checkin-checkout',
        icon: 'fingerprint'
    },
    {
        name: 'CRM',
        description: 'Quản lý các học viên tiềm năng, các đăng kí học',
        color: '#4CB050',
        link: '/customer-services/leads',
        icon: 'contact_phone'
    },
    {
        name: 'Tài chính',
        description: 'Quản lý tài chính, dòng tiền, thu chi',
        color: '#EA1E63',
        link: '/finance/moneycollect',
        icon: 'attach_money'
    },
    {
        name: 'Cài đặt',
        description: 'Người dùng hệ thống, Email, SMS tự động',
        color: '#673BB7',
        link: '/setting',
        icon: 'settings'
    },
    {
        name: 'SMS',
        description: 'Gửi SMS tự động đến hàng loạt học viên',
        color: '#4CB050',
        link: '/sms/campaign-list',
        icon: 'textsms'
    },
    {
        name: 'Email',
        description: 'Gửi Email tự động đến hàng loạt học viên',
        color: '#F44236',
        link: '/email/campaigns',
        icon: 'email'
    }, {
        name: 'Dashboard',
        description: 'Thống kê, báo cáo theo thời gian thực',
        color: '#00BCD5',
        link: '/dashboard/sale',
        icon: 'dashboard'
    },
    {
        name: 'Mobile App',
        description: 'Ứng dụng riêng cho học viên, thống kê và cài đặt',
        color: '#FF9700',
        link: '#',
        icon: 'phone_iphone'
    },
    {
        name: 'Lịch dạy',
        description: 'Xem lịch dạy từng lớp học',
        color: '#673BB7',
        link: '/teaching/teaching-schedule',
        icon: 'event'
    },
    {
        name: 'Trang cá nhận',
        description: 'Thông tin cá nhân của bạn',
        color: '#EA1E63',
        link: '/profile/my-profile',
        icon: 'account_box'
    },
]

class ShortcutContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            search: null
        }
    }

    render() {
        let shortcuts = SHORTCUTS.filter((shortcut) => {
            return _.find(this.props.tabsListData, function (tab) {
                if (tab.url[0] != "/") {
                    tab.url = "/" + tab.url;
                }
                return tab.url == shortcut.link;
            }) || shortcut.link == "#" || isEmpty(shortcut.link) || shortcut.link == '/profile/my-profile';
        })
        shortcuts = shortcuts.filter((item) => item.name.includes(this.state.search) || item.description.includes(this.state.search) || isEmpty(this.state.search));

        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="padding-horizontal-20px padding-vertical-20px" style={{paddingBottom: 40}}>
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <div
                                    className="search-shortcut flex-row flex flex-justify-content-center flex-align-items-center ">
                               <span className="material-icons margin-left-10 margin-right-5">
                                search
                                </span>
                                    <input type="text" placeholder="Bạn đang muốn làm gì?" onChange={(e) => {
                                        this.setState({search: e.target.value})
                                    }}/>
                                </div>
                            </div>
                        </div>
                        {this.props.isLoadingTab ? <Loading/> :
                            <div className="row">
                                {
                                    shortcuts.map((shortcut) => {
                                            return (
                                                <div className="col-md-3 col-sm-4 col-xs-6">
                                                    <a
                                                        href={shortcut.link}
                                                        className="flex flex-col flex-justify-content-center flex-align-items-center padding-vertical-20px cursor-pointer shortcut margin-bottom-20">
                                                        <div style={{
                                                            width: 100,
                                                            height: 100,
                                                            backgroundColor: shortcut.color,
                                                            padding: 10,
                                                            margin: 10,
                                                            borderRadius: 10
                                                        }}
                                                             className="flex flex-col flex-justify-content-center flex-align-items-center"
                                                        >
                                                        <span className="material-icons">
                                                            {shortcut.icon}
                                                        </span>
                                                        </div>
                                                        <div className="bold">
                                                            {shortcut.name}
                                                        </div>
                                                        <div className="text-center" style={{height: 30, maxWidth: 200}}>
                                                            {shortcut.description}
                                                        </div>
                                                    </a>

                                                </div>
                                            );
                                        }
                                    )
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user,
        isLoadingTab: state.tabs.isLoading,
        tabsListData: state.tabs.tabListData
    };
}

export default connect(mapStateToProps)(ShortcutContainer);
