import React from 'react';
import PropTypes from 'prop-types';
import {ListGroupItem} from "react-bootstrap";
import Avatar from "../../../../components/common/Avatar";
import EditTaskNameContainer from "../../EditTaskNameContainer";

class TaskItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openAddMemberToTaskModal = this.openAddMemberToTaskModal.bind(this);
        this.openTaskDeadlineModal = this.openTaskDeadlineModal.bind(this);
    }


    componentDidMount() {
        $.material.init();
    }

    openAddMemberToTaskModal() {
        this.props.openAddMemberToTaskModal(this.props.task);
    }

    openTaskDeadlineModal() {
        this.props.openTaskDeadlineModal(this.props.task);
    }

    render() {
        const {task, card} = this.props;
        return (
            <ListGroupItem
                key={task.id}
                style={{display: "flex", justifyContent: "space-between", position: "relative"}}>
                <div style={{width: '100%'}} className="checkbox" id={"task" + task.id}>
                    <label style={{fontWeight: 700, color: "#858585",  wordWrap: 'break-word', whiteSpace: 'initial'}}>
                        <input
                            checked={task.status || false}
                            onChange={() => this.props.toggleTaskStatus(task)}
                            type="checkbox" name="optionsCheckboxes"/>

                        {
                            task.members && task.members.map((member, index) => (
                                <div key={index} style={{display: "inline-block", position: "relative", top: 4}}>
                                    <Avatar url={member.avatar_url} size={20}/>
                                </div>
                            ))
                        }

                        {task.title}
                        {
                            task.deadline_str && (
                                <small className="keetool-card" style={{fontWeight: 400}}> - {task.deadline_str}</small>
                            )
                        }
                    </label>
                </div>
                <div className="dropdown" style={{
                    position: "absolute",
                    top: "5px",
                    right: "10px"
                }}>
                    <a className="dropdown-toggle btn-more-dropdown" type="button"
                       data-toggle="dropdown">
                        <i className="material-icons">more_horiz</i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-left">
                        <EditTaskNameContainer
                            task={this.props.task}/>


                        {/*<li className="more-dropdown-item">*/}
                        {/*<a onClick={this.props.openEditPropertiesModal}>*/}
                        {/*<i className="material-icons">details</i>*/}
                        {/*Sửa thuộc tính*/}
                        {/*</a>*/}
                        {/*</li>*/}

                        <li className="more-dropdown-item">
                            <a onClick={this.openAddMemberToTaskModal}>
                                <i className="material-icons">person</i>
                                Phân thành viên
                            </a>
                        </li>
                        <li className="more-dropdown-item">
                            <a onClick={this.openTaskDeadlineModal}>
                                <i className="material-icons">timer</i>
                                Hạn chót
                            </a>
                        </li>
                        <li className="more-dropdown-item">
                            <a onClick={() => this.props.deleteTask(task, card)}>
                                <i className="material-icons">delete</i>
                                Xoá công việc
                            </a>
                        </li>
                    </ul>
                </div>
            </ListGroupItem>
        );

    }

}

TaskItem.propTypes = {
    deleteTask: PropTypes.func.isRequired,
    openAddMemberToTaskModal: PropTypes.func.isRequired,
    openTaskDeadlineModal: PropTypes.func.isRequired,
    toggleTaskStatus: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired
};


export default TaskItem;