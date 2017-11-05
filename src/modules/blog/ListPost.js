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
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr className="text-rose">
                        <th className="text-center">Tiêu đề</th>
                        <th className="text-center"> Nhóm bài viết</th>
                        <th className="text-center">Trạng thái</th>
                        <th className="text-center">Ngày tạo</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.posts.map(post => {
                        return (
                            <tr key={post.id}>
                                <td><Link to={"blog/post/" + post.id + "/edit"}>{post.title}</Link></td>
                                <td>
                                    {post.category.name}
                                </td>
                                <td>
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
                                </td>
                                <td className="text-center">
                                    {
                                        post.created_at
                                    }
                                </td>
                                <td>
                                    <ButtonGroupAction
                                        editUrl={"blog/post/" + post.id + "/edit"}
                                        delete={this.props.deletePost}
                                        object={post}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

ListPost.propTypes = {
    posts: PropTypes.array.isRequired,
    deletePost: PropTypes.func.isRequired,
};

export default ListPost;