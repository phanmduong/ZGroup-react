import React from 'react';
import PropTypes from 'prop-types';

class Slider extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.slider = null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.r !== this.props.r) {
            if (this.slider)
                this.slider.noUiSlider.set(nextProps.r);
        }
    }

    componentDidMount() {
        this.slider = document.getElementById(this.props.name || 'sliderRegular');

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

                <div className="row">
                    <div id={this.props.name || "sliderRegular"} className="slider col-xs-9"/>
                    <div className="col-xs-2" style={{marginTop: 10}}>{this.props.label && <a className="text-name-student-register">{this.props.value}%</a>}</div>
                </div>

        );
    }
}

Slider.propTypes = {
    label: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
    min: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,

};

export default Slider;