import React from 'react';
import PropTypes from 'prop-types';

class ItemClassStudentRegister extends React.Component {
  constructor(props, context) {
    super(props, context);

    let register = this.props.register;
    register['code'] = this.props.next_code;
    this.state = {
      register: Object.assign({}, register)
    };


    this.onChangeCode = this.onChangeCode.bind(this);
  }

  onChangeCode(event) {
    const field = event.target.name;
    let register = this.state.register;
    register[field] = event.target.value;
    return this.setState = {
      register: register
    };
  }

  render() {
    return (
      <tr>
        <td>{this.state.register.course}</td>
        <td>{this.state.register.class}</td>
        <td>{this.state.register.register_time}</td>
        {
          (this.state.register.is_paid !== 0) ? (
              <td>{this.state.register.code}</td>
            ) : (
              <td><input type="text" style={{wight: '100px'}} className="form-control" value={this.state.register.code}
                         name="code"
                         onChange={this.onChangeCode}/></td>
            )}
        {
          (this.state.register.is_paid !== 0) ? (
              <td>{this.state.register.money}</td>
            ) : (
              <td><input value={this.state.register.money} type="text" style={{wight: '100px'}}
                         className="form-control"/></td>
            )}
        {
          (this.state.register.is_paid !== 0) ? (
              <td>{this.state.register.note}</td>
            ) : (
              <td><input value={this.state.register.note} type="text" style={{wight: '100px'}}
                         className="form-control"/></td>
            )}
        {
          (this.state.register.is_paid !== 0) ? (
              <td style={{textAlign: 'center'}}>{this.state.register.paid_time}</td>
            ) : (
              <th style={{textAlign: 'center'}}>Chưa nộp</th>
            )}
        <td>
          <button className="btn btn-success" style={{textAlign: 'center'}} onClick={() => {
          }}>Nộp đủ
          </button>
        </td>
      </tr>
    );
  }
}

ItemClassStudentRegister.propTypes = {
  register: PropTypes.object.isRequired,
  next_code: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired
};

export default ItemClassStudentRegister;
