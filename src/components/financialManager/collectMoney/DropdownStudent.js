import React from 'react';
import ItemClassStudentRegister from './ItemClassStudentRegister';
import PropTypes from 'prop-types';

class DropdownStudent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let that = this;
    return (
      <li onClick={() => this.props.onChangeDropdown(this.props.index)} className="panel panel-primary">
        <div className="panel-heading">
          <a href="javascript:;" data-toggle="collapse"
             data-target={"#" + this.props.index}
             className="panel-title">{this.props.user.name + " (" + this.props.user.phone + ") (" + this.props.user.email + ")" }</a>
        </div>
        <ul id={this.props.index} className="collapse">
          {this.props.idDowndown == this.props.index &&
          <div className="panel-body">
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover table-striped">
                    <thead>
                    <tr>
                      <th style={{textAlign: 'center'}}>Khóa học</th>
                      <th style={{textAlign: 'center'}}>Lớp</th>
                      <th style={{textAlign: 'center'}}>Thời gian đăng kí</th>
                      <th style={{textAlign: 'center'}}>Mã học viên</th>
                      <th style={{textAlign: 'center'}}>Tổng số tiền nộp</th>
                      <th style={{textAlign: 'center'}}>Ghi chú</th>
                      <th style={{textAlign: 'center'}}>Ngày nộp</th>
                      <th style={{textAlign: 'center'}}>Nộp</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.user.registers.map(function (register, index) {
                      return (
                        <ItemClassStudentRegister key={index} register={register} next_code={that.props.next_code}/>);
                    })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>}
        </ul>


      </li>
    );
  }
}

DropdownStudent.propTypes = {
  index: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  onChangeDropdown: PropTypes.func.isRequired,
  idDowndown: PropTypes.number.isRequired,
  next_code: PropTypes.string.isRequired
};

export default DropdownStudent;
