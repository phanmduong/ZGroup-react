import React from 'react';
import PropTypes from 'prop-types';
import {ListGroupItem} from "react-bootstrap";
import Avatar from "../../components/common/Avatar";

class TaskTemplateItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openAddMemberToTaskModal = this.openAddMemberToTaskModal.bind(this);
        this.openTimeSpanModal = this.openTimeSpanModal.bind(this);
    }


    componentDidMount() {
        $.material.init();
    }

    openAddMemberToTaskModal() {
        this.props.openAddMemberToTaskModal(this.props.task);
    }

    openTimeSpanModal() {
        this.props.openTimeSpanModal(this.props.task);
    }

    render() {
        const {task} = this.props;
        return (
            <ListGroupItem
                key={task.id}
                style={{display: "flex", justifyContent: "space-between", position: "relative"}}>
                <div className="checkbox" id={"task" + task.id}>
                    <label style={{fontWeight: 700, color: "#858585"}}>
                        <input
                            checked={task.status || false}
                            onChange={() => this.props.toggleTaskStatus(task)}
                            type="checkbox" name="optionsCheckboxes"/>
                        <div style={{display: "inline-block", position: "relative", top: 4}}>
                            {
                                task.member && (
                                    <Avatar url={task.member.avatar_url} size={20}/>
                                )
                            }
                        </div>
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
                        <li className="more-dropdown-item">
                            <a onClick={this.openAddMemberToTaskModal}>
                                <i className="material-icons">person</i>
                                Phân thành viên
                            </a>
                        </li>
                        <li className="more-dropdown-item">
                            <a onClick={this.openAddMemberToTaskModal}>
                                <i className="material-icons">timer</i>
                                Thời gian thực hiện
                            </a>
                        </li>
                        <li className="more-dropdown-item">
                            <a onClick={() => this.props.deleteTaskTemplate(task)}>
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

TaskTemplateItem.propTypes = {
    deleteTaskTemplate: PropTypes.func.isRequired,
    openAddMemberToTaskModal: PropTypes.func.isRequired,
    openTimeSpanModal: PropTypes.func.isRequired,
    toggleTaskStatus: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired
};

TaskTemplateItem.defaultProps = {};

export default TaskTemplateItem;