import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className="form-group">
                    {this.props.label && <label>{this.props.label}</label>}
                    <input
                        className="form-control"
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        type="search"
                        onChange={(event) => this.props.onChange(event.target.value)}
                        onKeyPress={event => event.key === 'Enter' && this.props.onSearch && this.props.onSearch()}
                        disabled={this.props.disabled || false}
                    />
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
	onSearch: PropTypes.func,
    className: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool
};

export default Search;
