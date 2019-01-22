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
import {MARITAL, LITERACY} from '../../constants/constants';
import * as helper from '../../helpers/helper';
import {Link} from 'react-router';
import {Modal} from "react-bootstrap";
import ChangePassword from "./ChangePassword";


class ProfileContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            color: '',
            showModalChangePassword: false,
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

    handleFileUpload(event) {
        let file = event.target.files[0];
        this.props.profileActions.changeAvatar(file, this.props.profile.id);
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


    render() {
        const defaultUrl = "https://d1j8r0kxyu9tj8.cloudfront.net/images/1547828315z6g7GGcOkULNAc0.jpg";
        let {name, email, phone, username, address, age, current_role, avatar_url, color, homeland, marital, literacy, start_company_vi} = this.props.profile;
        let avatar = helper.validateLinkImage(avatar_url, defaultUrl);
        let literacyName = LITERACY.filter(item => item.id === literacy)[0];
        let maritalName = MARITAL.filter(item => item.id === marital)[0];
        return (
            <div>
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
                <Modal show={this.state.showModalChangePassword}>
                    <Modal.Header closeButton onHide={this.closeModalChangePassword} closeLabel="Đóng">
                        <Modal.Title>Thay đổi mật khẩu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ChangePassword
                            closeModal={this.closeModalChangePassword}
                        />
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
