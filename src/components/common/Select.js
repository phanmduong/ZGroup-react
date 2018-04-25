import React from "react";
import PropTypes from "prop-types";

class Select extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentDidUpdate() {
        $(".selectpicker").selectpicker("refresh");
    }

    componentDidMount() {
        $(".selectpicker").selectpicker();
    }

    render() {
        console.log("123");
        return (
            <div>
                <select
                    value={this.props.value}
                    onChange={event => this.props.onChange(event.target.value)}
                    className="selectpicker"
                    data-style={this.props.disableRound ? "btn btn-rose" : "btn btn-rose btn-round"}>
                    <option selected disabled>
                        {this.props.defaultMessage || "Please select"}
                    </option>
                    {this.props.options.map((option, index) => {
                        return (
                            <option
                                key={index}
                                value={option.key}
                                disabled={option.disable}
                                style={{
                                    paddingLeft: this.props.isPaddingLeft && !option.disable ? "30px" : ""
                                }}>
                                {option.value}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }
}

Select.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultMessage: PropTypes.string,
    disableRound: PropTypes.bool,
    isPaddingLeft: PropTypes.bool
};

export default Select;
