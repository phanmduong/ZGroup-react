import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    tags: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
class TagsInput extends React.Component {
    state = {};

    componentDidMount() {
        const selector = $("#" + this.props.id);
        selector.tagsinput();
        selector.on("itemAdded", () => {
            // event.item: contains the item
            const values = selector.val();
            this.props.onChange(values);
        });

        selector.on("itemRemoved", () => {
            // event.item: contains the item
            const values = selector.val();
            this.props.onChange(values);
        });
    }

    componentWillReceiveProps(nextProps) {
        const { tags } = this.props;
        if (nextProps.tags != tags) {
            const el = $("#" + this.props.id);
            el.tagsinput("add", nextProps.tags);
        }
    }

    render() {
        return (
            <div className="form-group">
                <label className="control-label">Tags</label>
                <div
                    style={{
                        padding: "4px 3px",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    }}
                >
                    <input
                        type="text"
                        className="tagsinput"
                        data-role="tagsinput"
                        data-color="rose"
                        value={this.props.tags || ""}
                        name="tags"
                        placeholder={this.props.placeholder || "Enter tags"}
                        id={this.props.id}
                    />
                </div>
            </div>
        );
    }
}
TagsInput.propTypes = propTypes;

export default TagsInput;
