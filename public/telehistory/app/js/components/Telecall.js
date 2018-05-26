import React, {PropTypes, Component} from 'react';
import  Calling from  './Calling';
import api from '../utils/api';

export default class Telecall extends Component {

    constructor(props) {
        super(props);
        this.call = this.call.bind(this);
        this.callSuccess = this.callSuccess.bind(this);
        this.callFail = this.callFail.bind(this);
        this.state = {
            isLoading: false
        }
    }

    callSuccess(studentId, note) {
        this.setState({isLoading: true});
        api.callSuccess(studentId, this.props.telecall.id, note)
            .then(res => {
                this.props.telecall.is_calling = false;
                this.props.telecall.call_time = "Vừa xong";
                this.props.telecall.note = note;
                this.props.telecall.call_status = '<strong class="green-text">Thành công</strong>';
                this.setState({
                    isLoading: false
                })
            });
    }

    callFail(studentId, note) {
        this.setState({isLoading: true});
        api.callFail(studentId, this.props.telecall.id, note)
            .then(res => {
                this.props.telecall.is_calling = false;
                this.props.telecall.call_time = "Vừa xong";
                this.props.telecall.note = note;
                this.props.telecall.call_status = '<strong class="red-text">Thất bại</strong>';
                this.setState({
                    isLoading: false
                })
            });
    }

    call() {
        this.setState({isLoading: true});
        api.call(this.props.telecall.student.id)
            .then(res => {
                let telecall = res.data;
                telecall.is_calling = true;
                this.props.addTelecall(telecall);
                this.setState({
                    isLoading: false
                });
                $('html, body').animate({ scrollTop: 0 }, 'fast');
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <tr>
                    <td colSpan="7">
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div>
                    </td>
                </tr>
            );
        }
        else if (this.props.telecall.is_calling) {
            return (
                <tr>
                    <td colSpan="7">
                        <Calling callSuccess={this.callSuccess}
                                 callFail={this.callFail}
                                 student={this.props.telecall.student}/>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{this.props.telecall.caller.name}</td>
                    <td>{this.props.telecall.student.name} ({this.props.telecall.student.email})</td>
                    <td>{this.props.telecall.student.phone}</td>
                    <td><span dangerouslySetInnerHTML={{__html: this.props.telecall.call_status}}/></td>
                    <td>{this.props.telecall.note}</td>
                    <td>{this.props.telecall.call_time}</td>
                    <td>
                        {this.props.telecall.call_status_value !== 2 &&
                        <button className="btn" onClick={this.call}>Gọi</button>}
                    </td>
                </tr>
            );
        }


    }
}

Telecall.propTypes = {
    telecall: PropTypes.object.isRequired,
    addTelecall: PropTypes.func
};

Telecall.defaultProps = {};