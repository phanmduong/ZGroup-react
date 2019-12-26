import React from 'react';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import Loading from "../../../components/common/Loading";
import {bindActionCreators} from "redux";
import FormInputText from "../../../components/common/FormInputText";
import CheckBoxMaterial from "../../../components/common/CheckBoxMaterial";
import * as baseListActions from "../baseListActions";
import * as helper from "../../../helpers/helper";
import Select from 'react-select';

// import TooltipButton from "../../../components/common/TooltipButton";


class CreateBaseOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
        };
        this.state = this.initState;
    }

    componentWillMount() {
        this.props.baseListActions.loadAllProvinces();
    }

    updateFormData = (event) => {
        const field = event.target.name;
        let base = {
            ...this.props.base,
            [field]: event.target.value
        };
        this.props.baseListActions.handleBaseEditModal(base);
    };

    onChangeProvinceForm = (value) => {
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
    };

    changeAvatar = (e) => {
        const file = e.target.files[0];
        this.props.baseListActions.changeAvatar(file);
    };

    handleImages = (e) => {
        const fileList = e.target.files;
        const files = Array.from(fileList);
        const first_length = this.props.base.images_url ? JSON.parse(this.props.base.images_url).length : 0;
        files.map((file) => this.props.baseListActions.changeImage(file, files.length, first_length));
    };
    onChangeDistrictForm = (value) => {
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
    };

    submit = () => {
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
            } else {
                this.props.baseListActions.createBase(this.props.base, this.close);
                console.log(base);
            }
        }
    };

    handleSwitchCenter = () => {
        let base = {
            ...this.props.base,
            center: !this.props.base.center ? 1 : 0
        };
        this.props.baseListActions.handleBaseEditModal(base);
    };

    handleSwitchDisplay = () => {
        let base = {
            ...this.props.base,
            display_status: !this.props.base.display_status ? 1 : 0
        };
        this.props.baseListActions.handleBaseEditModal(base);
    };


    toggle = () => {
        this.setState({show: !this.state.show});
    };


    close = () => {
        this.setState(this.initState);
    };

    render() {
        let {
            base, className, provinces,
            // isUploadingAvatar,isUploadingImage, percent,
            isLoading, isSavingBase
        } = this.props;
        console.log(base);
        return (

            <div style={{position: "relative"}}>
                <div className={className}
                     ref="target" onClick={this.toggle}>
                    Tạo cơ sở
                    <i className="material-icons">add</i>
                </div>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay overlay-container" style={{width: 300, marginTop: 10}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                            <div><b>Tạo cơ sở mới</b></div>
                            <button
                                onClick={this.close}
                                type="button" className="close"
                                style={{color: '#5a5a5a'}}>
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        {isLoading && <Loading/>}
                        {!isSavingBase &&
                        <form role="form" id="form-info-student">

                            <div>
                                <label>Tên cơ sở</label>
                                <FormInputText
                                    name="name"
                                    placeholder="Tên cơ sở"
                                    required
                                    value={base.name}
                                    updateFormData={this.updateFormData}
                                /></div>
                            <div>
                                <label>Địa chỉ</label>
                                <FormInputText
                                    name="address"
                                    placeholder="Địa chỉ"
                                    required
                                    value={base.address}
                                    updateFormData={this.updateFormData}
                                /></div>


                            <div>
                                <label>Tỉnh/Thành phố</label>
                                <Select
                                    name="categories"
                                    placeholder="Tỉnh/Thành phố"
                                    value={base.province ? base.province.id : ''}
                                    options={provinces.map(province => {
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
                            <div>
                                <label>Quận/Huyện</label>
                                <Select
                                    name="type"
                                    placeholder="Quận/Huyện"

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
                                        {/*<div className="row">*/}
                                        {/*    <div className="col-12">*/}
                                        {/*        <label>Ảnh đại diện</label>*/}
                                        {/*        <div className="text-center">*/}
                                        {/*            {*/}
                                        {/*                isUploadingAvatar ? (*/}
                                        {/*                    <div className="progress">*/}
                                        {/*                        <div className="progress-bar" role="progressbar" aria-valuenow="70"*/}
                                        {/*                             aria-valuemin="0" aria-valuemax="100"*/}
                                        {/*                             style={{width: `${percent}%`}}>*/}
                                        {/*                            <span className="sr-only">{percent}% Complete</span>*/}
                                        {/*                        </div>*/}
                                        {/*                    </div>*/}
                                        {/*                ) : (*/}
                                        {/*                    <TooltipButton text="Chọn ảnh đại diện" placement="top">*/}
                                        {/*                        <a type="button" style={{*/}
                                        {/*                            width: "100%",*/}
                                        {/*                            lineHeight: "250px",*/}
                                        {/*                            marginBottom: "10px",*/}
                                        {/*                            textAlign: "center",*/}
                                        {/*                            verticalAlign: "middle",*/}
                                        {/*                            border: "0 none",*/}
                                        {/*                            display: "inline-block"*/}
                                        {/*                        }}>*/}
                                        {/*                            <img*/}
                                        {/*                                src={base.avatar_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}*/}
                                        {/*                                style={{*/}
                                        {/*                                    lineHeight: "164px",*/}
                                        {/*                                    height: "auto",*/}
                                        {/*                                    width: "100%",*/}
                                        {/*                                    display: "block",*/}
                                        {/*                                    backgroundSize: "cover",*/}
                                        {/*                                    backgroundPosition: "center",*/}
                                        {/*                                    // boxShadow: " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",*/}
                                        {/*                                    borderRadius: "10px",*/}
                                        {/*                                }}/>*/}
                                        {/*                            <input type="file"*/}
                                        {/*                                   accept=".jpg,.png,.gif"*/}
                                        {/*                                   onChange={this.changeAvatar}*/}
                                        {/*                                   style={{*/}
                                        {/*                                       cursor: 'pointer',*/}
                                        {/*                                       opacity: "0.0",*/}
                                        {/*                                       position: "absolute",*/}
                                        {/*                                       top: 0,*/}
                                        {/*                                       left: 0,*/}
                                        {/*                                       bottom: 0,*/}
                                        {/*                                       right: 0,*/}
                                        {/*                                       width: "100%",*/}
                                        {/*                                       height: "100%"*/}
                                        {/*                                   }}*/}
                                        {/*                            />*/}
                                        {/*                        </a>*/}
                                        {/*                    </TooltipButton>*/}
                                        {/*                )*/}
                                        {/*            }*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="form-group">*/}
                                        {/*    <label className="label-control">Ảnh mô tả</label>*/}
                                        {/*    <div className="box">*/}
                                        {/*        {*/}
                                        {/*            base.images_url && JSON.parse(base.images_url).map((image, index) => {*/}
                                        {/*                return (*/}
                                        {/*                    <div key={index}*/}
                                        {/*                         style={{*/}
                                        {/*                             padding: "3px"*/}
                                        {/*                         }}>*/}
                                        {/*                        <div className="container-for-images">*/}
                                        {/*                            <img style={{*/}
                                        {/*                                width: "100%",*/}
                                        {/*                                height: "100%",*/}
                                        {/*                                background: "url(" + image + ") center center / cover",*/}
                                        {/*                                position: "absolute",*/}
                                        {/*                                left: "0",*/}
                                        {/*                                borderRadius: "5px"*/}
                                        {/*                            }}*/}
                                        {/*                                 data-original-title=""/>*/}
                                        {/*                            <div className="overlay-for-images"/>*/}
                                        {/*                            <TooltipButton text="Xóa" placement="top">*/}
                                        {/*                                <div className="button-for-images">*/}
                                        {/*                                    <a rel="tooltip"*/}
                                        {/*                                       onClick={() => this.props.baseListActions.deleteImage(image)}*/}
                                        {/*                                       data-original-title="" title="">*/}
                                        {/*                                        <i className="material-icons">close</i>*/}
                                        {/*                                    </a>*/}
                                        {/*                                </div>*/}
                                        {/*                            </TooltipButton>*/}
                                        {/*                        </div>*/}
                                        {/*                    </div>*/}
                                        {/*                );*/}
                                        {/*            })*/}
                                        {/*        }*/}
                                        {/*        {*/}
                                        {/*            <div style={{*/}
                                        {/*                padding: "3px"*/}
                                        {/*            }}>*/}
                                        {/*                <div className="flex-row-center flex-justify-content-center"*/}
                                        {/*                     style={{*/}
                                        {/*                         width: '100%',*/}
                                        {/*                         backgroundColor: '#e8e8e8',*/}
                                        {/*                         position: "relative",*/}
                                        {/*                         borderRadius: '5px',*/}
                                        {/*                         cursor: "pointer",*/}
                                        {/*                         marginTop: '10px',*/}
                                        {/*                         marginBottom: '10px'*/}
                                        {/*                     }}>*/}
                                        {/*                    <TooltipButton text="Tải ảnh" placement="top">*/}
                                        {/*                        <div style={{padding:10}}>*/}
                                        {/*                            <i className="material-icons"*/}
                                        {/*                               style={{*/}
                                        {/*                                   fontSize: '35px',*/}
                                        {/*                                   color: '#919191',*/}
                                        {/*                                   cursor: "pointer"*/}
                                        {/*                               }}>add_a_photo*/}
                                        {/*                            </i>*/}
                                        {/*                            <input multiple*/}
                                        {/*                                   onChange={this.handleImages}*/}
                                        {/*                                   style={{*/}
                                        {/*                                       cursor: isUploadingImage ? 'not-allowed' : 'pointer',*/}
                                        {/*                                       position: "absolute",*/}
                                        {/*                                       top: 0,*/}
                                        {/*                                       left: 0,*/}
                                        {/*                                       bottom: 0,*/}
                                        {/*                                       right: 0,*/}
                                        {/*                                       width: "100%",*/}
                                        {/*                                       height: "100%",*/}
                                        {/*                                   }}*/}
                                        {/*                                   type={isUploadingImage ? 'text' : 'file'}/>*/}
                                        {/*                        </div>*/}
                                        {/*                    </TooltipButton>*/}
                                        {/*                    {*/}
                                        {/*                        isUploadingImage &&*/}
                                        {/*                        <div className="progress"*/}
                                        {/*                             style={{*/}
                                        {/*                                 position: "absolute",*/}
                                        {/*                                 left: 0,*/}
                                        {/*                                 bottom: 0,*/}
                                        {/*                                 width: '100%',*/}
                                        {/*                                 zIndex: '100',*/}
                                        {/*                                 marginBottom: '0'*/}
                                        {/*                             }}>*/}
                                        {/*                            <div className="progress-bar" role="progressbar"*/}
                                        {/*                                 aria-valuenow="70"*/}
                                        {/*                                 aria-valuemin="0" aria-valuemax="100"*/}
                                        {/*                                 style={{width: `${percent}%`}}>*/}
                                        {/*                                <span className="sr-only">{percent}% Complete</span>*/}
                                        {/*                            </div>*/}
                                        {/*                        </div>*/}
                                        {/*                    }*/}
                                        {/*                </div>*/}

                                        {/*            </div>*/}
                                        {/*        }*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        <div>
                                            <label>Longitude</label>
                                            <FormInputText
                                                placeholder="Longitude"
                                                name="longitude"
                                                type="number"
                                                updateFormData={this.updateFormData}
                                                value={base.longitude || ''}
                                            />
                                        </div>
                                        <div>
                                            <label>Latitude</label>
                                            <FormInputText
                                                placeholder="Latitude"
                                                name="latitude"
                                                type="number"
                                                updateFormData={this.updateFormData}
                                                value={base.latitude || ''}
                                            />
                                        </div>
                                        {/*<div>*/}
                                        {/*    <label>Thông tin cơ bản</label>*/}
                                        {/*    <div className="input-note-overlay">*/}
                                        {/*            <textarea*/}
                                        {/*                type="text"*/}
                                        {/*                placeholder="Thông tin cơ bản"*/}
                                        {/*                rows={5}*/}
                                        {/*                className="form-control"*/}
                                        {/*                value={*/}
                                        {/*                    base.basic_info ? base.basic_info : ""*/}
                                        {/*                }*/}
                                        {/*                name="basic_info"*/}
                                        {/*                onChange={this.updateFormData}*/}
                                        {/*            />*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}

                                        <div>
                                            <label>Mô tả</label>
                                            <div className="input-note-overlay">

                                <textarea type="text" className="form-control"
                                          placeholder="Mô tả"
                                          rows={5}
                                          value={base.description ? base.description : ''}
                                          name="description"
                                          onChange={this.updateFormData}/>
                                            </div>
                                        </div>
                                        <div className="row margin-vertical-15">
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
                                    </div>
                                </div>
                            </div>
                        </form>

                        }
                        {isSavingBase ? <Loading/> :
                            <div className="flex">
                                <button type="button"
                                        disabled={isSavingBase}
                                        className="btn btn-white width-50-percent text-center"
                                        data-dismiss="modal"
                                        onClick={this.close}>
                                    Hủy
                                </button>
                                <button type="button"
                                        className="btn btn-success width-50-percent text-center"

                                        style={{backgroundColor: '#2acc4c'}}
                                        onClick={(e) => this.submit(e)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateBaseOverlay);
