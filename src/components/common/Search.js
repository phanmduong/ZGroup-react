import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="form-group" id="search-form">
        <input className="form-control"
               placeholder={this.props.placeholder}
               value={this.props.value}
               onChange={(event)=>this.props.onChange(event.target.value)}/>
      </div>
    );
  }
}


Search.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,

};

export default Search;
