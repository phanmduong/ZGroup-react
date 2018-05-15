import React from "react";
import { store } from "./roomStore";
import { observer } from "mobx-react";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import AddRegisterModal from './AddRegisterModal';
import {
    formatPhone,
    dotNumber,
} from "../../helpers/helper";

@observer
class RegisterManageRoomContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount() {
        store.loadCampaigns();
        store.loadAllBases();
        store.loadRegisters();
        store.loadAllRooms();
        
    }

    openCreateModal = (data) => {  
        store.openCreateModal(data);
    }

    render() {
        let {
            isLoading,
            paginator,
            registers,
            showCreateModal,
        } = store;
        return (
            <div>
                <AddRegisterModal/>
                {isLoading ? <Loading /> :
                    <div className="card">
                        <div className="card-content">
                            <div className="flex-row flex">
                                <h4 className="card-title"><b>Danh sách đăng kí phòng</b></h4>
                                <div>
                                    <button
                                        className="btn btn-rose btn-round btn-xs button-add none-margin"
                                        type="button" onClick={()=>this.openCreateModal(null)}>
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

                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="text-rose">
                                            <tr>
                                                <th>Khách hàng</th>
                                                <th>Số điện thoại</th>
                                                <th>Saler</th>
                                                <th>Tiền đã trả</th>
                                                <th>Bắt đầu</th>
                                                <th>Kết thúc</th>
                                                <th>Thời gian đăng ký</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {registers.map((register, ) => {
                                                return (
                                                    <tr key={register.id}>
                                                        <td>
                                                            <a className="text-name-student-register">
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
                                                                <div className="btn btn-xs btn-main"
                                                                    style={{ backgroundColor: register.saler.color && "#" + register.saler.color, }}>
                                                                    {register.saler.name}</div>
                                                            ) : (
                                                                    <a className="btn btn-xs btn-main disabled">Chưa có</a>
                                                                )}
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>{dotNumber(register.money)}đ</td>
                                                        {(register.room_history && register.room_history.length > 0) &&
                                                            <td>{register.room_history[0].start_time}</td>}
                                                        {(register.room_history && register.room_history.length > 0) &&
                                                            <td>{register.room_history[0].end_time}</td>}
                                                        <td>{register.created_at}</td>



                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>


                                </div>
                                <div className="row float-right">

                                    <Pagination
                                        totalPages={paginator.total_pages}
                                        currentPage={paginator.current_page}
                                        loadDataPage={() => { }}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}



export default RegisterManageRoomContainer;
