/**
 * Created by Kiyoshitaro on 15/04/2018.
 */
import React                from "react";
import PropTypes            from "prop-types";

import {connect}            from "react-redux";
import {bindActionCreators} from "redux";
import * as blogActions     from "../actions/blogActions";


import ListPost             from "./ListPost";
import Search               from "../../../components/common/Search";
import Loading              from "../../../components/common/Loading";
import Pagination           from "../../../components/common/Pagination";
import Select               from '../../../components/common/Select';
// import Select               from './Select';
import PostModal            from "./PostModal";
import AddLanguageModal     from "./AddLanguageModal";
import AddCategoryModal     from "./AddCategoryModal";
// import KeetoolEditor from "../../../components/common/KeetoolEditor";
// import MinEditor from '../../../js/keetool-editor';



class BlogsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 1,
            query: "",
            category_id: 0,

            isOpenModal: false,
            postId: 0,
            isEdit: false,
        };
        this.timeOut = null;
        this.loadPosts          = this.loadPosts.bind(this);
        this.openCreatePostModal= this.openCreatePostModal.bind(this);
        this.loadByText         = this.loadByText.bind(this);
        this.loadPosts          = this.loadPosts.bind(this);
        this.loadByCategories   = this.loadByCategories.bind(this);
    }


    componentWillMount() {
        this.props.blogActions.loadCategories();
        this.props.blogActions.loadLanguages();
        this.loadPosts(1);
    }
    // componentDidMount() {
    //
    //     // $("mini-editor").init();
    //     window.addEventListener('load', function () {
    //         MinEditor.init('mini-editor');
    //     });
    // }
    loadPosts(page) {
        this.setState({page});
        this.props.blogActions.loadPosts(
            page,
            this.state.query,
            this.state.category_id,
        );
    }
    loadByText(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            function () {
                this.props.blogActions.loadPosts(
                    this.state.page,
                    value,
                    this.state.category_id,
                );
            }.bind(this),
            500,
        );
    }
    loadByCategories(category_id) {
        this.setState({category_id});
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            function () {
                this.props.blogActions.loadPosts(
                    1,
                    this.state.query,
                    category_id,
                );
            }.bind(this),
            500,
        );
    }
    openCreatePostModal(e){
        this.props.blogActions.openCreatePostModal();
        e.preventDefault();
    }




    render() {
        return (
            <div className="container-fluid">
                {this.props.isLoadingCategories || this.props.isLoadingPosts || this.props.isLoadingLanguages? (
                    <Loading/>
                ) : (
                    <div>
                        <div className="row">
                            <div className="col-md-2">

                                <Select
                                    className="btn-round"
                                    name="board-id"
                                    value={this.state.category_id}
                                    options={
                                        [
                                        {key : 0, value : "Tất cả"},
                                        ...this.props.categories ? this.props.categories.map((category) => {
                                        return {
                                            ...category,
                                            key: category.id,
                                            value: category.name
                                        };
                                    }) : [] ]
                                    }
                                    onChange={this.loadByCategories}
                                />
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="tab-content">
                                    <div className="flex-row flex">
                                        <h4 className="card-title">
                                            <strong>Danh sách bài viết</strong>
                                        </h4>
                                        <div>
                                            <button
                                                className="btn btn-primary btn-round btn-xs button-add none-margin "
                                                type="button" onClick={
                                                    (e)=>{this.openCreatePostModal(e);}}>
                                                <strong>+</strong>
                                            </button>
                                        </div>
                                    </div>

                                    {/*<KeetoolEditor/>*/}


                                    <Search
                                        onChange={this.loadByText}
                                        value={this.state.query}
                                        placeholder="Tìm kiếm tiêu đề"
                                    />
                                </div>

                                <ListPost/>

                            </div>

                        </div>

                        <div className="card-content">
                            <Pagination
                                totalPages={this.props.totalPages}
                                currentPage={this.state.page}
                                loadDataPage={this.loadPosts}
                            />
                        </div>
                    </div>
                )}


                <PostModal/>
                <AddLanguageModal/>
                <AddCategoryModal/>


            </div>
        );
    }
}

BlogsContainer.propTypes = {
    isLoadingPosts      : PropTypes.bool.isRequired,
    isLoadingCategories : PropTypes.bool.isRequired,
    isLoadingLanguages  : PropTypes.bool.isRequired,
    blogActions         : PropTypes.object.isRequired,
    categories          : PropTypes.array.isRequired,
    posts               : PropTypes.array.isRequired,
    totalPages          : PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        posts               : state.blog.posts,
        totalPages          : state.blog.totalPages,
        isLoadingCategories : state.blog.isLoadingCategories,
        isLoadingLanguages  : state.blog.isLoadingLanguages,
        categories          : state.blog.categories,
        isLoadingPosts      : state.blog.isLoadingPosts,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogActions: bindActionCreators(blogActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogsContainer);
