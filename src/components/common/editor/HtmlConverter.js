import React from "react";
import Html from "slate-html-serializer";
// Refactor block tags into a dictionary for cleanliness.
const BLOCK_TAGS = {
    p: "paragraph",
    blockquote: "quote",
    pre: "code",
    img: "image",
    li: "list-item",
    ul: "bulleted-list",
    ol: "numbered-list",
    h1: "heading-one",
    h2: "heading-two",
    h3: "heading-three",
    h4: "heading-four",
    h5: "heading-five",
    h6: "heading-six"
};

const MARK_TAGS = {
    em: "italic",
    strong: "bold",
    u: "underline",
    s: "strikethrough",
    code: "code"
};

const rules = [
    {
        // Switch deserialize to handle more blocks...
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()];
            if (type) {
                if (type == "image") {
                    return {
                        object: "block",
                        type: "image",
                        nodes: next(el.childNodes),
                        isVoid: true,
                        data: { src: el.getAttribute("src") }
                    };
                }

                return {
                    object: "block",
                    type: type,
                    nodes: next(el.childNodes)
                };
            }
        },
        // Switch serialize to handle more blocks...
        serialize(obj, children) {
            if (obj.object == "block") {
                switch (obj.type) {
                    case "image": {
                        const src = obj.data.get("src");
                        const style = { display: "block", width: "100%" };
                        return <img src={src} style={style} />;
                    }
                    case "paragraph":
                        return <p>{children}</p>;
                    case "quote":
                        return <blockquote>{children}</blockquote>;
                    case "code":
                        return (
                            <pre>
                                <code>{children}</code>
                            </pre>
                        );
                }
            }
        }
    },
    {
        // Special case for code blocks, which need to grab the nested childNodes.
        deserialize(el, next) {
            if (el.tagName.toLowerCase() == "pre") {
                const code = el.childNodes[0];
                const childNodes =
                    code && code.tagName.toLowerCase() == "code"
                        ? code.childNodes
                        : el.childNodes;

                return {
                    object: "block",
                    type: "code",
                    nodes: next(childNodes)
                };
            }
        }
    },
    {
        // Special case for links, to grab their href.
        deserialize(el, next) {
            if (el.tagName.toLowerCase() == "a") {
                return {
                    object: "inline",
                    type: "link",
                    nodes: next(el.childNodes),
                    data: {
                        href: el.getAttribute("href")
                    }
                };
            }
        }
    },
    {
        deserialize(el, next) {
            const type = MARK_TAGS[el.tagName.toLowerCase()];
            if (type) {
                return {
                    object: "mark",
                    type: type,
                    nodes: next(el.childNodes)
                };
            }
        },
        serialize(obj, children) {
            if (obj.object == "mark") {
                switch (obj.type) {
                    case "bold":
                        return <strong>{children}</strong>;
                    case "italic":
                        return <em>{children}</em>;
                    case "underline":
                        return <u>{children}</u>;
                }
            }
        }
    }
];

export default new Html({ rules });
