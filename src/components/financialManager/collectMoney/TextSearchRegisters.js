import React, {PropTypes} from 'react';

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
               onChange={this.onChangeText}/>
      </div>
    );
  }
}

TextSearchRegisters.propTypes = {
  // myProp: PropTypes.string.isRequired
  textSearchRegistersChange: PropTypes.func.isRequired
};

export default TextSearchRegisters;
