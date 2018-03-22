import React from "react";
import PropTypes from "prop-types";

class StorePostComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const { scrollerId } = this.props;
        $(scrollerId).scroll(() => {
            const scroll = $(scrollerId).scrollTop();
            $(".blog-buttons").css(
                "transform",
                "translate(0px, " + scroll + "px)",
            );
        });
        const topButtons = $(window).height() - 210 + "px";
        $(".blog-buttons").css("top", topButtons);
    }

    componentDidUpdate() {}

    render() {
        return (
            <div style={this.props.style} className="blog-buttons">
                <button
                    onClick={this.props.close}
                    className="btn btn-fill btn-danger"
                >
                    Đóng
                </button>

                <button
                    className="btn btn-fill btn-success"
                    type="button"
                    disabled={this.props.disabled}
                    onClick={() => this.props.preSavePost(false)}
                >
                    Lưu
                </button>

                <button
                    className="btn btn-fill btn-default"
                    type="button"
                    disabled={this.props.disabled}
                    onClick={() => this.props.preSavePost(true)}
                >
                    Lưu và xem thử
                </button>

                <button
                    className="btn btn-fill btn-rose"
                    type="button"
                    disabled={this.props.disabled}
                    onClick={() => {
                        this.props.savePost();
                    }}
                >
                    Đăng bài
                </button>
            </div>
        );
    }
}

StorePostComponent.propTypes = {
    scrollerId: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
};

export default StorePostComponent;
