import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {Link} from "react-router";
import Loading from "../../../components/common/Loading";
import {bindActionCreators} from "redux";
import * as createRegisterActions from "../../registerStudents/createRegisterActions";
import FormInputText from "../../../components/common/FormInputText";
import MemberReactSelectOption from "../../registerStudents/MemberReactSelectOption";
import MemberReactSelectValue from "../../registerStudents/MemberReactSelectValue";
import {DATE_FORMAT_SQL, DATE_VN_FORMAT, GENDER, STATUS_REFS} from "../../../constants/constants";
import ReactSelect from "react-select";
import {dotNumber, isEmptyInput, showTypeNotification, sortCoupon} from "../../../helpers/helper";
import * as studentActions from "../studentActions";
import * as registerActions from "../../registerStudents/registerActions";
import * as discountActions from "../../discount/discountActions";
import CouponSelectOption from "./CouponSelectOption";
import CouponSelectValue from "./CouponSelectValue";
import StatusesOverlay from "./StatusesOverlay";
import SourceOverlay from "./SourceOverlay";
import MarketingCampaignOverlay from "./MarketingCampaignOverlay";
import CreateCouponOverlay from "./CreateCouponOverlay";
import moment from "moment";


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

// function getSelectCampaign(items) {
//     return items && items.map(item => {
//         return {
//             value: item.id,
//             label: item.name,
//         };
//     });
// }

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
        let label = `(${item.current_target || 0}/${item.target || 0}) ${item.name}`;
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
        let dob =  this.props.student.dob ?
            moment(this.props.student.dob, DATE_VN_FORMAT).format(DATE_FORMAT_SQL) : '';
        this.initState = {
            show: false,
            showModal: false,
            coursePrice: 0,
            register: {
                ...this.props.student,
                ...this.props.studentData,
                dob,

                coupons: [],
                saler_id: this.props.user && this.props.user.id
            },
        };
        this.state = this.initState;
        this.statusRef = STATUS_REFS.registers;

    }

    componentWillMount() {
        let {
            discountActions,
            registerActions,
            createRegisterActions,
            isLoadedCoupons,
            // isLoadingSources,
            isLoadedCourses,
            isLoadedCampaigns,
            isLoadedSalerFilter,
            isLoadedProvinces,
            // isLoadedSources,
        } = this.props;

        if (!isLoadedCourses) createRegisterActions.loadCourses();
        if (!isLoadedCampaigns) createRegisterActions.loadCampaigns();
        if (!isLoadedSalerFilter) registerActions.loadSalerFilter();
        if (!isLoadedProvinces) createRegisterActions.loadAllProvinces();
        // this.loadStatuses(false);
        // if (!isLoadingSources && !isLoadedSources) createRegisterActions.loadSources();
        if (!isLoadedCoupons) discountActions.loadDiscounts({page: 1, limit: -1, search: ''});

    }

    componentDidMount() {
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

    // loadStatuses = (singleLoad) => {
    //     let {studentActions, isLoadedStatuses} = this.props;
    //     if (!isLoadedStatuses[this.statusRef] || singleLoad)
    //         studentActions.loadStatuses(this.statusRef);
    // };
    updateFormData = (event) => {
        const {name, value} = event.target;
        let register = {...this.state.register};
        register[name] = value;
        this.setState({register});
    };

    updateCampaign = (e) => {
        let register = {...this.state.register};
        register["campaign_id"] = e ? e.id : e;
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
        register["source_id"] = e ? e.id : e;
        this.setState({register});
    };
    updateStatus = (e) => {
        let register = {...this.state.register};
        register["status_id"] = e ? e.id : e;
        // register["status"] = e;
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
        let emptyName = isEmptyInput(register.name);
        let emptyPhone = isEmptyInput(register.phone);
        let emptyEmail = isEmptyInput(register.email);
        let emptyCourse = isEmptyInput(register.course_id);
        if (emptyCourse) {
            showTypeNotification("Vui lòng chọn môn học", 'warning');
            return;
        }
        if (emptyName) {
            showTypeNotification("Vui lòng nhập tên", 'warning');
            return;
        }
        if (emptyPhone || emptyEmail) {
            showTypeNotification("Vui lòng nhập số điện thoại hoặc email", 'warning');
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

    // toggle = () => {
    //     this.setState({show: !this.state.show});
    //     if (this.props.onShow && !this.state.show) {
    //
    //         this.props.onShow();
    //     }
    // };


    // close = () => {
    //     this.setState({show: false});
    // };

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

    closeModal = () => {
        this.setState({showModal: false});
    };

    showModal = () => {
        this.setState({showModal: true});
            if (this.props.onShow) {

                this.props.onShow();
            }
    };

    render() {
        let {register, coursePrice} = this.state;
        let {isSavingRegister, isLoadingCoupons, isLoadingCampaigns,isLoadingCourses,coupons, salers, bases, className, student, btnStyle} = this.props;
        let classes = ([...this.props.classes] || []).filter(c => ((register.base_id * 1) && c.base) ? c.base.id == register.base_id : true);
        // let statuses = this.props.statuses.registers;
        coupons = this.getCouponSelectOptions([...coupons], register);
        let finalPrice = this.getFinalPrice();
        let showLoading = (isLoadingCourses || isLoadingCampaigns || isLoadingCoupons);
        return (

            <div style={{position: "relative"}}>
                {!this.props.children &&
                <div className={className} mask="create"
                     ref="target"
                     onClick={this.showModal}
                    // onClick={this.toggle}
                     disabled={isSavingRegister}
                    style={{...btnStyle}}
                >
                    Tạo đăng kí mới {!student.id && <i className="material-icons">
                    add
                </i>}
                </div>}
                {this.props.children && <div className={className} mask="create"
                                             ref="target" onClick={this.showModal}
                                             disabled={isSavingRegister}>
                    {this.props.children}
                </div>}
                {/*<Overlay*/}
                {/*    rootClose={true}*/}
                {/*    show={this.state.show}*/}
                {/*    onHide={this.close}*/}
                {/*    placement="bottom"*/}
                {/*    container={this}*/}
                {/*    target={() => ReactDOM.findDOMNode(this.refs.target)}>*/}
                {/*    <div className="kt-overlay overlay-container" style={{width: 300, marginTop: 10}}*/}
                {/*         direction={direction}>*/}

                {/*    </div>*/}
                {/*</Overlay>*/}


                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton={!isSavingRegister && !showLoading}
                                  closeplaceholder="Đóng">
                        <Modal.Title><b>Tạo đăng kí mới</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>



                        <div className="form-grey"
                             onChange={e => e.stopPropagation()}>
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
                            <div>
                                <label>Tên học viên</label>
                                <FormInputText
                                    name="name"
                                    placeholder="Tên học viên"
                                    disabled={student.id}
                                    required
                                    value={register.name}
                                    updateFormData={this.updateFormData}
                                /></div>
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
                                <label>Tên phụ huynh 2</label>
                                <FormInputText
                                    name="mother_name"
                                    placeholder="Tên phụ huynh 2"
                                    required
                                    value={register.mother_name}
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

                                <div className="flex flex-space-between flex-align-items-center cursor-pointer">
                                    <label>Môn học/chương trình học</label>
                                    <Link to="/teaching/courses" target="_blank" className="btn-white btn-xs cursor-pointer">
                                        <label className="cursor-pointer">Thêm môn học</label>
                                    </Link>
                                </div>
                                <ReactSelect
                                    optionComponent={MemberReactSelectOption}
                                    value={register.course_id}
                                    options={getSelectCourse(this.props.courses)}
                                    onChange={this.updateCourse}
                                    placeholder={isLoadingCourses ? "Đang tải dữ liệu..." : "Chọn môn học/chương trình học"}
                                    valueComponent={MemberReactSelectValue}
                                /></div>
                            <div>
                                <div className="flex flex-space-between flex-align-items-center cursor-pointer">
                                    <label>Cơ sở</label>
                                    <Link to="/base/bases" target="_blank" className="btn-white btn-xs cursor-pointer">
                                        <label className="cursor-pointer">Thêm cơ sở</label>
                                    </Link>
                                </div>
                                <ReactSelect
                                    value={register.base_id}
                                    options={getSelectBase(bases, (this.props.classes || []))}
                                    onChange={this.updateBase}
                                    placeholder="Chọn cơ sở"
                                /></div>
                            <div>
                                <div className="flex flex-space-between flex-align-items-center cursor-pointer">
                                    <label>Lớp học</label>
                                    <Link to="/teaching/classes" target="_blank" className="btn-white btn-xs cursor-pointer">
                                        <label className="cursor-pointer">Thêm lớp học</label>
                                    </Link>
                                </div>
                                <ReactSelect
                                    value={register.class_id}
                                    options={getSelectClass(classes)}
                                    onChange={this.updateClass}
                                    placeholder="Lớp chờ"
                                /></div>
                            <div>
                                <label>Trạng thái</label>
                                {/*<ReactSelect*/}
                                {/*    options={getSelectCampaign(statuses)}*/}
                                {/*    onChange={this.updateStatus}*/}
                                {/*    value={register.status_id}*/}
                                {/*    placeholder="Chọn trạng thái"*/}
                                {/*    name="status_id"*/}
                                {/*/>*/}
                                <StatusesOverlay
                                    data={register.status || {}}
                                    onChange={this.updateStatus}
                                    defaultText="Chọn trạng thái"
                                    statusRef={this.statusRef}
                                    className="btn status-overlay width-100 none-padding"
                                    // styleWrapper={{zIndex:1}}
                                    styleButton={{padding: '10px 15px'}}
                                    styleOverlay={{marginTop:35}}
                                />
                            </div>
                            <div>
                                <label>Nguồn</label>
                                {/*<ReactSelect*/}
                                {/*    options={getSelectCampaign(sources)}*/}
                                {/*    onChange={this.updateSource}*/}
                                {/*    value={register.source_id}*/}
                                {/*    placeholder="Chọn nguồn"*/}
                                {/*    name="source_id"*/}
                                {/*/>*/}
                                <SourceOverlay
                                    className="btn status-overlay width-100 none-padding"
                                    onChange={this.updateSource}
                                    defaultText="Chọn nguồn"
                                    // styleWrapper={{zIndex:1}}
                                    styleButton={{padding: '10px 15px'}}
                                    styleOverlay={{marginTop:35}}
                                    student={register}
                                />
                            </div>
                            <div>
                                <label>Chiến dịch</label>
                                {/*<ReactSelect*/}
                                {/*    value={register.campaign_id}*/}
                                {/*    options={getSelectCampaign(this.props.campaigns)}*/}
                                {/*    onChange={this.updateCampaign}*/}
                                {/*    placeholder="Chọn chiến dịch"*/}
                                {/*/>*/}
                                <MarketingCampaignOverlay
                                    student={register}
                                    // styleWrapper={{zIndex:1}}
                                    styleButton={{padding: '10px 15px'}}
                                    styleOverlay={{marginTop:35}}
                                    defaultText="Chọn chiến dịch"
                                    className="btn status-overlay width-100 none-padding"
                                    onChange={this.updateCampaign}
                                />
                            </div>
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
                                />
                            </div>
                            <div>
                                <div className="flex flex-space-between flex-align-items-center ">
                                    <label>Mã khuyến mãi</label>
                                    <CreateCouponOverlay
                                        className="btn-white btn-xs"
                                        text={<label className="cursor-pointer">Quản lý mã</label>}
                                    />
                                </div>
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
                                        {/*<div>*/}
                                        {/*    <label>Email</label>*/}
                                        {/*    <FormInputText*/}
                                        {/*        name="email"*/}
                                        {/*        placeholder="Email"*/}
                                        {/*        value={register.email}*/}
                                        {/*        updateFormData={this.updateFormData}*/}
                                        {/*    /></div>*/}
                                        <div>
                                            <label>Giới tính</label>
                                            <ReactSelect
                                                value={register.gender}
                                                options={GENDER}
                                                onChange={this.updateGender}
                                                placeholder="Chọn giới tính"
                                            /></div>
                                        <div>
                                            <label>Ngày sinh(mm/dd/yyyy)</label>
                                            <FormInputText
                                                value={register.dob}
                                                updateFormData={this.updateFormData}
                                                id="form-change-dob"
                                                name="dob"
                                                type="date"
                                            />
                                            {/*<FormInputDate*/}
                                            {/*    placeholder="Chọn ngày sinh"*/}
                                            {/*    value={register.dob}*/}
                                            {/*    updateFormData={this.updateFormData}*/}
                                            {/*    id="form-change-dob"*/}
                                            {/*    name="dob"*/}
                                            {/*/>*/}
                                        </div>
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
                                            />
                                        </div>
                                        <div>
                                            <label>Nghề nghiệp</label>
                                            <FormInputText
                                                name="work"
                                                placeholder="Nghề nghiệp"
                                                value={register.work}
                                                updateFormData={this.updateFormData}
                                            />
                                        </div>
                                        <label>CMND</label>
                                        <FormInputText
                                            name="identity_code"
                                            placeholder="Chứng minh nhân dân"
                                            value={register.identity_code}
                                            updateFormData={this.updateFormData}
                                        />
                                        <label>Quốc tịch</label>
                                        <FormInputText
                                            name="nationality"
                                            placeholder="Quốc tịch"
                                            value={register.nationality}
                                            updateFormData={this.updateFormData}
                                        />
                                        <div>
                                            <label>Lý do biết đến</label>
                                            <FormInputText
                                                name="how_know"
                                                placeholder="Lý do biết đến"
                                                value={register.how_know}
                                                updateFormData={this.updateFormData}
                                            /></div>
                                        <div>
                                            <label>Link Facebook</label>
                                            <FormInputText
                                                name="facebook"
                                                placeholder="Link Facebook"
                                                value={register.facebook}
                                                updateFormData={this.updateFormData}
                                            /></div>
                                        <div>
                                            <label>Ghi chú</label>
                                            <div className="form-group text-area-grey">

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
                    </Modal.Body>
                </Modal>
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
        bases, isSavingRegister, sources, isLoading,
        isLoadingSources, register, courses,
        classes, isLoadingCourses, campaigns,
        isLoadingCampaigns, provinces,
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
