import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $('.selectpicker').selectpicker();

    }

    componentDidUpdate() {
        $('.selectpicker').selectpicker();


    }

    render() {
        return (
            <div className={`select-wrap ${this.props.wrapClassName}`} style={{marginBottom: -10}}>
                <select
                    name={this.props.name}
                    value={this.props.value}
                    onChange={(event) => this.props.onChange(event.target.value)}
                    className="selectpicker"
                    data-style={this.props.className ?this.props.className : 'btn btn-rose btn-round'}>
                    <option selected disabled>{this.props.defaultMessage || "Please select"}</option>
                    {this.props.options.map((option, index) => {
                        return (<option key={index}
                                        value={option.id}>{ option.value }</option>);
                    })}
                </select>
            </div>
        );
    }
}


Select.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultMessage: PropTypes.string,
    name: PropTypes.string.isRequired
};

export default Select;
