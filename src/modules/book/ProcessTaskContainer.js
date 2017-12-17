import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import * as taskActions from '../tasks/taskActions';
import ProcessTaskItem from "./ProcessTaskItem";
import AskGoodPropertiesModalContainer from "../good/AskGoodPropertiesModalContainer";
import {moveAndCreateCard} from "./taskService";
import {ListGroup} from "react-bootstrap";


class ProcessTaskContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggleTaskStatus = this.toggleTaskStatus.bind(this);
    }

    toggleTaskStatus(task) {
        const {card} = this.props;
        if (task.good_property_items && task.good_property_items.length > 0) {
            if (!task.status) {
                this.props.taskActions.openAskGoodPropertiesModal(task);
            }
        } else {
            if (task.board_tasks && task.board_tasks.length > 0) {
                this.props.taskActions.showGlobalLoading();
                moveAndCreateCard(this, task, this.props.projectId, this.props.card.id)
                    .then(() => {
                        this.props.taskActions.hideGlobalLoading();
                        this.props.taskActions.closeCardDetailModal();
                    });
            } else {
                this.props.taskActions.toggleTaskStatus(task, card);
                this.props.taskActions.closeCardDetailModal();
            }
        }
    }



    render() {
        const {card, user} = this.props;
        const tasksComplete = (taskList) => taskList.tasks.filter(t => t.status).length;
        const totalTasks = (taskList) => taskList.tasks.length;
        const percent = (taskList) => tasksComplete(taskList) / totalTasks(taskList);
        return (
            <div>
                <AskGoodPropertiesModalContainer/>

                {
                    card.taskLists && card.taskLists.map((taskList) => {
                        return (
                            <div key={taskList.id}>
                                <small>
                                    {tasksComplete(taskList)}/{totalTasks(taskList)}
                                    {" "}
                                    ({totalTasks(taskList) === 0 ?
                                    "0%" : Math.round(percent(taskList) * 10000) / 100 + "%"})
                                </small>
                                <div className="progress progress-line-default">
                                    <div className="progress-bar progress-bar-rose"
                                         role="progressbar"
                                         aria-valuenow="60"
                                         aria-valuemin="0" aria-valuemax="100"
                                         style={{
                                             width: totalTasks(taskList) === 0 ? 0 : percent(taskList) * 100 + "%"
                                         }}>
                                        <span className="sr-only">
                                            {totalTasks(taskList) === 0 ?
                                                "0%" : Math.round(percent(taskList) * 10000) / 100 + "%"}
                                            Complete
                                        </span>
                                    </div>
                                </div>
                                <ListGroup key={taskList.id}>
                                    {
                                        taskList.tasks.map((task) => {
                                            return (
                                                <ProcessTaskItem
                                                    openEditPropertiesModal={this.props.taskActions.openAskGoodPropertiesModal}
                                                    isActive={task.current_board_id === card.board_id}
                                                    key={task.id}
                                                    card={card}
                                                    user={user}
                                                    task={task}
                                                    toggleTaskStatus={this.toggleTaskStatus}/>
                                            );
                                        })
                                    }
                                </ListGroup>
                            </div>
                        );
                    })
                }
            </div>


        );
    }
}


ProcessTaskContainer.propTypes = {
    card: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        card: state.task.cardDetail.card,
        user: state.login.user,
        projectId: state.task.boardList.projectId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessTaskContainer);