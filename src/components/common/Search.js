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
                <input className="form-control"
                       placeholder={this.props.placeholder}
                       value={this.props.value}
                       type="search"
                       onChange={(event)=>this.props.onChange(event.target.value)}/>
            </div>
        </div>
    );
  }
}


Search.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default Search;
