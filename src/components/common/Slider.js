import React from 'react';
import PropTypes from 'prop-types';

class Slider extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.slider = null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.r !== this.props.r) {

            if (this.slider) {
                console.log("r", nextProps.r);
                this.slider.noUiSlider.set(nextProps.r);
            }
        }
    }

    componentDidMount() {
        this.slider = document.getElementById('sliderRegular');

        noUiSlider.create(this.slider, { // eslint-disable-line
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