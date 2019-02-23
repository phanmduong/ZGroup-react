import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as blogActions from "./blogActions";
import ListPost from "./ListPost";
import Search from "../../../components/common/Search";
import Loading from "../../../components/common/Loading";
import Pagination from "../../../components/common/Pagination";
import Select from '../../../components/common/Select';
import {authGapi, initGapi} from "../GapiClass";


class AnalyticsBlogsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 1,
            query: "",
            category_id: 0,
            kind: 'blog',
            isOpenModal: false,
            postId: 0,
            isEdit: false,
        };
        this.timeOut = null;
        this.inited = false;
        this.loadPosts = this.loadPosts.bind(this);
        this.loadByText = this.loadByText.bind(this);
        this.loadPosts = this.loadPosts.bind(this);
        this.loadByCategories = this.loadByCategories.bind(this);
        this.loadByKinds = this.loadByKinds.bind(this);

    }


    componentWillMount() {
        initGapi();
        authGapi();
        this.inited = true;
        this.props.blogActions.loadCategories();
        this.props.blogActions.loadLanguages();
        this.loadPosts(1);
    }


    loadPosts(page) {
        this.setState({page});
        this.props.blogActions.loadPosts(
            page,
            this.state.query,
            this.state.category_id,
            this.state.kind,
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
                    this.state.kind,
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
                    this.state.kind,
                );
            }.bind(this),
            500,
        );
    }

    loadByKinds(kind) {
        this.setState({kind});
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            function () {
                this.props.blogActions.loadPosts(
                    1,
                    this.state.query,
                    this.state.category_id,
                    kind,
                );
            }.bind(this),
            500,
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-12">
                        <div id={"view-selector-container"} style={{visibility: "hidden", height:0}}/>
                    </div>
                    <div className="col-md-2">

                        <Select
                            className="btn-round"
                            name="board-id"
                            value={this.state.category_id}
                            options={
                                [
                                    {key: 0, value: "Tất cả"},
                                    ...this.props.categories ? this.props.categories.map((category) => {
                                        return {
                                            ...category,
                                            key: category.id,
                                            value: category.name
                                        };
                                    }) : []]
                            }
                            onChange={this.loadByCategories}
                        />
                    </div>
                    <div className="col-md-2">

                        <Select
                            className="btn-round"
                            name="board-id"
                            value={this.state.kind}
                            options={
                                this.props.allBlogKinds.map((obj) => {
                                    return {key: obj.value, value: obj.label};
                                })
                            }
                            onChange={this.loadByKinds}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="analytic-author-container">
                            <div className="analytic-author-item" id={"embed-api-auth-container"}/>
                        </div>
                    </div>

                </div>
                {this.props.isLoadingCategories || this.props.isLoadingPosts || this.props.isLoadingLanguages ? (
                    <Loading/>
                ) : (
                    <div className="row">

                        <div className="col-md-12">
                            <div className="card-content">
                                <div className="tab-content">
                                    <Search
                                        onChange={this.loadByText}
                                        value={this.state.query}
                                        placeholder="Tìm kiếm tiêu đề"
                                    />
                                </div>

                             </div>
                        </div>
                        {!(this.props.isLoadingCategories || this.props.isLoadingPosts || this.props.isLoadingLanguages) &&
                        <ListPost
                            isLoading={this.props.isLoadingCategories || this.props.isLoadingPosts || this.props.isLoadingLanguages}
                            inited={this.inited}
                        />}
                        <Pagination
                            totalPages={this.props.totalPages}
                            currentPage={this.state.page}
                            loadDataPage={this.loadPosts}
                        />

                    </div>
                )}
            </div>
        );
    }
}

AnalyticsBlogsContainer.propTypes = {
    isLoadingPosts: PropTypes.bool,
    isLoadingCategories: PropTypes.bool,
    isLoadingLanguages: PropTypes.bool,
    blogActions: PropTypes.object,
    post: PropTypes.object,
    categories: PropTypes.array,
    posts: PropTypes.array,
    totalPages: PropTypes.number,
    allBlogKinds: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        posts: state.blog.posts,
        totalPages: state.blog.totalPages,
        isLoadingCategories: state.blog.isLoadingCategories,
        isLoadingLanguages: state.blog.isLoadingLanguages,
        categories: state.blog.categories,
        isLoadingPosts: state.blog.isLoadingPosts,
        allBlogKinds: state.blog.allBlogKinds,
        post: state.blog.post,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogActions: bindActionCreators(blogActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsBlogsContainer);
