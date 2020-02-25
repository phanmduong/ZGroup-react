import React from 'react';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import Loading from "../../../components/common/Loading";
import {bindActionCreators} from "redux";
import * as createRegisterActions from "../../registerStudents/createRegisterActions";
import FormInputText from "../../../components/common/FormInputText";
import MemberReactSelectOption from "../../registerStudents/MemberReactSelectOption";
import MemberReactSelectValue from "../../registerStudents/MemberReactSelectValue";
import ReactSelect from "react-select";
import * as helper from "../../../helpers/helper";
import * as studentActions from "../../infoStudent/studentActions";
import * as registerActions from "../../registerStudents/registerActions";
import * as leadActions from "../leadActions";
import {GENDER, STATUS_REFS} from "../../../constants/constants";


function getSelectSaler(items) {
    return items && items.map(item => {
        return {
            value: item.id,
            label: item.name,
            icon_url: item.avatar_url,
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


class CreateLeadOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.statusRef = STATUS_REFS.leads;
        this.initState = {
            show: false,
            lead: {
                carer_id: this.props.user && this.props.user.id,
                rate: 5,
                city: this.props.user.choice_province_id,
                name:'Không có tên'
            },
        };
        this.state = this.initState;
    }

    componentWillMount() {
        this.props.createRegisterActions.loadCampaigns();
        this.props.createRegisterActions.loadAllProvinces();
        this.props.registerActions.loadSalerFilter();

        this.loadStatuses(false);
    }

    loadStatuses = (singleLoad) => {
        let {studentActions, isLoadedStatuses} = this.props;
        if (!isLoadedStatuses || singleLoad)
            studentActions.loadStatuses(this.statusRef);
    };
    updateFormData = (event) => {
        const {name, value} = event.target;
        let lead = {...this.state.lead};
        lead[name] = value;
        this.setState({lead});
    };

    updateCampaign = (e) => {
        let lead = {...this.state.lead};
        lead["campaign_id"] = e.value;
        this.setState({lead});
    };

    updateGender = (e) => {
        let lead = {...this.state.lead};
        lead["gender"] = e.value;
        this.setState({lead});
    };
    updateAddress = (e) => {
        let lead = {...this.state.lead};
        lead["address"] = e.value;
        this.setState({lead});
    };

    updateSaler = (e) => {
        let lead = {...this.state.lead};
        lead["carer_id"] = e ? e.value : null;
        this.setState({lead});
    };
    updateSource = (e) => {
        let lead = {...this.state.lead};
        lead["source_id"] = e ? e.value : null;
        this.setState({lead});
    };
    updateCity = (e) => {
        let lead = {...this.state.lead};
        lead["city"] = e ? e.value : null;
        this.setState({lead});
    };
    updateStatus = (e) => {
        let lead = {...this.state.lead};
        lead["status_id"] = e ? e.value : null;
        this.setState({lead});
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

    create = (e) => {
        let {lead} = this.state;
        if (lead.name === null || lead.name === undefined || lead.name === "") {
            helper.showTypeNotification("Vui lòng nhập tên", 'warning');
            return;
        }
        if (lead.phone === null || lead.phone === undefined || lead.phone === "") {
            helper.showTypeNotification("Vui lòng nhập số điện thoại", 'warning');
            return;
        }
        if (lead.email === null || lead.email === undefined || lead.email === "") {
            helper.showTypeNotification("Vui lòng nhập email", 'warning');
            return;
        }
        if (!lead.rate || lead.rate && (lead.rate < 1 || lead.rate > 5 || isNaN(lead.rate))) {
            helper.showTypeNotification("Đánh giá chỉ từ 1 -> 5", 'warning');
            return;
        }
        if (this.props.provinces) {
            let city = this.props.provinces.filter(p => p.id == lead.city)[0];
            lead.city = city ? city.name : '';
        }
        this.props.leadActions.editInfoLead(
            lead,
            this.close
        );

        e.preventDefault();
    };

    toggle = () => {
        this.setState({show: !this.state.show});
    };


    close = (shouldClose) => {
        if (shouldClose) this.setState(this.initState);
    };

    render() {
        let {lead} = this.state;
        let {isEditing, salers, sources, statuses, className} = this.props;
        statuses = statuses[this.statusRef];
        let provinces = this.props.provinces ? this.props.provinces.map((province) => {
            return {value: province.id, label: province.name};
        }) : [];
        provinces = [{value: '0', label: "Không có"}, ...provinces];
        return (

            <div style={{position: "relative"}} ref="target">
                <div className={className} mask="create"
                     onClick={this.toggle}>
                    Tạo lead <i className="material-icons">add</i>
                </div>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay overlay-container" style={{width: 300, marginTop: 0}}
                         mask="lead">
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                            <div><b>Tạo lead mới</b></div>
                            <button
                                onClick={this.close}
                                type="button" className="close"
                                style={{color: '#5a5a5a'}}>
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        {(this.props.isLoadingCourses || this.props.isLoadingCampaigns) && <Loading/>}
                        {!isEditing && !(this.props.isLoadingCourses || this.props.isLoadingCampaigns) &&
                        <form role="form" id="form-info-student">

                            <div>
                                <label>Tên </label>
                                <FormInputText
                                    name="name"
                                    placeholder="Tên "
                                    required
                                    value={lead.name}
                                    updateFormData={this.updateFormData}
                                /></div>
                            <div>
                                <label>Email</label>
                                <FormInputText
                                    name="email"
                                    placeholder="Email "
                                    required
                                    value={lead.email}
                                    updateFormData={this.updateFormData}
                                /></div>
                            <div>
                                <label>Số điện thoại</label>
                                <FormInputText
                                    name="phone"
                                    placeholder="Số điện thoại "
                                    required
                                    value={lead.phone}
                                    updateFormData={this.updateFormData}
                                /></div>
                            <div>
                                <label>Thành phố</label>
                                <ReactSelect
                                    options={provinces}
                                    onChange={this.updateCity}
                                    value={lead.city}
                                    placeholder="Chọn thành phố"
                                    name="city"
                                />
                            </div>

                            <div>
                                <label>Đánh giá</label>
                                <FormInputText
                                    name="rate"
                                    type="number"
                                    minValue={1}
                                    maxValue={5}
                                    placeholder="Đánh giá: 1 -> 5"
                                    value={lead.rate}
                                    updateFormData={this.updateFormData}
                                />
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
                                            <label>Tên phụ huynh</label>
                                            <FormInputText
                                                name="father_name"
                                                placeholder="Tên phụ huynh"
                                                required
                                                value={lead.father_name}
                                                updateFormData={this.updateFormData}
                                            /></div>

                                        <div>
                                            <label>Nguồn</label>
                                            <ReactSelect
                                                options={getSelectCampaign(sources)}
                                                onChange={this.updateSource}
                                                value={lead.source_id}
                                                placeholder="Chọn nguồn"
                                                name="source_id"
                                            /></div>

                                        <div>
                                            <label>Chiến dịch</label>
                                            <ReactSelect
                                                value={lead.campaign_id}
                                                options={getSelectCampaign(this.props.campaigns)}
                                                onChange={this.updateCampaign}
                                                placeholder="Chọn chiến dịch"
                                            /></div>


                                        <div>
                                            <label>Địa chỉ</label>
                                            <ReactSelect
                                                value={lead.address}
                                                options={this.getDataAddress()}
                                                onChange={this.updateAddress}
                                                placeholder="Địa chỉ"
                                            />
                                        </div>
                                        <div>
                                            <label>Giới tính</label>
                                            <ReactSelect
                                                value={lead.gender}
                                                options={GENDER}
                                                onChange={this.updateGender}
                                                placeholder="Chọn giới tính"
                                            />
                                        </div>

                                        <div>
                                            <label>Trường học</label>
                                            <FormInputText
                                                name="university"
                                                placeholder="Trường học"
                                                value={lead.university}
                                                updateFormData={this.updateFormData}
                                            />
                                        </div>
                                        <div>
                                            <label>Quan tâm</label>
                                            <FormInputText
                                                name="interest"
                                                placeholder="Interest"
                                                value={lead.interest}
                                                updateFormData={this.updateFormData}
                                            />
                                        </div>

                                        <div>
                                            <label>P.I.C</label>
                                            <ReactSelect
                                                optionComponent={MemberReactSelectOption}
                                                valueComponent={MemberReactSelectValue}
                                                options={getSelectSaler(salers)}
                                                onChange={this.updateSaler}
                                                value={lead.carer_id}
                                                placeholder="Chọn saler"
                                                name="carer_id"
                                            />
                                        </div>


                                        <div>
                                            <label>Trạng thái</label>
                                            <ReactSelect
                                                options={getSelectCampaign(statuses)}
                                                onChange={this.updateStatus}
                                                value={lead.status_id}
                                                placeholder="Chọn trạng thái"
                                                name="status_id"
                                            /></div>
                                        <div>
                                            <label>Ghi chú</label>
                                            <div className="form-group">
                                                <div className="input-note-overlay">
                                                         <textarea type="text" className="form-control"
                                                                   rows={5}
                                                                   name="note"
                                                                   placeholder="Ghi chú"
                                                                   value={
                                                                       lead.note ? lead.note : ""
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
                        {isEditing ? <Loading/> :
                            <div className="flex">
                                <button type="button"
                                        disabled={isEditing}
                                        className="btn btn-white width-50-percent text-center"
                                        data-dismiss="modal"
                                        onClick={this.close}>
                                    Hủy
                                </button>
                                <button type="button"
                                        className="btn btn-success width-50-percent text-center"
                                        disabled={isEditing || this.props.isLoadingCourses ||
                                        this.props.isLoadingCampaigns}
                                        style={{backgroundColor: '#2acc4c'}}
                                        onClick={(e) => this.create(e)}>
                                    Hoàn tất
                                </button>
                            </div>}

                    </div>
                </Overlay>
            </div>


        );
    }
}


function mapStateToProps(state) {
    const {bases, sources, isLoading, isLoadingSources, courses, classes, isLoadingCourses, campaigns, isLoadingCampaigns, provinces} = state.createRegister;
    return {
        salers: state.registerStudents.salerFilter,
        bases,
        isEditing: state.lead.isEditing,
        statuses: state.infoStudent.statuses,
        isLoadingStatuses: state.infoStudent.isLoadingStatuses,
        isLoadedStatuses: state.infoStudent.isLoadedStatuses,
        user: state.login.user,
        isLoading,
        isLoadingSources,
        courses,
        sources,
        classes,
        isLoadingCourses,
        isLoadingCampaigns,
        campaigns,
        provinces,


    };
}

function mapDispatchToProps(dispatch) {
    return {
        createRegisterActions: bindActionCreators(createRegisterActions, dispatch),
        registerActions: bindActionCreators(registerActions, dispatch),
        studentActions: bindActionCreators(studentActions, dispatch),
        leadActions: bindActionCreators(leadActions, dispatch),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeadOverlay);
