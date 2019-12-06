import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Week from "./Week";
import Store from './store';
import moment from "moment";
import {observer} from "mobx-react";
import Loading from "../../components/common/Loading";
import * as globalModalActions from "../../modules/globalModal/globalModalActions";

@observer
class MyTaskContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 1
        };
        this.store = new Store();
    }

    componentDidMount() {
        moment.locale('vi');
        this.store.selectedDate = new Date();
        this.store.getTasks();
    }

    onClickTask = (task) => {
        let regexModalInfoStudent = /\/*sales\/info-student\/[0-9]+\/*\S*/;
        console.log(task.open_url);
        if (regexModalInfoStudent.test(task.open_url))
            globalModalActions.openModalRegisterDetail(task.open_url);
    }

    render() {
        const {selectedDate, isLoading, tasksCompleted, tasksNotComplete} = this.store;
        const {tab} = this.state;
        const tasks = tab == 1 ? tasksNotComplete : tasksCompleted;
        const nameSelectedDate = moment(selectedDate).locale("vi").format('dddd') + " " +
            moment(selectedDate).locale("vi").format('L');
        return (

            <div className="my-task">
                <div className="title"> Việc cần làm</div>
                <div className="subtitle">{nameSelectedDate}</div>
                <Week store={this.store}/>
                <div className="tab-task">
                    <ul className="nav nav-pills nav-pills-dark" data-tabs="tabs">
                        <li className={tab == 1 ? "active" : ""} onClick={() => this.setState({tab: 1})}>
                            <a>Cần làm ({tasksNotComplete.length})</a>
                        </li>
                        <li className={tab == 2 ? "active" : ""} onClick={() => this.setState({tab: 2})}>
                            <a>Đã hoàn thành({tasksCompleted.length})</a>
                        </li>
                    </ul>
                    <div className="list-task">
                        {
                            isLoading ? <Loading/> :
                                <div>
                                    {tasks.map((task) => {
                                        return (
                                            <div className="item-task" onClick={() => this.onClickTask(task)}>
                                                <div className="task-icon" style={{backgroundColor: task.color}}>
                                                    {//eslint-disable-next-line
                                                    }
                                                    <div dangerouslySetInnerHTML={{__html: task.icon}}/>
                                                </div>
                                                <div className="task-content">
                                                    <div className="task-title">
                                                        {task.title}
                                                    </div>
                                                    <div>
                                                        {task.description} - {task.remain_time}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

MyTaskContainer.propTypes = {
    user: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTaskContainer);