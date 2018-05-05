import React from "react";
import KeetoolEditor from "../../../components/common/editor/KeetoolEditor";

class BlogEditor extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <KeetoolEditor />
            </div>
        );
    }
}

export default BlogEditor;
