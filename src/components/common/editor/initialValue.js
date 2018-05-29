import { Value } from "slate";
export default Value.fromJSON({
    document: {
        nodes: [
            {
                object: "block",
                type: "paragraph",
                nodes: [
                    {
                        object: "text",
                        leaves: [
                            {
                                text: "A line of text in a paragraph.",
                            },
                        ],
                    },
                ],
            },
        ],
    },
});
