import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import *as helper from "../../helpers/helper";
import *as baseListActions from "./baseListActions";
import Select from 'react-select';
import FormInputText from "../../components/common/FormInputText";
import TooltipButton from "../../components/common/TooltipButton";
import CheckBoxMaterial from "../../components/common/CheckBoxMaterial";

class EditBaseModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
        this.handleImages = this.handleImages.bind(this);
        this.onChangeProvinceForm = this.onChangeProvinceForm.bind(this);
        this.onChangeDistrictForm = this.onChangeDistrictForm.bind(this);
        this.submit = this.submit.bind(this);
        this.handleSwitchCenter = this.handleSwitchCenter.bind(this);
        this.handleSwitchDisplay = this.handleSwitchDisplay.bind(this);
    }

    componentWillMount() {
        this.props.baseListActions.loadAllProvinces();
    }

    updateFormData(event) {
        const field = event.target.name;
        let base = {
            ...this.props.base,
            [field]: event.target.value
        };
        this.props.baseListActions.handleBaseEditModal(base);
    }

    changeAvatar(e) {
        const file = e.target.files[0];
        this.props.baseListActions.changeAvatar(file);
    }

    handleImages(e) {
        const fileList = e.target.files;
        const files = Array.from(fileList);
        const first_length = this.props.base.images_url ? JSON.parse(this.props.base.images_url).length : 0;
        files.map((file) => this.props.baseListActions.changeImage(file, files.length, first_length));
    }

    onChangeProvinceForm(value) {
        if (value) {
            let base = {
                ...this.props.base,
                province: {
                    id: value.value,
                    name: value.label
                }
            };
            let districts = this.props.provinces.filter(province => province.id === value.value)[0].districts;
            this.props.baseListActions.handleBaseEditModal(base);
            this.props.baseListActions.handleDistricts(districts);
        }
    }

    onChangeDistrictForm(value) {
        if (value) {
            let base = {
                ...this.props.base,
                district: {
                    id: value.value,
                    name: value.label
                }
            };
            this.props.baseListActions.handleBaseEditModal(base);
        }
    }

    submit() {
        const base = this.props.base;
        if (helper.isEmptyInput(base.name)
            || helper.isEmptyInput(base.address)
            || helper.isEmptyInput(base.latitude)
            || helper.isEmptyInput(base.longitude)
            || helper.isEmptyInput(base.district)
        ) {
            if (helper.isEmptyInput(base.name)) helper.showErrorNotification("Bạn cần nhập Tên cơ sở");
            if (helper.isEmptyInput(base.address)) helper.showErrorNotification("Bạn cần nhập địa chỉ cơ sở");
            if (helper.isEmptyInput(base.latitude)) helper.showErrorNotification("Bạn cần nhập latitude");
            if (helper.isEmptyInput(base.longitude)) helper.showErrorNotification("Bạn cần nhập longitude");
            if (helper.isEmptyInput(base.district)) helper.showErrorNotification("Bạn cần chọn Quận/Huyện");
        } else {
            if (base.id) {
                this.props.baseListActions.editBase(base);
            } else this.props.baseListActions.createBase(this.props.base);
        }
    }

    handleSwitchCenter() {
        let base = {
            ...this.props.base,
            center: !this.props.base.center ? 1 : 0
        };
        this.props.baseListActions.handleBaseEditModal(base);
    }

    handleSwitchDisplay() {
        let base = {
            ...this.props.base,
            display_status: !this.props.base.display_status ? 1 : 0
        };
        this.props.baseListActions.handleBaseEditModal(base);
    }

    render() {
        let base = this.props.base;
        return (
            <Modal show={this.props.showEditBaseModal}
                   onHide={() => this.props.baseListActions.showBaseEditModal()}>
                <a onClick={() => this.props.baseListActions.showBaseEditModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title>{base.id ? "Sửa phòng" : "Tạo phòng"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label className="label-control">Ảnh đại diện</label>
                                <div className="text-center">
                                    <br/>
                                    {
                                        this.props.isUploadingAvatar ? (
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" aria-valuenow="70"
                                                     aria-valuemin="0" aria-valuemax="100"
                                                     style={{width: `${this.props.percent}%`}}>
                                                    <span className="sr-only">{this.props.percent}% Complete</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <TooltipButton text="Chọn ảnh đại diện" placement="top">
                                                <a type="button" style={{
                                                    width: "100%",
                                                    lineHeight: "250px",
                                                    marginBottom: "10px",
                                                    textAlign: "center",
                                                    verticalAlign: "middle",
                                                    border: "0 none",
                                                    display: "inline-block"
                                                }}>
                                                    <img
                                                        src={base.avatar_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}
                                                        style={{
                                                            lineHeight: "164px",
                                                            height: "auto",
                                                            width: "100%",
                                                            display: "block",
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                            boxShadow: " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                                            borderRadius: "10px",
                                                        }}/>
                                                    <input type="file"
                                                           accept=".jpg,.png,.gif"
                                                           onChange={this.changeAvatar}
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
                                                </a>
                                            </TooltipButton>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div><br/>
                            <label className="label-control">Ảnh mô tả</label>
                            <div className="box">
                                {
                                    base.images_url && JSON.parse(base.images_url).map((image, index) => {
                                        return (
                                            <div key={index}
                                                 style={{
                                                     padding: "3px"
                                                 }}>
                                                <div className="container-for-images">
                                                    <img style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        background: "url(" + image + ") center center / cover",
                                                        position: "absolute",
                                                        left: "0",
                                                        borderRadius: "5px"
                                                    }}
                                                         data-original-title=""/>
                                                    <div className="overlay-for-images"/>
                                                    <TooltipButton text="Xóa" placement="top">
                                                        <div className="button-for-images">
                                                            <a rel="tooltip"
                                                               onClick={() => this.props.baseListActions.deleteImage(image)}
                                                               data-original-title="" title="">
                                                                <i className="material-icons">close</i>
                                                            </a>
                                                        </div>
                                                    </TooltipButton>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                {
                                    <div style={{
                                        padding: "3px"
                                    }}>
                                        <div className="flex-row-center flex-justify-content-center"
                                             style={{
                                                 width: '100%',
                                                 height: '100px',
                                                 backgroundColor: '#e8e8e8',
                                                 position: "relative",
                                                 borderRadius: '5px',
                                                 cursor: "pointer",
                                                 marginTop: '10px',
                                                 marginBottom: '10px'
                                             }}>
                                            <TooltipButton text="Tải ảnh" placement="top">
                                                <label>
                                                    <i className="material-icons"
                                                       style={{
                                                           fontSize: '40px',
                                                           color: '#919191',
                                                           cursor: "pointer"
                                                       }}>add_a_photo
                                                    </i>
                                                    <input multiple
                                                           onChange={this.handleImages}
                                                           style={{
                                                               cursor: this.props.isUploadingImage ? 'not-allowed' : 'pointer',
                                                               position: "absolute",
                                                               top: 0,
                                                               left: 0,
                                                               bottom: 0,
                                                               right: 0,
                                                               width: "100%",
                                                               height: "100%",
                                                           }}
                                                           type={this.props.isUploadingImage ? 'text' : 'file'}/>
                                                </label>
                                            </TooltipButton>
                                            {
                                                this.props.isUploadingImage &&
                                                <div className="progress"
                                                     style={{
                                                         position: "absolute",
                                                         left: 0,
                                                         bottom: 0,
                                                         width: '100%',
                                                         zIndex: '100',
                                                         marginBottom: '0'
                                                     }}>
                                                    <div className="progress-bar" role="progressbar"
                                                         aria-valuenow="70"
                                                         aria-valuemin="0" aria-valuemax="100"
                                                         style={{width: `${this.props.percent}%`}}>
                                                        <span className="sr-only">{this.props.percent}% Complete</span>
                                                    </div>
                                                </div>
                                            }
                                        </div>

                                    </div>
                                }
                            </div>
                        </div>
                        <form role="form"
                              id="form-add-room">
                            <FormInputText
                                label="Tên cơ sở"
                                name="name"
                                updateFormData={this.updateFormData}
                                value={base.name || ''}
                                required
                            />
                            <FormInputText
                                label="Địa chỉ cơ sở"
                                name="address"
                                updateFormData={this.updateFormData}
                                value={base.address || ''}
                                required
                            />
                            <FormInputText
                                label="Latitude"
                                name="latitude"
                                type="number"
                                updateFormData={this.updateFormData}
                                value={base.latitude || ''}
                            />
                            <FormInputText
                                label="Longitude"
                                name="longitude"
                                type="number"
                                updateFormData={this.updateFormData}
                                value={base.longitude || ''}
                            />
                            <div className="form-group">
                                <label className="label-control">Thông tin cơ bản</label>
                                <textarea
                                    type="text"
                                    rows={5}
                                    className="form-control"
                                    value={
                                        base.basic_info ? base.basic_info : ""
                                    }
                                    name="basic_info"
                                    onChange={this.updateFormData}
                                />
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="label-control">Mô tả</label>
                                <textarea type="text" className="form-control"
                                          rows={10}
                                          value={base.description ? base.description : ''}
                                          name="description"
                                          onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    <div className="form-group">
                                        <CheckBoxMaterial
                                            name="sale_status"
                                            checked={(base.center === 1)}
                                            onChange={this.handleSwitchCenter}
                                            label="Trụ sở"/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    <div className="form-group">
                                        <CheckBoxMaterial
                                            name="sale_status"
                                            checked={(base.display_status === 1)}
                                            onChange={this.handleSwitchDisplay}
                                            label="Hiển thị"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label-control">Tỉnh/Thành phố</label>
                                <Select
                                    name="categories"
                                    value={base.province ? base.province.id : ''}
                                    options={this.props.provinces.map(province => {
                                        return {
                                            ...province,
                                            value: province.id,
                                            label: province.name
                                        };
                                    })}
                                    onChange={this.onChangeProvinceForm}
                                    clearable={false}
                                />
                            </div>
                            <div className="form-group">
                                <label className="label-control">Quận/Huyện</label>
                                <Select
                                    name="type"
                                    value={base.district ? base.district.id : ""}
                                    options={this.props.districts.map(district => {
                                        return {
                                            ...district,
                                            value: district.id,
                                            label: district.name
                                        };
                                    })}
                                    onChange={this.onChangeDistrictForm}
                                    clearable={false}
                                />
                            </div>
                            {
                                this.props.isSavingBase ?
                                    (
                                        <button
                                            type="button"
                                            className="btn btn-rose disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/> Đang lưu
                                        </button>
                                    ) :
                                    (
                                        <button
                                            type="button"
                                            className="btn btn-rose"
                                            onClick={this.submit}
                                        >
                                            Lưu
                                        </button>
                                    )}
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

EditBaseModalContainer.propTypes = {
    isEditRoom: PropTypes.bool.isRequired,
    bases: PropTypes.array.isRequired,
    isStoringRoom: PropTypes.bool.isRequired,
    base: PropTypes.object.isRequired,
    showEditBaseModal: PropTypes.bool.isRequired,
    baseListActions: PropTypes.object.isRequired,
    isUploadingAvatar: PropTypes.bool.isRequired,
    percent: PropTypes.number.isRequired,
    isUploadingImage: PropTypes.bool.isRequired,
    types: PropTypes.array.isRequired,
    provinces: PropTypes.array.isRequired,
    isSavingBase: PropTypes.bool,
    districts: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        isStoringRoom: state.rooms.isStoringRoom,
        showEditBaseModal: state.baseList.showEditBaseModal,
        isEditRoom: state.rooms.isEditRoom,
        base: state.baseList.base,
        bases: state.rooms.bases,
        isUploadingAvatar: state.baseList.isUploadingAvatar,
        percent: state.baseList.percent,
        isUploadingImage: state.baseList.isUploadingImage,
        types: state.rooms.types,
        provinces: state.baseList.provinces,
        isSavingBase: state.baseList.isSavingBase,
        districts: state.baseList.districts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        baseListActions: bindActionCreators(baseListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBaseModalContainer);