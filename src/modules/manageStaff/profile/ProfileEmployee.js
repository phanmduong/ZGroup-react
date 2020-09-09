import React from 'react';
import ProfileStore from "./ProfileStore";
import Loading from "../../../components/common/Loading";
import TooltipButton from "../../../components/common/TooltipButton";
import {isEmptyInput, validateLinkImage} from "../../../helpers/helper";
import {Modal} from "react-bootstrap";
import {observer} from "mobx-react";
import EditProfileComponent from "./EditProfileComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import EmptyData from "../../../components/common/EmptyData";

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

    componentDidMount() {
        const staffId = this.props.staffId ? this.props.staffId : this.props.params.staffId;
        this.store.getProfileInfo(staffId, () => {
            if (this.props.location.query && this.props.location.query.edit) {
                this.openModalEditProfile();
            }
        });
        setTimeout(() => {
            this.store.getBases();
            this.store.getDepartments();
            this.store.getRoles();
        }, 2000);

    }

    closeModalEditProfile = () => {
        this.store.showModalEditProfile = false;
    }

    openModalEditProfile = () => {
        this.store.showModalEditProfile = true;
    }


    render() {
        const {profile, isLoading, showModalEditProfile, role, base, department} = this.store;
        const {name, email, phone, address, age, bank_name_account, bank_number, avatar_url, homeland, city, start_company} = profile;
        return (
            <div>
                <div className={location ? "card" : ''}>
                    <div className={location ? "card-content" : ''}>
                        {isLoading ? <Loading/> :
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
                                                    {role && <p>Chức vụ<strong>{role.role_title}</strong></p>}
                                                    {department && <p>Phòng ban<strong>{department.name}</strong></p>}
                                                    {phone && <p>Phone<strong>{phone}</strong></p>}
                                                    {email && <p>Email<strong>{email}</strong></p>}
                                                    {homeland && <p>Tỉnh thành <strong>{homeland}</strong></p>}
                                                    {age && <p>Tuổi<strong>{age || "Chưa có"}</strong></p>}
                                                    {address && <p>Địa chỉ<strong>{address || "Chưa có"}</strong></p>}
                                                    {base && <p>Cơ sở<strong>{base.name}</strong></p>}
                                                    {<p>Tên TKNH<strong>{bank_name_account}</strong></p>}
                                                    {<p>Số TKNH<strong>{bank_number}</strong></p>}
                                                    {<p>Bắt đầu làm việc từ<strong>{start_company}</strong></p>}
                                                </div>
                                                {
                                                    this.props.user.role >= 2 &&
                                                    <div className="btn width-100 cursor-pointer"
                                                         onClick={this.openModalEditProfile}
                                                    >Sửa thông tin
                                                    </div>
                                                }

                                                {
                                                    this.props.user.role >= 2 &&
                                                    <div className="btn width-100 cursor-pointer"
                                                         onClick={() => this.store.resetPassword(profile.id)}
                                                    >Khôi phục mật khẩu
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                    </div>


                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-12">
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
                                                                <i className="material-icons">add</i>
                                                            </div>
                                                            <div className="timeline-panel">
                                                                <div className="timeline-body margin-vertical-30">

                                                                    <EmptyData
                                                                        title={""}/>
                                                                </div>

                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <Modal show={showModalEditProfile} bsSize="large" onHide={this.closeModalEditProfile}>
                    <Modal.Header closeButton closeLabel="Đóng">
                        <Modal.Title>Sửa thông tin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {showModalEditProfile && <EditProfileComponent store={this.store} user={this.props.user}/>}
                        {/*<EditProfileContainer/>*/}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user,

    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileEmployee));
