import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/star.css';

class Star extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            stars: [],
            value: this.props.value
        };
    }

    componentWillMount() {
        this.setState({
            stars: this.renderStars(this.state.value)
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({
                stars: this.renderStars(nextProps.value),
                value: nextProps.value
            });
        }
    }

    renderStars(value) {
        let stars = [];
        for (let i = 1; i <= this.props.maxStar; i++) {
            if (value >= i) {
                stars.push({
                    value: i,
                    className: "rating-checked"
                });
            } else {
                stars.push({
                    value: i,
                    className: ""
                });
            }
        }
        return stars;
    }

    clickStar(value) {
        this.setState({
            stars: this.renderStars(value)
        });
        this.props.onChange(value);
    }

    render() {
        return (
            <div>
                <div className={this.props.disable ? "rating rating-disable" : "rating rating-enable"}>

                    {
                        this.state.stars.map((star, index) => {
                            return (
                                <a
                                    key={index}
                                    className={star.className} onClick={() => {
                                    if (this.props.disable) return;
                                    this.clickStar(star.value);
                                }}>★</a>
                            );
                        }).reverse()
                    }
                </div>
            </div>
        );
    }
}

Star.propTypes = {
    maxStar: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    disable: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Star;