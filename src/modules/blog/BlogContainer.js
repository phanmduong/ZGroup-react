/**
 * Created by phanmduong on 8/22/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import BlogComponent from './BlogComponent';
import * as blogActions from './blogActions';
import * as helper from '../../helpers/helper';

class BlogContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormPostData = this.updateFormPostData.bind(this);
        this.updateEditor = this.updateEditor.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.savePost = this.savePost.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.updateFormCategory = this.updateFormCategory.bind(this);
        this.openModal = this.openModal.bind(this);
        this.preSavePost = this.preSavePost.bind(this);
    }

    componentWillMount() {
        this.loadCategories();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category.isCreating !== this.props.category.isCreating
            && !nextProps.category.isCreating && !nextProps.category.error) {
            $('#addCategoryModal').modal('hide');
        }
    }

    loadCategories() {
        this.props.blogActions.loadCategories();
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

    updateFormCategory(event) {
        const field = event.target.name;
        let data = {...this.props.category};
        if (event.target.type === "checkbox") {
            data[field] = event.target.checked;
        } else {
            data[field] = event.target.value;
        }
        this.props.blogActions.updateFormCategory(data);
    }

    openModal(){
        let data = {...this.props.category};
        data.name = '';
        this.props.blogActions.updateFormCategory(data);
    }

    updateEditor(value) {
        let data = {...this.props.post};
        data.content = value;
        this.props.blogActions.updateFormPost(data);
    }

    handleFileUpload(event) {
        let file = event.target.files[0];
        this.props.blogActions.uploadImage(file);
    }

    savePost() {
        let post = {...this.props.post};
        post.tags = $("#tags").val();
        this.props.blogActions.updateFormPost(post);
        if ($('#form-post').valid()) {
            if (helper.isEmptyInput(post.imageUrl)) {
                helper.showTypeNotification('Vui lòng chọn ảnh đại diện', 'warning');
                return;
            }
            this.props.blogActions.savePostBlog(post);
        }
    }

    preSavePost() {
        let post = {...this.props.post};
        post.tags = $("#tags").val();
        this.props.blogActions.updateFormPost(post);
        if ($('#form-post').valid()) {
            if (helper.isEmptyInput(post.imageUrl)) {
                helper.showTypeNotification('Vui lòng chọn ảnh đại diện', 'warning');
                return;
            }
            this.props.blogActions.preSavePostBlog(post);
        }
    }

    createCategory() {
        if ($('#form-category').valid()) {
            this.props.blogActions.createCategory(this.props.category);
        }
    }

    render() {
        let categories = (this.props.categories !== undefined) ? this.props.categories : [];
        return (
            <BlogComponent
                {...this.props}
                updateFormPostData={this.updateFormPostData}
                updateFormCategory={this.updateFormCategory}
                updateEditor={this.updateEditor}
                handleFileUpload={this.handleFileUpload}
                savePost={this.savePost}
                createCategory={this.createCategory}
                openModal={this.openModal}
                preSavePost={this.preSavePost}
                categories={[{value: 0, text: 'Chọn nhóm bài viết'}, ...categories]}
            />
        );
    }
}

BlogContainer.propTypes = {
    post: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    blogActions: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        post: state.blog.post,
        categories: state.blog.categories.categories,
        category: state.blog.category
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogActions: bindActionCreators(blogActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer);
