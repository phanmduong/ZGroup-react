import React from "react";
import KeetoolEditor from "../../../components/common/editor/KeetoolEditor";
import ImageUploader from "../../../components/common/ImageUploader";
import store from "./BlogEditorStore";
import { NO_IMAGE } from "../../../constants/env";
import { observer } from "mobx-react";
import FormInputText from "../../../components/common/FormInputText";
import ReactSelect from "react-select";
import { BLOG_KINDS } from "../const";
import TooltipButton from "../../../components/common/TooltipButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import AddLanguageModal from "../containers/AddLanguageModal";
import { openAddLanguageModal } from "../actions/blogActions";

@observer
class BlogEditor extends React.Component {
    state = {
        value: "",
    };

    componentDidMount() {
        store.loadLanguages();
    }

    onChange = value => {
        console.log(value);
        this.setState({
            value,
        });
    };

    updatePost = (field, value) => {
        const post = { ...store.post };
        post[field] = value;
        store.post = post;
    };

    openAddLanguageModal = () => {
        store.toggleAddLanguageModal(true);
    };

    render() {
        return (
            <div className="container-fluid">
                <AddLanguageModal />
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-content">
                            <FormInputText
                                label="Tên bài viết"
                                required
                                name="title"
                                updateFormData={e => this.updatePost("title", e.target.value)}
                                value={store.post.title}
                            />
                            <div className="form-group">
                                <label className="control-label">Loại bài viết</label>
                                <ReactSelect
                                    value={store.post.kind}
                                    options={BLOG_KINDS}
                                    onChange={e => this.updatePost("kind", e.value)}
                                    placeholder="Chọn loại bài viết"
                                />
                            </div>
                            <div className="form-group">
                                <label className="control-label" style={{ marginBottom: "10px" }}>
                                    Ngôn ngữ
                                    <TooltipButton placement="top" text="Thêm ngôn ngữ">
                                        <button
                                            onClick={this.openAddLanguageModal}
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            type="button">
                                            <strong>+</strong>
                                            <div className="ripple-container" />
                                        </button>
                                    </TooltipButton>
                                </label>
                                <ReactSelect
                                    value={store.post.language_id}
                                    options={store.getLanguages}
                                    onChange={e => this.updatePost("language_id", e.value)}
                                    placeholder="Chọn ngôn ngữ"
                                />
                            </div>
                            <KeetoolEditor value={this.state.value} onChange={this.onChange} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-content">
                            <label>Ảnh đại diện</label>
                            <ImageUploader
                                tooltipText="Ảnh đại diện"
                                image_url={store.post.imageUrl ? store.post.imageUrl : NO_IMAGE}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BlogEditor.propTypes = {
    blogActions: PropTypes.object.isRequired,
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        blogActions: bindActionCreators(
            {
                openAddLanguageModal,
            },
            dispatch,
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogEditor);
