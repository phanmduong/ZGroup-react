import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from '../taskActions';
import Loading from "../../../components/common/Loading";
import {ListGroup, ListGroupItem} from "react-bootstrap";

class TaskListsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.taskActions.loadTaskLists(this.props.cardId);
    }

    render() {
        return (
            <div className="task-lists">
                {
                    this.props.isLoadingTaskLists ? (
                        <Loading/>
                    ) : this.props.taskLists.map((taskList) => {
                        return (
                            <div key={taskList.id}>
                                <h4>
                                    <strong>{taskList.title}</strong>
                                </h4>
                                <div className="progress progress-line-default">
                                    <div className="progress-bar progress-bar-rose"
                                         role="progressbar"
                                         aria-valuenow="60"
                                         aria-valuemin="0" aria-valuemax="100"
                                         style={{width: "30%"}}>
                                        <span className="sr-only">60% Complete</span>
                                    </div>
                                </div>
                                <ListGroup>
                                    <ListGroupItem>Item 1</ListGroupItem>
                                    <ListGroupItem>Item 2</ListGroupItem>
                                </ListGroup>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

TaskListsContainer.propTypes = {
    cardId: PropTypes.number.isRequired,
    taskLists: PropTypes.array.isRequired,
    isLoadingTaskLists: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        taskLists: state.task.taskList.taskLists,
        isLoadingTaskLists: state.task.taskList.isLoadingTaskLists
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListsContainer);