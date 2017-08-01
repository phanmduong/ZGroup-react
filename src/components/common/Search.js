import React, {PropTypes} from 'react';

class TextSearchRegisters extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="form-group">
        <input className="form-control"
               placeholder={this.props.placeholder}
               value={this.props.value}
               onChange={(event)=>this.props.onChange(event.target.value)}/>
      </div>
    );
  }
}

TextSearchRegisters.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
};

export default TextSearchRegisters;
