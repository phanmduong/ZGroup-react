import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/star.css';

class ToggleStar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: this.props.value
        };
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }


    clickStar() {
        let {value} = this.state;
        this.setState({value: !value});
        let {onChange} = this.props;
        if(onChange) onChange(!value);
    }

    render() {
        let {style} = this.props;
        let styleStar = {...style},styleLoading = {...style};
        if(style.fontSize){
            styleLoading.fontSize = style.fontSize - 5;
        }
        return (
            <div>
                <div className={this.props.disable ? "rating rating-disable" : "rating rating-enable"}
                        data-toggle="tooltip" title="" type="button" rel="tooltip"
                        data-placement="top"
                        data-original-title={this.props.value == true ? "Bỏ đánh dấu": "Đánh dấu"}
                >

                    {this.props.isLoading ?
                        <i className="fa fa-refresh fa-spin" style={{...styleLoading}}/>
                        :
                        <a
                            style={{...styleStar}}
                            className={"toggle-rating " + (this.props.value == true ? "rating-checked" : "rating-unchecked")}
                            onClick={() => {
                                if (this.props.disable) return;
                                this.clickStar();
                            }}>★</a>


                    }
                </div>
            </div>
        );
    }
}

ToggleStar.propTypes = {
    value: PropTypes.number.isRequired,
    disable: PropTypes.bool,
    isLoading: PropTypes.bool,
    onChange: PropTypes.func,
};

export default ToggleStar;