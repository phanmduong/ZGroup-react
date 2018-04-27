import React from "react";
import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import FormInputText from "../../components/common/FormInputText";
import {bindActionCreators} from "redux";
import * as createRegisterActions from "./createRegisterActions";
import {connect} from "react-redux";
import ReactSelect from "react-select";
import Loading from "../../components/common/Loading";
import * as helper from "../../helpers/helper";
import MemberReactSelectOption from "./MemberReactSelectOption";
import MemberReactSelectValue from "./MemberReactSelectValue";



function addSelectCourse(items) {
    return items && items.map(item => {
        return {
            value: item.id,
            label: item.name,
            icon_url : item.icon_url,
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
    }

    updateFormData(event) {
        const {name, value} = event.target;
        const register = {...this.props.register};
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
        else {
            this.props.createRegisterActions.createRegister(this.props.register, this.onHide);
        }
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

    render() {
        const {register} = this.props;
        return (
            <form role="form" id="form-info-student">
                {this.props.isLoadingCourses || this.props.isLoadingCampaigns ? <Loading/>
                    :

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
                                value={register.course_id}
                                options={addSelectCourse(this.props.courses)}
                                onChange={this.updateCourse}
                                placeholder="Chọn môn học"
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
    isLoadingCourses: PropTypes.bool.isRequired,
    isSavingRegister: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingCampaigns: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const {showCreateRegisterModal, isLoading, register, courses, classes, isLoadingCourses, campaigns, isLoadingCampaigns} = state.createRegister;
    return {
        showCreateRegisterModal,
        isLoading,
        register,
        courses,
        classes,
        isLoadingCourses,
        isLoadingCampaigns,
        campaigns,
        isSavingRegister: state.registerStudents.isSavingRegister,

    };

}

function mapDispatchToProps(dispatch) {
    return {
        createRegisterActions: bindActionCreators(createRegisterActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRegisterModalContainer);
