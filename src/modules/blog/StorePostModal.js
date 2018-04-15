/**
 * Created by phanmduong on 8/22/17.
 */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import StorePostComponent from "./StorePostComponent";
import * as blogActions from "./blogActions";
import * as helper from "../../helpers/helper";

class StorePostModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormPostData = this.updateFormPostData.bind(this);
        this.updateEditor = this.updateEditor.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.savePost = this.savePost.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.createLanguage = this.createLanguage.bind(this);
        this.updateFormCategory = this.updateFormCategory.bind(this);
        this.updateFormSelect = this.updateFormSelect.bind(this);
        this.updateFormLanguage = this.updateFormLanguage.bind(this);
        this.updateLanguage = this.updateLanguage.bind(this);
        this.openModal = this.openModal.bind(this);
        this.preSavePost = this.preSavePost.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentWillMount() {
        this.props.blogActions.resetForm();
        if (this.props.isEdit) {
            this.props.blogActions.getPost(this.props.postId);
        }
        this.props.blogActions.loadLanguages();
        this.loadCategories();
    }

    loadCategories() {
        this.props.blogActions.loadCategories();
    }

    updateFormData(field, value) {
        let data = { ...this.props.post };
        data[field] = value;

        this.props.blogActions.updateFormPost(data);
    }

    updateFormSelect(e) {
        console.log(e,"ssllllllllllllllllllll");
        // const field = "category";
        const field = "categories";
        let data = { ...this.props.post };
        data[field] = e;
        // data[field] = e.value;
        this.props.blogActions.updateFormPost(data);
    }
    updateLanguage(e) {
        // const field = "category";
        const field = "language";
        let data = { ...this.props.post };
        data[field] = e;
        this.props.blogActions.updateFormPost(data);
    }
    updateFormPostData(event) {
        const field = event.target.name;
        let data = { ...this.props.post };
        if (event.target.type === "checkbox") {
            data[field] = event.target.checked;
        } else {
            data[field] = event.target.value;
        }
        this.props.blogActions.updateFormPost(data);
    }

    updateFormCategory(event) {
        const field = event.target.name;
        let data = { ...this.props.category };
        if (event.target.type === "checkbox") {
            data[field] = event.target.checked;
        } else {
            data[field] = event.target.value;
        }
        this.props.blogActions.updateFormCategory(data);
    }

    updateFormLanguage(event){
        const  field = event.target.name;
        let data = {...this.props.language};
        data[field] = event.target.value;
        this.props.blogActions.updateFormLanguage(data);
    }

    openModal() {
        let data = { ...this.props.category };
        data.name = "";
        this.props.blogActions.updateFormCategory(data);
    }

    updateEditor(value) {
        let data = { ...this.props.post };
        data.content = value;
        this.props.blogActions.updateFormPost(data);
    }

    handleFileUpload(event) {
        let file = event.target.files[0];
        this.props.blogActions.uploadImage(file);
    }

    savePost() {
        let post = { ...this.props.post };
        post.tags = $("#tags").val();
        this.props.blogActions.updateFormPost(post);
        if ($("#form-post").valid()) {
            if (helper.isEmptyInput(post.imageUrl)) {
                helper.showTypeNotification(
                    "Vui lòng chọn ảnh đại diện",
                    "warning",
                );
                return;
            }
            this.props.blogActions.savePostBlog(post, this.props.closeModal);
        } else {
            helper.showErrorNotification("Bạn cần nhập đủ tất cả các trường");
        }
    }

    preSavePost(preview = false) {
        let post = { ...this.props.post };
        post.tags = $("#tags").val();
        this.props.blogActions.updateFormPost(post);
        if ($("#form-post").valid()) {
            if (helper.isEmptyInput(post.imageUrl)) {
                helper.showTypeNotification(
                    "Vui lòng chọn ảnh đại diện",
                    "warning",
                );
                return;
            }
            this.props.blogActions.preSavePostBlog(post, preview);
        }
    }

    createCategory() {
        if ($("#form-category").valid()) {
            this.props.blogActions.createCategory(this.props.category);
        }
    }
    createLanguage(closeAddLanguageModal) {
        if ($("#form-language").valid()) {
            this.props.blogActions.createLanguage(this.props.language,closeAddLanguageModal);
        }
    }

    render() {
        let categories =
            this.props.categories ? this.props.categories : [];
        
        return (
            <StorePostComponent
                {...this.props}
                updateFormPostData={this.updateFormPostData}
                updateFormCategory={this.updateFormCategory}
                updateEditor={this.updateEditor}
                handleFileUpload={this.handleFileUpload}
                savePost={this.savePost}
                createCategory={this.createCategory}
                createLanguage={this.createLanguage}
                openModal={this.openModal}
                updateFormData={this.updateFormData}
                updateLanguage={this.updateLanguage}
                preSavePost={this.preSavePost}
                categories={categories}
                closeModal={this.props.closeModal}
                updateFormSelect={this.updateFormSelect}
                updateFormLanguage = {this.updateFormLanguage}
                // resetCategory={this.resetCategory}
            />
        );
    }
}

StorePostModal.propTypes = {
    post: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    blogActions: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    categoriesList: PropTypes.array.isRequired,
    isLoadingPost: PropTypes.bool.isRequired,
    isLoadingLanguages: PropTypes.bool.isRequired,
    isCreatingLanguage: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
    postId: PropTypes.number,
    closeModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        post: state.blog.post,
        categories: state.blog.categories.categories,
        category: state.blog.category,
        language: state.blog.language,
        categoriesList: state.blog.categoriesList,
        languages: state.blog.languages,
        isLoadingPost: state.blog.isLoadingPost,
        isLoadingLanguages: state.blog.isLoadingLanguages,
        isCreatingLanguage: state.blog.isCreatingLanguage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogActions: bindActionCreators(blogActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StorePostModal);
