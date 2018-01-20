import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import {Link} from 'react-router';

class ListPost extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (

            <div className="row">


                {this.props.posts && this.props.posts.map((post) => {
                    return (
                        <div className="col-sm-4" id="card-email-template" key={post.id}>
                            <div className="card card-chart">
                                <div className="card-header" data-background-color="white" style={{
                                    borderRadius: '10px'
                                }}>
                                    <div id="simpleBarChart" className="ct-chart"
                                         style={{
                                             width: '100%',
                                             background: 'url(' + post.thumb_url && post.thumb_url + ')',
                                             backgroundSize: 'cover',
                                             backgroundPosition: 'center',
                                             height: '200px',
                                             borderRadius: '10px'
                                         }}
                                    />
                                </div>
                                <div className="card-content">
                                    <div className="card-action">
                                        <h4 className="card-title"><Link
                                            to={"blog/post/" + post.id + "/edit"}>{post.title ? post.title : "Chưa có tên"}</Link>
                                        </h4>
                                        <ButtonGroupAction
                                            editUrl={"blog/post/" + post.id + "/edit"}
                                            delete={this.props.deletePost}
                                            object={post}
                                            disabledEdit
                                        />
                                    </div>
                                    <p className="category">Nhóm bài
                                        : {post.category ? post.category.name : 'Không có'}</p>
                                    <p className="category">{"Ngày tạo : " + post.created_at}</p>
                                    {
                                        post.status === 1 ?
                                            <div className="btn btn-xs btn-main btn-success">
                                                Hiển thị
                                            </div>
                                            :
                                            <div className="btn btn-xs btn-main btn-info">
                                                Ẩn
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>

        );
    }
}

ListPost.propTypes = {
    posts: PropTypes.array.isRequired,
    deletePost: PropTypes.func.isRequired,
};

export default ListPost;