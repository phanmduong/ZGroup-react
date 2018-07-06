import React from "react";
import {store} from "./roomStore";
import {observer} from "mobx-react";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import AddRegisterModal from './AddRegisterModal';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import SelectCommon from "../../components/common/Select";

import {
    formatPhone,
    showErrorNotification,
} from "../../helpers/helper";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SelectMonthBox from "../../components/common/SelectMonthBox";

@observer
class RoomRegisterListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount() {
        store.loadCampaigns();
        store.loadAllBases();
        store.loadAllRooms();
        this.onChangeBase(this.props.user.base_id);

    }

    openCreateModal = (data) => {
        if (store.disableCreateRegister) {
            showErrorNotification("Không được phân quyền");
        }
        else {
            store.openCreateModal(data);
        }
    }
    onChangeBase = (value) => {
        // store.filter = {...store.filter, base_id: value};
        store.disableCreateRegister = !(value == this.props.user.base_id);
        store.loadRegisters("base_id", value);
    }
    openEditModal = (register) => {
        let data = {};
        store.disableCreateRegister = !(register.base.base.id == this.props.user.base_id);
        data['name'] = register.user && register.user.name;
        data['id'] = register.id;
        data['email'] = register.user && register.user.email;
        data['phone'] = register.user && register.user.phone;
        data['address'] = register.user && register.user.address;
        data['note'] = register.note;
        data['status'] = register.status;
        data['start_time'] = register.start_time;
        data['end_time'] = register.end_time;
        data['selectedUser'] = register.user && register.user.id;
        data['similar_room'] = register.similar_room;
        data['number_person'] = register.number_person;
        data['kind'] = register.kind;
        data['campaign_id'] = register.campaign && register.campaign.id;

        store.createData = data;
        store.showCreateModal = true;
    }


    handleAMonthChange = (value) => {
        let start_time = value.year + "-" + value.month + "-01";
        let end_time;
        if (value.month !== 12) {
            end_time = value.year + "-" + (value.month + 1) + "-01";
        } else end_time = value.year + 1 + "-01" + "-01";
        let time = {...store.filter.time};
        time["start_time"] = start_time;
        time["end_time"] = end_time;
        store.filter = {...store.filter, time: time};
        store.month = value;
        store.isShowMonthBox = false;
        store.loadRegisters("time", time);
    }


    render() {
        let {
            isLoading,
            paginator,
            registers,
            filter,
            baseData,
        } = store;
        return (
            <div>
                <AddRegisterModal/>
                <div>
                    <div>
                        <div className="row">
                            <div className="col-sm-3 col-xs-5">
                                <SelectMonthBox
                                    theme="light"
                                    isHide={false}
                                    value={store.month}
                                    onChange={this.handleAMonthChange}
                                    isAuto={false}
                                    isShowMonthBox={store.isShowMonthBox}
                                    openBox={() => {
                                        store.isShowMonthBox = true;
                                    }}
                                    closeBox={() => {
                                        store.isShowMonthBox = false;
                                    }}
                                />
                            </div>
                            <div className="col-sm-3 col-xs-5">
                                <SelectCommon
                                    defaultMessage={"Chọn cơ sở"}
                                    options={baseData}
                                    value={filter.base_id}
                                    onChange={this.onChangeBase}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <div className="flex-row flex">
                                <h4 className="card-title"><b>Danh sách đăng kí phòng</b></h4>
                                <div>
                                    <button
                                        className="btn btn-rose btn-round btn-xs button-add none-margin"
                                        type="button" onClick={() => this.openCreateModal(null)}>
                                        <strong>+</strong>
                                    </button>
                                </div>
                                {/* <div>
                                            
                                            <TooltipButton text="Lọc" placement="top">
                                            <button
                                                className="btn btn-rose btn-round btn-xs button-add none-margin"
                                                onClick={this.openFilterPanel}
                                            >
                                                <i className="material-icons" style={{
                                                    width: 12,
                                                    marginLeft: -4,
                                                    paddingTop: 2,
                                                }}>filter_list</i>
                                            </button>

                                        </TooltipButton>
                                        </div> */}
                            </div>
                            <div>
                                {/* <Panel collapsible expanded={this.state.openFilterPanel}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="form-group col-md-4">
                                                            <label className="label-control">Tìm theo saler</label>
                                                            <Select
                                                                value={this.state.saler_id}
                                                                options={this.state.salers}
                                                                onChange={(id) => this.filterChange('saler_id', id)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Panel> */}

                                {isLoading ? <Loading/> :

                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead className="text-rose">
                                            <tr>
                                                <th>Khách hàng</th>
                                                <th>Số điện thoại</th>
                                                <th>Saler</th>
                                                {/*<th>Tiền đã trả</th>*/}
                                                <th>Bắt đầu</th>
                                                <th>Kết thúc</th>
                                                <th>Thời gian đăng ký</th>
                                                <th>Trạng thái</th>
                                                <th>Chiến dịch</th>
                                                <th/>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            {registers.map((register,) => {
                                                return (
                                                    <tr key={register.id}>
                                                        <td>
                                                            <a className="text-name-student-register"
                                                            style={{width : "200px"}}
                                                            >
                                                                {register.user && register.user.name}
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <a href={"tel:" + register.phone}
                                                               className="text-name-student-register"
                                                            >
                                                                {register.user && register.user.phone
                                                                    ? formatPhone(register.user.phone) : "Chưa có"}
                                                            </a>
                                                        </td>
                                                        <td>
                                                            {register.saler ? (
                                                                <a className="btn btn-xs btn-main"
                                                                   style={{backgroundColor: register.saler.color && "#" + register.saler.color,}}
                                                                   onClick={() => {
                                                                       store.loadRegisters("saler_id", register.saler.id);
                                                                       store.disableCreateRegister = true;
                                                                   }}
                                                                >
                                                                    {register.saler.name}</a>
                                                            ) : (
                                                                <a className="btn btn-xs btn-main disabled">Chưa
                                                                    có</a>
                                                            )}
                                                        </td>
                                                        {/*<td style={{textAlign: 'center'}}>{dotNumber(register.money)}đ</td>*/}
                                                        {(register.room_history && register.room_history.length > 0) &&
                                                        <td>{register.room_history[0].start_time}</td>}
                                                        {(register.room_history && register.room_history.length > 0) &&
                                                        <td>{register.room_history[0].end_time}</td>}
                                                        <td>{register.created_at}</td>
                                                        <td>{register.status}</td>
                                                        <td>
                                                            {register.campaign ? (
                                                                <a className="btn btn-xs btn-main"
                                                                   style={{backgroundColor: register.campaign.color && "#" + register.campaign.color,}}
                                                                   onClick={() => {
                                                                       store.loadRegisters("campaign_id", register.campaign.id);
                                                                       store.disableCreateRegister = true;
                                                                   }}
                                                                >
                                                                    {register.campaign.name}</a>
                                                            ) : (
                                                                <a className="btn btn-xs btn-main disabled">Chưa
                                                                    có</a>
                                                            )}</td>

                                                        <td><ButtonGroupAction
                                                            edit={() => this.openEditModal(register)}
                                                            object={register}
                                                            disabledDelete={true}
                                                            //disabledEdit={obj.status > 1 || user.id != obj.staff.id}
                                                            // children={
                                                            //     (obj.status < 2 && (user.role == 2 || user.id == obj.staff.id)) ?
                                                            //         <a key="1" data-toggle="tooltip" title="Đổi trạng thái" type="button" rel="tooltip"
                                                            //             onClick={() => { this.changeStatus(obj.id, obj.status); }}>
                                                            //             <i className="material-icons">cached</i></a>
                                                            //         : <div />
                                                            // }
                                                        /></td>

                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>


                                    </div>
                                }
                                <div className="row float-right">

                                    <Pagination
                                        totalPages={paginator.total_pages}
                                        currentPage={paginator.current_page}
                                        loadDataPage={(page) => {
                                            // store.filter = {...store.filter,paginator.current_page}
                                            store.loadRegisters("page", page);
                                        }}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

RoomRegisterListContainer.propTypes = {
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

export default connect(mapStateToProps)(
    RoomRegisterListContainer,
);
// export default RegisterManageRoomContainer;
