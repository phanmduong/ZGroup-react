import React from 'react';
import PropTypes from 'prop-types';

class StatusSelect extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const options = this.props.options;
        return (
            <select
                className="form-control"
                value={this.props.value}
                onChange={(e) => this.props.onChange(e.target.value)}>
                {
                    options.map((option, index) => {
                        return (
                            <option value={option.value}
                                    key={index}>{option.label}</option>
                        );
                    })
                }
            </select>
        );
    }
}

StatusSelect.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default StatusSelect;
