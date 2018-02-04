import React from 'react';
import PropTypes from 'prop-types';
import noUiSlider from "nouislider";

class Slider extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.slider = null;
    }

    componentDidMount() {
        this.slider = document.getElementById('sliderRegular');

        noUiSlider.create(this.slider, {
            start: this.props.value,
            connect: true,
            step: 1,
            range: {
                'min': this.props.min,
                'max': this.props.max
            }
        });

        this.slider.noUiSlider.on('update', (values) => {
            this.props.onChange(values[0]);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.r !== this.props.r) {

            if (this.slider) {
                this.slider.noUiSlider.set(nextProps.r);
            }
        }
    }


    render() {
        return (
            <div>
                <div id="sliderRegular" className="slider"/>
            </div>
        );
    }
}

Slider.propTypes = {
    label: PropTypes.string,
    r: PropTypes.object,
    value: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
    min: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Slider;