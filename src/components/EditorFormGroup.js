import React from "react";
import PropTypes from "prop-types";
import KeetoolEditor from "./common/editor/KeetoolEditor";
import { htmlToValue } from "./common/editor/editorHelpers";
const initValue = htmlToValue("");

class EditorFormGroup extends React.Component {
    state = {
        isPristine: true
    };

    render() {
        const { label, value, onChange, required, isNotValid } = this.props;
        const className =
            isNotValid && !this.state.isPristine
                ? "form-group has-error"
                : "form-group";
        return (
            <div className={className}>
                <label
                    className="control-label"
                    style={{ marginBottom: "10px" }}
                >
                    {label}{" "}
                    {required && <star style={{ color: "red" }}>*</star>}
                </label>
                <KeetoolEditor
                    value={value || initValue}
                    onChange={value => {
                        onChange(value);
                        this.setState({
                            isPristine: false
                        });
                    }}
                />
            </div>
        );
    }
}

EditorFormGroup.propTypes = {
    required: PropTypes.bool,
    isNotValid: PropTypes.bool,
    label: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default EditorFormGroup;
