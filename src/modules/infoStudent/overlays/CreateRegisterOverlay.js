import React from 'react';
import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import Loading from "../../../components/common/Loading";
import {bindActionCreators} from "redux";
import * as createRegisterActions from "../../registerStudents/createRegisterActions";
import FormInputText from "../../../components/common/FormInputText";
import MemberReactSelectOption from "../../registerStudents/MemberReactSelectOption";
import MemberReactSelectValue from "../../registerStudents/MemberReactSelectValue";
import {GENDER} from "../../../constants/constants";
import FormInputDate from "../../../components/common/FormInputDate";
import ReactSelect from "react-select";
import {dotNumber, showTypeNotification, sortCoupon} from "../../../helpers/helper";
import * as studentActions from "../studentActions";
import * as registerActions from "../../registerStudents/registerActions";
import * as discountActions from "../../discount/discountActions";
import CouponSelectOption from "./CouponSelectOption";
import CouponSelectValue from "./CouponSelectValue";


function getSelectSaler(items) {
    return items && items.map(item => {
        return {
            value: item.id,
            label: item.name,
            icon_url: item.avatar_url,
        };
    });
}

function getSelectCourse(items) {
    return items && items.map(item => {
        return {
            value: item.id,
            label: item.name,
            icon_url: item.icon_url,
        };
    });
}

function getSelectCampaign(items) {
    return items && items.map(item => {
        return {
            value: item.id,
            label: item.name,
        };
    });
}

function getSelectBase(items, studyClasses) {
    return items && items.map(item => {
        const count = studyClasses.filter(sc => sc.base && sc.base.id == item.id).length;
        return {
            value: item.id,
            label: `${item.province} - ${item.name} - (${count} lớp) - ${item.address}`,
        };
    });
}

function getSelectClass(items) {
    return items && items.map(item => {
        let label = item.name;
        if (item.date_start) {
            label += " - " + item.date_start;
        }
        if (item.study_time) {
            label += " - " + item.study_time;
        }
        return {value: item.id, label};
    });
}

class CreateRegisterOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            coursePrice: 0,
            register: {
                ...this.props.student, ...this.props.studentData,
                coupons: [],
                saler_id: this.props.user && this.props.user.id
            },
        };
        this.state = this.initState;

    }

    componentWillMount() {
        let {
            discountActions,
            registerActions,
            createRegisterActions,
            isLoadedCoupons,
            isLoadingSources,
            isLoadedCourses,
            isLoadedCampaigns,
            isLoadedSalerFilter,
            isLoadedProvinces,
            isLoadedSources,
        } = this.props;

        if (!isLoadedCourses) createRegisterActions.loadCourses();
        if (!isLoadedCampaigns) createRegisterActions.loadCampaigns();
        if (!isLoadedSalerFilter) registerActions.loadSalerFilter();
        if (!isLoadedProvinces) createRegisterActions.loadAllProvinces();
        this.loadStatuses(false);
        if (!isLoadingSources && !isLoadedSources) createRegisterActions.loadSources();
        if (!isLoadedCoupons) discountActions.loadDiscounts({page: 1, limit: -1, search: ''});

    }

    componentDidMount() {
        console.log(this.state.register);
        if (this.state.register.class_id) {
            this.props.createRegisterActions.loadClassesByCourse(this.state.register.course_id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.student && nextProps.student && (this.props.student.id != nextProps.student.id)) {
            this.setState({
                register: {...this.state.register, ...nextProps.student},
            });
        }
    }

    loadStatuses = (singleLoad) => {
        let {studentActions, isLoadedStatuses} = this.props;
        if (!isLoadedStatuses || singleLoad)
            studentActions.loadStatuses('registers');
    };
    updateFormData = (event) => {
        const {name, value} = event.target;
        let register = {...this.state.register};
        register[name] = value;
        this.setState({register});
    };

    updateCampaign = (e) => {
        let register = {...this.state.register};
        register["campaign_id"] = e.value;
        this.setState({register});
    };

    updateCourse = (e) => {
        if (!e || !e.value) return;
        let register = {...this.state.register};
        let {courses, createRegisterActions} = this.props;
        let coursePrice = courses.filter(c => c.id == e.value)[0].price;
        register["course_id"] = e.value;
        this.setState({register, coursePrice});

        createRegisterActions.loadClassesByCourse(e.value);
    };

    updateGender = (e) => {
        let register = {...this.state.register};
        register["gender"] = e.value;
        this.setState({register});
    };
    updateAddress = (e) => {
        let register = {...this.state.register};
        register["address"] = e.value;
        this.setState({register});
    };

    updateClass = (e) => {
        let register = {...this.state.register};
        register["class_id"] = e.value;
        this.setState({register});
    };
    updateSaler = (e) => {
        let register = {...this.state.register};
        register["saler_id"] = e ? e.value : null;
        this.setState({register});
    };
    updateSource = (e) => {
        let register = {...this.state.register};
        register["source_id"] = e ? e.value : null;
        this.setState({register});
    };
    updateStatus = (e) => {
        let register = {...this.state.register};
        register["status_id"] = e ? e.value : null;
        this.setState({register});
    };
    updateBase = (e) => {
        let register = {...this.state.register};
        register["base_id"] = e ? e.value : null;
        this.setState({register});
    };

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

    createRegister = (e) => {
        let {register} = this.state;
        if (register.name === null || register.name === undefined || register.name === "") {
            showTypeNotification("Vui lòng nhập tên", 'warning');
            return;
        }
        if (register.phone === null || register.phone === undefined || register.phone === "") {
            showTypeNotification("Vui lòng nhập số điện thoại", 'warning');
            return;
        }
        if (register.email === null || register.email === undefined || register.email === "") {
            showTypeNotification("Vui lòng nhập email", 'warning');
            return;
        }
        if (!register.base_id && !register.class_id) {
            showTypeNotification("Vui lòng chọn lớp hoặc cơ sở", 'warning');
            return;
        }
        this.props.createRegisterActions.createRegister(register, () => {
            this.setState(this.initState);
            // this.props.studentActions.loadRegisters(this.props.student.id);
            this.props.discountActions.loadDiscounts({page: 1, limit: -1, search: ''});
            if (this.props.onSuccess) {
                this.props.onSuccess(register);
            }
        });
        e.preventDefault();
    };

    toggle = () => {
        this.setState({show: !this.state.show});
        if (this.props.onShow && !this.state.show) {

            this.props.onShow();
        }
    };


    close = () => {
        this.setState({show: false});
    };

    getCouponSelectOptions(arr, register) {
        let multiCoupons = register.coupons && register.coupons.length > 0 && register.coupons.filter(c => c.shared != 1).length > 0;
        return arr.filter(c => {
            if (multiCoupons) {
                return false;
            } else if (register.coupons && register.coupons.length > 0) {
                return c.shared == 1;
            }
            return true;
        }).map((label) => {

            return {
                ...label,
                value: label.id,
                label: label.name
            };
        });
    }

    getFinalPrice = () => {
        let {register, coursePrice} = this.state;
        let finalPrice = coursePrice;
        let coupons = sortCoupon(register.coupons);
        let discountPercent = 0, discountFix = 0;
        coupons.forEach(c => {
            if (c.discount_type == 'percentage') {
                discountPercent += c.discount_value;
            }
            if (c.discount_type == 'fix') {
                discountFix += c.discount_value;
            }
        });
        discountPercent = Math.min(discountPercent, 100);
        finalPrice = finalPrice / 100 * (100 - discountPercent);
        finalPrice -= discountFix;

        return finalPrice;
    };

    render() {
        let {register, coursePrice} = this.state;
        let {isSavingRegister, isLoadingCoupons, coupons, salers, sources, bases, className, student, direction} = this.props;
        let classes = ([...this.props.classes] || []).filter(c => ((register.base_id * 1) && c.base) ? c.base.id == register.base_id : true);
        let statuses = this.props.statuses.registers;
        coupons = this.getCouponSelectOptions([...coupons], register);
        let finalPrice = this.getFinalPrice();
        return (

            <div style={{position: "relative"}}>
                {!this.props.children &&
                <div className={className} mask="create"
                     ref="target" onClick={this.toggle}
                     disabled={isSavingRegister}>
                    Tạo đăng kí mới {!student.id && <i className="material-icons">
                    add
                </i>}
                </div>}
                {this.props.children && <div className={className} mask="create"
                                             ref="target" onClick={this.toggle}
                                             disabled={isSavingRegister}>
                    {this.props.children}
                </div>}
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay overlay-container" style={{width: 300, marginTop: 10}}
                         direction={direction}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                            <div><b>Tạo đăng kí mới</b></div>
                            <button
                                onClick={this.close}
                                type="button" className="close"
                                style={{color: '#5a5a5a'}}>
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        {(this.props.isLoadingCourses || this.props.isLoadingCampaigns || isLoadingCoupons) &&
                        <Loading/>}
                        {!this.props.isSavingRegister && !(this.props.isLoadingCourses || this.props.isLoadingCampaigns || isLoadingCoupons) &&
                        <form role="form" id="form-info-student">
                            <div>
                                <label>Email</label>
                                <FormInputText
                                    name="email"
                                    placeholder="Email học viên"
                                    required
                                    disabled={student.id}
                                    value={register.email}
                                    updateFormData={this.updateFormData}
                                /></div>
                            {!student.id && <div>
                                <label>Tên học viên</label>
                                <FormInputText
                                    name="name"
                                    placeholder="Tên học viên"
                                    required
                                    value={register.name}
                                    updateFormData={this.updateFormData}
                                /></div>}
                            <div>
                                <label>Tên phụ huynh</label>
                                <FormInputText
                                    name="father_name"
                                    placeholder="Tên phụ huynh"
                                    required
                                    value={register.father_name}
                                    updateFormData={this.updateFormData}
                                /></div>
                            <div>
                                <label>Số điện thoại</label>
                                <FormInputText
                                    name="phone"
                                    placeholder="Số điện thoại học viên"
                                    required
                                    value={register.phone}
                                    updateFormData={this.updateFormData}
                                /></div>

                            <div>
                                <label>Môn học</label>
                                <ReactSelect
                                    optionComponent={MemberReactSelectOption}
                                    value={register.course_id}
                                    options={getSelectCourse(this.props.courses)}
                                    onChange={this.updateCourse}
                                    placeholder="Chọn môn học"
                                    valueComponent={MemberReactSelectValue}
                                /></div>
                            <div>
                                <label>Cơ sở</label>
                                <ReactSelect
                                    value={register.base_id}
                                    options={getSelectBase(bases, (this.props.classes || []))}
                                    onChange={this.updateBase}
                                    placeholder="Chọn cơ sở"
                                /></div>
                            <div>
                                <label>Lớp học</label>
                                <ReactSelect
                                    value={register.class_id}
                                    options={getSelectClass(classes)}
                                    onChange={this.updateClass}
                                    placeholder="Lớp chờ"
                                /></div>
                            <div>
                                <label>Trạng thái</label>
                                <ReactSelect
                                    options={getSelectCampaign(statuses)}
                                    onChange={this.updateStatus}
                                    value={register.status_id}
                                    placeholder="Chọn trạng thái"
                                    name="status_id"
                                /></div>
                            <div>
                                <label>Nguồn</label>
                                <ReactSelect
                                    options={getSelectCampaign(sources)}
                                    onChange={this.updateSource}
                                    value={register.source_id}
                                    placeholder="Chọn nguồn"
                                    name="source_id"
                                /></div>
                            <div>
                                <label>Chiến dịch</label>
                                <ReactSelect
                                    value={register.campaign_id}
                                    options={getSelectCampaign(this.props.campaigns)}
                                    onChange={this.updateCampaign}
                                    placeholder="Chọn chiến dịch"
                                /></div>
                            <div>
                                <label>Nhân viên sale</label>
                                <ReactSelect
                                    optionComponent={MemberReactSelectOption}
                                    valueComponent={MemberReactSelectValue}
                                    options={getSelectSaler(salers)}
                                    onChange={this.updateSaler}
                                    value={register.saler_id}
                                    placeholder="Chọn saler"
                                    name="saler_id"
                                /></div>
                            {/*<div>*/}
                            {/*    <label>Mã khuyến mãi</label>*/}
                            {/*    <FormInputText*/}
                            {/*        name="coupon"*/}
                            {/*        placeholder="Mã khuyến mãi"*/}
                            {/*        value={register.coupon}*/}
                            {/*        updateFormData={this.updateFormData}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div>
                                <label>Mã khuyến mãi</label>
                                <ReactSelect
                                    placeholder="Nhập mã khuyến mãi"
                                    value={register.coupons}
                                    // style={{minWidth: 200, maxWidth: 400}}
                                    className="select-light-scroll"
                                    name="cardLabels"
                                    optionComponent={CouponSelectOption}
                                    multi={true}
                                    options={sortCoupon([...coupons])}
                                    valueComponent={CouponSelectValue}
                                    onChange={value => this.updateFormData({target: {name: 'coupons', value}})}
                                />
                                {register.course_id && register.coupons.length > 0 &&
                                <div>
                                    <div className="flex flex-space-between flex-align-items-center margin-top-10"
                                         style={{fontSize: 12}}>
                                        <div><b>Giá khóa học: </b></div>
                                        <div>{` ${dotNumber(coursePrice)}đ`}</div>
                                    </div>

                                    {coursePrice - finalPrice > 0 &&
                                    <div className="flex flex-space-between flex-align-items-center margin-top-10"
                                         style={{fontSize: 12}}>
                                        <div><b>Đã giảm: </b></div>
                                        <div>{` ${dotNumber(coursePrice - finalPrice)}đ`}</div>
                                    </div>}
                                    <div className="flex flex-space-between flex-align-items-center margin-top-10"
                                         style={{fontSize: 12}}>
                                        <div><b>Tổng: </b></div>
                                        <div>{` ${dotNumber(finalPrice)}đ`}</div>
                                    </div>
                                </div>
                                }

                            </div>

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
                                            <i className="material-icons">arrow_drop_down</i>
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
                                        <div>
                                            <label>Email</label>
                                            <FormInputText
                                                name="email"
                                                placeholder="Email"
                                                value={register.email}
                                                updateFormData={this.updateFormData}
                                            /></div>
                                        <div>
                                            <label>Giới tính</label>
                                            <ReactSelect
                                                value={register.gender}
                                                options={GENDER}
                                                onChange={this.updateGender}
                                                placeholder="Chọn giới tính"
                                            /></div>
                                        <div>
                                            <label>Ngày sinh</label>
                                            <FormInputDate
                                                placeholder="Chọn ngày sinh"
                                                value={register.dob}
                                                updateFormData={this.updateFormData}
                                                id="form-change-dob"
                                                name="dob"
                                            /></div>
                                        <div>
                                            <label>Địa chỉ</label>
                                            <ReactSelect
                                                value={register.address}
                                                options={this.getDataAddress()}
                                                onChange={this.updateAddress}
                                                placeholder="Địa chỉ"
                                            /></div>
                                        <div>
                                            <label>Trường học</label>
                                            <FormInputText
                                                name="university"
                                                placeholder="Trường học"
                                                value={register.university}
                                                updateFormData={this.updateFormData}
                                            /></div>
                                        <div>
                                            <label>Nơi làm việc</label>
                                            <FormInputText
                                                name="work"
                                                placeholder="Nơi làm việc"
                                                value={register.work}
                                                updateFormData={this.updateFormData}
                                            /></div>
                                        <div>
                                            <label>Lý do biết đến</label>
                                            <FormInputText
                                                name="how_know"
                                                placeholder="Lý do biết đến"
                                                value={register.how_know}
                                                updateFormData={this.updateFormData}
                                            /></div>
                                        <div>
                                            <label>Facebook</label>
                                            <FormInputText
                                                name="facebook"
                                                placeholder="Link Facebook"
                                                value={register.facebook}
                                                updateFormData={this.updateFormData}
                                            /></div>
                                        <div>
                                            <label>Ghi chú</label>
                                            <div className="form-group">
                                                <div className="input-note-overlay">
                                                         <textarea type="text" className="form-control"
                                                                   rows={5}
                                                                   name="description"
                                                                   placeholder="Mô tả"
                                                                   value={
                                                                       register.description ? register.description : ""
                                                                   }
                                                                   onChange={this.updateFormData}/>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>

                        }
                        {isSavingRegister ? <Loading/> :
                            <div className="flex">
                                <button type="button"
                                        disabled={isSavingRegister}
                                        className="btn btn-white width-50-percent text-center"
                                        data-dismiss="modal"
                                        onClick={this.close}>
                                    Hủy
                                </button>
                                <button type="button"
                                        className="btn btn-success width-50-percent text-center"
                                        disabled={isSavingRegister || this.props.isLoadingCourses ||
                                        this.props.isLoadingCampaigns}
                                        style={{backgroundColor: '#2acc4c'}}
                                        onClick={(e) => this.createRegister(e)}>
                                    Hoàn tất
                                </button>
                            </div>}

                    </div>
                </Overlay>
            </div>


        );
    }
}


CreateRegisterOverlay.propTypes = {
    createRegisterActions: PropTypes.object.isRequired,
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
    const {
        bases, isSavingRegister, sources, isLoading, isLoadingSources, register, courses, classes, isLoadingCourses, campaigns, isLoadingCampaigns, provinces,
        isLoadedCourses,
        isLoadedCampaigns,
        isLoadedSources,
        isLoadedProvinces,
    } = state.createRegister;

    return {
        student: state.infoStudent.student,
        salers: state.registerStudents.salerFilter,
        isLoadedSalerFilter: state.registerStudents.isLoadedSalerFilter,
        bases,
        statuses: state.infoStudent.statuses,
        isLoadingStatuses: state.infoStudent.isLoadingStatuses,
        isLoadedStatuses: state.infoStudent.isLoadedStatuses,
        user: state.login.user,
        isLoading,
        register,
        isLoadingSources,
        courses,
        sources,
        classes,
        isLoadingCourses,
        isLoadingCampaigns,
        campaigns,
        provinces,
        isSavingRegister,
        isLoadedCourses,
        isLoadedCampaigns,
        isLoadedProvinces,
        isLoadedSources,
        coupons: state.discounts.discountsList,
        isLoadingCoupons: state.discounts.isLoading,
        isLoadedCoupons: state.discounts.isLoading,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        createRegisterActions: bindActionCreators(createRegisterActions, dispatch),
        registerActions: bindActionCreators(registerActions, dispatch),
        discountActions: bindActionCreators(discountActions, dispatch),
        studentActions: bindActionCreators(studentActions, dispatch),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRegisterOverlay);
