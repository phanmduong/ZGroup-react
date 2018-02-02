import React from 'react';
// import ItemOrder from './ItemOrder';
import Loading from '../../components/common/Loading';
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import * as helper from '../../helpers/helper';

// import {Link} from "react-router";
import {Modal} from 'react-bootstrap';
import CallModal from "./CallModal";
import {REGISTER_STATUS} from "../../constants/constants";


let hours = [1, 2, 3, 4, 5, 6, 7, 8];
let names = ["Như Quỳnh", "Văn Long", "Quỳnh Anh", "Thảo Nguyên", "Việt Hùng", "Anh Quân", "Gia Khánh"];
let btns = ["btn-success", "btn-danger", "btn-info", "btn-default", "btn-warning", "btn-primary", "btn-rose"];
let campaigns = ["Email", "Telesale", "DS chờ", "Event","Inbox"];

const room_service_registers = [
    {
        id: 8,
        code: null,
        money: 0,
        status: "",

        name: names[1],
        hour: hours[Math.floor(Math.random() * 8)],
        btnSaler: btns[1],
        btnStatus: btns[Math.floor(Math.random() * 7)],
        btnPrice: btns[Math.floor(Math.random() * 3)],
        btnCall: btns[Math.floor(Math.random() * 2)],
        btnCampaign: btns[Math.floor(Math.random() * 5)],
        campaign: campaigns[Math.floor(Math.random() * 5)],

        created_at: "17:38 01-02-2018",
        user: {
            id: 5549,
            name: "Trương Hoàng Anh",
            phone: "0992301921"
        },
        subscription: {
            id: 1,
            price: 200000,
            description: " Bao gồm 3 ngày làm việc 24/7, gói 200,000 VNĐ cực kỳ linh hoạt và tiết kiệm chi phí cho bạn.",
            subscription_kind_name: "1 ngày",
            hours: 24,
            user_pack_name: "THÀNH VIÊN LINH HOẠT",
            user_pack: {
                id: 1,
                name: "THÀNH VIÊN LINH HOẠT",
                avatar_url: "http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg",
                detail: "",
                status: 1
            }
        }
    },
    {
        id: 7,
        code: null,
        money: 0,
        status: "",


        x: Math.floor(Math.random() * 7),
        name: names[2],
        hour: hours[Math.floor(Math.random() * 8)],
        btnSaler: btns[2],
        btnStatus: btns[Math.floor(Math.random() * 7)],
        btnPrice: btns[Math.floor(Math.random() * 3)],
        btnCall: btns[Math.floor(Math.random() * 2)],
        btnCampaign: btns[Math.floor(Math.random() * 5)],
        campaign: campaigns[Math.floor(Math.random() * 5)],

        created_at: "15:34 01-02-2018",
        user: {
            id: 5580,
            name: "Nguyễn Văn Lâm",
            phone: "01212121311"
        },
        subscription: {
            id: 3,
            price: 300000,
            description: "Bạn luôn di chuyển & không dành quá nhiều thời gian trong văn phòng? Hay một không gian làm việc yên tĩnh và sáng tạo cho những ngày cuối tuần? Bao gồm 3 ngày làm việc 24/7, gói 200,000 VNĐ cực kỳ linh hoạt và tiết kiệm chi phí cho bạn.",
            subscription_kind_name: "30 ngày",
            hours: 720,
            user_pack_name: "THÀNH VIÊN LINH HOẠT",
            user_pack: {
                id: 1,
                name: "THÀNH VIÊN LINH HOẠT",
                avatar_url: "http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg",
                detail: "",
                status: 1
            }
        }
    },
    {
        id: 6,
        code: null,
        money: 0,
        status: "",


        name: names[2],
        hour: hours[Math.floor(Math.random() * 8)],
        btnSaler: btns[2],
        btnStatus: btns[Math.floor(Math.random() * 7)],
        btnPrice: btns[Math.floor(Math.random() * 3)],
        btnCall: btns[Math.floor(Math.random() * 2)],
        btnCampaign: btns[Math.floor(Math.random() * 5)],
        campaign: campaigns[Math.floor(Math.random() * 5)],

        created_at: "15:26 01-02-2018",
        user: {
            id: 5580,
            name: "Trần  Mạnh  Hùng",
            phone: "01212121311"
        },
        subscription: {
            id: 2,
            price: 150000,
            description: "Bạn luôn di chuyển & không dành quá nhiều thời gian trong văn phòng? Hay một không gian làm việc yên tĩnh và sáng tạo cho những ngày cuối tuần? Bao gồm 3 ngày làm việc 24/7, gói 200,000 VNĐ cực kỳ linh hoạt và tiết kiệm chi phí cho bạn.",
            subscription_kind_name: "7 ngày",
            hours: 168,
            user_pack_name: "THÀNH VIÊN LINH HOẠT",
            user_pack: {
                id: 1,
                name: "THÀNH VIÊN LINH HOẠT",
                avatar_url: "http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg",
                detail: "",
                status: 1
            }
        }
    },
    {
        id: 5,
        code: null,
        money: 0,
        status: "",


        name: names[4],
        hour: hours[Math.floor(Math.random() * 8)],
        btnSaler: btns[4],
        btnStatus: btns[Math.floor(Math.random() * 7)],
        btnPrice: btns[Math.floor(Math.random() * 3)],
        btnCall: btns[Math.floor(Math.random() * 2)],
        btnCampaign: btns[Math.floor(Math.random() * 5)],
        campaign: campaigns[Math.floor(Math.random() * 5)],

        created_at: "15:23 01-02-2018",
        user: {
            id: 5580,
            name: "Châu Ngọc Thanh",
            phone: "01212121311"
        },
        subscription: {
            id: 2,
            price: 150000,
            description: "Bạn luôn di chuyển & không dành quá nhiều thời gian trong văn phòng? Hay một không gian làm việc yên tĩnh và sáng tạo cho những ngày cuối tuần? Bao gồm 3 ngày làm việc 24/7, gói 200,000 VNĐ cực kỳ linh hoạt và tiết kiệm chi phí cho bạn.",
            subscription_kind_name: "7 ngày",
            hours: 168,
            user_pack_name: "THÀNH VIÊN LINH HOẠT",
            user_pack: {
                id: 1,
                name: "THÀNH VIÊN LINH HOẠT",
                avatar_url: "http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg",
                detail: "",
                status: 1
            }
        }
    },
    {
        id: 4,
        code: null,
        money: 0,
        status: "",

        name: names[1],
        hour: hours[Math.floor(Math.random() * 8)],
        btnSaler: btns[1],
        btnStatus: btns[Math.floor(Math.random() * 7)],
        btnPrice: btns[Math.floor(Math.random() * 3)],
        btnCall: btns[Math.floor(Math.random() * 2)],
        btnCampaign: btns[Math.floor(Math.random() * 5)],
        campaign: campaigns[Math.floor(Math.random() * 5)],

        created_at: "15:08 01-02-2018",
        user: {
            id: 5549,
            name: "Trần Anh",
            phone: "0992301921"
        },
        subscription: {
            id: 2,
            price: 150000,
            description: "Bạn luôn di chuyển & không dành quá nhiều thời gian trong văn phòng? Hay một không gian làm việc yên tĩnh và sáng tạo cho những ngày cuối tuần? Bao gồm 3 ngày làm việc 24/7, gói 200,000 VNĐ cực kỳ linh hoạt và tiết kiệm chi phí cho bạn.",
            subscription_kind_name: "7 ngày",
            hours: 168,
            user_pack_name: "THÀNH VIÊN LINH HOẠT",
            user_pack: {
                id: 1,
                name: "THÀNH VIÊN LINH HOẠT",
                avatar_url: "http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg",
                detail: "",
                status: 1
            }
        }
    },
    {
        id: 3,
        code: null,
        money: 0,
        status: "",

        name: names[1],
        hour: hours[Math.floor(Math.random() * 8)],
        btnSaler: btns[1],
        btnStatus: btns[Math.floor(Math.random() * 7)],
        btnPrice: btns[Math.floor(Math.random() * 3)],
        btnCall: btns[Math.floor(Math.random() * 2)],
        btnCampaign: btns[Math.floor(Math.random() * 5)],
        campaign: campaigns[Math.floor(Math.random() * 5)],

        created_at: "18:12 31-01-2018",
        user: {
            id: 5549,
            name: "Noname",
            phone: "0992301921"
        },
        subscription: {
            id: 3,
            price: 300000,
            description: "Bạn luôn di chuyển & không dành quá nhiều thời gian trong văn phòng? Hay một không gian làm việc yên tĩnh và sáng tạo cho những ngày cuối tuần? Bao gồm 3 ngày làm việc 24/7, gói 200,000 VNĐ cực kỳ linh hoạt và tiết kiệm chi phí cho bạn.",
            subscription_kind_name: "30 ngày",
            hours: 720,
            user_pack_name: "THÀNH VIÊN LINH HOẠT",
            user_pack: {
                id: 1,
                name: "THÀNH VIÊN LINH HOẠT",
                avatar_url: "http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg",
                detail: "",
                status: 1
            }
        }
    },
    {
        id: 2,
        code: null,
        money: 0,
        status: "",

        name: names[6],
        hour: hours[Math.floor(Math.random() * 8)],
        btnSaler: btns[6],
        btnStatus: btns[Math.floor(Math.random() * 7)],
        btnPrice: btns[Math.floor(Math.random() * 3)],
        btnCall: btns[Math.floor(Math.random() * 2)],
        btnCampaign: btns[Math.floor(Math.random() * 5)],
        campaign: campaigns[Math.floor(Math.random() * 5)],

        created_at: "12:49 31-01-2018",
        user: {
            id: 5549,
            name: "Hoàng Anh Minh",
            phone: "0992301921"
        },
        subscription: {
            id: 3,
            price: 300000,
            description: "Bạn luôn di chuyển & không dành quá nhiều thời gian trong văn phòng? Hay một không gian làm việc yên tĩnh và sáng tạo cho những ngày cuối tuần? Bao gồm 3 ngày làm việc 24/7, gói 200,000 VNĐ cực kỳ linh hoạt và tiết kiệm chi phí cho bạn.",
            subscription_kind_name: "30 ngày",
            hours: 720,
            user_pack_name: "THÀNH VIÊN LINH HOẠT",
            user_pack: {
                id: 1,
                name: "THÀNH VIÊN LINH HOẠT",
                avatar_url: "http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg",
                detail: "",
                status: 1
            }
        }
    },
    {
        id: 1,
        code: null,
        money: 100000,
        status: "new-register",

        name: names[6],
        hour: hours[Math.floor(Math.random() * 8)],
        btnSaler: btns[6],
        btnStatus: btns[Math.floor(Math.random() * 7)],
        btnPrice: btns[Math.floor(Math.random() * 3)],
        btnCall: btns[Math.floor(Math.random() * 2)],
        btnCampaign: btns[Math.floor(Math.random() * 5)],
        campaign: campaigns[Math.floor(Math.random() * 5)],

        created_at: "07:18 26-01-2018",
        user: {
            id: 2,
            name: "Nguyễn Việt Hùng",
            phone: "01684026343"
        },
        staff: {
            id: 2,
            name: "Nguyễn Việt Hùng"
        },
        subscription: {
            id: 1,
            price: 200000,
            description: " Bao gồm 3 ngày làm việc 24/7, gói 200,000 VNĐ cực kỳ linh hoạt và tiết kiệm chi phí cho bạn.",
            subscription_kind_name: "1 ngày",
            hours: 24,
            user_pack_name: "THÀNH VIÊN LINH HOẠT",
            user_pack: {
                id: 1,
                name: "THÀNH VIÊN LINH HOẠT",
                avatar_url: "http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg",
                detail: "",
                status: 1
            }
        }
    }
];

