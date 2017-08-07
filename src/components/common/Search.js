import React from 'react';

class TextSearchRegisters extends React.Component {
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

export default TextSearchRegisters;
