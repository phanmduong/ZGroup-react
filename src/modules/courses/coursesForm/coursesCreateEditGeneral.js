import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as coursesActions from '../coursesActions';
import FormInputText from '../../../components/common/FormInputText';
import * as helper from '../../../helpers/helper';
// import MemberReactSelectOption from "../../tasks/board/filter/MemberReactSelectOption";
// import MemberReactSelectValue from "../../tasks/board/filter/MemberReactSelectValue";
import ReactSelect from 'react-select';
import {CirclePicker} from 'react-color';
// import ReactEditor from '../../../components/common/ReactEditor';
// import {linkUploadImageEditor} from '../../../constants/constants';
import Loading from "../../../components/common/Loading";
import ImageUploader from "../../../components/common/ImageUploader";
import TooltipButton from "../../../components/common/TooltipButton";
import CategoriesModal from "./CategoriesModal";


class coursesCreateEditGeneral extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            showCategoryModal: false,
            tabEditorDetail: 1
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

        //console.log('child general will mount',this.props);
    }

    commitCourseData() {
        if (this.checkValidate())
            this.props.coursesActions.commitCourseData(this.props.data);

    }

    updateEditor(content) {
        let data = {...this.props.data};
        data.detail = content;
        this.props.coursesActions.updateData(data);
    }

    updateEditorShortDetail = (content) => {
        let data = {...this.props.data};
        data.short_detail = content;
        this.props.coursesActions.updateData(data);
    }

    uploadAvatar(url) {
        this.props.coursesActions.uploadAvatar(url);
    }

    uploadLogo(url) {
        this.props.coursesActions.uploadLogo(url);
    }

    uploadCover(url) {
        this.props.coursesActions.uploadCover(url);
    }

    changeColor(color) {
        let data = {...this.props.data};
        data.color = color.hex;
        this.props.coursesActions.updateData(data);
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
        let data = {...this.props.data};
        data[feild] = value;
        this.props.coursesActions.updateData(data);
    }

    checkValidate() {
        if ($('#form-course-create-edit').valid()) {

            if (helper.isEmptyInput(this.props.data.icon_url)) {
                helper.showTypeNotification('Vui lòng chọn ảnh icon', 'warning');
                return false;
            }
            if (helper.isEmptyInput(this.props.data.image_url)) {
                helper.showTypeNotification('Vui lòng chọn ảnh đại điện', 'warning');
                return false;
            }
            if (helper.isEmptyInput(this.props.data.cover_url)) {
                helper.showTypeNotification('Vui lòng chọn cover', 'warning');
                return false;
            }
            return true;
        }
        return false;
    }

    onCategoryChange(obj) {

        let feild = "categories";
        let value = obj ? obj : "";

        let data = {...this.props.data};
        data[feild] = value;
        this.props.coursesActions.updateData(data);
        // this.props.coursesActions.onCategoryChange(obj);
    }

    render() {
        return (
            <div>
                <CategoriesModal
                    showModal={this.state.showCategoryModal}
                    close={() => this.setState({showCategoryModal: false})}
                />
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-content">
                            {

                                <div>

                                    <div className="row">

                                        <div className="col-md-12">
                                            <FormInputText
                                                label="Tên môn học"
                                                required
                                                name="name"
                                                updateFormData={this.updateFormData}
                                                value={this.props.data.name}
                                            /></div>

                                        {/*<div className="col-md-6">*/}
                                        {/*<FormInputText*/}
                                        {/*label="Thời lượng"*/}
                                        {/*required*/}
                                        {/*type="number"*/}
                                        {/*name="duration"*/}
                                        {/*updateFormData={this.updateFormData}*/}
                                        {/*value={this.props.data.duration}*/}
                                        {/*/></div>*/}
                                        <div className="col-md-12">
                                            <FormInputText
                                                label="Giá"
                                                required
                                                name="price"
                                                updateFormData={this.updateFormData}
                                                value={this.props.data.price}
                                            />
                                        </div>

                                        <div className="col-md-12">
                                            <FormInputText
                                                label="Mô tả ngắn"
                                                required
                                                name="description"
                                                updateFormData={this.updateFormData}
                                                value={this.props.data.description}
                                            /></div>
                                        <div className="col-md-12">
                                            <FormInputText
                                                label="Landing Page URL"
                                                name="landingpage_url"
                                                updateFormData={this.updateFormData}
                                                value={this.props.data.landingpage_url}
                                            /></div>
                                        <div className="col-md-12">
                                            <FormInputText
                                                label="Front Image"
                                                name="front_image"
                                                updateFormData={this.updateFormData}
                                                value={this.props.data.front_image}
                                            /></div>
                                        <div className="col-md-12">
                                            <FormInputText
                                                label="Back Image"
                                                name="back_image"
                                                updateFormData={this.updateFormData}
                                                value={this.props.data.back_image}
                                            /></div>
                                        <div className="col-md-6">
                                            <FormInputText
                                                label="Link tải phần mềm trên Windows"
                                                name="linkwindow"
                                                updateFormData={this.updateFormData}
                                                value={this.props.data.linkwindow}
                                            /></div>
                                        <div className="col-md-6">
                                            <FormInputText
                                                label="Link hướng dẫn trên Windows"
                                                name="window_how_install"
                                                updateFormData={this.updateFormData}
                                                value={this.props.data.window_how_install}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormInputText
                                                label="Link tải phần mềm trên Mac"
                                                name="linkmac"
                                                updateFormData={this.updateFormData}
                                                value={this.props.data.linkmac}
                                            /></div>
                                        <div className="col-md-6">
                                            <FormInputText
                                                label="Link hướng dẫn trên Mac"
                                                name="mac_how_install"
                                                updateFormData={this.updateFormData}
                                                value={this.props.data.mac_how_install}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>
                                                Category
                                            </label>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <div style={{width: "100%"}}
                                                >
                                                    <ReactSelect
                                                        placeholder="Nhập nhãn"
                                                        value={this.props.data.categories}
                                                        name="categories"
                                                        // valueComponent={MemberReactSelectValue}
                                                        // optionComponent={MemberReactSelectOption}
                                                        options={this.props.categories}
                                                        onChange={this.onCategoryChange}
                                                    /></div>
                                                <TooltipButton text="Thêm category" placement="top">
                                                    <button onClick={() => this.setState({showCategoryModal: true})}
                                                            className="btn btn-rose btn-round btn-xs button-add none-margin">
                                                        <strong>+</strong>
                                                    </button>
                                                </TooltipButton>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label>
                                                Hình thức
                                            </label>
                                            <ReactSelect
                                                name="type_id"
                                                className=""
                                                options={this.props.types}
                                                onChange={this.updateFormData}
                                                value={this.props.data.type_id || ""}
                                                defaultMessage="Tuỳ chọn"
                                            />
                                        </div>

                                    </div>

                                    {this.props.isCommitting ?
                                        <button className="btn btn-rose btn-fill disabled" type="button">
                                            <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                        </button>
                                        :
                                        <button
                                            className="btn btn-fill btn-rose"
                                            type="button"
                                            style={{zIndex: 0}}
                                            onClick={this.commitCourseData}
                                        > Lưu </button>
                                    }
                                </div>

                            }

                        </div>
                    </div>
                    <div className="">
                        <div className="card">
                            <div className="card-content">
                                <div className="tab-content">
                                    <h4 className="card-title"><strong>Chi tiết khoá học</strong>
                                    </h4>
                                    {/*<ul className="nav nav-pills nav-pills-rose" data-tabs="tabs">*/}
                                    {/*<li className={this.state.tabEditorDetail == 1 ? 'active' : ''}*/}
                                    {/*onClick={() => {*/}
                                    {/*this.setState({tabEditorDetail: 1});*/}
                                    {/*}}*/}
                                    {/*><a>Editor</a>*/}
                                    {/*<div className="ripple-container"/>*/}
                                    {/*</li>*/}
                                    {/*<li className={this.state.tabEditorDetail == 2 ? 'active' : ''}*/}
                                    {/*onClick={() => {*/}
                                    {/*this.setState({tabEditorDetail: 2});*/}
                                    {/*}}*/}
                                    {/*><a>HTML</a>*/}
                                    {/*<div className="ripple-container"/>*/}
                                    {/*</li>*/}
                                    {/*</ul>*/}
                                    <br/>
                                    {this.props.isLoading ? <Loading/> :
                                        <div>
                                            {/*{this.state.tabEditorDetail == 2 ?*/}
                                            <div>
                                                    <textarea
                                                        type="text"
                                                        rows={20}
                                                        className="form-control"
                                                        value={
                                                            this.props.data.detail ? this.props.data.detail : ""
                                                        }
                                                        name="detail"
                                                        onChange={(e) => {
                                                            this.updateEditor(e.target.value);
                                                        }}
                                                    />
                                            </div>
                                            {/*:*/}
                                            {/*< ReactEditor*/}
                                            {/*urlPost={linkUploadImageEditor()}*/}
                                            {/*fileField="image"*/}
                                            {/*name="detail"*/}
                                            {/*updateEditor={this.updateEditor}*/}
                                            {/*value={this.props.data.detail ? `<div>${this.props.data.detail}</div>` : ""}*/}
                                            {/*/>*/}
                                            {/*}*/}
                                        </div>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="card">
                            <div className="card-content">
                                <div className="tab-content">
                                    <h4 className="card-title"><strong>Chi tiết khác</strong>
                                    </h4>
                                    {/*<ul className="nav nav-pills nav-pills-rose" data-tabs="tabs">*/}
                                    {/*<li className={this.state.tabEditorShortDetail == 1 ? 'active' : ''}*/}
                                    {/*onClick={() => {*/}
                                    {/*this.setState({tabEditorShortDetail: 1});*/}
                                    {/*}}*/}
                                    {/*><a>Editor</a>*/}
                                    {/*<div className="ripple-container"/>*/}
                                    {/*</li>*/}
                                    {/*<li className={this.state.tabEditorShortDetail == 2 ? 'active' : ''}*/}
                                    {/*onClick={() => {*/}
                                    {/*this.setState({tabEditorShortDetail: 2});*/}
                                    {/*}}*/}
                                    {/*><a>HTML</a>*/}
                                    {/*<div className="ripple-container"/>*/}
                                    {/*</li>*/}
                                    {/*</ul>*/}
                                    <br/>
                                    {this.props.isLoading ? <Loading/> :
                                        <div>
                                            {/*{this.state.tabEditorShortDetail == 2 ?*/}
                                            <div>
                                                    <textarea
                                                        type="text"
                                                        rows={20}
                                                        className="form-control"
                                                        value={
                                                            this.props.data.short_detail ? this.props.data.short_detail : ""
                                                        }
                                                        name="short_detail"
                                                        onChange={(e) => {
                                                            this.updateEditorShortDetail(e.target.value);
                                                        }}
                                                    />
                                            </div>
                                            {/*:*/}
                                            {/*< ReactEditor*/}
                                            {/*urlPost={linkUploadImageEditor()}*/}
                                            {/*fileField="image"*/}
                                            {/*name="short_detail"*/}
                                            {/*updateEditor={this.updateEditorShortDetail}*/}
                                            {/*value={this.props.data.short_detail ? `<div>${this.props.data.short_detail}</div>` : ""}*/}
                                            {/*/>*/}
                                            {/*}*/}
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
                                image_url={this.props.data.icon_url}
                                image_size={2}
                            />

                            <ImageUploader
                                handleFileUpload={this.uploadAvatar}
                                tooltipText="Chọn ảnh đại diện"
                                image_url={this.props.data.image_url}
                                image_size={2}
                            />

                            <ImageUploader
                                handleFileUpload={this.uploadCover}
                                tooltipText="Chọn ảnh cover"
                                image_url={this.props.data.cover_url}
                                image_size={2}
                            />


                            <div className="card-content">
                                <div className="tab-content"><h4 className="card-title"><strong>Chọn màu</strong>
                                </h4></div>
                                <br/>
                                <CirclePicker width="100%"
                                              color={this.props.data.color}
                                              onChangeComplete={this.changeColor}
                                />
                            </div>

                            {this.props.isCommitting ?
                                <button className="btn btn-rose  disabled" type="button">
                                    <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                </button>
                                :


                                <button
                                    className="btn btn-fill btn-rose"
                                    type="button"
                                    onClick={this.commitCourseData}
                                > Lưu </button>

                            }


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
                {/*value={this.props.data.detail ? `<div>${this.props.data.detail}</div>` : ""}*/}
                {/*/>*/}
                {/*}*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
            </div>

        );
    }

}


coursesCreateEditGeneral.propTypes = {
    isLoading: PropTypes.bool.isRequired,
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
    coursesActions: PropTypes.object.isRequired,
    types: PropTypes.array,
    categories: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        isLoading: state.courses.isLoading,
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

