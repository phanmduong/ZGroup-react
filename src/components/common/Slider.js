import React from "react";
import PropTypes from "prop-types";
import noUiSlider from "nouislider";

class Slider extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.slider = null;
    }

    componentDidMount() {
        this.slider = document.getElementById(this.props.id | "sliderRegular");
        noUiSlider.create(this.slider, {
            start: this.props.value,
            connect: true,
            step: this.props.step | 1,
            range: {
                min: this.props.min,
                max: this.props.max,
            },
            behaviour: "snap",
            tooltips: true,
        });

        this.slider.noUiSlider.on("update", values => {
            this.props.onChange(values[0]);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.slider && this.props.value !== nextProps.value) {
            this.slider.noUiSlider.set(nextProps.value);
        }
    }

    render() {
        return (
            <div>
                <div id={this.props.id | "sliderRegular"} className="slider" />
            </div>
        );
    }
}

Slider.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]),
    min: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Slider;
