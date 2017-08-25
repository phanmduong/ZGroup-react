import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import {LINK_UPLOAD_IMAGE_EDITOR} from '../../constants/constants';
import ReactEditor from '../../components/common/ReactEditor';
import * as helper from '../../helpers/helper';
import { NO_IMAGE} from '../../constants/env';
import PropTypes from 'prop-types';

class BlogComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        helper.setFormValidation('#form-post');
        helper.setFormValidation('#form-category');
    }

    render() {
        let {title, description, content, imageUrl, tags, category, isUpdatingImage, isSaving, isPreSaving} = this.props.post;
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose"><i
                                className="material-icons">bookmark</i></div>
                            <div className="card-content">
                                <h4 className="card-title">Viết bài</h4>
                                <form role="form"
                                      id="form-post">
                                    <FormInputText
                                        label="Tên bài viết"
                                        required
                                        name="title"
                                        updateFormData={this.props.updateFormPostData}
                                        value={title}
                                    />
                                    <FormInputText
                                        label="Mô tả ngắn"
                                        required
                                        name="description"
                                        updateFormData={this.props.updateFormPostData}
                                        value={description}
                                    />
                                    <ReactEditor
                                        urlPost={LINK_UPLOAD_IMAGE_EDITOR}
                                        fileField="image"
                                        updateEditor={this.props.updateEditor}
                                        value={content}
                                    />
                                    {isPreSaving ?
                                        (
                                            <button className="btn btn-fill btn-default"
                                                    type="button">
                                                <i className="fa fa-spinner fa-spin disabled"/> Đang tạo bài viết
                                            </button>
                                        )
                                        :
                                        (
                                            <button
                                                className="btn btn-fill btn-default"
                                                type="button"
                                                onClick={this.props.preSavePost}
                                            >
                                                Xem thử
                                            </button>
                                        )

                                    }
                                    {isSaving ?
                                        (
                                            <button className="btn btn-fill btn-rose"
                                                    type="button">
                                                <i className="fa fa-spinner fa-spin disabled"/> Đang đăng bài
                                            </button>
                                        )
                                        :
                                        (
                                            <button
                                                className="btn btn-fill btn-rose"
                                                type="button"
                                                onClick={this.props.savePost}
                                            >
                                                Đăng bài
                                            </button>
                                        )

                                    }
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">announcement</i>
                            </div>
                            <div className="card-content"><h4 className="card-title">Thông tin về bài viết </h4>
                                <img
                                    src={helper.isEmptyInput(imageUrl) ?
                                        NO_IMAGE : imageUrl
                                    }/>
                                {isUpdatingImage ?
                                    (
                                        <button className="btn btn-rose btn-round disabled" type="button">
                                            <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                        </button>
                                    )
                                    :
                                    (
                                        <button className="btn btn-fill btn-rose" type="button">
                                            Chọn ảnh đại diện
                                            <input type="file"
                                                   accept=".jpg,.png,.gif"
                                                   onChange={this.props.handleFileUpload}
                                                   style={{
                                                       cursor: 'pointer',
                                                       opacity: "0.0",
                                                       position: "absolute",
                                                       top: 0,
                                                       left: 0,
                                                       bottom: 0,
                                                       right: 0,
                                                       width: "100%",
                                                       height: "100%"
                                                   }}
                                            />
                                        </button>
                                    )
                                }
                                <div className="form-group"><label>Nhóm bài viết</label>
                                    <div className="row">
                                        <div className="col-md-9">
                                            <select
                                                className="form-control"
                                                value={category}
                                                onChange={this.props.updateFormPostData}
                                                name="category">
                                                {this.props.categories !== null && this.props.categories !== undefined &&
                                                this.props.categories.map((item, key) => {
                                                    return (
                                                        <option
                                                            key={key}
                                                            value={item.value}
                                                        >
                                                            {item.text}
                                                        </option>);
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <button type="button" className="btn btn-rose btn-sm"
                                                    data-toggle="modal"
                                                    data-target="#addCategoryModal"
                                                    onClick={this.props.openModal}
                                            >
                                                <i className="material-icons">control_point</i>
                                            </button>
                                            <div className="modal fade" id="addCategoryModal"
                                                 role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <button type="button" className="close"
                                                                    data-dismiss="modal"
                                                                    aria-hidden="true">
                                                                <i className="material-icons">clear</i>
                                                            </button>
                                                            <h4 className="modal-title">Thêm nhóm bài viết</h4>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form id="form-category">
                                                                <FormInputText
                                                                    label="Tên nhóm bài viết"
                                                                    required
                                                                    name="name"
                                                                    updateFormData={this.props.updateFormCategory}
                                                                    value={this.props.category.name}
                                                                />
                                                            </form>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button"
                                                                    className="btn btn-danger btn-simple"
                                                                    data-dismiss="modal">Huỷ
                                                            </button>
                                                            {this.props.category.isCreating ?
                                                                (
                                                                    <button type="button"
                                                                            className="btn btn-rose disabled">
                                                                        <i className="fa fa-spinner fa-spin "/> Đang
                                                                        thêm
                                                                    </button>
                                                                )
                                                                :
                                                                (
                                                                    <button type="button" className="btn btn-rose"
                                                                            onClick={this.props.createCategory}
                                                                    >
                                                                        Thêm
                                                                    </button>
                                                                )
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="text" className="tagsinput" data-role="tagsinput" data-color="rose"
                                               value={tags}
                                               name="tags"
                                               placeholder="Tags"
                                               id="tags"
                                        />
                                    </div>
                                </div>
                                {isSaving ?
                                    (
                                        <button className="btn btn-fill btn-rose disabled" type="button">
                                            <i className="fa fa-spinner fa-spin "/> Đang cập nhật
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            className="btn btn-fill btn-rose"
                                            type="button"
                                            onClick={this.props.savePost}
                                        >
                                            Cập nhật
                                        </button>
                                    )

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BlogComponent.propTypes = {
    post: PropTypes.object.isRequired,
    updateFormPostData: PropTypes.func.isRequired,
    updateEditor: PropTypes.func.isRequired,
    preSavePost: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired,
    handleFileUpload: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    updateFormCategory: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    category: PropTypes.object.isRequired,
    createCategory: PropTypes.func.isRequired,
};


export default BlogComponent;
