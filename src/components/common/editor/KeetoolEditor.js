import React from "react";
import { Editor, getEventRange, getEventTransfer } from "slate-react";
import html from "./HtmlConverter";
import { LAST_CHILD_TYPE_INVALID } from "slate-schema-violations";
import {
    DEFAULT_NODE,
    isBoldHotkey,
    isItalicHotkey,
    isUnderlinedHotkey,
    isCodeHotkey,
    hasMark,
    hasBlock,
    hasInline,
} from "./EditorService";
import { Block } from "slate";
import imageExtensions from "image-extensions";
import { wrapLink, unwrapLink } from "./utils/linkUtils";

const initialValue = "<p>cao anh quan</p>";

class KeetoolEditor extends React.Component {
    state = {
        value: html.deserialize(initialValue),
    };

    /**
     * When clicking a link, if the selection has a link in it, remove the link.
     * Otherwise, add a new link with an href and text.
     *
     * @param {Event} event
     */

    onClickInline = (event, type) => {
        event.preventDefault();
        const { value } = this.state;
        const change = value.change();

        if (type == "link") {
            const hasLinks = hasInline(type, value);

            if (hasLinks) {
                change.call(unwrapLink);
            } else if (value.isExpanded) {
                const href = window.prompt("Enter the URL of the link:");
                change.call(wrapLink, href);
            } else {
                const href = window.prompt("Enter the URL of the link:");
                const text = window.prompt("Enter the text for the link:");
                change
                    .insertText(text)
                    .extend(0 - text.length)
                    .call(wrapLink, href);
            }
        }

        this.onChange(change);
    };

    /*
    * A function to determine whether a URL has an image extension.
    *
    * @param {String} url
    * @return {Boolean}
    */
    isImage = url => {
        return !!imageExtensions.find(url.endsWith);
    };

    /**
     * A change function to standardize inserting images.
     *
     * @param {Change} change
     * @param {String} src
     * @param {Range} target
     */

    insertImage = (change, src, target) => {
        if (target) {
            change.select(target);
        }

        change.insertBlock({
            type: "image",
            isVoid: true,
            data: { src },
        });
    };

    onClickImage = event => {
        event.preventDefault();
        const src = window.prompt("Enter the URL of the image:");
        if (!src) return;

        const change = this.state.value.change().call(this.insertImage, src);

        this.onChange(change);
    };

    /**
     * On drop, insert the image wherever it is dropped.
     *
     * @param {Event} event
     * @param {Change} change
     * @param {Editor} editor
     */

    onDropOrPaste = (event, change, editor) => {
        const target = getEventRange(event, change.value);
        if (!target && event.type == "drop") return;

        const transfer = getEventTransfer(event);
        const { type, text, files } = transfer;

        if (type == "files") {
            for (const file of files) {
                const reader = new FileReader();
                const [mime] = file.type.split("/");
                if (mime != "image") continue;

                reader.addEventListener("load", () => {
                    editor.change(c => {
                        c.call(this.insertImage, reader.result, target);
                    });
                });

                reader.readAsDataURL(file);
            }
        }

        if (type == "text") {
            if (!this.isUrl(text)) return;
            if (!this.isImage(text)) return;
            change.call(this.insertImage, text, target);
        }
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
                        return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
                    }
                }
            },
        },
    };

    onChange = ({ value }) => {
        this.setState({
            value,
        });
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
        const { value } = this.state;
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
        const { value } = this.state;
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
                return !!document.getClosest(block.key, parent => parent.type == type);
            });

            if (isList && isType) {
                change
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock("bulleted-list")
                    .unwrapBlock("numbered-list");
            } else if (isList) {
                change
                    .unwrapBlock(type == "bulleted-list" ? "numbered-list" : "bulleted-list")
                    .wrapBlock(type);
            } else {
                change.setBlocks("list-item").wrapBlock(type);
            }
        }

        this.onChange(change);
    };

    /**
     * On clicking the image button, prompt for an image and insert it.
     *
     * @param {Event} event
     */

    /**
     * Render the toolbar.
     *
     * @return {Element}
     */

    renderToolbar = () => {
        return (
            <div className="editor-toolbar-menu">
                {this.renderMarkButton("bold", "format_bold")}
                {this.renderMarkButton("italic", "format_italic")}
                {this.renderMarkButton("underlined", "format_underlined")}
                {this.renderMarkButton("code", "code")}
                {this.renderBlockButton("heading-one", "looks_one")}
                {this.renderBlockButton("heading-two", "looks_two")}
                {this.renderBlockButton("block-quote", "format_quote")}
                {this.renderBlockButton("numbered-list", "format_list_numbered")}
                {this.renderBlockButton("bulleted-list", "format_list_bulleted")}
                <span className="editor-button" onMouseDown={this.onClickImage}>
                    <span className="material-icons">image</span>
                </span>
                {this.renderInlineButton("link", "link")}
            </div>
        );
    };

    renderInlineButton = (type, icon) => {
        const isActive = hasInline(type, this.state.value);
        const onMouseDown = event => this.onClickInline(event, type);

        return (
            // eslint-disable-next-line react/jsx-no-bind
            <span className="editor-button" onMouseDown={onMouseDown} data-active={isActive}>
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
        const isActive = hasMark(type, this.state.value);
        const onMouseDown = event => this.onClickMark(event, type);

        return (
            // eslint-disable-next-line react/jsx-no-bind
            <span className="editor-button" onMouseDown={onMouseDown} data-active={isActive}>
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
        const { value } = this.state;
        let isActive = hasBlock(type, value);

        if (["numbered-list", "bulleted-list"].includes(type)) {
            const parent = value.document.getParent(value.blocks.first().key);
            isActive = hasBlock("list-item", value) && parent && parent.type === type;
        }
        const onMouseDown = event => this.onClickBlock(event, type);

        return (
            // eslint-disable-next-line react/jsx-no-bind
            <span className="editor-button" onMouseDown={onMouseDown} data-active={isActive}>
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
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderNode={this.renderNode}
                    renderMark={this.renderMark}
                    onDrop={this.onDropOrPaste}
                    onPaste={this.onDropOrPaste}
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
                            textDecoration: "underline",
                        }}
                        href={href}>
                        {children}
                    </a>
                );
            }
            case "image": {
                const src = node.data.get("src");
                const className = props.isSelected ? "keetool-editor-image active" : null;
                const style = { display: "block", width: "100%" };
                return <img src={src} className={className} style={style} {...attributes} />;
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
            <div
                style={{
                    background: "#fff",
                    margin: "0 auto 20px",
                    padding: "20px",
                }}>
                {this.renderToolbar()}
                {this.renderEditor()}
            </div>
        );
    }
}

export default KeetoolEditor;
