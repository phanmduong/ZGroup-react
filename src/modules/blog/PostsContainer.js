/**
 * Created by phanmduong on 11/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as blogActions from './blogActions';
import ListPost from './ListPost';
import * as helper from '../../helpers/helper';
import Link from "react-router/es/Link";
import Search from "../../components/common/Search";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";


class BlogsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.postsSearchChange = this.postsSearchChange.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.loadPosts = this.loadPosts.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.state = {
            page: 1,
            query: ""
        };
        this.timeOut = null;
    }

    componentWillMount() {
        this.loadPosts();
    }

    deletePost(post) {
        helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xoá bài viết này",
            function () {
                this.props.blogActions.deletePost(post.id);
            }.bind(this));
    }



    postsSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.blogActions.getPosts(this.state.page, this.state.query);
        }.bind(this), 500);

    }

    loadPosts(page = 1,category_id) {
        this.setState({page});
        this.props.blogActions.getPosts(page, this.state.query ,category_id);
    }

    handleSwitch(id , status ,name){
        this.props.blogActions.changeStatus(id, status, name);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">


                    <div className="card">

                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">Danh sách bài viết</h4>

                            <div style={{marginTop: "15px"}}>
                                <Link to="/blog/new-post" className="btn btn-rose">
                                    Tạo bài viết
                                </Link>
                            </div>


                            <Search
                                onChange={this.postsSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm tiêu đề"
                            />

                            {this.props.isLoading ? <Loading/> :
                                <ListPost
                                    handleSwitch = {this.handleSwitch}
                                    deletePost={this.deletePost}
                                    posts={this.props.posts}
                                    loadPosts = {this.loadPosts}
                                />
                            }
                        </div>

                        <div className="card-content">
                            <Pagination
                                totalPages={this.props.totalPages}
                                currentPage={this.state.page}
                                loadDataPage={this.loadPosts}
                            />
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

BlogsContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    blogActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        posts: state.blog.posts,
        isLoading: state.blog.isLoading,
        totalPages: state.blog.totalPages,
        currentPage: state.blog.currentPage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogActions: bindActionCreators(blogActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogsContainer);
