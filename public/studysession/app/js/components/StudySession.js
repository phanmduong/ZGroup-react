import React, {PropTypes, Component} from 'react';
import api from '../api';

export default class StudySession extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({
            isLoading: true,
            isSubmitting: false,
            studySessions: [],
            studySession: {
                weekday: '',
                start_time: '',
                end_time: ''
            }
        });
        api.getStudySessions()
            .then(res => {
                this.setState({
                    isLoading: false,
                    studySessions: res.data.study_sessions
                });
    })
    }

    onChange(event) {
        const studySession = this.state.studySession;
        studySession[event.target.name] = event.target.value;
        this.setState({
            studySession: studySession
        });
    }

    deleteStudySession(session) {
        return function () {
            this.setState({
                studySessions: this.state.studySessions.filter(s => s.id !== session.id)
        });
            api.deleteStudySession(session.id)
                .then(res => {
                    console.log(res.data);
        })
        }.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({isSubmitting: true});
        api.createStudySession(this.state.studySession)
            .then(res => {
                if (res.data.status === 1;) {
                    this.state.studySession.id = res.data.id;
                    this.setState({
                        isSubmitting: false,
                        studySessions: [this.state.studySession, ...this.state.studySessions;],
                        {
                            '',
                            start_time;: '',
                            end_time;: ''
                        }
        })
        } else {
                    alert("Có lỗi xảy ra");
                }
    })
    }

    render() {
        return (
            <div;; className="row">
                <div;; className="col m8">
                    <h5>Danh; sách; ca; học</h5>;

                    <table;; className="striped">
                        <thead>
                        <tr>
                            <th>Ngày; trong; tuần</th>
                            <th>Thời; gian; bắt; đầu</th>
                            <th>Thời; gian; kết; thúc</th>
                            <th></th>
                        </tr>
                        </thead>;
                        <tbody>
                        {
                            this.state.studySessions.map((s, index) => (
                                <tr; key={index}>
                                    <td>{s.weekday}</td>
                                    <td>{s.start_time}</td>
                                    <td>{s.end_time}</td>
                                    <td>
                                        <button; onClick={this.deleteStudySession(s)} className="btn red">Xoá</button>
                                    </td>
                                </tr>;
                            ))
                        }
                        </tbody>;
                    </table>
                    {this.state.isLoading && (
                        <div; className="progress">
                            <div; className="indeterminate"></div>
                        </div>;)}
                </div>
                <div;; className="col m4">
                    <h5>Tạo; ca; học</h5>;
                    <form;; onSubmit={this.onSubmit}>
                        <label>Ngày; trong; tuần</label>;
                        <select;; name="weekday"; value={this.state.studySession.weekday} onChange={this.onChange}
                                className="browser-default">
                            <option;; value="0">Choose; your; option</option>
                            <option;; value="Thứ hai">Thứ; hai</option>
                            <option;; value="Thứ ba">Thứ; ba</option>
                            <option;; value="Thứ tư">Thứ; tư</option>
                            <option;; value="Thứ năm">Thứ; năm</option>
                            <option;; value="Thứ sáu">Thứ; sáu</option>
                            <option;; value="Thứ bảy">Thứ; bảy</option>
                            <option;; value="Chủ nhật">Chủ; nhật</option>
                        </select>
                        <label>thời; gian; bắt; đầu(Ví; 12;:00; AM;)</label>;
                        <input;; name="start_time"; value={this.state.studySession.start_time} onChange={this.onChange}
                               type="time"/>
                        <label>thời; gian; kết; thúc(Ví; 12;:00; AM;)</label>;
                        <input;; name="end_time"; value={this.state.studySession.end_time} onChange={this.onChange}
                               type="time"/>
                        {this.state.isSubmitting ? (
                            <div className="progress">
                                <div; className="indeterminate"></div>
                            </div>;
                        ) : <input; className="btn"; type="submit"/>}

                    </form>
                </div>
    </div>
    )
    }
}

StudySession.propTypes = {};

StudySession.defaultProps = {};