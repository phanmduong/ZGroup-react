import React from "react";
import PropTypes from "prop-types";
import { PUBLISH_STATUS } from "../constants/blogConstant";

const propTypes = {
    post: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    isSavingPost: PropTypes.bool.isRequired,
    publish: PropTypes.func.isRequired,
    saveDraft: PropTypes.func.isRequired,
    preview: PropTypes.func.isRequired
};
class StickyMenu extends React.Component {
    state = {};

    componentDidMount() {
        const mainClass = ".main-panel";
        const menuClass = ".sticky-menu";
        const anchorClass = ".anchor";
        $(mainClass).scroll(() => {
            const anchorOffset = $(anchorClass).offset().top;
            if (anchorOffset <= 30) {
                const margin = 30 - anchorOffset;
                $(menuClass).css("marginTop", margin);
            }
        });
    }

    render() {
        const {
            post,
            errors,
            isSavingPost,
            publish,
            saveDraft,
            preview
        } = this.props;
        return (
            <div>
                <div className="anchor" />
                <div
                    className="card sticky-menu"
                    style={{
                        padding: "65px 15px"
                    }}
                >
                    <div>
                        <i
                            style={{
                                position: "relative",
                                top: "7px"
                            }}
                            className="material-icons"
                        >
                            drafts
                        </i>{" "}
                        Trạng thái:{" "}
                        <strong>
                            {!post.id
                                ? "Chưa lưu"
                                : PUBLISH_STATUS[post.publish_status]}
                        </strong>
                    </div>
                    <div>
                        <i
                            style={{
                                position: "relative",
                                top: "7px"
                            }}
                            className="material-icons"
                        >
                            remove_red_eye
                        </i>{" "}
                        Hiển thị:{" "}
                        <strong>{post.status == 1 ? "Hiện" : "Ẩn"}</strong>
                    </div>

                    <div>
                        <i
                            style={{
                                position: "relative",
                                top: "7px"
                            }}
                            className="material-icons"
                        >
                            calendar_today
                        </i>{" "}
                        Ngày tạo:{" "}
                        <strong>{post.created_at && post.created_at}</strong>
                    </div>

                    <div>
                        <i
                            style={{
                                position: "relative",
                                top: "7px"
                            }}
                            className="material-icons"
                        >
                            timelapse
                        </i>{" "}
                        Ngày sửa:{" "}
                        <strong>{post.updated_at && post.updated_at}</strong>
                    </div>

                    {errors.length > 0 && (
                        <div
                            className="alert alert-danger"
                            style={{ marginBottom: 0, marginTop: 10 }}
                        >
                            {errors.map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}

                    <button
                        style={{
                            position: "absolute",
                            bottom: 5,
                            right: 15
                        }}
                        disabled={isSavingPost}
                        onClick={publish}
                        className="btn btn-rose"
                    >
                        {isSavingPost && (
                            <i className="fa fa-circle-o-notch fa-spin" />
                        )}{" "}
                        Xuất bản
                    </button>
                    <button
                        style={{
                            position: "absolute",
                            top: 5,
                            left: 15
                        }}
                        disabled={isSavingPost}
                        onClick={saveDraft}
                        className="btn btn-default"
                    >
                        {isSavingPost && (
                            <i className="fa fa-circle-o-notch fa-spin" />
                        )}{" "}
                        Lưu
                    </button>
                    <button
                        style={{
                            position: "absolute",
                            top: 5,
                            right: 15
                        }}
                        disabled={isSavingPost}
                        onClick={preview}
                        className="btn btn-default"
                    >
                        {isSavingPost && (
                            <i className="fa fa-circle-o-notch fa-spin" />
                        )}{" "}
                        Xem trước
                    </button>
                </div>
            </div>
        );
    }
}
StickyMenu.propTypes = propTypes;

export default StickyMenu;
