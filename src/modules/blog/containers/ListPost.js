/**
 * Created by Kiyoshitaro on 15/04/2018.
 */

import React                from 'react';
import PropTypes            from 'prop-types';
import * as blogActions     from "../actions/blogActions";


import {connect}            from "react-redux";
import {bindActionCreators} from "redux";

import ButtonGroupAction    from '../../../components/common/ButtonGroupAction';
import Switch               from 'react-bootstrap-switch';
import Avatar               from '../../../components/common/Avatar';
import * as helper          from "../../../helpers/helper";


class ListPost extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSwitch       = this.handleSwitch.bind(this);
        this.openEditPostModal  = this.openEditPostModal.bind(this);
        this.deletePost         = this.deletePost.bind(this);
    }

    handleSwitch(id, status, name) {
        this.props.blogActions.changeStatus(id, status, name);
    }
    openEditPostModal(id){
        this.props.blogActions.openEditPostModal(id);
    }
    deletePost(post) {
        helper.confirm(
            "error",
            "Xoá",
            "Bạn có chắc chắn muốn xoá bài viết này",
            function () {
                this.props.blogActions.deletePost(post.id);
            }.bind(this),
        );
    }


    render() {
        return (
            <div>
                <div className="row">
                    {this.props.posts && this.props.posts.map((post) => {
                        return (
                            <div className="col-sm-6 col-md-6 col-lg-4" key={post.id}>
                                <div className="card card-chart">
                                    <div className="card-header" data-background-color="white"
                                         style={{borderRadius: '10px'}}>

                                        <a onClick={() => {
                                            this.openEditPostModal( post.id);
                                        }}>
                                            <div id="simpleBarChart" className="ct-chart"
                                                 style={{
                                                     width: '100%',
                                                     background: 'url(' + post.image_url + ')',
                                                     backgroundSize: 'cover',
                                                     backgroundPosition: 'center',
                                                     height: '200px',
                                                     borderRadius: '10px',
                                                     position: "relative"
                                                 }}
                                            >

                                                {/*<div style={{position: "absolute"}}>*/}
                                                    {/*{post.category ?*/}
                                                        {/*<button className="tag btn btn-xs btn-danger"*/}
                                                                {/*style={{marginLeft: 15, borderRadius: 10}}*/}
                                                                {/*onClick={(e) => {*/}
                                                                    {/*this.props.loadByCategories(post.category.id);*/}
                                                                    {/*e.stopPropagation();*/}
                                                                {/*}}*/}
                                                        {/*>*/}
                                                            {/*{post.category ? post.category.name : 'Không có'}</button>*/}
                                                        {/*: null*/}
                                                    {/*}*/}
                                                {/*</div>*/}
                                            </div>
                                        </a>
                                    </div>


                                    <div className="card-content">
                                        <div className="card-action" style={{height: 73}}>
                                            <h4 className="card-title" style={{display : "flex", justifyContent : "space-between"}}>
                                                <a onClick={() => {
                                                    this.openEditPostModal( post.id);
                                                }}>{post.title ? post.title : "Chưa có tên"}</a>

                                                <ButtonGroupAction
                                                    editUrl={"blog/post/" + post.id + "/edit"}
                                                    delete={this.deletePost}
                                                    object={post}
                                                    disabledEdit
                                                />
                                            </h4>
                                        </div>


                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            height: 40}}>
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center"}}>
                                                {post.author.avatar_url ?
                                                    <Avatar size={40} url={post.author.avatar_url}
                                                            style={{borderRadius: 6}}/> : null}
                                                <div>
                                                    <strong>{post.author.name}</strong><br/>
                                                    <p className="category"
                                                       style={{fontSize: 12}}>
                                                        {post.created_at}
                                                    </p>
                                                </div>
                                            </div>

                                            <div style={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}>
                                                <Switch
                                                    onChange={
                                                        () => this.handleSwitch(post.id, post.status, post.title)}
                                                    bsSize="mini"
                                                    onText="Hiện" offText="Ẩn"
                                                    value={(post.status === 1)}
                                                />

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>

            </div>
        );
    }
}

ListPost.propTypes = {
    posts       : PropTypes.array.isRequired,
    blogActions : PropTypes.object.isRequired,
    // loadByCategories: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        posts           : state.blog.posts,
        categories      : state.blog.categories,
        isLoadingPosts  : state.blog.isLoadingPosts,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogActions: bindActionCreators(blogActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPost);

