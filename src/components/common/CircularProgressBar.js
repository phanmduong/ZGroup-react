import React, {PropTypes} from 'react';


class CircularProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // Size of the enclosing square
        const size = this.props.size;
        // SVG centers the stroke width on the radius, subtract out so circle fits in square
        const radius = (this.props.size - this.props.width) / 2;
        // Enclose cicle in a circumscribing square
        const viewBox = `0 0 ${size} ${size}`;
        // Arc length at 100% coverage is the circle circumference
        const dashArray = radius * Math.PI * 2;
        // Scale 100% coverage overlay with the actual percent
        const dashOffset = dashArray - dashArray * this.props.percentage / 100;

        return (
            <svg
                width={this.props.size}
                height={this.props.size}
                viewBox={viewBox}>
                <circle
                    className="circle-background"
                    cx={this.props.size / 2}
                    cy={this.props.size / 2}
                    r={radius}
                    width={`${this.props.width}px`}/>
                <circle
                    className="circle-progress"
                    cx={this.props.size / 2}
                    cy={this.props.size / 2}
                    r={radius}
                    width={`${this.props.width}px`}
                    // Start progress marker at 12 O'Clock
                    transform={`rotate(-90 ${this.props.size / 2} ${this.props.size / 2})`}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset,
                        strokeWidth: this.props.strokeWidth
                    }}/>
                <text
                    className="circle-text"
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle">
                    {this.props.text ? this.props.text : `${this.props.percentage}%`}
                </text>
            </svg>
        );
    }
}

CircularProgressBar.defaultProps = {
    size: 200,
    percentage: 25,
    width: 10,
    strokeWidth: 1
};

CircularProgressBar.propTypes = {
    size: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired
};

export default CircularProgressBar;
