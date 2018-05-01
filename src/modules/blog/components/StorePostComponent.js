/**
 * Created by Kiyoshitaro on 15/04/2018.
 */
import React from "react";
import PropTypes from "prop-types";

import FormInputText from "../../../components/common/FormInputText";
import Loading from "../../../components/common/Loading";
import { linkUploadImageEditor } from "../../../constants/constants";
import ReactEditor from "../../../components/common/ReactEditor";
import * as helper from "../../../helpers/helper";
import { NO_IMAGE } from "../../../constants/env";
import TooltipButton from "../../../components/common/TooltipButton";
import Buttons from "../../event/components/Buttons";
import ReactSelect from "react-select";

function addCategories(categories) {
    return categories.map(item => {
        return { value: item.id, label: item.name };
    });
}

function addLanguage(languages) {
    return languages.map(item => {
        return { value: item.id, label: item.name };
    });
}




class StorePostComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.generateFromTitle = this.generateFromTitle.bind(this);
        this.invalid = this.invalid.bind(this);
    }

    componentDidMount() {
        helper.setFormValidation("#form-post");
        helper.setFormValidation("#form-category");
    }

    componentDidUpdate() {
        $("#tags").tagsinput();
    }

    generateFromTitle() {
        if (this.props.post.title === "") {
            helper.showErrorMessage("Lỗi", "Bài viết này chưa có Tiêu Đề");
        } else {
            const slug = helper.changeToSlug(this.props.post.title);
            this.props.generateFromTitle("slug", slug);
        }

    }



    invalid() {
        const { title, slug, imageUrl } = this.props.post;
        return !title || !slug || !imageUrl;
    }

    render() {
        // let post = this.props.post || {}
        let {
            title,
            description,
            content,
            imageUrl,
            tags,
            categories,
            isUpdatingImage,
            slug,
            meta_title,
            keyword,
            meta_description,
            language_id,
            kind,
        } = this.props.post;

        return (
            <div>
                <form role="form" id="form-post">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                {this.props.isLoadingPost
                                    ? (
                                        <Loading />
                                    ) : (
                                        <div className="row">
                                            <label className="label-control">
                                                Ảnh đại diện
                                            </label>
                                            {isUpdatingImage ? (
                                                <Loading />
                                            ) : (
                                                    <TooltipButton
                                                        text="Chọn ảnh đại diện"
                                                        placement="top">
                                                        <a
                                                            type="button"
                                                            style={{
                                                                width: "100%",
                                                                marginBottom: "10px",
                                                                textAlign: "center",
                                                                verticalAlign: "middle",
                                                                border: "0 none",
                                                                display: "inline-block",
                                                            }}>
                                                            <img
                                                                src={
                                                                    helper.isEmptyInput(
                                                                        imageUrl,
                                                                    )
                                                                        ? NO_IMAGE
                                                                        : imageUrl
                                                                }
                                                                style={{
                                                                    lineHeight: "164px",
                                                                    height: "auto",
                                                                    width: "100%",
                                                                    display: "block",
                                                                    backgroundSize: "cover",
                                                                    backgroundPosition: "center",
                                                                    boxShadow:
                                                                        " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                                                    borderRadius: "10px",
                                                                }} />
                                                            <input
                                                                type="file"
                                                                accept=".jpg,.png,.gif"
                                                                onChange={
                                                                    this.props.handleFileUpload}
                                                                style={{
                                                                    cursor: "pointer",
                                                                    opacity: "0.0",
                                                                    position: "absolute",
                                                                    top: 0,
                                                                    left: 0,
                                                                    bottom: 0,
                                                                    right: 0,
                                                                    width: "100%",
                                                                    height: "100%",
                                                                }} />
                                                        </a>
                                                    </TooltipButton>
                                                )}

                                            <FormInputText
                                                label="Tên bài viết"
                                                required
                                                name="title"
                                                updateFormData={this.props.updateFormPostData}
                                                value={title}
                                            />
                                            <label className="label-control">
                                                Loại bài viết
                                            </label>
                                            <div className="row">
                                                <div
                                                    className="col-md-12"
                                                    style={{ display: "flex" }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "-webkit-fill-available",
                                                            marginRight: 10,
                                                        }}>
                                                        <ReactSelect
                                                            value={kind}
                                                            options={this.props.allBlogKinds}
                                                            onChange={this.props.updateKind}
                                                            placeholder="Chọn loại bài viết"
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                            <br />
                                            <label className="label-control">
                                                Ngôn ngữ
                                            </label>
                                            <div className="row">
                                                <div className="col-md-12"
                                                    style={{ display: "flex" }}>
                                                    <div
                                                        style={{
                                                            width: "-webkit-fill-available",
                                                            marginRight: 10,
                                                        }}>
                                                        <ReactSelect
                                                            value={language_id}
                                                            options={addLanguage(this.props.languages)}
                                                            onChange={this.props.updateLanguage}
                                                            placeholder="Chọn ngôn ngữ"
                                                        />
                                                    </div>
                                                    <div
                                                        style={{ marginTop: -6, }}>

                                                        <TooltipButton
                                                            placement="top"
                                                            text="Thêm ngôn ngữ">
                                                            <a
                                                                className="btn btn-rose btn-sm"
                                                                onClick={() => {
                                                                    this.props.openAddLanguageModal();
                                                                }}>
                                                                <i className="material-icons">control_point</i>
                                                            </a>
                                                        </TooltipButton>
                                                    </div>
                                                </div>
                                            </div>


                                            {/*<div*/}
                                            {/*id="mini-editor"*/}
                                            {/*>*/}
                                            {/*</div>*/}
                                            <br />
                                            <FormInputText
                                                height="100%"
                                                label="Slug"
                                                required
                                                name="slug"
                                                updateFormData={this.props.updateFormPostData}
                                                value={slug}>
                                                <a
                                                    style={{ color: "blue" }}
                                                    onClick={this.generateFromTitle}>
                                                    Tự động tạo từ tiêu đề
                                                </a>
                                            </FormInputText>
                                            <br />
                                            <label className="label-control">
                                                Nhóm bài viết
                                            </label>
                                            <div className="row">
                                                <div
                                                    className="col-md-12"
                                                    style={{ display: "flex" }}>
                                                    <div
                                                        style={{
                                                            width: "-webkit-fill-available",
                                                            marginRight: 10,
                                                        }}>
                                                        <ReactSelect
                                                            multi={true}
                                                            value={categories}
                                                            options={addCategories(this.props.categories)}
                                                            onChange={this.props.updateCategory}
                                                            placeholder="Chọn nhóm" />
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginTop: -6,
                                                        }}>
                                                        <TooltipButton
                                                            placement="top"
                                                            text="Thêm nhóm bài viết">
                                                            <a className="btn btn-rose btn-sm"
                                                                onClick={() => { this.props.openAddCategoryModal(); }}>
                                                                <i className="material-icons">control_point</i>
                                                            </a>
                                                        </TooltipButton>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="form-group">
                                                <label className="control-label">
                                                    Mô tả ngắn
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    name="description"
                                                    rows="3"
                                                    value={description}
                                                    onChange={this.props.updateFormPostData} />
                                            </div>

                                            <div className="form-group">
                                                <label className="control-label">
                                                    Meta title
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    name="meta_title"
                                                    rows="3"
                                                    value={meta_title}
                                                    onChange={this.props.updateFormPostData} />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">
                                                    Meta description
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    name="meta_description"
                                                    rows="3"
                                                    value={meta_description}
                                                    onChange={this.props.updateFormPostData} />
                                            </div>

                                            <div className="form-group">
                                                <label className="control-label">
                                                    Keywords
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    name="keyword"
                                                    rows="3"
                                                    value={keyword}
                                                    onChange={this.props.updateFormPostData}
                                                />
                                            </div>

                                            <input
                                                type="text"
                                                className="tagsinput"
                                                data-role="tagsinput"
                                                data-color="rose"
                                                value={tags}
                                                name="tags"
                                                placeholder="Tags"
                                                id="tags"
                                            />
                                            {/*????????????????????????/*/}



                                        </div>
                                    )}
                                {/*????????????????????????/*/}


                                <div className="row">
                                    <label className="control-label">
                                        Nội dung
                                    </label>
                                    <star style={{ color: "red" }}>*</star>
                                    {this.props.isLoadingPost ? (
                                        <Loading />
                                    ) : (
                                            <div>
                                                <ReactEditor
                                                    urlPost={linkUploadImageEditor()}
                                                    fileField="image"
                                                    scrollerId="#store-post-modal"
                                                    updateEditor={this.props.updateEditor}
                                                    value={content} />

                                                <div className="row">
                                                    {/*????????????????????????/*/}
                                                    <Buttons
                                                        isSaving={
                                                            this.props.post
                                                                .isSaving ||
                                                            this.props.post
                                                                .isPreSaving
                                                        }
                                                        save={() =>
                                                            this.props.preSavePost(
                                                                false,
                                                            )
                                                        }
                                                        preSave={() =>
                                                            this.props.preSavePost(
                                                                true,
                                                            )
                                                        }
                                                        publish={
                                                            this.props.savePost
                                                        }
                                                        style={{
                                                            width:
                                                                "calc(100% + 48px)",
                                                            marginLeft: "-9px",
                                                        }}
                                                        height={235}
                                                        close={
                                                            this.props.closePostModal
                                                        }
                                                        scrollerId="#store-post-modal"
                                                        disabled={this.invalid()}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>



            </div>
        );
    }
}

StorePostComponent.propTypes = {
    post: PropTypes.object.isRequired,
    isLoadingPost: PropTypes.bool.isRequired,
    isLoadingLanguages: PropTypes.bool.isRequired,
    handleFileUpload: PropTypes.func.isRequired,
    generateFromTitle: PropTypes.func.isRequired,
    updateFormPostData: PropTypes.func.isRequired,
    languages: PropTypes.array.isRequired,
    updateLanguage: PropTypes.func.isRequired,
    updateEditor: PropTypes.func.isRequired,
    updateKind: PropTypes.func.isRequired,
    preSavePost: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired,
    openAddLanguageModal: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isPreSaving: PropTypes.bool.isRequired,
    updateCategory: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    closePostModal: PropTypes.func.isRequired,
    openAddCategoryModal: PropTypes.func.isRequired,
    allBlogKinds: PropTypes.array.isRequired,


};

export default StorePostComponent;
