import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../../components/common/Avatar";

class TaskTemplateItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openAddMemberToTaskModal = this.openAddMemberToTaskModal.bind(this);
        this.openTaskSpanModal = this.openTaskSpanModal.bind(this);
        this.openAddPropertyItemToTaskModal = this.openAddPropertyItemToTaskModal.bind(this);
    }

    openAddMemberToTaskModal() {
        this.props.openAddMemberToTaskModal(this.props.task);
    }

    openTaskSpanModal() {
        this.props.openTaskSpanModal(this.props.task);
    }

    openAddPropertyItemToTaskModal() {
        this.props.openAddPropertyItemToTaskModal(this.props.task);
    }

    render() {
        const {task} = this.props;
        return (
            <li className="timeline-inverted">
                <div className="timeline-badge success">
                    {this.props.index + 1}
                </div>
                <div className="timeline-panel" style={{position: "relative"}}>
                    <div className="dropdown" style={{
                        position: "absolute",
                        top: "5px",
                        right: "10px"
                    }}>
                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                           data-toggle="dropdown">
                            <i className="material-icons">more_horiz</i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right">

                            <li className="more-dropdown-item">
                                <a onClick={this.openAddMemberToTaskModal}>
                                    <i className="material-icons">person</i>
                                    Phân thành viên
                                </a>
                            </li>
                            <li className="more-dropdown-item">
                                <a onClick={this.openTaskSpanModal}>
                                    <i className="material-icons">timer</i>
                                    Thời gian thực hiện
                                </a>
                            </li>
                            {
                                this.props.type && (
                                    <li className="more-dropdown-item">
                                        <a onClick={this.openAddPropertyItemToTaskModal}>
                                            <i className="material-icons">build</i>
                                            Cài đặt
                                        </a>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="timeline-heading">
                        {
                            task.member && (
                                <Avatar url={task.member.avatar_url} size={20}/>
                            )
                        }
                        <span className="label label-success">
                             {task.title}
                        </span>
                    </div>
                    <div className="timeline-body">
                        <p>
                            {
                                task.good_property_items && task.good_property_items.length > 0 && (
                                    <div>
                                        Thuộc tính cần nhập:
                                        <ul>
                                            {
                                                task.good_property_items.map((item) => {
                                                    return (
                                                        <li key={item.id}>{item.name}: {item.prevalue} {item.preunit}</li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            }
                        </p>
                        <p>
                            {
                                task.current_board && (
                                    <div>
                                        Bảng hiện tại: {task.current_board.title}
                                    </div>
                                )
                            }
                        </p>
                        <p>
                            {
                                task.target_board && (
                                    <div>
                                        Bảng đích: {task.target_board.title}
                                    </div>
                                )
                            }
                        </p>
                        {
                            !!task.span && (
                                <h6>
                                    <i className="ti-time"></i> trong {task.span} giờ
                                </h6>
                            )
                        }

                    </div>
                </div>
            </li>
        );

    }

}

TaskTemplateItem.propTypes = {
    type: PropTypes.string,
    openAddPropertyItemToTaskModal: PropTypes.func.isRequired,
    openAddMemberToTaskModal: PropTypes.func.isRequired,
    openTaskSpanModal: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    isTemplate: PropTypes.bool
};

TaskTemplateItem.defaultProps = {};

export default TaskTemplateItem;