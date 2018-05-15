import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";

class KeetoolSelect extends React.Component {
    state = {
        isPristine: true
    };

    render() {
        const className =
            this.props.isNotValid && !this.state.isPristine
                ? "form-group has-error"
                : "form-group";
        return (
            <div className={className}>
                <label
                    className="control-label"
                    style={{ marginBottom: "10px" }}
                >
                    {this.props.label}{" "}
                    {this.props.required && (
                        <star style={{ color: "red" }}>*</star>
                    )}
                    {this.props.children}
                </label>
                <ReactSelect
                    value={this.props.value}
                    options={this.props.options}
                    onChange={e => {
                        this.setState({
                            isPristine: false
                        });
                        this.props.onChange(e);
                    }}
                    placeholder={this.props.placeholder}
                />
            </div>
        );
    }
}

KeetoolSelect.propTypes = {
    isNotValid: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    placeholder: PropTypes.string.isRequired,
    children: PropTypes.element,
    label: PropTypes.string.isRequired
};

export default KeetoolSelect;
