import React from 'react';
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import Loading from "../../../components/common/Loading";
import {bindActionCreators} from "redux";
import * as createRegisterActions from "../../registerStudents/createRegisterActions";
import FormInputText from "../../../components/common/FormInputText";
import ReactSelect from "react-select";
import * as helper from "../../../helpers/helper";
import {isEmptyInput} from "../../../helpers/helper";
import * as studentActions from "../../infoStudent/studentActions";
import * as registerActions from "../../registerStudents/registerActions";
import * as leadActions from "../leadActions";
import {GENDER, STATUS_REFS} from "../../../constants/constants";
import SourceOverlay from "../../infoStudent/overlays/SourceOverlay";
import MarketingCampaignOverlay from "../../infoStudent/overlays/MarketingCampaignOverlay";
import PicOverlay from "../../infoStudent/overlays/PicOverlay";
import StatusesOverlay from "../../infoStudent/overlays/StatusesOverlay";


// function getSelectSaler(items) {
//     return items && items.map(item => {
//         return {
//             value: item.id,
//             label: item.name,
//             icon_url: item.avatar_url,
//         };
//     });
// }

// function getSelectCampaign(items) {
//     return items && items.map(item => {
//         return {
//             value: item.id,
//             label: item.name,
//         };
//     });
// }


class CreateLeadOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.statusRef = STATUS_REFS.leads;
        this.initState = {
            show: false,
            showModal: false,
            lead: {
                carer_id: this.props.user && this.props.user.id,
                rate: 5,
                city: this.props.user.choice_province_id,
                name: 'Không có tên'
            },
            duplicate_leads: [],
            showModalDuplicateLeads: false
        };
        this.state = this.initState;
    }

    componentWillMount() {
        // this.props.createRegisterActions.loadCampaigns();
        this.props.createRegisterActions.loadAllProvinces();
        // this.props.registerActions.loadSalerFilter();

        // this.loadStatuses(false);
    }

    loadStatuses = (singleLoad) => {
        let {studentActions, isLoadedStatuses} = this.props;
        if (!isLoadedStatuses[this.statusRef] || singleLoad)
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
        lead["campaign_id"] = e ? e.id : e;
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
        lead["carer_id"] = e ? e.id : e;
        this.setState({lead});
    };
    updateSource = (e) => {
        let lead = {...this.state.lead};
        lead["source_id"] = e ? e.id : e;
        this.setState({lead});
    };
    updateCity = (e) => {
        let lead = {...this.state.lead};
        lead["city"] = e ? e.value : null;
        this.setState({lead});
    };
    updateStatus = (e) => {
        let lead = {...this.state.lead};
        lead["status_id"] = e ? e.id : e;
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
        let isEmptyName = isEmptyInput(lead.name);
        let isEmptyPhone = isEmptyInput(lead.phone);
        let isEmptyEmail = isEmptyInput(lead.email);
        if (isEmptyName) {
            helper.showTypeNotification("Vui lòng nhập tên", 'warning');
            return;
        }
        if (isEmptyPhone) {
            helper.showTypeNotification("Vui lòng nhập số điện thoại", 'warning');
            return;
        }
        if (isEmptyEmail) {
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
            () => {
                this.close;
                if (this.props.onSuccess) {
                    this.props.onSuccess();
                }
            },
            (duplicate_leads) => {
                this.setState({duplicate_leads, showModalDuplicateLeads: true});
            }
        );

        e.preventDefault();
    };

    toggle = () => {
        this.setState({show: !this.state.show});
    };


    close = (shouldClose) => {
        if (shouldClose) this.setState(this.initState);
    };
    closeModal = () => {
        this.setState({showModal: false});
    };
    closeModalDuplicateLeads = () => {
        this.setState({showModalDuplicateLeads: false});
    };
    showModal = () => {
        this.setState({showModal: true});
    };

    render() {
        let {lead, duplicate_leads} = this.state;
        let {isEditing, className} = this.props;
        // statuses = statuses[this.statusRef];
        let provinces = this.props.provinces ? this.props.provinces.map((province) => {
            return {value: province.id, label: province.name};
        }) : [];
        provinces = [{value: '0', label: "Không có"}, ...provinces];
        return (

            <div style={{position: "relative"}} ref="target">
                <div className={className} mask="create"
                     onClick={this.showModal}
                >
                    Tạo lead <i className="material-icons">add</i>
                </div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton={!isEditing}
                                  closeplaceholder="Đóng">
                        <Modal.Title><b>Tạo Lead mới</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        {/*{(this.props.isLoadingCourses || this.props.isLoadingCampaigns) && <Loading/>}*/}
                        {!isEditing && !(this.props.isLoadingCourses || this.props.isLoadingCampaigns) &&
                        <div className="form-grey">

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
                                            {/*<ReactSelect*/}
                                            {/*    options={getSelectCampaign(sources)}*/}
                                            {/*    onChange={this.updateSource}*/}
                                            {/*    value={lead.source_id}*/}
                                            {/*    placeholder="Chọn nguồn"*/}
                                            {/*    name="source_id"*/}
                                            {/*/>*/}
                                            <SourceOverlay
                                                className="btn status-overlay width-100 none-padding"
                                                onChange={this.updateSource}
                                                defaultText="Chọn nguồn"
                                                // styleWrapper={{zIndex:1}}
                                                styleButton={{padding: '10px 15px'}}
                                                styleOverlay={{marginTop: 35}}
                                                student={lead}
                                            />
                                        </div>

                                        <div>
                                            <label>Chiến dịch</label>
                                            {/*<ReactSelect*/}
                                            {/*    value={lead.campaign_id}*/}
                                            {/*    options={getSelectCampaign(this.props.campaigns)}*/}
                                            {/*    onChange={this.updateCampaign}*/}
                                            {/*    placeholder="Chọn chiến dịch"*/}
                                            {/*/>*/}
                                            <MarketingCampaignOverlay
                                                student={lead}
                                                // styleWrapper={{zIndex:1}}
                                                styleButton={{padding: '10px 15px'}}
                                                styleOverlay={{marginTop: 35}}
                                                defaultText="Chọn chiến dịch"
                                                className="btn status-overlay width-100 none-padding"
                                                onChange={this.updateCampaign}
                                            />
                                        </div>


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
                                            {/*<ReactSelect*/}
                                            {/*    optionComponent={MemberReactSelectOption}*/}
                                            {/*    valueComponent={MemberReactSelectValue}*/}
                                            {/*    options={getSelectSaler(salers)}*/}
                                            {/*    onChange={this.updateSaler}*/}
                                            {/*    value={lead.carer_id}*/}
                                            {/*    placeholder="Chọn saler"*/}
                                            {/*    name="carer_id"*/}
                                            {/*/>*/}
                                            <PicOverlay
                                                styleButton={{padding: '10px 15px'}}
                                                onChange={this.updateSaler}
                                                className="btn status-overlay width-100 none-padding"
                                                defaultText="Chọn P.I.C"
                                            />
                                        </div>


                                        <div>
                                            <label>Trạng thái</label>
                                            {/*<ReactSelect*/}
                                            {/*    options={getSelectCampaign(statuses)}*/}
                                            {/*    onChange={this.updateStatus}*/}
                                            {/*    value={lead.status_id}*/}
                                            {/*    placeholder="Chọn trạng thái"*/}
                                            {/*    name="status_id"*/}
                                            {/*/>*/}
                                            <StatusesOverlay
                                                data={lead.status || {}}
                                                onChange={this.updateStatus}
                                                defaultText="Chọn trạng thái"
                                                statusRef={this.statusRef}
                                                className="btn status-overlay width-100 none-padding"
                                                // styleWrapper={{zIndex:1}}
                                                styleButton={{padding: '10px 15px'}}
                                                styleOverlay={{marginTop: 35}}
                                            />
                                        </div>
                                        <div>
                                            <label>Ghi chú</label>
                                            <div className="form-group text-area-grey">

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


                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showModalDuplicateLeads} onHide={this.closeModalDuplicateLeads}>
                    <Modal.Header closeButton
                                  closeplaceholder="Đóng">
                        <Modal.Title><b>Lead bị trùng lặp</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="table-responsive table-split">
                            <table className="table">
                                <tbody>
                                {duplicate_leads && duplicate_leads.map((user, key) => {
                                    return (<tr key={key}>
                                        <td>{key + 1}</td>
                                        <td><b>{user.name}</b></td>
                                        <td><b>{user.email}</b></td>
                                        <td><b>{user.phone}</b></td>
                                        <td><a className="btn btn-xs btn-success text-center"
                                               href={`/sales/info-student/${user.id}`} target="_blank">Xem thông tin</a>
                                        </td>
                                    </tr>);
                                })}
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                </Modal>
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
