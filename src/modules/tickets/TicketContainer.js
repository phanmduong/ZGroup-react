import React from "react";
import {observer} from 'mobx-react';

import {store} from './TicketStore.js';
import CreateTicketModal from './CreateTicketModal';
import Loading from "../../components/common/Loading";
import Search from "../../components/common/Search";
import Sort from "../../components/common/ReactTable/Sort";
import ReactTable from "react-table-v6";
import {getShortName, isEmptyInput} from "../../helpers/helper";
import TooltipButton from "../../components/common/TooltipButton";

@observer
export default class TicketContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                // eslint-disable-next-line react/jsx-no-undef
                Header: '',
                sortable: false,
                accessor: 'user.avatar_url',
                Cell: props => props.value ? <img className="circle"
                                                  src={props.value} alt="" style={{height: 40, width: 40}}/> : <div/>, // Custom cell components!
                minWidth: 65,
                maxWidth: 65
            },
            {
                Header: <Sort title="Tên học viên"/>,
                accessor: 'user',
                Cell: props => {
                    let user = props.value || {name:'Không có'};
                    return (<div className="flex flex-space-between flex-align-items-center"
                                 onClick={() => this.openLinkRegister({saler_id: props.original.id}, true)}>
                        {user && user.avatar_url ? <img className="circle"
                                                        src={user.avatar_url} alt="" style={{height: 40, width: 40}}/> :
                            <div style={{height: 40, width: 40}}/>}
                        <div className="margin-left-10"><strong>{user.name}</strong></div>


                    </div>);
                },
                minWidth: 150
            },
            {
                Header: <Sort title="Vấn đề"/>,
                accessor: 'name',
                Cell: props => <div>
                    <div><b>{props.original.name}</b></div>
                    <div>{props.original.description}</div>

                    {props.value}
                </div>
            },
            {
                Header: <Sort title="Giải quyết"/>,
                accessor: 'solution',
                Cell: props => <div>{props.value}</div>
            },
            {
                Header: <Sort title="Đảm nhiệm"/>,
                accessor: 'assigner',
                Cell: props => {
                    let data = props.original;
                    let assigner = data.assigner || {name: 'Không có'};
                    let pic = data.pic || {name: 'Không có'};

                    return (
                        <div style={{width: '100%'}}>
                            <button className="btn btn-xs btn-main width-100"
                                    style={{backgroundColor: "#" + assigner.color}}>
                                {getShortName(assigner.name)}
                            </button>
                            <div className="text-center"><b className="caret"/></div>

                            <button className="btn btn-xs btn-main width-100"
                                    style={{backgroundColor: "#" + pic.color}}>
                                {getShortName(pic.name)}
                            </button>
                        </div>);
                }, minWidth: 150

            },
            {
                Header: <Sort title="Phân loại"/>,
                accessor: 'type',
                Cell: props => {

                    let data = props.original;
                    let type = data.type || {name: 'Không có'};
                    return (
                        <div style={{width: '100%'}}>
                            <button className="btn btn-xs btn-main width-100"
                                    style={{backgroundColor: type.color}}>
                                {(type.name)}
                            </button>
                        </div>

                    );
                },                minWidth: 150
            },
            {
                Header: <Sort title="Trạng thái"/>,
                accessor: 'status',
                Cell: props => {
                    let data = props.original;
                    let status = data.status || {name: 'Không có'};
                    return (
                        <div style={{width: '100%'}}>
                            <button className="btn btn-xs btn-main width-100"
                                    style={{backgroundColor: status.color}}>
                                {(status.name)}
                            </button>
                        </div>

                    );
                },                minWidth: 150

            },
            {
                Header: <Sort title="Độ ưu tiên"/>,
                accessor: 'priority',
                Cell: props => {
                    let data = props.original;
                    let priority = data.priority || {name: 'Không có'};
                    return (
                        <div style={{width: '100%'}}>
                            <button className="btn btn-xs btn-main width-100"
                                    style={{backgroundColor: priority.color}}>
                                {(priority.name)}
                            </button>
                        </div>

                    );
                },                minWidth: 150
            },
            {
                sortable: false,
                Header: "",
                accessor: 'id',
                Cell: props => {
                    let data = props.original;
                    let archivist = data.archivist;
                    let dataArchive;
                    if (isEmptyInput(archivist)) {
                        dataArchive = {name: 'Lưu trữ', icon: 'assignment_turned_in'};
                    } else {
                        dataArchive = {name: 'Đã lưu trữ bới ' + archivist.name, icon: 'unarchive'};
                    }
                    return (<div className="flex flex-row flex-align-items-center">
                        <div className="btn-group-action">
                            <TooltipButton text="Chỉnh sửa" placement="top">
                                <a onClick={() => {
                                    store.openModalEdit(data);

                                }}>
                                    <i className="material-icons">edit</i>
                                </a>
                            </TooltipButton>
                            <TooltipButton text={dataArchive.name} placement="top">
                                <a onClick={() => {
                                }}>
                                    <i className="material-icons">{dataArchive.icon}</i>
                                </a>
                            </TooltipButton>
                            <TooltipButton text="Lịch sử" placement="top">
                                <a onClick={() => {
                                }}>
                                    <i className="material-icons">history</i>
                                </a>
                            </TooltipButton>

                        </div>
                    </div>);
                },
                maxWidth: 100,
                width: 100
            },
        ];

    }

    componentDidMount() {
        store.loadTickets();
    }

    searchChange = (value) => {
        store.filter.search = value;
    };

    applySearch = () => {
        store.loadTickets();
    };

    render() {
        let {isLoading, filter, data} = store;
        return (<div>

            <div className="card" mask="purple">
                <img className="img-absolute"/>
                <div className="card-content">

                    <h5 className="card-title"><strong>Chăm sóc học viên</strong></h5>
                    <div style={{marginTop: '10%'}}/>
                    <div className="flex-align-items-center flex flex-wrap">
                        <Search
                            onChange={this.searchChange}
                            placeholder="Tim kiếm"
                            value={filter.search}
                            className="round-white-seacrh"
                            onSearch={this.applySearch}
                        />
                        <div className="btn btn-white btn-round btn-icon"
                             onClick={() => {
                                 store.modal.showModalCreateTicket = true;
                             }}
                        >Thêm vấn đề<i className="material-icons">add</i>
                        </div>
                    </div>
                </div>
            </div>
            {!isLoading &&
            <div className="row">
                <div className="col-md-12">
                    <ReactTable
                        data={data.tickets}
                        columns={this.columns}
                        previousText={'Trước'}
                        nextText={'Tiếp'}
                        noDataText={'Không có dữ liệu'}
                        pageText={"Trang"}
                        rowsText={"dòng"}
                        showPagination={false}
                        defaultPageSize={data.tickets.length}
                        // defaultSorted={[
                        //     {
                        //         id: "id",
                        //         desc: data.length > 2 && totalKpi.revenue > 0
                        //     }
                        // ]}
                    />
                </div>
            </div>
            }
            {isLoading && <Loading/>}
            <CreateTicketModal/>
        </div>);
    }
}

