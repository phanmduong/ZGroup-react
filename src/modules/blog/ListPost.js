import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import Switch from 'react-bootstrap-switch';
import Avatar from '../../components/common/Avatar';


class ListPost extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSwitch = this.handleSwitch.bind(this);

    }

    handleSwitch(id, status, name) {
        this.props.handleSwitch(id, status, name);
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
                                            this.props.openModal(true, post.id);
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

                                                <div style={{position: "absolute"}}>
                                                    {post.category ?
                                                        <button className="tag btn btn-xs btn-danger"
                                                                style={{marginLeft: 15, borderRadius: 10}}
                                                                onClick={(e) => {
                                                                    this.props.loadByCategories(post.category.id);
                                                                    e.stopPropagation();
                                                                }}
                                                        >
                                                            {post.category ? post.category.name : 'Không có'}</button>
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                        </a>
                                    </div>


                                    <div className="card-content">
                                        <div className="card-action" style={{height: 73}}>
                                            <h4 className="card-title">
                                                <a onClick={() => {
                                                    this.props.openModal(true, post.id);
                                                }}>{post.title ? post.title : "Chưa có tên"}</a>
                                            </h4>
                                            <ButtonGroupAction
                                                editUrl={"blog/post/" + post.id + "/edit"}
                                                delete={this.props.deletePost}
                                                object={post}
                                                disabledEdit
                                            />


                                            <div style={{display: "flex", justifyContent: "space-between", height: 40}}>
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    {post.author.avatar_url ?
                                                        <Avatar size={40} url={post.author.avatar_url}
                                                                style={{borderRadius: 6}}/> : null}
                                                    <div>
                                                        <strong>{post.author.name}</strong><br/>
                                                        <p className="category"
                                                           style={{fontSize: 12}}>{post.created_at}</p>
                                                    </div>
                                                </div>

                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    <Switch
                                                        onChange={() => this.props.handleSwitch(post.id, post.status, post.title)}
                                                        bsSize="mini"
                                                        onText="Hiện" offText="Ẩn"
                                                        value={(post.status === 1)}
                                                    />

                                                </div>
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
    posts: PropTypes.array.isRequired,
    deletePost: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    handleSwitch: PropTypes.func.isRequired,
    loadByCategories: PropTypes.func.isRequired,
    loadPosts: PropTypes.func,
};

export default ListPost;