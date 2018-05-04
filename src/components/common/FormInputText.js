import React from "react";
import PropTypes from "prop-types";
import * as helper from "../../helpers/helper";

class FormInputText extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $.material.init();
        if (this.props.placeholder) {
            $(`#form-input-${this.props.name}`).removeClass("is-empty");
        }
    }

    componentDidUpdate() {
        if (!helper.isEmptyInput(this.props.value)) {
            $(`#form-input-${this.props.name}`).removeClass("is-empty");
        }
        if (this.props.placeholder) {
            $(`#form-input-${this.props.name}`).removeClass("is-empty");
        }
    }

    render() {
        const className = this.props.isNotValid ? " has-error" : "";
        return (
            <div
                id={`form-input-${this.props.name}`}
                className={
                    "form-group label-floating" +
                    className +
                    " " +
                    (this.props.className ? this.props.className : "")
                }
            >
                {this.props.label && (
                    <label className="control-label">
                        {this.props.label}{" "}
                        {this.props.required &&
                            !this.props.disabled && (
                                <star style={{ color: "red" }}>*</star>
                            )}
                    </label>
                )}

                {this.props.disabled ? (
                    <p className="form-control-static">{this.props.value}</p>
                ) : (
                    <input
                        autoComplete={this.props.autoComplete}
                        type={this.props.type || "text"}
                        className="form-control"
                        required={this.props.required}
                        onChange={this.props.updateFormData}
                        name={this.props.name}
                        value={this.props.value ? this.props.value : ""}
                        disabled={this.props.disabled}
                        onKeyPress={this.props.onKeyPress}
                        placeholder={this.props.placeholder}
                        min={
                            this.props.minValue
                                ? this.props.minValue
                                : undefined
                        }
                        max={
                            this.props.maxValue
                                ? this.props.maxValue
                                : undefined
                        }
                    />
                )}
                {this.props.children}
                {this.props.isNotValid && (
                    <span className="help-block">
                        {this.props.errorMessage}
                    </span>
                )}
            </div>
        );
    }
}

FormInputText.propTypes = {
    children: PropTypes.element,
    name: PropTypes.string.isRequired,
    autoComplete: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    updateFormData: PropTypes.func,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    type: PropTypes.string,
    isNotValid: PropTypes.bool,
    errorMessage: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    equalTo: PropTypes.string,
    onKeyPress: PropTypes.func,
    minValue: PropTypes.string,
    maxValue: PropTypes.string,
};

export default FormInputText;
