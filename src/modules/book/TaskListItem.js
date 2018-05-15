import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';

class TaskListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onEditClick = this.onEditClick.bind(this);
        this.delete = this.delete.bind(this);
    }

    onEditClick(event) {
        event.stopPropagation();
        event.preventDefault();
        // this.props.openTaskListTemplateDetailModal(this.props.taskList);
        browserHistory.push("/manufacture/tasklist-template/" + this.props.taskList.id);
    }

    delete(event) {
        event.stopPropagation();
        event.preventDefault();
        this.props.delete(this.props.taskList);
    }


    render() {
        const {taskList} = this.props;

        return (
            <div className="col-md-4 col-sm-6">
                <a onClick={this.onEditClick}
                   style={{width: "100%", background: "white", color: "#455a64", textAlign: "left"}}
                   className="btn btn-default btn-lg">
                    <div className="dropdown" style={{position: "absolute", top: "10px", right: "10px"}}>
                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                           data-toggle="dropdown">
                            <i className="material-icons">more_horiz</i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right hover-dropdown-menu">

                            <li className="more-dropdown-item">
                                <a onClick={this.delete}>
                                    <span><i className="material-icons" style={{fontSize: "18px"}}>archive</i>Xoá quy trình</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="row" style={{fontSize: "16px", fontWeight: 600}}>
                        <i className="material-icons">account_balance_wallet</i> {taskList.title.length > 20 ? taskList.title.slice(0, 17) + "..." : taskList.title}
                    </div>
                    <div className="row"
                         style={{
                             height: "5px",
                             marginTop: "10px",
                             marginBottom: "10px",
                             background: "#d9d9d9"
                         }}/>
                    <div className="row" style={{textTransform: "none", marginBottom: "10px"}}>
                        <br/>
                        {taskList.num_tasks} công việc<br/>
                    </div>
                    <div className="ripple-container"/>
                </a>
            </div>
        );
    }
}


TaskListItem.propTypes = {
    taskList: PropTypes.object.isRequired,
    openTaskListTemplateDetailModal: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired
};


export default TaskListItem;