import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../../components/common/Avatar";
import {ListGroupItem} from "react-bootstrap";

class ProcessTaskItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggleTaskStatus = this.toggleTaskStatus.bind(this);
    }

    componentDidMount() {
        $.material.init();
    }

    toggleTaskStatus() {
        this.props.toggleTaskStatus(this.props.task);
    }

    render() {
        const {task, isActive, user} = this.props;
        const canEditProperty = task.members && task.members.filter((member) => member.id === user.id).length > 0 && task.status;
        return (
            <ListGroupItem>
                <div className="checkbox" id={"task" + task.id}>
                    <label style={{fontWeight: 700, color: "#858585"}}>
                        <input
                            disabled={task.status || !isActive}
                            checked={task.status || false}
                            onChange={this.toggleTaskStatus}
                            type="checkbox" name="optionsCheckboxes"/>
                        <div style={{
                            display: "inline-block",
                            position: "relative",
                            top: 4
                        }}>
                            {
                                task.member && (
                                    <Avatar url={task.member.avatar_url} size={20}/>
                                )
                            }
                        </div>
                        <span
                            style={{
                                textDecoration: task.status ? "line-through" : "none",
                                color: (!task.status && !isActive) && "#d9d9d9"
                            }}>
                        {task.title}
                        </span>
                        {
                            task.deadline_str && (
                                <small className="keetool-card"
                                       style={{fontWeight: 400}}>
                                    - {task.deadline_str}</small>
                            )
                        }
                    </label>
                </div>


                {
                    canEditProperty ?
                        (
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
                                        <a onClick={() => this.props.openEditPropertiesModal({
                                            ...task,
                                            isEditProcess: true
                                        })}>
                                            <i className="material-icons">details</i>
                                            Sửa thuộc tính
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        ) : ""
                }
            </ListGroupItem>
        );
    }
}

ProcessTaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    openEditPropertiesModal: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    toggleTaskStatus: PropTypes.func.isRequired
};

export default ProcessTaskItem;