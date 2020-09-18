import React from 'react';
import {connect} from 'react-redux';
import {isEmpty} from "../../helpers/entity/mobx";
import Loading from "../../components/common/Loading";
import _ from "lodash";
import {PROTOCOL} from "../../constants/env";

const SHORTCUTS = [
    {
        name: 'Học viên',
        description: 'Quản lý danh sách, thông tin chi tiết về học viên',
        color: '#608DFF',
        link: '/sales/register-list',
        icon: 'http://d1j8r0kxyu9tj8.cloudfront.net/files/1600314223r9iTNffgvkfO6Z1.png'
    },
    {
        name: 'Lớp học',
        description: 'Quản lý danh sách lớp học, môn học, điểm danh',
        color: '#A888F8',
        link: '/teaching/classes',
        icon: 'http://d1j8r0kxyu9tj8.cloudfront.net/files/1600314223bRSHt8ObSQOY0Nu.png'
    },
    {
        name: 'Lịch dạy',
        description: 'Xem lịch dạy từng lớp học',
        color: '#FFEDDC',
        link: '/teaching/teaching-schedule',
        icon: 'http://d1j8r0kxyu9tj8.cloudfront.net/files/1600314223bRSHt8ObSQOY0Nu.png'
    },
    {
        name: 'Chấm công',
        description: 'Thống kê chấm công nhân viên, giảng viên, trợ giảng',
        color: '#FFDC60',
        link: '/dashboard/checkin-checkout',
        icon: 'http://d1j8r0kxyu9tj8.cloudfront.net/files/16003142235zJj2IMDqvkKoHr.png'
    },
    {
        name: 'CRM',
        description: 'Quản lý các học viên tiềm năng, các đăng kí học',
        color: '#FFDC60',
        link: '/customer-services/leads',
        icon: 'http://d1j8r0kxyu9tj8.cloudfront.net/files/16003142232zFuDvSs6Wu1UX7.png'
    },
    {
        name: 'Tài chính',
        description: 'Quản lý tài chính, dòng tiền, thu chi',
        color: '#90C8FC',
        link: '/finance/moneycollect',
        icon: 'http://d1j8r0kxyu9tj8.cloudfront.net/files/1600314223RPQVCQnGQDU3VIf.png'
    },
    {
        name: 'Cài đặt',
        description: 'Người dùng hệ thống, Email, SMS tự động',
        color: '#F5B38A',
        link: '/setting',
        icon: 'http://d1j8r0kxyu9tj8.cloudfront.net/files/1600314222bNr4w9keWEyhGGr.png'
    },
    {
        name: 'SMS',
        description: 'Gửi SMS tự động đến hàng loạt học viên',
        color: '#90C8FC',
        link: '/sms/campaign-list',
        icon: 'http://d1j8r0kxyu9tj8.cloudfront.net/files/1600314222hgnCPTSuSyujWyd.png'
    },
    {
        name: 'Email',
        description: 'Gửi Email tự động đến hàng loạt học viên',
        color: '#5956E9',
        link: `${PROTOCOL}${window.location.hostname}:2222/email`,
        icon: 'http://d1j8r0kxyu9tj8.cloudfront.net/files/1600314222Bc3RRZciSF9I2ke.png'
    }, {
        name: 'Dashboard',
        description: 'Thống kê, báo cáo theo thời gian thực',
        color: '#A888F8',
        link: '/dashboard/sale',
        icon: 'http://d1j8r0kxyu9tj8.cloudfront.net/files/1600314222YXkUhhjS2CFZlDp.png'
    },
    {
        name: 'Mobile App',
        description: 'Ứng dụng riêng cho học viên, thống kê và cài đặt',
        color: '#FFDC60',
        link: '#',
        icon: 'http://d1j8r0kxyu9tj8.cloudfront.net/files/1600314222vEe4EXGP7Nkcsn4.png'
    },

    {
        name: 'Trang cá nhân',
        description: 'Thông tin cá nhân của bạn',
        color: '#5855E6',
        link: '/profile/my-profile',
        icon: 'http://d1j8r0kxyu9tj8.cloudfront.net/files/1600314223r9iTNffgvkfO6Z1.png'
    }
];

class ShortcutContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            search: null
        };
    }

    render() {
        let shortcuts = SHORTCUTS.filter((shortcut) => {
            return _.find(this.props.tabsListData, function (tab) {
                if (tab.url[0] != "/") {
                    tab.url = "/" + tab.url;
                }
                return tab.url == shortcut.link;
            }) || shortcut.link == "#" || isEmpty(shortcut.link) || shortcut.link == '/profile/my-profile' || shortcut.link == `${PROTOCOL}${window.location.hostname}:2222/email`;
        });
        console.log(shortcuts)
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
                                        this.setState({search: e.target.value});
                                    }}/>
                                </div>
                            </div>
                        </div>
                        {this.props.isLoadingTab ? <Loading/> :
                            <div className="row">
                                {
                                    shortcuts.map((shortcut, key) => {
                                            return (
                                                <div className="col-md-3 col-sm-4 col-xs-6" key={key}>
                                                    <a
                                                        href={shortcut.link}
                                                        style={{color: 'black'}}
                                                        className="flex flex-col flex-justify-content-center flex-align-items-center padding-vertical-20px cursor-pointer margin-bottom-20">
                                                        <div style={{
                                                            width: 100,
                                                            height: 100,
                                                            backgroundColor: shortcut.color,
                                                            padding: 10,
                                                            margin: 10,
                                                            borderRadius: 10,
                                                        }}
                                                             className="flex flex-col flex-justify-content-center flex-align-items-center"
                                                        >
                                                            <img className="shortcut"
                                                                 src={shortcut.icon} style={{width: '180%'}}/>
                                                        </div>
                                                        <div className="bold">
                                                            {shortcut.name}
                                                        </div>
                                                        <div className="text-center"
                                                             style={{height: 30, maxWidth: 200}}>
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
