/**
 * Created by phanmduong on 8/29/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import TabProfile from '../../components/common/TabProfile';
import * as profileActions from './profileActions';
import Loading from '../../components/common/Loading';
import {CirclePicker} from 'react-color';
import {LITERACY, MARITAL} from '../../constants/constants';
import * as helper from '../../helpers/helper';
import {isEmptyInput} from '../../helpers/helper';
import {Link} from 'react-router';
import {Modal} from "react-bootstrap";
import ChangePassword from "./ChangePassword";
import TooltipButton from "../../components/common/TooltipButton";
import EditProfileContainer from "./EditProfileContainer";


class ProfileContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            color: '',
            showModalChangePassword: false,
            showModalEditProfile: false,
        };
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.closeModalChangePassword = this.closeModalChangePassword.bind(this);
        this.openModalChangePassword = this.openModalChangePassword.bind(this);
    }

    componentWillMount() {
        this.props.profileActions.loadMyProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoading && this.props.isLoading !== nextProps.isLoading) {
            this.setState({color: nextProps.profile.color});
        }
    }

    // handleFileUpload(event) {
    //     let file = event.target.files[0];
    //     this.props.profileActions.changeAvatar(file, this.props.profile.id);
    // }
    handleFileUpload() {
        const that = this;
        let input = document.createElement("input");
        input.type = "file";
        input.value = "";
        input.accept = ".jpg,.png,.gif";
        input.onchange = (e) => {
            let file = e.target.files[0];
            this.props.profileActions.changeAvatar(file, that.props.profile.id);

        };
        input.click();

    }

    changeColor() {
        this.setState({color: this.props.profile.color});
    }

    closeModalChangePassword() {
        this.setState({showModalChangePassword: false});
    }

    openModalChangePassword() {
        this.setState({showModalChangePassword: true});
    }

    closeModalEditProfile = () => {
        this.setState({showModalEditProfile: false});
    };

    openModalEditProfile = () => {
        this.setState({showModalEditProfile: true});
    };


    render() {
        const defaultUrl = "https://d1j8r0kxyu9tj8.cloudfront.net/images/1547828315z6g7GGcOkULNAc0.jpg";
        let {name, email, phone, username, address, age, current_role, avatar_url, color, homeland, marital, literacy, start_company_vi, city, department} = this.props.profile;
        let {location} = this.props;
        let avatar = helper.validateLinkImage(avatar_url, defaultUrl);
        let literacyName = LITERACY.filter(item => item.id === literacy)[0];
        let maritalName = MARITAL.filter(item => item.id === marital)[0];
        return (
            <div>
                <div className={location ? "card" : ''}>
                    <div className={location ? "card-content" : ''}>
                        <div className="row">
                            {this.props.isLoading && <Loading/>}
                            <div className="col-md-4">

                                {!this.props.isLoading &&
                                <div>
                                    <div className="card" mask="blue">
                                        <div className="card-content flex flex-col">
                                            <div className="flex flex-justify-content-center">
                                                <TooltipButton text="Thay ảnh đại diện" placement="top">
                                                    <div className="img father"
                                                         onClick={() => this.handleFileUpload('avatar_url')}
                                                         style={{
                                                             backgroundImage: `url(${helper.validateLinkImage(avatar_url)})`
                                                         }}>
                                                        <div className="son"><i className="material-icons">
                                                            photo_camera
                                                        </i></div>
                                                    </div>
                                                </TooltipButton>
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
                                                {current_role && current_role.role_title &&
                                                <p>Chức vụ<strong>{current_role.role_title}</strong></p>}
                                                {department && <p>Bộ phận<strong>{department.name}</strong></p>}
                                                {phone && <p>Phone<strong>{phone}</strong></p>}
                                                {email && <p>Email<strong>{email}</strong></p>}
                                                {homeland && <p>Tỉnh thành <strong>{homeland}</strong></p>}
                                                {age && <p>Tuổi<strong>{age || "Chưa có"}</strong></p>}
                                                {address && <p>Địa chỉ<strong>{address || "Chưa có"}</strong></p>}
                                            </div>
                                            <div className="btn width-100" onClick={this.openModalEditProfile}
                                            >Sửa thông tin
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                }
                            </div>
                            <div className="col-md-8">
                                <div className="row">

                                    {!this.props.isLoading &&
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
                                                        {/*<ul className="nav nav-pills nav-pills-dark" data-tabs="tabs">*/}
                                                        {/*    {this.routes.map((route, index) => {*/}
                                                        {/*        return this.getRouteItem(route, index);*/}
                                                        {/*    })}*/}
                                                        {/*</ul>*/}
                                                    </div>

                                                </div>

                                            </li>


                                        </ul>


                                    </div>}
                                    {/*{!this.props.isLoading &&*/}
                                    {/*<div className="col-md-12">*/}
                                    {/*    <div className="card" mask="transparent">*/}

                                    {/*        {this.routes.map((route) => {*/}
                                    {/*            return route.path == this.state.currentRoute.path ?*/}
                                    {/*                route.component : <div/>;*/}

                                    {/*        })}*/}
                                    {/*    </div>*/}
                                    {/*</div>}*/}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <TabProfile url="my-profile"/>
                    <div className="card-content">
                        <div className="tab-content">
                            {
                                this.props.isLoading ? <Loading/>
                                    :
                                    (
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="card">
                                                    <div className="card-content">
                                                        <div className="tab-content">
                                                            <h4 className="card-title">
                                                                <strong>Thông tin cá nhân</strong>
                                                            </h4>
                                                            <br/>
                                                        </div>
                                                        <form onSubmit={(e) => {
                                                            e.preventDefault();
                                                        }}>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="label-floating">Tên đăng
                                                                            nhập</label>
                                                                        <p className="form-control-static">
                                                                            {username}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label
                                                                            className="label-floating">Phone</label>
                                                                        <p className="form-control-static">
                                                                            {phone}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label
                                                                            className="label-floating">Email</label>
                                                                        <p className="form-control-static">
                                                                            {email}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="label-floating">Quê
                                                                            quán</label>
                                                                        <p className="form-control-static">
                                                                            {homeland}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label
                                                                            className="label-floating">Tuổi</label>
                                                                        <p className="form-control-static">
                                                                            {age}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="label-floating">Địa
                                                                            chỉ</label>
                                                                        <p className="form-control-static">
                                                                            {address}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="label-floating">
                                                                            Hoạt động công ty từ
                                                                        </label>
                                                                        <p className="form-control-static">
                                                                            {start_company_vi}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="label-floating">
                                                                            Trình độ học vấn
                                                                        </label>
                                                                        <p className="form-control-static">
                                                                            {literacyName ? literacyName.name : ''}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="label-floating">
                                                                            Tình trạng hôn nhân
                                                                        </label>
                                                                        <p className="form-control-static">
                                                                            {maritalName ? maritalName.name : ''}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <Link to="/profile/edit-profile"
                                                                          className="btn btn-rose">Chỉnh sửa
                                                                    </Link>
                                                                    <button
                                                                        className="btn btn-rose"
                                                                        onClick={this.openModalChangePassword}>
                                                                        Thay đổi mật khẩu
                                                                    </button>
                                                                </div>
                                                            </div>

                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="card card-profile">
                                                            <div className="card-avatar">
                                                                <a className="content-avatar">
                                                                    <div className="img"
                                                                         style={{
                                                                             background: 'url(' + avatar + ') center center / cover',
                                                                             width: '130px',
                                                                             height: '130px'
                                                                         }}
                                                                    />
                                                                </a>
                                                            </div>
                                                            <div className="card-content">
                                                                <h6 className="category text-gray">{current_role.role_title}</h6>
                                                                <h4 className="card-title">{name}</h4>
                                                                <p className="description">
                                                                    Bấm nút phía dưới để thay đổi đại diện
                                                                </p>
                                                                {(this.props.isChangingAvatar) ?
                                                                    (
                                                                        <button
                                                                            className="btn btn-rose btn-round disabled">
                                                                            Đang tải lên
                                                                        </button>
                                                                    )
                                                                    :
                                                                    (
                                                                        <button className="btn btn-rose btn-round">
                                                                            Thay đổi
                                                                            <input type="file"
                                                                                   accept=".jpg,.png,.gif"
                                                                                   onChange={this.handleFileUpload}
                                                                                   style={{
                                                                                       cursor: 'pointer',
                                                                                       opacity: "0.0",
                                                                                       position: "absolute",
                                                                                       top: 0,
                                                                                       left: 0,
                                                                                       bottom: 0,
                                                                                       right: 0,
                                                                                       width: "100%",
                                                                                       height: "100%"
                                                                                   }}
                                                                            />
                                                                        </button>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="card">
                                                            <div className="card-content">
                                                                <div className="tab-content">
                                                                    <h4 className="card-title"><strong>Màu của
                                                                        bạn</strong></h4>
                                                                    <br/>
                                                                    <CirclePicker width="100%"
                                                                                  color={'#' + color}
                                                                                  onChangeComplete={this.changeColor}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                            }

                        </div>
                    </div>
                </div>
                <Modal show={this.state.showModalChangePassword} onHide={this.closeModalChangePassword}>
                    <Modal.Header closeButton  closeLabel="Đóng">
                        <Modal.Title>Thay đổi mật khẩu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ChangePassword
                            closeModal={this.closeModalChangePassword}
                        />
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showModalEditProfile} bsSize="large" onHide={this.closeModalEditProfile}>
                    <Modal.Header closeButton  closeLabel="Đóng">
                        <Modal.Title><div>&nbsp;</div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditProfileContainer/>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}


ProfileContainer.propTypes = {
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isChangingAvatar: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        profile: state.profile.profile,
        isLoading: state.profile.isLoading,
        isChangingAvatar: state.profile.isChangingAvatar
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
