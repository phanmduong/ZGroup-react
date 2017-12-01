import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import * as taskActions from '../tasks/taskActions';
import ProcessTaskItem from "./ProcessTaskItem";
import AskGoodPropertiesModalContainer from "../good/AskGoodPropertiesModalContainer";
import {moveAndCreateCard} from "./taskService";


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
                    });
            } else {
                this.props.taskActions.toggleTaskStatus(task, card);
            }
        }
    }

    render() {
        const {card} = this.props;
        return (
            <div className="card">
                <div className="card-content">
                    <AskGoodPropertiesModalContainer/>
                    {
                        card.taskLists && card.taskLists.map((taskList) => {
                            return (
                                <div key={taskList.id}>
                                    {
                                        taskList.tasks.filter((task) => task.current_board_id === card.board_id).map((task) => {
                                            return (
                                                <ProcessTaskItem
                                                    key={task.id}
                                                    task={task}
                                                    toggleTaskStatus={this.toggleTaskStatus}/>
                                            );
                                        })
                                    }
                                </div>
                            );
                        })
                    }

                </div>
            </div>
        );
    }
}

ProcessTaskContainer.propTypes = {
    card: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        card: state.task.cardDetail.card,
        projectId: state.task.boardList.projectId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessTaskContainer);