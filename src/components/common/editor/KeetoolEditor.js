import React from "react";
import { Editor, getEventTransfer } from "slate-react";
import { LAST_CHILD_TYPE_INVALID } from "slate-schema-violations";
import {
    DEFAULT_NODE,
    isBoldHotkey,
    isItalicHotkey,
    isUnderlinedHotkey,
    isCodeHotkey,
    hasMark,
    hasBlock,
    hasInline
} from "./EditorService";
import { Block } from "slate";

import { unwrapLink } from "./utils/linkUtils";
import { insertImage, uploadImage } from "./utils/imageUtils";
import {
    showErrorNotification,
    showNotification
} from "../../../helpers/helper";
import PropTypes from "prop-types";
import LinkModal from "./LinkModal";
import { htmlToValue } from "./editorHelpers";

class KeetoolEditor extends React.Component {
    state = {
        // value: html.deserialize(this.props.value || initialValue),
        isLoading: false,
        text: "Đang xử lý",
        showLinkModal: false
    };

    closeLinkModal = () => {
        this.setState({
            showLinkModal: false
        });
    };

    openLinkModal = () => {
        this.setState({
            showLinkModal: true
        });
    };

    /**
     * When clicking a link, if the selection has a link in it, remove the link.
     * Otherwise, add a new link with an href and text.
     *
     * @param {Event} event
     */

    onClickInline = (event, type) => {
        event.preventDefault();
        const { value } = this.props;
        const change = value.change();

        if (type == "link") {
            const hasLinks = hasInline(type, value);

            if (hasLinks) {
                change.call(unwrapLink);
            } else {
                this.openLinkModal();
            }
        }

        this.onChange(change);
    };

    onClickImage = event => {
        const fileList = event.target.files;
        const files = Array.from(fileList);

        let totalFiles = files.length;

        if (totalFiles) {
            this.setState({
                isLoading: true,
                text: "Đang tải lên"
            });

            files.map(file =>
                uploadImage(
                    file,
                    event => {
                        const data = JSON.parse(
                            event.currentTarget.responseText
                        );
                        showNotification("Tải lên thành công");

                        const change = this.props.value
                            .change()
                            .call(insertImage, data.url);
                        this.onChange(change);
                        totalFiles -= 1;
                        if (totalFiles == 0) {
                            this.setState({
                                isLoading: false
                            });
                        }
                    },
                    null,
                    () => {
                        showErrorNotification("Tải ảnh lên bị lỗi");
                    }
                )
            );
        }

        // const src = window.prompt("Enter the URL of the image:");
        // if (!src) return;
    };

    /**
     * On paste, deserialize the HTML and then insert the fragment.
     *
     * @param {Event} event
     * @param {Change} change
     */

    onPaste = (event, change) => {
        const transfer = getEventTransfer(event);
        const { type, text, files } = transfer;

        if (type == "files") {
            let totalFiles = files.length;
            if (totalFiles) {
                this.setState({ isLoading: true, text: "Đang tải lên" });
                for (const file of files) {
                    // const reader = new FileReader();
                    const [mime] = file.type.split("/");
                    if (mime != "image") continue;

                    uploadImage(
                        file,
                        event => {
                            const data = JSON.parse(
                                event.currentTarget.responseText
                            );
                            showNotification("Tải lên thành công");

                            const change = this.props.value
                                .change()
                                .call(insertImage, data.url);
                            this.onChange(change);
                            totalFiles -= 1;
                            if (totalFiles == 0) {
                                this.setState({
                                    isLoading: false
                                });
                            }
                        },
                        null,
                        () => {
                            showErrorNotification("Tải ảnh lên bị lỗi");
                        }
                    );
                    // reader.addEventListener("load", () => {
                    //     editor.change(c => {
                    //         c.call(insertImage, reader.result, target);
                    //     });
                    // });

                    // reader.readAsDataURL(file);
                }
            }
        }
        if (transfer.type != "html") return;
        const { document } = htmlToValue(transfer.html);
        change.insertFragment(document);
        return true;
    };

    /**
     * A schema to enforce that there's always a paragraph as the last block.
     *
     * @type {Object}
     */

    schema = {
        document: {
            last: { types: ["paragraph"] },
            normalize: (change, reason, { node }) => {
                switch (reason) {
                    case LAST_CHILD_TYPE_INVALID: {
                        const paragraph = Block.create("paragraph");
                        return change.insertNodeByKey(
                            node.key,
                            node.nodes.size,
                            paragraph
                        );
                    }
                }
            }
        }
    };

    onChange = ({ value }) => {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    /**
     * On key down, if it's a formatting command toggle a mark.
     *
     * @param {Event} event
     * @param {Change} change
     * @return {Change}
     */

    onKeyDown = (event, change) => {
        let mark;

        if (isBoldHotkey(event)) {
            mark = "bold";
        } else if (isItalicHotkey(event)) {
            mark = "italic";
        } else if (isUnderlinedHotkey(event)) {
            mark = "underlined";
        } else if (isCodeHotkey(event)) {
            mark = "code";
        } else {
            return;
        }

        event.preventDefault();
        change.toggleMark(mark);
        return true;
    };

    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickMark = (event, type) => {
        event.preventDefault();
        const { value } = this.props;
        const change = value.change().toggleMark(type);
        this.onChange(change);
    };

    /**
     * When a block button is clicked, toggle the block type.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickBlock = (event, type) => {
        event.preventDefault();
        const { value } = this.props;
        const change = value.change();
        const { document } = value;

        // Handle everything but list buttons.
        if (type != "bulleted-list" && type != "numbered-list") {
            const isActive = hasBlock(type, value);
            const isList = hasBlock("list-item", value);

            if (isList) {
                change
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock("bulleted-list")
                    .unwrapBlock("numbered-list");
            } else {
                change.setBlocks(isActive ? DEFAULT_NODE : type);
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = hasBlock("list-item", value);
            const isType = value.blocks.some(block => {
                return !!document.getClosest(
                    block.key,
                    parent => parent.type == type
                );
            });

            if (isList && isType) {
                change
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock("bulleted-list")
                    .unwrapBlock("numbered-list");
            } else if (isList) {
                change
                    .unwrapBlock(
                        type == "bulleted-list"
                            ? "numbered-list"
                            : "bulleted-list"
                    )
                    .wrapBlock(type);
            } else {
                change.setBlocks("list-item").wrapBlock(type);
            }
        }

        this.onChange(change);
    };

    /**
     * Render the toolbar.
     *
     * @return {Element}
     */

    renderToolbar = () => {
        return (
            <div className="editor-toolbar-menu">
                <LinkModal
                    change={this.onChange}
                    value={this.props.value}
                    show={this.state.showLinkModal}
                    close={this.closeLinkModal}
                />
                {this.renderMarkButton("bold", "format_bold")}
                {this.renderMarkButton("italic", "format_italic")}
                {this.renderMarkButton("underlined", "format_underlined")}
                {this.renderMarkButton("code", "code")}
                {this.renderBlockButton("heading-one", "looks_one")}
                {this.renderBlockButton("heading-two", "looks_two")}
                {this.renderBlockButton("block-quote", "format_quote")}
                {this.renderBlockButton(
                    "numbered-list",
                    "format_list_numbered"
                )}
                {this.renderBlockButton(
                    "bulleted-list",
                    "format_list_bulleted"
                )}
                <span
                    className="editor-button"
                    // onMouseDown={this.onClickImage}
                >
                    <span className="material-icons">image</span>
                    <input
                        multiple
                        onChange={this.onClickImage}
                        style={{
                            cursor: "pointer",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            opacity: 0,
                            width: "100%",
                            height: "100%"
                        }}
                        type="file"
                    />
                </span>
                {this.renderInlineButton("link", "link")}
                {this.state.isLoading && (
                    <div className="editor-loading">
                        <i className="fa fa-circle-o-notch fa-spin" />{" "}
                        {this.state.text}
                    </div>
                )}
            </div>
        );
    };

    renderInlineButton = (type, icon) => {
        const isActive = hasInline(type, this.props.value);
        const onMouseDown = event => this.onClickInline(event, type);

        return (
            // eslint-disable-next-line react/jsx-no-bind
            <span
                className="editor-button"
                onMouseDown={onMouseDown}
                data-active={isActive}
            >
                <span className="material-icons">{icon}</span>
            </span>
        );
    };

    /**
     * Render a mark-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */
    renderMarkButton = (type, icon) => {
        const isActive = hasMark(type, this.props.value);
        const onMouseDown = event => this.onClickMark(event, type);

        return (
            // eslint-disable-next-line react/jsx-no-bind
            <span
                className="editor-button"
                onMouseDown={onMouseDown}
                data-active={isActive}
            >
                <span className="material-icons">{icon}</span>
            </span>
        );
    };

    /**
     * Render a block-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderBlockButton = (type, icon) => {
        const { value } = this.props;
        let isActive = hasBlock(type, value);

        if (["numbered-list", "bulleted-list"].includes(type)) {

            const parent =
                value.blocks.first() &&
                value.document.getParent(value.blocks.first().key);
            isActive =
                hasBlock("list-item", value) && parent && parent.type === type;
        }
        const onMouseDown = event => this.onClickBlock(event, type);

        return (
            // eslint-disable-next-line react/jsx-no-bind
            <span
                className="editor-button"
                onMouseDown={onMouseDown}
                data-active={isActive}
            >
                <span className="material-icons">{icon}</span>
            </span>
        );
    };

    /**
     * Render the Slate editor.
     *
     * @return {Element}
     */

    renderEditor = () => {
        return (
            <div className="editor">
                <Editor
                    placeholder="Enter some text..."
                    value={this.props.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderNode={this.renderNode}
                    renderMark={this.renderMark}
                    onDrop={this.onDropOrPaste}
                    onPaste={this.onPaste}
                    schema={this.schema}
                    spellCheck
                    autoFocus
                />
            </div>
        );
    };

    /**
     * Render a Slate node.
     *
     * @param {Object} props
     * @return {Element}
     */

    renderNode = props => {
        const { attributes, children, node } = props;
        switch (node.type) {
            case "link": {
                const { data } = node;
                const href = data.get("href");
                return (
                    <a
                        {...attributes}
                        style={{
                            cursor: "text",
                            color: "-webkit-link",
                            textDecoration: "underline"
                        }}
                        href={href}
                    >
                        {children}
                    </a>
                );
            }
            case "image": {
                const src = node.data.get("src");
                const className = props.isSelected
                    ? "keetool-editor-image active"
                    : null;
                const style = { display: "block", width: "100%" };
                return (
                    <img
                        src={src}
                        className={className}
                        style={style}
                        {...attributes}
                    />
                );
            }
            case "block-quote":
                return <blockquote {...attributes}>{children}</blockquote>;
            case "bulleted-list":
                return <ul {...attributes}>{children}</ul>;
            case "heading-one":
                return <h1 {...attributes}>{children}</h1>;
            case "heading-two":
                return <h2 {...attributes}>{children}</h2>;
            case "list-item":
                return <li {...attributes}>{children}</li>;
            case "numbered-list":
                return <ol {...attributes}>{children}</ol>;
        }
    };

    /**
     * Render a Slate mark.
     *
     * @param {Object} props
     * @return {Element}
     */

    renderMark = props => {
        const { children, mark, attributes } = props;
        switch (mark.type) {
            case "bold":
                return <strong {...attributes}>{children}</strong>;
            case "code":
                return <code {...attributes}>{children}</code>;
            case "italic":
                return <em {...attributes}>{children}</em>;
            case "underlined":
                return <u {...attributes}>{children}</u>;
        }
    };

    /**
     * Render.
     *
     * @return {Element}
     */

    render() {
        return (
            <div className="editor-wrapper">
                {this.renderToolbar()}
                {this.renderEditor()}
            </div>
        );
    }
}

KeetoolEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired
};

export default KeetoolEditor;