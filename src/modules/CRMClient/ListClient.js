import React from 'react';
import store from './crmClientStore';
import {avatarEmpty} from "../../helpers/helper";
import Pagination from "../../components/common/Pagination";
import {NO_AVATAR} from "../../constants/env";
import Loading from "../../components/common/Loading";
import TooltipButton from "../../components/common/TooltipButton";
import {observer} from "mobx-react";

@observer
class ListClient extends React.Component {

    componentWillMount() {
        this.loadData();
    }

    loadData = (page = 1) => {
        store.currentPage = page;
        store.loadClients();
    };

    render() {
        return (
            <div>
                {store.isLoading ? <Loading/> :
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-rose">
                            <tr>
                                <th/>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Số lần học</th>
                                <th>Đã đóng tiền</th>
                                <th>Nguồn</th>
                                <th>Ghi chú</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                store.clients.map((user) => {
                                    const avatar = !avatarEmpty(user.avatar_url) ?
                                        user.avatar_url : NO_AVATAR;
                                    return (
                                        <tr key={user.id}>
                                            <td>
                                                <div className="avatar-list-staff"
                                                     style={{
                                                         background: 'url(' + avatar + ') center center / cover',
                                                         display: 'inline-block'
                                                     }}
                                                />
                                            </td>
                                            <td>
                                                <a href={`/sales/info-student/${user.id}`}
                                                   className="text-name-student-register">
                                                    {user.name}
                                                </a>
                                            </td>
                                            <td>
                                                {user.email}
                                            </td>
                                            <td>{user.phone}</td>
                                            <td>{user.register_times}</td>
                                            <td>
                                                <div className="flex flex-row">
                                                    {
                                                        user.courses && user.courses.map((course, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <TooltipButton
                                                                        placement="top"
                                                                        text={course.name}
                                                                    >
                                                                        <div className="avatar-list-staff"
                                                                             style={{
                                                                                 background: 'url(' + course.icon_url + ') center center / cover',
                                                                                 display: 'inline-block',
                                                                                 borderColor: 'white',
                                                                                 borderStyle: 'solid',
                                                                                 marginLeft: '-10px'
                                                                             }}
                                                                        />
                                                                    </TooltipButton>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </td>
                                            <td>{user.how_know}</td>
                                            <td>{user.note}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                }

                <Pagination
                    currentPage={store.currentPage}
                    totalPages={store.totalPages}
                    loadDataPage={this.loadData}
                />

            </div>
        );
    }
}

export default ListClient;