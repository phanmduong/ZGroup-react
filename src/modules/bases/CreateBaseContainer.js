import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Import actions here!!
import PropTypes from 'prop-types';
import * as baseListActions from './baseListActions';
import {isEmptyInput, setFormValidation, showTypeNotification} from '../../helpers/helper';
import BaseForm from "./BaseForm";
import Loading from "../../components/common/Loading";
import UploadButton from "../../components/common/uploadButton/UploadButton";
import ListImage from "./ListImage";

class CreateBaseContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);
        this.changeProvince = this.changeProvince.bind(this);
        this.changeDistrict = this.changeDistrict.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.state = {
            error: {},
            header: "Thêm cơ sở",
            provinces: [],
            districts: [],
        };
    }

    componentWillMount() {
        if (this.props.route.type === "edit") {
            this.setState({
                header: "Sửa cơ sở"
            });
        }
        this.props.baseListActions.resetBase();
        if (this.props.params.baseId) {
            this.props.baseListActions.loadBase(this.props.params.baseId);
        }
        this.props.baseListActions.loadAllProvinces();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingProvinces != this.props.isLoadingProvinces && !nextProps.isLoadingProvinces) {
            const provinces = nextProps.provinces.map((province) => {
                return {
                    ...province,
                    value: province.id,
                    label: province.name

                };
            });
            this.setState({provinces});
        }
        if (!nextProps.isLoadingProvinces && !nextProps.isLoadingBase && nextProps.provinces
            && nextProps.provinces.length > 0 && nextProps.base.province_id && this.state.districts.length <= 0) {
            const province = nextProps.provinces.filter(province => province.id === nextProps.base.province_id)[0];
            const districts = province ? province.districts.map((district) => {
                return {
                    ...district,
                    value: district.id,
                    label: district.name
                };
            }) : [];
            this.setState({districts});
        }
    }

    changeProvince(province) {
        let base = {...this.props.base};
        base['province_id'] = province ? province.id : '';
        const districts = province ? province.districts.map((district) => {
            return {
                ...district,
                value: district.id,
                label: district.name

            };
        }) : [];
        this.setState({districts});
        this.props.baseListActions.updateCreateBaseFormData(base);
    }

    changeDistrict(district) {
        let base = {...this.props.base};
        base['district_id'] = district ? district.id : '';
        this.props.baseListActions.updateCreateBaseFormData(base);
    }


    updateFormData(event) {
        const field = event.target.name;
        let base = {...this.props.base};
        if (event.target.type === "checkbox") {
            base[field] = event.target.checked;
        } else {
            base[field] = event.target.value;
        }
        this.props.baseListActions.updateCreateBaseFormData(base);
    }

    submit() {
        setFormValidation('#form-store-base');
        if ($('#form-store-base').valid()) {
            if (isEmptyInput(this.props.base.avatar_url)) {
                showTypeNotification("Vui lòng chọn ảnh đại diện", "warning");
                return;
            }

            if (this.props.base.province_id && isEmptyInput(this.props.base.district_id)) {
                showTypeNotification("Vui lòng chọn quận/huyện", "warning");
                return;
            }

            if (this.props.route.type === "edit") {
                this.props.baseListActions.editBase(this.props.base);
            } else {
                this.props.baseListActions.createBase(this.props.base);
            }
        }
    }

    handleUpload(event) {
        const file = event.target.files[0];
        this.props.baseListActions.uploadAvatar(file);
    }

    handleUploadImage(event) {
        if (this.props.isUploadingImage) return;
        const file = event.target.files[0];
        this.props.baseListActions.uploadImage(file);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="card">
                                <div className="card-content">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong>{this.state.header}</strong>
                                        </h4>
                                        <br/>
                                        {this.props.isLoadingBase || this.props.isLoadingProvinces ? (
                                            <div className="card-content">
                                                <Loading/>
                                            </div>
                                        ) : (
                                            <BaseForm
                                                changeProvince={this.changeProvince}
                                                changeDistrict={this.changeDistrict}
                                                provinces={this.state.provinces}
                                                districts={this.state.districts}
                                                error={this.state.error}
                                                base={this.props.base}
                                                isSavingBase={this.props.isSavingBase}
                                                submit={this.submit}
                                                updateFormData={this.updateFormData}/>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="card">
                                {this.props.isLoadingBase || this.props.isLoadingProvinces ? (
                                    <div className="card-content">
                                        <div className="tab-content">
                                            <Loading/>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="card-content">
                                        <div className="tab-content">
                                            <h4 className="card-title">
                                                <strong>Ảnh đại diện</strong>
                                            </h4>
                                            <br/><br/>
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
                                                    <div>
                                                        <div style={{
                                                            width: "100%",
                                                            paddingBottom: "100%",
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                            backgroundImage: `url("${this.props.base.avatar_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}")`,
                                                        }}/>

                                                        <UploadButton
                                                            style={{
                                                                width: "100%"
                                                            }}
                                                            className="btn btn-rose"
                                                            onChange={this.handleUpload}>
                                                            chọn ảnh đại diện
                                                        </UploadButton>
                                                    </div>
                                                )
                                            }
                                        </div>    
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong>Ảnh</strong>
                                        </h4>
                                        <br/>
                                        {this.props.isLoadingBase || this.props.isLoadingProvinces ? (
                                            <div className="card-content">
                                                <div className="tab-content">
                                                    <Loading/>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <ListImage
                                                    handleImageUpload={this.handleUploadImage}
                                                    images={this.props.base.images}
                                                    isUploadingImage={this.props.isUploadingImage}
                                                    percentImage={this.props.percentImage}
                                                />
                                                {this.props.isSavingBase ?
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
                                            </div>

                                        )}
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

CreateBaseContainer.propTypes = {
    base: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    baseListActions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    isLoadingBase: PropTypes.bool.isRequired,
    isSavingBase: PropTypes.bool.isRequired,
    isLoadingProvinces: PropTypes.bool.isRequired,
    isUploadingAvatar: PropTypes.bool.isRequired,
    percent: PropTypes.number.isRequired,
    isUploadingImage: PropTypes.bool.isRequired,
    percentImage: PropTypes.number.isRequired,
    provinces: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        base: state.baseList.createBase.base,
        isLoadingBase: state.baseList.createBase.isLoadingBase,
        isSavingBase: state.baseList.createBase.isSavingBase,
        provinces: state.baseList.provinces,
        isLoadingProvinces: state.baseList.isLoadingProvinces,
        isUploadingAvatar: state.baseList.createBase.isUploadingAvatar,
        percent: state.baseList.createBase.percent,
        isUploadingImage: state.baseList.createBase.isUploadingImage,
        percentImage: state.baseList.createBase.percentImage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        baseListActions: bindActionCreators(baseListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBaseContainer);
