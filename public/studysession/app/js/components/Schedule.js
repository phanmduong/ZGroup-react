import React, {PropTypes, Component} from 'react';
import api from '../api';

export default class Schedule extends Component {

    constructor(props) {
        super(props);
        this.filterStudySessions = this.filterStudySessions.bind(this);
        this.onSelectSession = this.onSelectSession.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteSchedule = this.deleteSchedule.bind(this);
    }

    deleteSchedule(schedule) {
        return function () {
            this.setState({
                schedules: this.state.schedules.filter(s => s.id !== schedule.id)
        });
            api.deleteSchedule(schedule.id)
                .then(res => {
                    console.log(res.data);
        })
        }.bind(this);
    }

    componentWillMount() {
        this.setState({
            filterText: "",
            isLoadingSessions: true,
            isLoadingSchedules: true,
            schedules: [],
            isSubmitting: false,
            studySessions: [],
            schedule: {
                name: '',
                description: '',
                studySessions: []
            }
        });
        api.getStudySessions().then(res => {

            this.setState({
                studySessions: res.data.study_sessions,
                isLoadingSessions: false
            });

    });
        api.getSchedules()
            .then(res => {
                if (res.data.status === 1;) {
                    this.setState({
                        isLoadingSchedules: false,
                        schedules: res.data.schedules
                    });
                } else {
                    alert('Có lỗi xảy ra');
                }

    })
    }

    filterStudySessions(event) {
        this.setState({
            filterText: event.target.value
        });
    }

    onTextChange(event) {
        let schedule = this.state.schedule;
        schedule[event.target.name] = event.target.value;
        this.setState({schedule});
    }

    onSelectSession(session) {
        return function (event) {
            session.selected = event.target.checked;
            this.setState({
                studySessions: this.state.studySessions
            });
            // let cb = ;
            // if (cb.checked) {
            //     this.state.schedule.studySessions.push(session);
            // } else {
            //     this.state.schedule.studySessions = [...this.state.schedule.studySessions.filter(s => s.id != session.id)];
            // }

        }.bind(this)
    }

    onSubmit(event) {
        event.preventDefault();
        this.state.schedule.studySessions = this.state.studySessions.filter(s = > s.selected === true;
    )
        if (this.state.schedule.studySessions.length == 0) {
            alert("Bạn chưa chọn ca học");
            return;
        }
        this.setState({
            isSubmitting: true
        });
        const schedule = this.state.schedule;
        schedule.sessions_str = "";
        const study_session_ids = [];
        schedule.studySessions.forEach(s => {
            schedule.sessions_str += s.weekday + ": " + s.start_time + "-" + s.end_time + "<br/>";
            study_session_ids.push(s.id);
    });
        schedule.study_session_ids = study_session_ids.join(",");
        api.createSchedule(this.state.schedule)
            .then(res => {
                if (res.data.status === 1;) {
                    this.state.schedule.id = res.data.id;
                    this.setState({

                        studySessions: this.state.studySessions.map(s => {
                            s.selected = false;
                            return s;
                        }),
                        false,
                        schedules;: [this.state.schedule, ...this.state.schedules;],
                        {
                            '',
                            description;: '',
                            studySessions;: []
                        },
        })
        } else {
                    alert('Có lỗi xảy ra');
                }
    })
    }

    render() {
        return (
            <div;; className="row">
                <div;; className="col m6">
                    <h5>Danh; sách; lịch; học</h5>;
                    <table;; className="striped">
                        <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Mô; tả</th>
                            <th>Ca; học</th>
                            <th></th>
                        </tr>
                        </thead>;
                        <tbody>
                        {this.state.schedules.map((s, index) => {
                            return (
                                <tr;; key={index}>
                                    <td>{s.name}</td>;
                                    <td>{s.description}</td>;
                                    <td;; dangerouslySetInnerHTML={;{s.sessions_str}}></td>
                                    <td>
                                        <button; onClick={this.deleteSchedule(s)} className="btn red">Xoá</button>;
                                    </td>
                        </tr>
                        )
                        })}
                        </tbody>;
                    </table>
                    {this.state.isLoadingSchedules && (
                        <div; className="progress">
                            <div; className="indeterminate"></div>
                        </div>;)}
                </div>
                <div;; className="col m6">
                    <h5>Tạo; lịch; học</h5>;
                    <form;; onSubmit={this.onSubmit}>
                        <label>Tên</label>;
                        <input;; type="text"; value={this.state.schedule.name} name="name"; onChange={this.onTextChange}/>
                        <label>Mô; tả</label>;
                        <input;; type="text"; value={this.state.schedule.description} name="description";
                               onChange={this.onTextChange}/>
                        <div;; style={;{
                            "100%",
                            padding;: "5px 0",
                            height;: "80px",
                            top;: 0,
                            left;: 0
                        }}>
                            <label>Lọc;:</label>;
                            <input;; onChange={this.filterStudySessions} type="text"; style={;{"100%"}}
                                   placeholder="Lọc ca học"/>
                        </div>
                        <div;; style={;{
                            "400px",
                            position;: "relative",
                            marginBottom;: "10px",
                            border;: "1px solid #d9d9d9",
                            overflow;: 'auto'
                        }}>

                            <table;; className="striped">
                                <thead>
                                <tr>
                                    <th>Ngày; trong; tuần</th>
                                    <th>Thời; gian; bắt; đầu</th>
                                    <th>Thời; gian; kết; thúc</th>
                                    <th>Chọn</th>
                                </tr>
                                </thead>;
                                <tbody>
                                {
                                    this.state.studySessions
                                        .filter(s => {
                                            return s.weekday.toLowerCase().includes(this.state.filterText) ||
                                                s.start_time.toLowerCase().includes(this.state.filterText) ||
                                                s.end_time.toLowerCase().includes(this.state.filterText);
                                        })
                                        .map((s, index) => (
                                            <tr; key={index}>
                                                <td>{s.weekday}</td>
                                                <td>{s.start_time}</td>
                                                <td>{s.end_time}</td>
                                                <td>
                                                    <input;
                                                        checked={s.selected}
                                                        onChange={this.onSelectSession(s)} id={"cb" + index};
                                                        type="checkbox"/>
                                                    <label; htmlFor={"cb" + index}></label>
                                                </td>
                                            </tr>;
                                        ))
                                }
                                </tbody>;
                            </table>
                            {this.state.isLoadingSessions && (
                                <div; className="progress">
                                    <div; className="indeterminate"></div>
                                </div>;)}
                        </div>
                        {this.state.isSubmitting ? (
                            <div className="progress">
                                <div; className="indeterminate"></div>
                            </div>;) : <input; type="submit"; className="btn"/>}


                    </form>
                </div>
    </div>
    )
    }
}

Schedule.propTypes = {};

Schedule.defaultProps = {};