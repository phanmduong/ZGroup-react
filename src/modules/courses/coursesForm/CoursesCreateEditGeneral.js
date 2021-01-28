import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as coursesActions from '../coursesActions';
import FormInputText from '../../../components/common/FormInputText';
import * as helper from '../../../helpers/helper';
// import MemberReactSelectOption from "../../tasks/board/filter/MemberReactSelectOption";
// import MemberReactSelectValue from "../../tasks/board/filter/MemberReactSelectValue";
import {CirclePicker} from 'react-color';
// import ReactEditor from '../../../components/common/ReactEditor';
// import {linkUploadImageEditor} from '../../../constants/constants';
import Loading from "../../../components/common/Loading";
import ImageUploader from "../../../components/common/ImageUploader";


class coursesCreateEditGeneral extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            showCategoryModal: false,
            tabEditorDetail: 1,
            data: props.data
        };

        this.updateFormData = this.updateFormData.bind(this);
        this.commitCourseData = this.commitCourseData.bind(this);
        this.checkValidate = this.checkValidate.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.uploadLogo = this.uploadLogo.bind(this);
        this.uploadCover = this.uploadCover.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.updateEditor = this.updateEditor.bind(this);
    }

    componentWillMount() {
        helper.setFormValidation('#form-course-create-edit');

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingCourse != this.props.isLoadingCourse && !nextProps.isLoadingCourse) {
            this.setState({data: nextProps.data});
        }
    }

    commitCourseData() {
        if (this.checkValidate())
            this.props.coursesActions.commitCourseData(this.state.data, this.onSaveSuccess);
    }

    onSaveSuccess = () => {
        this.props.closeModalEdit();
        this.props.coursesActions.loadCourses();
    };

    updateEditor(content) {
        let data = {...this.state.data};
        data.detail = content;
        this.setState({data});
    }

    updateEditorShortDetail = (content) => {
        let data = {...this.state.data};
        data.short_detail = content;
        this.setState({data});
    };

    uploadAvatar(url) {
        let data = {...this.state.data};
        data.image_url = url;
        this.setState({data});
    }

    uploadLogo(url) {
        let data = {...this.state.data};
        data.icon_url = url;
        this.setState({data});
    }

    uploadCover(url) {
        let data = {...this.state.data};
        data.cover_url = url;
        this.setState({data});
    }

    changeColor(color) {
        let data = {...this.state.data};
        data.color = color.hex;
        this.setState({data});
    }

    updateFormData(e) {
        let feild, value;
        if (e.target) {
            feild = e.target.name;
            value = e.target.value;
        } else {
            feild = "type_id";
            value = e.id;
        }
        let data = {...this.state.data};
        data[feild] = value;
        this.setState({data});
    }

    checkValidate() {
        if ($('#form-course-create-edit').valid()) {
            return true;
        }
        return false;
    }

    onCategoryChange(obj) {

        let feild = "categories";
        let value = obj ? obj : "";

        let data = {...this.state.data};
        data[feild] = value;
        this.setState({data});
        // this.props.coursesActions.onCategoryChange(obj);
    }

    render() {
        if (this.props.isLoadingCourse) return (<div className="padding-vertical-20px"><Loading/></div>);
        console.log(this.props.types);
        return (
            <form role="form" id="form-course-create-edit" onSubmit={e => e.preventDefault()}>
                <div className="row">
                    {/*<CategoriesModal*/}
                    {/*    showModal={this.state.showCategoryModal}*/}
                    {/*    close={() => this.setState({showCategoryModal: false})}*/}
                    {/*/>*/}
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-content">
                                {

                                    <div className="form-grey">

                                        <div className="row">

                                            <div className="col-md-12">
                                                <label>Tên môn học</label>
                                                <FormInputText
                                                    label=""
                                                    required
                                                    name="name"
                                                    updateFormData={this.updateFormData}
                                                    value={this.state.data.name}
                                                /></div>

                                            {/*<div className="col-md-6">*/}
                                            {/*<FormInputText*/}
                                            {/*label="Thời lượng"*/}
                                            {/*required*/}
                                            {/*type="number"*/}
                                            {/*name="duration"*/}
                                            {/*updateFormData={this.updateFormData}*/}
                                            {/*value={this.state.data.duration}*/}
                                            {/*/></div>*/}
                                            <div className="col-md-12">
                                                <label>Giá</label>
                                                <FormInputText
                                                    label=""
                                                    required
                                                    name="price"
                                                    updateFormData={this.updateFormData}
                                                    value={this.state.data.price}
                                                />
                                            </div>

                                            <div className="col-md-12">
                                                <label>Mô tả ngắn</label>
                                                <FormInputText
                                                    label=""
                                                    required
                                                    name="description"
                                                    updateFormData={this.updateFormData}
                                                    value={this.state.data.description}
                                                /></div>

                                            <div className="col-md-12">
                                                <label>Front Image</label>
                                                <FormInputText
                                                    label=""
                                                    name="front_image"
                                                    updateFormData={this.updateFormData}
                                                    value={this.state.data.front_image}
                                                /></div>
                                            <div className="col-md-12">
                                                <label>Back Image</label>
                                                <FormInputText
                                                    label=""
                                                    name="back_image"
                                                    updateFormData={this.updateFormData}
                                                    value={this.state.data.back_image}
                                                /></div>
                                            <div className="col-md-6">
                                                <label>Link tải phần mềm trên Windows</label>
                                                <FormInputText
                                                    label=""
                                                    name="linkwindow"
                                                    updateFormData={this.updateFormData}
                                                    value={this.state.data.linkwindow}
                                                /></div>
                                            <div className="col-md-6">
                                                <label>Link hướng dẫn trên Windows</label>
                                                <FormInputText
                                                    label=""
                                                    name="window_how_install"
                                                    updateFormData={this.updateFormData}
                                                    value={this.state.data.window_how_install}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Link tải phần mềm trên Mac</label>
                                                <FormInputText
                                                    label=""
                                                    name="linkmac"
                                                    updateFormData={this.updateFormData}
                                                    value={this.state.data.linkmac}
                                                /></div>
                                            <div className="col-md-6">
                                                <label>Link hướng dẫn trên Mac</label>
                                                <FormInputText
                                                    label=""
                                                    name="mac_how_install"
                                                    updateFormData={this.updateFormData}
                                                    value={this.state.data.mac_how_install}
                                                />
                                            </div>
                                            {/*<div className="col-md-6">*/}
                                            {/*    <label>*/}
                                            {/*        Category*/}
                                            {/*    </label>*/}
                                            {/*    <div style={{display: "flex", alignItems: "center"}}>*/}
                                            {/*        <div style={{width: "100%"}}*/}
                                            {/*        >*/}
                                            {/*            <ReactSelect*/}
                                            {/*                placeholder="Nhập nhãn"*/}
                                            {/*                value={this.state.data.categories}*/}
                                            {/*                name="categories"*/}
                                            {/*                // valueComponent={MemberReactSelectValue}*/}
                                            {/*                // optionComponent={MemberReactSelectOption}*/}
                                            {/*                options={this.props.categories}*/}
                                            {/*                onChange={this.onCategoryChange}*/}
                                            {/*            /></div>*/}
                                            {/*        <TooltipButton text="Thêm category" placement="top">*/}
                                            {/*            <button onClick={() => this.setState({showCategoryModal: true})}*/}
                                            {/*                    className="btn btn-rose btn-round btn-xs button-add none-margin">*/}
                                            {/*                <strong>+</strong>*/}
                                            {/*            </button>*/}
                                            {/*        </TooltipButton>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            {/*<div className="col-md-6">*/}
                                            {/*    <label>*/}
                                            {/*        Hình thức*/}
                                            {/*    </label>*/}
                                            {/*    <ReactSelect*/}
                                            {/*        name="type_id"*/}
                                            {/*        options={this.props.types}*/}
                                            {/*        onChange={this.updateFormData}*/}
                                            {/*        value={this.state.data.type_id || ""}*/}
                                            {/*        defaultMessage="Tuỳ chọn"*/}
                                            {/*    />*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>

                                }
                            </div>
                        </div>
                        <div className="panel panel-default custom-expand">
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
                                <div className="panel-body form-grey" style={{paddingLeft: 20, paddingRight: 20}}>
                                    <div>
                                        <h4 className="card-title"><strong>Chi tiết khoá học</strong>
                                        </h4>
                                        {this.props.isLoading ? <Loading/> :
                                            <div className="form-group text-area-grey">
                                                {/*{this.state.tabEditorDetail == 2 ?*/}
                                                <div>
                                                    <textarea
                                                        maxLength="10000000"
                                                        type="text"
                                                        rows={20}
                                                        className="form-control"
                                                        placeholder="Nhập chi tiết khóa học"
                                                        value={
                                                            this.state.data.detail ? this.state.data.detail : ""
                                                        }
                                                        name="detail"
                                                        onChange={(e) => {
                                                            this.updateEditor(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                        }
                                    </div>
                                    <div className="">
                                        <h4 className="card-title"><strong>Chi tiết khác</strong>
                                        </h4>
                                        {this.props.isLoading ? <Loading/> :
                                            <div className="form-group text-area-grey">
                                                {/*{this.state.tabEditorShortDetail == 2 ?*/}
                                                <div>
                                                    <textarea
                                                        type="text"
                                                        rows={20}
                                                        className="form-control"
                                                        placeholder="Nhập chi tiết khác"
                                                        value={
                                                            this.state.data.short_detail ? this.state.data.short_detail : ""
                                                        }
                                                        name="short_detail"
                                                        onChange={(e) => {
                                                            this.updateEditorShortDetail(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-content">
                                <ImageUploader
                                    handleFileUpload={this.uploadLogo}
                                    tooltipText="Chọn ảnh icon"
                                    image_url={this.state.data.icon_url}
                                    image_size={2}
                                />

                                <ImageUploader
                                    handleFileUpload={this.uploadAvatar}
                                    tooltipText="Chọn ảnh đại diện"
                                    image_url={this.state.data.image_url}
                                    image_size={2}
                                />

                                <ImageUploader
                                    handleFileUpload={this.uploadCover}
                                    tooltipText="Chọn ảnh cover"
                                    image_url={this.state.data.cover_url}
                                    image_size={2}
                                />


                                <div className="card-content">
                                    <div className="tab-content"><h4 className="card-title"><strong>Chọn màu</strong>
                                    </h4></div>
                                    <br/>
                                    <CirclePicker width="100%"
                                                  color={this.state.data.color || ''}
                                                  onChangeComplete={this.changeColor}
                                    />
                                </div>
                                <div className="flex flex-end">
                                    {this.props.isCommitting ?
                                        <button className="btn btn-success disabled" type="button">
                                            <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                        </button>
                                        :


                                        <button
                                            className="btn btn-fill btn-success"
                                            type="button"
                                            onClick={this.commitCourseData}
                                        > Lưu </button>

                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    {/*<div className="">*/}
                    {/*<div className="card">*/}
                    {/*<div className="card-content">*/}
                    {/*<div className="tab-content">*/}
                    {/*<h4 className="card-title"><strong>Chi tiết khoá học</strong>*/}
                    {/*</h4><br/>*/}
                    {/*{this.props.isLoading ? <Loading/> :*/}
                    {/*<ReactEditor*/}
                    {/*urlPost={linkUploadImageEditor()}*/}
                    {/*fileField="image"*/}
                    {/*name="detail"*/}
                    {/*updateEditor={this.updateEditor}*/}
                    {/*value={this.state.data.detail ? `<div>${this.state.data.detail}</div>` : ""}*/}
                    {/*/>*/}
                    {/*}*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                </div>
            </form>
        );
    }

}


coursesCreateEditGeneral.propTypes = {
    isLoadingCourse: PropTypes.bool.isRequired,
    data: PropTypes.object,
    isUpdatingAvatar: PropTypes.bool,
    updateAvatarError: PropTypes.bool,
    isUpdatingLogo: PropTypes.bool,
    updateLogoError: PropTypes.bool,
    isUpdatingCover: PropTypes.bool,
    updateCoverError: PropTypes.bool,
    isCommitting: PropTypes.bool,
    commitSuccess: PropTypes.bool,
    updateData: PropTypes.func,
    closeModalEdit: PropTypes.func,
    coursesActions: PropTypes.object.isRequired,
    types: PropTypes.array,
    categories: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        isLoadingCourse: state.courses.isLoadingCourse,
        data: state.courses.data,
        isUpdatingAvatar: state.courses.isUpdatingAvatar,
        updateAvatarError: state.courses.updateAvatarError,
        isUpdatingLogo: state.courses.isUpdatingLogo,
        updateLogoError: state.courses.updateLogoError,
        isUpdatingCover: state.courses.isUpdatingCover,
        updateCoverError: state.courses.updateCoverError,
        isCommitting: state.courses.isCommitting,
        commitSuccess: state.courses.commitSuccess,
        types: state.courses.types,
        categories: state.courses.categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps,
    mapDispatchToProps)(coursesCreateEditGeneral);

