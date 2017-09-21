import React from 'react';
import PropTypes from 'prop-types';
import {ListGroupItem} from "react-bootstrap";

class TaskItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openAddMemberToTaskModal = this.openAddMemberToTaskModal.bind(this);
    }


    componentDidMount() {
        $.material.init();
    }

    openAddMemberToTaskModal() {
        this.props.openAddMemberToTaskModal(this.props.task);
    }

    render() {
        const {task, card} = this.props;
        return (
            <ListGroupItem
                key={task.id}
                style={{display: "flex", justifyContent: "space-between", position: "relative"}}>
                {/*<div className="checkbox">*/}
                {/*<label style="font-weight: 700;color: #858585;">*/}
                {/*<input type="checkbox" name="optionsCheckboxes" value="on"/>*/}
                {/*<span className="checkbox-material">*/}
                {/*<span className="check"></span></span><div className="" style="width: 20px;margin-right: 5px;height: 20px;background-position: center center;display: inline-block;position: relative;top: 4px;background-size: cover;border-radius: inherit;background-image: url(&quot;http://d1j8r0kxyu9tj8.cloudfront.net/images/15041977476G2nhDo8SqzOUSq.jpg&quot;);">*/}
                {/**/}
                {/*</div>Thêm khoá<small className="keetool-card" style="font-weight: 400;"> - Còn 2 ngày</small></label>*/}
                {/*</div>*/}
                <div className="checkbox">
                    <label>
                        <input
                            checked={task.status || false}
                            onChange={() => this.props.toggleTaskStatus(task, card)}
                            type="checkbox" name="optionsCheckboxes"/>
                        {task.title}
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
                            <a onClick={() => this.props.deleteTask(task, card)}>
                                <i className="material-icons">delete</i>
                                Xoá công việc
                            </a>
                        </li>
                        <li className="more-dropdown-item">
                            <a onClick={this.openAddMemberToTaskModal}>
                                <i className="material-icons">person</i>
                                Phân thành viên
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
    toggleTaskStatus: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired
};

TaskItem.defaultProps = {};

export default TaskItem;