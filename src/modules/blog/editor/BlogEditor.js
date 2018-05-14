import React from "react";
import KeetoolEditor from "../../../components/common/editor/KeetoolEditor";
import ImageUploader from "../../../components/common/ImageUploader";
import store from "./BlogEditorStore";
import { NO_IMAGE } from "../../../constants/env";
import { observer } from "mobx-react";
import FormInputText from "../../../components/common/FormInputText";
import ReactSelect from "react-select";
import { BLOG_KINDS } from "../const";
import TooltipButton from "../../../components/common/TooltipButton";
import AddLanguageModal from "../containers/AddLanguageModal";
import AddCategoryModal from "../containers/AddCategoryModal";
import { showErrorMessage, changeToSlug, showNotification, showErrorNotification } from "../../../helpers/helper";
import PlainTextEditor from '../../../components/common/PlainTextEditor';
import TagsInput from '../../../components/common/TagsInput';
import { savePostV2 } from "../apis/blogApi";

const savePost = async (editor , status) => {
    editor.setState({
        isSavingPost: true
    });
    const res = await savePostV2(store.post, status);
    editor.setState({
        isSavingPost: false
    });
    if (res.data.status) {
        showNotification("Xuất bản bài viết thành công");            
    } else {
        showErrorNotification("Có lỗi xảy ra");            
    }
    store.post = {
        ...store.post,
        id: res.data.id
    };
    return res.data;
};

@observer
class BlogEditor extends React.Component {
    state = {
        value: "",
        isSavingPost: false
    };

    componentDidMount() {
        store.loadLanguages();
        store.loadCategories();
    }

    componentDidUpdate() {
        $("#tags").tagsinput();
    }

    publish =  () => {
        savePost(this, 1);
    };

    saveDraft = async () => {
        savePost(this, 0);
    };

    preview = async () => {
        const data = savePost(this, 3); // status == 3 mean keep the current status
        window.location.href = "/" + data.slug;

    };

    generateFromTitle = () => {
        if (store.post.title === "") {
            showErrorMessage("Lỗi", "Bài viết này chưa có Tiêu Đề");
        } else {
            const slug = changeToSlug(store.post.title);
            store.post = {
                ...store.post,
                slug
            };
        }
    };

    updatePostCategories = values => {
        const post = {
            ...store.post,
            categories: values
        };
        store.post = post;
    };

    openAddCategoryModal = () => {
        store.toggleAddCategoryModal(true);
    };

    updatePost = (field, value) => {
        const post = { ...store.post };
        post[field] = value;
        store.post = post;
    };

    openAddLanguageModal = () => {
        store.toggleAddLanguageModal(true);
    };

    renderTextFlexField = (field, label) => (
        <div className="form-group">
            <label className="control-label">
                {label}
            </label>                                
            <PlainTextEditor
                value={store.post[field] || ""}
                onChange={value => this.updatePost(field, value)}
            />
        </div>
    );

    render() {
        return (
            <div className="container-fluid">
                <AddLanguageModal />
                <AddCategoryModal />
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-content">
                            <FormInputText
                                label="Tên bài viết"
                                required
                                name="title"
                                updateFormData={e => this.updatePost("title", e.target.value)}
                                value={store.post.title}
                            />
                            <div className="form-group">
                                <label className="control-label">Loại bài viết</label>
                                <ReactSelect
                                    value={store.post.kind}
                                    options={BLOG_KINDS}
                                    onChange={e => this.updatePost("kind", e.value)}
                                    placeholder="Chọn loại bài viết"
                                />
                            </div>

                            <div className="form-group">
                                <label className="control-label" style={{ marginBottom: "10px" }}>
                                    Ngôn ngữ
                                    <TooltipButton placement="top" text="Thêm ngôn ngữ">
                                        <button
                                            onClick={this.openAddLanguageModal}
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            type="button">
                                            <strong>+</strong>
                                            <div className="ripple-container" />
                                        </button>
                                    </TooltipButton>
                                </label>
                                <ReactSelect
                                    value={store.post.language_id}
                                    options={store.getLanguages}
                                    onChange={e => this.updatePost("language_id", e.value)}
                                    placeholder="Chọn ngôn ngữ"
                                />
                            </div>

                            <FormInputText
                                height="100%"
                                label="Slug"
                                required
                                name="slug"
                                updateFormData={e => this.updatePost("slug", e.target.value)}
                                value={store.post.slug}>
                                <TooltipButton
                                    placement="top"
                                    text="Tạo từ tiêu đề bài viết">
                                    <a
                                        className="btn btn-primary btn-round btn-xs button-add none-margin"
                                        style={{
                                            position: "absolute",
                                            right: 0,
                                            top: 0
                                        }} onClick={this.generateFromTitle}>
                                        <i className="material-icons">
                                            autorenew
                                        </i>
                                    </a>
                                </TooltipButton>
                            </FormInputText>

                            <div className="form-group">
                                <label className="control-label" style={{ marginBottom: "10px" }}>
                                    Nhóm bài viết
                                    <TooltipButton placement="top" text="Thêm nhóm bài viết">
                                        <button
                                            onClick={this.openAddCategoryModal}
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            type="button">
                                            <strong>+</strong>
                                            <div className="ripple-container" />
                                        </button>
                                    </TooltipButton>
                                </label>
                                <ReactSelect
                                    value={store.post.category_id}
                                    options={store.getCategories}
                                    onChange={e => this.updatePost("category_id", e.value)}
                                    placeholder="Chọn nhóm bài viết"
                                />
                            </div>
                            
                            {this.renderTextFlexField("description", "Mô tả ngắn")}
                            {this.renderTextFlexField("meta_title", "Meta title")}
                            {this.renderTextFlexField("meta_description", "Meta description")}
                            {this.renderTextFlexField("keyword", "Keywords")}
                           
                            <TagsInput
                                id="blog-editor-tags"
                                tags={store.post.tags}
                                onChange={values => {
                                    this.updatePost("tags", values);
                                }}
                            />

                            <div className="form-group">
                                <label className="control-label" style={{ marginBottom: "10px" }}>
                                    Nội dung
                                </label>
                                <KeetoolEditor value={store.post.content} 
                                    onChange={content => this.updatePost("content", content)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-content">
                            <label>Ảnh đại diện</label>
                            <ImageUploader
                                handleFileUpload={url => this.updatePost("url", url)}
                                tooltipText="Ảnh đại diện"
                                image_url={store.post.url ? store.post.url : NO_IMAGE}
                            />
                            <div>
                                <button 
                                    disabled={this.state.isSavingPost}
                                    onClick={this.publish}
                                    className="btn btn-rose">
                                    {
                                        this.state.isSavingPost &&  <i className="fa fa-circle-o-notch fa-spin"/>
                                    } {" "}
                                    Xuất bản
                                </button>
                                <button 
                                    disabled={this.state.isSavingPost}
                                    onClick={this.saveDraft}
                                    className="btn btn-default">
                                    {
                                        this.state.isSavingPost && <i className="fa fa-circle-o-notch fa-spin"/>
                                    } {" "}
                                    Lưu nháp
                                </button>
                                <button 
                                    disabled={this.state.isSavingPost}
                                    onClick={this.preview}
                                    className="btn btn-default">
                                    {
                                        this.state.isSavingPost && <i className="fa fa-circle-o-notch fa-spin"/>
                                    } {" "}
                                    Xem trước
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogEditor;
