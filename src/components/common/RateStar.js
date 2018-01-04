import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const rated = (  <button className="btn btn-warning btn-round btn-fab btn-fab-mini">
    <i className="material-icons">star_border</i></button>);
const unrated = (  <button className="btn btn-round btn-fab btn-fab-mini">
    <i className="material-icons">star_border</i></button>);

class RateStar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <select
                    className="form-control"
                    value={this.props.value}
                    onChange={this.props.updateFormData}
                    name={this.props.name}>
                    {_.range(1, this.props.maxStar).map((index) => {
                        return (
                            <option key={index} value={index}>
                                {_.range(1, index).map(()=>{return (rated);})}
                                {_.range(index+1, this.props.maxStar).map(()=>{return (unrated);})}
                            </option>);
                    })}
                </select>
            </div>
        );
    }
}

RateStar.propTypes = {
    isNotForm: PropTypes.bool,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    updateFormData: PropTypes.func.isRequired,
    maxStar: PropTypes.number,
};

export default RateStar;