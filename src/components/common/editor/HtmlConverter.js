import React from 'react';
import Html from "slate-html-serializer";
// Refactor block tags into a dictionary for cleanliness.
const BLOCK_TAGS = {
    p: "paragraph",
    blockquote: "quote",
    pre: "code",
};

const MARK_TAGS = {
    em: "italic",
    strong: "bold",
    u: "underline",
};

const rules = [
    {
        // Switch deserialize to handle more blocks...
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()];
            if (type) {
                return {
                    object: "block",
                    type: type,
                    nodes: next(el.childNodes),
                };
            }
        },
        // Switch serialize to handle more blocks...
        serialize(obj, children) {
            if (obj.object == "block") {
                switch (obj.type) {
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
        },
    },
    {
        deserialize(el, next) {
            const type = MARK_TAGS[el.tagName.toLowerCase()];
            if (type) {
                return {
                    object: "mark",
                    type: type,
                    nodes: next(el.childNodes),
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
        },
    },
];

export default new Html({ rules });
