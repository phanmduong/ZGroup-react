import React, { Component } from "react";
import { PropTypes } from "prop-types";

export default class Button extends Component {
    componentDidMount() {
        const { scrollerId } = this.props;
        $(scrollerId).scroll(() => {
            const limit = $(scrollerId + " .modal-body").outerHeight() + 100;

            const scroll = $(scrollerId).scrollTop();

            if (scroll < limit - $(scrollerId).height() + 100) {
                const topButtons = $(window).height() - this.props.height + "px";
                $(".custom-button").css("top", topButtons);
                $(".custom-button").css("transform", "translate(0px, " + scroll + "px)");
            }
        });
        const topButtons = $(window).height() - this.props.height + "px";
        $(".custom-button").css("top", topButtons);
    }
    render() {
        return (
            <div className="custom-button">
                {this.props.isLoading ? (
                    <button type="button" className={`btn ${this.props.className} disabled`}>
                        <i className="fa fa-spinner fa-spin" />
                        {this.props.labelLoading}
                    </button>
                ) : (
                        <button
                            onClick={this.props.onClick}
                            type="button"
                            className={`btn ${this.props.className}`}>
                            {this.props.label}
                        </button>
                    )}
            </div>
        );
    }
}

Button.propTypes = {
    isLoading: PropTypes.bool,
    label: PropTypes.string.isRequired,
    labelLoading: PropTypes.string,
    className: PropTypes.string,
    scrollerId: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    height: PropTypes.string,
};
