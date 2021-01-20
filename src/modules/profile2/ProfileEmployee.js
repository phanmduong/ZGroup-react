import React from 'react';
import ProfileStore from "./ProfileStore";
import Loading from "../../components/common/Loading";
import TooltipButton from "../../components/common/TooltipButton";
import {getShortName, isEmptyInput, validateLinkImage} from "../../helpers/helper";
import {Modal} from "react-bootstrap";
import {observer} from "mobx-react";
import EditProfileComponent from "./EditProfileComponent";
import EmptyData from "../../components/common/EmptyData";
import Filter from "./Filter";
import filterStore from "./filterStore";
import {getValueFromKey} from "../../helpers/entity/object";
import ChangePassword from "./ChangePassword";

@observer
class ProfileEmployee extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentRoute: {}
        };
        this.store = new ProfileStore();
        this.path = "";
        this.routes = [
            {
                path: ``, text: 'Quản lý',
            },
            {
                path: `/231`, text: 'Vi phạm',
            },
            {
                path: `/review`,
                text: 'Học tập',
            },
            {
                path: `/543534`,
                text: 'Vinh danh',
            },
        ];
    }

    componentDidMount() {
        this.store.getProfileInfo();
        setTimeout(() => {
            this.store.getBases();
            this.store.getDepartments();
            this.store.getRoles();
        }, 2000);
    }

    closeModalEditProfile = () => {
        this.store.showModalEditProfile = false;
    };

    openModalEditProfile = () => {
        this.store.showModalEditProfile = true;
    };

    getRouteItem(route, index) {
        const changeRoute = () => {
            // window.history.pushState({}, "modal", route.path);
            this.path = route.path;
            this.setState({currentRoute: route});

        };


        return (<li key={index} className={this.path == route.path ? 'active' : ''}>
            <a onClick={changeRoute}>
                {route.text}
            </a>
        </li>)
            ;
    }

    classesByDate = (filter) => {
        this.store.loadClassesByDate(filter);
    };

    handleFileUpload = () => {
        let input = document.createElement("input");
        input.type = "file";
        input.value = "";
        input.accept = ".jpg,.png,.gif";
        input.onchange = (e) => {
            this.store.changeAvatar(e.target.files[0], (avatar_url) => {
                this.setState({profile: {...this.state.profile, avatar_url}});
            });
            // this.props.handleFileUpload(e);
        };
        input.click();

    };

    render() {
        const {profile, isLoading, showModalEditProfile, role, base, department, classesByDate, showModalChangePassword} = this.store;
        const {name, email, phone, address, age, bank_name_account, bank_number, avatar_url, homeland, city, start_company, id} = profile;
        let editable = true;
        return (
            <div>
                <div className={location ? "card" : ''}>
                    <div className={location ? "card-content" : ''}>

                        <div className="row">
                            <div className="col-md-4">


                                <div>
                                    <div className="card" mask="blue">
                                        <div className="card-content flex flex-col">
                                            <div className="flex flex-justify-content-center">
                                                <TooltipButton text="Thay ảnh đại diện" placement="top">
                                                    <div className="img father"
                                                         onClick={this.handleFileUpload}
                                                         style={{
                                                             backgroundImage: `url(${validateLinkImage(avatar_url)})`
                                                         }}>
                                                        <div className="son"><i className="material-icons">
                                                            photo_camera
                                                        </i></div>
                                                    </div>
                                                </TooltipButton>
                                            </div>
                                            <div
                                                className="text-white flex flex-col flex-justify-content-center text-center margin-top-10">
                                                <div>{department.name} - {role.role_title}</div>
                                            </div>
                                            <h4 className="card-title">{name}</h4>
                                            <h6 className="category text-gray text-email">{email}</h6>
                                            <h6 className="category text-gray text-email">
                                                <span>{phone}</span>
                                            </h6>

                                            {!isEmptyInput(city) &&
                                            <h6 className="category text-gray text-center color-white none-margin font-weight-400">
                                                <span>TP. {city}</span>

                                            </h6>}

                                        </div>
                                    </div>
                                    <div className="card detail-wrap">
                                        <div className="card-content">
                                            <div className="detail-wrap">
                                                <p>Họ và tên<strong>{name}</strong></p>
                                                {isEmptyInput(role) && <p>Chức vụ<strong>{role.role_title}</strong></p>}
                                                {isEmptyInput(department) && <p>Phòng ban<strong>{department.name}</strong></p>}
                                                {isEmptyInput(phone) && <p>Phone<strong>{phone}</strong></p>}
                                                {isEmptyInput(email) && <p>Email<strong>{email}</strong></p>}
                                                {isEmptyInput(homeland) && <p>Tỉnh thành <strong>{homeland}</strong></p>}
                                                {isEmptyInput(age) && <p>Tuổi<strong>{age || "Chưa có"}</strong></p>}
                                                {isEmptyInput(address) && <p>Địa chỉ<strong>{address || "Chưa có"}</strong></p>}
                                                {isEmptyInput(base) && <p>Cơ sở<strong>{base.name}</strong></p>}
                                                {<p>Tên TKNH<strong>{bank_name_account}</strong></p>}
                                                {<p>Số TKNH<strong>{bank_number}</strong></p>}
                                                {<p>Bắt đầu làm việc từ<strong>{start_company}</strong></p>}
                                            </div>
                                            <div className="btn width-100 cursor-pointer"
                                                 onClick={this.openModalEditProfile}
                                            >Sửa thông tin
                                            </div>

                                            {
                                                editable &&
                                                <div className="btn width-100 cursor-pointer"
                                                     onClick={() => this.store.changePassword(profile.id)}
                                                >Thay đổi mật khẩu
                                                </div>
                                            }


                                        </div>
                                    </div>

                                </div>


                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-12">
                                        <ul className="timeline timeline-simple time-line-register">
                                            <li className="timeline-inverted">
                                                <div className={"timeline-badge warning"}>
                                                    <i className="material-icons">star</i>
                                                </div>
                                                <div className="timeline-panel">
                                                    <div
                                                        // className="timeline-heading"
                                                    >
                                                        <ul className="nav nav-pills nav-pills-dark"
                                                            data-tabs="tabs">
                                                            {this.routes.map((route, index) => {
                                                                return this.getRouteItem(route, index);
                                                            })}
                                                        </ul>
                                                    </div>

                                                </div>

                                            </li>


                                        </ul>


                                    </div>
                                    <div className="col-md-12">
                                        <div className="tab-pane active">
                                            <ul className="timeline timeline-simple time-line-register">
                                                <li className="timeline-inverted">
                                                    <div className="timeline-badge"
                                                         style={{backgroundColor: '#4855d1'}}>
                                                        <span className="material-icons">alarm</span>
                                                    </div>
                                                    <div className="timeline-panel">
                                                        <div className="timeline-heading">
                                                            <Filter loadData={this.classesByDate}/>
                                                            {/*<button className="btn btn-actions"*/}
                                                            {/*        onClick={() => window.open("/customer-services/leads")}*/}
                                                            {/*>*/}
                                                            {/*    Thêm học viên*/}
                                                            {/*</button>*/}
                                                            {/*<button className="btn btn-actions"*/}
                                                            {/*        onClick={() => window.open("/sales/registerlist")}*/}
                                                            {/*>*/}
                                                            {/*    Thêm đăng kí*/}
                                                            {/*</button>*/}
                                                            {/*<button className="btn btn-actions"*/}
                                                            {/*        onClick={() => window.open("/teaching/classes")}*/}

                                                            {/*>*/}
                                                            {/*    Thêm lớp học*/}
                                                            {/*</button>*/}
                                                            {/*<button className="btn btn-actions"*/}
                                                            {/*        onClick={() => window.open("/teaching/courses")}*/}
                                                            {/*>*/}
                                                            {/*    Thêm môn học*/}
                                                            {/*</button>*/}


                                                        </div>
                                                        {
                                                            !filterStore.isLoading &&
                                                            <div className="timeline-body margin-vertical-30">
                                                                {isLoading ? <Loading/> :
                                                                    <div>
                                                                        {Object.keys(classesByDate).length <= 0 ?
                                                                            <EmptyData
                                                                                title={`Chào ${getShortName(name)}, chúc bạn một ngày mới tốt lành`}/>
                                                                            : <div/>
                                                                        }

                                                                    </div>
                                                                }
                                                            </div>
                                                        }
                                                    </div>
                                                </li>

                                                {!isLoading && Object.keys(classesByDate) && Object.keys(classesByDate).map((date) => {
                                                    return (
                                                        <li className="timeline-inverted">
                                                            <div className="timeline-badge"
                                                                 style={{backgroundColor: '#4998E9'}}>
                                                                <span className="material-icons">event</span>
                                                            </div>
                                                            <div className="timeline-panel">
                                                                <h4><b>{date}</b>
                                                                </h4>
                                                                <div className="timeline-body margin-vertical-30">
                                                                    {classesByDate[date].map((classItem) => {
                                                                        const is_teacher = classItem.teacher_ids ? classItem.teacher_ids.indexOf(id) >= 0 : false;
                                                                        return (
                                                                            <div
                                                                                className="flex flex-col cursor-pointer"
                                                                                onClick={() => window.open("/teaching/class/" + classItem.id)}>
                                                                                <b>{is_teacher ? "Giảng viên lớp" : "Trọ giảng lớp "} {classItem.name}</b>
                                                                                <div>{date}</div>
                                                                                <div>Vị trí làm
                                                                                    việc: <b>{getValueFromKey(classItem, "room.name")} - {getValueFromKey(classItem, "base.address")}</b>
                                                                                </div>
                                                                                <div>
                                                                                    <div
                                                                                        className="btn cursor-pointer color-black"
                                                                                        style={{backgroundColor: '#eee'}}>{classItem.schedule_start_time} - {classItem.schedule_end_time}
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                })}

                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={showModalEditProfile} bsSize="large" onHide={this.closeModalEditProfile}>
                    <Modal.Header closeButton closeLabel="Đóng">
                        <Modal.Title>Sửa thông tin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {showModalEditProfile && <EditProfileComponent store={this.store}/>}
                        {/*<EditProfileContainer/>*/}
                    </Modal.Body>
                </Modal>
                <Modal show={showModalChangePassword} onHide={() => this.store.showModalChangePassword = false}>
                    <Modal.Header closeButton closeLabel="Đóng">
                        <Modal.Title>Đổi mật khẩu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {showModalChangePassword &&
                        <ChangePassword closeModal={() => this.store.showModalChangePassword = false}/>}

                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default ProfileEmployee;
