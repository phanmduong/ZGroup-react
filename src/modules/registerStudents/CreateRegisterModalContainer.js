import React from "react";
import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import FormInputText from "../../components/common/FormInputText";
import {bindActionCreators} from "redux";
import * as createRegisterActions from "./createRegisterActions";
import {connect} from "react-redux";
import ReactSelect from "react-select";
import * as helper from "../../helpers/helper";
import MemberReactSelectOption from "./MemberReactSelectOption";
import MemberReactSelectValue from "./MemberReactSelectValue";
import {GENDER} from "../../constants/constants";
import FormInputDate from "../../components/common/FormInputDate";
import * as registerActions from "./registerActions";


function addSelectCourse(items) {
    return items && items.map(item => {
        return {
            value: item.id,
            label: item.name,
            icon_url: item.icon_url,
        };
    });
}

function addSelectSaler(items) {
    return items && items.map(item => {
        return {
            value: item.id,
            label: item.name,
            icon_url: item.avatar_url,
        };
    });
}

function addSelectCampaign(items) {
    return items && items.map(item => {
        return {
            value: item.id,
            label: item.name,
        };
    });
}

function addSelectClass(items) {
    return items && items.map(item => {
        return {value: item.id, label: item.name + " - " + item.date_start + " - " + item.study_time};
    });
}

class CreateRegisterModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.createRegister = this.createRegister.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.updateClass = this.updateClass.bind(this);
        this.hide = this.hide.bind(this);
        this.updateCampaign = this.updateCampaign.bind(this);
        this.onHide = this.onHide.bind(this);

    }

    componentWillMount() {
        this.props.createRegisterActions.loadCourses();
        this.props.createRegisterActions.loadCampaigns();
        this.props.createRegisterActions.loadAllProvinces();
        this.props.registerActions.loadSalerFilter();
        this.updateSaler({value: this.props.user.id});
    }

    updateFormData(event) {
        const {name, value} = event.target;
        let register = {...this.props.register};
        register[name] = value;
        this.props.createRegisterActions.updateFormData(register);
    }

    updateCourse(e) {
        let register = {...this.props.register};
        register["course_id"] = e.value;
        this.props.createRegisterActions.updateFormData(register);
        this.props.createRegisterActions.loadClassesByCourse(e.value);
    }

    updateCampaign(e) {
        let register = {...this.props.register};
        register["campaign_id"] = e.value;
        this.props.createRegisterActions.updateFormData(register);
    }

    updateGender = (e) => {
        let register = {...this.props.register};
        register["gender"] = e.value;
        this.props.createRegisterActions.updateFormData(register);
    };
    updateAddress = (e) => {
        let register = {...this.props.register};
        register["address"] = e.value;
        this.props.createRegisterActions.updateFormData(register);
    };

    updateSaler = (e) => {
        let register = {...this.props.register};
        register["saler_id"] = e ? e.value : null;
        this.props.createRegisterActions.updateFormData(register);

    };

    updateClass(e) {
        let register = {...this.props.register};
        register["class_id"] = e.value;
        this.props.createRegisterActions.updateFormData(register);
    }

    createRegister(e) {

        if (this.props.register.name === null || this.props.register.name === undefined || this.props.register.name === "") {
            helper.showTypeNotification("Vui lòng nhập tên", 'warning');
            return;
        }
        if (this.props.register.phone === null || this.props.register.phone === undefined || this.props.register.phone === "") {
            helper.showTypeNotification("Vui lòng nhập số điện thoại", 'warning');
            return;
        }
        if (this.props.register.email === null || this.props.register.email === undefined || this.props.register.email === "") {
            helper.showTypeNotification("Vui lòng nhập email", 'warning');
            return;
        }
        // if(this.props.register.class_id === null || this.props.register.class_id === undefined || this.props.register.class_id === "" ){
        //     helper.showTypeNotification("Vui lòng chọn lớp", 'warning');
        //     return;
        // }

        this.props.createRegisterActions.createRegister(this.props.register, this.onHide);

        e.preventDefault();
    }

    onHide() {
        this.props.createRegisterActions.showCreateRegisterModal(false);
        this.props.createRegisterActions.updateFormData({});
    } // hide nay de dong modal va set regisiter rong khi dong --do reducer bi chia lam 2

    hide() {
        helper.confirm("warning", "Cảnh báo",
            "Bạn có chắc muốn đóng modal? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {
                this.props.createRegisterActions.showCreateRegisterModal(false);
                this.props.createRegisterActions.updateFormData({});
            },
        );
    }

    getDataAddress = () => {
        if (!this.props.provinces || this.props.provinces.length <= 0) return;
        let address = [];

        this.props.provinces.forEach((province) => {
            province.districts.forEach((district) => {
                address = [...address, {
                    value: `${district.type} ${district.name}, ${province.type} ${province.name}`,
                    label: `${district.type} ${district.name}, ${province.type} ${province.name}`,
                }];
            });

        });
        return address;
    };

    render() {
        const {register, salers} = this.props;

        return (
            <form role="form" id="form-info-student">
                {!(this.props.isLoadingCourses || this.props.isLoadingCampaigns) &&

                <Modal show={this.props.showCreateRegisterModal} onHide={this.hide}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <strong>Tạo đăng kí mới</strong>
                        </Modal.Title> </Modal.Header>
                    <Modal.Body>
                        <FormInputText
                            name="name"
                            label="Tên học viên"
                            required
                            value={register.name}
                            updateFormData={this.updateFormData}
                        />
                        <FormInputText
                            name="email"
                            label="Email học viên"
                            required
                            value={register.email}
                            updateFormData={this.updateFormData}
                        />
                        <FormInputText
                            name="phone"
                            label="Số điện thoại học viên"
                            required
                            value={register.phone}
                            updateFormData={this.updateFormData}
                        />
                        <FormInputText
                            name="coupon"
                            label="Mã khuyến mãi"
                            // required
                            value={register.coupon}
                            updateFormData={this.updateFormData}
                        />
                        <br/>
                        {/*<div className="row">*/}
                        {/*<div className="col-md-6">*/}
                        <ReactSelect
                            optionComponent={MemberReactSelectOption}
                            valueComponent={MemberReactSelectValue}
                            options={addSelectSaler(salers)}
                            onChange={this.updateSaler}
                            value={register.saler_id}
                            placeholder="Chọn saler"
                            label="Saler"
                            name="saler_id"
                        /> <br/>
                        <ReactSelect
                            optionComponent={MemberReactSelectOption}
                            value={register.course_id}
                            options={addSelectCourse(this.props.courses)}
                            onChange={this.updateCourse}
                            placeholder="Chọn môn học/chương trình học"
                            valueComponent={MemberReactSelectValue}
                        />
                        {/*</div>*/}
                        {/*<div className="col-md-6">*/}
                        <br/>
                        <ReactSelect
                            value={register.class_id}
                            options={addSelectClass(this.props.classes)}
                            onChange={this.updateClass}
                            placeholder="Chọn lớp học"
                        />
                        {/*</div>*/}
                        {/*</div>*/}
                        <br/>
                        <ReactSelect
                            value={register.campaign_id}
                            options={addSelectCampaign(this.props.campaigns)}
                            onChange={this.updateCampaign}
                            placeholder="Chọn chiến dịch"
                        />
                        <div className="panel panel-default">
                            <div className="panel-heading" role="tab"
                                 id="headingTwo">
                                <a className="collapsed" role="button"
                                   data-toggle="collapse"
                                   data-parent="#accordion"
                                   href="#collapseTwo" aria-expanded="false"
                                   aria-controls="collapseTwo">
                                    <h4 className="panel-title">
                                        Mở rộng
                                        <i className="material-icons">keyboard_arrow_down</i>
                                    </h4>
                                </a>
                            </div>
                            <div id="collapseTwo"
                                 className="panel-collapse collapse"
                                 role="tabpanel"
                                 aria-labelledby="headingTwo"
                                 aria-expanded="false"
                                 style={{height: '0px'}}>
                                <div className="panel-body">
                                    <ReactSelect
                                        value={register.gender}
                                        options={GENDER}
                                        onChange={this.updateGender}
                                        placeholder="Chọn giới tính"
                                    />
                                    <FormInputDate
                                        label="Chọn ngày sinh"
                                        value={register.dob}
                                        updateFormData={this.updateFormData}
                                        id="form-change-dob"
                                        name="dob"
                                    />
                                    <ReactSelect
                                        value={register.address}
                                        options={this.getDataAddress()}
                                        onChange={this.updateAddress}
                                        placeholder="Địa chỉ"
                                    />
                                    <FormInputText
                                        name="university"
                                        label="Trường học"
                                        value={register.university}
                                        updateFormData={this.updateFormData}
                                    />
                                    <FormInputText
                                        name="work"
                                        label="Nghề nghiệp"
                                        value={register.work}
                                        updateFormData={this.updateFormData}
                                    />
                                    <FormInputText
                                        name="how_know"
                                        label="Lý do biết đến"
                                        value={register.how_know}
                                        updateFormData={this.updateFormData}
                                    />
                                    <FormInputText
                                        name="facebook"
                                        label="Link Facebook"
                                        value={register.facebook}
                                        updateFormData={this.updateFormData}
                                    />
                                    <div className="form-group">
                                        <label className="label-control">Mô tả</label>
                                        <textarea
                                            type="text"
                                            rows={5}
                                            className="form-control"
                                            value={
                                                register.description ? register.description : ""
                                            }
                                            name="description"
                                            onChange={this.updateFormData}
                                        />
                                        <span className="material-input"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.props.isSavingRegister ? (
                            <button className="btn btn-rose disabled" type="button">
                                <i className="fa fa-spinner fa-spin"/> Đang lưu
                            </button>
                        ) : (
                            <button
                                className="btn btn-fill btn-rose"
                                type="button"
                                style={{width: "20%"}}
                                onClick={(e) => this.createRegister(e)}>
                                Lưu
                            </button>
                        )}
                    </Modal.Footer>
                </Modal>
                }
            </form>
        );
    }
}

CreateRegisterModalContainer.propTypes = {
    createRegisterActions: PropTypes.object.isRequired,
    showCreateRegisterModal: PropTypes.bool.isRequired,
    register: PropTypes.object.isRequired,
    campaigns: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    classes: PropTypes.array.isRequired,
    provinces: PropTypes.array.isRequired,
    isLoadingCourses: PropTypes.bool.isRequired,
    isSavingRegister: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingCampaigns: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const {showCreateRegisterModal, isSavingRegister, isLoading, register, courses, classes, isLoadingCourses, campaigns, isLoadingCampaigns, provinces} = state.createRegister;
    return {
        salers: state.registerStudents.salerFilter,
        isLoadingSalerFilter: state.registerStudents.isLoadingSalerFilter,
        user: state.login.user,
        showCreateRegisterModal,
        isLoading,
        register,
        courses,
        classes,
        isLoadingCourses,
        isLoadingCampaigns,
        campaigns,
        provinces,
        isSavingRegister,

    };

}

function mapDispatchToProps(dispatch) {
    return {
        registerActions: bindActionCreators(registerActions, dispatch),
        createRegisterActions: bindActionCreators(createRegisterActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRegisterModalContainer);
