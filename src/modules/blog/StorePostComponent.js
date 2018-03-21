import React from "react";
import FormInputText from "../../components/common/FormInputText";
import Loading from "../../components/common/Loading";
import { linkUploadImageEditor } from "../../constants/constants";
import ReactEditor from "../../components/common/ReactEditor";
import * as helper from "../../helpers/helper";
import { NO_IMAGE } from "../../constants/env";
import PropTypes from "prop-types";
import TooltipButton from "../../components/common/TooltipButton";
import AddCategoryModal from "./AddCategoryModal";
import { Modal } from "react-bootstrap";

import ReactSelect from "react-select";

let tmpCategories;

function addSelect(categories) {
    tmpCategories = categories.map(item => {
        return { value: item.value, label: item.text };
        // subscriptionKinds = [...tmpSubscriptionKinds , ...{value : item.id,label : item.name}];
    });
    return tmpCategories;
}

class StorePostComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { isOpenModal: false };
        this.openAddCategoryModal = this.openAddCategoryModal.bind(this);
        this.closeAddCategoryModal = this.closeAddCategoryModal.bind(this);
        this.generateFromTitle = this.generateFromTitle.bind(this);
        this.invalid = this.invalid.bind(this);
    }

    componentDidMount() {
        helper.setFormValidation("#form-post");
        helper.setFormValidation("#form-category");
        // $("#mini-editor").mini_editor();
        const scrollerId = "#store-post-modal";
        $(scrollerId).scroll(() => {
            const scroll = $(scrollerId).scrollTop();
            $(".blog-buttons").css(
                "transform",
                "translate(0px, " + scroll + "px)",
            );
        });
    }

    componentDidUpdate() {
        $("#tags").tagsinput();
    }

    generateFromTitle() {
        const slug = helper.changeToSlug(this.props.post.title);
        this.props.updateFormData("slug", slug);
    }

    openAddCategoryModal() {
        this.setState({ isOpenModal: true });
        this.props.openModal();
    }

    closeAddCategoryModal() {
        this.setState({ isOpenModal: false });
    }

    invalid() {
        const { title, slug, imageUrl } = this.props.post;
        return !title || !slug || !imageUrl;
    }

    render() {
        let {
            title,
            description,
            content,
            imageUrl,
            tags,
            category,
            isUpdatingImage,
            isSaving,
            slug,
            meta_title,
            keyword,
            meta_description,
            isPreSaving,
        } = this.props.post;
        return (
            <div>
                <form role="form" id="form-post">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                {this.props.isLoadingPost ? (
                                    <Loading />
                                ) : (
                                    <div className="row">
                                        <label className="label-control">
                                            Ảnh đại diện
                                        </label>
                                        {isUpdatingImage ? (
                                            <Loading />
                                        ) : (
                                            <TooltipButton
                                                text="Chọn ảnh đại diện"
                                                placement="top"
                                            >
                                                <a
                                                    type="button"
                                                    style={{
                                                        width: "100%",
                                                        marginBottom: "10px",
                                                        textAlign: "center",
                                                        verticalAlign: "middle",
                                                        border: "0 none",
                                                        display: "inline-block",
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            helper.isEmptyInput(
                                                                imageUrl,
                                                            )
                                                                ? NO_IMAGE
                                                                : imageUrl
                                                        }
                                                        style={{
                                                            lineHeight: "164px",
                                                            height: "auto",
                                                            width: "100%",
                                                            display: "block",
                                                            backgroundSize:
                                                                "cover",
                                                            backgroundPosition:
                                                                "center",
                                                            boxShadow:
                                                                " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                                            borderRadius:
                                                                "10px",
                                                        }}
                                                    />
                                                    <input
                                                        type="file"
                                                        accept=".jpg,.png,.gif"
                                                        onChange={
                                                            this.props
                                                                .handleFileUpload
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                            opacity: "0.0",
                                                            position:
                                                                "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            bottom: 0,
                                                            right: 0,
                                                            width: "100%",
                                                            height: "100%",
                                                        }}
                                                    />
                                                </a>
                                            </TooltipButton>
                                        )}

                                        <FormInputText
                                            label="Tên bài viết"
                                            required
                                            name="title"
                                            updateFormData={
                                                this.props.updateFormPostData
                                            }
                                            value={title}
                                        />

                                        <FormInputText
                                            height="100%"
                                            label="Slug"
                                            required
                                            name="slug"
                                            updateFormData={
                                                this.props.updateFormPostData
                                            }
                                            value={slug}
                                        >
                                            <a
                                                style={{ color: "blue" }}
                                                onClick={this.generateFromTitle}
                                            >
                                                Tự động sinh
                                            </a>
                                        </FormInputText>

                                        <div className="form-group">
                                            <label className="control-label">
                                                Mô tả ngắn
                                            </label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                rows="3"
                                                value={description}
                                                onChange={
                                                    this.props
                                                        .updateFormPostData
                                                }
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label">
                                                Meta title
                                            </label>
                                            <textarea
                                                className="form-control"
                                                name="meta_title"
                                                rows="3"
                                                value={meta_title}
                                                onChange={
                                                    this.props
                                                        .updateFormPostData
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">
                                                Meta description
                                            </label>
                                            <textarea
                                                className="form-control"
                                                name="meta_description"
                                                rows="3"
                                                value={meta_description}
                                                onChange={
                                                    this.props
                                                        .updateFormPostData
                                                }
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label">
                                                Keyword
                                            </label>
                                            <textarea
                                                className="form-control"
                                                name="keyword"
                                                rows="3"
                                                value={keyword}
                                                onChange={
                                                    this.props
                                                        .updateFormPostData
                                                }
                                            />
                                        </div>

                                        <label className="label-control">
                                            Nhóm bài viết
                                        </label>

                                        <div>
                                            <div className="row">
                                                <div
                                                    className="col-md-12"
                                                    style={{ display: "flex" }}
                                                >
                                                    <div
                                                        style={{
                                                            width:
                                                                "-webkit-fill-available",
                                                            marginRight: 10,
                                                        }}
                                                    >
                                                        <ReactSelect
                                                            value={category}
                                                            options={addSelect(
                                                                this.props
                                                                    .categories,
                                                            )}
                                                            onChange={
                                                                this.props
                                                                    .updateFormSelect
                                                            }
                                                            placeholder="Chọn nhóm"
                                                        />
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginTop: -6,
                                                        }}
                                                    >
                                                        <TooltipButton
                                                            placement="top"
                                                            text="Thêm nhóm bài viết"
                                                        >
                                                            <a
                                                                className="btn btn-rose btn-sm"
                                                                onClick={() => {
                                                                    this.openAddCategoryModal(
                                                                        {},
                                                                    );
                                                                }}
                                                            >
                                                                <i className="material-icons">
                                                                    control_point
                                                                </i>
                                                            </a>
                                                        </TooltipButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <input
                                            type="text"
                                            className="tagsinput"
                                            data-role="tagsinput"
                                            data-color="rose"
                                            value={tags}
                                            name="tags"
                                            placeholder="Tags"
                                            id="tags"
                                        />
                                    </div>
                                )}

                                <div className="row">
                                    <label className="control-label">
                                        Nội dung
                                    </label>
                                    <star style={{ color: "red" }}>*</star>
                                    {this.props.isLoadingPost ? (
                                        <Loading />
                                    ) : (
                                        <div>
                                            <ReactEditor
                                                urlPost={linkUploadImageEditor()}
                                                fileField="image"
                                                scrollerId="#store-post-modal"
                                                updateEditor={
                                                    this.props.updateEditor
                                                }
                                                value={content}
                                            />

                                            {/*<div id = "mini-editor"/>*/}
                                            <div className="blog-buttons">
                                                <button
                                                    onClick={
                                                        this.props.closeModal
                                                    }
                                                    className="btn btn-fill btn-danger"
                                                >
                                                    Đóng
                                                </button>
                                                {isPreSaving ? (
                                                    <button
                                                        className="btn btn-fill btn-success"
                                                        type="button"
                                                        disabled={true}
                                                    >
                                                        <i className="fa fa-spinner fa-spin disabled" />{" "}
                                                        Đang xử lý
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-fill btn-success"
                                                        type="button"
                                                        disabled={
                                                            this.invalid() ||
                                                            isSaving
                                                        }
                                                        onClick={() =>
                                                            this.props.preSavePost(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        Lưu
                                                    </button>
                                                )}
                                                {isPreSaving ? (
                                                    <button
                                                        className="btn btn-fill btn-default"
                                                        type="button"
                                                        disabled={true}
                                                    >
                                                        <i className="fa fa-spinner fa-spin disabled" />{" "}
                                                        Đang xử lý
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-fill btn-default"
                                                        type="button"
                                                        disabled={
                                                            this.invalid() ||
                                                            isSaving
                                                        }
                                                        onClick={() =>
                                                            this.props.preSavePost(
                                                                true,
                                                            )
                                                        }
                                                    >
                                                        Lưu và xem thử
                                                    </button>
                                                )}
                                                {isSaving ? (
                                                    <button
                                                        className="btn btn-fill btn-rose"
                                                        type="button"
                                                        disabled={true}
                                                    >
                                                        <i className="fa fa-spinner fa-spin disabled" />{" "}
                                                        Đang đăng bài
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-fill btn-rose"
                                                        type="button"
                                                        disabled={
                                                            this.invalid() ||
                                                            isPreSaving
                                                        }
                                                        onClick={() => {
                                                            this.props.savePost();
                                                        }}
                                                    >
                                                        Đăng bài
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <Modal
                    show={this.state.isOpenModal}
                    bsSize="sm"
                    bsStyle="primary"
                    onHide={this.closeAddCategoryModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h4 className="card-title">Thêm nhóm bài viết</h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddCategoryModal
                            category={this.props.category}
                            updateFormCategory={this.props.updateFormCategory}
                            // resetCategory={this.props.resetCategory}
                            createCategory={this.props.createCategory}
                            closeAddCategoryModal={this.closeAddCategoryModal}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

StorePostComponent.propTypes = {
    post: PropTypes.object.isRequired,
    updateFormPostData: PropTypes.func.isRequired,
    updateFormData: PropTypes.func.isRequired,
    updateEditor: PropTypes.func.isRequired,
    preSavePost: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired,
    handleFileUpload: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    updateFormSelect: PropTypes.func.isRequired,
    updateFormCategory: PropTypes.func.isRequired,
    // resetCategory: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    category: PropTypes.object.isRequired,
    createCategory: PropTypes.func.isRequired,
    isLoadingPost: PropTypes.bool.isRequired,
};

export default StorePostComponent;
