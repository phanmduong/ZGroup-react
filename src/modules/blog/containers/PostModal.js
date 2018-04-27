/**
 * Created by Kiyoshitaro on 15/04/2018.
 */
import React                from "react";
import PropTypes            from "prop-types";

import {connect}            from "react-redux";
import * as blogActions     from "../actions/blogActions";
import {bindActionCreators} from "redux";

import * as helper          from "../../../helpers/helper";
import {Modal}              from "react-bootstrap";

import StorePostComponent   from "../components/StorePostComponent";
// import AddLanguageModal     from "./AddLanguageModal";
// import AddCategoryModal     from "./AddCategoryModal";

class PostModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.closePostModal       = this.closePostModal.bind(this);
        this.handleFileUpload     = this.handleFileUpload.bind(this);
        this.updateFormPostData   = this.updateFormPostData.bind(this);
        this.generateFromTitle    = this.generateFromTitle.bind(this);
        this.updateLanguage       = this.updateLanguage.bind(this);
        this.updateEditor         = this.updateEditor.bind(this);
        this.preSavePost          = this.preSavePost.bind(this);
        this.savePost             = this.savePost.bind(this);
        this.openAddLanguageModal = this.openAddLanguageModal.bind(this);
        this.openAddCategoryModal = this.openAddCategoryModal.bind(this);
        this.updateCategory       = this.updateCategory.bind(this);
    }


    closePostModal() {
        helper.confirm("warning", "Cảnh báo",
            "Bạn có chắc muốn đóng editor? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {this.props.blogActions.closePostModal();},
        );
    }

    handleFileUpload(event) {
        let file = event.target.files[0];
        this.props.blogActions.uploadImage(file);
    }
    generateFromTitle(field, value) {
        let data = {...this.props.post};
        data[field] = value;
        this.props.blogActions.updateFormPost(data);
    }
    updateFormPostData(event) {
        const field = event.target.name;
        let data = {...this.props.post};
        if (event.target.type === "checkbox") {
            data[field] = event.target.checked;
        } else {
            data[field] = event.target.value;
        }
        this.props.blogActions.updateFormPost(data);
    }
    updateCategory(e) {
        let data = {...this.props.post};
        data["categories"] = e;
        this.props.blogActions.updateFormPost(data);
    }
    updateLanguage(e) {
        let data = {...this.props.post};
        data["language_id"] = e.value;
        this.props.blogActions.updateFormPost(data);
    }
    updateEditor(value) {
        let data = {...this.props.post};
        data["content"] = value;
        this.props.blogActions.updateFormPost(data);
    }


    preSavePost(preview = false) {
        let post = {...this.props.post};
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
    savePost() {
        let post = {...this.props.post};
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
            this.props.blogActions.savePostBlog(post, this.closePostModal);
        } else {
            helper.showErrorNotification("Bạn cần nhập đủ tất cả các trường");
        }
    }



    openAddLanguageModal() {
        this.props.blogActions.openAddLanguageModal();
    }
    openAddCategoryModal() {
        this.props.blogActions.openAddCategoryModal();
    }


    render() {
        return (
            <div>
                <Modal
                    id="store-post-modal"
                    show={this.props.isOpenPostModal}
                    bsStyle="primary"
                    onHide={this.closePostModal}
                    animation={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <strong>Bài viết</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <StorePostComponent
                            {...this.props}
                            handleFileUpload={this.handleFileUpload}
                            updateFormPostData={this.updateFormPostData}
                            generateFromTitle={this.generateFromTitle}
                            updateLanguage={this.updateLanguage}
                            updateEditor={this.updateEditor}
                            preSavePost={this.preSavePost}
                            savePost={this.savePost}
                            openAddLanguageModal={this.openAddLanguageModal}
                            categories={this.props.categories}
                            closePostModal={this.closePostModal}
                            openAddCategoryModal={this.openAddCategoryModal}
                            updateCategory={this.updateCategory}
                        />
                    </Modal.Body>
                </Modal>





            </div>

        );
    }
}

PostModal.propTypes = {
    post:               PropTypes.object.isRequired,
    isOpenPostModal:    PropTypes.bool.isRequired,
    isLoadingLanguages: PropTypes.bool.isRequired,
    languages:          PropTypes.array.isRequired,
    blogActions:        PropTypes.object.isRequired,
    postId:             PropTypes.number.isRequired,
    isLoadingPost:      PropTypes.bool.isRequired,
    language:           PropTypes.object.isRequired,
    isCreatingLanguage: PropTypes.bool.isRequired,
    categories:         PropTypes.array.isRequired,
    closePostModal:     PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        post:               state.blog.post,
        language:           state.blog.language,
        isLoadingLanguages: state.blog.isLoadingLanguages,
        isOpenPostModal:    state.blog.isOpenPostModal,
        languages:          state.blog.languages,
        isLoadingPost:      state.blog.isLoadingPost,
        isCreatingLanguage: state.blog.isCreatingLanguage,
        categories:         state.blog.categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogActions: bindActionCreators(blogActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
