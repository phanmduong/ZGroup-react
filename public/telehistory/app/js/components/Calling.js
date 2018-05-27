import React, {PropTypes, Component} from 'react';

export default class Calling extends Component {

    constructor(props) {
        super(props);
        this.callSuccess = this.callSuccess.bind(this);
        this.callFail = this.callFail.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
        this.state = {
            note: ''
        }
    }

    componentDidMount() {
        $('.collapsible').collapsible();
    }

    onNoteChange(event) {
        this.setState({
            note: event.target.value
        });
    }

    callSuccess() {
        this.props.callSuccess(this.props.student.id, this.state.note)
    }

    callFail() {
        this.props.callFail(this.props.student.id, this.state.note)
    }

    render() {
        return (
            <div className="row">
                <div className="card">
                    <div className="card-content">
                        <div className="row">
                            <div className="col s12">
                                <ul className="collapsible" data-collapsible="accordion">
                                    <li>
                                        <div className="collapsible-header"><i
                                            className="material-icons">filter_drama</i>{this.props.student.name}
                                            : {this.props.student.phone}</div>
                                        <div className="collapsible-body">
                                            <div className="row">
                                                <table className="responsive-table">
                                                    <thead>
                                                    <tr>
                                                        <th>Họ tên</th>
                                                        <th>Email</th>
                                                        <th>Trường</th>
                                                        <th>Nơi làm việc</th>
                                                        <th>Địa chỉ</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>{this.props.student.name}</td>
                                                        <td>{this.props.student.email}</td>
                                                        <td>{this.props.student.university}</td>
                                                        <td>{this.props.student.work}</td>
                                                        <td>{this.props.student.address}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="collapsible-header"><i
                                            className="material-icons">filter_drama</i>Thông tin đăng kí học
                                        </div>
                                        <div className="collapsible-body">
                                            <div className="row">
                                                <table className="responsive-table">
                                                    <thead>
                                                    <tr>
                                                        <th>Khoá học</th>
                                                        <th>Số buổi</th>
                                                        <th>Học phí (Chưa có chiết khấu)</th>
                                                        <th>Lớp</th>
                                                        <th>Giờ học</th>
                                                        <th>Thời gian đăng kí</th>
                                                        <th>Saler</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.props.student.registers.map((register) => (
                                                        <tr key={register.id}>
                                                            <td>{register.course_name}</td>
                                                            <td>{register.course_duration}</td>
                                                            <td>{register.course_price}</td>
                                                            <td>{register.class_name}</td>
                                                            <td>{register.study_time}</td>
                                                            <td>{register.created_at}</td>
                                                            <td>
                                                                {register.saler_name && register.saler_name}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="collapsible-header"><i className="material-icons">place</i>Lịch
                                            sử gọi
                                        </div>
                                        <div className="collapsible-body">
                                            <ul className="collection with-header">
                                                {this.props.student.is_called.map(item => (
                                                    <li key={item.id} className="collection-item">
                                                        <div>{item.updated_at}</div>
                                                        <div><strong>{item.caller_name} </strong>
                                                            gọi {item.call_status}
                                                        </div>
                                                        <div>Ghi chú: {item.note}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <form className="input-field col s12">
                                <input id="note" onChange={this.onNoteChange} placeholder="Ghi chú"/>
                            </form>
                        </div>
                    </div>


                    <div className="card-action">
                        <a className="waves-effect waves-light btn"
                           onClick={this.callSuccess}>Đã nghe máy</a>
                        <a className="red waves-effect waves-light btn "
                           onClick={this.callFail}>Không nghe máy</a>
                    </div>
                </div>
            </div>
        );
    }
}

Calling.propTypes = {
    student: PropTypes.object,
    callSuccess: PropTypes.func,
    callFail: PropTypes.func
};

Calling.defaultProps = {};