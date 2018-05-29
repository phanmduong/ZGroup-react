import React from "react";
import PropTypes from "prop-types";
import Plain from "slate-plain-serializer";
import { Editor } from "slate-react";

const propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired
};
class PlainTextEditor extends React.Component {
    onChange = ({ value }) => {
        this.props.onChange(value);
    };
    initValue = Plain.deserialize("");
    render() {
        return (
            <div className="editor-wrapper">
                <Editor
                    placeholder="Enter text"
                    value={this.props.value || this.initValue}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}
PlainTextEditor.propTypes = propTypes;

export default PlainTextEditor;
