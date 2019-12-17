import React from 'react';
import CircularProgressBar from "../../components/common/CircularProgressBar";
import {observer} from "mobx-react";
import moment from 'moment';

@observer
class Week extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            week: []
        };
    }

    componentDidMount() {
        this.setState({week: this.createWeek(new Date())});
    }

    createWeek(dateData) {
        let date = new Date(dateData);
        let week = [];
        for (let i = 1; i <= 7; i++) {
            let first;
            if (date.getDay() == 0) {
                first = (date.getDate() - 7 + i);
            } else {
                first = (date.getDate() - date.getDay() + i);
            }

            let day = new Date(date.setDate(first));
            week.push(day);
        }
        return week;
    }

    nextWeek = () => {
        const lastDate = new Date(this.state.week[6]);
        this.setState({week: this.createWeek(lastDate.setDate(lastDate.getDate() + 2))});
    }

    previousWeek = () => {
        const firstDate = new Date(this.state.week[0]);
        this.setState({week: this.createWeek(firstDate.setDate(firstDate.getDate() - 2))});
    }

    onSelectDate = (date) => {
        this.props.store.selectedDate = date;
        this.props.store.getTasks(this.props.updateTotalTask);
    }


    render() {
        const {selectedDate, analyticTasks} = this.props.store;
        return (
            <div className={"task-date"}>
                <div className="flex flex-row flex-align-items-center flex-space-between">
                    <div onClick={this.previousWeek} className="previous-date">
                        <i className="material-icons">
                            keyboard_arrow_left
                        </i>
                    </div>
                    {this.state.week.map((date, index) => {
                        const isSelectDate = moment(date).format("DD/MM/YYYY") == moment(selectedDate).format("DD/MM/YYYY");
                        let analyticTask = analyticTasks.filter((analyticTask) =>
                            moment(date).format("YYYY-MM-DD") == analyticTask.date
                        )[0];

                        analyticTask = analyticTask ? analyticTask : {
                            total_completed: 0,
                            total: 0.1
                        };

                        return (
                            <div className={"item-date" + (isSelectDate ? " active " : "")}
                                 onClick={() => this.onSelectDate(date)}>
                                <div className="title-date">{index < 6 ? `T${index + 2}` : "CN"}</div>
                                <div className="date">
                                    <CircularProgressBar text={date.getDate()}
                                                         size={40}
                                                         width={5}
                                                         strokeWidth={2}
                                                         color={(analyticTask.total_completed == 0 && analyticTask.total >= 1) ? "#ff472a" : null}
                                                         percentage={(analyticTask.total_completed == 0 && analyticTask.total >= 1) ? 100 : analyticTask.total_completed * 100 / analyticTask.total}/>
                                </div>
                            </div>
                        );
                    })}
                    <div onClick={this.nextWeek} className="next-date">
                        <i className="material-icons">
                            keyboard_arrow_right
                        </i>
                    </div>
                </div>
            </div>
        );
    }
}


export default (Week);