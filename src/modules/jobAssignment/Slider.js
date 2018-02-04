import React from 'react';
import PropTypes from 'prop-types';
import noUiSlider from 'nouislider';
import FormInputText from "../../components/common/FormInputText";

class Slider extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.slider = null;
        this.updateBonus = this.updateBonus.bind(this);
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
            connect: [true,false],
            step: 1,
            range: {
                'min': this.props.min,
                'max': this.props.max
            },

        });

        this.slider.noUiSlider.on('update', (values) => {
            this.props.onChange(values[0]);
        });


    }

    updateBonus(e){
        let {value} = e.target;
        if(value >= this.props.min && value<=this.props.max){
            this.props.onChange(value);
        }
    }

    render() {
        return (

                <div className="row">
                    <div className="col-md-12"><div id={this.props.name || "sliderRegular"} className="slider"/></div>
                    <div className="col-md-12" style={{marginTop: 10}}>
                        {this.props.label &&
                        <div className="row">
                            <div className="col-xs-1"/>
                            <FormInputText
                                name="penalty"
                                label="Thưởng (%)"
                                type="number"
                                updateFormData={this.updateBonus}
                                value={this.props.value || 0}
                                className="col-xs-5"
                                disabled={this.props.disabled}
                            />
                            <a className="col-xs-5 text-name-student-register"
                               style={{marginTop: "27px", fontSize: 15}}
                            >{this.props.label}</a>
                        </div>
                        }
                        </div>
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
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,

};

export default Slider;