class ListOrder extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isOpenModal: false,
            register: {},

            isOpenCallModal: false,

            // hours: [1, 2, 3, 4, 5, 6, 7, 8],
            // names: ["Như Quỳnh", "Văn Long", "Quỳnh Anh", "Thảo Nguyên", "Việt Hùng", "Anh Quân", "Gia Khánh"],
            // btns: ["btn-success", "btn-danger", "btn-info", "btn-default", "btn-warning", "btn-primary", "btn-rose"],


            // name: names[x],
            // hour: hours[Math.floor(Math.random() * 8)],
            // btnSaler: btns[x],
            // btnStatus: btns[Math.floor(Math.random() * 7)],
            // btnPrice: btns[Math.floor(Math.random() * 3)],
            // btnCall: btns[Math.floor(Math.random() * 2)],


        };


        this.openCallModal = this.openCallModal.bind(this);
        this.closeCallModal = this.closeCallModal.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    openCallModal(register) {
        this.setState({isOpenCallModal: true, register: register});
    }

    closeCallModal() {
        this.setState({isOpenCallModal: false});
    }

    deletePost() {
        helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xoá ",
            function () {
                // this.props.blogActions.deletePost(post.id);
            }.bind(this));
    }

    render() {
        console.log(names, hours, btns, this.props.check);

        // console.log(this.props.registers, "XXXXXXXX");
        return (
            <div className="table-responsive">
                {
                    this.props.isLoading ? <Loading/> :
                        (
                            <table className="table table-hover">
                                <thead className="text-rose">
                                <tr>
                                    {/*<th/>*/}
                                    <th>Gọi</th>
                                    <th>Khách hàng</th>
                                    <th>Số điện thoại</th>
                                    <th>Mã đăng ký</th>
                                    <th>Saler</th>
                                    <th>Trạng thái</th>
                                    <th>Chiến dịch</th>
                                    <th>Giá tiền</th>
                                    <th>Tiền đã trả</th>
                                    <th>Đăng ký</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {room_service_registers.map((register) => {
                                    // let hours = [1, 2, 3, 4, 5, 6, 7, 8];
                                    // let names = ["Như Quỳnh", "Văn Long", "Quỳnh Anh", "Thảo Nguyên", "Việt Hùng", "Anh Quân", "Gia Khánh"];
                                    // let btns = ["btn-success", "btn-danger", "btn-info", "btn-default", "btn-warning", "btn-primary", "btn-rose"];
                                    // let x = Math.floor(Math.random() * 7);
                                    // let name = names[x];
                                    // let hour = hours[Math.floor(Math.random() * 8)];
                                    // let btnSaler = btns[x];
                                    // let btnStatus = btns[Math.floor(Math.random() * 7)];
                                    // let btnPrice = btns[Math.floor(Math.random() * 3)];
                                    // let btnCall = btns[Math.floor(Math.random() * 2)];
                                    return (
                                        <tr key={register.id}>
                                            {/*<td>*/}
                                            {/*<div className="container-dot-bottom-right">*/}
                                            {/*<button className="btn btn-round btn-fab btn-fab-mini text-white"*/}
                                            {/*data-toggle="tooltip" title="" type="button" rel="tooltip"*/}
                                            {/*data-placement="right"*/}
                                            {/*// data-original-title={register.class.name}*/}
                                            {/*>*/}
                                            {/*<img*/}
                                            {/*src={register.subscription.user_pack.avatar_url}*/}
                                            {/*alt=""/>*/}
                                            {/*</button>*/}


                                            {/*<div className="dot-bottom-right"*/}
                                            {/*data-toggle="tooltip" title="" type="button" rel="tooltip"*/}
                                            {/*data-placement="right"*/}
                                            {/*data-original-title={'Học lần ' + register.study_time}>*/}
                                            {/*{register.study_time}*/}
                                            {/*</div>*/}


                                            {/*</div>*/}
                                            {/*</td>*/}
                                            <td>

                                                <div className="container-call-status">
                                                    <button
                                                        className={"btn btn-round " + register.btnCall + " full-width padding-left-right-10"}
                                                        data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                        onClick={() => this.openCallModal(register)}
                                                    >
                                                        <i className="material-icons">
                                                            phone
                                                        </i> {register.hour + " h"}
                                                        {/*{register.call_status !== 'calling' && (register.time_to_reach + 'h')}*/}
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <a className="text-name-student-register">
                                                    {register.user.name}
                                                </a>
                                            </td>
                                            <td><a href={"tel:" + register.phone}
                                                   className="text-name-student-register">
                                                {register.user.phone ? helper.formatPhone(register.user.phone) : "Chưa có"}
                                            </a>
                                            </td>
                                            <td>
                                                {register.code || "Chưa có"}
                                            </td>
                                            <td>
                                                <a className={"btn btn-xs btn-main " + register.btnSaler}>{register.name} {/*  deleete*/}
                                                </a>
                                            </td>

                                            <td>
                                                {
                                                    register.status !== "" ?
                                                        (
                                                            <button className={"btn btn-xs btn-main " + register.btnStatus}
                                                                    style={{backgroundColor: '#' + "5BBD2B"}}
                                                            >
                                                                {REGISTER_STATUS.filter(status => status.value === register.status)[0].label}
                                                                <div className="ripple-container"/>
                                                            </button>
                                                        )
                                                        :
                                                        (
                                                            <button className="btn btn-xs btn-main">
                                                                Chưa có
                                                            </button>
                                                        )
                                                }
                                            </td>

                                            <td>
                                                <a className={"btn btn-xs btn-main " + register.btnCampaign}>{register.campaign} {/*  deleete*/}
                                                </a>
                                            </td>

                                            <td>
                                                <button className={"btn btn-xs btn-main " + register.btnPrice}>
                                                    {helper.dotNumber(register.subscription.price)}đ
                                                </button>
                                            </td>
                                            <td>{helper.dotNumber(register.money)}đ</td>
                                            <td>{register.created_at}</td>
                                            <td>
                                                <ButtonGroupAction
                                                    disabledEdit={!(register.editable && register.paid_status)}
                                                    // edit={(obj)=>{return this.props.openModalChangeInfoStudent(obj); }}
                                                    delete={this.deletePost}
                                                    object={register}
                                                    // disabledDelete={!register.is_delete}>
                                                >
                                                    {/*<a data-toggle="tooltip" title="Đổi lớp"*/}
                                                    {/*onClick={() => this.props.openModalChangeClass(register.id)}*/}
                                                    {/*type="button"*/}
                                                    {/*rel="tooltip">*/}
                                                    {/*<i className="material-icons">swap_vertical_circle</i>*/}
                                                    {/*</a>*/}
                                                </ButtonGroupAction>
                                            </td>
                                        </tr>
                                    );
                                })}

                                </tbody>


                                {/*<tbody>*/}
                                {/*{*/}
                                {/*this.props.registers.map((register, index) => {*/}
                                {/*return (*/}
                                {/*<ItemOrder register={register} key={index}*/}
                                {/*/>*/}
                                {/*);*/}
                                {/*})*/}
                                {/*}*/}
                                {/*</tbody>*/}


                            </table>

                        )
                }

                <Modal show={this.state.isOpenCallModal} bsStyle="primary" onHide={this.closeCallModal}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <CallModal
                            register={this.state.register}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

ListOrder.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    registers: PropTypes.array.isRequired,
};


export default ListOrder;
