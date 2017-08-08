import React from 'react';
import PropTypes from 'prop-types';

class TextSearchRegisters extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(event) {
    this.props.textSearchRegistersChange(event.target.value);
  }

  render() {
    return (
      <div className="form-group">
        <input className="form-control" placeholder="Email, tên hoặc số điện thoại học viên"
               onChange={this.onChangeText} value={''}/>
      </div>
    );
  }
}

TextSearchRegisters.propTypes = {
    textSearchRegistersChange: PropTypes.func.isRequired

};

export default TextSearchRegisters;
